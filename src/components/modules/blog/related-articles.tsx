"use client";

import { useEffect, useRef } from "react";
import { ArticleCard } from "@/components/modules/blog/article-card";
import { Container } from "@/components/ui/container";
import { blogPageCopy } from "@/data/editorial/blog";
import { getGsap } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import type { BlogPost } from "@/types/editorial";

type RelatedArticlesProps = {
  posts: BlogPost[];
};

export function RelatedArticles({ posts }: RelatedArticlesProps) {
  const ref = useRef<HTMLElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || reducedMotion || posts.length === 0) return;
    const { gsap } = getGsap();
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-related]",
        { y: 20, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.6,
          stagger: 0.08,
          ease: "power3.out",
          immediateRender: false,
          scrollTrigger: { trigger: el, start: "top 86%" },
        },
      );
    }, el);
    return () => ctx.revert();
  }, [posts, reducedMotion]);

  if (posts.length === 0) return null;

  return (
    <section
      ref={ref}
      className="relative py-12 sm:py-16"
      aria-labelledby="related-articles-heading"
    >
      <Container>
        <div data-related className="max-w-2xl">
          <h2
            id="related-articles-heading"
            className="font-heading text-[1.75rem] font-semibold tracking-tight sm:text-[2.1rem]"
          >
            {blogPageCopy.relatedTitle}
          </h2>
          <p className="mt-3 text-base leading-7 text-muted">
            {blogPageCopy.relatedDescription}
          </p>
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {posts.map((post, index) => (
            <div key={post.id} data-related>
              <ArticleCard
                post={post}
                variant={
                  index === 0
                    ? "image-first"
                    : index === 1
                      ? "text-led"
                      : "compact"
                }
              />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
