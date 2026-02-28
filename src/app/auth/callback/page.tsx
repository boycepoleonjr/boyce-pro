'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../../lib/auth';
import { Check, AlertCircle } from 'lucide-react';

export default function AuthCallbackPage() {
  const [status, setStatus] = useState<'processing' | 'success' | 'error'>('processing');
  const [error, setError] = useState<string>('');
  const { completeSignIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const handleSignIn = async () => {
      try {
        const url = window.location.href;
        await completeSignIn(url);
        setStatus('success');
        
        // Redirect to home page after a short delay
        setTimeout(() => {
          router.push('/');
        }, 2000);
      } catch (err) {
        console.error('Sign-in error:', err);
        setError(err instanceof Error ? err.message : 'Failed to complete sign-in');
        setStatus('error');
      }
    };

    // Small delay to ensure auth state is ready
    const timer = setTimeout(handleSignIn, 500);
    return () => clearTimeout(timer);
  }, [completeSignIn, router]);

  if (status === 'processing') {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center px-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white mx-auto mb-4"></div>
          <h1 className="text-xl font-semibold mb-2">Signing you in...</h1>
          <p className="text-zinc-400">Please wait while we process your magic link</p>
        </div>
      </div>
    );
  }

  if (status === 'success') {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center px-4">
        <div className="text-center">
          <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="w-8 h-8" />
          </div>
          <h1 className="text-xl font-semibold mb-2">Welcome back!</h1>
          <p className="text-zinc-400 mb-4">You've been successfully signed in</p>
          <p className="text-sm text-zinc-500">Redirecting you to the homepage...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <AlertCircle className="w-8 h-8" />
        </div>
        <h1 className="text-xl font-semibold mb-2">Sign-in failed</h1>
        <p className="text-zinc-400 mb-6">{error}</p>
        
        <div className="space-y-3">
          <a
            href="/auth"
            className="block w-full bg-white text-black py-3 px-4 rounded-lg font-medium hover:bg-zinc-200 transition-colors"
          >
            Try again
          </a>
          <a
            href="/"
            className="block w-full text-zinc-400 hover:text-white transition-colors"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}