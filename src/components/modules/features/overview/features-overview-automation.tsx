"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight, Package, Users } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import {
  featuresOverviewAutomation,
  featuresOverviewOrder,
} from "@/data/marketing/features-overview";
import { getGsap } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { cn } from "@/utils/cn";

export function FeaturesOverviewAutomation() {
  const rootRef = useRef<HTMLElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const root = rootRef.current;
    if (!root || reducedMotion) return;

    const { gsap } = getGsap();
    const ctx = gsap.context(() => {
      const path = root.querySelector<SVGPathElement>("[data-auto-matched]");
      const stamp = root.querySelector("[data-auto-orders]");
      if (!path || typeof path.getTotalLength !== "function") return;

      const length = path.getTotalLength();
      gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
      tl.to(path, { strokeDashoffset: 0, duration: 0.55 }).fromTo(
        stamp,
        { scale: 1.06 },
        { scale: 1, duration: 0.25 },
        "-=0.1",
      );
    }, root);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      ref={rootRef}
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
            <div className="relative hidden min-h-[18rem] sm:block">
              <svg
                className="pointer-events-none absolute inset-0 h-full w-full"
                viewBox="0 0 520 280"
                fill="none"
                aria-hidden
              >
                <path
                  d="M260 56 L260 110"
                  stroke="var(--accent)"
                  strokeWidth="2"
                />
                <path
                  data-auto-matched
                  d="M260 160 C200 180, 140 200, 110 230"
                  stroke="var(--accent)"
                  strokeWidth="2.25"
                />
                <path
                  d="M260 160 C320 180, 380 200, 410 230"
                  stroke="currentColor"
                  className="text-border"
                  strokeWidth="2"
                  strokeDasharray="5 5"
                />
              </svg>

              <DiagramNode
                className="absolute top-2 left-1/2 w-52 -translate-x-1/2"
                eyebrow="Trigger"
                title={featuresOverviewAutomation.trigger}
                detail={featuresOverviewOrder.topic}
              />
              <DiagramNode
                className="absolute top-[6.75rem] left-1/2 w-56 -translate-x-1/2"
                eyebrow="Condition"
                title={featuresOverviewAutomation.condition}
                emphasize
              />
              <DiagramNode
                className="absolute bottom-2 left-4 w-44"
                eyebrow="Matched"
                title="Orders"
                detail={featuresOverviewAutomation.matched}
                icon={Package}
                stamp
              />
              <DiagramNode
                className="absolute right-4 bottom-2 w-44"
                eyebrow="Otherwise"
                title="General Triage"
                detail={featuresOverviewAutomation.otherwise}
                icon={Users}
                quiet
              />
            </div>

            <div className="space-y-3 sm:hidden">
              <DiagramNode
                eyebrow="Trigger"
                title={featuresOverviewAutomation.trigger}
                detail={featuresOverviewOrder.topic}
              />
              <DiagramNode
                eyebrow="Condition"
                title={featuresOverviewAutomation.condition}
                emphasize
              />
              <div className="rounded-xl border border-accent/35 bg-accent/10 px-3 py-2.5">
                <p className="text-[10px] font-semibold tracking-[0.14em] text-accent uppercase">
                  Matched → Orders
                </p>
                <p className="mt-1 text-sm">{featuresOverviewAutomation.matched}</p>
              </div>
              <div className="rounded-xl border border-border bg-surface-muted/60 px-3 py-2.5">
                <p className="text-[10px] font-semibold tracking-[0.14em] text-muted uppercase">
                  Otherwise → General Triage
                </p>
                <p className="mt-1 text-sm text-muted">
                  {featuresOverviewAutomation.otherwise}
                </p>
              </div>
            </div>
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

function DiagramNode({
  className,
  eyebrow,
  title,
  detail,
  icon: Icon,
  emphasize,
  quiet,
  stamp,
}: {
  className?: string;
  eyebrow: string;
  title: string;
  detail?: string;
  icon?: typeof Package;
  emphasize?: boolean;
  quiet?: boolean;
  stamp?: boolean;
}) {
  return (
    <div
      data-auto-orders={stamp ? true : undefined}
      className={cn(
        "rounded-2xl border px-3.5 py-3",
        emphasize
          ? "border-accent/40 bg-accent/10"
          : quiet
            ? "border-border bg-surface-muted/70"
            : "border-accent/30 bg-surface",
        className,
      )}
    >
      <div className="flex items-start gap-2">
        {Icon ? (
          <Icon
            className={cn(
              "mt-0.5 size-3.5",
              quiet ? "text-muted" : "text-accent",
            )}
            aria-hidden
          />
        ) : null}
        <div>
          <p className="text-[10px] font-semibold tracking-[0.14em] text-muted uppercase">
            {eyebrow}
          </p>
          <p className="mt-1 font-heading text-sm font-semibold">{title}</p>
          {detail ? (
            <p className="mt-1 text-xs text-muted">{detail}</p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
