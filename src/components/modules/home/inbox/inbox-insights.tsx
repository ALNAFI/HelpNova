"use client";

import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { inboxHomeInsights } from "@/data/marketing/home-inbox";

export function InboxInsights() {
  const maxOpen = Math.max(
    ...inboxHomeInsights.workload.map((item) => item.open),
  );

  return (
    <section id={inboxHomeInsights.id} className="ih-section py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <p className="ih-eyebrow">{inboxHomeInsights.eyebrow}</p>
          <h2 className="mt-3 font-heading text-[2rem] font-semibold tracking-tight text-balance sm:text-[2.6rem]">
            {inboxHomeInsights.title}
          </h2>
          <p className="mt-4 text-base leading-7 text-muted">
            {inboxHomeInsights.description}
          </p>
        </div>

        <div className="mt-10 grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            {inboxHomeInsights.status.map((item) => (
              <div
                key={item.id}
                className="rounded-[1.4rem] border border-border bg-surface p-5 shadow-[var(--shadow-soft)]"
              >
                <p className="text-xs font-semibold tracking-[0.14em] text-muted uppercase">
                  {item.label}
                </p>
                <p className="mt-2 font-heading text-4xl font-semibold text-accent">
                  {item.value}
                </p>
                <p className="mt-2 text-sm text-muted">
                  Illustrative conversation count
                </p>
              </div>
            ))}
            <div className="rounded-[1.4rem] border border-border bg-[linear-gradient(160deg,color-mix(in_oklab,var(--accent)_12%,var(--surface)),var(--surface))] p-5">
              <p className="text-xs font-semibold tracking-[0.14em] text-muted uppercase">
                {inboxHomeInsights.resolutionSummary.title}
              </p>
              <p className="mt-2 font-heading text-2xl font-semibold">
                {inboxHomeInsights.resolutionSummary.resolved}
                <span className="text-base font-medium text-muted">
                  {" "}
                  / {inboxHomeInsights.resolutionSummary.total}
                </span>
              </p>
              <p className="mt-2 text-sm text-accent">
                {inboxHomeInsights.resolutionSummary.rateLabel}
              </p>
              <p className="mt-2 text-xs text-muted">
                {inboxHomeInsights.resolutionSummary.note}
              </p>
            </div>
          </div>

          <div className="rounded-[1.6rem] border border-border bg-surface p-5 shadow-[var(--shadow-soft)] sm:p-6">
            <p className="font-heading text-xl font-semibold">
              Open workload by team
            </p>
            <p className="mt-1 text-sm text-muted">
              Fixed fictional sample for storytelling.
            </p>
            <ul className="mt-6 space-y-4" aria-label="Team workload chart">
              {inboxHomeInsights.workload.map((item) => (
                <li key={item.team}>
                  <div className="mb-1.5 flex items-center justify-between gap-3 text-sm">
                    <span className="font-medium">{item.team}</span>
                    <span className="text-muted">{item.open} open</span>
                  </div>
                  <div className="h-2.5 overflow-hidden rounded-full bg-surface-muted">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-accent to-[var(--ih-cyan)]"
                      style={{ width: `${(item.open / maxOpen) * 100}%` }}
                    />
                  </div>
                </li>
              ))}
            </ul>
            <Button href={inboxHomeInsights.cta.href} className="mt-8">
              {inboxHomeInsights.cta.label}
              <ArrowRight className="size-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
