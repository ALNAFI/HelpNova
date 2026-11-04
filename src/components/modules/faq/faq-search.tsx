"use client";

import { Search, X } from "lucide-react";
import { cn } from "@/utils/cn";

type FaqSearchProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  id?: string;
  className?: string;
};

export function FaqSearch({
  value,
  onChange,
  placeholder,
  id = "faq-search",
  className,
}: FaqSearchProps) {
  return (
    <div className={cn("w-full max-w-[40rem]", className)}>
      <label htmlFor={id} className="sr-only">
        Search FAQ answers
      </label>
      <div
        className={cn(
          "group relative flex items-center rounded-2xl border border-border-strong bg-surface/90 shadow-[var(--shadow-soft)] backdrop-blur-sm transition-[border-color,box-shadow] duration-200",
          "focus-within:border-accent focus-within:shadow-[0_0_0_4px_color-mix(in_oklab,var(--accent)_18%,transparent)]",
        )}
      >
        <Search
          className="pointer-events-none absolute left-4 size-[1.125rem] text-muted transition-colors group-focus-within:text-accent"
          aria-hidden
        />
        <input
          id={id}
          type="search"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          autoComplete="off"
          className="h-[3.25rem] w-full rounded-2xl bg-transparent py-3 pr-12 pl-12 text-[15px] text-foreground outline-none placeholder:text-muted sm:text-base"
        />
        {value ? (
          <button
            type="button"
            onClick={() => onChange("")}
            className="absolute right-2.5 inline-flex size-8 items-center justify-center rounded-full text-muted transition-colors hover:bg-surface-muted hover:text-foreground"
            aria-label="Clear search"
          >
            <X className="size-4" aria-hidden />
          </button>
        ) : null}
      </div>
    </div>
  );
}
