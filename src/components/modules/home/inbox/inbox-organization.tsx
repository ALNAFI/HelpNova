"use client";

import { useMemo, useState } from "react";
import {
  inboxHomeConversations,
  inboxHomeOrganization,
} from "@/data/marketing/home-inbox";
import { cn } from "@/utils/cn";

type FilterId = (typeof inboxHomeOrganization.filters)[number]["id"];

export function InboxOrganization() {
  const [filter, setFilter] = useState<FilterId>("all");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    return inboxHomeConversations.filter((conversation) => {
      const statusOk =
        filter === "all" ||
        conversation.status.toLowerCase() === filter;
      const q = query.trim().toLowerCase();
      const queryOk =
        !q ||
        conversation.customer.toLowerCase().includes(q) ||
        conversation.subject.toLowerCase().includes(q) ||
        conversation.tags.some((tag) => tag.includes(q));
      return statusOk && queryOk;
    });
  }, [filter, query]);

  return (
    <section id={inboxHomeOrganization.id} className="ih-section py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <p className="ih-eyebrow">{inboxHomeOrganization.eyebrow}</p>
          <h2 className="mt-3 font-heading text-[2rem] font-semibold tracking-tight text-balance sm:text-[2.6rem]">
            {inboxHomeOrganization.title}
          </h2>
          <p className="mt-4 text-base leading-7 text-muted">
            {inboxHomeOrganization.description}
          </p>
        </div>

        <div className="mt-10 overflow-hidden rounded-[1.75rem] border border-border bg-surface shadow-[var(--shadow-soft)]">
          <div className="flex flex-col gap-3 border-b border-border p-4 sm:flex-row sm:items-center sm:justify-between">
            <div
              role="tablist"
              aria-label="Status filters"
              className="flex flex-wrap gap-2"
            >
              {inboxHomeOrganization.filters.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={filter === item.id}
                  onClick={() => setFilter(item.id)}
                  className={cn(
                    "rounded-full border px-3 py-1.5 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    filter === item.id
                      ? "border-accent bg-accent text-white"
                      : "border-border bg-surface-muted text-muted hover:text-foreground",
                  )}
                >
                  {item.label}
                </button>
              ))}
            </div>
            <label className="block min-w-[14rem] flex-1 sm:max-w-xs">
              <span className="sr-only">Search sample conversations</span>
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search sample list"
                className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
            </label>
          </div>

          <div className="divide-y divide-border">
            {filtered.length === 0 ? (
              <div className="px-5 py-12 text-center">
                <p className="font-heading text-lg font-semibold">
                  {inboxHomeOrganization.emptyTitle}
                </p>
                <p className="mt-2 text-sm text-muted">
                  {inboxHomeOrganization.emptyDescription}
                </p>
              </div>
            ) : (
              filtered.map((conversation) => (
                <article
                  key={conversation.id}
                  className="grid gap-3 px-4 py-4 sm:grid-cols-[1.2fr_0.8fr_0.8fr] sm:items-center"
                >
                  <div>
                    <p className="font-semibold">{conversation.customer}</p>
                    <p className="mt-1 text-sm text-muted">
                      {conversation.subject}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span
                      className={cn(
                        "rounded-full px-2.5 py-1 text-[11px] font-semibold",
                        conversation.status === "Open"
                          ? "bg-accent/15 text-accent"
                          : "bg-[var(--ih-cyan)]/15 text-[var(--ih-cyan)]",
                      )}
                    >
                      {conversation.status}
                    </span>
                    <span className="rounded-full border border-border px-2.5 py-1 text-[11px] text-muted">
                      Priority · {conversation.priority}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {conversation.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-surface-muted px-2 py-1 text-[11px] text-muted"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </article>
              ))
            )}
          </div>
        </div>
        <p className="mt-4 text-xs text-muted">{inboxHomeOrganization.notice}</p>
      </div>
    </section>
  );
}
