"use client";

import { useEffect, useRef } from "react";
import { Container } from "@/components/ui/container";
import { blogPageCopy, blogPosts } from "@/data/editorial/blog";
import { getGsap } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

export function BlogHero() {
  const ref = useRef<HTMLElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || reducedMotion) return;
    const { gsap } = getGsap();
    const ctx = gsap.context(() => {
      gsap.set("[data-blog-hero]", { clearProps: "all" });
      gsap.fromTo(
        "[data-blog-hero]",
        { y: 22, autoAlpha: 0 },
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
        "[data-blog-orbit]",
        { rotate: -8, autoAlpha: 0.35 },
        {
          rotate: 8,
          autoAlpha: 0.7,
          duration: 10,
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
      aria-labelledby="blog-hero-heading"
    >
      <div
        className="pointer-events-none absolute top-10 right-[8%] hidden size-48 lg:block"
        aria-hidden
      >
        <div
          data-blog-orbit
          className="absolute inset-0 rounded-full border border-accent/25"
        />
        <div className="absolute inset-6 rounded-full border border-dashed border-accent/20" />
        <div className="absolute top-1/2 left-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent shadow-[0_0_24px_var(--accent)]" />
      </div>

      <Container>
        <div className="max-w-3xl">
          <p
            data-blog-hero
            className="text-xs font-semibold tracking-[0.18em] text-accent uppercase"
          >
            {blogPageCopy.eyebrow}
          </p>
          <h1
            id="blog-hero-heading"
            data-blog-hero
            className="mt-4 font-heading text-[2.15rem] leading-[1.08] font-semibold tracking-tight text-balance sm:text-[2.85rem] lg:text-[3.5rem]"
          >
            {blogPageCopy.title}
          </h1>
          <p
            data-blog-hero
            className="mt-5 max-w-2xl text-base leading-7 text-muted sm:text-[1.05rem] sm:leading-8"
          >
            {blogPageCopy.description}
          </p>
          <div
            data-blog-hero
            className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted"
          >
            <span className="inline-flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-accent" aria-hidden />
              {blogPosts.length} stories
            </span>
            <span className="hidden text-border-strong sm:inline" aria-hidden>
              |
            </span>
            <span>Editorial guides for modern support teams</span>
          </div>
        </div>
      </Container>
    </section>
  );
}
