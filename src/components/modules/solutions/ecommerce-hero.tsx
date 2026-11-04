"use client";

import { useEffect, useRef } from "react";
import { ArrowDown, ArrowRight } from "lucide-react";
import { ParcelLabel } from "@/components/modules/solutions/parcel-label";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { ecommerceHero } from "@/data/marketing/ecommerce";
import { getGsap } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

export function EcommerceHero() {
  const ref = useRef<HTMLElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const root = ref.current;
    if (!root || reducedMotion) return;
    const { gsap } = getGsap();
    const ctx = gsap.context(() => {
      const label = root.querySelector("[data-parcel-label]");
      const message = root.querySelector("[data-parcel-message]");
      const stamp = root.querySelector("[data-parcel-stamp]");

      gsap.set([label, message, stamp], { autoAlpha: 0 });
      if (label) gsap.set(label, { y: 18 });
      if (message) gsap.set(message, { y: 16, x: 12 });
      if (stamp) gsap.set(stamp, { scale: 1.18, rotate: -14 });

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.to(label, { autoAlpha: 1, y: 0, duration: 0.55 })
        .to(message, { autoAlpha: 1, y: 0, x: 0, duration: 0.45 }, "-=0.18")
        .to(
          stamp,
          {
            autoAlpha: 1,
            scale: 0.94,
            rotate: -8,
            duration: 0.28,
          },
          "-=0.08",
        )
        .to(stamp, { scale: 1, duration: 0.18, ease: "power2.out" });
    }, root);
    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <header
      ref={ref}
      className="relative overflow-hidden pt-12 pb-14 sm:pt-16 sm:pb-16 lg:pb-20"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_80%_0%,var(--glow),transparent_60%)]" />
        <div className="absolute top-24 left-[8%] hidden h-40 w-px bg-gradient-to-b from-accent/50 via-border to-transparent lg:block" />
        <div className="absolute inset-0 bg-grid-fade [mask-image:linear-gradient(to_bottom,black_35%,transparent)]" />
      </div>

      <Container className="relative">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-10">
          <div className="max-w-xl">
            <p className="text-xs font-semibold tracking-[0.18em] text-accent uppercase">
              {ecommerceHero.eyebrow}
            </p>
            <h1 className="mt-4 font-heading text-[2.35rem] leading-[1.05] font-semibold tracking-tight text-balance sm:text-[3.25rem] lg:text-[3.75rem]">
              {ecommerceHero.title}
            </h1>
            <p className="mt-5 max-w-lg text-base leading-7 text-muted sm:text-[1.05rem] sm:leading-8">
              {ecommerceHero.description}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button href={ecommerceHero.primaryCta.href} size="lg">
                {ecommerceHero.primaryCta.label}
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </Button>
              <Button
                href={ecommerceHero.secondaryCta.href}
                variant="secondary"
                size="lg"
              >
                {ecommerceHero.secondaryCta.label}
                <ArrowDown className="size-4" />
              </Button>
            </div>
          </div>

          <div className="relative">
            <div
              className="pointer-events-none absolute top-8 -left-6 hidden h-[70%] w-px bg-gradient-to-b from-transparent via-accent/45 to-transparent lg:block"
              aria-hidden
            />
            <ParcelLabel
              orderReference={ecommerceHero.orderReference}
              trackingCode={ecommerceHero.trackingCode}
              messagePreview="Hi, my tracking hasn’t changed since Monday…"
            />
          </div>
        </div>
      </Container>
    </header>
  );
}
