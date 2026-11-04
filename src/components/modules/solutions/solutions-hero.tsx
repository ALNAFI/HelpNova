"use client";

import { useEffect, useRef } from "react";
import { ArrowDown, ArrowRight, Briefcase, Layers, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { solutionsHero } from "@/data/marketing/solutions";
import { getGsap } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { cn } from "@/utils/cn";

const slipIcons = [Package, Layers, Briefcase] as const;

export function SolutionsHero() {
  const rootRef = useRef<HTMLElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const root = rootRef.current;
    if (!root || reducedMotion) return;
    const { gsap } = getGsap();
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-solutions-slip]",
        { y: 18, autoAlpha: 0, rotate: -2 },
        {
          y: 0,
          autoAlpha: 1,
          rotate: 0,
          duration: 0.55,
          stagger: 0.1,
          ease: "power3.out",
          immediateRender: false,
        },
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
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_15%_0%,var(--glow),transparent_60%)]" />
        <div className="absolute inset-0 bg-grid-fade [mask-image:linear-gradient(to_bottom,black_40%,transparent)]" />
      </div>

      <Container className="relative">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
          <div className="max-w-xl">
            <p className="text-xs font-semibold tracking-[0.18em] text-accent uppercase">
              {solutionsHero.eyebrow}
            </p>
            <h1 className="mt-4 font-heading text-[2.2rem] leading-[1.08] font-semibold tracking-tight text-balance sm:text-[3.1rem] lg:text-[3.5rem]">
              {solutionsHero.title}
            </h1>
            <p className="mt-5 max-w-lg text-base leading-7 text-muted sm:text-[1.05rem] sm:leading-8">
              {solutionsHero.description}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href={solutionsHero.primaryCta.href} size="lg">
                {solutionsHero.primaryCta.label}
                <ArrowDown className="size-4" />
              </Button>
              <Button
                href={solutionsHero.secondaryCta.href}
                variant="secondary"
                size="lg"
              >
                {solutionsHero.secondaryCta.label}
                <ArrowRight className="size-4" />
              </Button>
            </div>
          </div>

          <div
            className="relative mx-auto min-h-[17.5rem] w-full max-w-md sm:min-h-[19rem]"
            aria-hidden
          >
            {solutionsHero.slips.map((slip, index) => {
              const Icon = slipIcons[index];
              return (
                <article
                  key={slip.industry}
                  data-solutions-slip
                  className={cn(
                    "absolute w-[88%] rounded-2xl border border-border bg-surface p-4 shadow-[var(--shadow-soft)]",
                    index === 0 &&
                      "top-8 left-0 z-30 rotate-[-2deg] sm:top-6",
                    index === 1 &&
                      "top-16 left-[8%] z-20 rotate-[1.5deg] opacity-95 sm:left-[10%]",
                    index === 2 &&
                      "top-24 left-[16%] z-10 rotate-[-1deg] opacity-90 sm:left-[18%]",
                  )}
                >
                  <div className="flex items-center gap-2">
                    <span className="flex size-8 items-center justify-center rounded-lg bg-accent-soft text-accent">
                      <Icon className="size-3.5" />
                    </span>
                    <span className="font-mono text-[10px] tracking-[0.16em] text-muted uppercase">
                      {slip.industry}
                    </span>
                  </div>
                  <p className="mt-3 font-heading text-base font-semibold tracking-tight sm:text-lg">
                    “{slip.question}”
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </Container>
    </header>
  );
}
