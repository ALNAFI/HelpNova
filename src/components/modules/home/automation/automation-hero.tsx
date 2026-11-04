"use client";

import { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AutomationCore } from "@/components/modules/home/automation/automation-core";
import { useAutomationScroll } from "@/components/modules/home/automation/automation-scroll-context";
import { automationHomeHero } from "@/data/marketing/home-automation";
import { getGsap } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

export function AutomationHero() {
  const rootRef = useRef<HTMLElement>(null);
  const reducedMotion = usePrefersReducedMotion();
  const { progress } = useAutomationScroll();

  useEffect(() => {
    const root = rootRef.current;
    if (!root || reducedMotion) return;
    const { gsap } = getGsap();
    const ctx = gsap.context(() => {
      const items = root.querySelectorAll("[data-au-hero]");
      gsap.fromTo(
        items,
        { autoAlpha: 0, y: 24 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.08,
          ease: "power3.out",
          delay: 0.05,
        },
      );
    }, root);
    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      ref={rootRef}
      id="automation-hero"
      className="au-section relative overflow-hidden pb-20 sm:pb-28"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_80%_10%,color-mix(in_oklab,var(--accent)_22%,transparent),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_10%_80%,color-mix(in_oklab,var(--au-cyan)_16%,transparent),transparent_55%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--au-grid)_1px,transparent_1px),linear-gradient(to_bottom,var(--au-grid)_1px,transparent_1px)] bg-size-[56px_56px] opacity-60" />
      </div>

      <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-8">
        <div className="max-w-xl">
          <p data-au-hero className="au-eyebrow">
            {automationHomeHero.eyebrow}
          </p>
          <h1
            data-au-hero
            className="mt-5 font-heading text-[2.4rem] leading-[1.05] font-semibold tracking-tight text-balance sm:text-[3.4rem] lg:text-[3.8rem]"
          >
            {automationHomeHero.titleLead}{" "}
            <span className="bg-gradient-to-r from-accent via-[var(--au-lavender)] to-[var(--au-cyan)] bg-clip-text text-transparent">
              {automationHomeHero.titleAccent}
            </span>
          </h1>
          <p
            data-au-hero
            className="mt-5 max-w-lg text-base leading-7 text-muted sm:text-[1.05rem] sm:leading-8"
          >
            {automationHomeHero.description}
          </p>
          <div data-au-hero className="mt-8 flex flex-wrap gap-3">
            <Button href={automationHomeHero.primaryCta.href} size="lg">
              {automationHomeHero.primaryCta.label}
              <ArrowRight className="size-4" />
            </Button>
            <Button
              href={automationHomeHero.secondaryCta.href}
              variant="secondary"
              size="lg"
            >
              {automationHomeHero.secondaryCta.label}
            </Button>
          </div>
          <p data-au-hero className="mt-5 text-sm text-muted">
            {automationHomeHero.microcopy}
          </p>
        </div>

        <div
          data-au-hero
          className="relative"
          style={{
            transform: `translate3d(0, ${progress * -40}px, 0) rotate(${progress * 8}deg)`,
          }}
        >
          <AutomationCore progress={Math.min(1, progress * 3)} />
        </div>
      </div>
    </section>
  );
}
