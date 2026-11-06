import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { inboxFeatureCta } from "@/data/marketing/inbox-feature";

export function InboxFeatureCta() {
  return (
    <section className="border-t border-border py-16 sm:py-20 lg:py-24">
      <Container>
        <div
          className="mx-auto w-full max-w-3xl rounded-[var(--radius-workspace)] border border-border bg-surface p-6 text-left shadow-[var(--shadow-soft)] sm:p-8 lg:p-10"
          style={{
            backgroundImage:
              "linear-gradient(180deg, color-mix(in oklab, var(--accent) 7%, var(--surface)), var(--surface))",
          }}
        >
          <h2 className="font-heading text-[1.85rem] font-semibold tracking-tight text-balance sm:text-[2.25rem]">
            {inboxFeatureCta.title}
          </h2>
          <p className="mt-5 text-base leading-7 text-muted sm:mt-6">
            {inboxFeatureCta.description}
          </p>
          <div className="mt-7">
            <Button href={inboxFeatureCta.primaryCta.href} size="lg">
              {inboxFeatureCta.primaryCta.label}
              <ArrowRight className="size-4" />
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
