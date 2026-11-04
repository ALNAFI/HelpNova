"use client";

import { useEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { blogPageCopy } from "@/data/editorial/blog";
import { getGsap } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

export function BlogCta() {
  const ref = useRef<HTMLElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || reducedMotion) return;
    const { gsap } = getGsap();
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-blog-cta]",
        { y: 20, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.65,
          stagger: 0.07,
          ease: "power3.out",
          immediateRender: false,
          scrollTrigger: { trigger: el, start: "top 88%" },
        },
      );
    }, el);
    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      ref={ref}
      className="relative pb-16 sm:pb-20"
      aria-labelledby="blog-cta-heading"
    >
      <Container>
        <div className="relative overflow-hidden rounded-[1.75rem] border border-border bg-gradient-to-br from-accent-soft/80 via-surface to-surface px-6 py-10 shadow-[var(--shadow-soft)] sm:px-10 sm:py-12 lg:px-14">
          <div
            className="pointer-events-none absolute -top-20 -right-16 size-64 rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--accent)_30%,transparent),transparent_70%)]"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute bottom-[-30%] left-[-10%] size-72 rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--accent)_14%,transparent),transparent_70%)]"
            aria-hidden
          />
          <div className="relative max-w-2xl">
            <h2
              id="blog-cta-heading"
              data-blog-cta
              className="font-heading text-[1.85rem] font-semibold tracking-tight text-balance sm:text-[2.35rem]"
            >
              {blogPageCopy.ctaTitle}
            </h2>
            <p
              data-blog-cta
              className="mt-4 text-base leading-7 text-muted sm:text-[1.05rem]"
            >
              {blogPageCopy.ctaDescription}
            </p>
            <div
              data-blog-cta
              className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center"
            >
              <Button href="/demo" size="lg">
                {blogPageCopy.demoLabel}
                <ArrowUpRight className="size-4" aria-hidden />
              </Button>
              <Button href="/features" variant="secondary" size="lg">
                {blogPageCopy.featuresLabel}
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
