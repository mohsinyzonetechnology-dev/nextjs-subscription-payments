'use client';

import Button from '@/components/ui/Button';
import Link from 'next/link';
import { signInWithEmail } from '@/utils/auth-helpers/server';
import { handleRequest } from '@/utils/auth-helpers/client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface EmailSignInProps {
  allowPassword: boolean;
  redirectMethod: string;
  disableButton?: boolean;
}

export default function EmailSignIn({
  allowPassword,
  redirectMethod,
  disableButton
}: EmailSignInProps) {
  const router = redirectMethod === 'client' ? useRouter() : null;
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsSubmitting(true);
    await handleRequest(e, signInWithEmail, router);
    setIsSubmitting(false);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-indigo-950 to-black overflow-hidden">

      {/* Glow effects */}
      <div className="absolute -top-32 left-1/2 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-indigo-600/20 blur-[120px]" />
      <div className="absolute bottom-0 right-0 h-[300px] w-[300px] bg-pink-600/10 blur-[100px]" />

      {/* Card */}
      <div className="relative w-full max-w-xl rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-12 shadow-[0_20px_60px_-15px_rgba(99,102,241,0.45)]">

        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-4xl font-extrabold text-white tracking-tight">
            Welcome back
          </h2>
          <p className="mt-3 text-base text-zinc-400">
            Access your account using your email
          </p>
        </div>

        {/* Form */}
        <form noValidate onSubmit={handleSubmit} className="space-y-7">
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-2">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="you@company.com"
              autoComplete="email"
              className="
                w-full rounded-xl px-5 py-4
                bg-zinc-900/70 text-white
                border border-zinc-700
                placeholder:text-zinc-500
                focus:outline-none
                focus:ring-2 focus:ring-indigo-500
                transition
              "
            />
          </div>

          <Button
            type="submit"
            loading={isSubmitting}
            disabled={disableButton}
            className="w-full rounded-xl py-4 text-sm font-semibold bg-indigo-600 hover:bg-indigo-500 transition"
          >
            Continue with Email
          </Button>
        </form>

        {/* Links */}
        {allowPassword && (
          <div className="mt-10 text-center space-y-4">
            <Link
              href="/signin/password_signin"
              className="block text-sm font-medium text-indigo-400 hover:text-indigo-300 transition"
            >
              Use password instead
            </Link>

            <Link
              href="/signin/signup"
              className="block text-sm text-zinc-400 hover:text-white transition"
            >
              Don’t have an account?{' '}
              <span className="text-indigo-400 font-semibold">
                Create one
              </span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
