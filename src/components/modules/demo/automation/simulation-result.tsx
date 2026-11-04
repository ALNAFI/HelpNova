"use client";

import { CheckCircle2, GitBranch, ShieldAlert } from "lucide-react";
import { ruleLabels, topicLabels } from "@/data/demo/seed";
import type { SimulationResult } from "@/types/demo";
import { cn } from "@/utils/cn";

type SimulationResultPanelProps = {
  simulation: SimulationResult | null;
};

export function SimulationResultPanel({
  simulation,
}: SimulationResultPanelProps) {
  if (!simulation) {
    return (
      <div className="rounded-2xl border border-dashed border-[var(--demo-border)] bg-[var(--demo-panel)]/60 p-4 text-sm text-[var(--demo-muted)]">
        Run a simulation to see the matched or otherwise outcome and execution
        trace.
      </div>
    );
  }

  return (
    <div
      data-result-panel
      className={cn(
        "rounded-2xl border p-4",
        simulation.matched
          ? "border-emerald-500/30 bg-emerald-500/10"
          : "border-amber-500/30 bg-amber-500/10",
      )}
    >
      <div className="flex items-start gap-3">
        <span
          className={cn(
            "flex size-10 items-center justify-center rounded-xl",
            simulation.matched
              ? "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300"
              : "bg-amber-500/20 text-amber-700 dark:text-amber-300",
          )}
        >
          {simulation.matched ? (
            <CheckCircle2 className="size-5" />
          ) : (
            <ShieldAlert className="size-5" />
          )}
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--demo-muted)]">
            Simulation result
          </p>
          <p className="mt-1 font-heading text-lg font-semibold">
            {simulation.matched ? "Matched" : "Otherwise"} →{" "}
            {simulation.destination}
          </p>
          <p className="mt-1 text-sm leading-relaxed text-[var(--demo-muted)]">
            {simulation.explanation}
          </p>
        </div>
      </div>

      <dl className="mt-4 grid gap-2 sm:grid-cols-2">
        <Meta label="Inquiry" value={topicLabels[simulation.inquiry]} />
        <Meta label="Rule" value={ruleLabels[simulation.rule]} />
        <Meta
          label="Result"
          value={simulation.matched ? "Matched" : "Otherwise"}
        />
        <Meta label="Assigned team" value={simulation.destination} />
      </dl>

      <div className="mt-4 border-t border-[var(--demo-border)] pt-3">
        <p className="mb-2 inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-[var(--demo-muted)]">
          <GitBranch className="size-3.5" />
          Execution trace
        </p>
        <ol className="space-y-1.5 text-xs text-[var(--demo-muted)]">
          <li>1. New inquiry received — {topicLabels[simulation.inquiry]}</li>
          <li>2. Topic condition evaluated against {ruleLabels[simulation.rule]}</li>
          <li>
            3. Branch selected —{" "}
            <span className="font-medium text-[var(--demo-text)]">
              {simulation.matched ? "Matched" : "Otherwise"}
            </span>
          </li>
          <li>
            4. Destination —{" "}
            <span className="font-medium text-[var(--demo-text)]">
              {simulation.destination}
            </span>
          </li>
        </ol>
      </div>
    </div>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-[var(--demo-border)] bg-[var(--demo-panel)]/70 px-3 py-2">
      <dt className="text-[10px] uppercase tracking-wide text-[var(--demo-muted)]">
        {label}
      </dt>
      <dd className="mt-0.5 text-sm font-medium">{value}</dd>
    </div>
  );
}
