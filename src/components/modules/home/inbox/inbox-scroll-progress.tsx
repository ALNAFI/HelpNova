"use client";

import Link from "next/link";
import { inboxHomeSections } from "@/data/marketing/home-inbox";
import { useNovaScroll } from "@/components/modules/home/inbox/nova-scroll-context";
import { cn } from "@/utils/cn";

export function InboxScrollProgress() {
  const { progress, sectionIndex } = useNovaScroll();

  return (
    <aside
      className="pointer-events-none fixed top-1/2 right-3 z-40 hidden -translate-y-1/2 xl:block"
      aria-label="Conversation journey"
    >
      <div className="pointer-events-auto relative flex flex-col items-center gap-2 rounded-full border border-border bg-surface/85 px-2 py-3 shadow-[var(--shadow-soft)] backdrop-blur-xl">
        <div
          className="absolute top-3 bottom-3 left-1/2 w-px -translate-x-1/2 bg-border"
          aria-hidden
        />
        <div
          className="absolute top-3 left-1/2 w-px -translate-x-1/2 bg-accent transition-[height] duration-150"
          style={{ height: `calc(${progress * 100}% - 1.5rem)` }}
          aria-hidden
        />
        <ol className="relative space-y-2">
          {inboxHomeSections.map((section, index) => {
            const active = index === sectionIndex;
            return (
              <li key={section.id}>
                <Link
                  href={`#${section.id}`}
                  aria-label={`Go to section ${section.label}: ${section.name}`}
                  className={cn(
                    "flex size-7 items-center justify-center rounded-full text-[10px] font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    active
                      ? "bg-accent text-white shadow-[0_0_0_3px_color-mix(in_oklab,var(--accent)_25%,transparent)]"
                      : "bg-surface text-muted hover:text-foreground",
                  )}
                >
                  {section.label}
                </Link>
              </li>
            );
          })}
        </ol>
      </div>
    </aside>
  );
}
