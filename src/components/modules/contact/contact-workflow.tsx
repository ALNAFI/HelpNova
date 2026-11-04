"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Container } from "@/components/ui/container";
import {
  contactPageCopy,
  contactWorkflowStages,
} from "@/data/marketing/contact";
import { getGsap } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { cn } from "@/utils/cn";

export function ContactWorkflow() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelId = useId();
  const [activeId, setActiveId] = useState<
    (typeof contactWorkflowStages)[number]["id"]
  >(contactWorkflowStages[0].id);
  const reducedMotion = usePrefersReducedMotion();
  const active =
    contactWorkflowStages.find((stage) => stage.id === activeId) ??
    contactWorkflowStages[0];

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || reducedMotion) return;
    const { gsap } = getGsap();
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-contact-workflow]",
        { y: 18, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.55,
          stagger: 0.07,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 80%" },
        },
      );
    }, el);
    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      ref={sectionRef}
      className="relative py-12 sm:py-16"
      aria-labelledby="contact-workflow-heading"
    >
      <Container>
        <div className="max-w-2xl" data-contact-workflow>
          <h2
            id="contact-workflow-heading"
            className="font-heading text-[1.85rem] font-semibold tracking-tight text-balance sm:text-[2.25rem]"
          >
            {contactPageCopy.workflowTitle}
          </h2>
          <p className="mt-3 text-base leading-7 text-muted">
            {contactPageCopy.workflowDescription}
          </p>
        </div>

        <div
          data-contact-workflow
          className="mt-8 overflow-hidden rounded-[1.75rem] border border-border bg-surface shadow-[var(--shadow-soft)]"
        >
          <div
            role="tablist"
            aria-labelledby={labelId}
            className="flex gap-2 overflow-x-auto border-b border-border p-3 sm:p-4"
          >
            <span id={labelId} className="sr-only">
              Communication journey stages
            </span>
            {contactWorkflowStages.map((stage, index) => {
              const selected = stage.id === activeId;
              return (
                <button
                  key={stage.id}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  onClick={() => setActiveId(stage.id)}
                  className={cn(
                    "inline-flex min-w-[9rem] items-center gap-2 rounded-2xl px-4 py-3 text-left text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    selected
                      ? "bg-accent text-accent-foreground"
                      : "bg-surface-muted/60 text-muted hover:text-foreground",
                  )}
                >
                  <span className="font-mono text-[10px] opacity-80">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {stage.label}
                </button>
              );
            })}
          </div>

          <div className="grid gap-6 p-5 sm:p-7 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
            <div className="relative min-h-[14rem] overflow-hidden rounded-[1.35rem] border border-border bg-[linear-gradient(160deg,var(--accent-soft),var(--surface)_55%)] p-5">
              <svg
                viewBox="0 0 360 180"
                className="absolute inset-0 size-full opacity-70"
                aria-hidden
              >
                <path
                  d="M60 90 H160 M160 90 H260"
                  stroke="var(--accent)"
                  strokeOpacity="0.35"
                  strokeWidth="2"
                />
                {contactWorkflowStages.map((stage, index) => {
                  const x = 60 + index * 100;
                  const selected = stage.id === activeId;
                  return (
                    <g key={stage.id}>
                      <circle
                        cx={x}
                        cy="90"
                        r={selected ? 18 : 12}
                        fill={selected ? "var(--accent)" : "var(--surface)"}
                        stroke="var(--accent)"
                        strokeOpacity={selected ? 1 : 0.35}
                      />
                      {selected ? (
                        <circle
                          cx={x}
                          cy="90"
                          r="28"
                          fill="none"
                          stroke="var(--accent)"
                          strokeOpacity="0.25"
                        />
                      ) : null}
                    </g>
                  );
                })}
              </svg>
              <div className="relative rounded-2xl border border-border/80 bg-surface/95 p-4 shadow-[var(--shadow-soft)]">
                <p className="text-[11px] font-semibold tracking-[0.14em] text-accent uppercase">
                  {active.sample.eyebrow}
                </p>
                <p className="mt-2 text-sm leading-6 text-foreground">
                  {active.sample.body}
                </p>
              </div>
            </div>

            <div className="flex flex-col justify-center">
              <p className="text-[11px] font-semibold tracking-[0.16em] text-accent uppercase">
                {active.label}
              </p>
              <h3 className="mt-2 font-heading text-2xl font-semibold tracking-tight">
                {active.title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-muted">
                {active.description}
              </p>
              <p className="mt-4 text-xs leading-5 text-muted">
                Illustrative sample only. This journey does not use contact-form
                input and does not create a real ticket.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
