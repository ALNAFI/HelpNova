"use client";

import { useEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { aboutPageCopy } from "@/data/marketing/about";
import { getGsap } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import Link from "next/link";

export function AboutCta() {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || reducedMotion) return;
    const { gsap } = getGsap();
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-about-cta]",
        { y: 18, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.65,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
        },
      );
    }, el);
    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      ref={sectionRef}
      className="relative pb-16 sm:pb-24"
      aria-labelledby="about-cta-heading"
    >
      <Container>
        <div className="relative overflow-hidden rounded-[1.75rem] border border-border bg-gradient-to-br from-accent-soft/85 via-surface to-surface px-6 py-10 shadow-[var(--shadow-soft)] sm:px-10 sm:py-12">
          <div
            className="pointer-events-none absolute -top-24 -right-16 size-72 rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--accent)_30%,transparent),transparent_70%)]"
            aria-hidden
          />
          <div className="relative max-w-2xl">
            <h2
              id="about-cta-heading"
              data-about-cta
              className="font-heading text-[1.85rem] font-semibold tracking-tight text-balance sm:text-[2.25rem]"
            >
              {aboutPageCopy.ctaTitle}
            </h2>
            <p
              data-about-cta
              className="mt-4 text-base leading-7 text-muted"
            >
              {aboutPageCopy.ctaDescription}
            </p>
            <div
              data-about-cta
              className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center"
            >
              <Button href="/demo" size="lg">
                {aboutPageCopy.demoLabel}
              </Button>
              <Button href="/features" variant="secondary" size="lg">
                {aboutPageCopy.featuresLabel}
              </Button>
              <Link
                href="/"
                className="inline-flex items-center gap-1.5 px-1 text-sm font-medium text-muted transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                {aboutPageCopy.homeLabel}
                <ArrowUpRight className="size-4" aria-hidden />
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
