"use client";

import { StickyNote, Send } from "lucide-react";
import type { ComposerMode } from "@/types/demo";
import { cn } from "@/utils/cn";

type MessageComposerProps = {
  mode: ComposerMode;
  replyDraft: string;
  noteDraft: string;
  onModeChange: (mode: ComposerMode) => void;
  onReplyChange: (value: string) => void;
  onNoteChange: (value: string) => void;
  onSubmit: () => void;
};

export function MessageComposer({
  mode,
  replyDraft,
  noteDraft,
  onModeChange,
  onReplyChange,
  onNoteChange,
  onSubmit,
}: MessageComposerProps) {
  const value = mode === "reply" ? replyDraft : noteDraft;
  const disabled = value.trim().length === 0;
  const isNote = mode === "note";

  return (
    <div
      className={cn(
        "shrink-0 border-t p-3 sm:p-4",
        isNote
          ? "border-amber-500/25 bg-amber-500/[0.06] dark:border-amber-400/20 dark:bg-amber-400/[0.07]"
          : "border-[var(--demo-border)] bg-[var(--demo-panel)]",
      )}
    >
      <div
        role="tablist"
        aria-label="Composer mode"
        className="mb-2.5 inline-flex rounded-lg border border-[var(--demo-border)] bg-[var(--demo-panel-2)] p-0.5"
      >
        {(
          [
            { id: "reply", label: "Reply" },
            { id: "note", label: "Internal note" },
          ] as const
        ).map((item) => {
          const selected = mode === item.id;
          return (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => onModeChange(item.id)}
              className={cn(
                "rounded-md px-3 py-1.5 text-[12px] font-medium transition",
                selected
                  ? item.id === "note"
                    ? "bg-amber-500/20 text-amber-800 shadow-sm dark:bg-amber-400/20 dark:text-amber-200"
                    : "bg-[var(--demo-panel)] text-[var(--demo-text)] shadow-sm"
                  : "text-[var(--demo-muted)] hover:text-[var(--demo-text)]",
              )}
            >
              {item.label}
            </button>
          );
        })}
      </div>

      <label className="block">
        <span className="sr-only">
          {isNote ? "Internal note" : "Reply"}
        </span>
        <textarea
          value={value}
          onChange={(e) =>
            isNote ? onNoteChange(e.target.value) : onReplyChange(e.target.value)
          }
          onKeyDown={(e) => {
            if ((e.metaKey || e.ctrlKey) && e.key === "Enter" && !disabled) {
              e.preventDefault();
              onSubmit();
            }
          }}
          rows={3}
          placeholder={
            isNote ? "Write an internal note…" : "Write your reply…"
          }
          className={cn(
            "w-full resize-none rounded-xl border px-3 py-2.5 text-[14px] leading-6 outline-none transition focus:ring-2",
            isNote
              ? "border-amber-500/30 bg-amber-500/10 text-[var(--demo-text)] focus:border-amber-500/45 focus:ring-amber-500/20 dark:border-amber-400/30 dark:bg-amber-400/10"
              : "border-[var(--demo-border)] bg-[var(--demo-panel-2)] focus:border-accent/40 focus:ring-accent/20",
          )}
        />
      </label>

      <div className="mt-2.5 flex items-center justify-between gap-3">
        <p className="min-w-0 text-[12px] leading-4 text-[var(--demo-muted)]">
          {isNote ? "Only visible to your team." : "\u00A0"}
        </p>
        <button
          type="button"
          disabled={disabled}
          onClick={onSubmit}
          className={cn(
            "inline-flex h-9 min-w-[7.5rem] shrink-0 items-center justify-center gap-1.5 rounded-lg px-3 text-[12px] font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:cursor-not-allowed disabled:opacity-40",
            isNote
              ? "bg-amber-500/20 text-amber-900 hover:bg-amber-500/30 dark:bg-amber-400/20 dark:text-amber-100 dark:hover:bg-amber-400/30"
              : "bg-accent text-accent-foreground hover:brightness-110",
          )}
        >
          {isNote ? (
            <StickyNote className="size-3.5" aria-hidden />
          ) : (
            <Send className="size-3.5" aria-hidden />
          )}
          {isNote ? "Add note" : "Send reply"}
        </button>
      </div>
    </div>
  );
}
