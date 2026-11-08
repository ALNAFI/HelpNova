"use client";

import { useEffect, useRef } from "react";
import { Info } from "lucide-react";
import { LegalHero } from "@/components/modules/other-pages/legal-hero";
import { LegalPageNavigation } from "@/components/modules/other-pages/legal-page-navigation";
import { SecurityAnimatedIcon } from "@/components/modules/other-pages/security-animated-icon";
import { SecurityHeroIllustration } from "@/components/modules/other-pages/security-hero-illustration";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import {
  securityBoundaries,
  securityPageCopy,
  securityPillars,
  securityPractices,
  securityRelatedLinks,
} from "@/data/marketing/security";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { getGsap } from "@/lib/gsap";

export function SecurityPage() {
  const pageRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const el = pageRef.current;
    if (!el || reducedMotion) return;
    const { gsap } = getGsap();
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-security-card]",
        { y: 20, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.55,
          stagger: 0.07,
          ease: "power3.out",
          immediateRender: false,
          scrollTrigger: {
            trigger: "[data-security-pillars]",
            start: "top 84%",
          },
        },
      );

      gsap.fromTo(
        "[data-security-practice]",
        { y: 18, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.55,
          stagger: 0.06,
          ease: "power3.out",
          immediateRender: false,
          scrollTrigger: {
            trigger: "[data-security-practices]",
            start: "top 84%",
          },
        },
      );

      gsap.fromTo(
        "[data-security-boundary]",
        { x: -10, autoAlpha: 0 },
        {
          x: 0,
          autoAlpha: 1,
          duration: 0.45,
          stagger: 0.05,
          ease: "power2.out",
          immediateRender: false,
          scrollTrigger: {
            trigger: "[data-security-boundaries]",
            start: "top 86%",
          },
        },
      );

      gsap.fromTo(
        "[data-security-callout]",
        { y: 16, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.6,
          ease: "power3.out",
          immediateRender: false,
          scrollTrigger: {
            trigger: "[data-security-callout]",
            start: "top 88%",
          },
        },
      );

      gsap.fromTo(
        "[data-security-cta]",
        { y: 18, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.65,
          stagger: 0.07,
          ease: "power3.out",
          immediateRender: false,
          scrollTrigger: {
            trigger: "[data-security-cta-section]",
            start: "top 88%",
          },
        },
      );
    }, el);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <div ref={pageRef} className="relative isolate">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[36rem] overflow-hidden"
        aria-hidden
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_50%_at_50%_-8%,var(--glow),transparent_58%)]" />
        <div className="absolute inset-0 bg-grid-fade [mask-image:linear-gradient(to_bottom,black_40%,transparent_100%)]" />
      </div>

      <div className="relative">
        <LegalHero
          eyebrow={securityPageCopy.eyebrow}
          title={securityPageCopy.title}
          description={securityPageCopy.description}
          headingId="security-hero-heading"
          illustration={<SecurityHeroIllustration />}
        />
      </div>

      <section
        data-security-pillars
        className="relative py-8 sm:py-10"
        aria-labelledby="security-pillars-heading"
      >
        <Container>
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-[0.16em] text-accent uppercase">
              {securityPageCopy.pillarsEyebrow}
            </p>
            <h2
              id="security-pillars-heading"
              className="mt-2 font-heading text-[1.75rem] font-semibold tracking-tight sm:text-[2.1rem]"
            >
              {securityPageCopy.pillarsTitle}
            </h2>
            <p className="mt-3 text-base leading-7 text-muted">
              {securityPageCopy.pillarsDescription}
            </p>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {securityPillars.map((pillar) => (
              <article
                key={pillar.id}
                data-security-card
                className="rounded-[1.35rem] border border-border bg-surface p-5 shadow-[var(--shadow-soft)] sm:p-6"
              >
                <div className="flex items-center gap-3">
                  <SecurityAnimatedIcon
                    icon={pillar.icon}
                    className="shrink-0"
                  />
                  <h3 className="min-w-0 font-heading text-lg font-semibold tracking-tight">
                    {pillar.title}
                  </h3>
                </div>
                <p className="mt-3 text-sm leading-6 text-muted">
                  {pillar.description}
                </p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section
        data-security-practices
        className="relative py-8 sm:py-10"
        aria-labelledby="security-practices-heading"
      >
        <Container>
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-[0.16em] text-accent uppercase">
              {securityPageCopy.practicesEyebrow}
            </p>
            <h2
              id="security-practices-heading"
              className="mt-2 font-heading text-[1.75rem] font-semibold tracking-tight sm:text-[2.1rem]"
            >
              {securityPageCopy.practicesTitle}
            </h2>
            <p className="mt-3 text-base leading-7 text-muted">
              {securityPageCopy.practicesDescription}
            </p>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {securityPractices.map((practice) => (
              <article
                key={practice.id}
                data-security-practice
                className="group flex h-full flex-col rounded-[1.35rem] border border-border bg-surface/90 p-5 shadow-[var(--shadow-soft)] transition-[border-color,transform] duration-300 hover:-translate-y-0.5 hover:border-accent/35 sm:p-6"
              >
                <div className="flex items-center gap-3">
                  <SecurityAnimatedIcon
                    icon={practice.icon}
                    tone="soft"
                    className="shrink-0"
                  />
                  <h3 className="min-w-0 font-heading text-lg font-semibold tracking-tight text-balance">
                    {practice.title}
                  </h3>
                </div>
                <p className="mt-3 text-sm leading-6 text-muted">
                  {practice.description}
                </p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section
        data-security-boundaries
        className="relative py-8 sm:py-10"
        aria-labelledby="security-boundaries-heading"
      >
        <Container>
          <div className="overflow-hidden rounded-[1.75rem] border border-border bg-surface shadow-[var(--shadow-soft)]">
            <div className="grid gap-0 lg:grid-cols-[2fr_3fr]">
              <div className="flex flex-col justify-center border-b border-border bg-gradient-to-br from-accent-soft/80 via-surface to-surface p-6 sm:p-8 lg:border-r lg:border-b-0">
                <p className="text-xs font-semibold tracking-[0.16em] text-accent uppercase">
                  {securityPageCopy.boundariesEyebrow}
                </p>
                <h2
                  id="security-boundaries-heading"
                  className="mt-2 font-heading text-[1.7rem] font-semibold tracking-tight sm:text-[2rem]"
                >
                  {securityPageCopy.boundariesTitle}
                </h2>
                <p className="mt-3 text-sm leading-7 text-muted sm:text-base">
                  {securityPageCopy.boundariesDescription}
                </p>
              </div>

              <ul className="space-y-2 p-4 sm:space-y-2.5 sm:p-5 lg:p-6">
                {securityBoundaries.map((item) => (
                  <li
                    key={item.id}
                    data-security-boundary
                    className="rounded-2xl border border-border/80 bg-surface-muted/40 px-3.5 py-2.5 sm:px-4 sm:py-3"
                  >
                    <p className="font-heading text-sm font-semibold tracking-tight text-foreground sm:text-base">
                      {item.title}
                    </p>
                    <p className="mt-1 text-sm leading-6 text-muted">
                      {item.description}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <aside
            data-security-callout
            className="mt-6 flex gap-4 rounded-[1.35rem] border border-accent/25 bg-accent-soft/40 p-5 sm:p-6"
          >
            <span className="mt-0.5 inline-flex size-10 shrink-0 items-center justify-center rounded-xl bg-accent text-accent-foreground">
              <Info className="size-4" aria-hidden />
            </span>
            <div>
              <h2 className="font-heading text-lg font-semibold tracking-tight">
                {securityPageCopy.calloutTitle}
              </h2>
              <p className="mt-2 text-sm leading-6 text-muted">
                {securityPageCopy.calloutDescription}
              </p>
            </div>
          </aside>
        </Container>
      </section>

      <LegalPageNavigation
        title={securityPageCopy.relatedTitle}
        links={securityRelatedLinks}
      />

      <section
        data-security-cta-section
        className="relative pb-16 sm:pb-20"
        aria-labelledby="security-cta-heading"
      >
        <Container>
          <div className="relative overflow-hidden rounded-[1.75rem] border border-border bg-gradient-to-br from-accent-soft/80 via-surface to-surface px-6 py-10 shadow-[var(--shadow-soft)] sm:px-10 sm:py-12">
            <div
              className="pointer-events-none absolute -top-20 -right-16 size-64 rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--accent)_28%,transparent),transparent_70%)]"
              aria-hidden
            />
            <div className="relative max-w-2xl">
              <h2
                id="security-cta-heading"
                data-security-cta
                className="font-heading text-[1.85rem] font-semibold tracking-tight text-balance sm:text-[2.25rem]"
              >
                {securityPageCopy.ctaTitle}
              </h2>
              <p
                data-security-cta
                className="mt-4 text-base leading-7 text-muted"
              >
                {securityPageCopy.ctaDescription}
              </p>
              <div
                data-security-cta
                className="mt-7 flex flex-col gap-3 sm:flex-row"
              >
                <Button href="/demo" size="lg">
                  {securityPageCopy.demoLabel}
                </Button>
                <Button href="/" variant="secondary" size="lg">
                  {securityPageCopy.homeLabel}
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
