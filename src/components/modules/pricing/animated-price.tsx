"use client";

import { formatPlanPrice } from "@/data/marketing/pricing";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { cn } from "@/utils/cn";

const DIGITS = Array.from({ length: 10 }, (_, i) => i);

type AnimatedPriceProps = {
  amount: number;
  className?: string;
};

export function AnimatedPrice({ amount, className }: AnimatedPriceProps) {
  const reducedMotion = usePrefersReducedMotion();
  const digits = String(Math.max(0, Math.round(amount)))
    .split("")
    .map((d) => Number(d));

  return (
    <span className={cn("inline-flex items-start tabular-nums", className)}>
      <span className="sr-only">{formatPlanPrice(amount)}</span>
      <span aria-hidden className="pricing-price-currency mt-[0.22em] text-[0.42em] font-semibold leading-none">
        $
      </span>
      <span
        aria-hidden
        className="pricing-digit-strip ml-0.5 inline-flex h-[1em] overflow-hidden leading-none"
      >
        {digits.map((digit, index) => (
          <span
            key={`${digits.length}-${index}`}
            className={cn(
              "pricing-digit-reel inline-flex flex-col will-change-transform",
              reducedMotion && "pricing-digit-reel-static",
            )}
            style={{
              transform: `translateY(${-digit}em)`,
              transitionDelay: reducedMotion ? "0ms" : `${index * 70}ms`,
            }}
          >
            {DIGITS.map((n) => (
              <span
                key={n}
                className="flex h-[1em] items-center justify-center"
              >
                {n}
              </span>
            ))}
          </span>
        ))}
      </span>
    </span>
  );
}
