"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArticleShare } from "@/components/modules/blog/article-share";
import { ArticleVisual } from "@/components/modules/blog/article-visual";
import { Container } from "@/components/ui/container";
import {
  formatBlogDate,
  getBlogCategoryLabel,
} from "@/data/editorial/blog";
import { getGsap } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import type { BlogPost } from "@/types/editorial";

type ArticleHeroProps = {
  post: BlogPost;
};

export function ArticleHero({ post }: ArticleHeroProps) {
  const ref = useRef<HTMLElement>(null);
  const reducedMotion = usePrefersReducedMotion();
  const category = getBlogCategoryLabel(post.category);

  useEffect(() => {
    const el = ref.current;
    if (!el || reducedMotion) return;
    const { gsap } = getGsap();
    const ctx = gsap.context(() => {
      gsap.set("[data-article-hero]", { clearProps: "all" });
      gsap.fromTo(
        "[data-article-hero]",
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
        "[data-article-cover]",
        { y: 24, autoAlpha: 0, scale: 0.985 },
        {
          y: 0,
          autoAlpha: 1,
          scale: 1,
          duration: 0.8,
          delay: 0.12,
          ease: "power3.out",
          immediateRender: false,
        },
      );
    }, el);
    return () => ctx.revert();
  }, [reducedMotion, post.slug]);

  return (
    <header ref={ref} className="relative pt-8 pb-6 sm:pt-12 sm:pb-8">
      <Container>
        <nav aria-label="Breadcrumb" data-article-hero>
          <ol className="flex flex-wrap items-center gap-2 text-sm text-muted">
            <li>
              <Link
                href="/"
                className="transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                Home
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li>
              <Link
                href="/blog"
                className="transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                Blog
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li className="max-w-[16rem] truncate text-foreground sm:max-w-md">
              <span aria-current="page">{post.title}</span>
            </li>
          </ol>
        </nav>

        <div className="mt-8 max-w-3xl">
          <div
            data-article-hero
            className="flex flex-wrap items-center gap-x-3 gap-y-2 text-[11px] font-medium tracking-[0.14em] text-muted uppercase"
          >
            <span className="rounded-full bg-accent-soft px-2.5 py-1 text-accent">
              {category}
            </span>
            <span>{post.readingTime}</span>
            <span aria-hidden>·</span>
            <time dateTime={post.publishedAt}>
              {formatBlogDate(post.publishedAt)}
            </time>
          </div>

          <h1
            data-article-hero
            className="mt-5 font-heading text-[2.1rem] leading-[1.08] font-semibold tracking-tight text-balance sm:text-[2.75rem] lg:text-[3.25rem]"
          >
            {post.title}
          </h1>

          <p
            data-article-hero
            className="mt-5 max-w-2xl text-base leading-7 text-muted sm:text-[1.05rem] sm:leading-8"
          >
            {post.excerpt}
          </p>

          <div data-article-hero className="mt-6">
            <ArticleShare title={post.title} />
          </div>
        </div>

        <div data-article-cover className="mt-8 sm:mt-10">
          <ArticleVisual
            visual={post.visual}
            tone="spotlight"
            className="min-h-[16rem] rounded-[1.6rem] shadow-[var(--shadow-soft)] sm:min-h-[20rem] lg:min-h-[24rem]"
          />
        </div>
      </Container>
    </header>
  );
}
