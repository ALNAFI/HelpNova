"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import type { LegalDocumentSection } from "@/types/legal";
import { cn } from "@/utils/cn";

type LegalSectionProps = {
  section: LegalDocumentSection;
  index: number;
  className?: string;
};

const INLINE_LINKS: Array<{ label: string; href: string }> = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Contact page", href: "/contact" },
];

export function LegalSection({ section, index, className }: LegalSectionProps) {
  return (
    <section
      id={section.id}
      className={cn(
        "scroll-mt-[calc(var(--header-height)+1.5rem)] border-t border-border/70 pt-8 first:border-t-0 first:pt-0",
        className,
      )}
      aria-labelledby={`${section.id}-heading`}
    >
      <p className="text-[11px] font-semibold tracking-[0.16em] text-accent uppercase">
        {String(index + 1).padStart(2, "0")}
      </p>
      <h2
        id={`${section.id}-heading`}
        className="mt-2 font-heading text-[1.55rem] font-semibold tracking-tight text-balance sm:text-[1.75rem]"
      >
        {section.title}
      </h2>
      <div className="mt-4 space-y-4">
        {section.blocks.map((block, blockIndex) => {
          if (block.type === "paragraph") {
            return (
              <p
                key={`${section.id}-p-${blockIndex}`}
                className="text-[1.02rem] leading-8 text-muted"
              >
                {renderInlineLinks(block.text)}
              </p>
            );
          }
          if (block.type === "list") {
            return (
              <ul
                key={`${section.id}-list-${blockIndex}`}
                className="list-disc space-y-2 pl-5 text-[1.02rem] leading-8 text-muted"
              >
                {block.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            );
          }
          return (
            <aside
              key={`${section.id}-callout-${blockIndex}`}
              className="rounded-[1.2rem] border border-accent/25 bg-accent-soft/45 px-5 py-4"
            >
              <p className="text-xs font-semibold tracking-[0.14em] text-accent uppercase">
                {block.title}
              </p>
              <p className="mt-2 text-[0.975rem] leading-7 text-foreground">
                {renderInlineLinks(block.text)}
              </p>
            </aside>
          );
        })}
      </div>
    </section>
  );
}

function renderInlineLinks(text: string): ReactNode {
  const nodes: ReactNode[] = [];
  let remaining = text;
  let key = 0;

  while (remaining.length > 0) {
    let nextIndex = -1;
    let nextLink: (typeof INLINE_LINKS)[number] | null = null;

    for (const link of INLINE_LINKS) {
      const index = remaining.indexOf(link.label);
      if (index !== -1 && (nextIndex === -1 || index < nextIndex)) {
        nextIndex = index;
        nextLink = link;
      }
    }

    if (!nextLink || nextIndex === -1) {
      nodes.push(remaining);
      break;
    }

    if (nextIndex > 0) {
      nodes.push(remaining.slice(0, nextIndex));
    }

    nodes.push(
      <Link
        key={`legal-link-${key++}`}
        href={nextLink.href}
        className="font-medium text-accent underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        {nextLink.label}
      </Link>,
    );

    remaining = remaining.slice(nextIndex + nextLink.label.length);
  }

  return nodes.length === 1 ? nodes[0] : <>{nodes}</>;
}
