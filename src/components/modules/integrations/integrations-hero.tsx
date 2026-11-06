"use client";

import { useEffect, useRef } from "react";
import { ArrowDown, ArrowRight } from "lucide-react";
import { integrationIconById } from "@/components/modules/integrations/integration-icons";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { integrationsPageCopy } from "@/data/marketing/integrations-page";
import { getGsap } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { cn } from "@/utils/cn";

export function IntegrationsHero() {
  const rootRef = useRef<HTMLElement>(null);
  const reducedMotion = usePrefersReducedMotion();
  const copy = integrationsPageCopy.hero;

  useEffect(() => {
    const root = rootRef.current;
    if (!root || reducedMotion) return;
    const { gsap } = getGsap();
    const ctx = gsap.context(() => {
      const message = root.querySelector("[data-int-message]");
      const tiles = root.querySelectorAll("[data-int-tile]");
      const lines = root.querySelectorAll<SVGPathElement>("[data-int-line]");

      gsap.set([message, ...tiles], { autoAlpha: 0, y: 14 });
      lines.forEach((path) => {
        if (typeof path.getTotalLength !== "function") return;
        const length = path.getTotalLength();
        gsap.set(path, {
          strokeDasharray: length,
          strokeDashoffset: length,
          opacity: 0.3,
        });
      });

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.to(message, { autoAlpha: 1, y: 0, duration: 0.45 })
        .to(
          tiles,
          { autoAlpha: 1, y: 0, duration: 0.4, stagger: 0.08 },
          "-=0.15",
        )
        .to(
          lines,
          { strokeDashoffset: 0, opacity: 1, duration: 0.45, stagger: 0.06 },
          "-=0.2",
        );
    }, root);
    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <header
      ref={rootRef}
      className="relative overflow-hidden pt-12 pb-10 sm:pt-16 sm:pb-12 lg:pb-14"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_65%_50%_at_85%_0%,var(--glow),transparent_60%)]" />
        <div className="absolute inset-0 bg-grid-fade [mask-image:linear-gradient(to_bottom,black_40%,transparent)]" />
        {/* Soften far-left grid edge marks without removing the background grid */}
        <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-background via-background/80 to-transparent sm:w-16" />
      </div>

      <Container className="relative">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-12 xl:gap-14">
          <div className="max-w-xl">
            <p className="text-xs font-semibold tracking-[0.18em] text-accent uppercase">
              {copy.eyebrow}
            </p>
            <h1 className="mt-4 font-heading text-[2.2rem] leading-[1.08] font-semibold tracking-tight text-balance sm:text-[3.1rem] lg:text-[3.4rem]">
              {copy.title}
            </h1>
            <p className="mt-5 max-w-lg text-base leading-7 text-muted sm:text-[1.05rem] sm:leading-8">
              {copy.description}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href={copy.primaryCta.href} size="lg">
                {copy.primaryCta.label}
                <ArrowDown className="size-4" />
              </Button>
              <Button
                href={copy.secondaryCta.href}
                variant="secondary"
                size="lg"
              >
                {copy.secondaryCta.label}
                <ArrowRight className="size-4" />
              </Button>
            </div>
          </div>

          <div className="mx-auto w-full max-w-md lg:mx-0 lg:justify-self-end">
            {/* Mobile / tablet: readable sequence */}
            <div className="space-y-3 lg:hidden">
              <MessageCard text={copy.sampleMessage} />
              {copy.tiles.map((tile) => (
                <ReferenceTile key={tile.id} {...tile} />
              ))}
            </div>

            {/* Desktop: relational composition */}
            <div className="relative hidden min-h-[20rem] lg:block">
              <svg
                className="pointer-events-none absolute inset-0 h-full w-full"
                viewBox="0 0 400 320"
                fill="none"
                aria-hidden
              >
                <path
                  data-int-line
                  d="M200 155 L95 78"
                  stroke="var(--accent)"
                  strokeWidth="1.5"
                />
                <path
                  data-int-line
                  d="M200 155 L305 78"
                  stroke="var(--accent)"
                  strokeWidth="1.5"
                />
                <path
                  data-int-line
                  d="M200 195 L200 268"
                  stroke="var(--accent)"
                  strokeWidth="1.5"
                />
              </svg>

              <div className="absolute top-2 left-0 w-[10rem]">
                <ReferenceTile {...copy.tiles[0]} />
              </div>
              <div className="absolute top-2 right-0 w-[10rem]">
                <ReferenceTile {...copy.tiles[1]} />
              </div>
              <div className="absolute top-1/2 left-1/2 w-[17.5rem] -translate-x-1/2 -translate-y-1/2">
                <MessageCard text={copy.sampleMessage} />
              </div>
              <div className="absolute bottom-2 left-1/2 w-[11rem] -translate-x-1/2">
                <ReferenceTile {...copy.tiles[2]} />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </header>
  );
}

function MessageCard({ text }: { text: string }) {
  return (
    <div
      data-int-message
      className="rounded-2xl border border-border bg-surface px-4 py-3.5 shadow-[var(--shadow-soft)]"
    >
      <p className="text-[10px] font-semibold tracking-[0.14em] text-accent uppercase">
        Customer message
      </p>
      <p className="mt-2 font-heading text-sm font-semibold leading-snug sm:text-base">
        “{text}”
      </p>
    </div>
  );
}

function ReferenceTile({
  id,
  name,
  caption,
}: {
  id: string;
  name: string;
  caption: string;
}) {
  const Icon = integrationIconById[id];
  return (
    <div
      data-int-tile
      className={cn(
        "rounded-xl border border-border bg-surface px-3 py-2.5 shadow-[var(--shadow-soft)]",
      )}
    >
      <div className="flex items-center gap-2">
        <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-accent-soft text-accent">
          {Icon ? <Icon className="size-3.5" aria-hidden /> : null}
        </span>
        <div className="min-w-0">
          <p className="text-sm font-semibold">{name}</p>
          <p className="text-[11px] text-muted">{caption}</p>
        </div>
      </div>
    </div>
  );
}
