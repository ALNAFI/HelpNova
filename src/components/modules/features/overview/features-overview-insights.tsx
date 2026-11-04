"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, CircleDot } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import {
  featuresOverviewInsights,
  featuresOverviewOrder,
  type FeaturesInsightsSnapshotId,
} from "@/data/marketing/features-overview";
import { getGsap } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { cn } from "@/utils/cn";

export function FeaturesOverviewInsights() {
  const [snapshotId, setSnapshotId] =
    useState<FeaturesInsightsSnapshotId>("open");
  const snapshot = featuresOverviewInsights.snapshots[snapshotId];
  const reducedMotion = usePrefersReducedMotion();
  const barRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<{ kill: () => void } | null>(null);
  const liveRef = useRef<HTMLParagraphElement>(null);
  const groupId = useId();

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    timelineRef.current?.kill();
    timelineRef.current = null;

    const fill = bar.querySelector<HTMLElement>("[data-workload-fill]");
    if (!fill) return;

    const width = `${snapshot.openCount * 100}%`;

    if (reducedMotion) {
      fill.style.width = width;
      return;
    }

    const { gsap } = getGsap();
    const tl = gsap.timeline();
    timelineRef.current = tl;
    tl.to(fill, { width, duration: 0.35, ease: "power2.out" });

    return () => {
      timelineRef.current?.kill();
      timelineRef.current = null;
    };
  }, [snapshot.openCount, reducedMotion]);

  function selectSnapshot(id: FeaturesInsightsSnapshotId) {
    setSnapshotId(id);
    const next = featuresOverviewInsights.snapshots[id];
    if (liveRef.current) {
      liveRef.current.textContent = `${next.status}. Orders open workload ${next.openCount}. Resolved ${next.resolvedCount}.`;
    }
  }

  return (
    <section
      id={featuresOverviewInsights.id}
      className="scroll-mt-28 py-16 sm:py-20 lg:py-24"
    >
      <p
        ref={liveRef}
        className="sr-only"
        aria-live="polite"
        aria-atomic="true"
      />

      <Container>
        <SectionHeading
          title={featuresOverviewInsights.title}
          className="mb-8 max-w-3xl"
        />

        <div className="rounded-[var(--radius-workspace)] border border-border bg-surface p-4 shadow-[var(--shadow-soft)] sm:p-6">
          <div className="flex flex-wrap items-start justify-between gap-3 border-b border-border pb-4">
            <div>
              <p className="font-heading text-base font-semibold">
                {featuresOverviewOrder.subject}
              </p>
              <p className="mt-1 text-sm text-muted">
                Owner · {snapshot.owner}
              </p>
            </div>
            <StatusBadge status={snapshot.status} />
          </div>

          <div
            role="radiogroup"
            aria-label="Conversation snapshot"
            className="mt-4 flex flex-wrap gap-2"
          >
            {(
              Object.values(featuresOverviewInsights.snapshots) as Array<
                (typeof featuresOverviewInsights.snapshots)["open"]
              >
            ).map((item) => {
              const active = snapshotId === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  role="radio"
                  aria-checked={active}
                  id={`${groupId}-${item.id}`}
                  onClick={() => selectSnapshot(item.id)}
                  className={cn(
                    "rounded-full border px-3.5 py-2 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    active
                      ? "border-accent/40 bg-accent text-accent-foreground"
                      : "border-border bg-surface-muted/50 text-muted hover:text-foreground",
                  )}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          <div className="mt-6 rounded-xl border border-border bg-surface-muted/50 p-4">
            <p className="text-[10px] font-semibold tracking-[0.14em] text-muted uppercase">
              {featuresOverviewInsights.sampleLabel}
            </p>

            <div className="mt-4">
              <div className="mb-2 flex items-end justify-between gap-3">
                <p className="text-sm font-medium">Orders open workload</p>
                <p className="font-mono text-sm font-semibold">
                  {snapshot.openCount} / 1
                </p>
              </div>
              <div
                ref={barRef}
                className="h-3 overflow-hidden rounded-full bg-border/70"
                role="img"
                aria-label={`Orders open workload ${snapshot.openCount} of 1`}
              >
                <div
                  data-workload-fill
                  className="h-full rounded-full bg-accent"
                  style={{ width: `${snapshot.openCount * 100}%` }}
                />
              </div>
            </div>

            <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
              <div>
                <dt className="text-[11px] font-semibold tracking-[0.14em] text-muted uppercase">
                  Open items
                </dt>
                <dd className="mt-1 font-heading text-lg font-semibold">
                  {snapshot.openCount}
                </dd>
              </div>
              <div>
                <dt className="text-[11px] font-semibold tracking-[0.14em] text-muted uppercase">
                  Resolved items
                </dt>
                <dd className="mt-1 font-heading text-lg font-semibold">
                  {snapshot.resolvedCount}
                </dd>
              </div>
            </dl>

            <p className="mt-4 text-sm leading-relaxed text-muted text-pretty">
              {snapshotId === "open"
                ? featuresOverviewInsights.openExplanation
                : featuresOverviewInsights.resolvedExplanation}
            </p>
          </div>
        </div>

        <Link
          href={featuresOverviewInsights.href}
          className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-accent transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          {featuresOverviewInsights.linkLabel}
          <ArrowRight className="size-3.5" />
        </Link>
      </Container>
    </section>
  );
}

function StatusBadge({ status }: { status: "Open" | "Resolved" }) {
  const open = status === "Open";
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold",
        open
          ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300"
          : "bg-sky-500/15 text-sky-700 dark:text-sky-300",
      )}
    >
      {open ? (
        <CircleDot className="size-3" aria-hidden />
      ) : (
        <CheckCircle2 className="size-3" aria-hidden />
      )}
      {status}
    </span>
  );
}
