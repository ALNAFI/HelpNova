"use client";

import { useEffect, useRef } from "react";
import { Container } from "@/components/ui/container";
import { getGsap } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

type LegalHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  sampleLabel: string;
  sampleNotice: string;
  headingId: string;
};

export function LegalHero({
  eyebrow,
  title,
  description,
  sampleLabel,
  sampleNotice,
  headingId,
}: LegalHeroProps) {
  const ref = useRef<HTMLElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || reducedMotion) return;
    const { gsap } = getGsap();
    const ctx = gsap.context(() => {
      gsap.set("[data-legal-hero]", { clearProps: "all" });
      gsap.fromTo(
        "[data-legal-hero]",
        { y: 18, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.65,
          stagger: 0.07,
          ease: "power3.out",
          immediateRender: false,
        },
      );
      gsap.fromTo(
        "[data-legal-orbit]",
        { rotate: -8, autoAlpha: 0.35 },
        {
          rotate: 8,
          autoAlpha: 0.7,
          duration: 12,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        },
      );
    }, el);
    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <header
      ref={ref}
      className="relative overflow-hidden pt-10 pb-8 sm:pt-14 sm:pb-10"
    >
      <div
        className="pointer-events-none absolute top-10 right-[8%] hidden size-44 lg:block"
        aria-hidden
      >
        <div
          data-legal-orbit
          className="absolute inset-0 rounded-full border border-accent/25"
        />
        <div className="absolute inset-7 rounded-full border border-dashed border-accent/20" />
        <div className="absolute top-1/2 left-1/2 size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent" />
      </div>

      <Container>
        <div className="max-w-3xl">
          <div data-legal-hero className="flex flex-wrap items-center gap-3">
            <p className="text-xs font-semibold tracking-[0.18em] text-accent uppercase">
              {eyebrow}
            </p>
            <span className="rounded-full border border-border bg-surface/80 px-2.5 py-1 text-[11px] font-medium tracking-wide text-muted uppercase">
              {sampleLabel}
            </span>
          </div>
          <h1
            id={headingId}
            data-legal-hero
            className="mt-4 font-heading text-[2.15rem] leading-[1.08] font-semibold tracking-tight text-balance sm:text-[2.85rem] lg:text-[3.35rem]"
          >
            {title}
          </h1>
          <p
            data-legal-hero
            className="mt-5 max-w-2xl text-base leading-7 text-muted sm:text-[1.05rem] sm:leading-8"
          >
            {description}
          </p>
          <aside
            data-legal-hero
            className="mt-7 rounded-[1.25rem] border border-accent/25 bg-accent-soft/50 px-5 py-4"
          >
            <p className="text-sm leading-6 text-foreground">{sampleNotice}</p>
          </aside>
        </div>
      </Container>
    </header>
  );
}
