"use client";

import { useEffect, useRef, useState } from "react";
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
import { formatDemoTime, initials } from "@/utils/demo-format";
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

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [conversation.id, conversation.messages.length]);

  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="flex shrink-0 items-start gap-2 border-b border-[var(--demo-border)] px-3 py-3 sm:px-4">
        {showBack ? (
          <button
            type="button"
            onClick={onBack}
            className="mt-0.5 inline-flex size-8 items-center justify-center rounded-lg border border-[var(--demo-border)] text-[var(--demo-muted)] transition hover:text-[var(--demo-text)] xl:hidden"
            aria-label="Back to conversation list"
          >
            <ArrowLeft className="size-4" />
          </button>
        ) : null}
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="truncate font-heading text-base font-semibold">
              {conversation.customerName}
            </h2>
            <StatusBadge status={conversation.status} />
          </div>
          <p className="truncate text-sm text-[var(--demo-muted)]">
            {conversation.subject}
          </p>
          <p className="mt-1 text-[11px] text-[var(--demo-muted)]">
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

      <div ref={scrollerRef} className="min-h-0 flex-1 space-y-3 overflow-y-auto px-3 py-4 sm:px-4">
        {conversation.messages.map((message) => (
          <article
            key={message.id}
            className={cn(
              "max-w-[92%] animate-[demoFadeIn_220ms_ease-out]",
              message.kind === "customer" ? "mr-auto" : "ml-auto",
            )}
          >
            <div
              className={cn(
                "rounded-2xl border px-3.5 py-2.5 shadow-sm",
                message.kind === "customer" &&
                  "border-[var(--demo-border)] bg-[var(--demo-panel)]",
                message.kind === "reply" &&
                  "border-accent/25 bg-accent/10",
                message.kind === "note" &&
                  "border-amber-500/25 bg-amber-500/10 dark:border-violet-400/30 dark:bg-violet-500/15",
              )}
            >
              <div className="mb-1.5 flex items-center gap-2">
                <span
                  className={cn(
                    "flex size-6 items-center justify-center rounded-full text-[10px] font-semibold",
                    message.kind === "note"
                      ? "bg-accent/20 text-accent"
                      : "bg-[var(--demo-panel-2)] text-[var(--demo-muted)]",
                  )}
                >
                  {message.kind === "note" ? (
                    <StickyNote className="size-3" />
                  ) : (
                    initials(message.author)
                  )}
                </span>
                <span className="text-xs font-medium">{message.author}</span>
                {message.kind === "note" ? (
                  <span className="rounded-md bg-accent/15 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-accent">
                    Internal Note
                  </span>
                ) : null}
                {message.kind === "reply" ? (
                  <span className="rounded-md bg-[var(--demo-panel-2)] px-1.5 py-0.5 text-[10px] font-medium text-[var(--demo-muted)]">
                    Local reply
                  </span>
                ) : null}
                <span className="ml-auto text-[10px] text-[var(--demo-muted)]">
                  {formatDemoTime(message.createdAt)}
                </span>
              </div>
              <p className="whitespace-pre-wrap text-sm leading-relaxed">
                {message.body}
              </p>
            </div>
          </article>
        ))}
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
              <h3 className="font-heading text-sm font-semibold">Details</h3>
              <button
                type="button"
                onClick={() => setDetailsOpen(false)}
                className="rounded-lg px-2 py-1 text-xs text-[var(--demo-muted)]"
              >
                Close
              </button>
            </div>
            <div className="max-h-[calc(82dvh-3rem)] overflow-y-auto">
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
        "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide",
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
