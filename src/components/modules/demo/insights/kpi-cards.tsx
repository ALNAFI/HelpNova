"use client";

import { useId, useState } from "react";
import {
  CheckCircle2,
  CircleDot,
  Info,
  Layers,
  Percent,
  Users,
} from "lucide-react";
import type { LiveKpis } from "@/utils/demo-selectors";
import { cn } from "@/utils/cn";

const cards: Array<{
  key: keyof LiveKpis;
  label: string;
  tip: string;
  icon: typeof Layers;
  format?: (n: number) => string;
}> = [
  {
    key: "total",
    label: "Total conversations",
    tip: "All conversations currently in the demo workspace.",
    icon: Layers,
  },
  {
    key: "open",
    label: "Open",
    tip: "Conversations that still need a response or follow-up.",
    icon: CircleDot,
  },
  {
    key: "resolved",
    label: "Resolved",
    tip: "Conversations marked as resolved.",
    icon: CheckCircle2,
  },
  {
    key: "assigned",
    label: "Assigned conversations",
    tip: "Conversations with a team assigned, including resolved ones.",
    icon: Users,
  },
  {
    key: "resolutionRate",
    label: "Resolution rate",
    tip: "Resolved conversations divided by total conversations. Shows 0% when there are no conversations.",
    icon: Percent,
    format: (n) => `${n}%`,
  },
];

export function KpiCards({ kpis }: { kpis: LiveKpis }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-5">
      {cards.map((card) => {
        const Icon = card.icon;
        const value = kpis[card.key];
        return (
          <article
            key={card.key}
            className={cn(
              "rounded-2xl border border-[var(--demo-border)] bg-[var(--demo-panel)]/85 p-3.5 sm:p-4",
              "transition hover:border-accent/30",
              card.key === "resolutionRate" && "col-span-2 xl:col-span-1",
            )}
          >
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <p className="text-[12px] font-medium leading-snug text-[var(--demo-muted)] sm:text-[13px]">
                  {card.label}
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-1">
                <InfoTip label={card.label} tip={card.tip} />
                <span className="flex size-8 items-center justify-center rounded-lg bg-accent/10 text-accent">
                  <Icon className="size-4" aria-hidden />
                </span>
              </div>
            </div>
            <p className="mt-3 font-heading text-[28px] font-semibold leading-none tabular-nums tracking-tight sm:text-[30px] lg:text-[32px]">
              {card.format ? card.format(value) : value}
            </p>
          </article>
        );
      })}
    </div>
  );
}

function InfoTip({ label, tip }: { label: string; tip: string }) {
  const tipId = useId();
  const [open, setOpen] = useState(false);

  return (
    <span className="relative">
      <button
        type="button"
        className="flex size-7 items-center justify-center rounded-md text-[var(--demo-muted)] transition hover:bg-[var(--demo-hover)] hover:text-[var(--demo-text)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        aria-label={`About ${label}`}
        aria-describedby={open ? tipId : undefined}
        onClick={() => setOpen((value) => !value)}
        onBlur={() => setOpen(false)}
      >
        <Info className="size-3.5" aria-hidden />
      </button>
      {open ? (
        <span
          id={tipId}
          role="tooltip"
          className="absolute top-full right-0 z-20 mt-1.5 w-52 rounded-lg border border-[var(--demo-border)] bg-[var(--demo-panel)] px-2.5 py-2 text-left text-[12px] leading-snug text-[var(--demo-text)] shadow-lg sm:w-56"
        >
          {tip}
        </span>
      ) : null}
    </span>
  );
}
