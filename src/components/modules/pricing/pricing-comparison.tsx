"use client";

import { Check, Minus } from "lucide-react";
import {
  pricingComparisonRows,
  pricingPageCopy,
  pricingPlans,
} from "@/data/marketing/pricing";
import type { PricingComparisonValue } from "@/types/marketing";
import { cn } from "@/utils/cn";

function ComparisonCell({
  value,
  featured,
}: {
  value: PricingComparisonValue;
  featured?: boolean;
}) {
  if (typeof value === "string") {
    return (
      <span
        className={cn(
          "text-sm font-medium",
          featured
            ? "text-foreground"
            : "text-foreground/75 dark:text-foreground/70",
        )}
      >
        {value}
      </span>
    );
  }

  if (value) {
    return (
      <span className="inline-flex size-7 items-center justify-center rounded-full bg-accent-soft text-accent">
        <Check className="size-3.5" strokeWidth={2.5} aria-hidden />
        <span className="sr-only">Included</span>
      </span>
    );
  }

  return (
    <span className="inline-flex size-7 items-center justify-center text-foreground/40 dark:text-foreground/35">
      <Minus className="size-3.5" aria-hidden />
      <span className="sr-only">Not included</span>
    </span>
  );
}

export function PricingComparison() {
  const featuredId =
    pricingPlans.find((plan) => plan.highlighted)?.id ?? "team";

  return (
    <section
      data-pricing-section="comparison"
      className="scroll-mt-28"
      aria-labelledby="pricing-comparison-heading"
    >
      <div className="mx-auto mb-8 max-w-2xl text-center lg:mb-10">
        <p className="mb-3 text-sm font-medium tracking-wide text-accent">
          {pricingPageCopy.comparisonEyebrow}
        </p>
        <h2
          id="pricing-comparison-heading"
          className="font-heading text-[1.75rem] font-semibold tracking-tight text-balance sm:text-[2rem] lg:text-[2.4rem]"
        >
          {pricingPageCopy.comparisonTitle}
        </h2>
        <p className="mt-4 text-base leading-7 text-foreground/75 dark:text-foreground/70">
          {pricingPageCopy.comparisonDescription}
        </p>
      </div>

      <div className="pricing-glass-panel overflow-hidden rounded-[1.35rem]">
        <div className="overflow-x-auto overscroll-x-contain [-ms-overflow-style:none] [scrollbar-width:thin]">
          <table className="w-full min-w-[44rem] table-fixed border-collapse text-left">
            <caption className="sr-only">
              Feature comparison across Essential, Team, and Scale plans
            </caption>
            <colgroup>
              <col className="w-[40%]" />
              <col className="w-[20%]" />
              <col className="w-[20%]" />
              <col className="w-[20%]" />
            </colgroup>
            <thead>
              <tr className="border-b border-border/50">
                <th
                  scope="col"
                  className="sticky left-0 z-10 min-w-[11rem] bg-[color-mix(in_oklab,var(--surface)_92%,transparent)] px-4 py-4 text-[0.9375rem] font-semibold text-foreground backdrop-blur-md sm:min-w-[14rem] sm:px-5"
                >
                  {pricingPageCopy.comparisonFeaturesLabel}
                </th>
                {pricingPlans.map((plan) => (
                  <th
                    key={plan.id}
                    scope="col"
                    className={cn(
                      "px-4 py-4 text-center sm:px-5",
                      plan.id === featuredId &&
                        "bg-[color-mix(in_oklab,var(--accent)_8%,transparent)]",
                    )}
                  >
                    <span className="font-heading text-base font-semibold text-foreground">
                      {plan.name}
                    </span>
                    {plan.highlighted ? (
                      <span className="mt-1 block text-[11px] font-semibold tracking-wide text-accent uppercase">
                        {pricingPageCopy.featuredBadge}
                      </span>
                    ) : null}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {pricingComparisonRows.map((row) => (
                <tr
                  key={row.id}
                  className="pricing-compare-row border-b border-border/35 last:border-b-0"
                >
                  <th
                    scope="row"
                    className="sticky left-0 z-10 bg-[color-mix(in_oklab,var(--surface)_94%,transparent)] px-4 py-3.5 text-[0.9375rem] font-medium leading-6 text-foreground backdrop-blur-md sm:px-5"
                  >
                    {row.label}
                  </th>
                  <td
                    className={cn(
                      "px-4 py-3.5 text-center sm:px-5",
                      featuredId === "essential" &&
                        "bg-[color-mix(in_oklab,var(--accent)_5%,transparent)]",
                    )}
                  >
                    <div className="flex justify-center">
                      <ComparisonCell value={row.essential} />
                    </div>
                  </td>
                  <td
                    className={cn(
                      "px-4 py-3.5 text-center sm:px-5",
                      featuredId === "team" &&
                        "bg-[color-mix(in_oklab,var(--accent)_5%,transparent)]",
                    )}
                  >
                    <div className="flex justify-center">
                      <ComparisonCell value={row.team} featured />
                    </div>
                  </td>
                  <td
                    className={cn(
                      "px-4 py-3.5 text-center sm:px-5",
                      featuredId === "scale" &&
                        "bg-[color-mix(in_oklab,var(--accent)_5%,transparent)]",
                    )}
                  >
                    <div className="flex justify-center">
                      <ComparisonCell value={row.scale} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div
        className="mt-4 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-foreground/70 dark:text-foreground/65"
        role="list"
        aria-label="Comparison legend"
      >
        <div className="inline-flex items-center gap-2" role="listitem">
          <span
            className="inline-flex size-7 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent"
            aria-hidden
          >
            <Check className="size-3.5" strokeWidth={2.5} />
          </span>
          <span>{pricingPageCopy.comparisonLegendIncluded}</span>
        </div>
        <div className="inline-flex items-center gap-2" role="listitem">
          <span
            className="inline-flex size-7 shrink-0 items-center justify-center text-foreground/40 dark:text-foreground/35"
            aria-hidden
          >
            <Minus className="size-3.5" />
          </span>
          <span>{pricingPageCopy.comparisonLegendNotIncluded}</span>
        </div>
      </div>
    </section>
  );
}
