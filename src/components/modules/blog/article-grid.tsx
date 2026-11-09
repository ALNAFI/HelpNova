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
      const cards = el.querySelectorAll<HTMLElement>(
        "[data-blog-card], [data-blog-empty]",
      );
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
        <p
          data-blog-empty
          className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted"
        >
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

  const [featured, ...rest] = posts;
  const sideCard = rest[0];
  const remaining = rest.slice(1);

  return (
    <div ref={ref} className="space-y-5">
      <div className="grid grid-cols-1 items-start gap-5 md:grid-cols-2 lg:grid-cols-3">
        <ArticleCard
          post={featured}
          variant="large"
          className={cn(sideCard && "md:col-span-2 lg:col-span-2")}
        />
        {sideCard ? (
          <ArticleCard post={sideCard} variant="standard" />
        ) : null}
      </div>

      {remaining.length > 0 ? (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {remaining.map((post) => (
            <ArticleCard
              key={post.id}
              post={post}
              variant="standard"
              className="h-full"
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
