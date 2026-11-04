"use client";

import { useEffect, useState, type CSSProperties } from "react";
import Link from "next/link";
import {
  BarChart3,
  Inbox,
  Moon,
  RotateCcw,
  Sparkles,
  Sun,
  Workflow,
} from "lucide-react";
import { useDemo } from "@/context/demo-context";
import { useTheme } from "@/context/theme-provider";
import { DemoResetDialog } from "@/components/modules/demo/demo-reset-dialog";
import { InboxView } from "@/components/modules/demo/inbox/inbox-view";
import { AutomationView } from "@/components/modules/demo/automation/automation-view";
import { InsightsView } from "@/components/modules/demo/insights/insights-view";
import type { DemoView } from "@/types/demo";
import { cn } from "@/utils/cn";

const navItems: Array<{
  id: DemoView;
  label: string;
  description: string;
  icon: typeof Inbox;
}> = [
  {
    id: "inbox",
    label: "Inbox",
    description: "Shared conversations",
    icon: Inbox,
  },
  {
    id: "automation",
    label: "Automation",
    description: "Routing studio",
    icon: Workflow,
  },
  {
    id: "insights",
    label: "Insights",
    description: "Live observatory",
    icon: BarChart3,
  },
];

const viewCopy: Record<DemoView, { title: string; subtitle: string }> = {
  inbox: {
    title: "Shared Inbox",
    subtitle: "Search, assign, reply, and resolve sample conversations.",
  },
  automation: {
    title: "Automation Studio",
    subtitle: "Simulate topic routing with matched and fallback paths.",
  },
  insights: {
    title: "Insights Observatory",
    subtitle: "Live metrics derived from the same local demo state.",
  },
};

