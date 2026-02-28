'use client';

import React, { ReactNode } from 'react';
import { useAuth } from './use-auth';

type Tier = 'free' | 'pro';
type Role = 'admin' | 'pro' | 'free';

interface ContentGateProps {
  tier: Tier;
  preview?: ReactNode;
  children: ReactNode;
}

const canAccessTier = (userRole: Role | null, contentTier: Tier): boolean => {
  if (!userRole) return contentTier === 'free'; // Anonymous users can only see free content
  
  if (userRole === 'admin') return true; // Admins can see everything
  if (userRole === 'pro') return true; // Pro users can see everything
  if (userRole === 'free') return contentTier === 'free'; // Free users can only see free content
  
  return false;
};

export function ContentGate({ tier, preview, children }: ContentGateProps) {
  const { user, role, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
      </div>
    );
  }

  // If user has access to this tier, show full content
  if (canAccessTier(role, tier)) {
    return <>{children}</>;
  }

  // Show preview + upgrade prompt
  return (
    <div>
      {preview && (
        <div className="relative">
          {preview}
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black to-transparent"></div>
        </div>
      )}
      
      <div className="border border-zinc-700 rounded-lg p-6 mt-6">
        <div className="text-center">
          {!user ? (
            <>
              <h3 className="text-lg font-medium mb-2">Continue Reading</h3>
              <p className="text-zinc-400 mb-4">Sign up to read the full article</p>
              <a
                href="/auth"
                className="inline-flex items-center px-4 py-2 bg-white text-black rounded-lg hover:bg-zinc-200 transition-colors"
              >
                Sign Up Free
              </a>
            </>
          ) : tier === 'pro' ? (
            <>
              <h3 className="text-lg font-medium mb-2">Premium Content</h3>
              <p className="text-zinc-400 mb-4">Upgrade to Pro to access this content</p>
              <button className="inline-flex items-center px-4 py-2 bg-white text-black rounded-lg hover:bg-zinc-200 transition-colors">
                Upgrade to Pro — $49/mo
              </button>
            </>
          ) : (
            <>
              <h3 className="text-lg font-medium mb-2">Member Content</h3>
              <p className="text-zinc-400 mb-4">This content is available to members</p>
              <a
                href="/auth"
                className="inline-flex items-center px-4 py-2 bg-white text-black rounded-lg hover:bg-zinc-200 transition-colors"
              >
                Sign In
              </a>
            </>
          )}
        </div>
      </div>
    </div>
  );
}