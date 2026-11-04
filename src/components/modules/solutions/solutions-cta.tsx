import Link from "next/link";
import { ArrowRight, Briefcase, Layers, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { solutionsCta } from "@/data/marketing/solutions";

export function SolutionsCta() {
  return (
    <section className="border-t border-border py-16 sm:py-20 lg:py-24">
      <Container>
        <div className="grid items-center gap-8 rounded-[var(--radius-workspace)] border border-border bg-surface p-6 shadow-[var(--shadow-soft)] sm:p-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:p-10">
          <div className="max-w-xl">
            <h2 className="font-heading text-[1.85rem] font-semibold tracking-tight text-balance sm:text-[2.25rem]">
              {solutionsCta.title}
            </h2>
            <p className="mt-4 text-base leading-7 text-muted">
              {solutionsCta.description}
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Button href={solutionsCta.primaryCta.href} size="lg">
                {solutionsCta.primaryCta.label}
                <ArrowRight className="size-4" />
              </Button>
              <Link
                href={solutionsCta.secondaryCta.href}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-accent transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                {solutionsCta.secondaryCta.label}
                <ArrowRight className="size-3.5" />
              </Link>
            </div>
          </div>

          <div
            className="rounded-[var(--radius-card)] border border-border bg-surface-muted/50 p-4"
            aria-hidden
          >
            <div className="mb-3 flex items-center gap-2">
              <span className="flex size-7 items-center justify-center rounded-md bg-accent-soft text-accent">
                <Package className="size-3.5" />
              </span>
              <span className="flex size-7 items-center justify-center rounded-md bg-accent-soft text-accent">
                <Layers className="size-3.5" />
              </span>
              <span className="flex size-7 items-center justify-center rounded-md bg-accent-soft text-accent">
                <Briefcase className="size-3.5" />
              </span>
              <span className="ml-auto font-mono text-[10px] tracking-[0.14em] text-muted uppercase">
                Shared inbox
              </span>
            </div>
            <div className="rounded-xl border border-border bg-surface px-3.5 py-3">
              <p className="text-[11px] font-semibold text-accent">Open thread</p>
              <p className="mt-1 text-sm font-medium">
                Choose an industry, then take the conversation into the demo.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
