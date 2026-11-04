"use client";

import { useState } from "react";
import { Mail, MessageCircle, Share2 } from "lucide-react";
import { useNovaScroll } from "@/components/modules/home/inbox/nova-scroll-context";
import {
  inboxHomeChannels,
  inboxHomeConversations,
} from "@/data/marketing/home-inbox";
import { cn } from "@/utils/cn";

const icons = {
  email: Mail,
  chat: MessageCircle,
  social: Share2,
} as const;

export function InboxChannels() {
  const [activeId, setActiveId] = useState<(typeof inboxHomeChannels.items)[number]["id"]>(
    "email",
  );
  const { setFocusOffset } = useNovaScroll();
  const active =
    inboxHomeChannels.items.find((item) => item.id === activeId) ??
    inboxHomeChannels.items[0];
  const conversation =
    inboxHomeConversations.find((item) => item.id === active.conversationId) ??
    inboxHomeConversations[0];
  const Icon = icons[active.id];

  return (
    <section id={inboxHomeChannels.id} className="ih-section py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <p className="ih-eyebrow">{inboxHomeChannels.eyebrow}</p>
          <h2 className="mt-3 font-heading text-[2rem] font-semibold tracking-tight text-balance sm:text-[2.6rem]">
            {inboxHomeChannels.title}
          </h2>
          <p className="mt-4 text-base leading-7 text-muted">
            {inboxHomeChannels.description}
          </p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div
            role="tablist"
            aria-label="Communication channels"
            className="space-y-3"
          >
            {inboxHomeChannels.items.map((item, index) => {
              const ItemIcon = icons[item.id];
              const selected = item.id === activeId;
              return (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  onClick={() => {
                    setActiveId(item.id);
                    setFocusOffset(index === 0 ? -0.25 : index === 1 ? 0.1 : 0.35);
                  }}
                  className={cn(
                    "flex w-full items-start gap-3 rounded-[1.35rem] rounded-tr-md border px-4 py-4 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    selected
                      ? "border-accent/45 bg-accent/10 shadow-[var(--shadow-soft)]"
                      : "border-border bg-surface hover:bg-surface-muted",
                  )}
                >
                  <span
                    className={cn(
                      "mt-0.5 inline-flex size-10 items-center justify-center rounded-2xl",
                      selected
                        ? "bg-accent text-white"
                        : "bg-surface-muted text-accent",
                    )}
                  >
                    <ItemIcon className="size-5" aria-hidden />
                  </span>
                  <span>
                    <span className="block text-sm font-semibold tracking-[0.12em] uppercase">
                      {item.label}
                    </span>
                    <span className="mt-1 block font-heading text-lg font-semibold">
                      {item.title}
                    </span>
                    <span className="mt-1 block text-sm text-muted">
                      {item.description}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>

          <div className="ih-panel relative overflow-hidden rounded-[1.6rem] p-5 sm:p-6">
            <div className="pointer-events-none absolute -top-10 -right-8 size-40 rounded-full bg-[color-mix(in_oklab,var(--ih-cyan)_18%,transparent)] blur-3xl" />
            <div className="flex items-center gap-3">
              <span className="inline-flex size-11 items-center justify-center rounded-2xl bg-accent/15 text-accent">
                <Icon className="size-5" aria-hidden />
              </span>
              <div>
                <p className="text-xs font-semibold tracking-[0.14em] text-muted uppercase">
                  {active.label} window
                </p>
                <p className="font-heading text-xl font-semibold">
                  {conversation.subject}
                </p>
              </div>
            </div>
            <div className="mt-5 space-y-3">
              {conversation.messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    "rounded-2xl px-3.5 py-3 text-sm",
                    message.role === "note"
                      ? "ih-note"
                      : message.role === "customer"
                        ? "ml-0 mr-8 bg-surface-muted"
                        : "ml-8 border border-border bg-surface",
                  )}
                >
                  <div className="flex justify-between gap-2 text-[11px] text-muted">
                    <span>{message.author}</span>
                    <span>{message.time}</span>
                  </div>
                  <p className="mt-1">{message.body}</p>
                </div>
              ))}
            </div>
            <p className="mt-5 text-xs text-muted">{inboxHomeChannels.notice}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
