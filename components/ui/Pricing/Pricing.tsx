'use client';

import Button from '@/components/ui/Button';
import LogoCloud from '@/components/ui/LogoCloud';
import type { Tables } from '@/types_db';
import { getStripe } from '@/utils/stripe/client';
import { checkoutWithStripe } from '@/utils/stripe/server';
import { getErrorRedirect } from '@/utils/helpers';
import { User } from '@supabase/supabase-js';
import cn from 'classnames';
import { useRouter, usePathname } from 'next/navigation';
import { useState } from 'react';

type Subscription = Tables<'subscriptions'>;
type Product = Tables<'products'>;
type Price = Tables<'prices'>;

interface ProductWithPrices extends Product {
  prices: Price[];
}
interface PriceWithProduct extends Price {
  products: Product | null;
}
interface SubscriptionWithProduct extends Subscription {
  prices: PriceWithProduct | null;
}

interface Props {
  user: User | null | undefined;
  products: ProductWithPrices[];
  subscription: SubscriptionWithProduct | null;
}

type BillingInterval = 'lifetime' | 'year' | 'month';

export default function Pricing({ user, products, subscription }: Props) {
  const intervals = Array.from(
    new Set(
      products.flatMap((product) =>
        product?.prices?.map((price) => price?.interval)
      )
    )
  );

  const router = useRouter();
  const currentPath = usePathname();

  const [billingInterval, setBillingInterval] =
    useState<BillingInterval>('month');
  const [priceIdLoading, setPriceIdLoading] = useState<string>();

  const handleStripeCheckout = async (price: Price) => {
    setPriceIdLoading(price.id);

    if (!user) {
      setPriceIdLoading(undefined);
      return router.push('/signin/signup');
    }

    const { errorRedirect, sessionId } = await checkoutWithStripe(
      price,
      currentPath
    );

    if (errorRedirect) {
      setPriceIdLoading(undefined);
      return router.push(errorRedirect);
    }

    if (!sessionId) {
      setPriceIdLoading(undefined);
      return router.push(
        getErrorRedirect(
          currentPath,
          'Something went wrong',
          'Please try again later.'
        )
      );
    }

    const stripe = await getStripe();
    stripe?.redirectToCheckout({ sessionId });
    setPriceIdLoading(undefined);
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-sky-900 via-cyan-900 to-indigo-950">

      {/* Glow Effects */}
      <div className="absolute -top-40 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-cyan-500/20 blur-[180px]" />
      <div className="absolute bottom-0 right-0 h-[500px] w-[500px] bg-purple-500/10 blur-[160px]" />
      <div className="absolute top-20 left-10 h-[400px] w-[400px] bg-pink-400/20 blur-[140px]" />

      <div className="relative max-w-7xl mx-auto px-6 py-28">

        {/* Header */}
        <div className="text-center mt-10 max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-2 mb-4 rounded-full bg-cyan-500/10 px-4 py-1 text-sm text-cyan-400 border border-cyan-500/20">
            💎 Transparent & Flexible Pricing
          </span>

          <h1 className="text-4xl sm:text-6xl font-extrabold text-white leading-tight">
            Grow faster with the <br />
            <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              perfect plan
            </span>
          </h1>

          <p className="mt-6 text-lg text-cyan-200">
            Upgrade, downgrade, or cancel anytime. No hidden fees.
          </p>

          {/* Billing Toggle */}
          <div className="mt-12 inline-flex rounded-xl bg-sky-800/70 p-1 border border-sky-700 backdrop-blur">
            {intervals.includes('month') && (
              <button
                onClick={() => setBillingInterval('month')}
                className={cn(
                  'px-6 py-2 text-sm rounded-lg transition',
                  billingInterval === 'month'
                    ? 'bg-cyan-400 text-sky-900 shadow-lg'
                    : 'text-cyan-300 hover:text-white'
                )}
              >
                Monthly
              </button>
            )}
            {intervals.includes('year') && (
              <button
                onClick={() => setBillingInterval('year')}
                className={cn(
                  'px-6 py-2 text-sm rounded-lg transition',
                  billingInterval === 'year'
                    ? 'bg-purple-400 text-sky-900 shadow-lg'
                    : 'text-cyan-300 hover:text-white'
                )}
              >
                Yearly <span className="ml-1 text-xs text-purple-200">(-20%)</span>
              </button>
            )}
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="mt-24 grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product, index) => {
            const price = product.prices.find(
              (p) => p.interval === billingInterval
            );
            if (!price) return null;

            const priceString = new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: price.currency!,
              minimumFractionDigits: 0
            }).format((price.unit_amount || 0) / 100);

            const isActive =
              subscription &&
              product.name === subscription?.prices?.products?.name;

            return (
              <div
                key={product.id}
                className={cn(
                  'relative rounded-3xl border bg-sky-800/60 backdrop-blur-xl p-8 shadow-2xl transition-all hover:-translate-y-2',
                  index === 1
                    ? 'border-cyan-400 shadow-cyan-400/30 scale-105'
                    : 'border-sky-700 hover:shadow-purple-400/20'
                )}
              >
                {index === 1 && (
                  <span className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-cyan-400 px-4 py-1 text-xs font-semibold text-sky-900 shadow-lg">
                    Most Popular
                  </span>
                )}

                <h3 className="text-2xl font-semibold text-white">
                  {product.name}
                </h3>

                <p className="mt-3 text-cyan-200">
                  {product.description}
                </p>

                <div className="mt-8 flex items-end gap-2">
                  <span className="text-5xl font-extrabold text-white">
                    {priceString}
                  </span>
                  <span className="text-sm text-cyan-200 mb-1">
                    /{billingInterval}
                  </span>
                </div>

                {/* Features */}
                <ul className="mt-8 space-y-3 text-sm text-cyan-200">
                  <li>✔ Unlimited projects</li>
                  <li>✔ Secure cloud storage</li>
                  <li>✔ Team collaboration</li>
                  <li>✔ Priority support</li>
                </ul>

                <Button
                  variant="slim"
                  loading={priceIdLoading === price.id}
                  onClick={() => handleStripeCheckout(price)}
                  className={cn(
                    'mt-10 w-full rounded-xl py-3 text-sm font-semibold transition',
                    index === 1
                      ? 'bg-cyan-400 hover:bg-cyan-500 text-sky-900'
                      : 'bg-sky-700 hover:bg-sky-600 text-white'
                  )}
                >
                  {isActive ? 'Manage Subscription' : 'Get Started'}
                </Button>
              </div>
            );
          })}
        </div>

        {/* Trust */}
        <div className="mt-28 text-center">
          <p className="text-cyan-300 text-sm mb-6">
            Trusted by modern startups & teams
          </p>
          <LogoCloud />
        </div>

        {/* FAQ */}
        <div className="mt-32 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center">
            Frequently Asked Questions
          </h2>

          <FAQSection />
        </div>
      </div>
    </section>
  );
}

// ---------------- FAQ Section ----------------
function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqData = [
    {
      question: 'Can I cancel anytime?',
      answer: 'Yes, you can cancel or change your subscription anytime.'
    },
    {
      question: 'Is payment secure?',
      answer: 'Payments are fully encrypted and handled by Stripe.'
    },
    {
      question: 'Can I switch between plans?',
      answer: 'Absolutely! You can upgrade or downgrade your plan at any time.'
    },
    {
      question: 'Do you offer a trial?',
      answer: 'Yes, we offer a 14-day free trial for new users.'
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="mt-10 space-y-4">
      {faqData.map((item, index) => (
        <div
          key={index}
          className="rounded-xl bg-sky-800/60 border border-sky-700 p-6 cursor-pointer transition-all duration-300"
          onClick={() => toggleFAQ(index)}
        >
          <h4 className="font-semibold text-white flex justify-between items-center">
            {item.question}
            <span className="text-cyan-300">{openIndex === index ? '-' : '+'}</span>
          </h4>
          {openIndex === index && (
            <p className="mt-2 text-cyan-200 text-sm transition-all duration-300">
              {item.answer}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
