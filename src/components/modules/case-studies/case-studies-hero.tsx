"use client";

import { useEffect, useRef } from "react";
import { Container } from "@/components/ui/container";
import { caseStudies, caseStudiesPageCopy } from "@/data/editorial/case-studies";
import { getGsap } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

export function CaseStudiesHero() {
  const ref = useRef<HTMLElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || reducedMotion) return;
    const { gsap } = getGsap();
    const ctx = gsap.context(() => {
      gsap.set("[data-case-hero]", { clearProps: "all" });
      gsap.fromTo(
        "[data-case-hero]",
        { y: 20, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.7,
          stagger: 0.08,
          ease: "power3.out",
          immediateRender: false,
        },
      );
      gsap.fromTo(
        "[data-case-orbit]",
        { rotate: -10, autoAlpha: 0.4 },
        {
          rotate: 10,
          autoAlpha: 0.75,
          duration: 11,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        },
      );
    }, el);
    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden pt-10 pb-8 sm:pt-14 sm:pb-10 lg:pt-16"
      aria-labelledby="case-studies-hero-heading"
    >
      <div
        className="pointer-events-none absolute top-12 right-[7%] hidden size-52 lg:block"
        aria-hidden
      >
        <div
          data-case-orbit
          className="absolute inset-0 rounded-full border border-accent/25"
        />
        <div className="absolute inset-8 rounded-full border border-dashed border-accent/20" />
        <div className="absolute top-1/2 left-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent shadow-[0_0_24px_var(--accent)]" />
      </div>

      <Container>
        <div className="max-w-3xl">
          <div data-case-hero className="flex flex-wrap items-center gap-3">
            <p className="text-xs font-semibold tracking-[0.18em] text-accent uppercase">
              {caseStudiesPageCopy.eyebrow}
            </p>
            <span className="rounded-full border border-border bg-surface/80 px-2.5 py-1 text-[11px] font-medium tracking-wide text-muted uppercase">
              {caseStudiesPageCopy.fictionalLabel}
            </span>
          </div>
          <h1
            id="case-studies-hero-heading"
            data-case-hero
            className="mt-4 font-heading text-[2.15rem] leading-[1.08] font-semibold tracking-tight text-balance sm:text-[2.85rem] lg:text-[3.5rem]"
          >
            {caseStudiesPageCopy.title}
          </h1>
          <p
            data-case-hero
            className="mt-5 max-w-2xl text-base leading-7 text-muted sm:text-[1.05rem] sm:leading-8"
          >
            {caseStudiesPageCopy.description}
          </p>
          <div
            data-case-hero
            className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted"
          >
            <span className="inline-flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-accent" aria-hidden />
              {caseStudies.length} fictional scenarios
            </span>
            <span className="hidden sm:inline" aria-hidden>
              |
            </span>
            <span>Inbox → Automation → Insights</span>
          </div>
        </div>
      </Container>
    </section>
  );
}
