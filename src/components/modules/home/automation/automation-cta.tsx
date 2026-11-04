"use client";

import { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AutomationCore } from "@/components/modules/home/automation/automation-core";
import { useAutomationScroll } from "@/components/modules/home/automation/automation-scroll-context";
import { automationHomeCta } from "@/data/marketing/home-automation";
import { getGsap } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

export function AutomationCta() {
  const rootRef = useRef<HTMLElement>(null);
  const reducedMotion = usePrefersReducedMotion();
  const { progress } = useAutomationScroll();

  useEffect(() => {
    const root = rootRef.current;
    if (!root || reducedMotion) return;
    const { gsap } = getGsap();
    const ctx = gsap.context(() => {
      const items = root.querySelectorAll("[data-au-cta]");
      gsap.fromTo(
        items,
        { autoAlpha: 0, y: 28 },
        {
          autoAlpha: 1,
          y: 0,
          stagger: 0.08,
          ease: "none",
          scrollTrigger: {
            trigger: root,
            start: "top 75%",
            end: "top 40%",
            scrub: 0.55,
          },
        },
      );
    }, root);
    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      ref={rootRef}
      id={automationHomeCta.id}
      className="au-section relative overflow-hidden py-24 sm:py-32"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_40%,color-mix(in_oklab,var(--accent)_20%,transparent),transparent_65%)]" />
      </div>

      <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
        <div>
          <p data-au-cta className="au-eyebrow">
            The Future Starts With a Trigger
          </p>
          <h2
            data-au-cta
            className="mt-4 font-heading text-[2.2rem] font-semibold tracking-tight text-balance sm:text-[3rem]"
          >
            {automationHomeCta.title}
          </h2>
          <p
            data-au-cta
            className="mt-4 max-w-xl text-base leading-7 text-muted"
          >
            {automationHomeCta.description}
          </p>
          <div data-au-cta className="mt-8 flex flex-wrap gap-3">
            <Button href={automationHomeCta.primaryCta.href} size="lg">
              {automationHomeCta.primaryCta.label}
              <ArrowRight className="size-4" />
            </Button>
            <Button
              href={automationHomeCta.secondaryCta.href}
              variant="secondary"
              size="lg"
            >
              {automationHomeCta.secondaryCta.label}
            </Button>
          </div>
        </div>
        <div data-au-cta>
          <AutomationCore progress={Math.max(0.7, progress)} />
        </div>
      </div>
    </section>
  );
}
