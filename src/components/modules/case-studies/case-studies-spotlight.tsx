"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ScenarioVisual } from "@/components/modules/case-studies/scenario-visual";
import { Container } from "@/components/ui/container";
import { caseStudiesPageCopy } from "@/data/editorial/case-studies";
import { getGsap } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import type { CaseStudy } from "@/types/editorial";

type CaseStudiesSpotlightProps = {
  study: CaseStudy;
};

export function CaseStudiesSpotlight({ study }: CaseStudiesSpotlightProps) {
  const ref = useRef<HTMLElement>(null);
  const reducedMotion = usePrefersReducedMotion();
  const href = `/case-studies/${study.slug}`;

  useEffect(() => {
    const el = ref.current;
    if (!el || reducedMotion) return;
    const { gsap } = getGsap();
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-case-spotlight]",
        { y: 22, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.7,
          stagger: 0.08,
          ease: "power3.out",
          immediateRender: false,
          scrollTrigger: { trigger: el, start: "top 84%" },
        },
      );
    }, el);
    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      ref={ref}
      className="relative py-10 sm:py-14"
      aria-labelledby="case-spotlight-heading"
    >
      <Container>
        <div className="overflow-hidden rounded-[1.75rem] border border-border bg-[linear-gradient(145deg,color-mix(in_oklab,var(--surface)_92%,var(--accent-soft)),var(--surface))] shadow-[var(--shadow-soft)]">
          <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
            <div className="relative order-2 overflow-hidden lg:order-1">
              <ScenarioVisual
                visual={study.visual}
                tone="spotlight"
                className="min-h-[18rem] rounded-none lg:min-h-full"
              />
            </div>
            <div className="relative order-1 flex flex-col justify-center p-6 sm:p-8 lg:order-2 lg:p-10 xl:p-12">
              <p
                data-case-spotlight
                className="text-xs font-semibold tracking-[0.16em] text-accent uppercase"
              >
                {caseStudiesPageCopy.spotlightEyebrow}
              </p>
              <div
                data-case-spotlight
                className="mt-4 flex flex-wrap items-center gap-2 text-[11px] font-medium tracking-wide text-muted uppercase"
              >
                <span className="rounded-full border border-border px-2.5 py-1">
                  Illustrative
                </span>
                <span className="rounded-full bg-accent-soft px-2.5 py-1 text-accent">
                  {study.categoryLabel}
                </span>
              </div>
              <h2
                id="case-spotlight-heading"
                data-case-spotlight
                className="mt-4 font-heading text-[1.85rem] leading-[1.12] font-semibold tracking-tight text-balance sm:text-[2.35rem]"
              >
                {caseStudiesPageCopy.spotlightTitle}
              </h2>
              <p
                data-case-spotlight
                className="mt-4 max-w-lg text-[0.975rem] leading-7 text-muted"
              >
                {study.excerpt}
              </p>
              <div data-case-spotlight className="mt-8">
                <Link
                  href={href}
                  className="inline-flex items-center gap-2 rounded-[var(--radius-control)] border border-border-strong bg-foreground px-5 py-3 text-sm font-medium text-background transition-[transform,opacity] hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring active:scale-[0.98]"
                >
                  {caseStudiesPageCopy.exploreStory}
                  <ArrowUpRight className="size-4" aria-hidden />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
