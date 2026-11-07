"use client";

import { useId, useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/utils/cn";

export type AccordionItemData = {
  id: string;
  question: string;
  answer: string;
};

export function Accordion({
  items,
  answerClassName,
}: {
  items: AccordionItemData[];
  /** Optional answer text class; defaults to muted body copy. */
  answerClassName?: string;
}) {
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null);
  const baseId = useId();

  return (
    <div className="divide-y divide-border rounded-[var(--radius-card)] border border-border bg-surface shadow-[var(--shadow-soft)]">
      {items.map((item) => {
        const isOpen = openId === item.id;
        const panelId = `${baseId}-${item.id}-panel`;
        const buttonId = `${baseId}-${item.id}-button`;

        return (
          <div key={item.id}>
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-[15px] font-medium text-foreground transition-colors hover:bg-surface-muted/70"
                onClick={() => setOpenId(isOpen ? null : item.id)}
              >
                <span>{item.question}</span>
                <ChevronDown
                  className={cn(
                    "size-4 shrink-0 text-muted transition-transform duration-200 ease-[cubic-bezier(0.22,1,0.36,1)]",
                    isOpen && "rotate-180",
                  )}
                  aria-hidden
                />
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              data-open={isOpen}
              className="faq-panel"
            >
              <div className="faq-panel-inner">
                <div
                  className={cn(
                    "faq-panel-content px-5 pb-5 text-sm leading-6",
                    answerClassName ?? "text-muted",
                  )}
                  aria-hidden={!isOpen}
                >
                  {item.answer}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
