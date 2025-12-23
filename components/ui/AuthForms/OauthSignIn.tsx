'use client';

import Button from '@/components/ui/Button';
import { signInWithOAuth } from '@/utils/auth-helpers/client';
import { type Provider } from '@supabase/supabase-js';
import { Github } from 'lucide-react';
import { useState } from 'react';

type OAuthProviders = {
  name: Provider;
  displayName: string;
  icon: JSX.Element;
};

export default function OauthSignIn() {
  const oAuthProviders: OAuthProviders[] = [
    {
      name: 'github',
      displayName: 'GitHub',
      icon: <Github className="h-5 w-5" />
    }
    /* Add more providers here if needed */
  ];
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsSubmitting(true); // Disable the button while the request is being handled
    await signInWithOAuth(e);
    setIsSubmitting(false);
  };

  return (
    <div className="mt-8 space-y-4">
      {oAuthProviders.map((provider) => (
        <form
          key={provider.name}
          className="pb-2"
          onSubmit={(e) => handleSubmit(e)}
        >
          <input type="hidden" name="provider" value={provider.name} />
          <Button
            variant="slim"
            type="submit"
            className="
              w-full flex items-center justify-center gap-2
              rounded-xl bg-gray-900 hover:bg-gray-800
              text-white font-semibold
              border border-gray-700
              shadow-lg hover:shadow-cyan-400/50
              transition-all duration-300
              relative overflow-hidden
            "
            loading={isSubmitting}
          >
            {/* Hover Glow */}
            <span className="
              absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-400/20 to-purple-400/20
              opacity-0 transition-opacity duration-300
              group-hover:opacity-100
            " />

            <span className="relative flex items-center gap-2">
              <span className="text-xl">{provider.icon}</span>
              {provider.displayName}
            </span>
          </Button>
        </form>
      ))}
    </div>
  );
}
