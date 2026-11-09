import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ArticleVisual } from "@/components/modules/blog/article-visual";
import {
  formatBlogDate,
  getBlogCategoryLabel,
} from "@/data/editorial/blog";
import type { BlogPost } from "@/types/editorial";
import { cn } from "@/utils/cn";

type ArticleCardVariant = BlogPost["layout"] | "large" | "standard";

type ArticleCardProps = {
  post: BlogPost;
  variant?: ArticleCardVariant;
  /** Tighter spacing for the Keep Exploring section only. */
  density?: "default" | "related";
  className?: string;
};

export function ArticleCard({
  post,
  variant = "standard",
  density = "default",
  className,
}: ArticleCardProps) {
  const href = `/blog/${post.slug}`;
  const category = getBlogCategoryLabel(post.category);
  const isLarge = variant === "large" || variant === "editorial";
  const isRelated = density === "related";

  return (
    <Link
      href={href}
      data-blog-card
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-[1.35rem] border border-border bg-surface shadow-[var(--shadow-soft)] transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-[0_22px_50px_color-mix(in_oklab,var(--accent)_14%,transparent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        className,
      )}
    >
      <div className="shrink-0 overflow-hidden">
        <ArticleVisual
          visual={post.visual}
          className={cn(
            "aspect-[16/11] w-full rounded-none transition-transform duration-500 group-hover:scale-[1.04]",
            isLarge && !isRelated && "aspect-[16/10]",
            isRelated && "aspect-[16/10]",
          )}
        />
      </div>
      <div
        className={cn(
          "flex min-h-0 flex-1 flex-col",
          isRelated ? "p-4" : "p-5 sm:p-6",
          isLarge && !isRelated && "sm:p-7",
        )}
      >
        <Meta
          category={category}
          readingTime={post.readingTime}
          publishedAt={post.publishedAt}
          compact={isRelated}
        />
        <h3
          className={cn(
            "font-heading font-semibold tracking-tight text-balance transition-colors group-hover:text-accent",
            isRelated ? "mt-2.5 text-base sm:text-lg" : "mt-3",
            !isRelated && (isLarge ? "text-xl sm:text-2xl" : "text-lg sm:text-xl"),
          )}
        >
          {post.title}
        </h3>
        <p
          className={cn(
            "line-clamp-3 text-sm text-muted",
            isRelated ? "mt-1.5 leading-5" : "mt-2 leading-6",
            isLarge && !isRelated && "sm:text-[0.95rem] sm:leading-7",
          )}
        >
          {post.excerpt}
        </p>
        <CardFooter className={cn("mt-auto", isRelated ? "pt-3.5" : "pt-5")} />
      </div>
    </Link>
  );
}

function Meta({
  category,
  readingTime,
  publishedAt,
  compact = false,
}: {
  category: string;
  readingTime: string;
  publishedAt: string;
  compact?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-x-2 text-[11px] font-medium tracking-wide text-muted uppercase",
        compact ? "min-h-7 flex-nowrap overflow-hidden" : "flex-wrap gap-y-1",
      )}
    >
      <span
        className={cn(
          "rounded-full bg-accent-soft px-2.5 py-1 text-accent",
          compact && "max-w-[42%] shrink-0 truncate",
        )}
      >
        {category}
      </span>
      <span className="shrink-0 whitespace-nowrap">{readingTime}</span>
      <span className="shrink-0" aria-hidden>
        ·
      </span>
      <time
        dateTime={publishedAt}
        className={cn(
          "whitespace-nowrap",
          compact && "min-w-0 truncate",
        )}
      >
        {formatBlogDate(publishedAt)}
      </time>
    </div>
  );
}

function CardFooter({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5 self-start text-sm font-medium text-foreground",
        className,
      )}
    >
      Read article
      <ArrowUpRight
        className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        aria-hidden
      />
    </div>
  );
}
