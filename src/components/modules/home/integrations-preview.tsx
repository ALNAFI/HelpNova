"use client";

import { useEffect, useRef } from "react";
import {
  CreditCard,
  Mail,
  MessageSquare,
  ShoppingCart,
  Workflow,
  Zap,
} from "lucide-react";
import { Reveal } from "@/components/common/reveal";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import {
  homeIntegrations,
  integrationsDisclaimer,
} from "@/data/marketing/integrations";
import { getGsap } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

const iconById = {
  shopify: ShoppingCart,
  stripe: CreditCard,
  gmail: Mail,
  slack: MessageSquare,
  hubspot: Workflow,
  zapier: Zap,
} as const;

export function IntegrationsPreview() {
  const gridRef = useRef<HTMLUListElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid || reducedMotion) return;
    const { gsap } = getGsap();
    const ctx = gsap.context(() => {
      gsap.from("[data-integration]", {
        y: 24,
        autoAlpha: 0,
        duration: 0.55,
        stagger: 0.08,
        ease: "power2.out",
        scrollTrigger: { trigger: grid, start: "top 82%" },
      });
    }, grid);
    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section id="integrations" className="scroll-mt-28 py-16 sm:py-20 lg:py-24">
      <Container>
        <Reveal>
          <SectionHeading
            align="center"
            eyebrow="Integrations"
            title="Illustrative tools your support stack may include"
            description="Six sample integrations from the HelpNova concept catalog. Icons are original stand-ins—not official partner marks."
            className="mb-10"
          />
        </Reveal>

        <ul
          ref={gridRef}
          className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6"
        >
          {homeIntegrations.map((integration) => {
            const Icon = iconById[integration.id as keyof typeof iconById];
            return (
              <li key={integration.id} data-integration>
                <article className="flex h-full flex-col items-center rounded-[var(--radius-card)] border border-border bg-surface px-3 py-6 text-center shadow-[var(--shadow-soft)] transition-transform duration-300 hover:-translate-y-1">
                  <span className="inline-flex size-11 items-center justify-center rounded-2xl bg-accent-soft text-accent">
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <h3 className="mt-3 text-sm font-semibold">{integration.name}</h3>
                  <p className="mt-1 text-[11px] text-muted">
                    {integration.category}
                  </p>
                </article>
              </li>
            );
          })}
        </ul>

        <p className="mx-auto mt-6 max-w-2xl text-center text-sm text-muted">
          {integrationsDisclaimer}
        </p>
      </Container>
    </section>
  );
}
