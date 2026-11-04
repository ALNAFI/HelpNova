"use client";

import { useEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { blogPageCopy } from "@/data/editorial/blog";
import { getGsap } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

export function ArticleCta() {
  const ref = useRef<HTMLElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || reducedMotion) return;
    const { gsap } = getGsap();
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-article-cta]",
        { y: 18, autoAlpha: 0 },
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
      className="relative py-14 sm:py-16"
      aria-labelledby="article-cta-heading"
    >
      <Container>
        <div className="relative overflow-hidden rounded-[1.75rem] border border-border bg-gradient-to-br from-accent-soft/80 via-surface to-surface px-6 py-10 shadow-[var(--shadow-soft)] sm:px-10 sm:py-12">
          <div
            className="pointer-events-none absolute -top-20 -right-14 size-60 rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--accent)_28%,transparent),transparent_70%)]"
            aria-hidden
          />
          <div className="relative max-w-2xl">
            <h2
              id="article-cta-heading"
              data-article-cta
              className="font-heading text-[1.85rem] font-semibold tracking-tight text-balance sm:text-[2.25rem]"
            >
              {blogPageCopy.articleCtaTitle}
            </h2>
            <p
              data-article-cta
              className="mt-4 text-base leading-7 text-muted sm:text-[1.05rem]"
            >
              {blogPageCopy.articleCtaDescription}
            </p>
            <div
              data-article-cta
              className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center"
            >
              <Button href="/demo" size="lg">
                {blogPageCopy.demoLabel}
                <ArrowUpRight className="size-4" aria-hidden />
              </Button>
              <Button href="/blog" variant="secondary" size="lg">
                {blogPageCopy.backToJournal}
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
