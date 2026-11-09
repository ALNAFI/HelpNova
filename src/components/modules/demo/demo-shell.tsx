"use client";

import {
  useEffect,
  useId,
  useRef,
  useState,
  useSyncExternalStore,
  type CSSProperties,
} from "react";
import Link from "next/link";
import {
  ArrowLeft,
  BarChart3,
  Inbox,
  Moon,
  MoreHorizontal,
  PanelLeftClose,
  PanelLeftOpen,
  RotateCcw,
  Sun,
  Workflow,
} from "lucide-react";
import { useDemo } from "@/context/demo-context";
import { useTheme } from "@/context/theme-provider";
import { DemoResetDialog } from "@/components/modules/demo/demo-reset-dialog";
import { InboxView } from "@/components/modules/demo/inbox/inbox-view";
import { AutomationView } from "@/components/modules/demo/automation/automation-view";
import { InsightsView } from "@/components/modules/demo/insights/insights-view";
import { DEMO_SIDEBAR_STORAGE_KEY } from "@/lib/demo-sidebar-script";
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
    description: "Support overview",
    icon: BarChart3,
  },
];

const viewCopy: Record<DemoView, { title: string; subtitle: string }> = {
  inbox: {
    title: "Shared Inbox",
    subtitle: "Manage conversations and keep your team aligned.",
  },
  automation: {
    title: "Automation Studio",
    subtitle: "Route conversations to the right team.",
  },
  insights: {
    title: "Support Insights",
    subtitle: "Track conversations, team workload, and support progress.",
  },
};

const sidebarListeners = new Set<() => void>();

function readSidebarCollapsed(): boolean {
  try {
    return localStorage.getItem(DEMO_SIDEBAR_STORAGE_KEY) === "1";
  } catch {
    return false;
  }
}

function subscribeSidebar(onStoreChange: () => void) {
  sidebarListeners.add(onStoreChange);
  const onStorage = (event: StorageEvent) => {
    if (event.key === DEMO_SIDEBAR_STORAGE_KEY || event.key === null) {
      onStoreChange();
    }
  };
  window.addEventListener("storage", onStorage);
  return () => {
    sidebarListeners.delete(onStoreChange);
    window.removeEventListener("storage", onStorage);
  };
}

function applySidebarCollapsed(collapsed: boolean) {
  document.documentElement.dataset.demoSidebar = collapsed
    ? "collapsed"
    : "expanded";
}

function setSidebarCollapsed(collapsed: boolean) {
  try {
    localStorage.setItem(DEMO_SIDEBAR_STORAGE_KEY, collapsed ? "1" : "0");
  } catch {
    // ignore
  }
  applySidebarCollapsed(collapsed);
  sidebarListeners.forEach((listener) => listener());
}

