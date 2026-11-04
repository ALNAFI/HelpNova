"use client";

import { PricingCard } from "@/components/modules/pricing/pricing-card";
import {
  pricingDisclaimer,
  pricingPlans,
} from "@/data/marketing/pricing";
import type { BillingPeriod } from "@/types/marketing";

type PricingCardsProps = {
  period: BillingPeriod;
};

export function PricingCards({ period }: PricingCardsProps) {
  return (
    <div className="relative">
      <div
        className="grid items-stretch gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-5"
        aria-live="polite"
      >
        {pricingPlans.map((plan) => (
          <PricingCard key={plan.id} plan={plan} period={period} />
        ))}
      </div>
      <p className="mx-auto mt-7 max-w-2xl text-center text-sm leading-6 text-muted">
        {pricingDisclaimer}
      </p>
    </div>
  );
}
