import Link from "next/link";
import { ArrowRight, CircleDot, StickyNote, Users } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import {
  featuresOverviewInbox,
  featuresOverviewOrder,
} from "@/data/marketing/features-overview";

export function FeaturesOverviewInbox() {
  return (
    <section
      id={featuresOverviewInbox.id}
      className="scroll-mt-28 border-y border-border bg-surface-muted/30 py-16 sm:py-20 lg:py-24"
    >
      <Container>
        <SectionHeading
          title={featuresOverviewInbox.title}
          className="mb-8 max-w-3xl"
        />

        <div className="grid gap-4 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
          <article className="overflow-hidden rounded-[var(--radius-workspace)] border border-border bg-surface shadow-[var(--shadow-soft)]">
            <header className="flex flex-wrap items-start justify-between gap-3 border-b border-border px-4 py-3.5 sm:px-5">
              <div>
                <p className="font-heading text-base font-semibold">
                  {featuresOverviewOrder.customerName}
                </p>
                <p className="text-sm text-muted">
                  {featuresOverviewOrder.subject}
                </p>
                <p className="mt-1 font-mono text-[11px] text-muted">
                  {featuresOverviewOrder.orderReference}
                </p>
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/15 px-2.5 py-1 text-[11px] font-semibold text-emerald-700 dark:text-emerald-300">
                <CircleDot className="size-3" aria-hidden />
                {featuresOverviewInbox.status}
              </span>
            </header>

            <div className="space-y-3 p-4 sm:p-5">
              <div className="rounded-2xl rounded-tl-md border border-border bg-surface-muted/70 px-3.5 py-3">
                <p className="text-[11px] font-medium text-muted">
                  {featuresOverviewOrder.customerName} · Customer
                </p>
                <p className="mt-1.5 text-sm leading-relaxed text-pretty">
                  {featuresOverviewOrder.message}
                </p>
              </div>

              <div className="flex items-center gap-2 rounded-xl border border-border bg-surface-muted/60 px-3 py-2 text-xs">
                <Users className="size-3.5 text-accent" aria-hidden />
                <span className="font-medium">
                  {featuresOverviewInbox.assignment}
                </span>
              </div>

              <div className="rounded-2xl border border-accent/30 bg-accent/10 px-3.5 py-3 lg:hidden">
                <p className="inline-flex items-center gap-1.5 text-[10px] font-semibold tracking-wide text-accent uppercase">
                  <StickyNote className="size-3" aria-hidden />
                  Internal note · Team only
                </p>
                <p className="mt-1.5 text-sm leading-relaxed text-pretty">
                  {featuresOverviewOrder.internalNote}
                </p>
                <p className="mt-2 text-[11px] text-muted">
                  {featuresOverviewOrder.noteAuthor}
                </p>
              </div>
            </div>
          </article>

          <aside className="hidden rounded-[var(--radius-workspace)] border border-accent/30 bg-accent/10 p-4 shadow-[var(--shadow-soft)] lg:block sm:p-5">
            <p className="inline-flex items-center gap-1.5 text-[10px] font-semibold tracking-wide text-accent uppercase">
              <StickyNote className="size-3" aria-hidden />
              Internal note · Team only
            </p>
            <p className="mt-3 text-sm leading-relaxed text-pretty">
              {featuresOverviewOrder.internalNote}
            </p>
            <p className="mt-4 text-xs text-muted">
              {featuresOverviewOrder.noteAuthor} · Orders
            </p>
          </aside>
        </div>

        <Link
          href={featuresOverviewInbox.href}
          className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-accent transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          {featuresOverviewInbox.linkLabel}
          <ArrowRight className="size-3.5" />
        </Link>
      </Container>
    </section>
  );
}
