"use client";

import { useEffect, useRef } from "react";
import { ArrowDown, ArrowRight, CircleDot, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import {
  featuresOverviewHero,
  featuresOverviewOrder,
} from "@/data/marketing/features-overview";
import { getGsap } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

export function FeaturesOverviewHero() {
  const rootRef = useRef<HTMLElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const root = rootRef.current;
    if (!root || reducedMotion) return;

    const { gsap } = getGsap();
    const ctx = gsap.context(() => {
      const question = root.querySelector("[data-features-hero-q]");
      const annotations = root.querySelectorAll("[data-features-hero-anno]");

      gsap.set(question, { autoAlpha: 0, y: 12 });
      gsap.set(annotations, { autoAlpha: 0, y: 8 });

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.to(question, { autoAlpha: 1, y: 0, duration: 0.4 }).to(
        annotations,
        { autoAlpha: 1, y: 0, duration: 0.3, stagger: 0.08 },
        "-=0.1",
      );
    }, root);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <header
      ref={rootRef}
      className="relative overflow-hidden pt-12 pb-14 sm:pt-16 sm:pb-16 lg:pb-20"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_75%_0%,var(--glow),transparent_60%)]" />
        <div className="absolute inset-0 bg-grid-fade [mask-image:linear-gradient(to_bottom,black_40%,transparent)]" />
      </div>

      <Container className="relative">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
          <div className="max-w-xl">
            <p className="text-xs font-semibold tracking-[0.18em] text-accent uppercase">
              {featuresOverviewHero.eyebrow}
            </p>
            <h1 className="mt-4 font-heading text-[2.2rem] leading-[1.08] font-semibold tracking-tight text-balance sm:text-[3.1rem] lg:text-[3.4rem]">
              {featuresOverviewHero.title}
            </h1>
            <p className="mt-5 max-w-lg text-base leading-7 text-muted sm:text-[1.05rem] sm:leading-8">
              {featuresOverviewHero.description}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href={featuresOverviewHero.primaryCta.href} size="lg">
                {featuresOverviewHero.primaryCta.label}
                <ArrowRight className="size-4" />
              </Button>
              <Button
                href={featuresOverviewHero.secondaryCta.href}
                variant="secondary"
                size="lg"
              >
                {featuresOverviewHero.secondaryCta.label}
                <ArrowDown className="size-4" />
              </Button>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-md">
            <div
              data-features-hero-q
              className="rounded-[var(--radius-workspace)] border border-border bg-surface p-5 shadow-[var(--shadow-soft)] sm:p-6"
            >
              <p className="text-[10px] font-semibold tracking-[0.14em] text-muted uppercase">
                {featuresOverviewOrder.customerName}
              </p>
              <p className="mt-3 font-heading text-lg leading-snug font-semibold text-pretty sm:text-xl">
                {featuresOverviewOrder.message}
              </p>
            </div>

            <div className="mt-3 flex flex-wrap gap-2 sm:absolute sm:right-0 sm:-bottom-3 sm:mt-0 sm:max-w-[14rem] sm:flex-col sm:items-end">
              <span
                data-features-hero-anno
                className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-2.5 py-1 text-[11px] font-medium"
              >
                Topic · {featuresOverviewOrder.topic}
              </span>
              <span
                data-features-hero-anno
                className="inline-flex rotate-[-3deg] items-center gap-1.5 rounded-md border-2 border-accent/50 bg-accent/10 px-2.5 py-1 font-mono text-[10px] font-bold tracking-[0.1em] text-accent uppercase"
              >
                <Package className="size-3" aria-hidden />
                Orders
              </span>
              <span
                data-features-hero-anno
                className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/15 px-2.5 py-1 text-[11px] font-semibold text-emerald-700 dark:text-emerald-300"
              >
                <CircleDot className="size-3" aria-hidden />
                Open
              </span>
            </div>
          </div>
        </div>
      </Container>
    </header>
  );
}
