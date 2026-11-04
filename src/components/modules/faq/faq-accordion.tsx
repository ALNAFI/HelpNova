"use client";

import { useId, useState } from "react";
import { Minus, Plus } from "lucide-react";
import type { FaqItem } from "@/types/marketing";
import { cn } from "@/utils/cn";

type FaqAccordionProps = {
  items: FaqItem[];
  categoryLabels: Record<string, string>;
};

export function FaqAccordion({ items, categoryLabels }: FaqAccordionProps) {
  const baseId = useId();
  const [openQuestionId, setOpenQuestionId] = useState<string | null>(
    () => items[0]?.id ?? null,
  );
  const [syncedItemsKey, setSyncedItemsKey] = useState(
    () => items.map((item) => item.id).join("|"),
  );

  const itemsKey = items.map((item) => item.id).join("|");
  if (itemsKey !== syncedItemsKey) {
    setSyncedItemsKey(itemsKey);
    setOpenQuestionId(items[0]?.id ?? null);
  }

  const toggle = (id: string) => {
    setOpenQuestionId((current) => (current === id ? null : id));
  };

  return (
    <div className="space-y-3">
      {items.map((item) => {
        const isOpen = openQuestionId === item.id;
        const panelId = `${baseId}-${item.id}-panel`;
        const buttonId = `${baseId}-${item.id}-button`;
        const categoryLabel = item.category
          ? categoryLabels[item.category]
          : undefined;

        return (
          <article
            key={item.id}
            className={cn(
              "rounded-2xl border bg-surface/90 transition-[border-color,background-color,box-shadow] duration-300",
              isOpen
                ? "border-accent/40 bg-accent-soft/20 shadow-[0_14px_36px_color-mix(in_oklab,var(--accent)_10%,transparent)]"
                : "border-border shadow-[var(--shadow-soft)] hover:border-border-strong",
            )}
          >
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(item.id)}
                className="flex w-full items-start gap-4 px-5 py-4 text-left sm:gap-5 sm:px-6 sm:py-[1.15rem]"
              >
                <span className="min-w-0 flex-1">
                  {categoryLabel ? (
                    <span className="mb-1.5 block text-[11px] font-semibold tracking-[0.14em] text-accent uppercase">
                      {categoryLabel}
                    </span>
                  ) : null}
                  <span className="font-heading text-base font-semibold tracking-tight text-foreground sm:text-[1.0625rem]">
                    {item.question}
                  </span>
                </span>
                <span
                  className={cn(
                    "relative mt-0.5 inline-flex size-8 shrink-0 items-center justify-center rounded-full border transition-[background-color,border-color,color,transform] duration-300",
                    isOpen
                      ? "border-accent bg-accent text-accent-foreground"
                      : "border-border bg-surface-muted text-muted",
                  )}
                  aria-hidden
                >
                  <Plus
                    className={cn(
                      "absolute size-4 transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
                      isOpen
                        ? "rotate-90 scale-50 opacity-0"
                        : "rotate-0 scale-100 opacity-100",
                    )}
                    strokeWidth={2.25}
                  />
                  <Minus
                    className={cn(
                      "absolute size-4 transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
                      isOpen
                        ? "rotate-0 scale-100 opacity-100"
                        : "-rotate-90 scale-50 opacity-0",
                    )}
                    strokeWidth={2.25}
                  />
                </span>
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
                  className="faq-panel-content px-5 pb-5 sm:px-6 sm:pb-6"
                  aria-hidden={!isOpen}
                >
                  <p className="max-w-3xl text-[0.9375rem] leading-7 text-muted sm:text-base sm:leading-7">
                    {item.answer}
                  </p>
                </div>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
