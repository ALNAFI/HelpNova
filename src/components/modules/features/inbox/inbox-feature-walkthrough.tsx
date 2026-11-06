"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  CircleDot,
  GitBranch,
  Inbox,
  StickyNote,
  Users,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import {
  getInboxMoment,
  inboxFeatureConnection,
  inboxFeatureConversation,
  inboxFeatureMoments,
  inboxFeatureWalkthrough,
  type InboxMomentId,
} from "@/data/marketing/inbox-feature";
import { getGsap } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { cn } from "@/utils/cn";

export function InboxFeatureWalkthrough() {
  const [momentId, setMomentId] = useState<InboxMomentId>("resolved");
  const moment = getInboxMoment(momentId);
  const reducedMotion = usePrefersReducedMotion();
  const threadRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<{ kill: () => void } | null>(null);
  const liveRef = useRef<HTMLParagraphElement>(null);
  const groupId = useId();
  const conversation = inboxFeatureConversation;

  useEffect(() => {
    const root = threadRef.current;
    if (!root) return;

    timelineRef.current?.kill();
    timelineRef.current = null;

    if (reducedMotion || momentId !== "handoff") return;

    const { gsap } = getGsap();
    const ctx = gsap.context(() => {
      const assignment = root.querySelector(
        '[data-moment-thread="handoff"] [data-handoff-assignment]',
      );
      const note = root.querySelector(
        '[data-moment-thread="handoff"] [data-handoff-note]',
      );
      const stamp = root.querySelector(
        '[data-moment-details="handoff"] [data-owner-stamp]',
      );

      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
      timelineRef.current = tl;

      if (assignment) {
        tl.fromTo(
          assignment,
          { boxShadow: "0 0 0 0 transparent" },
          {
            boxShadow:
              "0 0 0 2px color-mix(in oklab, var(--accent) 45%, transparent)",
            duration: 0.28,
            yoyo: true,
            repeat: 1,
          },
        );
      }

      if (stamp) {
        tl.fromTo(
          stamp,
          { scale: 1.06, rotate: -7 },
          { scale: 1, rotate: -4, duration: 0.28 },
          "-=0.15",
        );
      }

      if (note) {
        tl.fromTo(
          note,
          { x: 8, autoAlpha: 0.65 },
          { x: 0, autoAlpha: 1, duration: 0.35 },
          "-=0.1",
        );
      }
    }, root);

    return () => {
      timelineRef.current?.kill();
      timelineRef.current = null;
      ctx.revert();
    };
  }, [momentId, reducedMotion]);

  function selectMoment(id: InboxMomentId) {
    setMomentId(id);
    const next = getInboxMoment(id);
    if (liveRef.current) {
      liveRef.current.textContent = `${next.label}. ${next.status}. Assigned to ${next.team}.`;
    }
  }

  return (
    <>
      <p
        ref={liveRef}
        className="sr-only"
        aria-live="polite"
        aria-atomic="true"
      />

      <section
        id={inboxFeatureWalkthrough.id}
        className="scroll-mt-28 border-y border-border bg-surface-muted/35 py-16 sm:py-20 lg:py-24"
      >
        <Container>
          <div className="mb-8 flex flex-wrap items-end justify-between gap-3">
            <SectionHeading
              title={inboxFeatureWalkthrough.title}
              description={inboxFeatureWalkthrough.instruction}
              className="mb-0 max-w-3xl"
            />
            <span className="rounded-full border border-border bg-surface px-3 py-1 font-mono text-[10px] tracking-[0.14em] text-muted uppercase">
              {conversation.sampleLabel}
            </span>
          </div>

          <div
            role="radiogroup"
            aria-label="Conversation moment"
            className="mb-6 flex flex-wrap gap-2"
          >
            {inboxFeatureMoments.map((item) => {
              const active = momentId === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  role="radio"
                  aria-checked={active}
                  id={`${groupId}-${item.id}`}
                  onClick={() => selectMoment(item.id)}
                  className={cn(
                    "inline-flex cursor-pointer items-center rounded-full border px-3.5 py-2 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    active
                      ? "border-accent/40 bg-accent text-accent-foreground"
                      : "border-border bg-surface text-muted hover:text-foreground",
                  )}
                >
                  {active ? (
                    <span
                      className="mr-1.5 size-1.5 rounded-full bg-accent-foreground"
                      aria-hidden
                    />
                  ) : null}
                  {item.label}
                </button>
              );
            })}
          </div>

          <div className="mb-4 flex flex-wrap items-center gap-2 text-sm lg:hidden">
            <StatusBadge status={moment.status} />
            <span className="rounded-full border border-border bg-surface px-2.5 py-1 text-xs font-medium">
              {moment.team}
            </span>
            <span className="text-xs text-muted">{conversation.subject}</span>
          </div>

          <div
            ref={threadRef}
            className="grid items-start gap-4 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]"
          >
            {/* Same cell for every tab. Height follows the Resolved thread box. */}
            <div className="grid min-w-0">
            {inboxFeatureMoments.map((panel) => {
              const active = momentId === panel.id;
              return (
            <article
              key={panel.id}
              data-moment-thread={panel.id}
              aria-hidden={!active}
              style={{ gridColumn: 1, gridRow: 1, alignSelf: "start" }}
              className={cn(
                "overflow-hidden rounded-[var(--radius-workspace)] border border-border bg-surface shadow-[var(--shadow-soft)]",
                active
                  ? "relative z-10 visible"
                  : "pointer-events-none invisible",
              )}
            >
              <header className="flex flex-wrap items-start justify-between gap-3 border-b border-border px-4 py-3.5 sm:px-5">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="flex size-9 items-center justify-center rounded-full bg-accent-soft text-xs font-semibold text-accent">
                      MC
                    </span>
                    <div>
                      <p className="font-heading text-base font-semibold">
                        {conversation.customerName}
                      </p>
                      <p className="text-sm text-muted">
                        {conversation.subject}
                      </p>
                    </div>
                  </div>
                </div>
                <StatusBadge status={panel.status} />
              </header>

              <div className="space-y-2.5 p-4 sm:p-5">
                {panel.items.map((item) => {
                  if (item.kind === "activity") {
                    const isResolved = item.id === "act-resolved";
                    return (
                      <div
                        key={item.id}
                        data-handoff-assignment={
                          item.id === "act-assigned" ? true : undefined
                        }
                        className="flex items-center gap-2 rounded-xl border border-border bg-surface-muted/60 px-3 py-2 text-xs text-muted transition-[box-shadow]"
                      >
                        {isResolved ? (
                          <CheckCircle2
                            className="size-3.5 text-sky-600 dark:text-sky-300"
                            aria-hidden
                          />
                        ) : (
                          <Users className="size-3.5 text-accent" aria-hidden />
                        )}
                        <span className="font-medium text-foreground">
                          {item.summary}
                        </span>
                        <span className="ml-auto font-mono text-[10px]">
                          {item.time}
                        </span>
                      </div>
                    );
                  }

                  const isNote = item.kind === "note";
                  const isCustomer = item.kind === "customer";

                  return (
                    <div
                      key={item.id}
                      data-handoff-note={isNote ? true : undefined}
                      className={cn(
                        "rounded-2xl border px-3.5 py-3",
                        isCustomer &&
                          "rounded-tl-md border-border bg-surface-muted/90",
                        item.kind === "reply" &&
                          "ml-auto max-w-[92%] border-accent/25 bg-accent/10",
                        isNote && "border-accent/30 bg-accent/10",
                      )}
                    >
                      <div className="mb-1.5 flex flex-wrap items-center gap-2">
                        <span className="text-[11px] font-medium text-muted">
                          {item.author}
                          {isCustomer
                            ? " · Customer"
                            : item.kind === "reply"
                              ? " · Support Agent"
                              : ""}
                        </span>
                        {isNote ? (
                          <span className="inline-flex items-center gap-1 rounded-md bg-accent/15 px-1.5 py-0.5 text-[10px] font-semibold tracking-wide text-accent uppercase">
                            <StickyNote className="size-3" aria-hidden />
                            Internal note
                          </span>
                        ) : null}
                        <span className="ml-auto font-mono text-[10px] text-muted">
                          {item.time}
                        </span>
                      </div>
                      <p className="text-sm leading-relaxed text-pretty">
                        {item.body}
                      </p>
                    </div>
                  );
                })}
              </div>
            </article>
              );
            })}
            </div>

            <div className="grid w-full self-start">
            {inboxFeatureMoments.map((panel) => {
              const active = momentId === panel.id;
              return (
            <aside
              key={panel.id}
              data-moment-details={panel.id}
              aria-hidden={!active}
              style={{ gridColumn: 1, gridRow: 1, alignSelf: "start" }}
              className={cn(
                "w-full rounded-[var(--radius-workspace)] border border-border bg-surface p-4 shadow-[var(--shadow-soft)] sm:p-5",
                active
                  ? "relative z-10 visible"
                  : "pointer-events-none invisible",
              )}
            >
              <h3 className="font-heading text-sm font-semibold">
                Conversation details
              </h3>

              <div className="mt-3.5 space-y-3.5 text-sm">
                <DetailRow label="Assigned team">
                  <span
                    data-owner-stamp
                    className="inline-flex rotate-[-4deg] rounded-md border-2 border-accent/50 bg-accent/10 px-2.5 py-1 font-mono text-[11px] font-bold tracking-[0.1em] text-accent uppercase"
                  >
                    {panel.team}
                  </span>
                </DetailRow>
                <DetailRow label="Topic">{conversation.topic}</DetailRow>
                <DetailRow label="Priority">
                  <span className="text-foreground">{conversation.priority}</span>
                </DetailRow>
                <div>
                  <p className="text-[11px] font-semibold tracking-[0.14em] text-muted uppercase">
                    Tags
                  </p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {conversation.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md border border-border bg-surface-muted px-2 py-0.5 text-[11px] text-muted"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="rounded-xl border border-border bg-accent/10 px-3.5 py-3.5">
                  <p className="text-[11px] font-semibold tracking-[0.14em] text-muted uppercase">
                    Current status
                  </p>
                  <p className="mt-1.5 text-sm leading-relaxed text-pretty">
                    {panel.explanation}
                  </p>
                </div>
              </div>
            </aside>
              );
            })}
            </div>
          </div>
        </Container>
      </section>

      <section className="scroll-mt-28 py-16 sm:py-20 lg:py-24">
        <Container>
          <SectionHeading
            title={inboxFeatureConnection.title}
            description={inboxFeatureConnection.description}
            className="mb-6 max-w-3xl"
          />

          <div className="grid items-stretch gap-4 md:grid-cols-2 lg:grid-cols-3">
            <ConnectionCard
              icon={GitBranch}
              title={inboxFeatureConnection.automation.title}
              copy={inboxFeatureConnection.automation.copy}
              footer={
                <Link
                  href={inboxFeatureConnection.automation.href}
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-accent transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {inboxFeatureConnection.automation.linkLabel}
                  <ArrowRight className="size-3.5" />
                </Link>
              }
            />
            <ConnectionCard
              icon={Inbox}
              title={inboxFeatureConnection.inbox.title}
              copy={inboxFeatureConnection.inbox.copy}
            />
            <ConnectionCard
              icon={Users}
              title={inboxFeatureConnection.insights.title}
              copy={inboxFeatureConnection.insights.copy}
              footer={
                <div className="rounded-xl border border-border bg-surface-muted/70 px-3 py-2">
                  <p className="text-[10px] font-semibold tracking-[0.14em] text-muted uppercase">
                    Workload overview
                  </p>
                  <p className="mt-1.5 font-heading text-sm font-semibold">
                    {moment.openContribution.label} team ·{" "}
                    {moment.openContribution.count}{" "}
                    {moment.openContribution.count === 1
                      ? "open conversation"
                      : "open conversations"}
                  </p>
                </div>
              }
            />
          </div>
        </Container>
      </section>
    </>
  );
}

