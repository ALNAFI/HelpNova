"use client";

import { useLayoutEffect, useRef } from "react";
import type { BillingPeriod } from "@/types/marketing";
import { pricingPageCopy } from "@/data/marketing/pricing";
import { getGsap } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { cn } from "@/utils/cn";

type BillingToggleProps = {
  value: BillingPeriod;
  onChange: (period: BillingPeriod) => void;
  className?: string;
};

type ThumbMetrics = {
  x: number;
  width: number;
};

function measureThumb(
  track: HTMLElement,
  option: HTMLElement,
): ThumbMetrics {
  const trackRect = track.getBoundingClientRect();
  const optionRect = option.getBoundingClientRect();
  return {
    x: optionRect.left - trackRect.left,
    width: optionRect.width,
  };
}

export function BillingToggle({
  value,
  onChange,
  className,
}: BillingToggleProps) {
  const reducedMotion = usePrefersReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLSpanElement>(null);
  const monthlyRef = useRef<HTMLButtonElement>(null);
  const yearlyRef = useRef<HTMLButtonElement>(null);
  const placedRef = useRef(false);
  const metricsRef = useRef<ThumbMetrics>({ x: 0, width: 0 });
  const yearlySelected = value === "yearly";

  useLayoutEffect(() => {
    const track = trackRef.current;
    const thumb = thumbRef.current;
    const active =
      value === "yearly" ? yearlyRef.current : monthlyRef.current;
    if (!track || !thumb || !active) return;

    const next = measureThumb(track, active);
    const { gsap } = getGsap();
    gsap.killTweensOf(thumb);

    if (reducedMotion || !placedRef.current) {
      gsap.set(thumb, {
        x: next.x,
        width: next.width,
        scaleX: 1,
        transformOrigin: "50% 50%",
      });
      metricsRef.current = next;
      placedRef.current = true;
      return;
    }

    const prev = metricsRef.current;
    const movingRight = next.x >= prev.x;
    const travel = Math.abs(next.x - prev.x) + Math.abs(next.width - prev.width);
    if (travel < 0.5) {
      gsap.set(thumb, {
        x: next.x,
        width: next.width,
        scaleX: 1,
        transformOrigin: "50% 50%",
      });
      metricsRef.current = next;
      return;
    }

    // Jelly slide: stretch while moving, soft overshoot, squash, settle (~620ms).
    const origin = movingRight ? "left center" : "right center";
    const tl = gsap.timeline({
      defaults: { overwrite: "auto" },
      onComplete: () => {
        gsap.set(thumb, {
          x: next.x,
          width: next.width,
          scaleX: 1,
          transformOrigin: "50% 50%",
        });
      },
    });

    tl.to(
      thumb,
      {
        x: next.x,
        width: next.width,
        duration: 0.62,
        ease: "elastic.out(1.08, 0.52)",
      },
      0,
    );
    tl.fromTo(
      thumb,
      { scaleX: 1, transformOrigin: origin },
      {
        keyframes: [
          { scaleX: 1.22, duration: 0.16, ease: "power2.out" },
          { scaleX: 0.9, duration: 0.2, ease: "power2.inOut" },
          { scaleX: 1.04, duration: 0.14, ease: "power2.out" },
          { scaleX: 1, duration: 0.14, ease: "power2.out" },
        ],
      },
      0,
    );

    metricsRef.current = next;

    return () => {
      tl.kill();
    };
  }, [value, reducedMotion]);

  useLayoutEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const sync = () => {
      const thumb = thumbRef.current;
      const active =
        value === "yearly" ? yearlyRef.current : monthlyRef.current;
      if (!thumb || !active) return;
      const next = measureThumb(track, active);
      const { gsap } = getGsap();
      gsap.killTweensOf(thumb);
      gsap.set(thumb, {
        x: next.x,
        width: next.width,
        scaleX: 1,
        transformOrigin: "50% 50%",
      });
      metricsRef.current = next;
    };

    const ro = new ResizeObserver(sync);
    ro.observe(track);
    window.addEventListener("resize", sync);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", sync);
    };
  }, [value]);

  return (
    <div className={cn("flex flex-col items-center gap-3", className)}>
      <div
        ref={trackRef}
        role="group"
        aria-label="Billing period"
        className="pricing-glass-toggle relative inline-grid grid-cols-2 rounded-full p-1"
      >
        <span
          ref={thumbRef}
          aria-hidden
          className="pricing-glass-toggle-thumb pointer-events-none absolute top-1 bottom-1 left-0 rounded-full will-change-transform"
        />
        <button
          ref={monthlyRef}
          type="button"
          className={cn(
            "pricing-glass-toggle-opt relative z-10 rounded-full px-5 py-2.5 text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
            !yearlySelected
              ? "text-foreground"
              : "text-muted hover:text-foreground",
          )}
          aria-pressed={!yearlySelected}
          onClick={() => onChange("monthly")}
        >
          {pricingPageCopy.monthlyLabel}
        </button>
        <button
          ref={yearlyRef}
          type="button"
          className={cn(
            "pricing-glass-toggle-opt relative z-10 rounded-full px-5 py-2.5 text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
            yearlySelected
              ? "text-foreground"
              : "text-muted hover:text-foreground",
          )}
          aria-pressed={yearlySelected}
          onClick={() => onChange("yearly")}
        >
          {pricingPageCopy.yearlyLabel}
        </button>
      </div>

      <p
        key={value}
        className="pricing-billing-note min-h-5 text-center text-xs font-medium tracking-wide text-foreground/65 dark:text-foreground/60"
        aria-live="polite"
      >
        {pricingPageCopy.billingToggleHint}
      </p>
    </div>
  );
}
