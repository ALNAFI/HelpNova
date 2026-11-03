"use client";

import { useEffect, useId, useRef, useState } from "react";
import {
  Activity,
  Bot,
  GitBranch,
  Inbox,
  Sparkles,
  Users,
} from "lucide-react";
import { sampleConversations, volumeTrend, workloadByTeam } from "@/data/marketing/home";
import { getGsap } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { cn } from "@/utils/cn";

const tabs = [
  { id: "inbox", label: "Inbox", icon: Inbox },
  { id: "automation", label: "Automation", icon: GitBranch },
  { id: "insights", label: "Insights", icon: Activity },
] as const;

type TabId = (typeof tabs)[number]["id"];

export function HeroWorkspace() {
  const [tab, setTab] = useState<TabId>("inbox");
  const [selectedId, setSelectedId] = useState(sampleConversations[0].id);
  const panelRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();
  const tabsId = useId();
  const selected =
    sampleConversations.find((c) => c.id === selectedId) ??
    sampleConversations[0];

  useEffect(() => {
    const panel = panelRef.current;
    if (!panel || reducedMotion) return;
    const { gsap } = getGsap();
    const ctx = gsap.context(() => {
      gsap.fromTo(
        panel,
        { autoAlpha: 0.35, y: 8 },
        { autoAlpha: 1, y: 0, duration: 0.35, ease: "power2.out" },
      );
    }, panel);
    return () => ctx.revert();
  }, [tab, reducedMotion]);

  return (
    <div className="overflow-hidden rounded-[var(--radius-workspace)] border border-workspace-border bg-workspace text-workspace-text shadow-[0_40px_100px_rgb(15_13_21_/_0.45)]">
      <div className="flex flex-col gap-3 border-b border-workspace-border px-3 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-4">
        <div className="flex items-center gap-2 text-xs text-workspace-muted">
          <span className="inline-flex size-2 rounded-full bg-emerald-400" />
          Sample workspace · read-only preview
        </div>
        <div
          role="tablist"
          aria-label="Workspace views"
          className="flex rounded-full bg-white/5 p-1"
        >
          {tabs.map(({ id, label, icon: Icon }) => {
            const selectedTab = tab === id;
            return (
              <button
                key={id}
                type="button"
                role="tab"
                id={`${tabsId}-${id}`}
                aria-selected={selectedTab}
                aria-controls={`${tabsId}-panel`}
                tabIndex={selectedTab ? 0 : -1}
                className={cn(
                  "inline-flex flex-1 items-center justify-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-colors sm:flex-none sm:px-4",
                  selectedTab
                    ? "bg-accent text-accent-foreground"
                    : "text-workspace-muted hover:text-workspace-text",
                )}
                onClick={() => setTab(id)}
                onKeyDown={(event) => {
                  const index = tabs.findIndex((t) => t.id === id);
                  if (event.key === "ArrowRight") {
                    event.preventDefault();
                    setTab(tabs[(index + 1) % tabs.length].id);
                  }
                  if (event.key === "ArrowLeft") {
                    event.preventDefault();
                    setTab(tabs[(index - 1 + tabs.length) % tabs.length].id);
                  }
                }}
              >
                <Icon className="size-3.5" aria-hidden />
                {label}
              </button>
            );
          })}
        </div>
      </div>

      <div
        ref={panelRef}
        role="tabpanel"
        id={`${tabsId}-panel`}
        aria-labelledby={`${tabsId}-${tab}`}
        className="min-h-[420px] p-3 sm:p-4 lg:min-h-[480px]"
      >
        {tab === "inbox" ? (
          <div className="grid h-full gap-3 lg:grid-cols-[220px_minmax(0,1fr)_200px]">
            <div className="rounded-2xl border border-workspace-border bg-workspace-surface p-2">
              <p className="px-2 pb-2 text-[11px] font-medium uppercase tracking-[0.14em] text-workspace-muted">
                Conversations
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
                            ? "bg-accent/20 text-workspace-text"
                            : "hover:bg-white/5",
                        )}
                      >
                        <span className="block text-sm font-medium">
                          {conversation.customer}
                        </span>
                        <span className="mt-0.5 line-clamp-1 text-xs text-workspace-muted">
                          {conversation.subject}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="rounded-2xl border border-workspace-border bg-workspace-surface p-3 sm:p-4">
              <div className="mb-4 flex flex-wrap items-start justify-between gap-2 border-b border-workspace-border pb-3">
                <div>
                  <h3 className="text-sm font-semibold">{selected.subject}</h3>
                  <p className="mt-1 text-xs text-workspace-muted">
                    {selected.customer} · {selected.channel} · {selected.status}
                  </p>
                </div>
                <span className="rounded-full bg-white/5 px-2.5 py-1 text-[11px] text-workspace-muted">
                  {selected.priority} priority
                </span>
              </div>
              <div className="space-y-3">
                {selected.messages.map((message) => (
                  <div
                    key={message.id}
                    className={cn(
                      "rounded-xl px-3 py-2.5 text-sm leading-6",
                      message.role === "note"
                        ? "border border-dashed border-amber-400/30 bg-amber-400/10 text-amber-100"
                        : message.role === "agent"
                          ? "bg-accent/15"
                          : "bg-white/5",
                    )}
                  >
                    <div className="mb-1 flex items-center justify-between gap-2 text-[11px] text-workspace-muted">
                      <span>
                        {message.role === "note" ? "Internal note" : message.author}
                      </span>
                      <span>{message.time}</span>
                    </div>
                    {message.body}
                  </div>
                ))}
              </div>
            </div>

            <div className="hidden rounded-2xl border border-workspace-border bg-workspace-surface p-4 lg:block">
              <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-workspace-muted">
                Details
              </p>
              <dl className="mt-3 space-y-3 text-sm">
                <div>
                  <dt className="text-workspace-muted">Assignee</dt>
                  <dd className="mt-0.5 font-medium">{selected.assignee}</dd>
                </div>
                <div>
                  <dt className="text-workspace-muted">Team</dt>
                  <dd className="mt-0.5 font-medium">{selected.team}</dd>
                </div>
                <div>
                  <dt className="text-workspace-muted">Tags</dt>
                  <dd className="mt-1 flex flex-wrap gap-1.5">
                    {selected.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-white/5 px-2 py-0.5 text-[11px]"
                      >
                        {tag}
                      </span>
                    ))}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        ) : null}

        {tab === "automation" ? (
          <div className="grid h-full gap-4 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="rounded-2xl border border-workspace-border bg-workspace-surface p-4">
              <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.14em] text-workspace-muted">
                Trigger → Condition → Action
              </p>
              <div className="flex flex-col items-stretch gap-3 sm:items-center">
                {[
                  { label: "New Inquiry", tone: "trigger" },
                  { label: "Topic Condition", tone: "condition" },
                ].map((node) => (
                  <div key={node.label} className="flex w-full max-w-sm flex-col items-center gap-3">
                    <div className="w-full rounded-2xl border border-accent/40 bg-accent/15 px-4 py-3 text-center text-sm font-medium">
                      {node.label}
                    </div>
                    <div className="h-6 w-px bg-gradient-to-b from-accent to-white/20" />
                  </div>
                ))}
                <div className="grid w-full gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl border border-emerald-400/30 bg-emerald-400/10 p-4">
                    <p className="text-xs font-semibold text-emerald-300">Matched</p>
                    <p className="mt-2 text-sm">Assign Orders / Billing / Technical</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <p className="text-xs font-semibold text-workspace-muted">
                      Otherwise
                    </p>
                    <p className="mt-2 text-sm">Route to General Triage</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="rounded-2xl border border-workspace-border bg-workspace-surface p-4">
              <div className="mb-3 flex items-center gap-2 text-sm font-medium">
                <Bot className="size-4 text-accent" aria-hidden />
                Path inspector
              </div>
              <p className="text-sm leading-6 text-workspace-muted">
                When an order-tracking inquiry arrives, the topic condition matches
                shipping intent and assigns the Orders team. Ambiguous messages fall
                through to General Triage for a human decision.
              </p>
              <div className="mt-4 space-y-2">
                {["Orders", "Billing", "Technical", "General Triage"].map(
                  (team) => (
                    <div
                      key={team}
                      className="flex items-center justify-between rounded-xl bg-white/5 px-3 py-2 text-sm"
                    >
                      <span>{team}</span>
                      <Users className="size-3.5 text-workspace-muted" aria-hidden />
                    </div>
                  ),
                )}
              </div>
            </div>
          </div>
        ) : null}

        {tab === "insights" ? (
          <div className="grid h-full gap-3 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {[
                  ["Total", "128"],
                  ["Open", "34"],
                  ["Resolved", "94"],
                  ["Rate", "73%"],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="rounded-2xl border border-workspace-border bg-workspace-surface p-3"
                  >
                    <p className="text-[11px] text-workspace-muted">{label}</p>
                    <p className="mt-1 font-heading text-xl font-semibold">{value}</p>
                  </div>
                ))}
              </div>
              <div className="rounded-2xl border border-workspace-border bg-workspace-surface p-4">
                <div className="mb-3 flex items-center justify-between">
                  <p className="text-sm font-medium">Sample weekly volume</p>
                  <Sparkles className="size-4 text-accent" aria-hidden />
                </div>
                <div className="flex h-36 items-end gap-2">
                  {volumeTrend.map((point) => (
                    <div
                      key={point.day}
                      className="flex flex-1 flex-col items-center gap-2"
                    >
                      <div
                        className="w-full rounded-t-lg bg-gradient-to-t from-accent/40 to-accent"
                        style={{ height: `${(point.value / 28) * 100}%` }}
                      />
                      <span className="text-[10px] text-workspace-muted">
                        {point.day}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="rounded-2xl border border-workspace-border bg-workspace-surface p-4">
              <p className="text-sm font-medium">Open workload by team</p>
              <ul className="mt-4 space-y-3">
                {workloadByTeam.map((row) => (
                  <li key={row.team}>
                    <div className="mb-1 flex items-center justify-between text-xs">
                      <span>{row.team}</span>
                      <span className="text-workspace-muted">{row.open}</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-white/5">
                      <div
                        className="h-full rounded-full bg-accent"
                        style={{ width: `${(row.open / 11) * 100}%` }}
                      />
                    </div>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs text-workspace-muted">
                Illustrative sample metrics—not verified business outcomes.
              </p>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
