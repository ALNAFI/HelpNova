"use client";

import Link from "next/link";
import { automationHomeSections } from "@/data/marketing/home-automation";
import { useAutomationScroll } from "@/components/modules/home/automation/automation-scroll-context";
import { cn } from "@/utils/cn";

export function AutomationScrollProgress() {
  const { progress, sectionIndex } = useAutomationScroll();

  return (
    <div className="pointer-events-none fixed top-1/2 right-3 z-40 hidden -translate-y-1/2 lg:block">
      <div className="pointer-events-auto flex flex-col items-center gap-2">
        <div className="relative h-40 w-px overflow-hidden rounded-full bg-border">
          <div
            className="absolute inset-x-0 top-0 w-full bg-gradient-to-b from-accent to-[var(--au-cyan)]"
            style={{ height: `${Math.max(4, progress * 100)}%` }}
          />
        </div>
        <ol className="mt-2 space-y-1.5">
          {automationHomeSections.map((section, index) => (
            <li key={section.id}>
              <Link
                href={`#${section.id}`}
                className={cn(
                  "block rounded-md px-1.5 py-0.5 font-mono text-[10px] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  index === sectionIndex
                    ? "bg-accent/15 text-accent"
                    : "text-muted hover:text-foreground",
                )}
                aria-label={`Go to section ${section.label}`}
              >
                {section.label}
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
