"use client";

import { useEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { finalCta } from "@/data/marketing/home";
import { getGsap } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

export function FinalCta() {
  const ref = useRef<HTMLElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || reducedMotion) return;
    const { gsap } = getGsap();
    const ctx = gsap.context(() => {
      gsap.from("[data-final]", {
        y: 28,
        autoAlpha: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 80%" },
      });
    }, el);
    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      id="cta"
      ref={ref}
      className="scroll-mt-28 py-16 sm:py-20 lg:py-24"
    >
      <Container>
        <div className="relative overflow-hidden rounded-[calc(var(--radius-workspace)+4px)] border border-border bg-workspace px-6 py-14 text-center text-workspace-text shadow-[var(--shadow-soft)] sm:px-10 sm:py-16 lg:px-16">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgb(167_139_250_/_0.28),transparent_55%)]" />
          <div className="pointer-events-none absolute inset-0 bg-noise opacity-[0.08]" />
          <div className="relative mx-auto max-w-2xl">
            <h2
              data-final
              className="font-heading text-[1.85rem] font-semibold tracking-tight text-balance sm:text-4xl lg:text-[2.75rem]"
            >
              {finalCta.headline}
            </h2>
            <p
              data-final
              className="mx-auto mt-4 max-w-xl text-base leading-7 text-workspace-muted"
            >
              {finalCta.description}
            </p>
            <div data-final className="mt-8 flex justify-center">
              <Button href={finalCta.cta.href} variant="workspace" size="lg">
                {finalCta.cta.label}
                <ArrowUpRight className="size-4" aria-hidden />
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