export function DemoShell() {
  const { state, dispatch } = useDemo();
  const { resolvedTheme, setTheme } = useTheme();
  const [resetOpen, setResetOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(null), 2200);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const copy = viewCopy[state.view];

  return (
    <div
      className={cn(
        "demo-app flex h-dvh min-h-0 flex-col overflow-hidden",
        "bg-[var(--demo-bg)] text-[var(--demo-text)]",
      )}
      style={
        {
          "--demo-bg": "color-mix(in oklab, var(--background) 92%, #0f0d15)",
          "--demo-panel": "var(--surface)",
          "--demo-panel-2": "var(--surface-muted)",
          "--demo-border": "var(--border)",
          "--demo-text": "var(--foreground)",
          "--demo-muted": "var(--muted)",
          "--demo-hover": "color-mix(in oklab, var(--accent) 8%, transparent)",
          "--demo-rail":
            "color-mix(in oklab, var(--surface) 88%, #171321 12%)",
        } as CSSProperties
      }
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-24 top-0 size-[28rem] rounded-full bg-accent/10 blur-3xl" />
        <div className="absolute -right-16 bottom-0 size-[24rem] rounded-full bg-violet-500/10 blur-3xl dark:bg-violet-400/10" />
      </div>

      <div className="relative flex min-h-0 flex-1">
        <aside className="hidden w-[232px] shrink-0 flex-col border-r border-[var(--demo-border)] bg-[var(--demo-rail)]/90 backdrop-blur-md lg:flex">
          <div className="border-b border-[var(--demo-border)] px-4 py-4">
            <Link
              href="/"
              className="group flex items-center gap-2.5 rounded-xl px-1 py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <span className="flex size-9 items-center justify-center rounded-xl bg-accent text-sm font-bold text-accent-foreground shadow-[0_8px_24px_rgb(109_40_217_/_0.35)]">
                HN
              </span>
              <span>
                <span className="block font-heading text-sm font-semibold tracking-tight">
                  HelpNova
                </span>
                <span className="block text-[11px] text-[var(--demo-muted)]">
                  Command Center
                </span>
              </span>
            </Link>
          </div>

          <nav
            aria-label="Demo workspace"
            className="flex flex-1 flex-col gap-1 p-3"
          >
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = state.view === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => dispatch({ type: "SET_VIEW", view: item.id })}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-left transition",
                    active
                      ? "bg-accent/15 text-[var(--demo-text)] shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--accent)_35%,transparent)]"
                      : "text-[var(--demo-muted)] hover:bg-[var(--demo-hover)] hover:text-[var(--demo-text)]",
                  )}
                >
                  {active ? (
                    <span className="absolute left-0 top-1/2 h-7 w-1 -translate-y-1/2 rounded-r-full bg-accent" />
                  ) : null}
                  <span
                    className={cn(
                      "flex size-9 items-center justify-center rounded-lg border transition",
                      active
                        ? "border-accent/30 bg-accent text-accent-foreground"
                        : "border-[var(--demo-border)] bg-[var(--demo-panel)] group-hover:border-accent/25",
                    )}
                  >
                    <Icon className="size-4" />
                  </span>
                  <span>
                    <span className="block text-sm font-medium">{item.label}</span>
                    <span className="block text-[11px] opacity-80">
                      {item.description}
                    </span>
                  </span>
                </button>
              );
            })}
          </nav>

          <div className="space-y-2 border-t border-[var(--demo-border)] p-3">
            <div className="rounded-xl border border-[var(--demo-border)] bg-[var(--demo-panel)]/80 px-3 py-2.5">
              <div className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.14em] text-accent">
                <Sparkles className="size-3.5" />
                Interactive Demo
              </div>
              <p className="mt-1.5 text-xs leading-relaxed text-[var(--demo-muted)]">
                Local simulation only. Nothing is sent or stored as a real ticket.
              </p>
            </div>
            <Link
              href="/"
              className="block rounded-lg px-3 py-2 text-xs text-[var(--demo-muted)] transition hover:bg-[var(--demo-hover)] hover:text-[var(--demo-text)]"
            >
              ← Back to HelpNova
            </Link>
          </div>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="flex shrink-0 items-center justify-between gap-3 border-b border-[var(--demo-border)] bg-[var(--demo-panel)]/80 px-3 py-3 backdrop-blur-md sm:px-5">
            <div className="min-w-0">
              <div className="flex items-center gap-2 lg:hidden">
                <span className="flex size-8 items-center justify-center rounded-lg bg-accent text-xs font-bold text-accent-foreground">
                  HN
                </span>
                <span className="rounded-full border border-accent/25 bg-accent/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-accent">
                  Interactive Demo
                </span>
              </div>
              <h1 className="mt-1 truncate font-heading text-lg font-semibold tracking-tight sm:text-xl">
                {copy.title}
              </h1>
              <p className="hidden truncate text-xs text-[var(--demo-muted)] sm:block">
                {copy.subtitle}
              </p>
            </div>

            <div className="flex shrink-0 items-center gap-2">
              <button
                type="button"
                onClick={() =>
                  setTheme(resolvedTheme === "dark" ? "light" : "dark")
                }
                className="inline-flex size-9 items-center justify-center rounded-lg border border-[var(--demo-border)] bg-[var(--demo-panel)] text-[var(--demo-muted)] transition hover:text-[var(--demo-text)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                aria-label={
                  resolvedTheme === "dark"
                    ? "Switch to light theme"
                    : "Switch to dark theme"
                }
              >
                {resolvedTheme === "dark" ? (
                  <Sun className="size-4" />
                ) : (
                  <Moon className="size-4" />
                )}
              </button>
              <button
                type="button"
                onClick={() => setResetOpen(true)}
                className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-[var(--demo-border)] bg-[var(--demo-panel)] px-3 text-xs font-medium text-[var(--demo-text)] transition hover:bg-[var(--demo-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                <RotateCcw className="size-3.5" />
                <span className="hidden sm:inline">Reset Demo</span>
              </button>
            </div>
          </header>

          <main className="relative min-h-0 flex-1 overflow-hidden">
            {state.view === "inbox" ? <InboxView /> : null}
            {state.view === "automation" ? <AutomationView /> : null}
            {state.view === "insights" ? <InsightsView /> : null}
          </main>

          <nav
            aria-label="Mobile demo views"
            className="flex shrink-0 border-t border-[var(--demo-border)] bg-[var(--demo-panel)]/95 px-2 py-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] backdrop-blur-md lg:hidden"
          >
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = state.view === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => dispatch({ type: "SET_VIEW", view: item.id })}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "flex flex-1 flex-col items-center gap-1 rounded-xl px-2 py-2 text-[11px] font-medium transition",
                    active
                      ? "bg-accent/15 text-accent"
                      : "text-[var(--demo-muted)]",
                  )}
                >
                  <Icon className="size-4" />
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      <DemoResetDialog
        open={resetOpen}
        onClose={() => setResetOpen(false)}
        onConfirm={() => {
          dispatch({ type: "RESET_DEMO" });
          setResetOpen(false);
          setToast("Demo restored to the original sample state.");
        }}
      />

      {toast ? (
        <div
          role="status"
          className="pointer-events-none fixed bottom-20 left-1/2 z-[90] -translate-x-1/2 rounded-full border border-[var(--demo-border)] bg-[var(--demo-panel)] px-4 py-2 text-xs font-medium shadow-lg lg:bottom-6"
        >
          {toast}
        </div>
      ) : null}
    </div>
  );
}
