"use client";

import type { TeamWorkload } from "@/utils/demo-selectors";
import { cn } from "@/utils/cn";

const teamColors: Record<string, string> = {
  Orders: "bg-violet-500",
  Billing: "bg-fuchsia-500",
  Technical: "bg-indigo-500",
  "General Triage": "bg-amber-500",
  Unassigned: "bg-slate-400",
};

export function TeamWorkloadChart({ items }: { items: TeamWorkload[] }) {
  const max = Math.max(1, ...items.map((i) => i.count));

  return (
    <section className="rounded-2xl border border-[var(--demo-border)] bg-[var(--demo-panel)]/85 p-4">
      <h3 className="font-heading text-sm font-semibold">Open team workload</h3>
      <p className="mt-1 text-xs text-[var(--demo-muted)]">
        Counts open conversations only, including Unassigned.
      </p>

      <ul className="mt-4 space-y-3">
        {items.map((item) => {
          const width = `${(item.count / max) * 100}%`;
          return (
            <li key={item.team}>
              <div className="mb-1 flex items-center justify-between text-xs">
                <span className="font-medium">{item.team}</span>
                <span className="tabular-nums text-[var(--demo-muted)]">
                  {item.count}
                </span>
              </div>
              <div className="h-2.5 overflow-hidden rounded-full bg-[var(--demo-panel-2)]">
                <div
                  className={cn(
                    "h-full rounded-full transition-[width] duration-500",
                    teamColors[item.team] ?? "bg-accent",
                  )}
                  style={{ width }}
                />
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
