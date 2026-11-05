"use client";

import { useEffect, useRef } from "react";
import { Container } from "@/components/ui/container";
import { aboutPageCopy } from "@/data/marketing/about";
import { getGsap } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

export function AboutManifesto() {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || reducedMotion) return;
    const { gsap } = getGsap();
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-manifesto]",
        { y: 24, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.75,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 78%" },
        },
      );
      gsap.fromTo(
        "[data-manifesto-line]",
        { strokeDashoffset: 420 },
        {
          strokeDashoffset: 0,
          duration: 1.4,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 70%" },
        },
      );
    }, el);
    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-x-clip pt-12 pb-8 sm:pt-16 sm:pb-10"
      aria-labelledby="about-manifesto-heading"
    >
      <Container>
        <div className="relative">
          <div
            className="pointer-events-none absolute -top-10 left-0 h-56 w-56 rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--accent)_28%,transparent),transparent_68%)] blur-2xl sm:h-72 sm:w-72"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute top-24 right-0 hidden h-40 w-40 rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--accent)_16%,transparent),transparent_70%)] blur-2xl sm:block"
            aria-hidden
          />

          <div className="relative max-w-3xl">
            <p
              data-manifesto
              className="text-xs font-semibold tracking-[0.18em] text-accent uppercase"
            >
              {aboutPageCopy.manifestoEyebrow}
            </p>
            <h2
              id="about-manifesto-heading"
              data-manifesto
              className="mt-5 font-heading text-[2.1rem] leading-[1.12] font-semibold tracking-tight text-balance sm:text-[3rem] lg:text-[3.25rem]"
            >
              {aboutPageCopy.manifestoTitle}
            </h2>
            <p
              data-manifesto
              className="mt-6 max-w-2xl text-base leading-8 text-muted sm:text-lg"
            >
              {aboutPageCopy.manifestoDescription}
            </p>
          </div>

          <svg
            className="pointer-events-none relative mt-10 block h-16 w-full max-w-md text-accent"
            viewBox="0 0 420 64"
            fill="none"
            aria-hidden
          >
            <path
              data-manifesto-line
              d="M8 40 C90 8 160 56 250 24 C320 4 370 36 412 28"
              stroke="currentColor"
              strokeOpacity="0.45"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeDasharray="420"
              strokeDashoffset={reducedMotion ? 0 : 420}
            />
          </svg>
        </div>
      </Container>
    </section>
  );
}
