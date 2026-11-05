"use client";

import { useEffect, useRef } from "react";
import {
  BarChart3,
  CheckCircle2,
  MessageSquareText,
  StickyNote,
  UserRound,
} from "lucide-react";
import { getGsap } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { cn } from "@/utils/cn";

export type MissionConceptId =
  | "conversations"
  | "workflows"
  | "context"
  | "insights";

/** Internally consistent insight figures: 12 open + 28 resolved = 40 total → 70%. */
const INSIGHTS = {
  open: 12,
  resolved: 28,
  total: 40,
  resolutionRate: 70,
  teams: [
    { name: "Orders", open: 5 },
    { name: "Billing", open: 4 },
    { name: "Technical", open: 3 },
  ],
} as const;

export function AboutMissionVisual({
  activeId,
  className,
}: {
  activeId: MissionConceptId;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[1.25rem] border border-border bg-[linear-gradient(160deg,color-mix(in_oklab,var(--accent-soft)_70%,transparent),var(--surface)_46%,color-mix(in_oklab,var(--surface-muted)_80%,transparent))]",
        "shadow-[inset_0_1px_0_color-mix(in_oklab,var(--accent)_10%,transparent)]",
        className,
      )}
    >
      <div
        className="pointer-events-none absolute top-[-20%] right-[-8%] size-40 rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--accent)_22%,transparent),transparent_70%)] blur-2xl"
        aria-hidden
      />
      <div className="relative p-4 sm:p-5">
        {activeId === "conversations" ? <ConversationsVisual /> : null}
        {activeId === "workflows" ? <WorkflowsVisual /> : null}
        {activeId === "context" ? <ContextVisual /> : null}
        {activeId === "insights" ? <InsightsVisual /> : null}
      </div>
    </div>
  );
}

function ConversationsVisual() {
  const rootRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const root = rootRef.current;
    if (!root || reducedMotion) return;
    const { gsap } = getGsap();
    const items = root.querySelectorAll<HTMLElement>("[data-mission-msg]");
    const ctx = gsap.context(() => {
      gsap.set(items, { autoAlpha: 0, y: 10 });
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 1.1 });
      tl.to(items, {
        autoAlpha: 1,
        y: 0,
        duration: 0.45,
        stagger: 0.28,
        ease: "power2.out",
      }).to({}, { duration: 1.8 });
    }, root);
    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <div ref={rootRef} className="space-y-2.5" aria-hidden>
      <div className="flex items-center gap-2">
        <span className="inline-flex size-7 items-center justify-center rounded-full bg-accent text-[10px] font-semibold text-accent-foreground">
          MC
        </span>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-foreground">
            Maya Chen
          </p>
          <p className="flex items-center gap-1 text-[11px] text-muted">
            <MessageSquareText className="size-3" />
            Shared thread
          </p>
        </div>
      </div>

      <div
        data-mission-msg
        className={cn(
          "max-w-[92%] rounded-2xl rounded-tl-md border border-border bg-surface-muted/70 px-3 py-2 text-[12px] leading-5 text-foreground",
          reducedMotion && "opacity-100",
          !reducedMotion && "opacity-0",
        )}
      >
        My order hasn’t arrived. Can you check the delivery status?
      </div>

      <div
        data-mission-msg
        className={cn(
          "ml-auto max-w-[88%] rounded-2xl rounded-tr-md bg-accent/15 px-3 py-2 text-[12px] leading-5 text-foreground",
          reducedMotion && "opacity-100",
          !reducedMotion && "opacity-0",
        )}
      >
        Thanks, Maya — I’m checking the tracking details now.
      </div>

      <div
        data-mission-msg
        className={cn(
          "rounded-xl border border-dashed border-accent/35 bg-accent-soft/40 px-3 py-2",
          reducedMotion && "opacity-100",
          !reducedMotion && "opacity-0",
        )}
      >
        <p className="flex items-center gap-1.5 text-[10px] font-semibold tracking-[0.12em] text-accent uppercase">
          <StickyNote className="size-3" />
          Internal note
        </p>
        <p className="mt-1 text-[12px] leading-5 text-foreground">
          Tracking linked for Orders · carrier scan delayed overnight.
        </p>
      </div>
    </div>
  );
}

