"use client";

import { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NovaFallback } from "@/components/modules/home/inbox/nova-fallback";
import { inboxHomeCta } from "@/data/marketing/home-inbox";
import { getGsap } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

const fragments = [
  "Order Tracking",
  "Internal note",
  "Assigned · Orders",
  "Resolved with context",
  "Team handoff",
];

export function InboxFinalCta() {
  const rootRef = useRef<HTMLElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const root = rootRef.current;
    if (!root || reducedMotion) return;
    const { gsap, ScrollTrigger } = getGsap();
    const ctx = gsap.context(() => {
      const items = root.querySelectorAll("[data-ih-finale]");
      gsap.set(items, { autoAlpha: 0, y: 24 });
      ScrollTrigger.create({
        trigger: root,
        start: "top 75%",
        end: "top 35%",
        scrub: 0.5,
        onUpdate: (self) => {
          const p = self.progress;
          items.forEach((item, index) => {
            const local = Math.max(0, Math.min(1, (p - index * 0.08) * 1.35));
            gsap.set(item, { autoAlpha: local, y: 24 * (1 - local) });
          });
        },
      });
    }, root);
    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      ref={rootRef}
      id={inboxHomeCta.id}
      className="ih-section relative overflow-hidden py-20 sm:py-28"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_50%_0%,color-mix(in_oklab,var(--accent)_20%,transparent),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_35%_at_80%_70%,color-mix(in_oklab,var(--ih-cyan)_14%,transparent),transparent_55%)]" />
      </div>

      <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <p data-ih-finale className="ih-eyebrow">
            {inboxHomeCta.eyebrow}
          </p>
          <h2
            data-ih-finale
            className="mt-4 font-heading text-[2.2rem] leading-[1.08] font-semibold tracking-tight text-balance sm:text-[3rem]"
          >
            {inboxHomeCta.title}
          </h2>
          <p
            data-ih-finale
            className="mt-4 max-w-xl text-base leading-7 text-muted"
          >
            {inboxHomeCta.description}
          </p>
          <div data-ih-finale className="mt-8 flex flex-wrap gap-3">
            <Button href={inboxHomeCta.primaryCta.href} size="lg">
              {inboxHomeCta.primaryCta.label}
              <ArrowRight className="size-4" />
            </Button>
            <Button
              href={inboxHomeCta.secondaryCta.href}
              variant="secondary"
              size="lg"
            >
              {inboxHomeCta.secondaryCta.label}
            </Button>
          </div>
          <div data-ih-finale className="mt-8 flex flex-wrap gap-2">
            {fragments.map((fragment) => (
              <span
                key={fragment}
                className="rounded-full border border-border bg-surface/80 px-3 py-1.5 text-xs text-muted"
              >
                {fragment}
              </span>
            ))}
          </div>
        </div>

        <div
          data-ih-finale
          className="relative mx-auto w-full max-w-sm xl:opacity-0"
          aria-hidden
        >
          <div className="absolute inset-8 rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--accent)_22%,transparent),transparent_70%)] blur-2xl" />
          <NovaFallback expression="celebrating" />
        </div>
      </div>
    </section>
  );
}
