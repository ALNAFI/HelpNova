"use client";

import { useEffect, useRef, type RefObject } from "react";
import { AboutHeroIllustration } from "@/components/modules/about/about-hero-illustration";
import { Container } from "@/components/ui/container";
import { aboutPageCopy } from "@/data/marketing/about";
import { getGsap } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

export function AboutHero({
  surfaceRef,
}: {
  surfaceRef: RefObject<HTMLElement | null>;
}) {
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
      className="relative z-30 overflow-visible pt-12 pb-10 sm:pt-16 sm:pb-14"
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
          <div className="relative z-10 max-w-2xl">
            <p
              data-about-hero
              className="text-xs font-semibold tracking-[0.18em] text-accent uppercase"
            >
              {aboutPageCopy.heroEyebrow}
            </p>
            <h1
              data-about-hero
              className="mt-5 max-w-[11.5em] font-heading text-[2.2rem] leading-[1.1] font-semibold tracking-tight text-balance sm:max-w-[12em] sm:text-[3rem] sm:leading-[1.08] lg:text-[3.35rem]"
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

          <div
            data-about-hero
            className="relative z-30 mx-auto h-full w-full min-w-0 self-stretch overflow-visible lg:max-w-none"
          >
            <AboutHeroIllustration surfaceRef={surfaceRef} />
          </div>
        </div>
      </Container>
    </header>
  );
}
