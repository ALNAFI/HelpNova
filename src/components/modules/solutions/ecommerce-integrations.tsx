import Link from "next/link";
import { ArrowRight, Mail, ShoppingBag, ShoppingCart } from "lucide-react";
import { Reveal } from "@/components/common/reveal";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import {
  ecommerceIntegrations,
  ecommerceIntegrationsSection,
} from "@/data/marketing/ecommerce";
import { integrationsDisclaimer } from "@/data/marketing/integrations";

const icons = {
  shopify: ShoppingCart,
  woocommerce: ShoppingBag,
  gmail: Mail,
} as const;

export function EcommerceIntegrations() {
  return (
    <section className="scroll-mt-28 py-16 sm:py-20 lg:py-24">
      <Container>
        <Reveal>
          <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading
              eyebrow={ecommerceIntegrationsSection.eyebrow}
              title={ecommerceIntegrationsSection.title}
              description={ecommerceIntegrationsSection.description}
              className="mb-0 max-w-2xl"
            />
            <Link
              href={ecommerceIntegrationsSection.viewAllHref}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-accent transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {ecommerceIntegrationsSection.viewAllLabel}
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </Reveal>

        <ul className="grid gap-3 md:grid-cols-3">
          {ecommerceIntegrations.map((item) => {
            const Icon = icons[item.id];
            return (
              <li key={item.id}>
                <Reveal>
                  <article className="flex h-full gap-3 rounded-[var(--radius-card)] border border-border bg-[color-mix(in_oklab,var(--surface)_92%,#f4efe6)] p-4 shadow-[var(--shadow-soft)] dark:bg-surface">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-border bg-surface text-accent">
                      <Icon className="size-4" aria-hidden />
                    </span>
                    <div className="min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="font-heading text-sm font-semibold">
                          {item.name}
                        </h3>
                        <span className="font-mono text-[9px] tracking-[0.14em] text-muted uppercase">
                          Slip
                        </span>
                      </div>
                      <p className="mt-2 text-sm leading-relaxed text-muted">
                        {item.caption}
                      </p>
                    </div>
                  </article>
                </Reveal>
              </li>
            );
          })}
        </ul>

        <p className="mt-6 max-w-2xl text-sm text-muted">
          {integrationsDisclaimer}
        </p>
      </Container>
    </section>
  );
}
