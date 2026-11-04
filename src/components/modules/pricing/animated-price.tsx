"use client";

import { formatPlanPrice } from "@/data/marketing/pricing";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { cn } from "@/utils/cn";

type AnimatedPriceProps = {
  amount: number;
  className?: string;
};

export function AnimatedPrice({ amount, className }: AnimatedPriceProps) {
  const reducedMotion = usePrefersReducedMotion();

  return (
    <span className={cn("inline-flex overflow-hidden tabular-nums", className)}>
      <span
        key={amount}
        className={cn(
          "inline-block will-change-transform",
          !reducedMotion && "pricing-price-enter",
        )}
      >
        {formatPlanPrice(amount)}
      </span>
    </span>
  );
}
