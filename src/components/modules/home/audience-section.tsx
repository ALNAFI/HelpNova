"use client";

import { useEffect, useRef } from "react";
import { Briefcase, Layers, ShoppingBag } from "lucide-react";
import { Reveal } from "@/components/common/reveal";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { audienceCards } from "@/data/marketing/home";
import { getGsap } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

const icons = {
  "shopping-bag": ShoppingBag,
  layers: Layers,
  briefcase: Briefcase,
} as const;

export function AudienceSection() {
  const gridRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid || reducedMotion) return;
    const { gsap } = getGsap();
    const ctx = gsap.context(() => {
      gsap.from("[data-audience-card]", {
        y: 32,
        autoAlpha: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: grid,
          start: "top 80%",
        },
      });
    }, grid);
    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section id="audience" className="scroll-mt-28 py-16 sm:py-20 lg:py-24">
      <Container>
        <Reveal>
          <SectionHeading
            align="center"
            eyebrow="Who it’s for"
            title="Built for teams who answer real customer questions"
            description="Whether you sell products, ship software, or deliver services, HelpNova keeps inquiries organized and routed with intent."
            className="mb-12"
          />
        </Reveal>

        <div ref={gridRef} className="grid gap-5 md:grid-cols-3">
          {audienceCards.map((card) => {
            const Icon = icons[card.icon];
            return (
              <article
                key={card.id}
                data-audience-card
                className="group relative overflow-hidden rounded-[var(--radius-card)] border border-border bg-surface p-6 shadow-[var(--shadow-soft)] transition-transform duration-300 hover:-translate-y-1"
              >
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                <div className="mb-5 inline-flex size-11 items-center justify-center rounded-2xl bg-accent-soft text-accent">
                  <Icon className="size-5" aria-hidden />
                </div>
                <h3 className="font-heading text-xl font-semibold tracking-tight">
                  {card.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-muted">
                  {card.description}
                </p>
                <p className="mt-5 rounded-2xl border border-border bg-surface-muted/70 p-4 text-sm leading-6 text-foreground">
                  <span className="mb-1 block text-xs font-semibold uppercase tracking-[0.12em] text-accent">
                    Example
                  </span>
                  {card.scenario}
                </p>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
