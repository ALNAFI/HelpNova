import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { InquiryRoutingIllustration } from "@/components/modules/features/inquiry-routing-illustration";
import { featuresOverviewAutomation } from "@/data/marketing/features-overview";

export function FeaturesOverviewAutomation() {
  return (
    <section
      id={featuresOverviewAutomation.id}
      className="scroll-mt-28 py-16 sm:py-20 lg:py-24"
    >
      <Container>
        <SectionHeading
          title={featuresOverviewAutomation.title}
          className="mb-8 max-w-3xl"
        />

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
          <div className="rounded-[var(--radius-workspace)] border border-border bg-surface p-4 shadow-[var(--shadow-soft)] sm:p-5">
            <InquiryRoutingIllustration />
          </div>

          <div>
            <p className="rounded-xl border border-border bg-surface-muted/60 px-4 py-3 text-sm leading-relaxed text-pretty">
              {featuresOverviewAutomation.result}
            </p>
            <Link
              href={featuresOverviewAutomation.href}
              className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-accent transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {featuresOverviewAutomation.linkLabel}
              <ArrowRight className="size-3.5" />
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
