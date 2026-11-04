"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Container } from "@/components/ui/container";
import {
  aboutMissionConcepts,
  aboutPageCopy,
} from "@/data/marketing/about";
import { getGsap } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { cn } from "@/utils/cn";

export function AboutMission() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelId = useId();
  const [activeId, setActiveId] = useState<(typeof aboutMissionConcepts)[number]["id"]>(
    aboutMissionConcepts[0].id,
  );
  const reducedMotion = usePrefersReducedMotion();
  const active =
    aboutMissionConcepts.find((item) => item.id === activeId) ??
    aboutMissionConcepts[0];

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || reducedMotion) return;
    const { gsap } = getGsap();
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-mission-reveal]",
        { y: 18, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.6,
          stagger: 0.07,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 80%" },
        },
      );
    }, el);
    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      ref={sectionRef}
      className="relative py-16 sm:py-20"
      aria-labelledby="about-mission-heading"
    >
      <Container>
        <div className="max-w-2xl" data-mission-reveal>
          <p className="text-xs font-semibold tracking-[0.16em] text-accent uppercase">
            {aboutPageCopy.missionEyebrow}
          </p>
          <h2
            id="about-mission-heading"
            className="mt-3 font-heading text-[1.85rem] font-semibold tracking-tight text-balance sm:text-[2.35rem]"
          >
            {aboutPageCopy.missionTitle}
          </h2>
          <p className="mt-4 text-base leading-7 text-muted">
            {aboutPageCopy.missionStatement}
          </p>
        </div>

        <div
          data-mission-reveal
          className="mt-10 overflow-hidden rounded-[1.75rem] border border-border bg-surface shadow-[var(--shadow-soft)]"
        >
          <div className="grid lg:grid-cols-[16rem_minmax(0,1fr)]">
            <div
              role="tablist"
              aria-labelledby={labelId}
              className="flex gap-2 overflow-x-auto border-b border-border p-3 lg:flex-col lg:overflow-visible lg:border-r lg:border-b-0 lg:p-4"
            >
              <span id={labelId} className="sr-only">
                Mission concepts
              </span>
              {aboutMissionConcepts.map((concept) => {
                const selected = concept.id === activeId;
                return (
                  <button
                    key={concept.id}
                    type="button"
                    role="tab"
                    aria-selected={selected}
                    onClick={() => setActiveId(concept.id)}
                    className={cn(
                      "min-w-[9.5rem] rounded-2xl px-4 py-3 text-left text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring lg:min-w-0",
                      selected
                        ? "bg-accent text-accent-foreground"
                        : "bg-surface-muted/50 text-muted hover:bg-surface-muted hover:text-foreground",
                    )}
                  >
                    {concept.label}
                  </button>
                );
              })}
            </div>

            <div className="grid gap-6 p-5 sm:p-7 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
              <MissionPreview activeId={activeId} />
              <div className="flex flex-col justify-center">
                <p className="text-[11px] font-semibold tracking-[0.16em] text-accent uppercase">
                  {active.label}
                </p>
                <h3 className="mt-2 font-heading text-2xl font-semibold tracking-tight">
                  {active.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-muted sm:text-[0.98rem]">
                  {active.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function MissionPreview({ activeId }: { activeId: string }) {
  return (
    <div className="relative min-h-[16rem] overflow-hidden rounded-[1.35rem] border border-border bg-[linear-gradient(160deg,var(--accent-soft),var(--surface)_48%,var(--surface-muted))] p-5">
      <svg viewBox="0 0 320 220" className="absolute inset-0 size-full opacity-80" aria-hidden>
        <path
          d="M160 110 L70 60 M160 110 L250 60 M160 110 L70 170 M160 110 L250 170"
          stroke="var(--accent)"
          strokeOpacity="0.28"
          strokeWidth="1.5"
        />
        {(
          [
            ["conversations", 70, 60],
            ["workflows", 250, 60],
            ["context", 70, 170],
            ["insights", 250, 170],
          ] as const
        ).map(([id, x, y]) => {
          const active = id === activeId;
          return (
            <g key={id}>
              <circle
                cx={x}
                cy={y}
                r={active ? 18 : 12}
                fill={active ? "var(--accent)" : "var(--surface)"}
                stroke="var(--accent)"
                strokeOpacity={active ? 1 : 0.35}
              />
              {active ? (
                <circle
                  cx={x}
                  cy={y}
                  r="28"
                  fill="none"
                  stroke="var(--accent)"
                  strokeOpacity="0.25"
                />
              ) : null}
            </g>
          );
        })}
        <rect
          x="118"
          y="78"
          width="84"
          height="64"
          rx="16"
          fill="var(--surface)"
          stroke="var(--accent)"
          strokeOpacity="0.35"
        />
        <path
          d="M136 100 H184 M136 112 H170 M136 124 H158"
          stroke="var(--foreground)"
          strokeOpacity="0.35"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
      <div className="relative rounded-2xl border border-border/80 bg-surface/90 p-4 shadow-[var(--shadow-soft)] backdrop-blur-sm">
        <p className="text-[11px] font-semibold tracking-[0.14em] text-muted uppercase">
          Concept canvas
        </p>
        <p className="mt-2 text-sm font-medium text-foreground">
          Conversations, workflows, context, and insights share one illustrative language.
        </p>
      </div>
    </div>
  );
}
