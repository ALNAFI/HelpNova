"use client";

import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { pricingPageCopy } from "@/data/marketing/pricing";

export function PricingCta() {
  return (
    <section
      data-pricing-section="cta"
      className="scroll-mt-28"
      aria-labelledby="pricing-final-cta-heading"
    >
      <div className="pricing-glass-cta relative overflow-hidden rounded-[1.5rem] px-6 py-12 text-center sm:px-10 sm:py-14 lg:px-16 lg:py-16">
        <div
          className="pointer-events-none absolute -top-24 left-1/2 size-72 -translate-x-1/2 rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--accent)_34%,transparent),transparent_70%)] blur-2xl"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 bg-noise opacity-[0.05]"
          aria-hidden
        />
        <div className="relative mx-auto max-w-2xl">
          <h2
            id="pricing-final-cta-heading"
            data-pricing-cta
            className="font-heading text-[1.85rem] font-semibold tracking-tight text-balance sm:text-4xl lg:text-[2.65rem]"
          >
            {pricingPageCopy.ctaTitle}
          </h2>
          <p
            data-pricing-cta
            className="mx-auto mt-4 max-w-xl text-base leading-7 text-muted"
          >
            {pricingPageCopy.ctaDescription}
          </p>
          <div
            data-pricing-cta
            className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <Button href={pricingPageCopy.ctaPrimary.href} size="lg">
              {pricingPageCopy.ctaPrimary.label}
              <ArrowUpRight className="size-4" aria-hidden />
            </Button>
            <Button
              href={pricingPageCopy.ctaSecondary.href}
              variant="secondary"
              size="lg"
            >
              {pricingPageCopy.ctaSecondary.label}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