function WorkflowsVisual() {
  const rootRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const root = rootRef.current;
    if (!root || reducedMotion) return;
    const { gsap } = getGsap();
    const nodes = root.querySelectorAll<HTMLElement>("[data-mission-node]");
    const paths = root.querySelectorAll<HTMLElement>("[data-mission-path]");
    const ctx = gsap.context(() => {
      gsap.set(nodes, { autoAlpha: 0.4, y: 6 });
      gsap.set(paths, { scaleY: 0, transformOrigin: "top center" });
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.85 });
      tl.to(nodes[0], { autoAlpha: 1, y: 0, duration: 0.35, ease: "power2.out" })
        .to(paths[0], { scaleY: 1, duration: 0.28, ease: "power1.inOut" }, "-=0.05")
        .to(nodes[1], { autoAlpha: 1, y: 0, duration: 0.35, ease: "power2.out" })
        .to(paths[1], { scaleY: 1, duration: 0.28, ease: "power1.inOut" }, "-=0.05")
        .to(nodes[2], { autoAlpha: 1, y: 0, duration: 0.4, ease: "power2.out" })
        .to({}, { duration: 1.35 })
        .add(() => {
          gsap.set(nodes, { autoAlpha: 0.4, y: 6 });
          gsap.set(paths, { scaleY: 0 });
        });
    }, root);
    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <div ref={rootRef} className="flex flex-col items-stretch gap-0" aria-hidden>
      <WorkflowNode
        label="Incoming inquiry"
        title="Order delivery question"
        accent={false}
      />
      <WorkflowPath />
      <WorkflowNode
        label="Topic condition"
        title="Matches · Orders"
        accent={false}
      />
      <WorkflowPath />
      <WorkflowNode
        label="Assigned team"
        title="Orders team"
        accent
      />
    </div>
  );
}

function WorkflowNode({
  label,
  title,
  accent,
}: {
  label: string;
  title: string;
  accent: boolean;
}) {
  return (
    <div
      data-mission-node
      className={cn(
        "rounded-xl border px-3 py-2.5",
        accent
          ? "border-accent/40 bg-accent text-accent-foreground"
          : "border-border bg-surface/95",
      )}
    >
      <p
        className={cn(
          "text-[10px] font-medium tracking-[0.08em] uppercase",
          accent ? "opacity-80" : "text-muted",
        )}
      >
        {label}
      </p>
      <p
        className={cn(
          "mt-0.5 text-[13px] font-semibold",
          accent ? "text-accent-foreground" : "text-foreground",
        )}
      >
        {title}
      </p>
    </div>
  );
}

function WorkflowPath() {
  return (
    <div className="flex justify-center py-1" aria-hidden>
      <span
        data-mission-path
        className="block h-4 w-px origin-top bg-accent/55"
      />
    </div>
  );
}

function ContextVisual() {
  const rootRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const root = rootRef.current;
    if (!root || reducedMotion) return;
    const { gsap } = getGsap();
    const rows = root.querySelectorAll<HTMLElement>("[data-mission-row]");
    const ctx = gsap.context(() => {
      gsap.set(rows, { autoAlpha: 0, x: 8 });
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 1.2 });
      tl.to(rows, {
        autoAlpha: 1,
        x: 0,
        duration: 0.4,
        stagger: 0.12,
        ease: "power2.out",
      }).to({}, { duration: 1.8 });
    }, root);
    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <div ref={rootRef} className="space-y-3" aria-hidden>
      <div className="flex items-center gap-3 rounded-xl border border-border bg-surface/95 p-3">
        <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent">
          <UserRound className="size-4" />
        </span>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-foreground">Maya Chen</p>
          <p className="truncate text-[11px] text-muted">
            maya.chen@email.com · Customer since 2024
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {[
          ["Order", "#48291"],
          ["Status", "In transit"],
          ["Priority", "Normal"],
          ["Team", "Orders"],
        ].map(([label, value]) => (
          <div
            key={label}
            data-mission-row
            className={cn(
              "rounded-lg border border-border/80 bg-surface-muted/45 px-2.5 py-2",
              !reducedMotion && "opacity-0",
            )}
          >
            <p className="text-[10px] text-muted">{label}</p>
            <p className="mt-0.5 text-[12px] font-semibold text-foreground">
              {value}
            </p>
          </div>
        ))}
      </div>

      <div
        data-mission-row
        className={cn(
          "rounded-xl border border-border bg-surface/95 px-3 py-2.5",
          !reducedMotion && "opacity-0",
        )}
      >
        <p className="text-[10px] font-semibold tracking-[0.12em] text-muted uppercase">
          Recent history
        </p>
        <ul className="mt-2 space-y-1.5">
          <li className="flex items-start gap-2 text-[12px] leading-5 text-foreground">
            <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-accent" />
            Asked about delayed delivery
          </li>
          <li className="flex items-start gap-2 text-[12px] leading-5 text-muted">
            <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-border" />
            Tracking details shared with Orders
          </li>
        </ul>
      </div>
    </div>
  );
}

