"use client";

import { useEffect, useRef } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { HeroWorkspace } from "@/components/modules/home/hero-workspace";
import { heroContent } from "@/data/marketing/home";
import { getGsap } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

export function HeroSection() {
  const rootRef = useRef<HTMLElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const root = rootRef.current;
    if (!root || reducedMotion) return;

    const { gsap } = getGsap();
    const ctx = gsap.context(() => {
      const targets = root.querySelectorAll<HTMLElement>("[data-hero]");
      gsap.set(targets, { clearProps: "all" });
      const tl = gsap.timeline({
        defaults: { ease: "power3.out", immediateRender: false },
      });
      tl.fromTo(
        "[data-hero='eyebrow']",
        { y: 16, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.5 },
      )
        .fromTo(
          "[data-hero='title']",
          { y: 28, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.7 },
          "-=0.2",
        )
        .fromTo(
          "[data-hero='copy']",
          { y: 20, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.55 },
          "-=0.35",
        )
        .fromTo(
          "[data-hero='cta']",
          { y: 16, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.5 },
          "-=0.3",
        )
        .fromTo(
          "[data-hero='workspace']",
          { y: 40, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.85 },
          "-=0.2",
        );
    }, root);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      id="top"
      ref={rootRef}
      className="relative overflow-hidden pb-16 pt-10 sm:pb-20 sm:pt-14 lg:pb-24 lg:pt-16"
    >
      <div className="pointer-events-none absolute inset-0 bg-grid-fade" />
      <div className="pointer-events-none absolute inset-0 bg-noise" />
      <Container className="relative">
        <div className="mx-auto max-w-3xl text-center">
          <div
            data-hero="eyebrow"
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-surface/80 px-3 py-1.5 text-xs font-medium text-muted shadow-sm backdrop-blur"
          >
            <Sparkles className="size-3.5 text-accent" aria-hidden />
            {heroContent.eyebrow}
          </div>
          <h1
            data-hero="title"
            className="font-heading text-[2.25rem] font-semibold leading-[1.08] tracking-tight text-balance sm:text-5xl lg:text-[3.75rem]"
          >
            {heroContent.headline}{" "}
            <span className="text-accent">{heroContent.highlight}</span>
          </h1>
          <p
            data-hero="copy"
            className="mx-auto mt-5 max-w-2xl text-base leading-7 text-muted sm:text-lg"
          >
            {heroContent.description}
          </p>
          <div
            data-hero="cta"
            className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <Button href={heroContent.primaryCta.href} size="lg">
              {heroContent.primaryCta.label}
              <ArrowRight className="size-4" aria-hidden />
            </Button>
            <Button
              href={heroContent.secondaryCta.href}
              variant="secondary"
              size="lg"
            >
              {heroContent.secondaryCta.label}
            </Button>
          </div>
          <p className="mt-5 text-sm text-muted">{heroContent.trustLine}</p>
        </div>

        <div id="workspace" data-hero="workspace" className="mt-12 scroll-mt-28 lg:mt-16">
          <HeroWorkspace />
        </div>
      </Container>
    </section>
  );
}
