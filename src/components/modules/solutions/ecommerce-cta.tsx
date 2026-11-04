"use client";

import { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import { ParcelLabel } from "@/components/modules/solutions/parcel-label";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { ecommerceCta, ecommerceHero } from "@/data/marketing/ecommerce";
import { getGsap } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

export function EcommerceCta() {
  const ref = useRef<HTMLElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const root = ref.current;
    if (!root || reducedMotion) return;
    const { gsap } = getGsap();
    const ctx = gsap.context(() => {
      gsap.from("[data-ecom-cta]", {
        y: 22,
        autoAlpha: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: { trigger: root, start: "top 78%" },
      });
    }, root);
    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden border-t border-border py-16 sm:py-20 lg:py-24"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_20%_100%,var(--glow),transparent_65%)]"
        aria-hidden
      />
      <Container className="relative">
        <div className="grid items-center gap-10 rounded-[var(--radius-workspace)] border border-border bg-surface p-6 shadow-[var(--shadow-soft)] sm:p-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:p-10">
          <div data-ecom-cta className="max-w-xl">
            <p className="text-xs font-semibold tracking-[0.18em] text-accent uppercase">
              {ecommerceCta.eyebrow}
            </p>
            <h2 className="mt-3 font-heading text-[1.85rem] font-semibold tracking-tight text-balance sm:text-[2.25rem]">
              {ecommerceCta.title}
            </h2>
            <p className="mt-4 text-base leading-7 text-muted">
              {ecommerceCta.description}
            </p>
            <div className="mt-7">
              <Button href={ecommerceCta.primaryCta.href} size="lg">
                {ecommerceCta.primaryCta.label}
                <ArrowRight className="size-4" />
              </Button>
            </div>
          </div>

          <div data-ecom-cta>
            <ParcelLabel
              orderReference={ecommerceHero.orderReference}
              trackingCode={ecommerceHero.trackingCode}
              stampLabel="Assigned to Orders"
              showMessage={false}
              compact
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
