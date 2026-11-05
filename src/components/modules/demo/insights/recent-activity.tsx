"use client";

import {
  CheckCircle2,
  CircleDot,
  GitBranch,
  MessageSquare,
  RefreshCcw,
  StickyNote,
  UserPlus,
} from "lucide-react";
import type { DemoActivity, DemoConversation } from "@/types/demo";
import { formatInsightsActivity } from "@/utils/demo-insights-activity";
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

type RecentActivityProps = {
  items: DemoActivity[];
  conversations: DemoConversation[];
  onOpenConversation: (conversationId: string) => void;
};

export function RecentActivity({
  items,
  conversations,
  onOpenConversation,
}: RecentActivityProps) {
  return (
    <section className="flex min-h-0 flex-col rounded-2xl border border-[var(--demo-border)] bg-[var(--demo-panel)]/85 p-4 sm:p-5">
      <h3 className="font-heading text-base font-semibold">Recent activity</h3>
      <p className="mt-1 text-[13px] leading-snug text-[var(--demo-muted)] sm:text-sm">
        Latest updates from Inbox and Automation.
      </p>

      <div className="mt-4 max-h-[320px] overflow-y-auto overscroll-contain pr-1 [scrollbar-gutter:stable] [scrollbar-width:thin]">
        {items.length === 0 ? (
          <p className="rounded-xl border border-dashed border-[var(--demo-border)] px-3 py-6 text-center text-[13px] text-[var(--demo-muted)]">
            No activity yet. Assign, reply, or run automation to see updates here.
          </p>
        ) : (
          <ul className="relative">
            {items.map((item, index) => {
              const Icon = icons[item.kind];
              const isLast = index === items.length - 1;
              const label = formatInsightsActivity(item, conversations);
              const exists = conversations.some(
                (c) => c.id === item.conversationId,
              );

              return (
                <li key={item.id} className="relative flex gap-3 pb-3.5 last:pb-0">
                  {!isLast ? (
                    <span
                      className="absolute top-7 bottom-0 left-[13px] w-px bg-[var(--demo-border)]"
                      aria-hidden
                    />
                  ) : null}
                  <span className="relative z-[1] mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-lg border border-[var(--demo-border)] bg-[var(--demo-panel)] text-[var(--demo-muted)]">
                    <Icon className="size-3.5" aria-hidden />
                  </span>
                  <span className="min-w-0 flex-1 pt-0.5">
                    {exists ? (
                      <button
                        type="button"
                        onClick={() => onOpenConversation(item.conversationId)}
                        className={cn(
                          "block w-full rounded-md text-left text-[13px] leading-5 text-[var(--demo-text)] transition",
                          "hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
                        )}
                      >
                        {label}
                      </button>
                    ) : (
                      <span className="block text-[13px] leading-5 text-[var(--demo-text)]">
                        {label}
                      </span>
                    )}
                    <span className="mt-0.5 block text-[12px] leading-4 text-[var(--demo-muted)]">
                      {formatDemoDateTime(item.createdAt)}
                    </span>
                  </span>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </section>
  );
}
