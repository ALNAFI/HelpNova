"use client";

import { useId, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Minus, Plus } from "lucide-react";
import {
  pricingFaqItems,
  pricingPageCopy,
} from "@/data/marketing/pricing";
import { cn } from "@/utils/cn";

export function PricingFaq() {
  const baseId = useId();
  const [openQuestionId, setOpenQuestionId] = useState<string | null>(
    () => pricingFaqItems[0]?.id ?? null,
  );

  const toggle = (id: string) => {
    setOpenQuestionId((current) => (current === id ? null : id));
  };

  return (
    <section
      data-pricing-section="faq"
      className="scroll-mt-28"
      aria-labelledby="pricing-faq-heading"
    >
      <div className="mx-auto mb-8 max-w-2xl text-center lg:mb-10">
        <p className="mb-3 text-sm font-medium tracking-wide text-accent">
          {pricingPageCopy.faqEyebrow}
        </p>
        <h2
          id="pricing-faq-heading"
          className="font-heading text-[1.75rem] font-semibold tracking-tight text-balance sm:text-[2rem] lg:text-[2.4rem]"
        >
          {pricingPageCopy.faqTitle}
        </h2>
        <p className="mt-4 text-base leading-7 text-muted">
          {pricingPageCopy.faqDescription}
        </p>
      </div>

      <div className="mx-auto max-w-3xl space-y-3">
        {pricingFaqItems.map((item) => {
          const isOpen = openQuestionId === item.id;
          const panelId = `${baseId}-${item.id}-panel`;
          const buttonId = `${baseId}-${item.id}-button`;

          return (
            <article
              key={item.id}
              className={cn(
                "pricing-glass-faq overflow-hidden rounded-2xl transition-[border-color,box-shadow,background-color] duration-300",
                isOpen && "pricing-glass-faq-open",
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
                  <span className="min-w-0 flex-1 font-heading text-base font-semibold tracking-tight text-foreground sm:text-[1.0625rem]">
                    {item.question}
                  </span>
                  <span
                    className={cn(
                      "relative mt-0.5 inline-flex size-8 shrink-0 items-center justify-center rounded-full border transition-[background-color,border-color,color,transform] duration-300",
                      isOpen
                        ? "border-accent bg-accent text-accent-foreground"
                        : "border-border bg-surface-muted/80 text-muted",
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

      <div className="mt-8 flex justify-center">
        <Link
          href={pricingPageCopy.faqViewAllHref}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-accent transition-colors hover:text-foreground"
        >
          {pricingPageCopy.faqViewAllLabel}
          <ArrowUpRight className="size-4" aria-hidden />
        </Link>
      </div>
    </section>
  );
}
