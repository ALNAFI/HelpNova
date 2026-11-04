"use client";

import { useState } from "react";
import { automationHomeOutcomes } from "@/data/marketing/home-automation";
import { cn } from "@/utils/cn";

export function AutomationOutcomes() {
  const [view, setView] = useState<"fragmented" | "connected">("fragmented");

  return (
    <section
      id={automationHomeOutcomes.id}
      className="au-section border-y border-border bg-surface-muted/35 py-20 sm:py-28"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <p className="au-eyebrow">From Complexity to Clarity</p>
          <h2 className="mt-3 font-heading text-[2rem] font-semibold tracking-tight text-balance sm:text-[2.6rem]">
            {automationHomeOutcomes.title}
          </h2>
          <p className="mt-4 text-base leading-7 text-muted">
            {automationHomeOutcomes.description}
          </p>
        </div>

        <div
          role="radiogroup"
          aria-label="Workflow comparison"
          className="mt-8 inline-flex rounded-full border border-border bg-surface p-1"
        >
          {(
            [
              ["fragmented", automationHomeOutcomes.fragmentedLabel],
              ["connected", automationHomeOutcomes.connectedLabel],
            ] as const
          ).map(([id, label]) => (
            <button
              key={id}
              type="button"
              role="radio"
              aria-checked={view === id}
              onClick={() => setView(id)}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                view === id
                  ? "bg-accent text-accent-foreground"
                  : "text-muted hover:text-foreground",
              )}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)]">
          <div className="au-panel min-h-[14rem] rounded-[1.5rem] p-5">
            {view === "fragmented" ? (
              <div className="space-y-3">
                <div className="rounded-xl border border-dashed border-border px-3 py-2 text-sm text-muted">
                  Disconnected inquiry
                </div>
                <div className="ml-8 rounded-xl border border-dashed border-border px-3 py-2 text-sm text-muted">
                  Unclear ownership
                </div>
                <div className="ml-4 rounded-xl border border-dashed border-border px-3 py-2 text-sm text-muted">
                  Separate context fragments
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="rounded-xl border border-accent/35 bg-accent/10 px-3 py-2 text-sm">
                  Connected inquiry · Order Tracking
                </div>
                <div className="rounded-xl border border-accent/35 bg-accent/10 px-3 py-2 text-sm">
                  Visible assignment · Orders
                </div>
                <div className="rounded-xl border border-accent/35 bg-accent/10 px-3 py-2 text-sm">
                  Shared context · clear next step
                </div>
              </div>
            )}
          </div>

          <div className="grid gap-3">
            {automationHomeOutcomes.outcomes.map((outcome) => (
              <div
                key={outcome.id}
                className="rounded-[1.25rem] border border-border bg-surface p-4"
              >
                <h3 className="font-heading text-base font-semibold">
                  {outcome.title}
                </h3>
                <p className="mt-1.5 text-sm text-muted">{outcome.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
