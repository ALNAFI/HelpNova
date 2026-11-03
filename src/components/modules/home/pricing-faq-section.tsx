"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { Reveal } from "@/components/common/reveal";
import { Accordion } from "@/components/ui/accordion";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { homeFaqItems } from "@/data/marketing/faq";
import { pricingDisclaimer, pricingPlans } from "@/data/marketing/pricing";
import { cn } from "@/utils/cn";

export function PricingFaqSection() {
  const [yearly, setYearly] = useState(false);

  return (
    <section id="pricing" className="scroll-mt-28 py-16 sm:py-20 lg:py-24">
      <Container>
        <Reveal>
          <SectionHeading
            align="center"
            eyebrow="Pricing preview + FAQ"
            title="Sample plans for exploring the concept"
            description="Three illustrative tiers with a short FAQ. No checkout, subscriptions, or payment processing."
            className="mb-8"
          />
        </Reveal>

        <div className="mb-10 flex justify-center">
          <div
            role="group"
            aria-label="Billing period"
            className="inline-flex items-center rounded-full border border-border bg-surface p-1"
          >
            <button
              type="button"
              aria-pressed={!yearly}
              onClick={() => setYearly(false)}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                !yearly
                  ? "bg-accent text-accent-foreground"
                  : "text-muted hover:text-foreground",
              )}
            >
              Monthly
            </button>
            <button
              type="button"
              aria-pressed={yearly}
              onClick={() => setYearly(true)}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                yearly
                  ? "bg-accent text-accent-foreground"
                  : "text-muted hover:text-foreground",
              )}
            >
              Yearly
            </button>
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          {pricingPlans.map((plan, index) => {
            const price = yearly ? plan.priceYearly : plan.priceMonthly;
            return (
              <Reveal key={plan.id} delay={index * 0.05}>
                <article
                  className={cn(
                    "flex h-full flex-col rounded-[var(--radius-card)] border p-6 shadow-[var(--shadow-soft)]",
                    plan.highlighted
                      ? "border-accent bg-accent-soft/40"
                      : "border-border bg-surface",
                  )}
                >
                  {plan.highlighted ? (
                    <span className="mb-3 inline-flex w-fit rounded-full bg-accent px-2.5 py-1 text-[11px] font-semibold text-accent-foreground">
                      Most explored
                    </span>
                  ) : (
                    <span className="mb-3 inline-flex h-[22px]" aria-hidden />
                  )}
                  <h3 className="font-heading text-xl font-semibold">
                    {plan.name}
                  </h3>
                  <p className="mt-2 text-sm text-muted">{plan.description}</p>
                  <p className="mt-5 flex items-baseline gap-1">
                    <span className="font-heading text-4xl font-semibold tracking-tight">
                      ${price}
                    </span>
                    <span className="text-sm text-muted">
                      /mo {yearly ? "billed yearly" : ""}
                    </span>
                  </p>
                  <ul className="mt-6 space-y-3">
                    {plan.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex gap-2 text-sm text-foreground"
                      >
                        <Check
                          className="mt-0.5 size-4 shrink-0 text-accent"
                          aria-hidden
                        />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-auto pt-6 text-xs text-muted">
                    Sample plan · no purchase available
                  </p>
                </article>
              </Reveal>
            );
          })}
        </div>

        <p className="mx-auto mt-6 max-w-2xl text-center text-sm text-muted">
          {pricingDisclaimer}
        </p>

        <div id="faq" className="mx-auto mt-16 max-w-3xl scroll-mt-28">
          <Reveal>
            <h3 className="mb-5 text-center font-heading text-2xl font-semibold tracking-tight">
              Frequently asked questions
            </h3>
          </Reveal>
          <Reveal delay={0.05}>
            <Accordion items={homeFaqItems} />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
