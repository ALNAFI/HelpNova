"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Inbox,
  MessageSquareText,
  Users,
} from "lucide-react";
import { IndustryArtwork } from "@/components/modules/solutions/industry-artwork";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { routes } from "@/config/routes";
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

export function SolutionsExplorer() {
  const [selectedId, setSelectedId] =
    useState<SolutionsIndustryId>("ecommerce");
  const scenario = getSolutionsScenario(selectedId);
  const reducedMotion = usePrefersReducedMotion();
  const journeyRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const timelineRef = useRef<{ kill: () => void } | null>(null);
  const liveRef = useRef<HTMLParagraphElement>(null);
  const groupId = useId();

  useEffect(() => {
    const root = journeyRef.current;
    if (!root) return;

    timelineRef.current?.kill();
    timelineRef.current = null;

    const connectors = root.querySelectorAll<SVGPathElement>(
      "[data-journey-connector]",
    );
    const stamp = root.querySelector("[data-assignment-stamp]");
    const workload = root.querySelector("[data-workload-row]");

    if (reducedMotion) {
      connectors.forEach((path) => {
        path.style.strokeDasharray = "none";
        path.style.strokeDashoffset = "0";
        path.style.opacity = "1";
      });
      return;
    }

    const { gsap } = getGsap();
    const ctx = gsap.context(() => {
      connectors.forEach((path) => {
        const length = path.getTotalLength();
        gsap.set(path, {
          strokeDasharray: length,
          strokeDashoffset: length,
          opacity: 0.35,
        });
      });

      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
      timelineRef.current = tl;

      connectors.forEach((path, index) => {
        tl.to(
          path,
          { strokeDashoffset: 0, opacity: 1, duration: 0.4 },
          index === 0 ? 0 : "-=0.1",
        );
      });

      if (stamp) {
        tl.fromTo(
          stamp,
          { scale: 1.06, rotate: -5 },
          { scale: 1, rotate: -3, duration: 0.28 },
          "-=0.12",
        );
      }

      if (workload) {
        tl.fromTo(
          workload,
          {
            boxShadow: "0 0 0 0 transparent",
          },
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
    setSelectedId(id);
    const next = getSolutionsScenario(id);

    if (options?.announce && liveRef.current) {
      liveRef.current.textContent = `${next.industry} selected. ${next.topicLabel} assigned to ${next.team}.`;
    }

    if (options?.scrollToJourney) {
      const target = document.getElementById(solutionsJourneySection.id);
      target?.scrollIntoView({
        behavior: reducedMotion ? "auto" : "smooth",
        block: "start",
      });
      window.setTimeout(() => {
        headingRef.current?.focus({ preventScroll: true });
      }, reducedMotion ? 0 : 350);
    }
  }

  return (
    <>
      <p ref={liveRef} className="sr-only" aria-live="polite" aria-atomic="true" />

      <section
        id={solutionsIndustrySection.id}
        className="scroll-mt-28 py-16 sm:py-20 lg:py-24"
      >
        <Container>
          <SectionHeading
            title={solutionsIndustrySection.title}
            description={solutionsIndustrySection.description}
            className="mb-10 max-w-3xl"
          />

          <div
            role="radiogroup"
            aria-label="Industry"
            className="grid gap-4 md:grid-cols-3"
          >
            {solutionsScenarios.map((item) => {
              const active = selectedId === item.id;
              return (
                <div
                  key={item.id}
                  className={cn(
                    "flex h-full flex-col rounded-[var(--radius-workspace)] border bg-surface p-4 shadow-[var(--shadow-soft)] transition",
                    active
                      ? "border-accent/45 ring-1 ring-accent/25"
                      : "border-border",
                  )}
                >
                  <IndustryArtwork industry={item.id} active={active} />
                  <div className="mt-4 flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-heading text-lg font-semibold">
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

                  <div className="mt-5 space-y-2">
                    <label
                      className={cn(
                        "flex cursor-pointer items-center justify-center rounded-[var(--radius-control)] px-3 py-2.5 text-sm font-medium transition focus-within:outline-none focus-within:ring-2 focus-within:ring-ring",
                        active
                          ? "bg-accent text-accent-foreground"
                          : "border border-border bg-surface-muted/50 text-foreground hover:bg-surface-muted",
                      )}
                    >
                      <input
                        type="radio"
                        name={groupId}
                        value={item.id}
                        checked={active}
                        onChange={() =>
                          selectIndustry(item.id, { announce: true })
                        }
                        className="sr-only"
                      />
                      {item.selectionLabel}
                    </label>

                    {item.id === "ecommerce" ? (
                      <Link
                        href={routes.ecommerce.href}
                        className="inline-flex w-full items-center justify-center gap-1.5 rounded-[var(--radius-control)] px-3 py-2 text-sm font-medium text-accent transition hover:bg-accent-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      >
                        Explore ecommerce solution
                        <ArrowRight className="size-3.5" />
                      </Link>
                    ) : null}
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      <section
        id={solutionsJourneySection.id}
        className="scroll-mt-28 border-y border-border bg-surface-muted/35 py-16 sm:py-20 lg:py-24"
      >
        <Container>
          <div className="mb-8 flex flex-wrap items-end justify-between gap-3">
            <div className="max-w-3xl">
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
            <span className="rounded-full border border-border bg-surface px-3 py-1 font-mono text-[10px] tracking-[0.14em] text-muted uppercase">
              {solutionsJourneySection.sampleLabel}
            </span>
          </div>

          <div
            ref={journeyRef}
            className="grid gap-4 lg:grid-cols-[1fr_auto_1fr_auto_1fr] lg:items-stretch"
          >
            <JourneyStage
              step="01"
              title="Inquiry"
              icon={MessageSquareText}
            >
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
                <p className="mt-3 font-mono text-[11px] text-muted">
                  Ref · {scenario.reference}
                </p>
              ) : null}
            </JourneyStage>

            <JourneyConnector className="hidden lg:flex" />
            <JourneyConnector className="flex lg:hidden" vertical />

            <JourneyStage step="02" title="Assignment" icon={Users}>
              <div
                data-assignment-stamp
                className="inline-flex rotate-[-3deg] rounded-md border-2 border-accent/60 bg-accent/10 px-3 py-2"
              >
                <p className="font-mono text-[11px] font-bold tracking-[0.12em] text-accent uppercase">
                  Assigned to {scenario.team}
                </p>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-pretty text-muted">
                {scenario.assignmentExplanation}
              </p>
            </JourneyStage>

            <JourneyConnector className="hidden lg:flex" />
            <JourneyConnector className="flex lg:hidden" vertical />

            <JourneyStage step="03" title="Insight" icon={Inbox}>
              <p className="text-[11px] font-semibold tracking-[0.14em] text-muted uppercase">
                {scenario.insightLabel}
              </p>
              <p className="mt-2 text-sm text-muted">
                Where does this open conversation appear in the workload?
              </p>
              <div
                data-workload-row
                className="mt-4 rounded-xl border border-border bg-surface-muted/70 px-3.5 py-3 transition-[box-shadow]"
              >
                <p className="font-heading text-sm font-semibold">
                  {scenario.workloadSummary}
                </p>
                <p className="mt-1 text-[11px] text-muted">
                  Open · Assigned · Sample only
                </p>
              </div>
            </JourneyStage>
          </div>
        </Container>
      </section>

      <section className="scroll-mt-28 py-16 sm:py-20 lg:py-24">
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
                  <div className="flex flex-col gap-4 px-4 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
                    <div className="min-w-0">
                      <p className="text-[11px] font-semibold tracking-[0.14em] text-accent uppercase">
                        {item.topicLabel}
                      </p>
                      <p className="mt-2 font-heading text-lg leading-snug font-semibold text-pretty sm:text-xl">
                        “{item.galleryQuote}”
                      </p>
                      <p className="mt-1 text-sm text-muted">
                        {item.industry}
                        {active ? " · Currently in journey" : null}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        selectIndustry(item.id, {
                          scrollToJourney: true,
                          announce: true,
                        })
                      }
                      aria-label={`Trace this inquiry: ${item.topicLabel}`}
                      className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-[var(--radius-control)] border border-border bg-surface-muted/50 px-4 text-sm font-medium transition hover:border-accent/35 hover:bg-accent-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      Trace this inquiry
                      <ArrowRight className="size-4" />
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
    <article className="min-h-[14rem] rounded-[var(--radius-card)] border border-border bg-surface p-4 shadow-[var(--shadow-soft)] sm:p-5">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="flex size-8 items-center justify-center rounded-lg bg-accent-soft text-accent">
            <Icon className="size-4" aria-hidden />
          </span>
          <h4 className="font-heading text-sm font-semibold">{title}</h4>
        </div>
        <span className="font-mono text-[10px] tracking-[0.16em] text-muted">
          {step}
        </span>
      </div>
      {children}
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
        "items-center justify-center",
        vertical ? "h-8" : "w-8",
        className,
      )}
      aria-hidden
    >
      <svg
        width={vertical ? 4 : 32}
        height={vertical ? 32 : 4}
        className="overflow-visible"
      >
        <path
          data-journey-connector
          d={vertical ? "M2 0 V32" : "M0 2 H32"}
          fill="none"
          stroke="var(--accent)"
          strokeWidth="2"
          opacity="0.35"
        />
      </svg>
    </div>
  );
}
