"use client";

import { useState } from "react";
import {
  inboxHomeCollaboration,
  inboxHomeConversations,
} from "@/data/marketing/home-inbox";
import { cn } from "@/utils/cn";

export function InboxCollaboration() {
  const [activeId, setActiveId] = useState("assignment");
  const active =
    inboxHomeCollaboration.concepts.find((item) => item.id === activeId) ??
    inboxHomeCollaboration.concepts[0];
  const conversation = inboxHomeConversations[0];

  return (
    <section id={inboxHomeCollaboration.id} className="ih-section py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <p className="ih-eyebrow">{inboxHomeCollaboration.eyebrow}</p>
          <h2 className="mt-3 font-heading text-[2rem] font-semibold tracking-tight text-balance sm:text-[2.6rem]">
            {inboxHomeCollaboration.title}
          </h2>
          <p className="mt-4 text-base leading-7 text-muted">
            {inboxHomeCollaboration.description}
          </p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <div role="tablist" aria-label="Collaboration concepts" className="space-y-2">
            {inboxHomeCollaboration.concepts.map((concept) => {
              const selected = concept.id === activeId;
              return (
                <button
                  key={concept.id}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  onClick={() => setActiveId(concept.id)}
                  className={cn(
                    "w-full rounded-[1.25rem] border px-4 py-4 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    selected
                      ? "border-accent/45 bg-accent/10"
                      : "border-border bg-surface hover:bg-surface-muted",
                  )}
                >
                  <span className="text-xs font-semibold tracking-[0.14em] text-accent uppercase">
                    {concept.label}
                  </span>
                  <span className="mt-1 block font-heading text-lg font-semibold">
                    {concept.title}
                  </span>
                  <span className="mt-1 block text-sm text-muted">
                    {concept.description}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="ih-panel relative overflow-hidden rounded-[1.6rem] p-5 sm:p-6">
            <div className="absolute top-0 right-0 h-32 w-32 translate-x-8 -translate-y-8 rounded-full bg-[color-mix(in_oklab,var(--accent)_18%,transparent)] blur-3xl" />
            <p className="text-xs font-semibold tracking-[0.14em] text-muted uppercase">
              Collaboration stage · {active.label}
            </p>
            <p className="mt-2 font-heading text-xl font-semibold">
              {conversation.subject}
            </p>

            {activeId === "assignment" ? (
              <div className="mt-5 rounded-2xl border border-border bg-surface p-4">
                <p className="text-sm text-muted">Assigned team</p>
                <p className="mt-1 font-heading text-2xl font-semibold text-accent">
                  {conversation.team}
                </p>
                <p className="mt-2 text-sm text-muted">
                  Owner illustrated as {conversation.assignee}
                </p>
                <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-surface-muted">
                  <div className="h-full w-2/3 rounded-full bg-gradient-to-r from-accent to-[var(--ih-cyan)]" />
                </div>
              </div>
            ) : null}

            {activeId === "notes" ? (
              <div className="ih-note mt-5 rounded-2xl p-4">
                <p className="text-[11px] font-semibold tracking-[0.12em] text-accent uppercase">
                  Internal note · Team only
                </p>
                <p className="mt-2 text-sm">
                  {conversation.messages.find((m) => m.role === "note")?.body}
                </p>
                <p className="mt-3 text-xs text-muted">
                  Visually distinct from customer replies in this concept.
                </p>
              </div>
            ) : null}

            {activeId === "handoff" ? (
              <div className="mt-5 space-y-3">
                {["General Triage", "Orders", "Jordan Lee"].map((step, index) => (
                  <div
                    key={step}
                    className="flex items-center gap-3 rounded-2xl border border-border bg-surface px-4 py-3"
                  >
                    <span className="inline-flex size-8 items-center justify-center rounded-full bg-accent/15 text-sm font-semibold text-accent">
                      {index + 1}
                    </span>
                    <span className="text-sm font-medium">{step}</span>
                  </div>
                ))}
              </div>
            ) : null}

            <p className="mt-5 text-xs text-muted">
              {inboxHomeCollaboration.notice}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
