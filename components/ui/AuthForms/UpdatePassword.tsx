'use client';

import Button from '@/components/ui/Button';
import { updatePassword } from '@/utils/auth-helpers/server';
import { handleRequest } from '@/utils/auth-helpers/client';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

interface UpdatePasswordProps {
  redirectMethod: string;
}

export default function UpdatePassword({
  redirectMethod
}: UpdatePasswordProps) {
  const router = redirectMethod === 'client' ? useRouter() : null;
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsSubmitting(true);
    await handleRequest(e, updatePassword, router);
    setIsSubmitting(false);
  };

  return (
    <div className="flex justify-center mt-10 animate-fadeIn">
      <div className="w-full max-w-md rounded-2xl bg-zinc-900 p-8 shadow-lg border border-zinc-800">

        <h2 className="text-2xl font-semibold text-white text-center mb-2">
          Update Password
        </h2>
        <p className="text-sm text-zinc-400 text-center mb-6">
          Choose a strong password to keep your account secure
        </p>

        <form
          noValidate
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <div>
            <label className="text-sm text-zinc-300">
              New password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              autoComplete="current-password"
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

          <div>
            <label className="text-sm text-zinc-300">
              Confirm new password
            </label>
            <input
              id="passwordConfirm"
              name="passwordConfirm"
              type="password"
              placeholder="••••••••"
              autoComplete="current-password"
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
            className="
              w-full rounded-xl py-3
              bg-indigo-600 hover:bg-indigo-500
              transition-all duration-300
            "
          >
            Update Password
          </Button>
        </form>
      </div>
    </div>
  );
}
