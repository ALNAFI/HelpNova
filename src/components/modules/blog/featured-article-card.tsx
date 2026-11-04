import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ArticleVisual } from "@/components/modules/blog/article-visual";
import {
  blogPageCopy,
  formatBlogDate,
  getBlogCategoryLabel,
} from "@/data/editorial/blog";
import type { BlogPost } from "@/types/editorial";
import { cn } from "@/utils/cn";

type FeaturedArticleCardProps = {
  post: BlogPost;
  active?: boolean;
  className?: string;
};

export function FeaturedArticleCard({
  post,
  active = false,
  className,
}: FeaturedArticleCardProps) {
  const href = `/blog/${post.slug}`;
  const category = getBlogCategoryLabel(post.category);

  return (
    <article
      className={cn(
        "group relative flex h-full min-h-[28rem] flex-col overflow-hidden rounded-[1.6rem] border border-border bg-surface shadow-[var(--shadow-soft)] transition-[opacity,transform] duration-500 sm:min-h-[30rem] lg:min-h-[32rem] lg:flex-row",
        active ? "opacity-100" : "opacity-70",
        className,
      )}
    >
      <div className="relative overflow-hidden lg:w-[54%]">
        <ArticleVisual
          visual={post.visual}
          className="aspect-[16/11] h-full min-h-[14rem] rounded-none transition-transform duration-700 group-hover:scale-[1.03] lg:aspect-auto lg:min-h-full"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-black/10" />
      </div>

      <div className="relative flex flex-1 flex-col justify-between p-6 sm:p-8 lg:p-10">
        <div>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-[11px] font-medium tracking-[0.14em] text-muted uppercase">
            <span className="rounded-full bg-accent-soft px-2.5 py-1 text-accent">
              {category}
            </span>
            <span>{post.readingTime}</span>
            <span aria-hidden>·</span>
            <time dateTime={post.publishedAt}>
              {formatBlogDate(post.publishedAt)}
            </time>
          </div>
          <h3 className="mt-4 font-heading text-[1.65rem] leading-[1.15] font-semibold tracking-tight text-balance sm:text-[2rem] lg:text-[2.25rem]">
            <Link
              href={href}
              className="transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {post.title}
            </Link>
          </h3>
          <p className="mt-4 max-w-xl text-[0.975rem] leading-7 text-muted">
            {post.excerpt}
          </p>
        </div>

        <div className="mt-8">
          <Link
            href={href}
            className="inline-flex items-center gap-2 rounded-[var(--radius-control)] bg-accent px-5 py-3 text-sm font-medium text-accent-foreground shadow-[0_12px_28px_color-mix(in_oklab,var(--accent)_28%,transparent)] transition-[transform,filter] hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring active:scale-[0.98]"
          >
            {blogPageCopy.readArticle}
            <ArrowUpRight className="size-4" aria-hidden />
          </Link>
        </div>
      </div>
    </article>
  );
}
