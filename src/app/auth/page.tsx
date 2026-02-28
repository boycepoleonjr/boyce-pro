'use client';

import React, { useState } from 'react';
import { useAuth } from '../../lib/auth';
import { Mail, ArrowRight, Check, AlertCircle } from 'lucide-react';

type SignInState = 'idle' | 'sending' | 'sent' | 'error';

export default function AuthPage() {
  const [email, setEmail] = useState('');
  const [state, setState] = useState<SignInState>('idle');
  const [error, setError] = useState<string>('');
  const { signIn } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address');
      setState('error');
      return;
    }

    setState('sending');
    setError('');

    try {
      await signIn(email);
      setState('sent');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send magic link');
      setState('error');
    }
  };

  const resetForm = () => {
    setState('idle');
    setError('');
    setEmail('');
  };

  if (state === 'sent') {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center px-4">
        <div className="max-w-md w-full">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8" />
            </div>
            <h1 className="text-2xl font-semibold mb-2">Check your email</h1>
            <p className="text-zinc-400">
              We've sent a magic link to <span className="text-white font-medium">{email}</span>
            </p>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6 mb-6">
            <h3 className="font-medium mb-2">What to do next:</h3>
            <ol className="text-sm text-zinc-400 space-y-2">
              <li>1. Check your inbox (and spam folder)</li>
              <li>2. Click the magic link in the email</li>
              <li>3. You'll be automatically signed in</li>
            </ol>
          </div>

          <button
            onClick={resetForm}
            className="w-full text-zinc-400 hover:text-white transition-colors text-sm"
          >
            Use a different email address
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Mail className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-semibold mb-2">Sign in with magic link</h1>
          <p className="text-zinc-400">
            Enter your email and we'll send you a secure sign-in link
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Email address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-transparent transition-all"
              disabled={state === 'sending'}
              autoFocus
            />
          </div>

          {state === 'error' && (
            <div className="flex items-center gap-2 p-3 bg-red-900/20 border border-red-800 rounded-lg text-red-200">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span className="text-sm">{error}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={state === 'sending' || !email}
            className="w-full bg-white text-black py-3 px-4 rounded-lg font-medium hover:bg-zinc-200 disabled:bg-zinc-700 disabled:text-zinc-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
          >
            {state === 'sending' ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-black"></div>
                Sending magic link...
              </>
            ) : (
              <>
                Send magic link
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-xs text-zinc-500">
            By continuing, you agree to our terms and privacy policy.
            <br />
            No passwords required. No spam. Ever.
          </p>
        </div>
      </div>
    </div>
  );
}