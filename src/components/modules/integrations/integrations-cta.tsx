import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/common/reveal";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { integrationsPageCopy } from "@/data/marketing/integrations-page";

export function IntegrationsCta() {
  const copy = integrationsPageCopy.cta;

  return (
    <section className="border-t border-border py-16 sm:py-20 lg:py-24">
      <Container>
        <Reveal>
          <div className="grid items-center gap-8 rounded-[var(--radius-workspace)] border border-border bg-surface p-6 shadow-[var(--shadow-soft)] sm:gap-10 sm:p-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:items-center lg:gap-12 lg:p-10">
            <div className="max-w-xl">
              <h2 className="font-heading text-[1.85rem] font-semibold tracking-tight text-balance sm:text-[2.25rem]">
                {copy.title}
              </h2>
              <p className="mt-4 text-base leading-7 text-muted">
                {copy.description}
              </p>
              <div className="mt-7">
                <Button href={copy.primaryCta.href} size="lg">
                  {copy.primaryCta.label}
                  <ArrowRight className="size-4" />
                </Button>
              </div>
            </div>

            <div
              className="w-full rounded-[var(--radius-card)] border border-border bg-surface-muted/50 p-5 transition-[border-color,background-color] duration-200 hover:border-accent/40 hover:bg-surface-muted/70 sm:p-5 lg:justify-self-stretch"
              aria-hidden
            >
              <p className="text-[10px] font-semibold tracking-[0.14em] text-accent uppercase">
                {copy.messageLabel}
              </p>
              <p className="mt-2.5 font-heading text-sm font-semibold leading-snug sm:text-[0.95rem]">
                “{copy.message}”
              </p>
              <p className="mt-3.5 text-xs leading-relaxed text-muted">
                {copy.messageSupport}
              </p>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
