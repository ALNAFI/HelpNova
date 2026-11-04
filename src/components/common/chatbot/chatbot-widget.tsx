"use client";

import { useEffect, useId, useRef } from "react";
import { Bot, MessageCircle, RotateCcw, X } from "lucide-react";
import { useChatbot } from "@/context/chatbot-provider";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { cn } from "@/utils/cn";

export function ChatbotWidget() {
  const {
    isOpen,
    messages,
    presets,
    open,
    close,
    askPreset,
    resetSession,
    returnFocus,
  } = useChatbot();
  const reducedMotion = usePrefersReducedMotion();
  const panelId = useId();
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const launcherRef = useRef<HTMLButtonElement>(null);
  const liveRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const frame = window.requestAnimationFrame(() => {
      closeRef.current?.focus();
    });
    return () => window.cancelAnimationFrame(frame);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        close();
        returnFocus();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, close, returnFocus]);

  useEffect(() => {
    const list = listRef.current;
    if (!list || messages.length === 0) return;
    list.scrollTo({
      top: list.scrollHeight,
      behavior: reducedMotion ? "auto" : "smooth",
    });
    const latest = messages[messages.length - 1];
    if (latest?.role === "assistant" && liveRef.current) {
      liveRef.current.textContent = `Sample answer: ${latest.body}`;
    }
  }, [messages, reducedMotion]);

  function handleClose() {
    close();
    returnFocus();
  }

  function handleLauncherClick() {
    if (isOpen) {
      handleClose();
      return;
    }
    open(launcherRef.current);
  }

  function handleAsk(presetId: string) {
    askPreset(presetId);
  }

  return (
    <>
      <p
        ref={liveRef}
        className="sr-only"
        aria-live="polite"
        aria-atomic="true"
      />

      <button
        ref={launcherRef}
        type="button"
        aria-label={isOpen ? "Close sample chatbot" : "Open sample chatbot"}
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={handleLauncherClick}
        className={cn(
          "fixed right-4 bottom-20 z-50 flex size-14 items-center justify-center rounded-full transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:right-6 sm:bottom-24",
          "bg-accent text-accent-foreground shadow-[0_12px_32px_rgb(109_40_217_/_0.35)] hover:brightness-110",
        )}
      >
        {isOpen ? (
          <X className="size-5" aria-hidden />
        ) : (
          <MessageCircle className="size-5" aria-hidden />
        )}
      </button>

      {isOpen ? (
        <div
          id={panelId}
          role="dialog"
          aria-modal="false"
          aria-labelledby={titleId}
          className={cn(
            "fixed z-50 flex w-[min(100vw-1.5rem,22.5rem)] flex-col overflow-hidden rounded-[var(--radius-workspace)] border border-border bg-surface shadow-[var(--shadow-soft)]",
            "right-4 bottom-[9.25rem] max-h-[min(34rem,calc(100dvh-11rem))] sm:right-6 sm:bottom-[10.5rem]",
            !reducedMotion &&
              "origin-bottom-right transition-[opacity,transform] duration-200",
          )}
        >
          <header className="flex items-start gap-3 border-b border-border px-4 py-3.5">
            <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-accent">
              <Bot className="size-4" aria-hidden />
            </span>
            <div className="min-w-0 flex-1">
              <h2 id={titleId} className="font-heading text-sm font-semibold">
                Sample chatbot
              </h2>
              <p className="mt-0.5 text-xs text-muted">
                Six preset answers · runs locally
              </p>
            </div>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={resetSession}
                className="inline-flex size-8 items-center justify-center rounded-lg text-muted transition hover:bg-surface-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                aria-label="Reset sample conversation"
              >
                <RotateCcw className="size-3.5" aria-hidden />
              </button>
              <button
                ref={closeRef}
                type="button"
                onClick={handleClose}
                className="inline-flex size-8 items-center justify-center rounded-lg text-muted transition hover:bg-surface-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                aria-label="Close sample chatbot"
              >
                <X className="size-4" aria-hidden />
              </button>
            </div>
          </header>

          <div
            ref={listRef}
            className="min-h-0 flex-1 space-y-3 overflow-y-auto overscroll-contain px-4 py-4"
          >
            {messages.length === 0 ? (
              <div className="rounded-2xl border border-border bg-surface-muted/60 px-3.5 py-3">
                <p className="text-xs font-semibold tracking-[0.14em] text-muted uppercase">
                  Getting started
                </p>
                <p className="mt-1.5 text-sm leading-relaxed text-pretty">
                  Choose a sample question below. Each prompt shows its authored
                  answer in this panel.
                </p>
              </div>
            ) : (
              messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    "max-w-[92%] rounded-2xl border px-3.5 py-2.5",
                    message.role === "user"
                      ? "ml-auto rounded-br-md border-accent/25 bg-accent/10"
                      : "rounded-bl-md border-border bg-surface-muted/70",
                  )}
                >
                  <p className="text-[10px] font-semibold tracking-[0.12em] text-muted uppercase">
                    {message.role === "user" ? "You" : "Sample answer"}
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-pretty">
                    {message.body}
                  </p>
                </div>
              ))
            )}
          </div>

          <div className="border-t border-border bg-surface-muted/40 px-3 py-3">
            <p className="mb-2 px-1 text-[10px] font-semibold tracking-[0.14em] text-muted uppercase">
              Sample questions
            </p>
            <div className="flex max-h-40 flex-col gap-1.5 overflow-y-auto overscroll-contain">
              {presets.map((preset, index) => (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => handleAsk(preset.id)}
                  className="rounded-xl border border-border bg-surface px-3 py-2 text-left text-sm transition hover:border-accent/35 hover:bg-accent/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <span className="font-mono text-[10px] text-muted">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="mt-0.5 block leading-snug">
                    {preset.question}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
