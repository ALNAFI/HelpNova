"use client";

import { useEffect, useRef } from "react";
import { ArrowDown, ArrowRight, Package, StickyNote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { inboxFeatureHero } from "@/data/marketing/inbox-feature";
import { getGsap } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

export function InboxFeatureHero() {
  const rootRef = useRef<HTMLElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const root = rootRef.current;
    if (!root || reducedMotion) return;
    const { gsap } = getGsap();
    const ctx = gsap.context(() => {
      const message = root.querySelector("[data-inbox-hero-message]");
      const stamp = root.querySelector("[data-inbox-hero-stamp]");
      const note = root.querySelector("[data-inbox-hero-note]");
      const line = root.querySelector<SVGPathElement>("[data-inbox-hero-line]");

      gsap.set([message, stamp, note], { autoAlpha: 0, y: 12 });
      if (line && typeof line.getTotalLength === "function") {
        const length = line.getTotalLength();
        gsap.set(line, {
          strokeDasharray: length,
          strokeDashoffset: length,
          opacity: 0.35,
        });
      }

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.to(message, { autoAlpha: 1, y: 0, duration: 0.45 })
        .to(stamp, { autoAlpha: 1, y: 0, duration: 0.35 }, "-=0.12")
        .to(
          line,
          { strokeDashoffset: 0, opacity: 1, duration: 0.35 },
          "-=0.1",
        )
        .to(note, { autoAlpha: 1, y: 0, duration: 0.4 }, "-=0.15");
    }, root);
    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <header
      ref={rootRef}
      className="relative overflow-hidden pt-12 pb-14 sm:pt-16 sm:pb-16 lg:pb-20"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_80%_0%,var(--glow),transparent_60%)]" />
        <div className="absolute inset-0 bg-grid-fade [mask-image:linear-gradient(to_bottom,black_40%,transparent)]" />
      </div>

      <Container className="relative">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
          <div className="max-w-xl">
            <p className="text-xs font-semibold tracking-[0.18em] text-accent uppercase">
              {inboxFeatureHero.eyebrow}
            </p>
            <h1 className="mt-4 font-heading text-[2.2rem] leading-[1.08] font-semibold tracking-tight text-balance sm:text-[3.1rem] lg:text-[3.4rem]">
              {inboxFeatureHero.title}
            </h1>
            <p className="mt-5 max-w-lg text-base leading-7 text-muted sm:text-[1.05rem] sm:leading-8">
              {inboxFeatureHero.description}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href={inboxFeatureHero.primaryCta.href} size="lg">
                {inboxFeatureHero.primaryCta.label}
                <ArrowRight className="size-4" />
              </Button>
              <Button
                href={inboxFeatureHero.secondaryCta.href}
                variant="secondary"
                size="lg"
              >
                {inboxFeatureHero.secondaryCta.label}
                <ArrowDown className="size-4" />
              </Button>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-md">
            <div className="relative min-h-[16.5rem] sm:min-h-[18rem]">
              <svg
                className="pointer-events-none absolute inset-0 hidden h-full w-full sm:block"
                viewBox="0 0 360 280"
                fill="none"
                aria-hidden
              >
                <path
                  data-inbox-hero-line
                  d="M250 70 C280 110, 290 150, 250 190"
                  stroke="var(--accent)"
                  strokeWidth="1.5"
                />
              </svg>

              <div
                data-inbox-hero-message
                className="relative z-20 rounded-2xl border border-border bg-surface p-4 shadow-[var(--shadow-soft)] sm:absolute sm:top-8 sm:left-0 sm:w-[15.5rem]"
              >
                <p className="text-[10px] font-semibold tracking-[0.14em] text-accent uppercase">
                  Maya Chen
                </p>
                <p className="mt-2 text-sm leading-relaxed">
                  My order was due yesterday, but the tracking page hasn’t
                  changed…
                </p>
              </div>

              <div
                data-inbox-hero-stamp
                className="relative z-30 mt-3 inline-flex rotate-[-6deg] items-center gap-1.5 rounded-md border-2 border-accent/60 bg-accent/10 px-3 py-2 sm:absolute sm:top-4 sm:right-2 sm:mt-0"
              >
                <Package className="size-3.5 text-accent" aria-hidden />
                <span className="font-mono text-[10px] font-bold tracking-[0.12em] text-accent uppercase">
                  Assigned to Orders
                </span>
              </div>

              <div
                data-inbox-hero-note
                className="relative z-10 mt-3 rounded-xl border border-accent/25 bg-accent/10 p-3 sm:absolute sm:right-0 sm:bottom-2 sm:mt-0 sm:w-[14rem]"
              >
                <p className="inline-flex items-center gap-1.5 text-[10px] font-semibold tracking-[0.12em] text-accent uppercase">
                  <StickyNote className="size-3" aria-hidden />
                  Internal note
                </p>
                <p className="mt-1.5 text-xs leading-relaxed text-foreground">
                  Check the carrier scan before replying.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </header>
  );
}
