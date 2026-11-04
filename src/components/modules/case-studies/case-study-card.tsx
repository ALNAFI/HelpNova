import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ScenarioVisual } from "@/components/modules/case-studies/scenario-visual";
import { caseStudiesPageCopy } from "@/data/editorial/case-studies";
import type { CaseStudy } from "@/types/editorial";
import { cn } from "@/utils/cn";

type CaseStudyCardProps = {
  study: CaseStudy;
  variant?: "feature" | "editorial" | "compact" | "carousel";
  className?: string;
  active?: boolean;
};

export function CaseStudyCard({
  study,
  variant = study.layout,
  className,
  active = true,
}: CaseStudyCardProps) {
  const href = `/case-studies/${study.slug}`;

  if (variant === "carousel") {
    return (
      <article
        className={cn(
          "group relative flex h-full min-h-[28rem] flex-col overflow-hidden rounded-[1.6rem] border border-border bg-surface shadow-[var(--shadow-soft)] transition-[opacity,transform] duration-500 sm:min-h-[30rem] lg:min-h-[32rem] lg:flex-row",
          active ? "opacity-100" : "opacity-70",
          className,
        )}
      >
        <div className="relative overflow-hidden lg:w-[54%]">
          <ScenarioVisual
            visual={study.visual}
            className="aspect-[16/11] h-full min-h-[14rem] rounded-none transition-transform duration-700 group-hover:scale-[1.03] lg:aspect-auto lg:min-h-full"
          />
        </div>
        <div className="relative flex flex-1 flex-col justify-between p-6 sm:p-8 lg:p-10">
          <div>
            <Meta study={study} />
            <h3 className="mt-4 font-heading text-[1.65rem] leading-[1.15] font-semibold tracking-tight text-balance sm:text-[2rem] lg:text-[2.2rem]">
              <Link
                href={href}
                className="transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                {study.title}
              </Link>
            </h3>
            <p className="mt-4 max-w-xl text-[0.975rem] leading-7 text-muted">
              {study.excerpt}
            </p>
            <ul className="mt-5 space-y-2">
              {study.storyBeats.slice(0, 3).map((beat) => (
                <li
                  key={beat}
                  className="flex gap-2 text-sm leading-6 text-muted"
                >
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" />
                  <span>{beat}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-8">
            <Link
              href={href}
              className="inline-flex items-center gap-2 rounded-[var(--radius-control)] bg-accent px-5 py-3 text-sm font-medium text-accent-foreground shadow-[0_12px_28px_color-mix(in_oklab,var(--accent)_28%,transparent)] transition-[transform,filter] hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring active:scale-[0.98]"
            >
              {caseStudiesPageCopy.exploreStory}
              <ArrowUpRight className="size-4" aria-hidden />
            </Link>
          </div>
        </div>
      </article>
    );
  }

  if (variant === "editorial") {
    return (
      <Link
        href={href}
        data-case-card
        className={cn(
          "group relative flex h-full flex-col justify-between overflow-hidden rounded-[1.4rem] border border-border bg-surface p-6 shadow-[var(--shadow-soft)] transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-[0_22px_50px_color-mix(in_oklab,var(--accent)_14%,transparent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:p-7",
          className,
        )}
      >
        <div>
          <Meta study={study} />
          <h3 className="mt-4 font-heading text-xl font-semibold tracking-tight text-balance transition-colors group-hover:text-accent sm:text-2xl">
            {study.title}
          </h3>
          <p className="mt-3 text-sm leading-6 text-muted sm:text-[0.95rem] sm:leading-7">
            {study.excerpt}
          </p>
        </div>
        <Footer />
      </Link>
    );
  }

  return (
    <Link
      href={href}
      data-case-card
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-[1.4rem] border border-border bg-surface shadow-[var(--shadow-soft)] transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-[0_22px_50px_color-mix(in_oklab,var(--accent)_14%,transparent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        className,
      )}
    >
      <div className="overflow-hidden">
        <ScenarioVisual
          visual={study.visual}
          className={cn(
            "rounded-none transition-transform duration-500 group-hover:scale-[1.04]",
            variant === "feature" ? "aspect-[16/10]" : "aspect-[16/11]",
          )}
        />
      </div>
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <Meta study={study} />
        <h3
          className={cn(
            "mt-3 font-heading font-semibold tracking-tight text-balance transition-colors group-hover:text-accent",
            variant === "feature" ? "text-xl sm:text-2xl" : "text-lg sm:text-xl",
          )}
        >
          {study.title}
        </h3>
        <p className="mt-2 line-clamp-3 text-sm leading-6 text-muted">
          {study.excerpt}
        </p>
        <Footer className="mt-auto pt-5" />
      </div>
    </Link>
  );
}

function Meta({ study }: { study: CaseStudy }) {
  return (
    <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[11px] font-medium tracking-wide text-muted uppercase">
      <span className="rounded-full border border-border px-2.5 py-1 text-foreground/80">
        Illustrative
      </span>
      <span className="rounded-full bg-accent-soft px-2.5 py-1 text-accent">
        {study.categoryLabel}
      </span>
      <span>{study.readingTime}</span>
    </div>
  );
}

function Footer({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5 text-sm font-medium text-foreground",
        className,
      )}
    >
      {caseStudiesPageCopy.exploreStory}
      <ArrowUpRight
        className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        aria-hidden
      />
    </div>
  );
}
