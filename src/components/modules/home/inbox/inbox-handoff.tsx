"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  inboxHomeConversations,
  inboxHomeHandoff,
} from "@/data/marketing/home-inbox";
import { cn } from "@/utils/cn";

export function InboxHandoff() {
  const [activeId, setActiveId] = useState<string>(
    inboxHomeHandoff.stages[0].id,
  );
  const active =
    inboxHomeHandoff.stages.find((stage) => stage.id === activeId) ??
    inboxHomeHandoff.stages[0];
  const conversation = inboxHomeConversations[0];

  return (
    <section id={inboxHomeHandoff.id} className="ih-section py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <p className="ih-eyebrow">{inboxHomeHandoff.eyebrow}</p>
          <h2 className="mt-3 font-heading text-[2rem] font-semibold tracking-tight text-balance sm:text-[2.6rem]">
            {inboxHomeHandoff.title}
          </h2>
          <p className="mt-4 text-base leading-7 text-muted">
            {inboxHomeHandoff.description}
          </p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="ih-panel rounded-[1.6rem] p-5 sm:p-6">
            <ol className="grid gap-3 sm:grid-cols-2">
              {inboxHomeHandoff.stages.map((stage, index) => {
                const selected = stage.id === activeId;
                return (
                  <li key={stage.id}>
                    <button
                      type="button"
                      onClick={() => setActiveId(stage.id)}
                      className={cn(
                        "flex h-full w-full flex-col rounded-2xl border px-4 py-4 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                        selected
                          ? "border-accent/45 bg-accent/10"
                          : "border-border bg-surface hover:bg-surface-muted",
                      )}
                    >
                      <span className="text-[11px] font-semibold tracking-[0.14em] text-muted uppercase">
                        Stage 0{index + 1}
                      </span>
                      <span className="mt-2 font-heading text-lg font-semibold">
                        {stage.label}
                      </span>
                      <span className="mt-2 text-sm text-muted">
                        {stage.detail}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ol>

            <div className="mt-6 overflow-hidden rounded-2xl border border-border bg-surface-muted/40 p-4">
              <svg
                viewBox="0 0 640 48"
                className="h-10 w-full"
                aria-hidden
              >
                <path
                  d="M20 24 H620"
                  stroke="color-mix(in oklab, var(--accent) 35%, var(--border))"
                  strokeWidth="2"
                  strokeDasharray="6 8"
                />
                {[80, 240, 400, 560].map((x, index) => (
                  <circle
                    key={x}
                    cx={x}
                    cy="24"
                    r={inboxHomeHandoff.stages[index]?.id === activeId ? 8 : 5}
                    fill={
                      inboxHomeHandoff.stages[index]?.id === activeId
                        ? "var(--accent)"
                        : "var(--ih-cyan)"
                    }
                  />
                ))}
              </svg>
              <p className="mt-2 text-sm text-muted">{active.detail}</p>
            </div>
          </div>

          <div className="rounded-[1.6rem] border border-border bg-surface p-5 shadow-[var(--shadow-soft)]">
            <p className="text-xs font-semibold tracking-[0.14em] text-muted uppercase">
              Shared Inbox destination
            </p>
            <p className="mt-2 font-heading text-xl font-semibold">
              {conversation.subject}
            </p>
            <p className="mt-2 text-sm text-muted">{conversation.context}</p>
            <div className="mt-4 rounded-2xl border border-border bg-surface-muted/50 p-3 text-sm">
              <p className="font-medium">{conversation.customer}</p>
              <p className="mt-1 text-muted">{conversation.preview}</p>
            </div>
            <div className="mt-4 flex flex-wrap gap-2 text-[11px]">
              <span className="rounded-full bg-accent/15 px-2.5 py-1 font-semibold text-accent">
                {conversation.team}
              </span>
              <span className="rounded-full border border-border px-2.5 py-1 text-muted">
                Order rule matched
              </span>
            </div>
            <Button href={inboxHomeHandoff.cta.href} className="mt-6" variant="secondary">
              {inboxHomeHandoff.cta.label}
              <ArrowRight className="size-4" />
            </Button>
            <p className="mt-4 text-xs text-muted">{inboxHomeHandoff.notice}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
