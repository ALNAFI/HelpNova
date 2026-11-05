"use client";

import { useRef } from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedPrice } from "@/components/modules/pricing/animated-price";
import {
  formatPlanPrice,
  getPlanPrice,
  getYearlyAnnualTotal,
  pricingPageCopy,
} from "@/data/marketing/pricing";
import type { BillingPeriod, PricingPlan } from "@/types/marketing";
import { cn } from "@/utils/cn";

type PricingCardProps = {
  plan: PricingPlan;
  period: BillingPeriod;
  selected: boolean;
  onSelect: (planId: string) => void;
  cardRef?: (node: HTMLElement | null) => void;
};

function canTrackPointer() {
  if (typeof window === "undefined") return false;
  if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
    return false;
  }
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return false;
  }
  return true;
}

export function PricingCard({
  plan,
  period,
  selected,
  onSelect,
  cardRef,
}: PricingCardProps) {
  const localRef = useRef<HTMLElement | null>(null);
  const price = getPlanPrice(plan, period);
  const yearlyAnnual = getYearlyAnnualTotal(plan);
  const showPopularBadge = Boolean(plan.highlighted);
  const isContactCta = plan.cta.href.includes("contact");

  const assignRef = (node: HTMLElement | null) => {
    localRef.current = node;
    cardRef?.(node);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLElement>) => {
    const el = localRef.current;
    if (!el || event.pointerType !== "mouse" || !canTrackPointer()) return;

    const rect = el.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;

    el.style.setProperty("--mouse-x", `${x}%`);
    el.style.setProperty("--mouse-y", `${y}%`);
    el.style.setProperty("--glow-opacity", "1");

    const tiltX = ((event.clientY - rect.top) / rect.height - 0.5) * -3;
    const tiltY = ((event.clientX - rect.left) / rect.width - 0.5) * 3;
    el.style.setProperty("--pricing-tilt-x", `${tiltX.toFixed(2)}deg`);
    el.style.setProperty("--pricing-tilt-y", `${tiltY.toFixed(2)}deg`);
  };

  const handlePointerEnter = (event: React.PointerEvent<HTMLElement>) => {
    const el = localRef.current;
    if (!el || event.pointerType !== "mouse" || !canTrackPointer()) return;

    const rect = el.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    el.style.setProperty("--mouse-x", `${x}%`);
    el.style.setProperty("--mouse-y", `${y}%`);
    el.style.setProperty("--glow-opacity", "1");
  };

  const handlePointerLeave = () => {
    const el = localRef.current;
    if (!el) return;
    el.style.setProperty("--glow-opacity", "0");
    el.style.setProperty("--pricing-tilt-x", "0deg");
    el.style.setProperty("--pricing-tilt-y", "0deg");
  };

  return (
    <article
      ref={assignRef}
      data-pricing-card
      data-plan-id={plan.id}
      data-selected={selected ? "true" : "false"}
      onPointerEnter={handlePointerEnter}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={cn(
        "pricing-glass-card group relative flex h-full flex-col overflow-hidden rounded-[1.35rem]",
        selected && "pricing-glass-card-selected",
      )}
      style={
        {
          "--mouse-x": "50%",
          "--mouse-y": "28%",
          "--glow-opacity": "0",
          "--pricing-tilt-x": "0deg",
          "--pricing-tilt-y": "0deg",
        } as React.CSSProperties
      }
    >
      <div className="pricing-glass-card-glow" aria-hidden />
      <div className="pricing-glass-card-border" aria-hidden />
      <div className="pricing-glass-card-shine" aria-hidden />

      <div className="relative z-10 flex h-full flex-col p-6 sm:p-7">
        <div className="flex min-h-[1.5rem] items-start">
          {showPopularBadge ? (
            <span className="inline-flex rounded-full bg-accent px-2.5 py-1 text-[11px] font-semibold tracking-wide text-accent-foreground shadow-[0_8px_20px_color-mix(in_oklab,var(--accent)_35%,transparent)]">
              {pricingPageCopy.featuredBadge}
            </span>
          ) : (
            <span className="inline-flex h-[22px]" aria-hidden />
          )}
        </div>

        <h3 className="mt-4 font-heading text-2xl font-semibold tracking-tight text-foreground">
          {plan.name}
        </h3>
        <p className="mt-2 min-h-[3rem] text-sm leading-6 text-foreground/75 dark:text-foreground/70">
          {plan.description}
        </p>

        <div className="mt-5 flex items-end gap-1.5">
          <AnimatedPrice
            amount={price}
            className="font-heading text-4xl font-semibold tracking-tight text-foreground sm:text-[2.75rem]"
          />
          <div className="mb-1.5 flex flex-col text-sm text-foreground/70 dark:text-foreground/65">
            <span>{pricingPageCopy.perMonthSuffix}</span>
            <span key={period} className="pricing-billing-note text-xs text-foreground/65 dark:text-foreground/60">
              {period === "yearly"
                ? `${formatPlanPrice(yearlyAnnual)} billed yearly`
                : pricingPageCopy.billedMonthlyHint}
            </span>
          </div>
        </div>

        <div
          className="mt-5 h-px w-full bg-gradient-to-r from-transparent via-[color-mix(in_oklab,var(--border-strong)_85%,transparent)] to-transparent"
          aria-hidden
        />

        <ul className="mt-5 flex flex-1 flex-col gap-2.5">
          {plan.features.map((feature) => (
            <li
              key={feature}
              className="flex gap-2.5 text-sm leading-6 text-foreground/90"
            >
              <span className="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent">
                <Check className="size-3.5" strokeWidth={2.5} aria-hidden />
              </span>
              {feature}
            </li>
          ))}
        </ul>

        <div className="mt-8">
          {isContactCta ? (
            <Button
              href={plan.cta.href}
              variant={selected ? "primary" : "secondary"}
              size="lg"
              className={cn("w-full", selected && "pricing-purchase-selected")}
              aria-label={plan.cta.label}
              onClick={() => onSelect(plan.id)}
            >
              {plan.cta.label}
            </Button>
          ) : (
            <Button
              type="button"
              variant={selected ? "primary" : "secondary"}
              size="lg"
              className={cn("w-full", selected && "pricing-purchase-selected")}
              aria-pressed={selected}
              aria-label={
                selected
                  ? `${plan.name} plan selected`
                  : `${plan.cta.label} — select ${plan.name}`
              }
              onClick={() => onSelect(plan.id)}
            >
              {plan.cta.label}
            </Button>
          )}
        </div>
      </div>
    </article>
  );
}
