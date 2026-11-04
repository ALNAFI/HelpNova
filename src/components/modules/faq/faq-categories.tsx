"use client";

import type { FaqCategory, FaqCategoryId } from "@/types/marketing";
import { cn } from "@/utils/cn";

type FaqCategoriesProps = {
  categories: FaqCategory[];
  active: FaqCategoryId;
  onChange: (id: FaqCategoryId) => void;
  variant?: "sidebar" | "tabs";
};

export function FaqCategories({
  categories,
  active,
  onChange,
  variant = "tabs",
}: FaqCategoriesProps) {
  if (variant === "sidebar") {
    return (
      <nav aria-label="FAQ categories" className="space-y-1">
        <p className="mb-3 px-3 text-[11px] font-semibold tracking-[0.16em] text-muted uppercase">
          Categories
        </p>
        {categories.map((category) => {
          const selected = category.id === active;
          return (
            <button
              key={category.id}
              type="button"
              aria-current={selected ? "page" : undefined}
              onClick={() => onChange(category.id)}
              className={cn(
                "flex w-full items-center rounded-xl px-3 py-2.5 text-left text-sm font-medium transition-[color,background-color,box-shadow] duration-200",
                selected
                  ? "bg-accent text-accent-foreground shadow-[0_10px_24px_color-mix(in_oklab,var(--accent)_26%,transparent)]"
                  : "text-muted hover:bg-surface-muted hover:text-foreground",
              )}
            >
              {category.label}
            </button>
          );
        })}
      </nav>
    );
  }

  return (
    <div
      role="tablist"
      aria-label="FAQ categories"
      className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
    >
      {categories.map((category) => {
        const selected = category.id === active;
        return (
          <button
            key={category.id}
            type="button"
            role="tab"
            aria-selected={selected}
            onClick={() => onChange(category.id)}
            className={cn(
              "relative shrink-0 rounded-full border px-3.5 py-2 text-sm font-medium whitespace-nowrap transition-[color,background-color,border-color,box-shadow] duration-200",
              selected
                ? "border-accent bg-accent text-accent-foreground shadow-[0_8px_20px_color-mix(in_oklab,var(--accent)_24%,transparent)]"
                : "border-border bg-surface/80 text-muted hover:border-border-strong hover:bg-surface-muted hover:text-foreground",
            )}
          >
            {category.label}
          </button>
        );
      })}
    </div>
  );
}
