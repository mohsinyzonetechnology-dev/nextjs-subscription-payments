'use client';

import Button from '@/components/ui/Button';
import Link from 'next/link';
import { signInWithPassword } from '@/utils/auth-helpers/server';
import { handleRequest } from '@/utils/auth-helpers/client';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

interface PasswordSignInProps {
  allowEmail: boolean;
  redirectMethod: string;
}

export default function PasswordSignIn({
  allowEmail,
  redirectMethod
}: PasswordSignInProps) {
  const router = redirectMethod === 'client' ? useRouter() : null;
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsSubmitting(true);
    await handleRequest(e, signInWithPassword, router);
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0a0f2c] via-[#111827] to-[#020617]">

     <div className="w-full max-w-2xl px-5 rounded-3xl bg-white/5 backdrop-blur-xl p-10 border border-white/10 shadow-[0_20px_60px_-15px_rgba(99,102,241,0.45)]">

        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-white">
            Sign in
          </h2>
          <p className="mt-2 text-sm text-slate-300">
            Welcome back, continue your journey
          </p>
        </div>

        {/* Form */}
        <form noValidate onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="text-sm text-slate-300 mb-1 block">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="you@company.com"
              autoComplete="email"
              className="
                w-full rounded-xl px-4 py-3
                bg-slate-900/70 text-white
                border border-slate-700
                placeholder:text-slate-500
                focus:outline-none focus:ring-2 focus:ring-cyan-400
                transition
              "
            />
          </div>

          <div>
            <label className="text-sm text-slate-300 mb-1 block">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              autoComplete="current-password"
              className="
                w-full rounded-xl px-4 py-3
                bg-slate-900/70 text-white
                border border-slate-700
                placeholder:text-slate-500
                focus:outline-none focus:ring-2 focus:ring-cyan-400
                transition
              "
            />
          </div>

          <Button
            type="submit"
            loading={isSubmitting}
            className="
              w-full rounded-xl py-3 text-sm font-semibold
              bg-gradient-to-r from-cyan-500 to-indigo-500
              hover:from-cyan-400 hover:to-indigo-400
              text-white transition
            "
          >
            Sign In
          </Button>
        </form>

        {/* Links */}
        <div className="mt-7 space-y-3 text-center">
          <Link
            href="/signin/forgot_password"
            className="block text-sm text-cyan-400 hover:text-cyan-300"
          >
            Forgot password?
          </Link>

          {allowEmail && (
            <Link
              href="/signin/email_signin"
              className="block text-sm text-indigo-400 hover:text-indigo-300"
            >
              Use magic link
            </Link>
          )}

          <Link
            href="/signin/signup"
            className="block text-sm text-slate-400 hover:text-white"
          >
            Don’t have an account?{' '}
            <span className="text-cyan-400 font-semibold">
              Create one
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
