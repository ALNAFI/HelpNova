"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, CircleDot, StickyNote, Users } from "lucide-react";
import { automationHomeHandoff } from "@/data/marketing/home-automation";
import { cn } from "@/utils/cn";

export function AutomationHandoff() {
  const [stageId, setStageId] = useState<string>(
    automationHomeHandoff.stages[0].id,
  );
  const stage =
    automationHomeHandoff.stages.find((item) => item.id === stageId) ??
    automationHomeHandoff.stages[0];

  return (
    <section
      id={automationHomeHandoff.id}
      className="au-section border-y border-border bg-surface-muted/35 py-20 sm:py-28"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <p className="au-eyebrow">From Automation to Human Connection</p>
          <h2 className="mt-3 font-heading text-[2rem] font-semibold tracking-tight text-balance sm:text-[2.6rem]">
            {automationHomeHandoff.title}
          </h2>
          <p className="mt-4 text-base leading-7 text-muted">
            {automationHomeHandoff.description}
          </p>
        </div>

        <div
          role="tablist"
          aria-label="Handoff stages"
          className="mt-8 flex flex-wrap gap-2"
        >
          {automationHomeHandoff.stages.map((item) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={stageId === item.id}
              onClick={() => setStageId(item.id)}
              className={cn(
                "rounded-full border px-3.5 py-2 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                stageId === item.id
                  ? "border-accent/40 bg-accent text-accent-foreground"
                  : "border-border bg-surface text-muted",
              )}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-[minmax(0,0.95fr)_auto_minmax(0,1.05fr)] lg:items-center">
          <div className="au-panel rounded-[1.5rem] p-5">
            <p className="text-[11px] font-semibold tracking-[0.14em] text-muted uppercase">
              Automation
            </p>
            <ol className="mt-4 space-y-3">
              {["Inquiry enters", "Order topic recognized", "Orders destination"].map(
                (step, index) => (
                  <li
                    key={step}
                    className={cn(
                      "rounded-xl border px-3 py-2 text-sm",
                      index <=
                        automationHomeHandoff.stages.findIndex(
                          (s) => s.id === stageId,
                        )
                        ? "border-accent/35 bg-accent/10"
                        : "border-border bg-surface-muted/50 text-muted",
                    )}
                  >
                    {step}
                  </li>
                ),
              )}
            </ol>
            <p className="mt-4 text-sm text-muted">{stage.detail}</p>
          </div>

          <div className="hidden justify-center lg:flex" aria-hidden>
            <div className="h-px w-16 bg-gradient-to-r from-accent to-[var(--au-cyan)]" />
          </div>

          <article className="overflow-hidden rounded-[1.5rem] border border-border bg-surface shadow-[var(--shadow-soft)]">
            <header className="flex items-start justify-between gap-3 border-b border-border px-4 py-3.5">
              <div>
                <p className="font-heading text-sm font-semibold">
                  {automationHomeHandoff.customer}
                </p>
                <p className="text-sm text-muted">
                  {automationHomeHandoff.subject}
                </p>
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/15 px-2.5 py-1 text-[11px] font-semibold text-emerald-700 dark:text-emerald-300">
                <CircleDot className="size-3" aria-hidden />
                Open
              </span>
            </header>
            <div className="space-y-3 p-4">
              <div className="rounded-2xl border border-border bg-surface-muted/70 px-3.5 py-3 text-sm">
                {automationHomeHandoff.message}
              </div>
              <div className="flex items-center gap-2 rounded-xl border border-border bg-surface-muted/60 px-3 py-2 text-xs">
                <Users className="size-3.5 text-accent" aria-hidden />
                {automationHomeHandoff.assignment}
              </div>
              <div className="rounded-2xl border border-accent/30 bg-accent/10 px-3.5 py-3">
                <p className="inline-flex items-center gap-1.5 text-[10px] font-semibold tracking-wide text-accent uppercase">
                  <StickyNote className="size-3" aria-hidden />
                  Internal note · Team only
                </p>
                <p className="mt-1.5 text-sm leading-relaxed">
                  {automationHomeHandoff.note}
                </p>
              </div>
            </div>
          </article>
        </div>

        <Link
          href={automationHomeHandoff.cta.href}
          className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-accent transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          {automationHomeHandoff.cta.label}
          <ArrowRight className="size-3.5" />
        </Link>
      </div>
    </section>
  );
}
