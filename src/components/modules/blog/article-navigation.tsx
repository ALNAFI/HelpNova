import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { blogPageCopy } from "@/data/editorial/blog";
import type { BlogPost } from "@/types/editorial";
import { cn } from "@/utils/cn";

type ArticleNavigationProps = {
  previous: BlogPost | null;
  next: BlogPost | null;
};

export function ArticleNavigation({
  previous,
  next,
}: ArticleNavigationProps) {
  if (!previous && !next) return null;

  return (
    <nav
      aria-label="Article navigation"
      className="border-y border-border/80 py-8 sm:py-10"
    >
      <Container>
        <div className="grid gap-4 md:grid-cols-2">
          {previous ? (
            <NavCard
              href={`/blog/${previous.slug}`}
              eyebrow={blogPageCopy.previousArticle}
              title={previous.title}
              direction="previous"
            />
          ) : (
            <div className="hidden md:block" />
          )}
          {next ? (
            <NavCard
              href={`/blog/${next.slug}`}
              eyebrow={blogPageCopy.nextArticle}
              title={next.title}
              direction="next"
              className="md:text-right"
            />
          ) : null}
        </div>
      </Container>
    </nav>
  );
}

function NavCard({
  href,
  eyebrow,
  title,
  direction,
  className,
}: {
  href: string;
  eyebrow: string;
  title: string;
  direction: "previous" | "next";
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group rounded-[1.35rem] border border-border bg-surface p-5 shadow-[var(--shadow-soft)] transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-0.5 hover:border-accent/35 hover:shadow-[0_18px_40px_color-mix(in_oklab,var(--accent)_12%,transparent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:p-6",
        className,
      )}
    >
      <div
        className={cn(
          "flex items-center gap-2 text-xs font-semibold tracking-[0.14em] text-muted uppercase",
          direction === "next" && "md:justify-end",
        )}
      >
        {direction === "previous" ? (
          <ArrowLeft
            className="size-3.5 transition-transform group-hover:-translate-x-0.5"
            aria-hidden
          />
        ) : null}
        {eyebrow}
        {direction === "next" ? (
          <ArrowRight
            className="size-3.5 transition-transform group-hover:translate-x-0.5"
            aria-hidden
          />
        ) : null}
      </div>
      <p className="mt-3 font-heading text-lg font-semibold tracking-tight text-balance transition-colors group-hover:text-accent sm:text-xl">
        {title}
      </p>
    </Link>
  );
}
