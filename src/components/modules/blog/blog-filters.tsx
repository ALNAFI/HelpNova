"use client";

import type { BlogCategory, BlogCategoryId } from "@/types/editorial";
import { cn } from "@/utils/cn";

type BlogFiltersProps = {
  categories: BlogCategory[];
  active: BlogCategoryId;
  onChange: (id: BlogCategoryId) => void;
};

export function BlogFilters({
  categories,
  active,
  onChange,
}: BlogFiltersProps) {
  return (
    <div
      role="tablist"
      aria-label="Article categories"
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
