"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import {
  getSolutionsScenario,
  solutionsCta,
  type SolutionsIndustryId,
} from "@/data/marketing/solutions";
import { getGsap } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

export function SolutionsCta({
  selectedId,
}: {
  selectedId: SolutionsIndustryId;
}) {
  const scenario = getSolutionsScenario(selectedId);
  const previewRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();
  const readyRef = useRef(false);

  useEffect(() => {
    const node = previewRef.current;
    if (!node) return;

    if (!readyRef.current) {
      readyRef.current = true;
      return;
    }

    if (reducedMotion) return;

    const { gsap } = getGsap();
    const tween = gsap.fromTo(
      node,
      { autoAlpha: 0.45 },
      { autoAlpha: 1, duration: 0.35, ease: "power2.out" },
    );

    return () => {
      tween.kill();
      gsap.set(node, { clearProps: "opacity,visibility" });
    };
  }, [selectedId, reducedMotion]);

  return (
    <section className="overflow-x-clip border-t border-border py-16 sm:py-20 lg:py-24">
      <Container>
        <div className="grid items-center gap-8 rounded-[var(--radius-workspace)] border border-border bg-surface p-6 shadow-[var(--shadow-soft)] sm:p-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-10 lg:p-10">
          <div className="max-w-xl">
            <h2 className="font-heading text-[1.85rem] font-semibold tracking-tight text-balance sm:text-[2.25rem]">
              {solutionsCta.title}
            </h2>
            <p className="mt-4 text-base leading-7 text-muted">
              {solutionsCta.description}
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <Button
                href={solutionsCta.primaryCta.href}
                size="lg"
                className="w-full sm:w-auto"
              >
                {solutionsCta.primaryCta.label}
                <ArrowRight className="size-4" aria-hidden />
              </Button>
              <Link
                href={solutionsCta.secondaryCta.href}
                className="inline-flex items-center justify-center gap-1.5 px-1 text-sm font-medium text-muted transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:justify-start"
              >
                {solutionsCta.secondaryCta.label}
                <ArrowRight className="size-3.5" aria-hidden />
              </Link>
            </div>
          </div>

          <div className="rounded-[var(--radius-card)] border border-border bg-surface-muted/50 p-4 sm:p-5">
            <div className="mb-3 flex items-center justify-between gap-3">
              <span className="font-mono text-[10px] tracking-[0.14em] text-muted uppercase">
                {solutionsCta.previewHeader}
              </span>
              <span className="rounded-full bg-accent-soft px-2 py-0.5 text-[10px] font-semibold tracking-wide text-accent">
                {scenario.industry}
              </span>
            </div>

            <div
              ref={previewRef}
              className="min-h-[6.5rem] rounded-xl border border-border bg-surface px-3.5 py-3.5"
              aria-live="polite"
            >
              <p className="text-[11px] font-semibold tracking-[0.14em] text-accent uppercase">
                {scenario.topicLabel}
              </p>
              <p className="mt-2 font-heading text-base leading-snug font-semibold tracking-tight text-pretty">
                {scenario.subject}
              </p>
              <p className="mt-3 text-sm text-muted">
                <span className="font-medium text-foreground">
                  {scenario.team}
                </span>
                {" · "}
                {solutionsCta.previewStatus}
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
