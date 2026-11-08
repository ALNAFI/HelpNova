"use client";

import {
  createContext,
  useContext,
  useEffect,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/utils/cn";

type TocSection = { id: string; title: string };

type LegalTocContextValue = {
  sections: TocSection[];
  activeId: string;
  setActiveId: (id: string) => void;
  open: boolean;
  setOpen: (open: boolean | ((prev: boolean) => boolean)) => void;
  onNavigate: (id: string) => void;
};

const LegalTocContext = createContext<LegalTocContextValue | null>(null);

/** Matches `--header-height` plus breathing room. */
const HEADER_OFFSET = 96;
/** Fixed mobile row height — keep in sync with button `h-11`. */
const MOBILE_ITEM_ROW = "2.75rem";
const MOBILE_ITEM_GAP = "0.5rem";
const MOBILE_ACCORDION_HEADER = 52;

type LegalTocProviderProps = {
  sections: TocSection[];
  children: ReactNode;
};

export function LegalTocProvider({
  sections,
  children,
}: LegalTocProviderProps) {
  const [activeId, setActiveId] = useState(sections[0]?.id ?? "");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (sections.length === 0) return;

    const resolveActive = () => {
      const offset = HEADER_OFFSET + MOBILE_ACCORDION_HEADER + 12;
      let current = sections[0]?.id ?? "";
      for (const section of sections) {
        const el = document.getElementById(section.id);
        if (!el) continue;
        if (el.getBoundingClientRect().top - offset <= 0) {
          current = section.id;
        } else {
          break;
        }
      }
      setActiveId((prev) => (prev === current ? prev : current));
    };

    resolveActive();
    window.addEventListener("scroll", resolveActive, { passive: true });
    window.addEventListener("resize", resolveActive);
    return () => {
      window.removeEventListener("scroll", resolveActive);
      window.removeEventListener("resize", resolveActive);
    };
  }, [sections]);

  const onNavigate = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;

    const isMobile =
      typeof window !== "undefined" &&
      window.matchMedia("(max-width: 1023px)").matches;
    const offset = isMobile
      ? HEADER_OFFSET + MOBILE_ACCORDION_HEADER
      : HEADER_OFFSET;
    const top = window.scrollY + el.getBoundingClientRect().top - offset;
    window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
    setActiveId(id);
    setOpen(false);
  };

  const value = useMemo(
    () => ({
      sections,
      activeId,
      setActiveId,
      open,
      setOpen,
      onNavigate,
    }),
    [sections, activeId, open],
  );

  return (
    <LegalTocContext.Provider value={value}>{children}</LegalTocContext.Provider>
  );
}

function useLegalToc() {
  const ctx = useContext(LegalTocContext);
  if (!ctx) {
    throw new Error("LegalTableOfContents must be used within LegalTocProvider");
  }
  return ctx;
}

type LegalTableOfContentsProps = {
  heading?: string;
  mobileLabel?: string;
  surface?: "mobile" | "desktop";
};

export function LegalTableOfContents({
  heading = "On this page",
  mobileLabel = "Jump to section",
  surface = "desktop",
}: LegalTableOfContentsProps) {
  const { sections, activeId, open, setOpen, onNavigate } = useLegalToc();
  const panelId = useId();
  const activeItemRef = useRef<HTMLButtonElement | null>(null);

  useLayoutEffect(() => {
    if (surface !== "mobile" || !open) return;
    activeItemRef.current?.scrollIntoView({
      block: "nearest",
      inline: "nearest",
    });
  }, [activeId, open, surface]);

  if (surface === "desktop") {
    return (
      <nav
        aria-label={heading}
        className="hidden max-h-[calc(100vh-var(--header-height)-2.5rem)] overflow-y-auto overscroll-contain lg:block"
      >
        <p className="text-[11px] font-semibold tracking-[0.16em] text-muted uppercase">
          {heading}
        </p>
        <ol className="relative mt-4 space-y-1 border-l border-border pl-4">
          {sections.map((section, index) => {
            const active = section.id === activeId;
            return (
              <li key={section.id} className="relative">
                <span
                  className={cn(
                    "absolute top-2 -left-[1.28rem] size-2 rounded-full transition-colors",
                    active ? "bg-accent" : "bg-border-strong",
                  )}
                  aria-hidden
                />
                <button
                  type="button"
                  onClick={() => onNavigate(section.id)}
                  aria-current={active ? "location" : undefined}
                  className={cn(
                    "w-full rounded-lg px-2 py-1.5 text-left text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    active
                      ? "font-medium text-accent"
                      : "text-muted hover:text-foreground",
                  )}
                >
                  <span className="mr-2 font-mono text-[10px] tracking-wide text-muted tabular-nums">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {section.title}
                </button>
              </li>
            );
          })}
        </ol>
      </nav>
    );
  }

  return (
    <div className="relative z-40 lg:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
        className="relative z-10 flex h-[3.25rem] w-full items-center justify-between rounded-2xl border border-border bg-surface px-4 text-sm font-medium shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <span className="truncate">{mobileLabel}</span>
        <ChevronDown
          className={cn(
            "size-4 shrink-0 text-muted transition-transform",
            open && "rotate-180",
          )}
          aria-hidden
        />
      </button>
      <div
        id={panelId}
        hidden={!open}
        className="absolute top-[calc(100%+0.5rem)] right-0 left-0 z-50 overflow-hidden rounded-2xl border border-border bg-surface p-2 shadow-[var(--shadow-soft)]"
      >
        <ol
          className="flex flex-col overflow-y-auto overscroll-contain scroll-smooth"
          style={{
            gap: MOBILE_ITEM_GAP,
            // Exactly 5 visible rows + the 4 gaps between them.
            maxHeight: `calc(5 * ${MOBILE_ITEM_ROW} + 4 * ${MOBILE_ITEM_GAP})`,
          }}
        >
          {sections.map((section, index) => {
            const active = section.id === activeId;
            return (
              <li
                key={section.id}
                className="shrink-0"
                style={{ height: MOBILE_ITEM_ROW }}
              >
                <button
                  ref={active ? activeItemRef : undefined}
                  type="button"
                  onClick={() => onNavigate(section.id)}
                  aria-current={active ? "location" : undefined}
                  className={cn(
                    "relative isolate flex h-full w-full items-center gap-2 rounded-lg px-3 text-left text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    active
                      ? "bg-accent-soft font-medium text-accent"
                      : "bg-transparent text-muted hover:bg-surface-muted hover:text-foreground",
                  )}
                >
                  {active ? (
                    <span
                      className="pointer-events-none absolute top-2 bottom-2 left-1 w-0.5 rounded-full bg-accent"
                      aria-hidden
                    />
                  ) : null}
                  <span
                    className={cn(
                      "font-mono text-[10px] tracking-wide tabular-nums",
                      active ? "text-accent/80" : "text-muted",
                    )}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="min-w-0 truncate">{section.title}</span>
                </button>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
