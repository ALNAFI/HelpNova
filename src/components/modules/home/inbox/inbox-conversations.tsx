"use client";

import { useState } from "react";
import { useNovaScroll } from "@/components/modules/home/inbox/nova-scroll-context";
import {
  inboxHomeConversations,
  inboxHomeShowcase,
} from "@/data/marketing/home-inbox";
import { cn } from "@/utils/cn";

export function InboxConversations() {
  const [activeId, setActiveId] = useState(inboxHomeConversations[0].id);
  const { setFocusOffset } = useNovaScroll();
  const active =
    inboxHomeConversations.find((item) => item.id === activeId) ??
    inboxHomeConversations[0];

  return (
    <section id={inboxHomeShowcase.id} className="ih-section py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <p className="ih-eyebrow">{inboxHomeShowcase.eyebrow}</p>
          <h2 className="mt-3 font-heading text-[2rem] font-semibold tracking-tight text-balance sm:text-[2.6rem]">
            {inboxHomeShowcase.title}
          </h2>
          <p className="mt-4 text-base leading-7 text-muted">
            {inboxHomeShowcase.description}
          </p>
        </div>

        <div className="mt-10 overflow-hidden rounded-[1.75rem] border border-border bg-surface shadow-[var(--shadow-soft)]">
          <div className="grid lg:grid-cols-[0.9fr_1.25fr_0.9fr]">
            <div className="border-b border-border lg:border-r lg:border-b-0">
              <div className="border-b border-border px-4 py-3 text-xs font-semibold tracking-[0.14em] text-muted uppercase">
                Conversations
              </div>
              <ul className="p-2">
                {inboxHomeConversations.map((conversation, index) => {
                  const selected = conversation.id === activeId;
                  return (
                    <li key={conversation.id}>
                      <button
                        type="button"
                        onClick={() => {
                          setActiveId(conversation.id);
                          setFocusOffset((index - 1) * 0.25);
                        }}
                        className={cn(
                          "w-full rounded-2xl px-3 py-3 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                          selected
                            ? "bg-accent/12"
                            : "hover:bg-surface-muted",
                        )}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-sm font-semibold">
                            {conversation.customer}
                          </span>
                          <span className="text-[11px] text-muted">
                            {conversation.channel}
                          </span>
                        </div>
                        <p className="mt-1 truncate text-sm text-muted">
                          {conversation.subject}
                        </p>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="border-b border-border lg:border-r lg:border-b-0">
              <div className="border-b border-border px-4 py-3">
                <p className="font-heading text-lg font-semibold">
                  {active.subject}
                </p>
                <p className="mt-1 text-xs text-muted">
                  {active.customer} · {active.status} · {active.team}
                </p>
              </div>
              <div className="space-y-3 p-4">
                {active.messages.map((message) => (
                  <div
                    key={message.id}
                    className={cn(
                      "rounded-2xl px-3.5 py-3 text-sm",
                      message.role === "note"
                        ? "ih-note"
                        : message.role === "customer"
                          ? "bg-surface-muted"
                          : "border border-border",
                    )}
                  >
                    <div className="flex justify-between gap-2 text-[11px] text-muted">
                      <span>
                        {message.author}
                        {message.role === "note" ? " · Internal note" : ""}
                      </span>
                      <span>{message.time}</span>
                    </div>
                    <p className="mt-1">{message.body}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="border-b border-border px-4 py-3 text-xs font-semibold tracking-[0.14em] text-muted uppercase">
                Customer context
              </div>
              <div className="space-y-4 p-4">
                <div>
                  <p className="font-heading text-lg font-semibold">
                    {active.customer}
                  </p>
                  <p className="mt-1 text-sm text-muted">{active.email}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {active.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-border px-2.5 py-1 text-[11px] text-muted"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
                <div className="rounded-2xl border border-border bg-surface-muted/60 p-3 text-sm text-muted">
                  {active.context}
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="rounded-2xl border border-border p-3">
                    <p className="text-[11px] text-muted uppercase">Priority</p>
                    <p className="mt-1 font-semibold">{active.priority}</p>
                  </div>
                  <div className="rounded-2xl border border-border p-3">
                    <p className="text-[11px] text-muted uppercase">Assignee</p>
                    <p className="mt-1 font-semibold">{active.assignee}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <p className="mt-4 text-xs text-muted">{inboxHomeShowcase.notice}</p>
      </div>
    </section>
  );
}
