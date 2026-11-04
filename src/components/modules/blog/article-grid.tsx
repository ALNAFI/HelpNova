"use client";

import { useEffect, useRef } from "react";
import { SearchX } from "lucide-react";
import { ArticleCard } from "@/components/modules/blog/article-card";
import { Button } from "@/components/ui/button";
import { blogPageCopy } from "@/data/editorial/blog";
import { getGsap } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import type { BlogPost } from "@/types/editorial";
import { cn } from "@/utils/cn";

type ArticleGridProps = {
  posts: BlogPost[];
  onClear: () => void;
  hasFilters: boolean;
};

export function ArticleGrid({ posts, onClear, hasFilters }: ArticleGridProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || reducedMotion) return;
    const { gsap } = getGsap();
    const ctx = gsap.context(() => {
      const cards = el.querySelectorAll<HTMLElement>("[data-blog-card], [data-blog-empty]");
      gsap.fromTo(
        cards,
        { y: 18, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.55,
          stagger: 0.06,
          ease: "power3.out",
          immediateRender: false,
          overwrite: "auto",
        },
      );
    }, el);
    return () => ctx.revert();
  }, [posts, reducedMotion]);

  if (posts.length === 0) {
    return (
      <div
        ref={ref}
        className="rounded-[1.5rem] border border-dashed border-border-strong bg-surface/80 px-6 py-14 text-center shadow-[var(--shadow-soft)]"
        role="status"
        aria-live="polite"
      >
        <div
          data-blog-empty
          className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-accent-soft text-accent"
        >
          <SearchX className="size-5" aria-hidden />
        </div>
        <h3
          data-blog-empty
          className="mt-4 font-heading text-xl font-semibold tracking-tight"
        >
          {blogPageCopy.emptyTitle}
        </h3>
        <p data-blog-empty className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted">
          {blogPageCopy.emptyDescription}
        </p>
        {hasFilters ? (
          <div data-blog-empty className="mt-6">
            <Button type="button" variant="secondary" onClick={onClear}>
              {blogPageCopy.clearFiltersLabel}
            </Button>
          </div>
        ) : null}
      </div>
    );
  }

  const [first, second, third, ...rest] = posts;

  return (
    <div ref={ref} className="space-y-5">
      <div className="grid gap-5 lg:grid-cols-12">
        {first ? (
          <ArticleCard
            post={first}
            variant="large"
            className="lg:col-span-7"
          />
        ) : null}
        {second ? (
          <ArticleCard
            post={second}
            variant="text-led"
            className="lg:col-span-5"
          />
        ) : null}
      </div>

      {(third || rest.length > 0) && (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {third ? (
            <ArticleCard
              post={third}
              variant="image-first"
              className={cn(rest.length === 0 && "md:col-span-2 xl:col-span-1")}
            />
          ) : null}
          {rest.map((post, index) => (
            <ArticleCard
              key={post.id}
              post={post}
              variant={
                index % 3 === 0
                  ? "compact"
                  : index % 3 === 1
                    ? "image-first"
                    : "text-led"
              }
              className={index === 0 && rest.length === 1 ? "md:col-span-1" : undefined}
            />
          ))}
        </div>
      )}
    </div>
  );
}
