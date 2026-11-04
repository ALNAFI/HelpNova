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
      gsap.to("[data-manifesto-line]", {
        strokeDashoffset: 0,
        duration: 1.4,
        ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 70%" },
      });
    }, el);
    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      ref={sectionRef}
      className="relative py-16 sm:py-24"
      aria-labelledby="about-manifesto-heading"
    >
      <Container>
        <div className="relative overflow-hidden rounded-[2rem] border border-border bg-workspace px-6 py-12 text-workspace-text shadow-[var(--shadow-soft)] sm:px-10 sm:py-16 lg:px-14">
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,color-mix(in_oklab,var(--accent)_34%,transparent),transparent_42%),radial-gradient(circle_at_85%_15%,color-mix(in_oklab,#a78bfa_22%,transparent),transparent_35%)]"
            aria-hidden
          />
          <svg
            className="pointer-events-none absolute inset-0 size-full opacity-50"
            aria-hidden
          >
            <path
              data-manifesto-line
              d="M40 180 C180 80 280 260 560 120"
              stroke="var(--accent)"
              strokeOpacity="0.45"
              strokeWidth="1.5"
              fill="none"
              strokeDasharray="420"
              strokeDashoffset="420"
            />
          </svg>

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
              className="mt-5 font-heading text-[2.1rem] leading-[1.08] font-semibold tracking-tight text-balance sm:text-[3rem] lg:text-[3.4rem]"
            >
              {aboutPageCopy.manifestoTitle}
            </h2>
            <p
              data-manifesto
              className="mt-6 max-w-2xl text-base leading-8 text-workspace-text/75 sm:text-lg"
            >
              {aboutPageCopy.manifestoDescription}
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
