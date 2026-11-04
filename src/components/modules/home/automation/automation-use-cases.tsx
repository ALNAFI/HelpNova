"use client";

import { useState } from "react";
import { AlertTriangle, GitBranch, Tags } from "lucide-react";
import { automationHomeUseCases } from "@/data/marketing/home-automation";
import { cn } from "@/utils/cn";

const icons = {
  routing: GitBranch,
  tagging: Tags,
  escalation: AlertTriangle,
} as const;

export function AutomationUseCases() {
  const [activeId, setActiveId] = useState<string>(
    automationHomeUseCases.items[0].id,
  );
  const active =
    automationHomeUseCases.items.find((item) => item.id === activeId) ??
    automationHomeUseCases.items[0];
  const Icon = icons[active.id as keyof typeof icons] ?? GitBranch;

  return (
    <section id={automationHomeUseCases.id} className="au-section py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <p className="au-eyebrow">One inquiry. Multiple possibilities.</p>
          <h2 className="mt-3 font-heading text-[2rem] font-semibold tracking-tight text-balance sm:text-[2.6rem]">
            {automationHomeUseCases.title}
          </h2>
          <p className="mt-4 text-base leading-7 text-muted">
            {automationHomeUseCases.description}
          </p>
        </div>

        <div className="mt-10 grid gap-4 lg:grid-cols-[14rem_minmax(0,1fr)_minmax(0,0.9fr)]">
          <div
            role="tablist"
            aria-label="Automation use cases"
            className="flex gap-2 lg:flex-col"
          >
            {automationHomeUseCases.items.map((item) => {
              const selected = item.id === activeId;
              return (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  onClick={() => setActiveId(item.id)}
                  className={cn(
                    "rounded-2xl border px-4 py-3 text-left text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    selected
                      ? "border-accent/40 bg-accent text-accent-foreground"
                      : "au-panel text-muted hover:text-foreground",
                  )}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          <div className="au-panel relative min-h-[16rem] overflow-hidden rounded-[1.5rem] p-5">
            <div className="absolute inset-0 opacity-40" aria-hidden>
              <svg viewBox="0 0 400 260" className="h-full w-full">
                <path
                  d="M40 130 C120 40, 200 220, 360 110"
                  fill="none"
                  stroke={
                    activeId === "routing"
                      ? "var(--accent)"
                      : "var(--border)"
                  }
                  strokeWidth="2"
                />
                <path
                  d="M40 150 C140 180, 220 80, 360 160"
                  fill="none"
                  stroke={
                    activeId === "tagging"
                      ? "var(--au-cyan)"
                      : "var(--border)"
                  }
                  strokeWidth="2"
                  strokeDasharray="5 5"
                />
                <path
                  d="M40 170 C160 240, 240 40, 360 190"
                  fill="none"
                  stroke={
                    activeId === "escalation"
                      ? "var(--au-lavender)"
                      : "var(--border)"
                  }
                  strokeWidth="2"
                />
              </svg>
            </div>
            <div className="relative">
              <p className="text-[11px] font-semibold tracking-[0.14em] text-muted uppercase">
                Control room
              </p>
              <p className="mt-3 font-heading text-xl font-semibold">
                {active.title}
              </p>
              <p className="mt-2 max-w-md text-sm leading-relaxed text-muted">
                {active.body}
              </p>
            </div>
          </div>

          <div className="au-panel rounded-[1.5rem] p-5">
            <span className="flex size-10 items-center justify-center rounded-xl bg-accent-soft text-accent">
              <Icon className="size-4" aria-hidden />
            </span>
            <p className="mt-4 font-heading text-lg font-semibold">
              {active.label}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              {active.detail}
            </p>
            <p className="mt-4 text-xs text-muted">
              Read-only marketing preview · no live routing.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
