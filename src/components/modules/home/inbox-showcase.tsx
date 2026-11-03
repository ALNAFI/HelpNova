"use client";

import { useState } from "react";
import { MessageSquareText, StickyNote, UserRound } from "lucide-react";
import { Reveal } from "@/components/common/reveal";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { sampleConversations } from "@/data/marketing/home";
import { cn } from "@/utils/cn";

export function InboxShowcase() {
  const [selectedId, setSelectedId] = useState(sampleConversations[0].id);
  const selected =
    sampleConversations.find((c) => c.id === selectedId) ??
    sampleConversations[0];

  return (
    <section id="inbox" className="scroll-mt-28 py-16 sm:py-20 lg:py-24">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
          <Reveal>
            <SectionHeading
              eyebrow="Unified inbox"
              title="One queue for every customer conversation"
              description="Browse sample threads, see assignments, and read internal notes—exactly the kind of clarity a shared inbox should feel like."
            />
            <ul className="mt-8 space-y-4">
              {[
                {
                  icon: MessageSquareText,
                  title: "Channel-aware threads",
                  copy: "Email, chat, and social sit in one prioritized list.",
                },
                {
                  icon: UserRound,
                  title: "Clear ownership",
                  copy: "Assignees and teams stay visible beside every conversation.",
                },
                {
                  icon: StickyNote,
                  title: "Internal notes",
                  copy: "Private context stays visually distinct from customer replies.",
                },
              ].map((item) => (
                <li key={item.title} className="flex gap-3">
                  <span className="mt-0.5 inline-flex size-9 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-accent">
                    <item.icon className="size-4" aria-hidden />
                  </span>
                  <div>
                    <p className="font-medium text-foreground">{item.title}</p>
                    <p className="mt-1 text-sm text-muted">{item.copy}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.1} className="min-w-0">
            <div className="overflow-hidden rounded-[var(--radius-workspace)] border border-border bg-surface shadow-[var(--shadow-soft)]">
              <div className="grid md:grid-cols-[200px_minmax(0,1fr)]">
                <div className="border-b border-border bg-surface-muted/50 p-3 md:border-b-0 md:border-r">
                  <p className="px-2 pb-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
                    Sample threads
                  </p>
                  <ul className="space-y-1">
                    {sampleConversations.map((conversation) => {
                      const active = conversation.id === selected.id;
                      return (
                        <li key={conversation.id}>
                          <button
                            type="button"
                            onClick={() => setSelectedId(conversation.id)}
                            className={cn(
                              "w-full rounded-xl px-3 py-2.5 text-left transition-colors",
                              active
                                ? "bg-accent text-accent-foreground"
                                : "hover:bg-surface",
                            )}
                          >
                            <span className="block text-sm font-medium">
                              {conversation.customer}
                            </span>
                            <span
                              className={cn(
                                "mt-0.5 line-clamp-1 text-xs",
                                active
                                  ? "text-accent-foreground/80"
                                  : "text-muted",
                              )}
                            >
                              {conversation.subject}
                            </span>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                <div className="p-4 sm:p-5">
                  <div className="mb-4 flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-accent-soft px-2.5 py-1 text-[11px] font-medium text-accent">
                      {selected.status}
                    </span>
                    <span className="rounded-full bg-surface-muted px-2.5 py-1 text-[11px] text-muted">
                      {selected.team}
                    </span>
                    <span className="rounded-full bg-surface-muted px-2.5 py-1 text-[11px] text-muted">
                      {selected.assignee}
                    </span>
                  </div>
                  <h3 className="font-heading text-lg font-semibold">
                    {selected.subject}
                  </h3>
                  <p className="mt-1 text-sm text-muted">
                    {selected.email} · {selected.channel}
                  </p>
                  <div className="mt-5 space-y-3">
                    {selected.messages.map((message) => (
                      <div
                        key={message.id}
                        className={cn(
                          "rounded-2xl px-3.5 py-3 text-sm leading-6",
                          message.role === "note"
                            ? "border border-dashed border-warning/40 bg-warning/10"
                            : "border border-border bg-surface-muted/60",
                        )}
                      >
                        <div className="mb-1 flex justify-between gap-3 text-[11px] text-muted">
                          <span>
                            {message.role === "note"
                              ? "Internal note"
                              : message.author}
                          </span>
                          <span>{message.time}</span>
                        </div>
                        {message.body}
                      </div>
                    ))}
                  </div>
                  <p className="mt-4 text-xs text-muted">
                    Read-only marketing preview—replies are not sent.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
