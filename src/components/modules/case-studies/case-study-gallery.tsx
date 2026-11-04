"use client";

import { useEffect, useRef } from "react";
import { CaseStudyCard } from "@/components/modules/case-studies/case-study-card";
import { Container } from "@/components/ui/container";
import { caseStudiesPageCopy } from "@/data/editorial/case-studies";
import { getGsap } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import type { CaseStudy } from "@/types/editorial";

type CaseStudyGalleryProps = {
  studies: CaseStudy[];
};

export function CaseStudyGallery({ studies }: CaseStudyGalleryProps) {
  const ref = useRef<HTMLElement>(null);
  const reducedMotion = usePrefersReducedMotion();
  const [feature, secondary, tertiary] = studies;

  useEffect(() => {
    const el = ref.current;
    if (!el || reducedMotion) return;
    const { gsap } = getGsap();
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-case-gallery]",
        { y: 20, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.65,
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
      className="relative py-10 sm:py-12"
      aria-labelledby="case-gallery-heading"
    >
      <Container>
        <div data-case-gallery className="max-w-2xl">
          <p className="text-xs font-semibold tracking-[0.16em] text-accent uppercase">
            {caseStudiesPageCopy.galleryEyebrow}
          </p>
          <h2
            id="case-gallery-heading"
            className="mt-2 font-heading text-[1.75rem] font-semibold tracking-tight text-balance sm:text-[2.15rem]"
          >
            {caseStudiesPageCopy.galleryTitle}
          </h2>
          <p className="mt-3 text-base leading-7 text-muted">
            {caseStudiesPageCopy.galleryDescription}
          </p>
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-12">
          {feature ? (
            <div data-case-gallery className="lg:col-span-7">
              <CaseStudyCard study={feature} variant="feature" />
            </div>
          ) : null}
          <div className="grid gap-5 lg:col-span-5">
            {secondary ? (
              <div data-case-gallery>
                <CaseStudyCard study={secondary} variant="editorial" />
              </div>
            ) : null}
            {tertiary ? (
              <div data-case-gallery>
                <CaseStudyCard study={tertiary} variant="compact" />
              </div>
            ) : null}
          </div>
        </div>
      </Container>
    </section>
  );
}
