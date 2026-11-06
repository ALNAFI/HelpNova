"use client";

import { useId, useMemo, useRef, useState } from "react";
import { Search, SearchX, X } from "lucide-react";
import { integrationIconById } from "@/components/modules/integrations/integration-icons";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import {
  allIntegrations,
  filterIntegrations,
  formatIntegrationCount,
  integrationCategories,
} from "@/data/marketing/integrations";
import { integrationsPageCopy } from "@/data/marketing/integrations-page";
import type { IntegrationCategory } from "@/types/marketing";
import { cn } from "@/utils/cn";

type CategoryFilter = IntegrationCategory | "all";

export function IntegrationsDirectory() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<CategoryFilter>("all");
  const searchRef = useRef<HTMLInputElement>(null);
  const searchId = useId();
  const groupId = useId();
  const copy = integrationsPageCopy.directory;

  const visible = useMemo(
    () => filterIntegrations(allIntegrations, query, category),
    [query, category],
  );

  const countLabel = formatIntegrationCount(visible.length);

  function clearSearch() {
    setQuery("");
    searchRef.current?.focus();
  }

  function clearAllFilters() {
    setQuery("");
    setCategory("all");
    searchRef.current?.focus();
  }

  return (
    <section
      id={copy.id}
      className="scroll-mt-28 border-t border-border py-16 sm:py-20 lg:py-24"
    >
      <Container>
        <SectionHeading
          title={copy.title}
          description={copy.description}
          className="mb-8 max-w-2xl"
        />

        <div className="rounded-2xl border border-border bg-surface px-4 py-4 sm:px-5">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <label htmlFor={searchId} className="text-sm font-medium">
                {copy.searchLabel}
              </label>
              <p
                className="text-sm text-muted tabular-nums"
                aria-live="polite"
                aria-atomic="true"
              >
                {countLabel}
              </p>
            </div>

            <div className="relative">
              <Search
                className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted"
                aria-hidden
              />
              <input
                ref={searchRef}
                id={searchId}
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={copy.searchPlaceholder}
                className="h-11 w-full rounded-[var(--radius-control)] border border-border bg-surface pr-11 pl-10 text-sm outline-none transition placeholder:text-muted focus:border-accent/40 focus:ring-2 focus:ring-accent/20"
              />
              {query.trim().length > 0 ? (
                <button
                  type="button"
                  onClick={clearSearch}
                  className="absolute top-1/2 right-2 inline-flex size-8 -translate-y-1/2 items-center justify-center rounded-lg text-muted transition hover:bg-surface-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  aria-label={copy.clearSearchLabel}
                >
                  <X className="size-4" />
                </button>
              ) : null}
            </div>

            <div
              role="radiogroup"
              aria-label={copy.categoryGroupLabel}
              className="flex flex-wrap gap-2"
            >
              <CategoryChip
                name={groupId}
                label={copy.allLabel}
                checked={category === "all"}
                onSelect={() => setCategory("all")}
              />
              {integrationCategories.map((item) => (
                <CategoryChip
                  key={item}
                  name={groupId}
                  label={item}
                  checked={category === item}
                  onSelect={() => setCategory(item)}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 min-h-[20rem]">
          {visible.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-[var(--radius-workspace)] border border-dashed border-border bg-surface px-6 py-14 text-center">
              <span className="flex size-12 items-center justify-center rounded-2xl bg-accent-soft text-accent">
                <SearchX className="size-5" aria-hidden />
              </span>
              <h3 className="mt-4 max-w-md font-heading text-lg font-semibold text-balance">
                {integrationsPageCopy.empty.title}
              </h3>
              <button
                type="button"
                onClick={clearAllFilters}
                className="mt-5 inline-flex h-11 items-center justify-center rounded-[var(--radius-control)] bg-accent px-4 text-sm font-medium text-accent-foreground transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                {integrationsPageCopy.empty.actionLabel}
              </button>
            </div>
          ) : (
            <ul className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
              {visible.map((item) => {
                const Icon = integrationIconById[item.id];
                return (
                  <li key={item.id} className="min-w-0">
                    <article
                      className={cn(
                        "group flex h-full flex-col rounded-[var(--radius-card)] border border-border bg-surface p-3.5 shadow-[var(--shadow-soft)] sm:p-4",
                        "transition-[transform,border-color,background-color,box-shadow] duration-200",
                        "hover:-translate-y-[2px] hover:border-accent/40 hover:bg-surface-muted/30",
                        "motion-reduce:hover:translate-y-0",
                      )}
                    >
                      <div className="flex min-w-0 items-start gap-2.5">
                        <span className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-border bg-surface-muted text-accent transition-colors duration-200 group-hover:bg-accent-soft">
                          {Icon ? (
                            <Icon className="size-[1.125rem]" aria-hidden />
                          ) : null}
                        </span>
                        <div className="min-w-0">
                          <h3 className="font-heading text-[15px] leading-snug font-semibold">
                            {item.name}
                          </h3>
                          <span className="mt-1.5 inline-flex w-fit max-w-full truncate rounded-full border border-border bg-surface-muted px-2 py-0.5 text-[10px] font-medium tracking-wide text-muted">
                            {item.category}
                          </span>
                        </div>
                      </div>

                      <p className="mt-2 text-[13px] leading-[1.55] text-pretty text-muted">
                        {item.description}
                      </p>
                    </article>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </Container>
    </section>
  );
}

function CategoryChip({
  name,
  label,
  checked,
  onSelect,
}: {
  name: string;
  label: string;
  checked: boolean;
  onSelect: () => void;
}) {
  return (
    <label
      className={cn(
        "inline-flex cursor-pointer items-center rounded-full border px-3 py-1.5 text-xs font-medium transition focus-within:outline-none focus-within:ring-2 focus-within:ring-ring",
        checked
          ? "border-accent/40 bg-accent text-accent-foreground"
          : "border-border bg-surface text-muted hover:text-foreground",
      )}
    >
      <input
        type="radio"
        name={name}
        checked={checked}
        onChange={onSelect}
        className="sr-only"
      />
      {checked ? (
        <span
          className="mr-1.5 size-1.5 rounded-full bg-accent-foreground"
          aria-hidden
        />
      ) : null}
      {label}
    </label>
  );
}
