"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowLeft, Info, StickyNote } from "lucide-react";
import { topicLabels } from "@/data/demo/seed";
import { MessageComposer } from "@/components/modules/demo/inbox/message-composer";
import { CustomerContext } from "@/components/modules/demo/inbox/customer-context";
import type {
  ComposerMode,
  DemoActivity,
  DemoConversation,
  DemoTeam,
} from "@/types/demo";
import {
  demoDayKey,
  formatDemoDayLabel,
  formatDemoTime,
  initials,
} from "@/utils/demo-format";
import { cn } from "@/utils/cn";

type ConversationThreadProps = {
  conversation: DemoConversation;
  activity: DemoActivity[];
  composerMode: ComposerMode;
  replyDraft: string;
  noteDraft: string;
  showBack?: boolean;
  onBack?: () => void;
  onModeChange: (mode: ComposerMode) => void;
  onReplyChange: (value: string) => void;
  onNoteChange: (value: string) => void;
  onSubmit: () => void;
  onAssign: (team: DemoTeam | null) => void;
  onResolve: () => void;
  onReopen: () => void;
};

export function ConversationThread({
  conversation,
  activity,
  composerMode,
  replyDraft,
  noteDraft,
  showBack,
  onBack,
  onModeChange,
  onReplyChange,
  onNoteChange,
  onSubmit,
  onAssign,
  onResolve,
  onReopen,
}: ConversationThreadProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);

  const timeline = useMemo(() => {
    const items: Array<
      | { type: "day"; key: string; label: string }
      | { type: "message"; key: string; message: DemoConversation["messages"][number] }
    > = [];
    let lastDay: string | null = null;

    for (const message of conversation.messages) {
      const day = demoDayKey(message.createdAt);
      if (day !== lastDay) {
        items.push({
          type: "day",
          key: `day-${day}`,
          label: formatDemoDayLabel(message.createdAt),
        });
        lastDay = day;
      }
      items.push({ type: "message", key: message.id, message });
    }

    return items;
  }, [conversation.messages]);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [conversation.id, conversation.messages.length]);

  useEffect(() => {
    if (!detailsOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setDetailsOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [detailsOpen]);

  return (
    <div className="flex h-full min-h-0 flex-col overflow-x-hidden">
      <div className="flex shrink-0 items-start gap-2 border-b border-[var(--demo-border)] bg-[var(--demo-panel)]/80 px-3 py-3 sm:px-4">
        {showBack ? (
          <button
            type="button"
            onClick={onBack}
            className="mt-0.5 inline-flex size-8 items-center justify-center rounded-lg border border-[var(--demo-border)] text-[var(--demo-muted)] transition hover:text-[var(--demo-text)] lg:hidden"
            aria-label="Back to conversation list"
          >
            <ArrowLeft className="size-4" />
          </button>
        ) : null}
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="truncate font-heading text-[15px] font-semibold tracking-tight sm:text-base">
              {conversation.customerName}
            </h2>
            <StatusBadge status={conversation.status} />
          </div>
          <p className="truncate text-[13px] leading-5 text-[var(--demo-muted)]">
            {conversation.subject}
          </p>
          <p className="mt-1 text-[12px] leading-4 text-[var(--demo-muted)]">
            {topicLabels[conversation.topic]} ·{" "}
            {conversation.team ?? "Unassigned"}
          </p>
        </div>
        <button
          type="button"
          onClick={() => setDetailsOpen(true)}
          className="mt-0.5 inline-flex size-8 items-center justify-center rounded-lg border border-[var(--demo-border)] text-[var(--demo-muted)] transition hover:text-[var(--demo-text)] xl:hidden"
          aria-label="Open customer details"
        >
          <Info className="size-4" />
        </button>
      </div>

      <div
        ref={scrollerRef}
        className="min-h-0 flex-1 space-y-3 overflow-y-auto overscroll-contain px-3 py-4 sm:px-5"
      >
        {timeline.map((item) => {
          if (item.type === "day") {
            return (
              <div
                key={item.key}
                className="flex items-center gap-3 py-1"
                role="separator"
                aria-label={item.label}
              >
                <span className="h-px flex-1 bg-[var(--demo-border)]" />
                <span className="text-[12px] font-medium text-[var(--demo-muted)]">
                  {item.label}
                </span>
                <span className="h-px flex-1 bg-[var(--demo-border)]" />
              </div>
            );
          }

          const { message } = item;
          const isCustomer = message.kind === "customer";
          const isNote = message.kind === "note";

          return (
            <article
              key={item.key}
              className={cn(
                "w-full max-w-[min(720px,92%)] animate-[demoFadeIn_220ms_ease-out] sm:max-w-[min(720px,80%)]",
                isCustomer ? "mr-auto" : "ml-auto",
              )}
            >
              <div
                className={cn(
                  "rounded-2xl border px-3.5 py-3 shadow-sm",
                  isCustomer &&
                    "border-[var(--demo-border)] bg-[var(--demo-panel)]",
                  message.kind === "reply" &&
                    "border-accent/25 bg-accent/10",
                  isNote &&
                    "border-amber-500/30 bg-amber-500/12 dark:border-amber-400/35 dark:bg-amber-400/12",
                )}
              >
                <div className="mb-2 flex items-center gap-2">
                  <span
                    className={cn(
                      "flex size-6 shrink-0 items-center justify-center rounded-full text-[10px] font-semibold",
                      isNote
                        ? "bg-amber-500/20 text-amber-800 dark:bg-amber-400/20 dark:text-amber-200"
                        : "bg-[var(--demo-panel-2)] text-[var(--demo-muted)]",
                    )}
                    aria-hidden
                  >
                    {isNote ? (
                      <StickyNote className="size-3" />
                    ) : (
                      initials(message.author)
                    )}
                  </span>
                  <span className="truncate text-[12px] font-medium text-[var(--demo-text)]">
                    {message.author}
                  </span>
                  {isNote ? (
                    <span className="inline-flex items-center gap-1 rounded-md bg-amber-500/18 px-1.5 py-0.5 text-[11px] font-semibold text-amber-900 dark:bg-amber-400/18 dark:text-amber-100">
                      <StickyNote className="size-3" aria-hidden />
                      Internal note
                    </span>
                  ) : null}
                  <span className="ml-auto shrink-0 text-[12px] text-[var(--demo-muted)]">
                    {formatDemoTime(message.createdAt)}
                  </span>
                </div>
                <p className="whitespace-pre-wrap text-[14px] leading-6 text-[var(--demo-text)] sm:text-[15px] sm:leading-7">
                  {message.body}
                </p>
              </div>
            </article>
          );
        })}
      </div>

      <MessageComposer
        mode={composerMode}
        replyDraft={replyDraft}
        noteDraft={noteDraft}
        onModeChange={onModeChange}
        onReplyChange={onReplyChange}
        onNoteChange={onNoteChange}
        onSubmit={onSubmit}
      />

      {detailsOpen ? (
        <div className="fixed inset-0 z-50 xl:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-black/50"
            aria-label="Close details"
            onClick={() => setDetailsOpen(false)}
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Customer details"
            className="absolute inset-x-0 bottom-0 max-h-[82dvh] overflow-hidden rounded-t-2xl border border-[var(--demo-border)] bg-[var(--demo-panel)] shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-[var(--demo-border)] px-4 py-3">
              <h3 className="font-heading text-[14px] font-semibold">Details</h3>
              <button
                type="button"
                onClick={() => setDetailsOpen(false)}
                className="rounded-lg px-2 py-1 text-[12px] text-[var(--demo-muted)]"
              >
                Close
              </button>
            </div>
            <div className="max-h-[calc(82dvh-3rem)] overflow-y-auto overscroll-contain">
              <CustomerContext
                conversation={conversation}
                activity={activity}
                onAssign={onAssign}
                onResolve={onResolve}
                onReopen={onReopen}
              />
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function StatusBadge({ status }: { status: DemoConversation["status"] }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold tracking-wide uppercase",
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