function StatusBadge({ status }: { status: "Open" | "Resolved" }) {
  const open = status === "Open";
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold",
        open
          ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300"
          : "bg-sky-500/15 text-sky-700 dark:text-sky-300",
      )}
    >
      {open ? (
        <CircleDot className="size-3" aria-hidden />
      ) : (
        <CheckCircle2 className="size-3" aria-hidden />
      )}
      {status}
    </span>
  );
}

function DetailRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start justify-between gap-3">
      <p className="text-[11px] font-semibold tracking-[0.14em] text-muted uppercase">
        {label}
      </p>
      <div className="text-right font-medium text-foreground">{children}</div>
    </div>
  );
}

function ConnectionCard({
  icon: Icon,
  title,
  copy,
  footer,
}: {
  icon: typeof Inbox;
  title: string;
  copy: string;
  footer?: React.ReactNode;
}) {
  return (
    <article className="flex h-full flex-col rounded-[var(--radius-card)] border border-border bg-surface p-5 shadow-[var(--shadow-soft)]">
      <span className="flex size-9 items-center justify-center rounded-xl bg-accent-soft text-accent">
        <Icon className="size-4" aria-hidden />
      </span>
      <h3 className="mt-2.5 font-heading text-base font-semibold">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted">{copy}</p>
      {footer ? <div className="mt-3">{footer}</div> : null}
    </article>
  );
}
