"use client";

import { useEffect, useRef, useState } from "react";
import { BillingToggle } from "@/components/modules/pricing/billing-toggle";
import { PricingCards } from "@/components/modules/pricing/pricing-cards";
import { PricingComparison } from "@/components/modules/pricing/pricing-comparison";
import { PricingCta } from "@/components/modules/pricing/pricing-cta";
import { PricingFaq } from "@/components/modules/pricing/pricing-faq";
import { PricingHero } from "@/components/modules/pricing/pricing-hero";
import { Container } from "@/components/ui/container";
import { getGsap } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import type { BillingPeriod } from "@/types/marketing";

export function PricingPage() {
  const pageRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();
  const [billingPeriod, setBillingPeriod] =
    useState<BillingPeriod>("monthly");

  useEffect(() => {
    const el = pageRef.current;
    if (!el || reducedMotion) return;

    const { gsap } = getGsap();
    const ctx = gsap.context(() => {
      const heroTargets = el.querySelectorAll<HTMLElement>("[data-pricing-hero]");
      gsap.set(heroTargets, { clearProps: "all" });
      gsap.fromTo(
        heroTargets,
        { y: 18, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.65,
          stagger: 0.08,
          ease: "power3.out",
          immediateRender: false,
        },
      );

      gsap.fromTo(
        "[data-pricing-toggle]",
        { y: 16, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.55,
          delay: 0.22,
          ease: "power3.out",
          immediateRender: false,
        },
      );

      gsap.fromTo(
        "[data-pricing-card]",
        { y: 28, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.7,
          stagger: 0.08,
          delay: 0.28,
          ease: "power3.out",
          immediateRender: false,
        },
      );

      gsap.utils
        .toArray<HTMLElement>("[data-pricing-section]")
        .forEach((section) => {
          gsap.fromTo(
            section,
            { y: 24, autoAlpha: 0 },
            {
              y: 0,
              autoAlpha: 1,
              duration: 0.75,
              ease: "power3.out",
              immediateRender: false,
              scrollTrigger: {
                trigger: section,
                start: "top 86%",
                once: true,
              },
            },
          );
        });
    }, el);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <div ref={pageRef} className="relative overflow-hidden pb-16 sm:pb-20 lg:pb-24">
      <div className="pointer-events-none absolute inset-0 bg-grid-fade opacity-80" />
      <div className="pointer-events-none absolute inset-0 bg-noise" />
      <div
        className="pointer-events-none absolute top-[28%] left-[-10%] size-[22rem] rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--accent)_8%,transparent),transparent_72%)] blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute top-[52%] right-[-12%] size-[24rem] rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--accent)_6%,transparent),transparent_72%)] blur-3xl"
        aria-hidden
      />

      <Container className="relative space-y-16 sm:space-y-20 lg:space-y-24">
        <div>
          <PricingHero />
          <div data-pricing-toggle className="mt-8 sm:mt-10">
            <BillingToggle
              value={billingPeriod}
              onChange={setBillingPeriod}
            />
          </div>
          <div className="mt-8 sm:mt-10">
            <PricingCards period={billingPeriod} />
          </div>
        </div>

        <PricingComparison />
        <PricingFaq />
        <PricingCta />
      </Container>
    </div>
  );
}
