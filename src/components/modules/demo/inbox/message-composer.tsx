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

  return (
    <div
      className={cn(
        "shrink-0 border-t border-[var(--demo-border)] p-3",
        mode === "note" ? "bg-accent/5" : "bg-[var(--demo-panel)]",
      )}
    >
      <div
        role="tablist"
        aria-label="Composer mode"
        className="mb-2 inline-flex rounded-lg border border-[var(--demo-border)] bg-[var(--demo-panel-2)] p-0.5"
      >
        {(
          [
            { id: "reply", label: "Reply" },
            { id: "note", label: "Internal Note" },
          ] as const
        ).map((item) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={mode === item.id}
            onClick={() => onModeChange(item.id)}
            className={cn(
              "rounded-md px-3 py-1.5 text-xs font-medium transition",
              mode === item.id
                ? item.id === "note"
                  ? "bg-accent/20 text-accent"
                  : "bg-[var(--demo-panel)] text-[var(--demo-text)] shadow-sm"
                : "text-[var(--demo-muted)]",
            )}
          >
            {item.label}
          </button>
        ))}
      </div>

      <label className="block">
        <span className="sr-only">
          {mode === "reply" ? "Local reply message" : "Internal note"}
        </span>
        <textarea
          value={value}
          onChange={(e) =>
            mode === "reply"
              ? onReplyChange(e.target.value)
              : onNoteChange(e.target.value)
          }
          onKeyDown={(e) => {
            if ((e.metaKey || e.ctrlKey) && e.key === "Enter" && !disabled) {
              e.preventDefault();
              onSubmit();
            }
          }}
          rows={3}
          placeholder={
            mode === "reply"
              ? "Write a local reply… (demo only)"
              : "Add an internal note visible to the team…"
          }
          className={cn(
            "w-full resize-none rounded-xl border px-3 py-2.5 text-sm outline-none transition focus:ring-2",
            mode === "note"
              ? "border-accent/30 bg-accent/10 focus:border-accent/50 focus:ring-accent/25"
              : "border-[var(--demo-border)] bg-[var(--demo-panel-2)] focus:border-accent/40 focus:ring-accent/20",
          )}
        />
      </label>

      <div className="mt-2 flex items-center justify-between gap-2">
        <p className="text-[11px] text-[var(--demo-muted)]">
          {mode === "reply"
            ? "Local only — no message is delivered."
            : "Notes stay internal to this demo workspace."}
        </p>
        <button
          type="button"
          disabled={disabled}
          onClick={onSubmit}
          className={cn(
            "inline-flex h-9 items-center gap-1.5 rounded-lg px-3 text-xs font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:cursor-not-allowed disabled:opacity-40",
            mode === "note"
              ? "bg-accent/20 text-accent hover:bg-accent/30"
              : "bg-accent text-accent-foreground hover:brightness-110",
          )}
        >
          {mode === "note" ? (
            <StickyNote className="size-3.5" />
          ) : (
            <Send className="size-3.5" />
          )}
          {mode === "note" ? "Add Note" : "Send Reply"}
        </button>
      </div>
    </div>
  );
}
