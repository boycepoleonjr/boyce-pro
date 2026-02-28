'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import {
  User,
  onAuthStateChanged,
  signOut as firebaseSignOut,
  sendSignInLinkToEmail,
  isSignInWithEmailLink,
  signInWithEmailLink,
  Auth,
} from 'firebase/auth';
import { doc, getDoc, setDoc, serverTimestamp, Firestore } from 'firebase/firestore';

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

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<Role>(null);
  const [loading, setLoading] = useState(true);
  const [firebaseAuth, setFirebaseAuth] = useState<Auth | undefined>();
  const [firebaseDb, setFirebaseDb] = useState<Firestore | undefined>();

  // Lazy-load Firebase on client only
  useEffect(() => {
    import('./firebase-config').then(({ auth, db }) => {
      setFirebaseAuth(auth);
      setFirebaseDb(db);
    });
  }, []);

  const fetchUserRole = async (u: User, database: Firestore): Promise<Role> => {
    try {
      const userDoc = await getDoc(doc(database, 'users', u.uid));
      if (userDoc.exists()) {
        return userDoc.data().role as Role;
      }
      await setDoc(doc(database, 'users', u.uid), {
        email: u.email,
        role: 'free',
        createdAt: serverTimestamp(),
      });
      return 'free';
    } catch (error) {
      console.error('Error fetching user role:', error);
      return 'free';
    }
  };

  const signIn = async (email: string): Promise<void> => {
    if (!firebaseAuth) throw new Error('Auth not initialized');
    window.localStorage.setItem('emailForSignIn', email);
    await sendSignInLinkToEmail(firebaseAuth, email, {
      url: `${window.location.origin}/auth/callback`,
      handleCodeInApp: true,
    });
  };

  const completeSignIn = async (url: string): Promise<void> => {
    if (!firebaseAuth) throw new Error('Auth not initialized');
    if (isSignInWithEmailLink(firebaseAuth, url)) {
      let email = window.localStorage.getItem('emailForSignIn');
      if (!email) {
        email = window.prompt('Please provide your email for confirmation');
      }
      if (!email) throw new Error('Email is required to complete sign-in');
      await signInWithEmailLink(firebaseAuth, email, url);
      window.localStorage.removeItem('emailForSignIn');
    }
  };

  const signOut = async (): Promise<void> => {
    if (!firebaseAuth) return;
    await firebaseSignOut(firebaseAuth);
  };

  useEffect(() => {
    if (!firebaseAuth || !firebaseDb) return;

    const unsubscribe = onAuthStateChanged(firebaseAuth, async (u) => {
      setUser(u);
      if (u) {
        const userRole = await fetchUserRole(u, firebaseDb);
        setRole(userRole);
      } else {
        setRole(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [firebaseAuth, firebaseDb]);

  // If Firebase hasn't loaded yet, stop loading state once we know
  useEffect(() => {
    if (!firebaseAuth) {
      const timer = setTimeout(() => setLoading(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [firebaseAuth]);

  return (
    <AuthContext.Provider value={{ user, role, loading, signIn, signOut, completeSignIn }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
