"use client";

import {
  CheckCircle2,
  CircleDot,
  Percent,
  Users,
  Layers,
} from "lucide-react";
import type { LiveKpis } from "@/utils/demo-selectors";
import { cn } from "@/utils/cn";

const cards: Array<{
  key: keyof LiveKpis;
  label: string;
  icon: typeof Layers;
  format?: (n: number) => string;
}> = [
  { key: "total", label: "Total", icon: Layers },
  { key: "open", label: "Open", icon: CircleDot },
  { key: "resolved", label: "Resolved", icon: CheckCircle2 },
  { key: "assigned", label: "Assigned", icon: Users },
  {
    key: "resolutionRate",
    label: "Resolution Rate",
    icon: Percent,
    format: (n) => `${n}%`,
  },
];

export function KpiCards({ kpis }: { kpis: LiveKpis }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
      {cards.map((card) => {
        const Icon = card.icon;
        const value = kpis[card.key];
        return (
          <article
            key={card.key}
            className={cn(
              "rounded-2xl border border-[var(--demo-border)] bg-[var(--demo-panel)]/85 p-4 transition hover:border-accent/30",
            )}
          >
            <div className="flex items-center justify-between">
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--demo-muted)]">
                {card.label}
              </p>
              <span className="flex size-8 items-center justify-center rounded-lg bg-accent/10 text-accent">
                <Icon className="size-4" />
              </span>
            </div>
            <p className="mt-3 font-heading text-3xl font-semibold tabular-nums tracking-tight">
              {card.format ? card.format(value) : value}
            </p>
          </article>
        );
      })}
    </div>
  );
}
