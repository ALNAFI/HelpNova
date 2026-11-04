"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { CaseStudyCard } from "@/components/modules/case-studies/case-study-card";
import { ScenarioVisual } from "@/components/modules/case-studies/scenario-visual";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import {
  caseStudiesPageCopy,
  getRelatedCaseStudies,
} from "@/data/editorial/case-studies";
import { getGsap } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import type { CaseStudy, CaseStudyDetail } from "@/types/editorial";

type CaseStudyDetailPageProps = {
  study: CaseStudy;
  detail: CaseStudyDetail;
};

export function CaseStudyDetailPage({
  study,
  detail,
}: CaseStudyDetailPageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();
  const related = getRelatedCaseStudies(study.slug, 2);

  useEffect(() => {
    const el = ref.current;
    if (!el || reducedMotion) return;
    const { gsap } = getGsap();
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-case-detail]",
        { y: 18, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.65,
          stagger: 0.07,
          ease: "power3.out",
          immediateRender: false,
        },
      );
      gsap.utils.toArray<HTMLElement>("[data-case-section]").forEach((section) => {
        gsap.fromTo(
          section,
          { y: 20, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.65,
            ease: "power3.out",
            immediateRender: false,
            scrollTrigger: { trigger: section, start: "top 88%" },
          },
        );
      });
    }, el);
    return () => ctx.revert();
  }, [reducedMotion, study.slug]);

  return (
    <div ref={ref} className="relative isolate overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_85%_45%_at_50%_-6%,var(--glow),transparent_58%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[28rem] bg-grid-fade [mask-image:linear-gradient(to_bottom,black_38%,transparent_100%)]"
        aria-hidden
      />

      <header className="relative pt-8 pb-6 sm:pt-12 sm:pb-8">
        <Container>
          <nav aria-label="Breadcrumb" data-case-detail>
            <ol className="flex flex-wrap items-center gap-2 text-sm text-muted">
              <li>
                <Link
                  href="/"
                  className="transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  Home
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li>
                <Link
                  href="/case-studies"
                  className="transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  Case Studies
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li className="max-w-[16rem] truncate text-foreground sm:max-w-md">
                <span aria-current="page">{study.title}</span>
              </li>
            </ol>
          </nav>

          <div className="mt-8 grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
            <div className="max-w-2xl">
              <div
                data-case-detail
                className="flex flex-wrap items-center gap-2 text-[11px] font-medium tracking-wide text-muted uppercase"
              >
                <span className="rounded-full border border-border px-2.5 py-1 text-foreground/80">
                  {caseStudiesPageCopy.detailBadge}
                </span>
                <span className="rounded-full bg-accent-soft px-2.5 py-1 text-accent">
                  {study.categoryLabel}
                </span>
                <span>{study.readingTime}</span>
              </div>
              <h1
                data-case-detail
                className="mt-5 font-heading text-[2.1rem] leading-[1.08] font-semibold tracking-tight text-balance sm:text-[2.75rem] lg:text-[3.1rem]"
              >
                {study.title}
              </h1>
              <p
                data-case-detail
                className="mt-5 text-base leading-7 text-muted sm:text-[1.05rem] sm:leading-8"
              >
                {study.excerpt}
              </p>
            </div>
            <div data-case-detail>
              <ScenarioVisual
                visual={study.visual}
                tone="spotlight"
                className="min-h-[16rem] rounded-[1.5rem] shadow-[var(--shadow-soft)] sm:min-h-[18rem]"
              />
            </div>
          </div>
        </Container>
      </header>

      <Container className="space-y-8 pb-8 sm:space-y-10 sm:pb-12">
        <section
          data-case-section
          className="rounded-[1.5rem] border border-border bg-surface p-6 shadow-[var(--shadow-soft)] sm:p-8"
          aria-labelledby="case-context-heading"
        >
          <p className="text-xs font-semibold tracking-[0.16em] text-accent uppercase">
            {caseStudiesPageCopy.contextLabel}
          </p>
          <h2
            id="case-context-heading"
            className="mt-2 font-heading text-2xl font-semibold tracking-tight"
          >
            Setting the scene
          </h2>
          <div className="mt-4 space-y-4 text-[0.975rem] leading-7 text-muted">
            {detail.context.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </section>

        <section
          data-case-section
          className="rounded-[1.5rem] border border-border bg-surface p-6 shadow-[var(--shadow-soft)] sm:p-8"
          aria-labelledby="case-inquiry-heading"
        >
          <p className="text-xs font-semibold tracking-[0.16em] text-accent uppercase">
            {caseStudiesPageCopy.inquiryLabel}
          </p>
          <h2
            id="case-inquiry-heading"
            className="mt-2 font-heading text-2xl font-semibold tracking-tight"
          >
            {detail.inquiry.title}
          </h2>
          <div className="mt-5 rounded-[1.25rem] border border-border bg-surface-muted/50 p-5">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-muted">
              <span className="font-medium text-foreground">
                {detail.inquiry.customer}
              </span>
              <span aria-hidden>·</span>
              <span>{detail.inquiry.channel}</span>
            </div>
            <p className="mt-3 text-[0.975rem] leading-7 text-foreground">
              {detail.inquiry.message}
            </p>
          </div>
        </section>

        <section
          data-case-section
          className="rounded-[1.5rem] border border-border bg-surface p-6 shadow-[var(--shadow-soft)] sm:p-8"
          aria-labelledby="case-workflow-heading"
        >
          <p className="text-xs font-semibold tracking-[0.16em] text-accent uppercase">
            {caseStudiesPageCopy.workflowLabel}
          </p>
          <h2
            id="case-workflow-heading"
            className="mt-2 font-heading text-2xl font-semibold tracking-tight"
          >
            {detail.workflow.title}
          </h2>
          <ol className="mt-6 space-y-3">
            {detail.workflow.steps.map((step, index) => (
              <li
                key={step.label}
                className="grid gap-3 rounded-[1.15rem] border border-border bg-surface-muted/40 p-4 sm:grid-cols-[auto_1fr] sm:items-start"
              >
                <span className="inline-flex size-9 items-center justify-center rounded-full bg-accent text-sm font-semibold text-accent-foreground">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <p className="font-medium text-foreground">{step.label}</p>
                  <p className="mt-1 text-sm leading-6 text-muted">
                    {step.detail}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section
          data-case-section
          className="rounded-[1.5rem] border border-border bg-surface p-6 shadow-[var(--shadow-soft)] sm:p-8"
          aria-labelledby="case-handoff-heading"
        >
          <p className="text-xs font-semibold tracking-[0.16em] text-accent uppercase">
            {caseStudiesPageCopy.handoffLabel}
          </p>
          <h2
            id="case-handoff-heading"
            className="mt-2 font-heading text-2xl font-semibold tracking-tight"
          >
            {detail.handoff.title}
          </h2>
          <div className="mt-5 grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="rounded-[1.2rem] border border-border bg-surface-muted/50 p-5">
              <p className="text-[11px] font-semibold tracking-[0.14em] text-muted uppercase">
                Assigned team
              </p>
              <p className="mt-2 font-heading text-xl font-semibold text-foreground">
                {detail.handoff.team}
              </p>
              <div className="mt-4 rounded-xl border border-amber-500/25 bg-amber-500/10 p-4">
                <p className="text-[10px] font-semibold tracking-wide text-amber-700 uppercase dark:text-amber-200">
                  Internal note
                </p>
                <p className="mt-2 text-sm leading-6 text-foreground">
                  {detail.handoff.note}
                </p>
              </div>
            </div>
            <ul className="space-y-3">
              {detail.handoff.summary.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 rounded-[1.1rem] border border-border px-4 py-3 text-sm leading-6 text-muted"
                >
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section
          data-case-section
          className="rounded-[1.5rem] border border-border bg-surface p-6 shadow-[var(--shadow-soft)] sm:p-8"
          aria-labelledby="case-illustrates-heading"
        >
          <p className="text-xs font-semibold tracking-[0.16em] text-accent uppercase">
            {caseStudiesPageCopy.illustratesLabel}
          </p>
          <h2
            id="case-illustrates-heading"
            className="mt-2 font-heading text-2xl font-semibold tracking-tight"
          >
            Takeaways from this scenario
          </h2>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2">
            {detail.illustrates.map((item) => (
              <li
                key={item}
                className="rounded-[1.15rem] border border-border bg-accent-soft/30 px-4 py-4 text-sm leading-6 text-foreground"
              >
                {item}
              </li>
            ))}
          </ul>
        </section>
      </Container>

      {related.length > 0 ? (
        <section
          data-case-section
          className="relative py-10 sm:py-14"
          aria-labelledby="related-case-studies-heading"
        >
          <Container>
            <div className="max-w-2xl">
              <h2
                id="related-case-studies-heading"
                className="font-heading text-[1.75rem] font-semibold tracking-tight sm:text-[2.1rem]"
              >
                {caseStudiesPageCopy.relatedTitle}
              </h2>
              <p className="mt-3 text-base leading-7 text-muted">
                {caseStudiesPageCopy.relatedDescription}
              </p>
            </div>
            <div className="mt-8 grid gap-5 md:grid-cols-2">
              {related.map((item) => (
                <CaseStudyCard
                  key={item.id}
                  study={item}
                  variant={item.layout === "editorial" ? "editorial" : "compact"}
                />
              ))}
            </div>
          </Container>
        </section>
      ) : null}

      <section
        data-case-section
        className="relative pb-16 sm:pb-20"
        aria-labelledby="case-detail-cta-heading"
      >
        <Container>
          <div className="relative overflow-hidden rounded-[1.75rem] border border-border bg-gradient-to-br from-accent-soft/80 via-surface to-surface px-6 py-10 shadow-[var(--shadow-soft)] sm:px-10 sm:py-12">
            <div
              className="pointer-events-none absolute -top-20 -right-16 size-64 rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--accent)_30%,transparent),transparent_70%)]"
              aria-hidden
            />
            <div className="relative max-w-2xl">
              <h2
                id="case-detail-cta-heading"
                className="font-heading text-[1.85rem] font-semibold tracking-tight text-balance sm:text-[2.25rem]"
              >
                {caseStudiesPageCopy.detailCtaTitle}
              </h2>
              <p className="mt-4 text-base leading-7 text-muted sm:text-[1.05rem]">
                {caseStudiesPageCopy.detailCtaDescription}
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button href="/demo" size="lg">
                  {caseStudiesPageCopy.demoLabel}
                  <ArrowUpRight className="size-4" aria-hidden />
                </Button>
                <Button href="/case-studies" variant="secondary" size="lg">
                  {caseStudiesPageCopy.backToCaseStudies}
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
