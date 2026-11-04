"use client";

import type { LucideIcon } from "lucide-react";
import { cn } from "@/utils/cn";

type WorkflowNodeProps = {
  id: string;
  label: string;
  detail?: string;
  icon: LucideIcon;
  selected: boolean;
  active: boolean;
  dimmed?: boolean;
  onSelect: () => void;
};

export function WorkflowNodeCard({
  id,
  label,
  detail,
  icon: Icon,
  selected,
  active,
  dimmed,
  onSelect,
}: WorkflowNodeProps) {
  return (
    <button
      type="button"
      data-node={id}
      onClick={onSelect}
      aria-pressed={selected}
      className={cn(
        "group relative w-full rounded-2xl border px-4 py-3 text-left transition duration-200",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
        selected
          ? "border-accent/50 bg-accent/15 shadow-[0_0_0_1px_color-mix(in_oklab,var(--accent)_40%,transparent)]"
          : "border-[var(--demo-border)] bg-[var(--demo-panel)] hover:border-accent/30",
        active && "ring-2 ring-accent/60 shadow-[0_0_24px_color-mix(in_oklab,var(--accent)_28%,transparent)]",
        dimmed && "opacity-40",
      )}
    >
      <span className="flex items-start gap-3">
        <span
          className={cn(
            "flex size-9 shrink-0 items-center justify-center rounded-xl border transition",
            active || selected
              ? "border-accent/40 bg-accent text-accent-foreground"
              : "border-[var(--demo-border)] bg-[var(--demo-panel-2)] text-[var(--demo-muted)] group-hover:text-[var(--demo-text)]",
          )}
        >
          <Icon className="size-4" />
        </span>
        <span className="min-w-0">
          <span className="block text-sm font-semibold">{label}</span>
          {detail ? (
            <span className="mt-0.5 block text-[11px] leading-snug text-[var(--demo-muted)]">
              {detail}
            </span>
          ) : null}
        </span>
      </span>
    </button>
  );
}
