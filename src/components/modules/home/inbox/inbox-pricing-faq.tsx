"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Accordion } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  inboxHomeFaqItems,
  inboxHomePricingFaq,
} from "@/data/marketing/home-inbox";
import { pricingPlans } from "@/data/marketing/pricing";
import { cn } from "@/utils/cn";

export function InboxPricingFaq() {
  const [yearly, setYearly] = useState(false);

  return (
    <section id={inboxHomePricingFaq.id} className="ih-section py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <p className="ih-eyebrow">{inboxHomePricingFaq.eyebrow}</p>
          <h2 className="mt-3 font-heading text-[2rem] font-semibold tracking-tight text-balance sm:text-[2.6rem]">
            {inboxHomePricingFaq.title}
          </h2>
          <p className="mt-4 text-base leading-7 text-muted">
            {inboxHomePricingFaq.pricingIntro}
          </p>
        </div>

        <div className="mt-6 flex items-center gap-3">
          <span className={cn("text-sm", !yearly && "font-semibold")}>
            Monthly
          </span>
          <button
            type="button"
            role="switch"
            aria-checked={yearly}
            aria-label="Toggle yearly pricing"
            onClick={() => setYearly((value) => !value)}
            className={cn(
              "relative h-7 w-12 rounded-full border transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              yearly ? "border-accent bg-accent" : "border-border bg-surface",
            )}
          >
            <span
              className={cn(
                "absolute top-0.5 left-0.5 size-5 rounded-full bg-white transition",
                yearly && "translate-x-5",
              )}
            />
          </button>
          <span className={cn("text-sm", yearly && "font-semibold")}>
            Yearly
          </span>
        </div>

        <div className="mt-8 space-y-4 md:space-y-0 md:grid md:grid-cols-3 md:gap-4">
          {pricingPlans.map((plan, index) => (
            <article
              key={plan.id}
              className={cn(
                "rounded-[1.5rem] border p-5 transition",
                plan.highlighted
                  ? "border-accent/45 bg-[linear-gradient(165deg,color-mix(in_oklab,var(--accent)_14%,var(--surface)),var(--surface))] shadow-[var(--shadow-soft)] md:-translate-y-2"
                  : "border-border bg-surface",
                index === 1 && "md:order-none",
              )}
            >
              <h3 className="font-heading text-lg font-semibold">{plan.name}</h3>
              <p className="mt-2 text-sm text-muted">{plan.description}</p>
              <p className="mt-4 font-heading text-3xl font-semibold">
                ${yearly ? plan.priceYearly : plan.priceMonthly}
                <span className="text-sm font-medium text-muted"> /mo</span>
              </p>
              <ul className="mt-4 space-y-2">
                {plan.features.map((feature) => (
                  <li key={feature} className="text-sm text-muted">
                    {feature}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <Button
          href={inboxHomePricingFaq.pricingCta.href}
          variant="secondary"
          className="mt-6"
        >
          {inboxHomePricingFaq.pricingCta.label}
          <ArrowRight className="size-4" />
        </Button>

        <div className="mt-16 max-w-3xl">
          <h3 className="font-heading text-xl font-semibold">
            {inboxHomePricingFaq.faqTitle}
          </h3>
          <div className="mt-5">
            <Accordion items={inboxHomeFaqItems} />
          </div>
          <Button
            href={inboxHomePricingFaq.faqCta.href}
            variant="ghost"
            className="mt-4"
          >
            {inboxHomePricingFaq.faqCta.label}
            <ArrowRight className="size-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}
