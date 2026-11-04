import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ArticleVisual } from "@/components/modules/blog/article-visual";
import {
  formatBlogDate,
  getBlogCategoryLabel,
} from "@/data/editorial/blog";
import type { BlogPost } from "@/types/editorial";
import { cn } from "@/utils/cn";

type ArticleCardProps = {
  post: BlogPost;
  variant?: BlogPost["layout"] | "large";
  className?: string;
};

export function ArticleCard({
  post,
  variant = post.layout,
  className,
}: ArticleCardProps) {
  const href = `/blog/${post.slug}`;
  const category = getBlogCategoryLabel(post.category);

  if (variant === "text-led") {
    return (
      <Link
        href={href}
        data-blog-card
        className={cn(
          "group relative flex h-full flex-col justify-between overflow-hidden rounded-[1.35rem] border border-border bg-surface p-6 shadow-[var(--shadow-soft)] transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-[0_22px_50px_color-mix(in_oklab,var(--accent)_14%,transparent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:p-7",
          className,
        )}
      >
        <div>
          <Meta
            category={category}
            readingTime={post.readingTime}
            publishedAt={post.publishedAt}
          />
          <h3 className="mt-4 font-heading text-xl font-semibold tracking-tight text-balance transition-colors group-hover:text-accent sm:text-2xl">
            {post.title}
          </h3>
          <p className="mt-3 text-sm leading-6 text-muted sm:text-[0.95rem] sm:leading-7">
            {post.excerpt}
          </p>
        </div>
        <CardFooter />
      </Link>
    );
  }

  if (variant === "compact") {
    return (
      <Link
        href={href}
        data-blog-card
        className={cn(
          "group grid h-full overflow-hidden rounded-[1.35rem] border border-border bg-surface shadow-[var(--shadow-soft)] transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-[0_22px_50px_color-mix(in_oklab,var(--accent)_14%,transparent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:grid-cols-[0.9fr_1.1fr]",
          className,
        )}
      >
        <div className="overflow-hidden">
          <ArticleVisual
            visual={post.visual}
            className="h-full min-h-[10rem] rounded-none transition-transform duration-500 group-hover:scale-[1.04] sm:min-h-full sm:rounded-none"
          />
        </div>
        <div className="flex flex-col justify-between p-5 sm:p-6">
          <div>
            <Meta
              category={category}
              readingTime={post.readingTime}
              publishedAt={post.publishedAt}
            />
            <h3 className="mt-3 font-heading text-lg font-semibold tracking-tight text-balance transition-colors group-hover:text-accent">
              {post.title}
            </h3>
            <p className="mt-2 line-clamp-3 text-sm leading-6 text-muted">
              {post.excerpt}
            </p>
          </div>
          <CardFooter className="mt-4" />
        </div>
      </Link>
    );
  }

  const isLarge = variant === "large" || variant === "editorial";

  return (
    <Link
      href={href}
      data-blog-card
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-[1.35rem] border border-border bg-surface shadow-[var(--shadow-soft)] transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-[0_22px_50px_color-mix(in_oklab,var(--accent)_14%,transparent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        className,
      )}
    >
      <div className="overflow-hidden">
        <ArticleVisual
          visual={post.visual}
          className={cn(
            "rounded-none transition-transform duration-500 group-hover:scale-[1.04]",
            isLarge ? "aspect-[16/10]" : "aspect-[16/11]",
          )}
        />
      </div>
      <div className={cn("flex flex-1 flex-col p-5 sm:p-6", isLarge && "sm:p-7")}>
        <Meta
          category={category}
          readingTime={post.readingTime}
          publishedAt={post.publishedAt}
        />
        <h3
          className={cn(
            "mt-3 font-heading font-semibold tracking-tight text-balance transition-colors group-hover:text-accent",
            isLarge ? "text-xl sm:text-2xl" : "text-lg sm:text-xl",
          )}
        >
          {post.title}
        </h3>
        <p
          className={cn(
            "mt-2 text-sm leading-6 text-muted",
            isLarge ? "sm:text-[0.95rem] sm:leading-7" : "line-clamp-3",
          )}
        >
          {post.excerpt}
        </p>
        <CardFooter className="mt-auto pt-5" />
      </div>
    </Link>
  );
}

function Meta({
  category,
  readingTime,
  publishedAt,
}: {
  category: string;
  readingTime: string;
  publishedAt: string;
}) {
  return (
    <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[11px] font-medium tracking-wide text-muted uppercase">
      <span className="rounded-full bg-accent-soft px-2.5 py-1 text-accent">
        {category}
      </span>
      <span>{readingTime}</span>
      <span aria-hidden>·</span>
      <time dateTime={publishedAt}>{formatBlogDate(publishedAt)}</time>
    </div>
  );
}

function CardFooter({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5 text-sm font-medium text-foreground",
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
