'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User, onAuthStateChanged, signOut as firebaseSignOut, sendSignInLinkToEmail, isSignInWithEmailLink, signInWithEmailLink } from 'firebase/auth';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from './firebase-config';

type Role = 'admin' | 'pro' | 'free' | null;

interface AuthContextType {
  user: User | null;
  role: Role;
  loading: boolean;
  signIn: (email: string) => Promise<void>;
  signOut: () => Promise<void>;
  completeSignIn: (url: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

const actionCodeSettings = {
  url: typeof window !== 'undefined' ? `${window.location.origin}/auth/callback` : 'http://localhost:3000/auth/callback',
  handleCodeInApp: true,
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<Role>(null);
  const [loading, setLoading] = useState(true);

  const fetchUserRole = async (user: User): Promise<Role> => {
    try {
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      if (userDoc.exists()) {
        return userDoc.data().role as Role;
      }
      
      // Create new user document with default role
      const newUserData = {
        email: user.email,
        role: 'free' as Role,
        createdAt: serverTimestamp(),
      };
      
      await setDoc(doc(db, 'users', user.uid), newUserData);
      return 'free';
    } catch (error) {
      console.error('Error fetching user role:', error);
      return 'free';
    }
  };

  const signIn = async (email: string): Promise<void> => {
    try {
      // Store email for completing sign-in
      window.localStorage.setItem('emailForSignIn', email);
      
      await sendSignInLinkToEmail(auth, email, actionCodeSettings);
    } catch (error) {
      console.error('Error sending sign-in link:', error);
      throw error;
    }
  };

  const completeSignIn = async (url: string): Promise<void> => {
    try {
      if (isSignInWithEmailLink(auth, url)) {
        let email = window.localStorage.getItem('emailForSignIn');
        
        if (!email) {
          // If email is not stored, prompt user to enter it
          email = window.prompt('Please provide your email for confirmation');
        }
        
        if (!email) {
          throw new Error('Email is required to complete sign-in');
        }
        
        await signInWithEmailLink(auth, email, url);
        window.localStorage.removeItem('emailForSignIn');
      }
    } catch (error) {
      console.error('Error completing sign-in:', error);
      throw error;
    }
  };

  const signOut = async (): Promise<void> => {
    try {
      await firebaseSignOut(auth);
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      
      if (user) {
        const userRole = await fetchUserRole(user);
        setRole(userRole);
      } else {
        setRole(null);
      }
      
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const value: AuthContextType = {
    user,
    role,
    loading,
    signIn,
    signOut,
    completeSignIn,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}