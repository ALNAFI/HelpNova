"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NovaFallback } from "@/components/modules/home/inbox/nova-fallback";
import { useNovaScroll } from "@/components/modules/home/inbox/nova-scroll-context";
import {
  inboxHomeConversations,
  inboxHomeHero,
} from "@/data/marketing/home-inbox";
import { getGsap } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { cn } from "@/utils/cn";

export function InboxHero() {
  const rootRef = useRef<HTMLElement>(null);
  const reducedMotion = usePrefersReducedMotion();
  const { setFocusOffset } = useNovaScroll();
  const [activeId, setActiveId] = useState(inboxHomeConversations[0].id);
  const active =
    inboxHomeConversations.find((item) => item.id === activeId) ??
    inboxHomeConversations[0];

  useEffect(() => {
    const root = rootRef.current;
    if (!root || reducedMotion) return;
    const { gsap } = getGsap();
    const ctx = gsap.context(() => {
      gsap.fromTo(
        root.querySelectorAll("[data-ih-hero]"),
        { autoAlpha: 0, y: 22 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.07,
          ease: "power3.out",
          delay: 0.05,
        },
      );
    }, root);
    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      ref={rootRef}
      id="inbox-hero"
      className="ih-section relative overflow-x-clip overflow-y-visible pt-[var(--ih-nav-offset)] pb-16 sm:pb-24"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_65%_50%_at_15%_0%,color-mix(in_oklab,var(--accent)_18%,transparent),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_45%_40%_at_90%_30%,color-mix(in_oklab,var(--ih-cyan)_14%,transparent),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,color-mix(in_oklab,var(--accent)_16%,transparent)_1px,transparent_0)] bg-size-[26px_26px] opacity-40" />
      </div>

      <div className="relative mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-center lg:gap-8">
        <div className="max-w-xl">
          <p data-ih-hero className="ih-eyebrow">
            {inboxHomeHero.eyebrow}
          </p>
          <h1
            data-ih-hero
            className="mt-5 font-heading text-[2.35rem] leading-[1.05] font-semibold tracking-tight text-balance sm:text-[3.25rem] lg:text-[3.6rem]"
          >
            One inbox.{" "}
            <span className="text-accent">Every conversation.</span> A clearer
            way forward.
          </h1>
          <p
            data-ih-hero
            className="mt-5 max-w-lg text-base leading-7 text-muted sm:text-[1.05rem] sm:leading-8"
          >
            {inboxHomeHero.description}
          </p>
          <div data-ih-hero className="mt-8 flex flex-wrap gap-3">
            <Button href={inboxHomeHero.primaryCta.href} size="lg">
              {inboxHomeHero.primaryCta.label}
              <ArrowRight className="size-4" />
            </Button>
            <Button
              href={inboxHomeHero.secondaryCta.href}
              variant="secondary"
              size="lg"
            >
              {inboxHomeHero.secondaryCta.label}
            </Button>
          </div>

          <div data-ih-hero className="mt-8 flex flex-wrap gap-2">
            {inboxHomeConversations.map((conversation, index) => (
              <button
                key={conversation.id}
                type="button"
                onClick={() => {
                  setActiveId(conversation.id);
                  setFocusOffset(index === 0 ? -0.2 : index === 1 ? 0.15 : 0.35);
                }}
                className={cn(
                  "rounded-full border px-3 py-1.5 text-xs font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  activeId === conversation.id
                    ? "border-accent bg-accent/15 text-accent"
                    : "border-border bg-surface text-muted hover:text-foreground",
                )}
              >
                {conversation.scenario}
              </button>
            ))}
          </div>
        </div>

        <div data-ih-hero className="relative">
          <div className="absolute -top-2 -right-1 z-10 w-28 opacity-90 xl:hidden sm:w-36">
            <NovaFallback expression="curious" />
          </div>
          <div className="ih-panel relative z-0 overflow-hidden rounded-[1.6rem] p-4 sm:p-5 xl:mr-8">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-xs font-semibold tracking-[0.14em] text-muted uppercase">
                  Shared Inbox preview
                </p>
                <p className="mt-1 font-heading text-lg font-semibold">
                  {active.customer}
                </p>
              </div>
              <span className="rounded-full bg-accent/15 px-2.5 py-1 text-[11px] font-semibold text-accent">
                {active.status}
              </span>
            </div>
            <p className="mt-3 text-sm font-medium">{active.subject}</p>
            <p className="mt-1 text-sm text-muted">{active.preview}</p>
            <div className="mt-4 flex flex-wrap gap-2 text-[11px] text-muted">
              <span className="rounded-full border border-border px-2 py-1">
                {active.channel}
              </span>
              <span className="rounded-full border border-border px-2 py-1">
                {active.team}
              </span>
              <span className="rounded-full border border-border px-2 py-1">
                Priority · {active.priority}
              </span>
            </div>
            <div className="mt-4 space-y-2">
              {active.messages.slice(0, 2).map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    "rounded-2xl px-3 py-2.5 text-sm",
                    message.role === "note"
                      ? "ih-note"
                      : message.role === "customer"
                        ? "bg-surface-muted"
                        : "border border-border bg-surface",
                  )}
                >
                  <div className="flex items-center justify-between gap-2 text-[11px] text-muted">
                    <span>{message.author}</span>
                    <span>{message.time}</span>
                  </div>
                  <p className="mt-1 text-foreground/90">{message.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
