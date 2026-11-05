"use client";

import {
  useEffect,
  useId,
  useRef,
  type FormEvent,
  type KeyboardEvent,
} from "react";
import { SendHorizontal } from "lucide-react";
import { cn } from "@/utils/cn";

const MAX_TEXTAREA_PX = 120;

type ChatbotComposerProps = {
  draft: string;
  isPending: boolean;
  onDraftChange: (value: string) => void;
  onSend: (text: string) => void;
};

export function ChatbotComposer({
  draft,
  isPending,
  onDraftChange,
  onSend,
}: ChatbotComposerProps) {
  const labelId = useId();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const canSend = draft.trim().length > 0 && !isPending;

  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, MAX_TEXTAREA_PX)}px`;
  }, [draft]);

  function submitDraft() {
    const text = draft.trim();
    if (!text || isPending) return;
    onSend(text);
    onDraftChange("");
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    submitDraft();
  }

  function handleKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key !== "Enter") return;
    if (event.nativeEvent.isComposing || event.keyCode === 229) return;
    if (event.shiftKey) return;
    event.preventDefault();
    submitDraft();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="shrink-0 border-t border-border bg-surface px-3 py-2.5 sm:px-3.5"
    >
      <label id={labelId} className="sr-only">
        Ask about HelpNova
      </label>
      <div
        data-chatbot-composer
        className={cn(
          "flex items-end gap-2 rounded-xl border border-border bg-surface-muted/50 p-1.5 transition-[box-shadow]",
          "focus-within:ring-2 focus-within:ring-accent/40 focus-within:ring-offset-0",
        )}
      >
        <textarea
          ref={textareaRef}
          rows={1}
          value={draft}
          aria-labelledby={labelId}
          aria-busy={isPending || undefined}
          placeholder="Ask about HelpNova…"
          onChange={(event) => onDraftChange(event.target.value)}
          onKeyDown={handleKeyDown}
          className={cn(
            "max-h-[120px] min-h-[36px] flex-1 resize-none border-0 bg-transparent px-2.5 py-2 text-[14px] leading-[1.45] text-foreground shadow-none placeholder:text-muted",
            "outline-none focus:border-0 focus:outline-none focus:ring-0 focus:shadow-none",
            "focus-visible:border-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:shadow-none",
          )}
        />
        <button
          type="submit"
          disabled={!canSend}
          aria-label="Send message"
          className={cn(
            "inline-flex size-9 shrink-0 items-center justify-center rounded-lg transition",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-surface",
            canSend
              ? "bg-accent text-accent-foreground hover:brightness-110"
              : "cursor-not-allowed bg-surface-muted text-muted",
          )}
        >
          <SendHorizontal className="size-4" aria-hidden />
        </button>
      </div>
    </form>
  );
}
