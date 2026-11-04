"use client";

import { useMemo, useState } from "react";
import { ArticleGrid } from "@/components/modules/blog/article-grid";
import { BlogCta } from "@/components/modules/blog/blog-cta";
import { BlogFilters } from "@/components/modules/blog/blog-filters";
import { BlogHero } from "@/components/modules/blog/blog-hero";
import { BlogSearch } from "@/components/modules/blog/blog-search";
import { BlogSpotlight } from "@/components/modules/blog/blog-spotlight";
import { FeaturedCarousel } from "@/components/modules/blog/featured-carousel";
import { Container } from "@/components/ui/container";
import {
  blogCategories,
  blogPageCopy,
  blogPosts,
  featuredBlogPosts,
  getBlogCategoryLabel,
  spotlightPost,
} from "@/data/editorial/blog";
import type { BlogCategoryId } from "@/types/editorial";

function normalize(value: string) {
  return value.trim().toLowerCase();
}

export function BlogPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<BlogCategoryId>("all");

  const filtered = useMemo(() => {
    const q = normalize(query);
    return blogPosts.filter((post) => {
      const matchesCategory = category === "all" || post.category === category;
      if (!matchesCategory) return false;
      if (!q) return true;
      const haystack = normalize(
        `${post.title} ${post.excerpt} ${post.category} ${getBlogCategoryLabel(post.category)} ${post.contentPreview.join(" ")}`,
      );
      return haystack.includes(q);
    });
  }, [category, query]);

  const hasFilters = Boolean(query.trim()) || category !== "all";

  const resultLabel = useMemo(() => {
    if (hasFilters) {
      return `${filtered.length} of ${blogPosts.length} articles`;
    }
    return `${blogPosts.length} articles`;
  }, [filtered.length, hasFilters]);

  const clearFilters = () => {
    setQuery("");
    setCategory("all");
  };

  return (
    <div className="relative isolate overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_50%_at_50%_-8%,var(--glow),transparent_58%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[32rem] bg-grid-fade [mask-image:linear-gradient(to_bottom,black_40%,transparent_100%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute top-[22%] right-[-12%] size-[28rem] rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--accent)_14%,transparent),transparent_70%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute top-[58%] left-[-14%] size-[24rem] rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--accent)_10%,transparent),transparent_72%)]"
        aria-hidden
      />

      <BlogHero />
      <FeaturedCarousel posts={featuredBlogPosts} />

      <section
        className="relative py-10 sm:py-12"
        aria-labelledby="blog-explore-heading"
      >
        <Container>
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-[0.16em] text-accent uppercase">
              {blogPageCopy.exploreEyebrow}
            </p>
            <h2
              id="blog-explore-heading"
              className="mt-2 font-heading text-[1.75rem] font-semibold tracking-tight text-balance sm:text-[2.15rem]"
            >
              {blogPageCopy.exploreTitle}
            </h2>
            <p className="mt-3 text-base leading-7 text-muted">
              {blogPageCopy.exploreDescription}
            </p>
          </div>

          <div className="mt-7 space-y-4">
            <BlogSearch
              value={query}
              onChange={setQuery}
              placeholder={blogPageCopy.searchPlaceholder}
            />
            <BlogFilters
              categories={blogCategories}
              active={category}
              onChange={setCategory}
            />
            <p className="text-sm text-muted" aria-live="polite">
              {resultLabel}
            </p>
          </div>

          <div className="mt-7">
            <ArticleGrid
              posts={filtered}
              onClear={clearFilters}
              hasFilters={hasFilters}
            />
          </div>
        </Container>
      </section>

      <BlogSpotlight post={spotlightPost} />
      <BlogCta />
    </div>
  );
}
