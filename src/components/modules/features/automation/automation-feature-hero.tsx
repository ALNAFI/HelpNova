"use client";

import { useEffect, useRef } from "react";
import { ArrowDown, ArrowRight, Package, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { automationFeatureHero } from "@/data/marketing/automation-feature";
import { getGsap } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

export function AutomationFeatureHero() {
  const rootRef = useRef<HTMLElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const root = rootRef.current;
    if (!root || reducedMotion) return;

    const { gsap } = getGsap();
    const ctx = gsap.context(() => {
      const message = root.querySelector("[data-auto-hero-message]");
      const condition = root.querySelector("[data-auto-hero-condition]");
      const matched = root.querySelector("[data-auto-hero-matched]");
      const otherwise = root.querySelector("[data-auto-hero-otherwise]");
      const line = root.querySelector<SVGPathElement>("[data-auto-hero-line]");

      gsap.set([message, condition, matched, otherwise], {
        autoAlpha: 0,
        y: 10,
      });

      if (line && typeof line.getTotalLength === "function") {
        const length = line.getTotalLength();
        gsap.set(line, {
          strokeDasharray: length,
          strokeDashoffset: length,
          opacity: 0.4,
        });
      }

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.to(message, { autoAlpha: 1, y: 0, duration: 0.4 })
        .to(condition, { autoAlpha: 1, y: 0, duration: 0.35 }, "-=0.12")
        .to(line, { strokeDashoffset: 0, opacity: 1, duration: 0.4 }, "-=0.08")
        .to(matched, { autoAlpha: 1, y: 0, duration: 0.35 }, "-=0.12")
        .to(otherwise, { autoAlpha: 1, y: 0, duration: 0.3 }, "-=0.18");
    }, root);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <header
      ref={rootRef}
      className="relative overflow-hidden pt-12 pb-14 sm:pt-16 sm:pb-16 lg:pb-20"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_15%_0%,var(--glow),transparent_60%)]" />
        <div className="absolute inset-0 bg-grid-fade [mask-image:linear-gradient(to_bottom,black_40%,transparent)]" />
      </div>

      <Container className="relative">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
          <div className="max-w-xl">
            <p className="text-xs font-semibold tracking-[0.18em] text-accent uppercase">
              {automationFeatureHero.eyebrow}
            </p>
            <h1 className="mt-4 font-heading text-[2.2rem] leading-[1.08] font-semibold tracking-tight text-balance sm:text-[3.1rem] lg:text-[3.4rem]">
              {automationFeatureHero.title}
            </h1>
            <p className="mt-5 max-w-lg text-base leading-7 text-muted sm:text-[1.05rem] sm:leading-8">
              {automationFeatureHero.description}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href={automationFeatureHero.primaryCta.href} size="lg">
                {automationFeatureHero.primaryCta.label}
                <ArrowRight className="size-4" />
              </Button>
              <Button
                href={automationFeatureHero.secondaryCta.href}
                variant="secondary"
                size="lg"
              >
                {automationFeatureHero.secondaryCta.label}
                <ArrowDown className="size-4" />
              </Button>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-md">
            <div className="relative min-h-[17rem] sm:min-h-[18.5rem]">
              <svg
                className="pointer-events-none absolute inset-0 hidden h-full w-full sm:block"
                viewBox="0 0 360 300"
                fill="none"
                aria-hidden
              >
                <path
                  data-auto-hero-line
                  d="M180 120 C180 150, 120 170, 90 200"
                  stroke="var(--accent)"
                  strokeWidth="1.75"
                />
                <path
                  d="M180 120 C180 155, 250 175, 280 205"
                  stroke="var(--border)"
                  strokeWidth="1.5"
                  strokeDasharray="4 4"
                  opacity="0.7"
                />
              </svg>

              <div
                data-auto-hero-message
                className="relative z-20 rounded-2xl border border-border bg-surface p-4 shadow-[var(--shadow-soft)] sm:absolute sm:top-2 sm:left-1/2 sm:w-[15rem] sm:-translate-x-1/2"
              >
                <p className="text-[10px] font-semibold tracking-[0.14em] text-muted uppercase">
                  Incoming inquiry
                </p>
                <p className="mt-2 text-sm font-medium leading-relaxed">
                  {automationFeatureHero.sampleMessage}
                </p>
              </div>

              <div
                data-auto-hero-condition
                className="relative z-20 mt-3 rounded-xl border border-accent/35 bg-accent/10 px-3.5 py-2.5 text-center sm:absolute sm:top-[6.5rem] sm:left-1/2 sm:mt-0 sm:w-[12.5rem] sm:-translate-x-1/2"
              >
                <p className="text-[10px] font-semibold tracking-[0.14em] text-accent uppercase">
                  Condition
                </p>
                <p className="mt-1 text-sm font-semibold">
                  {automationFeatureHero.conditionLabel}
                </p>
              </div>

              <div
                data-auto-hero-matched
                className="relative z-30 mt-3 inline-flex items-center gap-1.5 rounded-md border-2 border-accent/55 bg-accent/10 px-3 py-2 sm:absolute sm:bottom-6 sm:left-2 sm:mt-0"
              >
                <Package className="size-3.5 text-accent" aria-hidden />
                <span className="font-mono text-[10px] font-bold tracking-[0.12em] text-accent uppercase">
                  {automationFeatureHero.matchedTeam}
                </span>
              </div>

              <div
                data-auto-hero-otherwise
                className="relative z-10 mt-3 inline-flex items-center gap-1.5 rounded-md border border-border bg-surface-muted px-3 py-2 text-muted sm:absolute sm:right-2 sm:bottom-6 sm:mt-0"
              >
                <Users className="size-3.5" aria-hidden />
                <span className="font-mono text-[10px] font-semibold tracking-[0.1em] uppercase">
                  {automationFeatureHero.otherwiseTeam}
                </span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </header>
  );
}