export function DemoShell() {
  const { state, dispatch } = useDemo();
  const { resolvedTheme, setTheme } = useTheme();
  const [resetOpen, setResetOpen] = useState(false);
  const [automationResetSignal, setAutomationResetSignal] = useState(0);
  const [toast, setToast] = useState<string | null>(null);
  const [headerMenuOpen, setHeaderMenuOpen] = useState(false);
  const [keyboardOpen, setKeyboardOpen] = useState(false);
  const appRef = useRef<HTMLDivElement>(null);

  const collapsed = useSyncExternalStore(
    subscribeSidebar,
    readSidebarCollapsed,
    () => false,
  );

  useEffect(() => {
    applySidebarCollapsed(collapsed);
  }, [collapsed]);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(null), 2200);
    return () => window.clearTimeout(timer);
  }, [toast]);

  useEffect(() => {
    const vv = window.visualViewport;
    if (!vv) return;

    const update = () => {
      const keyboardInset = Math.max(
        0,
        window.innerHeight - vv.height - vv.offsetTop,
      );
      // Hide the floating nav while the keyboard is open so the composer stays usable.
      const open = keyboardInset > 80;
      setKeyboardOpen(open);
      appRef.current?.style.setProperty(
        "--demo-mobile-nav-space",
        open
          ? "0.75rem"
          : "calc(4.75rem + env(safe-area-inset-bottom, 0px))",
      );
    };

    update();
    vv.addEventListener("resize", update);
    vv.addEventListener("scroll", update);
    return () => {
      vv.removeEventListener("resize", update);
      vv.removeEventListener("scroll", update);
    };
  }, []);

  const copy = viewCopy[state.view];

  return (
    <div
      ref={appRef}
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
          "--demo-mobile-nav-space":
            "calc(4.75rem + env(safe-area-inset-bottom, 0px))",
        } as CSSProperties
      }
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-24 top-0 size-[28rem] rounded-full bg-accent/10 blur-3xl" />
        <div className="absolute -right-16 bottom-0 size-[24rem] rounded-full bg-violet-500/10 blur-3xl dark:bg-violet-400/10" />
      </div>

      <div className="relative flex min-h-0 flex-1">
        <aside
          className="demo-sidebar hidden shrink-0 flex-col overflow-hidden border-r border-[var(--demo-border)] bg-[var(--demo-rail)]/90 backdrop-blur-md lg:flex"
          aria-label="Demo navigation"
          onClick={(event) => {
            if (document.documentElement.dataset.demoSidebar !== "collapsed") {
              return;
            }
            const target = event.target as HTMLElement | null;
            if (target?.closest("[data-sidebar-interactive]")) return;
            setSidebarCollapsed(false);
          }}
        >
          <div className="border-b border-[var(--demo-border)] px-2.5 py-3">
            <div className="demo-sidebar-expanded-only min-w-0 items-center gap-2">
              <Link
                href="/"
                data-sidebar-interactive
                className="flex min-w-0 flex-1 items-center gap-2.5 rounded-xl px-1 py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                <span className="demo-sidebar-brand-glyph flex size-9 shrink-0 items-center justify-center rounded-xl bg-accent text-sm font-bold text-accent-foreground shadow-[0_8px_24px_rgb(109_40_217_/_0.35)]">
                  HN
                </span>
                <span className="demo-sidebar-label min-w-0">
                  <span className="block font-heading text-sm font-semibold tracking-tight">
                    HelpNova
                  </span>
                  <span className="block text-[11px] text-[var(--demo-muted)]">
                    Command Center
                  </span>
                </span>
              </Link>
              <button
                type="button"
                data-sidebar-interactive
                onClick={() => setSidebarCollapsed(true)}
                aria-expanded="true"
                aria-controls="demo-sidebar-nav"
                className="inline-flex size-9 shrink-0 items-center justify-center rounded-lg border border-[var(--demo-border)] bg-[var(--demo-panel)] text-[var(--demo-muted)] transition hover:text-[var(--demo-text)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                aria-label="Collapse sidebar"
              >
                <PanelLeftClose className="size-4" />
              </button>
            </div>

            <div className="demo-sidebar-collapsed-only justify-center">
              <button
                type="button"
                data-sidebar-interactive
                onClick={() => setSidebarCollapsed(false)}
                aria-expanded="false"
                aria-controls="demo-sidebar-nav"
                className="demo-sidebar-expand-hit group/expand relative flex size-10 items-center justify-center rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                aria-label="Expand sidebar"
              >
                <span className="demo-sidebar-brand-mark flex size-10 items-center justify-center rounded-xl bg-accent text-xs font-bold text-accent-foreground shadow-[0_8px_24px_rgb(109_40_217_/_0.35)] transition duration-150">
                  HN
                </span>
                <span className="demo-sidebar-expand-icon absolute inset-0 flex items-center justify-center rounded-xl border border-[var(--demo-border)] bg-[var(--demo-panel)] text-[var(--demo-text)] opacity-0 shadow-sm transition duration-150">
                  <PanelLeftOpen className="size-4" aria-hidden />
                </span>
              </button>
            </div>
          </div>

          <nav
            id="demo-sidebar-nav"
            aria-label="Demo workspace"
            className="demo-sidebar-nav flex flex-1 flex-col gap-1 p-2.5"
          >
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = state.view === item.id;
              return (
                <div key={item.id} className="group/nav relative">
                  <button
                    type="button"
                    data-sidebar-interactive
                    onClick={(event) => {
                      event.stopPropagation();
                      dispatch({ type: "SET_VIEW", view: item.id });
                    }}
                    aria-current={active ? "page" : undefined}
                    aria-label={item.label}
                    className={cn(
                      "demo-sidebar-nav-btn group relative flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left transition",
                      active
                        ? "demo-sidebar-nav-btn-active bg-accent/15 text-[var(--demo-text)] shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--accent)_35%,transparent)]"
                        : "text-[var(--demo-muted)] hover:bg-[var(--demo-hover)] hover:text-[var(--demo-text)]",
                    )}
                  >
                    {active ? (
                      <span
                        className="demo-sidebar-nav-accent absolute left-0 top-1/2 h-7 w-1 -translate-y-1/2 rounded-r-full bg-accent"
                        aria-hidden
                      />
                    ) : null}
                    <span
                      className={cn(
                        "demo-sidebar-nav-icon flex size-9 shrink-0 items-center justify-center rounded-lg border transition",
                        active
                          ? "border-accent/30 bg-accent text-accent-foreground"
                          : "border-[var(--demo-border)] bg-[var(--demo-panel)] group-hover:border-accent/25",
                      )}
                    >
                      <Icon className="size-4" aria-hidden />
                    </span>
                    <span className="demo-sidebar-label min-w-0">
                      <span className="block text-sm font-medium">
                        {item.label}
                      </span>
                      <span className="block text-[11px] opacity-80">
                        {item.description}
                      </span>
                    </span>
                  </button>

                  <span
                    role="tooltip"
                    className="demo-sidebar-tooltip pointer-events-none absolute top-1/2 left-[calc(100%+10px)] z-30 -translate-y-1/2 whitespace-nowrap rounded-lg border border-[var(--demo-border)] bg-[var(--demo-panel)] px-2.5 py-1.5 text-xs font-medium text-[var(--demo-text)] shadow-lg"
                  >
                    {item.label}
                  </span>
                </div>
              );
            })}
          </nav>

          <div className="space-y-2 border-t border-[var(--demo-border)] p-2.5">
            <div className="demo-sidebar-expanded-only flex-col gap-2">
              <Link
                href="/"
                data-sidebar-interactive
                className="block rounded-lg px-3 py-2 text-xs text-[var(--demo-muted)] transition hover:bg-[var(--demo-hover)] hover:text-[var(--demo-text)]"
              >
                ← Back to HelpNova
              </Link>
            </div>

            <div className="demo-sidebar-collapsed-only flex-col items-center gap-2">
              <Link
                href="/"
                data-sidebar-interactive
                className="inline-flex size-10 items-center justify-center rounded-lg border border-[var(--demo-border)] text-[var(--demo-muted)] transition hover:bg-[var(--demo-hover)] hover:text-[var(--demo-text)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                aria-label="Back to HelpNova"
              >
                <ArrowLeft className="size-4" />
              </Link>
            </div>
          </div>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="flex shrink-0 items-center justify-between gap-2 border-b border-[var(--demo-border)] bg-[var(--demo-panel)]/80 px-3 py-2.5 backdrop-blur-md sm:gap-3 sm:px-5 sm:py-3">
            <div className="min-w-0">
              <div className="flex items-center gap-2 lg:hidden">
                <span className="flex size-8 items-center justify-center rounded-lg bg-accent text-xs font-bold text-accent-foreground">
                  HN
                </span>
                <span className="truncate font-heading text-sm font-semibold tracking-tight">
                  HelpNova
                </span>
              </div>
              <h1 className="mt-0.5 truncate font-heading text-base font-semibold tracking-tight sm:mt-1 sm:text-xl lg:mt-0">
                {copy.title}
              </h1>
              <p className="hidden truncate text-xs text-[var(--demo-muted)] sm:block">
                {copy.subtitle}
              </p>
            </div>

            <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
              <button
                type="button"
                onClick={() =>
                  setTheme(resolvedTheme === "dark" ? "light" : "dark")
                }
                className="inline-flex size-10 items-center justify-center rounded-lg border border-[var(--demo-border)] bg-[var(--demo-panel)] text-[var(--demo-muted)] transition hover:text-[var(--demo-text)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent sm:size-9"
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
                className="inline-flex h-10 items-center gap-1.5 rounded-lg border border-[var(--demo-border)] bg-[var(--demo-panel)] px-2.5 text-xs font-medium text-[var(--demo-text)] transition hover:bg-[var(--demo-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent sm:h-9 sm:px-3"
              >
                <RotateCcw className="size-3.5" />
                <span className="hidden sm:inline">Reset Demo</span>
                <span className="sm:hidden">Reset</span>
              </button>

              <MobileOverflowMenu
                open={headerMenuOpen}
                onOpenChange={setHeaderMenuOpen}
              />
            </div>
          </header>

          <main className="relative min-h-0 flex-1 overflow-hidden pb-[var(--demo-mobile-nav-space)] lg:pb-0">
            {state.view === "inbox" ? <InboxView /> : null}
            {state.view === "automation" ? (
              <AutomationView resetSignal={automationResetSignal} />
            ) : null}
            {state.view === "insights" ? <InsightsView /> : null}
          </main>
        </div>
      </div>

      <nav
        aria-label="Mobile demo views"
        className={cn(
          "demo-mobile-nav fixed inset-x-3 z-40 grid grid-cols-3 gap-1 rounded-2xl border border-[var(--demo-border)] p-1.5 transition duration-200 lg:hidden",
          "bottom-[max(0.75rem,env(safe-area-inset-bottom,0px))]",
          keyboardOpen &&
            "pointer-events-none translate-y-[120%] opacity-0",
        )}
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
                "flex min-h-11 flex-col items-center justify-center gap-0.5 rounded-xl px-2 py-2 text-[11px] font-medium transition",
                active
                  ? "bg-accent/15 text-accent"
                  : "text-[var(--demo-muted)] hover:text-[var(--demo-text)]",
              )}
            >
              <Icon
                className={cn("size-5", active && "text-accent")}
                aria-hidden
              />
              {item.label}
            </button>
          );
        })}
      </nav>

      <DemoResetDialog
        open={resetOpen}
        onClose={() => setResetOpen(false)}
        onConfirm={() => {
          dispatch({ type: "RESET_DEMO" });
          setAutomationResetSignal((n) => n + 1);
          setResetOpen(false);
          setToast("Workspace restored to the starting conversations.");
        }}
      />

      {toast ? (
        <div
          role="status"
          className="pointer-events-none fixed bottom-[calc(var(--demo-mobile-nav-space)+0.75rem)] left-1/2 z-[90] -translate-x-1/2 rounded-full border border-[var(--demo-border)] bg-[var(--demo-panel)] px-4 py-2 text-xs font-medium shadow-lg lg:bottom-6"
        >
          {toast}
        </div>
      ) : null}
    </div>
  );
}

