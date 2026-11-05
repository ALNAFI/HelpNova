"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUp,
  CheckCircle2,
  Inbox,
  MessageSquareText,
  Users,
} from "lucide-react";
import { IndustryArtwork } from "@/components/modules/solutions/industry-artwork";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { routes } from "@/config/routes";
import { useLenis } from "@/context/lenis-context";
import {
  getSolutionsScenario,
  solutionsGallerySection,
  solutionsIndustrySection,
  solutionsJourneySection,
  solutionsScenarios,
  type SolutionsIndustryId,
} from "@/data/marketing/solutions";
import { getGsap } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { cn } from "@/utils/cn";

export function SolutionsExplorer({
  selectedId,
  onSelectIndustry,
}: {
  selectedId: SolutionsIndustryId;
  onSelectIndustry: (id: SolutionsIndustryId) => void;
}) {
  const scenario = getSolutionsScenario(selectedId);
  const reducedMotion = usePrefersReducedMotion();
  const { scrollToElement } = useLenis();
  const journeyRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const timelineRef = useRef<{ kill: () => void } | null>(null);
  const liveRef = useRef<HTMLParagraphElement>(null);
  const journeyReadyRef = useRef(false);

  useEffect(() => {
    const root = journeyRef.current;
    if (!root) return;

    timelineRef.current?.kill();
    timelineRef.current = null;

    const panels = root.querySelectorAll<HTMLElement>("[data-journey-panel]");
    const connectors = root.querySelectorAll<SVGPathElement>(
      "[data-journey-connector]",
    );
    const badge = root.querySelector("[data-assignment-badge]");
    const workload = root.querySelector("[data-workload-row]");
    const shouldAnimate = journeyReadyRef.current;
    journeyReadyRef.current = true;

    if (reducedMotion || !shouldAnimate) {
      panels.forEach((panel) => {
        panel.style.opacity = "1";
        panel.style.visibility = "visible";
      });
      connectors.forEach((path) => {
        path.style.strokeDasharray = "none";
        path.style.strokeDashoffset = "0";
        path.style.opacity = "1";
      });
      root.querySelectorAll<SVGElement>("[data-journey-arrow]").forEach((arrow) => {
        arrow.style.opacity = "1";
      });
      return;
    }

    const { gsap } = getGsap();
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
      timelineRef.current = tl;

      tl.fromTo(
        panels,
        { autoAlpha: 0.4 },
        { autoAlpha: 1, duration: 0.32, stagger: 0.04 },
        0,
      );

      connectors.forEach((path) => {
        const length = path.getTotalLength();
        const arrow = path.parentElement?.querySelector<SVGElement>(
          "[data-journey-arrow]",
        );
        gsap.set(path, {
          strokeDasharray: length,
          strokeDashoffset: length,
          opacity: 0.45,
        });
        if (arrow) gsap.set(arrow, { autoAlpha: 0 });
      });

      connectors.forEach((path, index) => {
        const arrow = path.parentElement?.querySelector<SVGElement>(
          "[data-journey-arrow]",
        );
        const start = index === 0 ? 0.08 : "-=0.1";
        tl.to(
          path,
          { strokeDashoffset: 0, opacity: 1, duration: 0.4 },
          start,
        );
        if (arrow) {
          tl.to(arrow, { autoAlpha: 1, duration: 0.18, ease: "power2.out" }, "-=0.08");
        }
      });

      if (badge) {
        tl.fromTo(
          badge,
          { autoAlpha: 0.75, scale: 1.06, rotate: -5 },
          { autoAlpha: 1, scale: 1, rotate: -3, duration: 0.28 },
          "-=0.12",
        );
      }

      if (workload) {
        tl.fromTo(
          workload,
          { boxShadow: "0 0 0 0 transparent" },
          {
            boxShadow:
              "0 0 0 2px color-mix(in oklab, var(--accent) 40%, transparent)",
            duration: 0.25,
            yoyo: true,
            repeat: 1,
          },
          "-=0.05",
        );
      }
    }, root);

    return () => {
      timelineRef.current?.kill();
      timelineRef.current = null;
      ctx.revert();
    };
  }, [selectedId, reducedMotion]);

  function selectIndustry(
    id: SolutionsIndustryId,
    options?: { scrollToJourney?: boolean; announce?: boolean },
  ) {
    const next = getSolutionsScenario(id);

    if (options?.announce && liveRef.current) {
      liveRef.current.textContent = `${next.industry} selected. ${next.topicLabel} assigned to ${next.team}.`;
    }

    onSelectIndustry(id);

    if (options?.scrollToJourney) {
      scrollToElement(solutionsJourneySection.id, {
        immediate: reducedMotion,
      });
      window.setTimeout(() => {
        headingRef.current?.focus({ preventScroll: true });
      }, reducedMotion ? 0 : 450);
    }
  }

  return (
    <>
      <p ref={liveRef} className="sr-only" aria-live="polite" aria-atomic="true" />

      <section
        id={solutionsIndustrySection.id}
        className="scroll-mt-28 overflow-x-clip py-16 sm:py-20 lg:py-24"
      >
        <Container>
          <SectionHeading
            title={solutionsIndustrySection.title}
            description={solutionsIndustrySection.description}
            className="mb-10 max-w-3xl"
          />

          <div
            role="list"
            aria-label="Industry solutions"
            className="grid grid-cols-1 gap-4 md:grid-cols-3"
          >
            {solutionsScenarios.map((item) => {
              const active = selectedId === item.id;
              return (
                <article
                  key={item.id}
                  role="listitem"
                  aria-current={active ? "true" : undefined}
                  className={cn(
                    "flex h-full flex-col overflow-hidden rounded-[var(--radius-workspace)] border p-4 shadow-[var(--shadow-soft)] transition-[border-color,background-color,box-shadow] sm:p-5",
                    active
                      ? "border-accent/50 bg-accent-soft/40 ring-1 ring-accent/20"
                      : "border-border bg-surface",
                  )}
                >
                  <IndustryArtwork industry={item.id} active={active} />
                  <div className="mt-4 flex min-h-0 flex-1 flex-col">
                    <div className="flex min-h-[1.75rem] items-center gap-2">
                      <h3 className="font-heading text-lg font-semibold tracking-tight">
                        {item.industry}
                      </h3>
                      {active ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-accent-soft px-2 py-0.5 text-[10px] font-semibold text-accent">
                          <CheckCircle2 className="size-3" aria-hidden />
                          Selected
                        </span>
                      ) : null}
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-muted">
                      {item.context}
                    </p>
                  </div>

                  <div className="mt-5 flex flex-col">
                    <button
                      type="button"
                      aria-pressed={active}
                      onClick={() =>
                        selectIndustry(item.id, {
                          scrollToJourney: true,
                          announce: true,
                        })
                      }
                      className={cn(
                        "inline-flex w-full items-center justify-center rounded-[var(--radius-control)] px-3 py-2.5 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                        active
                          ? "bg-accent text-accent-foreground"
                          : "border border-border bg-surface-muted/50 text-foreground hover:bg-surface-muted",
                      )}
                    >
                      {item.selectionLabel}
                    </button>

                    <div className="mt-2 flex min-h-9 items-center justify-center">
                      {item.id === "ecommerce" ? (
                        <Link
                          href={routes.ecommerce.href}
                          className="inline-flex w-full items-center justify-center gap-1.5 rounded-[var(--radius-control)] px-3 py-2 text-sm font-medium text-accent transition hover:bg-accent-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                        >
                          Explore ecommerce solution
                          <ArrowRight className="size-3.5" aria-hidden />
                        </Link>
                      ) : null}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </Container>
      </section>

      <section
        id={solutionsJourneySection.id}
        className="relative scroll-mt-28 overflow-x-clip border-y border-border bg-surface-muted/35 py-16 sm:py-20 lg:py-24"
      >
        <Container className="relative">
          <div className="mb-8 max-w-3xl">
            <h2
              ref={headingRef}
              tabIndex={-1}
              className="font-heading text-[1.75rem] font-semibold tracking-tight text-balance outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:text-[2rem] lg:text-[2.5rem]"
            >
              {solutionsJourneySection.title}
            </h2>
            <p className="mt-4 text-base leading-7 text-pretty text-muted sm:text-[17px]">
              {solutionsJourneySection.description}
            </p>
          </div>

          <div
            ref={journeyRef}
            className="grid grid-cols-1 gap-3 lg:grid-cols-[1fr_auto_1fr_auto_1fr] lg:items-stretch lg:gap-4"
          >
            <JourneyStage step="01" title="Inquiry" icon={MessageSquareText}>
              <div data-journey-panel className="flex min-h-0 flex-1 flex-col">
                <p className="text-[11px] font-semibold tracking-[0.14em] text-accent uppercase">
                  {scenario.topicLabel}
                </p>
                <p className="mt-2 font-heading text-base font-semibold">
                  {scenario.customerName}
                </p>
                <p className="text-sm text-muted">{scenario.subject}</p>
                <div className="mt-3 rounded-2xl rounded-tl-md border border-border bg-surface-muted/70 px-3.5 py-3">
                  <p className="text-sm leading-relaxed text-pretty">
                    {scenario.message}
                  </p>
                </div>
                {scenario.reference ? (
                  <p className="mt-auto pt-3 font-mono text-[11px] text-muted">
                    Ref · {scenario.reference}
                  </p>
                ) : null}
              </div>
            </JourneyStage>

            <JourneyConnector className="hidden lg:flex" />
            <JourneyConnector className="flex lg:hidden" vertical />

            <JourneyStage step="02" title="Assignment" icon={Users}>
              <div data-journey-panel className="flex min-h-0 flex-1 flex-col">
                <div
                  data-assignment-badge
                  className="inline-flex self-start rotate-[-3deg] rounded-md border-2 border-accent/60 bg-accent/10 px-3 py-2"
                >
                  <p className="font-mono text-[11px] font-bold tracking-[0.12em] text-accent uppercase">
                    Assigned to {scenario.team}
                  </p>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-pretty text-muted">
                  {scenario.assignmentExplanation}
                </p>
              </div>
            </JourneyStage>

            <JourneyConnector className="hidden lg:flex" />
            <JourneyConnector className="flex lg:hidden" vertical />

            <JourneyStage step="03" title="Team workload" icon={Inbox}>
              <div data-journey-panel className="flex min-h-0 flex-1 flex-col">
                <p className="text-[11px] font-semibold tracking-[0.14em] text-muted uppercase">
                  {scenario.workloadLabel}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {scenario.workloadDescription}
                </p>
                <div
                  data-workload-row
                  className="mt-4 rounded-xl border border-border bg-surface-muted/70 px-3.5 py-3 transition-[box-shadow]"
                >
                  <p className="font-heading text-sm font-semibold">
                    {scenario.workloadSummary}
                  </p>
                  <p className="mt-1 text-[11px] text-muted">
                    {solutionsJourneySection.workloadStatus}
                  </p>
                </div>
                <p className="mt-auto pt-3 text-[11px] font-medium tracking-wide text-muted">
                  {solutionsJourneySection.workloadScope}
                </p>
              </div>
            </JourneyStage>
          </div>
        </Container>
      </section>

      <section className="scroll-mt-28 overflow-x-clip py-16 sm:py-20 lg:py-24">
        <Container>
          <SectionHeading
            title={solutionsGallerySection.title}
            description={solutionsGallerySection.description}
            className="mb-8 max-w-3xl"
          />

          <ul className="divide-y divide-border overflow-hidden rounded-[var(--radius-workspace)] border border-border bg-surface shadow-[var(--shadow-soft)]">
            {solutionsScenarios.map((item) => {
              const active = selectedId === item.id;
              return (
                <li key={item.id}>
                  <div
                    className={cn(
                      "relative flex flex-col gap-4 px-4 py-5 transition-[background-color] sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:px-6",
                      active && "bg-accent-soft/35",
                    )}
                  >
                    {active ? (
                      <span
                        className="absolute inset-y-0 left-0 w-1 bg-accent"
                        aria-hidden
                      />
                    ) : null}

                    <div className="min-w-0 flex-1">
                      <p className="text-[11px] font-semibold tracking-[0.14em] text-accent uppercase">
                        {item.galleryCategory}
                      </p>
                      <p className="mt-2 font-heading text-lg leading-snug font-semibold text-pretty sm:text-xl">
                        “{item.galleryQuote}”
                      </p>
                      <div className="mt-2 flex flex-wrap items-center gap-2">
                        <p className="text-sm text-muted">{item.industry}</p>
                        {active ? (
                          <span className="inline-flex items-center rounded-full bg-accent-soft px-2 py-0.5 text-[10px] font-semibold tracking-wide text-accent">
                            Viewing now
                          </span>
                        ) : null}
                      </div>
                    </div>

                    <button
                      type="button"
                      aria-current={active ? "true" : undefined}
                      aria-label={`${solutionsGallerySection.actionLabel}: ${item.galleryCategory}`}
                      onClick={() =>
                        selectIndustry(item.id, {
                          scrollToJourney: true,
                          announce: true,
                        })
                      }
                      className={cn(
                        "inline-flex h-11 w-full shrink-0 items-center justify-center gap-2 rounded-[var(--radius-control)] border px-4 text-sm font-medium transition-[background-color,border-color,color] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:w-[12.5rem]",
                        active
                          ? "border-accent/40 bg-accent text-accent-foreground"
                          : "border-border bg-surface-muted/50 text-foreground hover:border-accent/35 hover:bg-accent-soft",
                      )}
                    >
                      {solutionsGallerySection.actionLabel}
                      <ArrowUp className="size-4" aria-hidden />
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        </Container>
      </section>
    </>
  );
}

function JourneyStage({
  step,
  title,
  icon: Icon,
  children,
}: {
  step: string;
  title: string;
  icon: typeof Inbox;
  children: React.ReactNode;
}) {
  return (
    <article
      data-journey-stage
      className="flex h-full min-h-[14rem] flex-col rounded-[var(--radius-card)] border border-border bg-surface p-4 shadow-[var(--shadow-soft)] sm:p-5"
    >
      <div className="mb-4 flex shrink-0 items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2">
          <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-accent-soft text-accent">
            <Icon className="size-4" aria-hidden />
          </span>
          <h4 className="font-heading text-sm font-semibold">{title}</h4>
        </div>
        <span className="shrink-0 font-mono text-[10px] tracking-[0.16em] text-muted">
          {step}
        </span>
      </div>
      <div className="flex min-h-0 flex-1 flex-col">{children}</div>
    </article>
  );
}

function JourneyConnector({
  vertical,
  className,
}: {
  vertical?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "items-center justify-center text-accent",
        vertical ? "h-10" : "w-10",
        className,
      )}
      aria-hidden
    >
      {vertical ? (
        <svg width="16" height="40" viewBox="0 0 16 40" className="overflow-visible">
          <path
            data-journey-connector
            d="M8 2 V28"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            data-journey-arrow
            d="M4 26 L8 32 L12 26"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ) : (
        <svg width="40" height="16" viewBox="0 0 40 16" className="overflow-visible">
          <path
            data-journey-connector
            d="M2 8 H28"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            data-journey-arrow
            d="M26 4 L32 8 L26 12"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </div>
  );
}
