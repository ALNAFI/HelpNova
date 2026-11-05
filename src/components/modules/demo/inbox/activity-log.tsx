"use client";

import {
  CheckCircle2,
  GitBranch,
  MessageSquare,
  RefreshCcw,
  StickyNote,
  UserPlus,
  CircleDot,
} from "lucide-react";
import type { DemoActivity } from "@/types/demo";
import { formatDemoDateTime } from "@/utils/demo-format";
import { cn } from "@/utils/cn";

const icons = {
  created: CircleDot,
  assigned: UserPlus,
  reply: MessageSquare,
  note: StickyNote,
  resolved: CheckCircle2,
  reopened: RefreshCcw,
  automation: GitBranch,
} as const;

type ActivityLogProps = {
  items: DemoActivity[];
  compact?: boolean;
};

export function ActivityLog({ items, compact = false }: ActivityLogProps) {
  if (items.length === 0) {
    return (
      <p className="px-1 py-3 text-[12px] text-[var(--demo-muted)]">
        No activity yet for this conversation.
      </p>
    );
  }

  return (
    <ul className={cn("relative", compact ? "space-y-0" : "space-y-0")}>
      {items.map((item, index) => {
        const Icon = icons[item.kind];
        const isLast = index === items.length - 1;
        return (
          <li key={item.id} className="relative flex gap-3 pb-3 last:pb-0">
            {!isLast ? (
              <span
                className="absolute top-7 bottom-0 left-[13px] w-px bg-[var(--demo-border)]"
                aria-hidden
              />
            ) : null}
            <span className="relative z-[1] mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-lg border border-[var(--demo-border)] bg-[var(--demo-panel)] text-[var(--demo-muted)]">
              <Icon className="size-3.5" aria-hidden />
            </span>
            <span className="min-w-0 pt-0.5">
              <span className="block text-[13px] leading-5 text-[var(--demo-text)]">
                {item.summary}
              </span>
              <span className="mt-0.5 block text-[12px] leading-4 text-[var(--demo-muted)]">
                {formatDemoDateTime(item.createdAt)}
              </span>
            </span>
          </li>
        );
      })}
    </ul>
  );
}
