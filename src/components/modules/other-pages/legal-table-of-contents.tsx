"use client";

import { useEffect, useId, useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/utils/cn";

type LegalTableOfContentsProps = {
  sections: Array<{ id: string; title: string }>;
  heading?: string;
  mobileLabel?: string;
};

const HEADER_OFFSET = 96;

export function LegalTableOfContents({
  sections,
  heading = "On this page",
  mobileLabel = "Jump to section",
}: LegalTableOfContentsProps) {
  const [activeId, setActiveId] = useState(sections[0]?.id ?? "");
  const [open, setOpen] = useState(false);
  const panelId = useId();

  useEffect(() => {
    const elements = sections
      .map((section) => document.getElementById(section.id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]?.target.id) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        rootMargin: `-${HEADER_OFFSET}px 0px -55% 0px`,
        threshold: [0, 0.25, 0.6],
      },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [sections]);

  const onNavigate = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const top =
      window.scrollY + el.getBoundingClientRect().top - HEADER_OFFSET;
    window.scrollTo({ top, behavior: "smooth" });
    setActiveId(id);
    setOpen(false);
  };

  return (
    <>
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

      <div className="lg:hidden">
        <button
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((value) => !value)}
          className="flex w-full items-center justify-between rounded-2xl border border-border bg-surface px-4 py-3 text-sm font-medium shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          {mobileLabel}
          <ChevronDown
            className={cn(
              "size-4 text-muted transition-transform",
              open && "rotate-180",
            )}
            aria-hidden
          />
        </button>
        <div
          id={panelId}
          hidden={!open}
          className="mt-2 overflow-hidden rounded-2xl border border-border bg-surface p-2 shadow-[var(--shadow-soft)]"
        >
          <ol className="space-y-1">
            {sections.map((section) => {
              const active = section.id === activeId;
              return (
                <li key={section.id}>
                  <button
                    type="button"
                    onClick={() => onNavigate(section.id)}
                    aria-current={active ? "location" : undefined}
                    className={cn(
                      "w-full rounded-xl px-3 py-2.5 text-left text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                      active
                        ? "bg-accent-soft font-medium text-accent"
                        : "text-muted hover:bg-surface-muted hover:text-foreground",
                    )}
                  >
                    {section.title}
                  </button>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </>
  );
}