function InsightsVisual() {
  const rootRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const root = rootRef.current;
    if (!root || reducedMotion) return;
    const { gsap } = getGsap();
    const bars = root.querySelectorAll<HTMLElement>("[data-mission-bar]");
    const fill = root.querySelector<HTMLElement>("[data-mission-fill]");
    const ctx = gsap.context(() => {
      gsap.set(bars, { scaleY: 0, transformOrigin: "bottom center" });
      gsap.set(fill, { scaleX: 0, transformOrigin: "left center" });
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 1.1 });
      tl.to(bars, {
        scaleY: 1,
        duration: 0.55,
        stagger: 0.08,
        ease: "power2.out",
      })
        .to(
          fill,
          { scaleX: 1, duration: 0.55, ease: "power2.out" },
          "-=0.35",
        )
        .to({}, { duration: 1.6 });
    }, root);
    return () => ctx.revert();
  }, [reducedMotion]);

  const maxOpen = Math.max(...INSIGHTS.teams.map((t) => t.open));

  return (
    <div ref={rootRef} className="space-y-3" aria-hidden>
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 text-accent">
          <BarChart3 className="size-3.5" />
          <p className="text-[10px] font-semibold tracking-[0.12em] uppercase">
            Overview
          </p>
        </div>
        <span className="inline-flex items-center gap-1 rounded-full border border-accent/30 bg-accent-soft/70 px-2 py-0.5 text-[11px] font-semibold text-accent">
          <CheckCircle2 className="size-3" />
          {INSIGHTS.resolutionRate}% resolved
        </span>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {[
          ["Open", INSIGHTS.open],
          ["Resolved", INSIGHTS.resolved],
          ["Total", INSIGHTS.total],
        ].map(([label, value]) => (
          <div
            key={label}
            className="rounded-lg border border-border/80 bg-surface/95 px-2.5 py-2 text-center"
          >
            <p className="text-[10px] text-muted">{label}</p>
            <p className="mt-0.5 font-heading text-lg font-semibold text-foreground">
              {value}
            </p>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-border bg-surface/95 p-3">
        <p className="text-[10px] font-semibold tracking-[0.12em] text-muted uppercase">
          Open by team
        </p>
        <div className="mt-3 flex h-16 items-end gap-2.5">
          {INSIGHTS.teams.map((team, index) => (
            <div key={team.name} className="flex min-w-0 flex-1 flex-col items-center gap-1.5">
              <span
                data-mission-bar
                className={cn(
                  "w-full max-w-[2.25rem] rounded-sm",
                  index === 0 ? "bg-accent" : "bg-accent-soft",
                  reducedMotion && "opacity-100",
                )}
                style={{ height: `${(team.open / maxOpen) * 100}%` }}
              />
              <span className="truncate text-[10px] text-muted">{team.name}</span>
              <span className="text-[11px] font-semibold text-foreground">
                {team.open}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-lg border border-border/80 bg-surface-muted/40 px-3 py-2">
        <div className="flex items-center justify-between gap-2 text-[11px]">
          <span className="text-muted">Resolution progress</span>
          <span className="font-semibold text-foreground">
            {INSIGHTS.resolved}/{INSIGHTS.total}
          </span>
        </div>
        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-border">
          <span
            data-mission-fill
            className="block h-full rounded-full bg-accent"
            style={{
              width: `${INSIGHTS.resolutionRate}%`,
              ...(reducedMotion ? {} : { transform: "scaleX(0)" }),
            }}
          />
        </div>
      </div>
    </div>
  );
}
