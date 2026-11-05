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
        "group relative mx-auto w-full max-w-md rounded-xl border px-3.5 py-2.5 text-left transition duration-200",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
        selected
          ? "border-accent bg-accent/12 shadow-[0_0_0_1px_color-mix(in_oklab,var(--accent)_35%,transparent)]"
          : "border-[var(--demo-border)] bg-[var(--demo-panel)] hover:border-accent/30",
        active &&
          "ring-2 ring-accent/55 shadow-[0_0_18px_color-mix(in_oklab,var(--accent)_26%,transparent)]",
        dimmed && "opacity-55",
      )}
    >
      <span className="flex items-start gap-2.5">
        <span
          className={cn(
            "flex size-8 shrink-0 items-center justify-center rounded-lg border transition",
            active || selected
              ? "border-accent/40 bg-accent text-accent-foreground"
              : "border-[var(--demo-border)] bg-[var(--demo-panel-2)] text-[var(--demo-muted)] group-hover:text-[var(--demo-text)]",
          )}
        >
          <Icon className="size-3.5" />
        </span>
        <span className="min-w-0">
          <span className="block text-[14px] font-semibold leading-snug sm:text-[15px]">
            {label}
          </span>
          {detail ? (
            <span className="mt-0.5 block text-[12px] leading-snug text-[var(--demo-muted)] sm:text-[13px]">
              {detail}
            </span>
          ) : null}
        </span>
      </span>
    </button>
  );
}
