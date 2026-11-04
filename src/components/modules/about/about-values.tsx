"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Container } from "@/components/ui/container";
import { aboutPageCopy, aboutValues } from "@/data/marketing/about";
import { getGsap } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { cn } from "@/utils/cn";

export function AboutValues() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelId = useId();
  const [activeId, setActiveId] = useState<(typeof aboutValues)[number]["id"]>(
    aboutValues[0].id,
  );
  const reducedMotion = usePrefersReducedMotion();
  const active =
    aboutValues.find((value) => value.id === activeId) ?? aboutValues[0];
  const activeIndex = aboutValues.findIndex((value) => value.id === activeId);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || reducedMotion) return;
    const { gsap } = getGsap();
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-values-reveal]",
        { y: 18, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.6,
          stagger: 0.08,
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
      aria-labelledby="about-values-heading"
    >
      <Container>
        <div className="max-w-2xl" data-values-reveal>
          <p className="text-xs font-semibold tracking-[0.16em] text-accent uppercase">
            {aboutPageCopy.valuesEyebrow}
          </p>
          <h2
            id="about-values-heading"
            className="mt-3 font-heading text-[1.85rem] font-semibold tracking-tight text-balance sm:text-[2.35rem]"
          >
            {aboutPageCopy.valuesTitle}
          </h2>
        </div>

        <div
          data-values-reveal
          className="mt-10 grid gap-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-10"
        >
          <div
            role="tablist"
            aria-labelledby={labelId}
            className="space-y-3"
          >
            <span id={labelId} className="sr-only">
              Core values
            </span>
            {aboutValues.map((value) => {
              const selected = value.id === activeId;
              return (
                <button
                  key={value.id}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  onClick={() => setActiveId(value.id)}
                  className={cn(
                    "group w-full rounded-[1.35rem] border px-5 py-4 text-left transition-[border-color,background-color,transform] duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:px-6 sm:py-5",
                    selected
                      ? "border-accent/40 bg-accent-soft/50 shadow-[var(--shadow-soft)]"
                      : "border-border bg-surface hover:border-accent/25",
                  )}
                >
                  <div className="flex items-baseline justify-between gap-4">
                    <span className="font-mono text-[11px] tracking-wide text-accent">
                      {value.number}
                    </span>
                    <span
                      className={cn(
                        "h-1 flex-1 rounded-full bg-border transition-colors",
                        selected && "bg-accent/50",
                      )}
                      aria-hidden
                    />
                  </div>
                  <p
                    className={cn(
                      "mt-3 font-heading text-3xl font-semibold tracking-tight transition-colors sm:text-4xl",
                      selected ? "text-foreground" : "text-muted",
                    )}
                  >
                    {value.title}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-muted">
                    {value.description}
                  </p>
                </button>
              );
            })}
          </div>

          <div className="overflow-hidden rounded-[1.75rem] border border-border bg-surface p-5 shadow-[var(--shadow-soft)] sm:p-7">
            <div
              className="mb-5 h-1 overflow-hidden rounded-full bg-border"
              aria-hidden
            >
              <div
                className="h-full rounded-full bg-accent transition-[width] duration-500 ease-out"
                style={{
                  width: `${((activeIndex + 1) / aboutValues.length) * 100}%`,
                }}
              />
            </div>
            <ValueArtwork valueId={active.id} />
            <h3 className="mt-6 font-heading text-2xl font-semibold tracking-tight">
              {active.title}
            </h3>
            <p className="mt-3 text-sm leading-7 text-muted sm:text-[0.98rem]">
              {active.detail}
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}

function ValueArtwork({ valueId }: { valueId: string }) {
  if (valueId === "ownership") {
    return (
      <svg viewBox="0 0 420 220" className="w-full rounded-2xl bg-surface-muted/40" aria-hidden>
        <path d="M60 110 H160" stroke="var(--accent)" strokeWidth="2" />
        <path d="M160 110 H260" stroke="var(--accent)" strokeWidth="2" strokeOpacity="0.55" />
        <path d="M260 110 H360" stroke="var(--accent)" strokeWidth="2" strokeOpacity="0.3" />
        <circle cx="60" cy="110" r="14" fill="var(--accent)" />
        <circle cx="160" cy="110" r="14" fill="var(--accent-soft)" stroke="var(--accent)" />
        <circle cx="260" cy="110" r="14" fill="var(--surface)" stroke="var(--accent)" />
        <circle cx="360" cy="110" r="14" fill="var(--surface)" stroke="var(--border-strong)" />
        <path d="M250 70 H300 V95 H250 Z" fill="var(--accent-soft)" stroke="var(--accent)" />
      </svg>
    );
  }

  if (valueId === "consideration") {
    return (
      <svg viewBox="0 0 420 220" className="w-full rounded-2xl bg-surface-muted/40" aria-hidden>
        <circle cx="210" cy="110" r="54" fill="var(--accent-soft)" />
        <circle cx="210" cy="110" r="28" fill="var(--accent)" fillOpacity="0.85" />
        <circle cx="140" cy="78" r="16" fill="var(--surface)" stroke="var(--accent)" />
        <circle cx="286" cy="78" r="16" fill="var(--surface)" stroke="var(--accent)" />
        <circle cx="140" cy="148" r="16" fill="var(--surface)" stroke="var(--accent)" />
        <circle cx="286" cy="148" r="16" fill="var(--surface)" stroke="var(--accent)" />
        <path
          d="M154 84 L188 100 M266 84 L232 100 M154 142 L188 124 M266 142 L232 124"
          stroke="var(--accent)"
          strokeOpacity="0.45"
          strokeWidth="1.5"
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 420 220" className="w-full rounded-2xl bg-surface-muted/40" aria-hidden>
      <rect x="70" y="48" width="280" height="36" rx="10" fill="var(--accent-soft)" />
      <rect x="90" y="98" width="240" height="28" rx="8" fill="var(--accent)" fillOpacity="0.55" />
      <rect x="110" y="140" width="200" height="24" rx="8" fill="var(--surface)" stroke="var(--accent)" strokeOpacity="0.4" />
      <path d="M70 48 V164 M350 48 V164" stroke="var(--accent)" strokeOpacity="0.2" strokeDasharray="4 6" />
    </svg>
  );
}
