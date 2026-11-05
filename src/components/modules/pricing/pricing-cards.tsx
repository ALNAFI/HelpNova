"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { PricingCard } from "@/components/modules/pricing/pricing-card";
import {
  pricingDisclaimer,
  pricingPlans,
} from "@/data/marketing/pricing";
import { getGsap } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import type { BillingPeriod } from "@/types/marketing";

type PricingCardsProps = {
  period: BillingPeriod;
};

type SelectionTimeline = ReturnType<
  ReturnType<typeof getGsap>["gsap"]["timeline"]
>;

const DEFAULT_PLAN_ID = "team";

function alignFrameToCard(
  frame: HTMLElement,
  card: HTMLElement,
  shell: HTMLElement,
) {
  const shellRect = shell.getBoundingClientRect();
  const cardRect = card.getBoundingClientRect();
  const { gsap } = getGsap();

  gsap.set(frame, {
    x: cardRect.left - shellRect.left,
    y: cardRect.top - shellRect.top,
    width: cardRect.width,
    height: cardRect.height,
    scaleX: 1,
    scaleY: 1,
    transformOrigin: "50% 50%",
    autoAlpha: 1,
  });
}

export function PricingCards({ period }: PricingCardsProps) {
  const reducedMotion = usePrefersReducedMotion();
  const [selectedPlanId, setSelectedPlanId] = useState(DEFAULT_PLAN_ID);
  const shellRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef(new Map<string, HTMLElement>());
  const selectedRef = useRef(selectedPlanId);
  const animatingRef = useRef(false);
  const timelineRef = useRef<SelectionTimeline | null>(null);
  const reducedMotionRef = useRef(reducedMotion);

  useEffect(() => {
    selectedRef.current = selectedPlanId;
  }, [selectedPlanId]);

  useEffect(() => {
    reducedMotionRef.current = reducedMotion;
  }, [reducedMotion]);

  const setCardRef = useCallback((id: string, node: HTMLElement | null) => {
    if (node) cardRefs.current.set(id, node);
    else cardRefs.current.delete(id);
  }, []);

  const syncFrameToSelected = useCallback(() => {
    const shell = shellRef.current;
    const frame = frameRef.current;
    const card = cardRefs.current.get(selectedRef.current);
    if (!shell || !frame || !card) return;
    alignFrameToCard(frame, card, shell);
  }, []);

  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      syncFrameToSelected();
    });

    const shell = shellRef.current;
    if (!shell) {
      return () => cancelAnimationFrame(raf);
    }

    const onResize = () => {
      if (animatingRef.current) return;
      syncFrameToSelected();
    };

    const resizeObserver = new ResizeObserver(onResize);
    resizeObserver.observe(shell);
    cardRefs.current.forEach((card) => resizeObserver.observe(card));
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      resizeObserver.disconnect();
      window.removeEventListener("resize", onResize);
      timelineRef.current?.kill();
      timelineRef.current = null;
    };
  }, [syncFrameToSelected]);

  const handleSelect = useCallback((planId: string) => {
    if (planId === selectedRef.current && !animatingRef.current) return;

    const shell = shellRef.current;
    const frame = frameRef.current;
    const fromId = selectedRef.current;
    const fromCard = cardRefs.current.get(fromId);
    const toCard = cardRefs.current.get(planId);
    if (!shell || !frame || !toCard) {
      setSelectedPlanId(planId);
      return;
    }

    const { gsap, Flip } = getGsap();
    timelineRef.current?.kill();
    gsap.killTweensOf(frame);
    animatingRef.current = false;

    if (reducedMotionRef.current || !fromCard || fromId === planId) {
      setSelectedPlanId(planId);
      alignFrameToCard(frame, toCard, shell);
      return;
    }

    animatingRef.current = true;
    setSelectedPlanId(planId);
    alignFrameToCard(frame, fromCard, shell);

    const tl = gsap.timeline({
      defaults: { overwrite: "auto" },
      onComplete: () => {
        animatingRef.current = false;
        alignFrameToCard(frame, toCard, shell);
      },
    });
    timelineRef.current = tl;

    tl.to(frame, {
      scaleX: 0.9,
      scaleY: 0.93,
      duration: 0.15,
      ease: "power2.in",
    });

    tl.add(() =>
      Flip.fit(frame, toCard, {
        scale: true,
        duration: 0.42,
        ease: "power3.inOut",
      }),
    );

    tl.to(frame, {
      scaleX: 1.02,
      scaleY: 1.015,
      duration: 0.12,
      ease: "power2.out",
    });
    tl.to(frame, {
      scaleX: 1,
      scaleY: 1,
      duration: 0.16,
      ease: "power2.inOut",
    });
  }, []);

  const selectedPlanName =
    pricingPlans.find((plan) => plan.id === selectedPlanId)?.name ?? "Team";

  return (
    <div className="relative">
      <div ref={shellRef} className="relative">
        <div className="sr-only" aria-live="polite" aria-atomic="true">
          {selectedPlanName} plan selected. Plan selection is visual only—no
          payment is processed.
        </div>

        <div ref={frameRef} className="pricing-selection-frame" aria-hidden />

        <div className="grid items-stretch gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {pricingPlans.map((plan) => (
            <PricingCard
              key={plan.id}
              plan={plan}
              period={period}
              selected={selectedPlanId === plan.id}
              onSelect={handleSelect}
              cardRef={(node) => setCardRef(plan.id, node)}
            />
          ))}
        </div>
      </div>
      <p className="mx-auto mt-6 max-w-xl text-center text-sm leading-6 text-foreground/70 dark:text-foreground/65">
        {pricingDisclaimer}
      </p>
    </div>
  );
}
