"use client";

import type { TeamWorkload } from "@/utils/demo-selectors";
import { cn } from "@/utils/cn";

const teamColors: Record<string, string> = {
  Orders: "bg-violet-600 dark:bg-violet-500",
  Billing: "bg-purple-500",
  Technical: "bg-indigo-500",
  "General Triage": "bg-fuchsia-500/90",
  Unassigned: "bg-amber-500",
};

export function TeamWorkloadChart({ items }: { items: TeamWorkload[] }) {
  const max = Math.max(0, ...items.map((i) => i.count));
  const scaleMax = Math.max(max, 1);
  const empty = max === 0;

  return (
    <section className="rounded-2xl border border-[var(--demo-border)] bg-[var(--demo-panel)]/85 p-4 sm:p-5">
      <h3 className="font-heading text-base font-semibold">
        Open conversations by team
      </h3>
      <p className="mt-1 text-[13px] leading-snug text-[var(--demo-muted)] sm:text-sm">
        Open conversations only, including Unassigned.
      </p>

      <div className="mt-4 flex items-end justify-between gap-2 text-[11px] text-[var(--demo-muted)]">
        <span>Count scale</span>
        <span className="tabular-nums">0 – {scaleMax}</span>
      </div>

      {empty ? (
        <p className="mt-4 rounded-xl border border-dashed border-[var(--demo-border)] px-3 py-6 text-center text-[13px] text-[var(--demo-muted)]">
          No open conversations right now.
        </p>
      ) : (
        <ul className="mt-3 space-y-3.5">
          {items.map((item) => {
            const width = `${(item.count / scaleMax) * 100}%`;
            return (
              <li key={item.team}>
                <div className="mb-1.5 flex items-center justify-between gap-3 text-[13px] sm:text-sm">
                  <span className="min-w-0 truncate font-medium">
                    {item.team}
                  </span>
                  <span className="shrink-0 tabular-nums text-[var(--demo-muted)]">
                    {item.count}
                  </span>
                </div>
                <div
                  className="h-3 overflow-hidden rounded-full bg-[var(--demo-panel-2)]"
                  role="img"
                  aria-label={`${item.team}: ${item.count} open`}
                >
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
      )}
    </section>
  );
}
