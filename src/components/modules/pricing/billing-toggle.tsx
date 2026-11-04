"use client";

import type { BillingPeriod } from "@/types/marketing";
import { pricingPageCopy } from "@/data/marketing/pricing";
import { cn } from "@/utils/cn";

type BillingToggleProps = {
  value: BillingPeriod;
  onChange: (period: BillingPeriod) => void;
  savingsPercent: number | null;
  className?: string;
};

export function BillingToggle({
  value,
  onChange,
  savingsPercent,
  className,
}: BillingToggleProps) {
  const yearlySelected = value === "yearly";

  return (
    <div className={cn("flex flex-col items-center gap-3", className)}>
      <div
        role="radiogroup"
        aria-label="Billing period"
        className="pricing-glass-toggle relative inline-grid grid-cols-2 rounded-full p-1"
      >
        <span
          aria-hidden
          className={cn(
            "pricing-glass-toggle-thumb pointer-events-none absolute top-1 bottom-1 left-1 w-[calc(50%-4px)] rounded-full",
            yearlySelected && "translate-x-full",
          )}
        />
        <button
          type="button"
          role="radio"
          aria-checked={!yearlySelected}
          onClick={() => onChange("monthly")}
          className={cn(
            "relative z-10 rounded-full px-5 py-2.5 text-sm font-medium transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
            !yearlySelected ? "text-foreground" : "text-muted hover:text-foreground",
          )}
        >
          {pricingPageCopy.monthlyLabel}
        </button>
        <button
          type="button"
          role="radio"
          aria-checked={yearlySelected}
          onClick={() => onChange("yearly")}
          className={cn(
            "relative z-10 rounded-full px-5 py-2.5 text-sm font-medium transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
            yearlySelected ? "text-foreground" : "text-muted hover:text-foreground",
          )}
        >
          {pricingPageCopy.yearlyLabel}
        </button>
      </div>

      <p
        className="min-h-5 text-center text-xs font-medium tracking-wide text-muted"
        aria-live="polite"
      >
        {yearlySelected && savingsPercent !== null
          ? `Save up to ${savingsPercent}% with yearly billing`
          : "Switch anytime between monthly and yearly sample amounts"}
      </p>
    </div>
  );
}
