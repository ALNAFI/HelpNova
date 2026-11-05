"use client";

import { useEffect, useRef } from "react";
import { ArrowRight, Compass } from "lucide-react";
import { NotFoundOrbit } from "@/components/modules/other-pages/not-found-orbit";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { getGsap } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

export function NotFoundView() {
  const rootRef = useRef<HTMLElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const root = rootRef.current;
    if (!root || reducedMotion) return;

    const { gsap } = getGsap();
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power3.out", immediateRender: false },
      });

      tl.fromTo(
        "[data-nf='code']",
        { y: 28, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.7 },
      )
        .fromTo(
          "[data-nf='copy']",
          { y: 18, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.55, stagger: 0.09 },
          "-=0.35",
        )
        .fromTo(
          "[data-nf='cta']",
          { y: 14, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.5 },
          "-=0.25",
        )
        .fromTo(
          "[data-nf='visual']",
          { y: 24, autoAlpha: 0, scale: 0.97 },
          { y: 0, autoAlpha: 1, scale: 1, duration: 0.85 },
          "-=0.55",
        );

      gsap.to("[data-orbit-node]", {
        y: 7,
        duration: 3.4,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });

      gsap.to("[data-orbit-chip]", {
        y: -6,
        duration: 4.2,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        stagger: 0.45,
      });

      gsap.to("[data-orbit-path]", {
        opacity: 0.55,
        duration: 2.6,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
    }, root);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      ref={rootRef}
      className="relative flex flex-1 flex-col overflow-hidden"
      aria-labelledby="not-found-heading"
    >
      <div className="pointer-events-none absolute inset-0 bg-grid-fade" />
      <div className="pointer-events-none absolute inset-0 bg-noise" />
      <div
        className="pointer-events-none absolute -right-24 top-16 size-[28rem] rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--accent)_22%,transparent),transparent_68%)] sm:size-[34rem] lg:-right-16 lg:top-10"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-20 bottom-0 size-[22rem] rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--accent)_12%,transparent),transparent_70%)]"
        aria-hidden
      />

      <Container className="relative flex flex-1 items-center py-14 sm:py-16 lg:py-20">
        <div className="grid w-full items-center gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-16 xl:gap-20">
          <div className="max-w-xl text-center lg:text-left">
            <p
              data-nf="copy"
              className="inline-flex items-center gap-2 text-[0.7rem] font-medium tracking-[0.18em] text-accent uppercase sm:text-xs"
            >
              <Compass className="size-3.5" aria-hidden />
              404 — Page not found
            </p>

            <p
              data-nf="code"
              className="mt-4 font-heading text-[4.5rem] font-semibold leading-none tracking-[-0.06em] text-transparent sm:text-[6.5rem] lg:text-[7.5rem]"
              style={{
                backgroundImage:
                  "linear-gradient(135deg, var(--accent) 0%, color-mix(in oklab, var(--accent) 55%, var(--foreground)) 48%, var(--accent) 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
              }}
              aria-hidden
            >
              404
            </p>

            <h1
              id="not-found-heading"
              data-nf="copy"
              className="mt-4 font-heading text-[1.85rem] font-semibold tracking-tight text-balance text-foreground sm:text-4xl lg:text-[2.75rem] lg:leading-[1.12]"
            >
              Oops! You&apos;ve wandered off the map.
            </h1>

            <p
              data-nf="copy"
              className="mx-auto mt-4 max-w-md text-base leading-7 text-muted lg:mx-0"
            >
              The page you&apos;re looking for may have moved, disappeared, or
              never existed. Don&apos;t worry, there&apos;s still plenty to
              explore.
            </p>

            <div
              data-nf="cta"
              className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center lg:justify-start"
            >
              <Button href="/" size="lg">
                Back Home
                <ArrowRight className="size-4" aria-hidden />
              </Button>
              <Button href="/demo" variant="secondary" size="lg">
                Explore Demo
              </Button>
            </div>
          </div>

          <div
            data-nf="visual"
            className="relative mx-auto flex w-full max-w-[22rem] items-center justify-center sm:max-w-[26rem] lg:max-w-none"
          >
            <div className="absolute inset-[12%] rounded-full border border-border/60 bg-surface/40 shadow-[var(--shadow-soft)] backdrop-blur-[2px]" />
            <NotFoundOrbit className="relative w-full text-foreground" />
          </div>
        </div>
      </Container>
    </section>
  );
}