function MobileOverflowMenu({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const menuId = useId();
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") onOpenChange(false);
    }
    function onPointer(event: MouseEvent | TouchEvent) {
      const target = event.target as Node | null;
      if (target && !rootRef.current?.contains(target)) onOpenChange(false);
    }
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onPointer);
    document.addEventListener("touchstart", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("touchstart", onPointer);
    };
  }, [open, onOpenChange]);

  return (
    <div ref={rootRef} className="relative lg:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={menuId}
        aria-haspopup="menu"
        onClick={() => onOpenChange(!open)}
        className="inline-flex size-10 items-center justify-center rounded-lg border border-[var(--demo-border)] bg-[var(--demo-panel)] text-[var(--demo-muted)] transition hover:text-[var(--demo-text)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        aria-label="More demo options"
      >
        <MoreHorizontal className="size-4" />
      </button>
      {open ? (
        <div
          id={menuId}
          role="menu"
          className="absolute top-full right-0 z-50 mt-2 w-60 overflow-hidden rounded-xl border border-[var(--demo-border)] bg-[var(--demo-panel)] shadow-xl"
        >
          <Link
            href="/"
            role="menuitem"
            className="flex items-center gap-2 px-3 py-2.5 text-sm text-[var(--demo-text)] transition hover:bg-[var(--demo-hover)]"
            onClick={() => onOpenChange(false)}
          >
            <ArrowLeft className="size-4 text-[var(--demo-muted)]" />
            Back to HelpNova
          </Link>
        </div>
      ) : null}
    </div>
  );
}
