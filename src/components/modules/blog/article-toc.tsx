"use client";

import { useEffect, useId, useState } from "react";
import { ChevronDown } from "lucide-react";
import { blogPageCopy } from "@/data/editorial/blog";
import { cn } from "@/utils/cn";

type ArticleTocProps = {
  sections: Array<{ id: string; title: string }>;
};

/** Matches sticky site header clearance. */
const HEADER_OFFSET = 96;
/** Mobile "On this page" control height while sticky. */
const MOBILE_TOC_OFFSET = 64;

function getScrollOffset() {
  if (typeof window === "undefined") return HEADER_OFFSET;
  const isMobile = window.matchMedia("(max-width: 1023px)").matches;
  return isMobile ? HEADER_OFFSET + MOBILE_TOC_OFFSET : HEADER_OFFSET;
}

export function ArticleToc({ sections }: ArticleTocProps) {
  const [activeId, setActiveId] = useState(sections[0]?.id ?? "");
  const [open, setOpen] = useState(false);
  const panelId = useId();

  useEffect(() => {
    if (sections.length === 0) return;

    const resolveActive = () => {
      const offset = getScrollOffset() + 8;
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
    const top =
      window.scrollY + el.getBoundingClientRect().top - getScrollOffset();
    window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
    setActiveId(id);
    setOpen(false);
  };

  return (
    <>
      <nav
        aria-label={blogPageCopy.onThisPage}
        className="hidden lg:block"
      >
        <p className="text-[11px] font-semibold tracking-[0.16em] text-muted uppercase">
          {blogPageCopy.onThisPage}
        </p>
        <ol className="relative mt-3 space-y-2.5 border-l border-border pl-3.5">
          {sections.map((section) => {
            const active = section.id === activeId;
            return (
              <li key={section.id} className="relative">
                <span
                  className={cn(
                    "absolute top-2.5 -left-[1.19rem] size-1.5 rounded-full transition-colors",
                    active ? "bg-accent" : "bg-border-strong",
                  )}
                  aria-hidden
                />
                <button
                  type="button"
                  onClick={() => onNavigate(section.id)}
                  aria-current={active ? "location" : undefined}
                  className={cn(
                    "w-full rounded-md px-1.5 py-1.5 text-left text-[13px] leading-snug transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    active
                      ? "font-medium text-accent"
                      : "text-muted hover:text-foreground",
                  )}
                >
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
          {blogPageCopy.onThisPage}
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
          <ol className="space-y-2">
            {sections.map((section) => {
              const active = section.id === activeId;
              return (
                <li key={section.id}>
                  <button
                    type="button"
                    onClick={() => onNavigate(section.id)}
                    aria-current={active ? "location" : undefined}
                    className={cn(
                      "w-full rounded-xl px-3 py-3 text-left text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
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
