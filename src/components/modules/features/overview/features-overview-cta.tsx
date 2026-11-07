import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import {
  featuresOverviewCta,
  featuresOverviewOrder,
} from "@/data/marketing/features-overview";

export function FeaturesOverviewCta() {
  return (
    <section className="py-16 sm:py-20 lg:py-24">
      <Container>
        <div className="grid items-center gap-8 rounded-[var(--radius-workspace)] border border-border bg-surface p-6 shadow-[var(--shadow-soft)] sm:p-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-10 lg:p-10">
          <div>
            <h2 className="font-heading text-[1.85rem] font-semibold tracking-tight text-balance sm:text-[2.25rem]">
              {featuresOverviewCta.title}
            </h2>
            <p className="mt-4 max-w-xl text-base leading-7 text-muted">
              {featuresOverviewCta.description}
            </p>
            <div className="mt-7">
              <Button href={featuresOverviewCta.primaryCta.href} size="lg">
                {featuresOverviewCta.primaryCta.label}
                <ArrowRight className="size-4" />
              </Button>
            </div>
          </div>

          <div
            className="w-full rounded-2xl border border-border bg-surface-muted/60 p-5 sm:p-5"
            aria-hidden
          >
            <p className="text-[11px] font-semibold tracking-[0.14em] text-muted uppercase">
              {featuresOverviewOrder.customerName}
            </p>
            <p className="mt-2.5 text-sm leading-relaxed text-pretty text-foreground/90 sm:text-[15px] sm:leading-7">
              {featuresOverviewOrder.message}
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
