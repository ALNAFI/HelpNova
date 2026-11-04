"use client";

import { Search, X } from "lucide-react";
import { topicLabels } from "@/data/demo/seed";
import type { DemoConversation, InboxFilter } from "@/types/demo";
import { formatDemoTime, initials } from "@/utils/demo-format";
import { cn } from "@/utils/cn";

const filters: Array<{ id: InboxFilter; label: string }> = [
  { id: "all", label: "All" },
  { id: "open", label: "Open" },
  { id: "resolved", label: "Resolved" },
];

type ConversationListProps = {
  conversations: DemoConversation[];
  selectedId: string | null;
  search: string;
  filter: InboxFilter;
  onSearch: (value: string) => void;
  onFilter: (filter: InboxFilter) => void;
  onSelect: (id: string) => void;
  onClearFilters: () => void;
};

export function ConversationList({
  conversations,
  selectedId,
  search,
  filter,
  onSearch,
  onFilter,
  onSelect,
  onClearFilters,
}: ConversationListProps) {
  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="shrink-0 space-y-3 border-b border-[var(--demo-border)] p-3">
        <label className="relative block">
          <span className="sr-only">Search conversations</span>
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[var(--demo-muted)]" />
          <input
            value={search}
            onChange={(e) => onSearch(e.target.value)}
            placeholder="Search name, subject, topic…"
            className="h-10 w-full rounded-xl border border-[var(--demo-border)] bg-[var(--demo-panel)] pl-9 pr-3 text-sm outline-none transition placeholder:text-[var(--demo-muted)] focus:border-accent/50 focus:ring-2 focus:ring-accent/30"
          />
        </label>

        <div
          role="tablist"
          aria-label="Conversation status filter"
          className="relative grid grid-cols-3 rounded-xl border border-[var(--demo-border)] bg-[var(--demo-panel-2)] p-1"
        >
          {filters.map((item) => {
            const active = filter === item.id;
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => onFilter(item.id)}
                className={cn(
                  "relative z-10 rounded-lg px-2 py-1.5 text-xs font-medium transition",
                  active
                    ? "bg-[var(--demo-panel)] text-[var(--demo-text)] shadow-sm"
                    : "text-[var(--demo-muted)] hover:text-[var(--demo-text)]",
                )}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto">
        {conversations.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center gap-3 px-6 py-10 text-center">
            <p className="text-sm font-medium text-[var(--demo-text)]">
              No conversations match your search.
            </p>
            <p className="text-xs text-[var(--demo-muted)]">
              Try a different query or clear filters.
            </p>
            <button
              type="button"
              onClick={onClearFilters}
              className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--demo-border)] px-3 py-1.5 text-xs font-medium transition hover:bg-[var(--demo-hover)]"
            >
              <X className="size-3.5" />
              Clear filters
            </button>
          </div>
        ) : (
          <ul className="divide-y divide-[var(--demo-border)]">
            {conversations.map((conversation) => {
              const active = selectedId === conversation.id;
              const preview =
                conversation.messages[conversation.messages.length - 1]?.body ??
                "";
              return (
                <li key={conversation.id}>
                  <button
                    type="button"
                    onClick={() => onSelect(conversation.id)}
                    className={cn(
                      "flex w-full gap-3 px-3 py-3 text-left transition",
                      active
                        ? "bg-accent/10 shadow-[inset_3px_0_0_0_var(--accent)]"
                        : "hover:bg-[var(--demo-hover)]",
                    )}
                  >
                    <span
                      className={cn(
                        "mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-full text-xs font-semibold",
                        active
                          ? "bg-accent text-accent-foreground"
                          : "bg-[var(--demo-panel-2)] text-[var(--demo-muted)]",
                      )}
                      aria-hidden
                    >
                      {initials(conversation.customerName)}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="flex items-start justify-between gap-2">
                        <span className="truncate text-sm font-medium">
                          {conversation.customerName}
                        </span>
                        <span className="shrink-0 text-[10px] text-[var(--demo-muted)]">
                          {formatDemoTime(conversation.updatedAt)}
                        </span>
                      </span>
                      <span className="mt-0.5 block truncate text-xs text-[var(--demo-muted)]">
                        {conversation.subject}
                      </span>
                      <span className="mt-1 flex flex-wrap items-center gap-1.5">
                        <StatusPill status={conversation.status} />
                        <span className="rounded-md bg-[var(--demo-panel-2)] px-1.5 py-0.5 text-[10px] text-[var(--demo-muted)]">
                          {topicLabels[conversation.topic]}
                        </span>
                      </span>
                      <span className="mt-1 line-clamp-1 text-[11px] text-[var(--demo-muted)]">
                        {preview}
                      </span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}

function StatusPill({ status }: { status: DemoConversation["status"] }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide",
        status === "open"
          ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300"
          : "bg-sky-500/15 text-sky-700 dark:text-sky-300",
      )}
    >
      <span
        className={cn(
          "size-1.5 rounded-full",
          status === "open" ? "bg-emerald-500" : "bg-sky-500",
        )}
      />
      {status === "open" ? "Open" : "Resolved"}
    </span>
  );
}
