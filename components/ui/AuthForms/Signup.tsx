'use client';

import Button from '@/components/ui/Button';
import React, { useState } from 'react';
import Link from 'next/link';
import { signUp } from '@/utils/auth-helpers/server';
import { handleRequest } from '@/utils/auth-helpers/client';
import { useRouter } from 'next/navigation';

interface SignUpProps {
  allowEmail: boolean;
  redirectMethod: string;
}

export default function SignUp({ allowEmail, redirectMethod }: SignUpProps) {
  const router = redirectMethod === 'client' ? useRouter() : null;
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsSubmitting(true);
    await handleRequest(e, signUp, router);
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-zinc-900 to-black">

      {/* Soft glow */}
      <div className="absolute h-[300px] w-[300px] bg-indigo-500/20 blur-[120px]" />

      <div className="relative w-full max-w-md rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-10 shadow-[0_20px_50px_-15px_rgba(99,102,241,0.5)]">

        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-white tracking-tight">
            Create your account
          </h2>
          <p className="mt-2 text-sm text-zinc-400">
            Get started in less than a minute
          </p>
        </div>

        {/* Form */}
        <form noValidate onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-xs uppercase tracking-wider text-zinc-400 mb-2">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="you@company.com"
              autoComplete="email"
              className="
                w-full rounded-xl px-5 py-3.5
                bg-zinc-900/70 text-white
                border border-zinc-700
                placeholder:text-zinc-500
                focus:outline-none
                focus:ring-2 focus:ring-indigo-500
                transition
              "
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-zinc-400 mb-2">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              autoComplete="current-password"
              className="
                w-full rounded-xl px-5 py-3.5
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
            className="w-full rounded-xl py-3.5 text-sm font-semibold bg-gradient-to-r from-indigo-600 to-indigo-500 hover:opacity-90 transition"
          >
            Create account
          </Button>
        </form>

        {/* Footer */}
        <div className="mt-8 text-center space-y-3 text-sm">
          <p className="text-zinc-400">
            Already have an account?
          </p>

          <Link
            href="/signin/password_signin"
            className="block text-indigo-400 hover:text-indigo-300 transition"
          >
            Sign in with password
          </Link>

          {allowEmail && (
            <Link
              href="/signin/email_signin"
              className="block text-indigo-400 hover:text-indigo-300 transition"
            >
              Sign in via magic link
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
