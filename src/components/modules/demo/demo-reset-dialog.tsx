"use client";

import { useEffect, useId, useRef } from "react";
import { RotateCcw, X } from "lucide-react";
import { cn } from "@/utils/cn";

type DemoResetDialogProps = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

export function DemoResetDialog({
  open,
  onClose,
  onConfirm,
}: DemoResetDialogProps) {
  const titleId = useId();
  const descId = useId();
  const cancelRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement as HTMLElement | null;
    cancelRef.current?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      previous?.focus?.();
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
      <button
        type="button"
        className="absolute inset-0 bg-black/55 backdrop-blur-[2px]"
        aria-label="Dismiss reset dialog"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descId}
        className={cn(
          "relative w-full max-w-md rounded-2xl border border-[var(--demo-border)]",
          "bg-[var(--demo-panel)] p-6 shadow-2xl",
        )}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 rounded-lg p-1.5 text-[var(--demo-muted)] transition hover:bg-[var(--demo-hover)] hover:text-[var(--demo-text)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          aria-label="Close"
        >
          <X className="size-4" />
        </button>

        <div className="mb-4 flex size-11 items-center justify-center rounded-xl bg-accent/15 text-accent">
          <RotateCcw className="size-5" />
        </div>

        <h2
          id={titleId}
          className="font-heading text-xl font-semibold text-[var(--demo-text)]"
        >
          Reset the demo?
        </h2>
        <p id={descId} className="mt-2 text-sm leading-relaxed text-[var(--demo-muted)]">
          This will restore the original sample conversations, assignments, and
          activity. Theme preference is kept.
        </p>

        <div className="mt-6 flex flex-wrap justify-end gap-2">
          <button
            ref={cancelRef}
            type="button"
            onClick={onClose}
            className="h-10 rounded-lg border border-[var(--demo-border)] px-4 text-sm font-medium text-[var(--demo-text)] transition hover:bg-[var(--demo-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="h-10 rounded-lg bg-accent px-4 text-sm font-medium text-accent-foreground transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            Reset Demo
          </button>
        </div>
      </div>
    </div>
  );
}
