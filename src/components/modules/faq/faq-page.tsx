"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { SearchX } from "lucide-react";
import { FaqAccordion } from "@/components/modules/faq/faq-accordion";
import { FaqCategories } from "@/components/modules/faq/faq-categories";
import { FaqCta } from "@/components/modules/faq/faq-cta";
import { FaqSearch } from "@/components/modules/faq/faq-search";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import {
  faqCategories,
  faqItems,
  faqPageCopy,
} from "@/data/marketing/faq";
import { getGsap } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import type { FaqCategoryId } from "@/types/marketing";

function normalize(value: string) {
  return value.trim().toLowerCase();
}

export function FaqPage() {
  const pageRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<FaqCategoryId>("all");

  const categoryLabels = useMemo(
    () =>
      Object.fromEntries(
        faqCategories
          .filter((item) => item.id !== "all")
          .map((item) => [item.id, item.label]),
      ),
    [],
  );

  const filtered = useMemo(() => {
    const q = normalize(query);
    return faqItems.filter((item) => {
      const matchesCategory =
        category === "all" || item.category === category;
      if (!matchesCategory) return false;
      if (!q) return true;
      const haystack = normalize(
        `${item.question} ${item.answer} ${item.category ?? ""} ${
          item.category ? (categoryLabels[item.category] ?? "") : ""
        }`,
      );
      return haystack.includes(q);
    });
  }, [category, categoryLabels, query]);

  const resultLabel = useMemo(() => {
    const count = filtered.length;
    const total = faqItems.length;
    if (query.trim() || category !== "all") {
      return `${count} of ${total} answers`;
    }
    return `${total} answers`;
  }, [category, filtered.length, query]);

  const clearFilters = () => {
    setQuery("");
    setCategory("all");
  };

  useEffect(() => {
    const el = pageRef.current;
    if (!el || reducedMotion) return;
    const { gsap } = getGsap();
    const ctx = gsap.context(() => {
      const targets = el.querySelectorAll<HTMLElement>("[data-faq-hero]");
      gsap.set(targets, { clearProps: "all" });
      gsap.fromTo(
        targets,
        { y: 18, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.65,
          stagger: 0.07,
          ease: "power3.out",
          immediateRender: false,
        },
      );

      gsap.fromTo(
        "[data-faq-main]",
        { y: 20, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.7,
          ease: "power3.out",
          immediateRender: false,
          delay: 0.15,
        },
      );
    }, el);
    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <div ref={pageRef} className="relative isolate overflow-hidden">
      {/* Continuous page atmosphere — no hard section cuts */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_55%_at_50%_-8%,var(--glow),transparent_58%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[34rem] bg-grid-fade [mask-image:linear-gradient(to_bottom,black_42%,transparent_100%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute top-[18%] left-[-12%] size-[26rem] rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--accent)_14%,transparent),transparent_70%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute top-[8%] right-[-10%] size-[22rem] rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--accent)_12%,transparent),transparent_72%)]"
        aria-hidden
      />

      <Container className="relative max-w-7xl pt-12 pb-16 sm:pt-14 sm:pb-20 lg:pt-16 lg:pb-24">
        <header className="mx-auto max-w-3xl text-center">
          <p
            data-faq-hero
            className="text-xs font-semibold tracking-[0.18em] text-accent uppercase"
          >
            {faqPageCopy.eyebrow}
          </p>
          <h1
            data-faq-hero
            className="mt-4 font-heading text-[2.5rem] font-semibold tracking-tight text-balance sm:text-5xl lg:text-[3.75rem] lg:leading-[1.05]"
          >
            {faqPageCopy.titleBefore}{" "}
            <span className="bg-gradient-to-r from-accent to-[color-mix(in_oklab,var(--accent)_72%,var(--foreground))] bg-clip-text text-transparent">
              {faqPageCopy.titleAccent}
            </span>
          </h1>
          <p
            data-faq-hero
            className="mx-auto mt-4 max-w-2xl text-base leading-7 text-muted sm:text-lg"
          >
            {faqPageCopy.description}
          </p>
          <div
            data-faq-hero
            className="mx-auto mt-8 flex w-full justify-center sm:mt-9"
          >
            <FaqSearch
              value={query}
              onChange={setQuery}
              placeholder={faqPageCopy.searchPlaceholder}
            />
          </div>
        </header>

        <div
          data-faq-main
          className="mt-12 grid items-start gap-6 lg:mt-14 lg:grid-cols-[14.5rem_minmax(0,1fr)] lg:gap-8 xl:grid-cols-[15rem_minmax(0,1fr)] xl:gap-10"
        >
          <aside className="hidden self-start lg:block">
            <div className="sticky top-24 rounded-2xl border border-border bg-surface/80 p-2.5 shadow-[var(--shadow-soft)] backdrop-blur-sm">
              <FaqCategories
                categories={faqCategories}
                active={category}
                onChange={setCategory}
                variant="sidebar"
              />
            </div>
          </aside>

          <div className="min-w-0">
            <div className="mb-5 lg:hidden">
              <FaqCategories
                categories={faqCategories}
                active={category}
                onChange={setCategory}
                variant="tabs"
              />
            </div>

            <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
              <div>
                <h2 className="font-heading text-2xl font-semibold tracking-tight text-foreground sm:text-[1.75rem]">
                  {faqPageCopy.sectionTitle}
                </h2>
                <p className="mt-1 text-sm text-muted" aria-live="polite">
                  {resultLabel}
                </p>
              </div>
              {query.trim() || category !== "all" ? (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={clearFilters}
                  className="text-muted"
                >
                  Clear filters
                </Button>
              ) : null}
            </div>

            {filtered.length > 0 ? (
              <FaqAccordion
                items={filtered}
                categoryLabels={categoryLabels}
              />
            ) : (
              <div className="rounded-2xl border border-dashed border-border-strong bg-surface/80 px-6 py-12 text-center shadow-[var(--shadow-soft)]">
                <div className="mx-auto mb-4 inline-flex size-11 items-center justify-center rounded-2xl bg-accent-soft text-accent">
                  <SearchX className="size-5" aria-hidden />
                </div>
                <h3 className="font-heading text-lg font-semibold tracking-tight text-foreground">
                  {faqPageCopy.emptyTitle}
                </h3>
                <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-muted">
                  {faqPageCopy.emptyDescription}
                </p>
                <div className="mt-5 flex justify-center">
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={clearFilters}
                  >
                    Clear Filters
                  </Button>
                </div>
              </div>
            )}

            <FaqCta />
          </div>
        </div>
      </Container>
    </div>
  );
}
