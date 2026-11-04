"use client";

import { useEffect, useRef } from "react";
import { AboutHeroConstellation } from "@/components/modules/about/about-hero-constellation";
import { Container } from "@/components/ui/container";
import { aboutPageCopy } from "@/data/marketing/about";
import { getGsap } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

export function AboutHero() {
  const ref = useRef<HTMLElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || reducedMotion) return;
    const { gsap } = getGsap();
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-about-hero]",
        { y: 22, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.7,
          stagger: 0.09,
          ease: "power3.out",
          immediateRender: false,
        },
      );
    }, el);
    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <header
      ref={ref}
      className="relative overflow-hidden pt-12 pb-10 sm:pt-16 sm:pb-14"
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[34rem] overflow-hidden"
        aria-hidden
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_55%_at_70%_-10%,var(--glow),transparent_60%)]" />
        <div className="absolute inset-0 bg-grid-fade [mask-image:linear-gradient(to_bottom,black_35%,transparent_100%)]" />
      </div>

      <Container className="relative">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-12">
          <div className="max-w-2xl">
            <div data-about-hero className="flex flex-wrap items-center gap-3">
              <p className="text-xs font-semibold tracking-[0.18em] text-accent uppercase">
                {aboutPageCopy.heroEyebrow}
              </p>
              <span className="rounded-full border border-border bg-surface/80 px-2.5 py-1 text-[11px] font-medium tracking-wide text-muted uppercase">
                {aboutPageCopy.heroLabel}
              </span>
            </div>
            <h1
              data-about-hero
              className="mt-5 font-heading text-[2.2rem] leading-[1.08] font-semibold tracking-tight text-balance sm:text-[3rem] lg:text-[3.45rem]"
            >
              {aboutPageCopy.heroTitle}
            </h1>
            <p
              data-about-hero
              className="mt-5 max-w-xl text-base leading-7 text-muted sm:text-[1.05rem] sm:leading-8"
            >
              {aboutPageCopy.heroDescription}
            </p>
          </div>

          <div data-about-hero className="mx-auto w-full max-w-md lg:max-w-none">
            <AboutHeroConstellation className="mx-auto aspect-square w-full max-w-[26rem]" />
          </div>
        </div>
      </Container>
    </header>
  );
}
