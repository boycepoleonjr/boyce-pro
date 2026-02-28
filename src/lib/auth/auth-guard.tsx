'use client';

import React, { ReactNode } from 'react';
import { useAuth } from './use-auth';

type Role = 'admin' | 'pro' | 'free';

interface AuthGuardProps {
  role: Role;
  fallback?: ReactNode;
  children: ReactNode;
}

const roleHierarchy: Record<Role, number> = {
  admin: 3,
  pro: 2,
  free: 1,
};

export function AuthGuard({ role: requiredRole, fallback, children }: AuthGuardProps) {
  const { user, role: userRole, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
      </div>
    );
  }

  // If user is not signed in
  if (!user || !userRole) {
    return fallback || (
      <div className="border border-zinc-700 rounded-lg p-8 text-center">
        <h3 className="text-xl font-medium mb-2">Sign In Required</h3>
        <p className="text-zinc-400 mb-4">You need to be signed in to access this content.</p>
        <a
          href="/auth"
          className="inline-flex items-center px-4 py-2 bg-white text-black rounded-lg hover:bg-zinc-200 transition-colors"
        >
          Sign In
        </a>
      </div>
    );
  }

  // Check if user has sufficient role
  const userRoleLevel = roleHierarchy[userRole];
  const requiredRoleLevel = roleHierarchy[requiredRole];

  if (userRoleLevel >= requiredRoleLevel) {
    return <>{children}</>;
  }

  // User doesn't have sufficient permissions
  if (fallback) {
    return <>{fallback}</>;
  }

  return (
    <div className="border border-zinc-700 rounded-lg p-8 text-center">
      <h3 className="text-xl font-medium mb-2">Upgrade Required</h3>
      <p className="text-zinc-400 mb-4">
        You need {requiredRole === 'pro' ? 'Pro access' : `${requiredRole} access`} to view this content.
      </p>
      {requiredRole === 'pro' && (
        <button className="inline-flex items-center px-4 py-2 bg-white text-black rounded-lg hover:bg-zinc-200 transition-colors">
          Upgrade to Pro — $49/mo
        </button>
      )}
    </div>
  );
}