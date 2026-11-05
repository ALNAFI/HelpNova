"use client";

import { useId, useState } from "react";
import {
  CheckCircle2,
  ChevronDown,
  GitBranch,
  Inbox,
  ShieldAlert,
} from "lucide-react";
import { ruleLabels, topicLabels } from "@/data/demo/seed";
import type { SimulationResult } from "@/types/demo";
import { cn } from "@/utils/cn";

type SimulationResultPanelProps = {
  simulation: SimulationResult | null;
  isStale?: boolean;
  onViewConversation?: (conversationId: string) => void;
};

export function SimulationResultPanel({
  simulation,
  isStale = false,
  onViewConversation,
}: SimulationResultPanelProps) {
  const traceId = useId();
  const [traceOpen, setTraceOpen] = useState(false);

  if (!simulation) {
    return (
      <div className="rounded-xl border border-dashed border-[var(--demo-border)] bg-[var(--demo-panel)]/60 px-4 py-3.5 text-[13px] text-[var(--demo-muted)] sm:text-sm">
        Run Simulation to see the matched or no-match outcome and routing steps.
      </div>
    );
  }

  return (
    <div
      data-result-panel
      className={cn(
        "rounded-xl border border-[var(--demo-border)] bg-[var(--demo-panel)]/80 p-3.5 sm:p-4",
        isStale && "border-dashed",
      )}
    >
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div className="flex min-w-0 items-start gap-2.5">
          <span
            className={cn(
              "mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg",
              simulation.matched
                ? "bg-accent/15 text-accent"
                : "bg-amber-500/15 text-amber-700 dark:text-amber-300",
            )}
          >
            {simulation.matched ? (
              <CheckCircle2 className="size-4" />
            ) : (
              <ShieldAlert className="size-4" />
            )}
          </span>
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--demo-muted)]">
                {isStale ? "Previous run" : "Result"}
              </p>
              {isStale ? (
                <span className="rounded-md bg-amber-500/15 px-1.5 py-0.5 text-[11px] font-medium text-amber-800 dark:text-amber-200">
                  Run to update results
                </span>
              ) : null}
            </div>
            <p className="mt-1 text-[14px] font-semibold leading-snug sm:text-[15px]">
              Assigned to {simulation.destination}
            </p>
            <p className="mt-1 text-[12px] leading-relaxed text-[var(--demo-muted)] sm:text-[13px]">
              {simulation.explanation}
            </p>
          </div>
        </div>

        {onViewConversation ? (
          <button
            type="button"
            onClick={() => onViewConversation(simulation.conversationId)}
            className="inline-flex h-8 shrink-0 items-center gap-1.5 rounded-lg border border-[var(--demo-border)] bg-[var(--demo-panel)] px-2.5 text-[12px] font-medium transition hover:bg-[var(--demo-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent sm:text-[13px]"
          >
            <Inbox className="size-3.5" />
            View conversation
          </button>
        ) : null}
      </div>

      <dl className="mt-3 grid gap-2 sm:grid-cols-4">
        <Meta label="Inquiry" value={topicLabels[simulation.inquiry]} />
        <Meta label="Rule" value={ruleLabels[simulation.rule]} />
        <Meta
          label="Outcome"
          value={simulation.matched ? "Matched" : "No match"}
        />
        <Meta label="Team" value={simulation.destination} />
      </dl>

      <div className="mt-3 border-t border-[var(--demo-border)] pt-2.5">
        <button
          type="button"
          aria-expanded={traceOpen}
          aria-controls={traceId}
          onClick={() => setTraceOpen((open) => !open)}
          className="flex w-full items-center justify-between gap-2 rounded-lg px-1 py-1 text-left transition hover:bg-[var(--demo-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          <span className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-[var(--demo-text)] sm:text-[13px]">
            <GitBranch className="size-3.5 text-accent" />
            Routing steps
          </span>
          <ChevronDown
            className={cn(
              "size-4 text-[var(--demo-muted)] transition",
              traceOpen && "rotate-180",
            )}
          />
        </button>

        {traceOpen ? (
          <ol
            id={traceId}
            className="mt-2 space-y-1.5 px-1 text-[12px] leading-relaxed text-[var(--demo-muted)] sm:text-[13px]"
          >
            <li>
              1. New inquiry received — {topicLabels[simulation.inquiry]}
            </li>
            <li>
              2. Topic checked against {ruleLabels[simulation.rule]}
            </li>
            <li>
              3. Branch selected —{" "}
              <span className="font-medium text-[var(--demo-text)]">
                {simulation.matched ? "Matched" : "No match"}
              </span>
            </li>
            <li>
              4. Assigned to{" "}
              <span className="font-medium text-[var(--demo-text)]">
                {simulation.destination}
              </span>
            </li>
          </ol>
        ) : null}
      </div>
    </div>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-[var(--demo-border)] bg-[var(--demo-panel-2)]/70 px-2.5 py-2">
      <dt className="text-[10px] uppercase tracking-wide text-[var(--demo-muted)]">
        {label}
      </dt>
      <dd className="mt-0.5 truncate text-[12px] font-medium sm:text-[13px]">
        {value}
      </dd>
    </div>
  );
}
