'use client';

import Button from '@/components/ui/Button';
import Link from 'next/link';
import { requestPasswordUpdate } from '@/utils/auth-helpers/server';
import { handleRequest } from '@/utils/auth-helpers/client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface ForgotPasswordProps {
  allowEmail: boolean;
  redirectMethod: string;
  disableButton?: boolean;
}

export default function ForgotPassword({
  allowEmail,
  redirectMethod,
  disableButton
}: ForgotPasswordProps) {
  const router = redirectMethod === 'client' ? useRouter() : null;
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsSubmitting(true);
    await handleRequest(e, requestPasswordUpdate, router);
    setIsSubmitting(false);
  };

  return (
    <div className="flex justify-center mt-10 animate-fadeIn">
      <div className="w-full max-w-md rounded-2xl bg-zinc-900 p-8 shadow-lg border border-zinc-800">

        <h2 className="text-2xl font-semibold text-white text-center mb-2">
          Forgot Password?
        </h2>
        <p className="text-sm text-zinc-400 text-center mb-6">
          Enter your email and we’ll send you a reset link
        </p>

        <form
          noValidate
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <div>
            <label className="text-sm text-zinc-300">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="name@example.com"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              className="
                mt-1 w-full rounded-xl px-4 py-3
                bg-zinc-800 text-white
                border border-zinc-700
                focus:outline-none
                focus:ring-2 focus:ring-indigo-500
                transition-all duration-300
              "
            />
          </div>

          <Button
            variant="slim"
            type="submit"
            loading={isSubmitting}
            disabled={disableButton}
            className="
              w-full rounded-xl py-3
              bg-indigo-600 hover:bg-indigo-500
              transition-all duration-300
            "
          >
            Send Reset Link
          </Button>
        </form>

        <div className="mt-6 space-y-2 text-center">
          <Link
            href="/signin/password_signin"
            className="block text-sm text-indigo-400 hover:text-indigo-300 transition"
          >
            Sign in with password
          </Link>

          {allowEmail && (
            <Link
              href="/signin/email_signin"
              className="block text-sm text-indigo-400 hover:text-indigo-300 transition"
            >
              Sign in via magic link
            </Link>
          )}

          <Link
            href="/signin/signup"
            className="block text-sm text-zinc-400 hover:text-zinc-200 transition"
          >
            Don’t have an account?{" "}
            <span className="text-indigo-400">Sign up</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
