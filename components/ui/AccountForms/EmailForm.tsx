'use client';

import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { updateEmail } from '@/utils/auth-helpers/server';
import { handleRequest } from '@/utils/auth-helpers/client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function EmailForm({
  userEmail
}: {
  userEmail: string | undefined;
}) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsSubmitting(true);
    if (e.currentTarget.newEmail.value === userEmail) {
      e.preventDefault();
      setIsSubmitting(false);
      return;
    }
    handleRequest(e, updateEmail, router);
    setIsSubmitting(false);
  };

  return (
    <div className="animate-fadeIn">
      <Card
        title="Email Address"
        description="Update the email address associated with your account."
        footer={
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-zinc-400">
              A verification email will be sent to your new address.
            </p>

            <Button
              variant="slim"
              type="submit"
              form="emailForm"
              loading={isSubmitting}
              className="
                rounded-lg px-6 py-2
                bg-indigo-600 hover:bg-indigo-500
                transition-all duration-300
              "
            >
              Save Changes
            </Button>
          </div>
        }
      >
        <form
          id="emailForm"
          onSubmit={handleSubmit}
          className="mt-10 space-y-3"
        >
          <label className="text-sm text-zinc-300">
            Email address
          </label>

          <div className="relative">
            <input
              type="email"
              name="newEmail"
              defaultValue={userEmail ?? ''}
              placeholder="your@email.com"
              maxLength={64}
              className="
                w-full rounded-xl px-4 py-3
                bg-zinc-900 text-white
                border border-zinc-700
                focus:outline-none
                focus:ring-2 focus:ring-indigo-500
                transition-all duration-300
              "
            />

            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-zinc-500">
              max 64
            </span>
          </div>
        </form>
      </Card>
    </div>
  );
}
