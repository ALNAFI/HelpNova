"use client";

import { useEffect, useRef, useState } from "react";
import { automationHomeProcess } from "@/data/marketing/home-automation";
import { getGsap } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { cn } from "@/utils/cn";

export function AutomationProcess() {
  const [activeId, setActiveId] = useState<string>(
    automationHomeProcess.stages[0].id,
  );
  const rootRef = useRef<HTMLElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const root = rootRef.current;
    const path = pathRef.current;
    if (!root || !path || reducedMotion) return;
    const { gsap, ScrollTrigger } = getGsap();
    const length = path.getTotalLength();
    gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: root,
        start: "top 70%",
        end: "bottom 45%",
        scrub: 0.5,
        onUpdate: (self) => {
          gsap.set(path, { strokeDashoffset: length * (1 - self.progress) });
          const index = Math.min(
            2,
            Math.floor(self.progress * automationHomeProcess.stages.length),
          );
          setActiveId(automationHomeProcess.stages[index].id);
        },
      });
    }, root);
    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      ref={rootRef}
      id={automationHomeProcess.id}
      className="au-section border-y border-border bg-surface-muted/40 py-20 sm:py-28"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-3xl">
          <p className="au-eyebrow">Inside the Logic</p>
          <h2 className="mt-3 font-heading text-[2rem] font-semibold tracking-tight text-balance sm:text-[2.6rem]">
            {automationHomeProcess.title}
          </h2>
        </div>

        <div className="relative mt-12">
          <svg
            className="pointer-events-none absolute top-10 left-0 hidden h-2 w-full md:block"
            viewBox="0 0 1000 8"
            fill="none"
            aria-hidden
          >
            <path
              ref={pathRef}
              d="M40 4 H960"
              stroke="var(--accent)"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>

          <div className="grid gap-4 md:grid-cols-3">
            {automationHomeProcess.stages.map((stage) => {
              const active = stage.id === activeId;
              return (
                <button
                  key={stage.id}
                  type="button"
                  onClick={() => setActiveId(stage.id)}
                  className={cn(
                    "rounded-[1.5rem] border p-5 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    active
                      ? "border-accent/45 bg-accent/10 shadow-[var(--shadow-soft)]"
                      : "border-border bg-surface",
                  )}
                >
                  <p className="font-mono text-3xl font-semibold text-accent/80">
                    {stage.number}
                  </p>
                  <p className="mt-3 text-[11px] font-semibold tracking-[0.16em] text-muted uppercase">
                    {stage.label}
                  </p>
                  <h3 className="mt-2 font-heading text-lg font-semibold">
                    {stage.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {stage.body}
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
