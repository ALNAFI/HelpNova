import Link from "next/link";
import { Container } from "@/components/ui/container";
import type { BlogPost } from "@/types/editorial";
import { cn } from "@/utils/cn";

type ArticleNavigationProps = {
  previous: BlogPost | null;
  next: BlogPost | null;
};

const linkClassName = cn(
  "group inline-flex max-w-full items-center gap-2 border-b-[0.5px] border-[#3a3649] py-1 text-sm text-[#f2f0fa] no-underline transition-[border-color] duration-150",
  "hover:border-[#8b7cf6]",
  "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8b7cf6]",
);

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
        <div className="grid gap-4 md:grid-cols-2 md:items-center">
          {previous ? (
            <div className="flex md:justify-start">
              <PreviousArticleLink
                href={`/blog/${previous.slug}`}
                title={previous.title}
              />
            </div>
          ) : (
            <div className="hidden md:block" />
          )}
          {next ? (
            <div className="flex md:justify-end">
              <NextArticleLink
                href={`/blog/${next.slug}`}
                title={next.title}
              />
            </div>
          ) : null}
        </div>
      </Container>
    </nav>
  );
}

function PreviousArticleLink({
  href,
  title,
}: {
  href: string;
  title: string;
}) {
  return (
    <Link href={href} className={linkClassName}>
      <svg
        className="size-3.5 shrink-0 text-[#8b7cf6] transition-transform duration-150 group-hover:-translate-x-0.5"
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M19 12H5M11 6l-6 6 6 6" />
      </svg>
      <span className="shrink-0 text-[#8d89a0]">Previous:</span>
      <span className="min-w-0 max-w-[60vw] truncate sm:max-w-none sm:overflow-visible sm:whitespace-normal">
        {title}
      </span>
    </Link>
  );
}

function NextArticleLink({ href, title }: { href: string; title: string }) {
  return (
    <Link href={href} className={linkClassName}>
      <span className="shrink-0 text-[#8d89a0]">Next:</span>
      <span className="min-w-0 max-w-[60vw] truncate sm:max-w-none sm:overflow-visible sm:whitespace-normal">
        {title}
      </span>
      <svg
        className="size-3.5 shrink-0 text-[#8b7cf6] transition-transform duration-150 group-hover:translate-x-0.5"
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M5 12h14M13 6l6 6-6 6" />
      </svg>
    </Link>
  );
}
