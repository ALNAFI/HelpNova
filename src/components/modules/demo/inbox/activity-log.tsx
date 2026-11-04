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
      <p className="px-1 py-3 text-xs text-[var(--demo-muted)]">
        No activity yet for this conversation.
      </p>
    );
  }

  return (
    <ul className={compact ? "space-y-2" : "space-y-3"}>
      {items.map((item) => {
        const Icon = icons[item.kind];
        return (
          <li key={item.id} className="flex gap-2.5">
            <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-lg border border-[var(--demo-border)] bg-[var(--demo-panel)] text-[var(--demo-muted)]">
              <Icon className="size-3.5" />
            </span>
            <span className="min-w-0">
              <span className="block text-xs leading-snug text-[var(--demo-text)]">
                {item.summary}
              </span>
              <span className="mt-0.5 block text-[10px] text-[var(--demo-muted)]">
                {formatDemoDateTime(item.createdAt)}
              </span>
            </span>
          </li>
        );
      })}
    </ul>
  );
}
