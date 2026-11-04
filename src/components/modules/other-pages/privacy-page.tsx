"use client";

import { useEffect, useRef } from "react";
import { Info } from "lucide-react";
import { LegalHero } from "@/components/modules/other-pages/legal-hero";
import { LegalInformationCard } from "@/components/modules/other-pages/legal-information-card";
import { LegalPageNavigation } from "@/components/modules/other-pages/legal-page-navigation";
import { LegalReadingProgress } from "@/components/modules/other-pages/legal-reading-progress";
import { LegalSection } from "@/components/modules/other-pages/legal-section";
import { LegalTableOfContents } from "@/components/modules/other-pages/legal-table-of-contents";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import {
  privacyPageCopy,
  privacyRelatedLinks,
  privacySections,
  privacySummaryCards,
} from "@/data/marketing/privacy";
import { getGsap } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

export function PrivacyPage() {
  const pageRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();
  const tocSections = privacySections.map((section) => ({
    id: section.id,
    title: section.title,
  }));

  useEffect(() => {
    const el = pageRef.current;
    if (!el || reducedMotion) return;
    const { gsap } = getGsap();
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-privacy-card]",
        { y: 18, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.55,
          stagger: 0.06,
          ease: "power3.out",
          immediateRender: false,
          scrollTrigger: {
            trigger: "[data-privacy-glance]",
            start: "top 84%",
          },
        },
      );
      gsap.fromTo(
        "[data-privacy-callout]",
        { y: 16, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.6,
          ease: "power3.out",
          immediateRender: false,
          scrollTrigger: {
            trigger: "[data-privacy-callout]",
            start: "top 88%",
          },
        },
      );
      gsap.fromTo(
        "[data-privacy-cta]",
        { y: 18, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.65,
          stagger: 0.07,
          ease: "power3.out",
          immediateRender: false,
          scrollTrigger: {
            trigger: "[data-privacy-cta-section]",
            start: "top 88%",
          },
        },
      );
    }, el);
    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <div ref={pageRef} className="relative isolate">
      <LegalReadingProgress targetId="privacy-document" />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[36rem] overflow-hidden"
        aria-hidden
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_50%_at_50%_-8%,var(--glow),transparent_58%)]" />
        <div className="absolute inset-0 bg-grid-fade [mask-image:linear-gradient(to_bottom,black_40%,transparent_100%)]" />
      </div>

      <LegalHero
        eyebrow={privacyPageCopy.eyebrow}
        title={privacyPageCopy.title}
        description={privacyPageCopy.description}
        sampleLabel={privacyPageCopy.sampleLabel}
        sampleNotice={privacyPageCopy.sampleNotice}
        headingId="privacy-hero-heading"
      />

      <section
        data-privacy-glance
        className="relative py-6 sm:py-8"
        aria-labelledby="privacy-glance-heading"
      >
        <Container>
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-[0.16em] text-accent uppercase">
              {privacyPageCopy.glanceEyebrow}
            </p>
            <h2
              id="privacy-glance-heading"
              className="mt-2 font-heading text-[1.75rem] font-semibold tracking-tight sm:text-[2.1rem]"
            >
              {privacyPageCopy.glanceTitle}
            </h2>
          </div>
          <div className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {privacySummaryCards.map((card) => (
              <div key={card.id} data-privacy-card>
                <LegalInformationCard
                  title={card.title}
                  description={card.description}
                  icon={card.icon}
                />
              </div>
            ))}
          </div>
        </Container>
      </section>

      <Container className="py-8 sm:py-10">
        <div className="grid gap-10 lg:grid-cols-[15rem_minmax(0,46rem)] lg:justify-between">
          <aside className="lg:sticky lg:top-[calc(var(--header-height)+1.25rem)] lg:self-start">
            <LegalTableOfContents
              sections={tocSections}
              heading={privacyPageCopy.onThisPage}
              mobileLabel={privacyPageCopy.jumpToSection}
            />
          </aside>

          <article
            id="privacy-document"
            className="min-w-0 rounded-[1.5rem] border border-border bg-surface/90 p-5 shadow-[var(--shadow-soft)] sm:p-8"
          >
            <div className="space-y-10">
              {privacySections.map((section, index) => (
                <LegalSection
                  key={section.id}
                  section={section}
                  index={index}
                />
              ))}
            </div>

            <aside
              data-privacy-callout
              className="mt-10 flex gap-4 rounded-[1.35rem] border border-accent/25 bg-accent-soft/40 p-5"
            >
              <span className="mt-0.5 inline-flex size-10 shrink-0 items-center justify-center rounded-xl bg-accent text-accent-foreground">
                <Info className="size-4" aria-hidden />
              </span>
              <div>
                <h2 className="font-heading text-lg font-semibold tracking-tight">
                  {privacyPageCopy.calloutTitle}
                </h2>
                <p className="mt-2 text-sm leading-6 text-muted">
                  {privacyPageCopy.calloutDescription}
                </p>
              </div>
            </aside>
          </article>
        </div>
      </Container>

      <LegalPageNavigation
        title={privacyPageCopy.relatedTitle}
        links={privacyRelatedLinks}
      />

      <section
        data-privacy-cta-section
        className="relative pb-16 sm:pb-20"
        aria-labelledby="privacy-cta-heading"
      >
        <Container>
          <div className="relative overflow-hidden rounded-[1.75rem] border border-border bg-gradient-to-br from-accent-soft/80 via-surface to-surface px-6 py-10 shadow-[var(--shadow-soft)] sm:px-10 sm:py-12">
            <div
              className="pointer-events-none absolute -top-20 -right-16 size-64 rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--accent)_28%,transparent),transparent_70%)]"
              aria-hidden
            />
            <div className="relative max-w-2xl">
              <h2
                id="privacy-cta-heading"
                data-privacy-cta
                className="font-heading text-[1.85rem] font-semibold tracking-tight text-balance sm:text-[2.25rem]"
              >
                {privacyPageCopy.ctaTitle}
              </h2>
              <p
                data-privacy-cta
                className="mt-4 text-base leading-7 text-muted"
              >
                {privacyPageCopy.ctaDescription}
              </p>
              <div
                data-privacy-cta
                className="mt-7 flex flex-col gap-3 sm:flex-row"
              >
                <Button href="/demo" size="lg">
                  {privacyPageCopy.demoLabel}
                </Button>
                <Button href="/" variant="secondary" size="lg">
                  {privacyPageCopy.homeLabel}
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
