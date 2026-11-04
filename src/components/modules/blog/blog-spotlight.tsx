"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ArticleVisual } from "@/components/modules/blog/article-visual";
import { Container } from "@/components/ui/container";
import {
  blogPageCopy,
  formatBlogDate,
  getBlogCategoryLabel,
} from "@/data/editorial/blog";
import { getGsap } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import type { BlogPost } from "@/types/editorial";

type BlogSpotlightProps = {
  post: BlogPost;
};

export function BlogSpotlight({ post }: BlogSpotlightProps) {
  const ref = useRef<HTMLElement>(null);
  const reducedMotion = usePrefersReducedMotion();
  const href = `/blog/${post.slug}`;

  useEffect(() => {
    const el = ref.current;
    if (!el || reducedMotion) return;
    const { gsap } = getGsap();
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-blog-spotlight]",
        { y: 24, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.7,
          stagger: 0.08,
          ease: "power3.out",
          immediateRender: false,
          scrollTrigger: { trigger: el, start: "top 84%" },
        },
      );
    }, el);
    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      ref={ref}
      className="relative py-10 sm:py-14"
      aria-labelledby="blog-spotlight-heading"
    >
      <Container>
        <div className="overflow-hidden rounded-[1.75rem] border border-border bg-[linear-gradient(145deg,color-mix(in_oklab,var(--surface)_92%,var(--accent-soft)),var(--surface))] shadow-[var(--shadow-soft)]">
          <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
            <div className="relative order-2 overflow-hidden lg:order-1">
              <ArticleVisual
                visual={post.visual}
                tone="spotlight"
                className="min-h-[18rem] rounded-none lg:min-h-full"
              />
            </div>
            <div className="relative order-1 flex flex-col justify-center p-6 sm:p-8 lg:order-2 lg:p-10 xl:p-12">
              <p
                data-blog-spotlight
                className="text-xs font-semibold tracking-[0.16em] text-accent uppercase"
              >
                {blogPageCopy.spotlightEyebrow}
              </p>
              <div
                data-blog-spotlight
                className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2 text-[11px] font-medium tracking-wide text-muted uppercase"
              >
                <span className="rounded-full bg-accent-soft px-2.5 py-1 text-accent">
                  {getBlogCategoryLabel(post.category)}
                </span>
                <span>{post.readingTime}</span>
                <span aria-hidden>·</span>
                <time dateTime={post.publishedAt}>
                  {formatBlogDate(post.publishedAt)}
                </time>
              </div>
              <h2
                id="blog-spotlight-heading"
                data-blog-spotlight
                className="mt-4 font-heading text-[1.85rem] leading-[1.12] font-semibold tracking-tight text-balance sm:text-[2.35rem]"
              >
                {post.title}
              </h2>
              <p
                data-blog-spotlight
                className="mt-4 max-w-lg text-[0.975rem] leading-7 text-muted"
              >
                {post.excerpt}
              </p>
              <div data-blog-spotlight className="mt-8">
                <Link
                  href={href}
                  className="inline-flex items-center gap-2 rounded-[var(--radius-control)] border border-border-strong bg-foreground px-5 py-3 text-sm font-medium text-background transition-[transform,opacity] hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring active:scale-[0.98]"
                >
                  {blogPageCopy.readStory}
                  <ArrowUpRight className="size-4" aria-hidden />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
