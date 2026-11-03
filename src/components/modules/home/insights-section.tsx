"use client";

import { useEffect, useRef } from "react";
import { Reveal } from "@/components/common/reveal";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import {
  insightMetrics,
  volumeTrend,
  workloadByTeam,
} from "@/data/marketing/home";
import { getGsap } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

export function InsightsSection() {
  const chartRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const chart = chartRef.current;
    if (!chart || reducedMotion) return;
    const { gsap } = getGsap();
    const ctx = gsap.context(() => {
      gsap.from("[data-metric]", {
        y: 18,
        autoAlpha: 0,
        stagger: 0.08,
        duration: 0.55,
        ease: "power2.out",
        scrollTrigger: { trigger: chart, start: "top 80%" },
      });
      gsap.from("[data-bar]", {
        scaleY: 0,
        transformOrigin: "bottom",
        duration: 0.7,
        stagger: 0.06,
        ease: "power2.out",
        scrollTrigger: { trigger: chart, start: "top 75%" },
      });
      gsap.from("[data-workload]", {
        width: 0,
        duration: 0.8,
        stagger: 0.08,
        ease: "power2.out",
        scrollTrigger: { trigger: chart, start: "top 70%" },
      });
    }, chart);
    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      id="insights"
      className="scroll-mt-28 bg-workspace py-16 text-workspace-text sm:py-20 lg:py-24"
    >
      <Container>
        <Reveal>
          <SectionHeading
            tone="inverse"
            align="center"
            eyebrow="Insights & analytics"
            title="See support rhythm without drowning in noise"
            description="Sample KPIs, status mix, and team workload—presented as illustrative data for this concept experience."
            className="mb-12"
          />
        </Reveal>

        <div ref={chartRef} className="space-y-5">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {insightMetrics.map((metric) => (
              <article
                key={metric.id}
                data-metric
                className="rounded-[var(--radius-card)] border border-workspace-border bg-workspace-surface p-5"
              >
                <p className="text-xs text-workspace-muted">{metric.label}</p>
                <p className="mt-2 font-heading text-3xl font-semibold tracking-tight">
                  {metric.value}
                </p>
                <p className="mt-2 text-xs leading-5 text-workspace-muted">
                  {metric.hint}
                </p>
              </article>
            ))}
          </div>

          <div className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
            <article className="rounded-[var(--radius-workspace)] border border-workspace-border bg-workspace-surface p-5 sm:p-6">
              <div className="mb-6 flex items-end justify-between gap-3">
                <div>
                  <h3 className="font-heading text-lg font-semibold">
                    Sample weekly volume
                  </h3>
                  <p className="mt-1 text-sm text-workspace-muted">
                    Historical sample chart for storytelling—not live telemetry.
                  </p>
                </div>
                <span className="rounded-full bg-white/5 px-3 py-1 text-xs text-workspace-muted">
                  7-day sample
                </span>
              </div>
              <div className="flex h-48 items-end gap-2.5 sm:gap-3">
                {volumeTrend.map((point) => (
                  <div
                    key={point.day}
                    className="flex flex-1 flex-col items-center gap-2"
                  >
                    <div
                      data-bar
                      className="w-full rounded-t-xl bg-gradient-to-t from-accent/30 via-accent/70 to-[#c4b5fd]"
                      style={{ height: `${(point.value / 28) * 100}%` }}
                    />
                    <span className="text-[11px] text-workspace-muted">
                      {point.day}
                    </span>
                  </div>
                ))}
              </div>
            </article>

            <article className="rounded-[var(--radius-workspace)] border border-workspace-border bg-workspace-surface p-5 sm:p-6">
              <h3 className="font-heading text-lg font-semibold">
                Open workload by team
              </h3>
              <ul className="mt-5 space-y-4">
                {workloadByTeam.map((row) => (
                  <li key={row.team}>
                    <div className="mb-1.5 flex items-center justify-between text-sm">
                      <span>{row.team}</span>
                      <span className="text-workspace-muted">{row.open} open</span>
                    </div>
                    <div className="h-2.5 overflow-hidden rounded-full bg-white/5">
                      <div
                        data-workload
                        className="h-full rounded-full bg-accent"
                        style={{ width: `${(row.open / 11) * 100}%` }}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </div>
      </Container>
    </section>
  );
}
