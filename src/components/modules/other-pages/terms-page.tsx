"use client";

import { useEffect, useRef } from "react";
import { Info } from "lucide-react";
import { LegalHero } from "@/components/modules/other-pages/legal-hero";
import { LegalInformationCard } from "@/components/modules/other-pages/legal-information-card";
import { LegalPageNavigation } from "@/components/modules/other-pages/legal-page-navigation";
import { LegalReadingProgress } from "@/components/modules/other-pages/legal-reading-progress";
import { LegalSection } from "@/components/modules/other-pages/legal-section";
import { TermsHeroIllustration } from "@/components/modules/other-pages/terms-hero-illustration";
import {
  LegalTableOfContents,
  LegalTocProvider,
} from "@/components/modules/other-pages/legal-table-of-contents";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import {
  termsPageCopy,
  termsRelatedLinks,
  termsSections,
  termsSummaryCards,
} from "@/data/marketing/terms";
import { getGsap } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

export function TermsPage() {
  const pageRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();
  const tocSections = termsSections.map((section) => ({
    id: section.id,
    title: section.title,
  }));

  useEffect(() => {
    const el = pageRef.current;
    if (!el || reducedMotion) return;
    const { gsap } = getGsap();
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-terms-card]",
        { y: 18, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.55,
          stagger: 0.06,
          ease: "power3.out",
          immediateRender: false,
          scrollTrigger: {
            trigger: "[data-terms-glance]",
            start: "top 84%",
          },
        },
      );
      gsap.fromTo(
        "[data-terms-callout]",
        { y: 16, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.6,
          ease: "power3.out",
          immediateRender: false,
          scrollTrigger: {
            trigger: "[data-terms-callout]",
            start: "top 88%",
          },
        },
      );
      gsap.fromTo(
        "[data-terms-cta]",
        { y: 18, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.65,
          stagger: 0.07,
          ease: "power3.out",
          immediateRender: false,
          scrollTrigger: {
            trigger: "[data-terms-cta-section]",
            start: "top 88%",
          },
        },
      );
    }, el);
    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <div ref={pageRef} className="relative isolate">
      <LegalReadingProgress targetId="terms-document" />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[36rem] overflow-hidden"
        aria-hidden
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_50%_at_50%_-8%,var(--glow),transparent_58%)]" />
        <div className="absolute inset-0 bg-grid-fade [mask-image:linear-gradient(to_bottom,black_40%,transparent_100%)]" />
      </div>

      <LegalHero
        eyebrow={termsPageCopy.eyebrow}
        title={termsPageCopy.title}
        description={termsPageCopy.description}
        headingId="terms-hero-heading"
        illustration={<TermsHeroIllustration />}
      />

      <section
        data-terms-glance
        className="relative py-6 sm:py-8"
        aria-labelledby="terms-glance-heading"
      >
        <Container>
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-[0.16em] text-accent uppercase">
              {termsPageCopy.glanceEyebrow}
            </p>
            <h2
              id="terms-glance-heading"
              className="mt-2 font-heading text-[1.75rem] font-semibold tracking-tight sm:text-[2.1rem]"
            >
              {termsPageCopy.glanceTitle}
            </h2>
          </div>
          <div className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {termsSummaryCards.map((card) => (
              <div key={card.id} data-terms-card>
                <LegalInformationCard
                  title={card.title}
                  description={card.description}
                  icon={card.icon}
                  iconPosition="start"
                />
              </div>
            ))}
          </div>
        </Container>
      </section>

      <Container className="py-8 sm:py-10">
        <LegalTocProvider sections={tocSections}>
          <div className="relative">
            <div className="sticky top-[var(--header-height)] z-40 -mx-1 mb-4 overflow-visible bg-background/95 px-1 py-2 backdrop-blur-md supports-[backdrop-filter]:bg-background/80 lg:hidden">
              <LegalTableOfContents
                surface="mobile"
                heading={termsPageCopy.onThisPage}
                mobileLabel={termsPageCopy.jumpToSection}
              />
            </div>

            <div className="grid gap-10 lg:grid-cols-[15rem_minmax(0,46rem)] lg:justify-between">
              <aside className="hidden lg:sticky lg:top-[calc(var(--header-height)+1.25rem)] lg:block lg:self-start">
                <LegalTableOfContents
                  surface="desktop"
                  heading={termsPageCopy.onThisPage}
                  mobileLabel={termsPageCopy.jumpToSection}
                />
              </aside>

              <article
                id="terms-document"
                className="min-w-0 rounded-[1.5rem] border border-border bg-surface/90 p-5 shadow-[var(--shadow-soft)] sm:p-8"
              >
                <div className="space-y-10">
                  {termsSections.map((section, index) => (
                    <LegalSection
                      key={section.id}
                      section={section}
                      index={index}
                    />
                  ))}
                </div>

                <aside
                  data-terms-callout
                  className="mt-10 flex gap-4 rounded-[1.35rem] border border-accent/25 bg-accent-soft/40 p-5"
                >
                  <span className="mt-0.5 inline-flex size-10 shrink-0 items-center justify-center rounded-xl bg-accent text-accent-foreground">
                    <Info className="size-4" aria-hidden />
                  </span>
                  <div>
                    <h2 className="font-heading text-lg font-semibold tracking-tight">
                      {termsPageCopy.calloutTitle}
                    </h2>
                    <p className="mt-2 text-sm leading-6 text-muted">
                      {termsPageCopy.calloutDescription}
                    </p>
                  </div>
                </aside>
              </article>
            </div>
          </div>
        </LegalTocProvider>
      </Container>

      <LegalPageNavigation
        title={termsPageCopy.relatedTitle}
        links={termsRelatedLinks}
      />

      <section
        data-terms-cta-section
        className="relative pb-16 sm:pb-20"
        aria-labelledby="terms-cta-heading"
      >
        <Container>
          <div className="relative overflow-hidden rounded-[1.75rem] border border-border bg-gradient-to-br from-accent-soft/80 via-surface to-surface px-6 py-10 shadow-[var(--shadow-soft)] sm:px-10 sm:py-12">
            <div
              className="pointer-events-none absolute -top-20 -right-16 size-64 rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--accent)_28%,transparent),transparent_70%)]"
              aria-hidden
            />
            <div className="relative max-w-2xl">
              <h2
                id="terms-cta-heading"
                data-terms-cta
                className="font-heading text-[1.85rem] font-semibold tracking-tight text-balance sm:text-[2.25rem]"
              >
                {termsPageCopy.ctaTitle}
              </h2>
              <p
                data-terms-cta
                className="mt-4 text-base leading-7 text-muted"
              >
                {termsPageCopy.ctaDescription}
              </p>
              <div
                data-terms-cta
                className="mt-7 flex flex-col gap-3 sm:flex-row"
              >
                <Button href="/demo" size="lg">
                  {termsPageCopy.demoLabel}
                </Button>
                <Button href="/" variant="secondary" size="lg">
                  {termsPageCopy.homeLabel}
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
