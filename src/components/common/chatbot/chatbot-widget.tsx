"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { Bot, MessageCircle, RotateCcw, X } from "lucide-react";
import { ChatbotComposer } from "@/components/common/chatbot/chatbot-composer";
import { ChatbotInfoTip } from "@/components/common/chatbot/chatbot-info-tip";
import { useChatbot } from "@/context/chatbot-provider";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { cn } from "@/utils/cn";

const GREETING = "Hi! What would you like to know about HelpNova?";
const NEAR_BOTTOM_PX = 72;

export function ChatbotWidget() {
  const {
    isOpen,
    messages,
    presets,
    draft,
    isPending,
    setDraft,
    open,
    close,
    sendMessage,
    askPreset,
    retryLastError,
    resetSession,
    returnFocus,
  } = useChatbot();
  const reducedMotion = usePrefersReducedMotion();
  const panelId = useId();
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const launcherRef = useRef<HTMLButtonElement>(null);
  const liveRef = useRef<HTMLParagraphElement>(null);
  const stickToBottomRef = useRef(true);
  const previousMessageCount = useRef(0);
  const [tipOpen, setTipOpen] = useState(false);

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
      if (event.key !== "Escape") return;
      // Info tip listens in capture and stops Escape while it is open.
      event.preventDefault();
      setTipOpen(false);
      close();
      returnFocus();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, close, returnFocus]);

  useEffect(() => {
    const scroller = scrollRef.current;
    if (!scroller || !isOpen) return;

    const onScroll = () => {
      const distance =
        scroller.scrollHeight - scroller.scrollTop - scroller.clientHeight;
      stickToBottomRef.current = distance <= NEAR_BOTTOM_PX;
    };

    scroller.addEventListener("scroll", onScroll, { passive: true });
    return () => scroller.removeEventListener("scroll", onScroll);
  }, [isOpen]);

  useEffect(() => {
    const scroller = scrollRef.current;
    if (!scroller || !isOpen) return;

    const grew = messages.length > previousMessageCount.current;
    const previousCount = previousMessageCount.current;
    previousMessageCount.current = messages.length;

    if (!grew && !isPending) return;

    const latest = messages[messages.length - 1];
    const userJustSent =
      grew && latest?.role === "user" && messages.length > previousCount;
    const shouldFollow = stickToBottomRef.current || userJustSent;

    if (!shouldFollow) return;

    const behavior: ScrollBehavior = reducedMotion ? "auto" : "smooth";
    window.requestAnimationFrame(() => {
      scroller.scrollTo({
        top: scroller.scrollHeight,
        behavior,
      });
      stickToBottomRef.current = true;
    });

    if (latest?.role === "assistant" && latest.status === "complete" && liveRef.current) {
      liveRef.current.textContent = `HelpNova: ${latest.body}`;
    }
  }, [messages, isPending, isOpen, reducedMotion]);

  useEffect(() => {
    if (messages.length === 0) {
      previousMessageCount.current = 0;
      stickToBottomRef.current = true;
    }
  }, [messages.length]);

  function handleClose() {
    setTipOpen(false);
    close();
    returnFocus();
  }

  function handleLauncherClick() {
    if (isOpen) {
      handleClose();
      return;
    }
    setTipOpen(false);
    open(launcherRef.current);
  }

  function handleAsk(presetId: string) {
    if (isPending) return;
    stickToBottomRef.current = true;
    void askPreset(presetId);
  }

  function handleSend(text: string) {
    stickToBottomRef.current = true;
    void sendMessage(text);
  }

  function handleRestart() {
    resetSession();
    setTipOpen(false);
    stickToBottomRef.current = true;
    if (liveRef.current) liveRef.current.textContent = "";
    window.requestAnimationFrame(() => {
      scrollRef.current?.scrollTo({ top: 0, behavior: "auto" });
    });
  }

  return (
    <div
      data-fab-item="chatbot"
      className="relative flex size-[var(--fab-slot)] items-center justify-center"
    >
      <p
        ref={liveRef}
        className="sr-only"
        aria-live="polite"
        aria-atomic="true"
      />

      <div className="relative flex size-[var(--fab-size)] items-center justify-center">
        {isOpen ? (
          <div
            id={panelId}
            data-chatbot-panel
            role="dialog"
            aria-modal="false"
            aria-labelledby={titleId}
            className={cn(
              "flex h-[min(36rem,var(--fab-panel-max-height))] flex-col overflow-hidden rounded-[var(--radius-workspace)] border border-border bg-surface shadow-[var(--shadow-soft)]",
              !reducedMotion &&
                "origin-bottom-right transition-[opacity,transform] duration-200",
            )}
          >
            <header className="flex shrink-0 items-start gap-3 border-b border-border px-4 py-3.5">
              <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-accent">
                <Bot className="size-4" aria-hidden />
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <h2
                    id={titleId}
                    className="font-heading text-sm font-semibold tracking-tight"
                  >
                    HelpNova Assistant
                  </h2>
                  <ChatbotInfoTip open={tipOpen} onOpenChange={setTipOpen} />
                </div>
                <p className="mt-0.5 text-xs text-muted">
                  Quick answers about HelpNova
                </p>
              </div>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={handleRestart}
                  className="inline-flex size-8 items-center justify-center rounded-lg text-muted transition hover:bg-surface-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  aria-label="Restart chat"
                  title="Restart chat"
                >
                  <RotateCcw className="size-3.5" aria-hidden />
                </button>
                <button
                  ref={closeRef}
                  type="button"
                  onClick={handleClose}
                  className="inline-flex size-8 items-center justify-center rounded-lg text-muted transition hover:bg-surface-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  aria-label="Close HelpNova Assistant"
                >
                  <X className="size-4" aria-hidden />
                </button>
              </div>
            </header>

            <div
              ref={scrollRef}
              className="min-h-0 flex-1 space-y-3 overflow-x-hidden overflow-y-auto overscroll-contain px-3.5 py-4 sm:px-4"
            >
              <div className="max-w-[92%] rounded-2xl rounded-bl-md border border-border bg-surface-muted/70 px-3.5 py-2.5">
                <p className="text-[10px] font-semibold tracking-[0.12em] text-muted uppercase">
                  HelpNova
                </p>
                <p className="mt-1 text-[14px] leading-[1.6] font-normal text-pretty">
                  {GREETING}
                </p>
              </div>

              {messages.map((message) => (
                <div key={message.id} className="space-y-2">
                  <div
                    data-message-id={message.id}
                    className={cn(
                      "max-w-[92%] rounded-2xl border px-3.5 py-2.5 sm:px-4",
                      message.role === "user"
                        ? "ml-auto rounded-br-md border-accent/25 bg-accent/10"
                        : "rounded-bl-md border-border bg-surface-muted/70",
                      message.status === "error" && "border-danger/35",
                    )}
                  >
                    <p className="text-[10px] font-semibold tracking-[0.12em] text-muted uppercase">
                      {message.role === "user" ? "You" : "HelpNova"}
                    </p>
                    <p
                      className={cn(
                        "mt-1 text-[14px] leading-[1.6] whitespace-pre-wrap text-pretty",
                        message.role === "user"
                          ? "font-medium"
                          : "font-normal",
                      )}
                    >
                      {message.body}
                    </p>
                    {message.status === "error" ? (
                      <button
                        type="button"
                        onClick={() => {
                          stickToBottomRef.current = true;
                          void retryLastError();
                        }}
                        disabled={isPending}
                        className="mt-2 text-[13px] font-semibold text-accent underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        Retry
                      </button>
                    ) : null}
                  </div>
                  {message.role === "assistant" &&
                  message.status === "complete" &&
                  message.cta ? (
                    <Link
                      href={message.cta.href}
                      onClick={handleClose}
                      className="inline-flex h-9 items-center rounded-lg bg-accent px-3 text-[13px] font-semibold text-accent-foreground shadow-[0_8px_20px_rgb(109_40_217_/_0.28)] transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      {message.cta.label}
                    </Link>
                  ) : null}
                </div>
              ))}

              {isPending ? (
                <div
                  className="max-w-[92%] rounded-2xl rounded-bl-md border border-border bg-surface-muted/70 px-3.5 py-2.5"
                  aria-live="polite"
                  aria-label="HelpNova is preparing a reply"
                >
                  <p className="text-[10px] font-semibold tracking-[0.12em] text-muted uppercase">
                    HelpNova
                  </p>
                  <div className="mt-2 flex items-center gap-1.5" aria-hidden>
                    <span className="size-1.5 animate-pulse rounded-full bg-muted" />
                    <span className="size-1.5 animate-pulse rounded-full bg-muted [animation-delay:150ms]" />
                    <span className="size-1.5 animate-pulse rounded-full bg-muted [animation-delay:300ms]" />
                  </div>
                </div>
              ) : null}

              <div className="pt-1">
                <p className="mb-2 px-0.5 text-[11px] font-semibold tracking-[0.08em] text-muted uppercase">
                  Suggested questions
                </p>
                <div className="flex flex-col gap-1.5">
                  {presets.map((preset) => (
                    <button
                      key={preset.id}
                      type="button"
                      disabled={isPending}
                      onClick={() => handleAsk(preset.id)}
                      className="rounded-xl border border-border bg-surface px-3 py-2.5 text-left text-[14px] font-medium leading-snug text-foreground transition hover:border-accent/35 hover:bg-accent/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-55"
                    >
                      {preset.question}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <ChatbotComposer
              draft={draft}
              isPending={isPending}
              onDraftChange={setDraft}
              onSend={handleSend}
            />
          </div>
        ) : null}

        <button
          ref={launcherRef}
          type="button"
          data-chatbot-launcher
          aria-label={
            isOpen ? "Close HelpNova Assistant" : "Open HelpNova Assistant"
          }
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={handleLauncherClick}
          className={cn(
            "relative z-[1] flex size-[var(--fab-size)] items-center justify-center rounded-full transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
            "bg-accent text-accent-foreground shadow-[0_12px_32px_rgb(109_40_217_/_0.35)] hover:brightness-110",
          )}
        >
          {isOpen ? (
            <X className="size-5" aria-hidden />
          ) : (
            <MessageCircle className="size-5" aria-hidden />
          )}
        </button>
      </div>
    </div>
  );
}
