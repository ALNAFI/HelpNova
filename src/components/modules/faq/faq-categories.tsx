"use client";

import { ChevronDown } from "lucide-react";
import type { FaqCategory, FaqCategoryId } from "@/types/marketing";
import { cn } from "@/utils/cn";

type FaqCategoriesProps = {
  categories: FaqCategory[];
  active: FaqCategoryId;
  onChange: (id: FaqCategoryId) => void;
  variant?: "sidebar" | "dropdown";
};

export function FaqCategories({
  categories,
  active,
  onChange,
  variant = "dropdown",
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
              aria-current={selected ? "true" : undefined}
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

  const activeLabel =
    categories.find((category) => category.id === active)?.label ??
    "All Questions";

  return (
    <div className="w-full">
      <label
        htmlFor="faq-category-select"
        className="mb-2 block text-[11px] font-semibold tracking-[0.16em] text-muted uppercase"
      >
        Categories
      </label>
      <div className="relative">
        <select
          id="faq-category-select"
          value={active}
          aria-label={`FAQ category, currently ${activeLabel}`}
          onChange={(event) => onChange(event.target.value as FaqCategoryId)}
          className="h-11 w-full appearance-none rounded-xl border border-border-strong bg-surface/90 py-2.5 pr-10 pl-3.5 text-sm font-medium text-foreground shadow-[var(--shadow-soft)] outline-none transition-[border-color,box-shadow] focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-ring/30"
        >
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.label}
            </option>
          ))}
        </select>
        <ChevronDown
          className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-muted"
          aria-hidden
        />
      </div>
    </div>
  );
}
