'use client';

import Button from '@/components/ui/Button';
import { useRouter, usePathname } from 'next/navigation';
import { useState } from 'react';
import { createStripePortal } from '@/utils/stripe/server';
import Link from 'next/link';
import Card from '@/components/ui/Card';
import { Tables } from '@/types_db';

type Subscription = Tables<'subscriptions'>;
type Price = Tables<'prices'>;
type Product = Tables<'products'>;

type SubscriptionWithPriceAndProduct = Subscription & {
  prices:
    | (Price & {
        products: Product | null;
      })
    | null;
};

interface Props {
  subscription: SubscriptionWithPriceAndProduct | null;
}

export default function CustomerPortalForm({ subscription }: Props) {
  const router = useRouter();
  const currentPath = usePathname();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const subscriptionPrice =
    subscription &&
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: subscription?.prices?.currency || 'USD',
      minimumFractionDigits: 0
    }).format((subscription?.prices?.unit_amount || 0) / 100);

  const handleStripePortalRequest = async () => {
    setIsSubmitting(true);
    try {
      const redirectUrl = await createStripePortal(currentPath);
      router.push(redirectUrl);
    } catch (error) {
      console.error('Failed to open Stripe portal:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card
      title="Your Plan"
      description={
        subscription
          ? `You are currently on the ${subscription?.prices?.products?.name} plan.`
          : 'You are not currently subscribed to any plan.'
      }
      footer={
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
          <p className="text-gray-400 sm:pb-0">
            Manage your subscription securely via Stripe.
          </p>
          <Button
            variant="slim"
            onClick={handleStripePortalRequest}
            loading={isSubmitting}
          >
            Open Customer Portal
          </Button>
        </div>
      }
    >
      <div className="mt-6 mb-4 text-2xl font-bold text-indigo-500">
        {subscription ? (
          `${subscriptionPrice}/${subscription?.prices?.interval}`
        ) : (
          <Link
            href="/"
            className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors"
          >
            Choose your plan
          </Link>
        )}
      </div>
    </Card>
  );
}
