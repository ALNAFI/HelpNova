"use client";

import { useEffect, useId, useRef, useState } from "react";
import {
  GitBranch,
  Inbox,
  LineChart,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import {
  caseStudiesPageCopy,
  caseStudyWorkflowStages,
} from "@/data/editorial/case-studies";
import { getGsap } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { cn } from "@/utils/cn";

const icons = {
  inbox: Inbox,
  automation: GitBranch,
  insights: LineChart,
} as const;

export function WorkflowStorytelling() {
  const ref = useRef<HTMLElement>(null);
  const reducedMotion = usePrefersReducedMotion();
  const [activeId, setActiveId] = useState<(typeof caseStudyWorkflowStages)[number]["id"]>(
    caseStudyWorkflowStages[0].id,
  );
  const labelId = useId();
  const active =
    caseStudyWorkflowStages.find((stage) => stage.id === activeId) ??
    caseStudyWorkflowStages[0];
  const ActiveIcon = icons[active.id as keyof typeof icons];

  useEffect(() => {
    const el = ref.current;
    if (!el || reducedMotion) return;
    const { gsap } = getGsap();
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-case-workflow]",
        { y: 18, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.65,
          stagger: 0.07,
          ease: "power3.out",
          immediateRender: false,
          scrollTrigger: { trigger: el, start: "top 84%" },
        },
      );
    }, el);
    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      ref={ref}
      className="relative py-10 sm:py-14"
      aria-labelledby={labelId}
    >
      <Container>
        <div data-case-workflow className="max-w-2xl">
          <p className="text-xs font-semibold tracking-[0.16em] text-accent uppercase">
            {caseStudiesPageCopy.workflowEyebrow}
          </p>
          <h2
            id={labelId}
            className="mt-2 font-heading text-[1.75rem] font-semibold tracking-tight text-balance sm:text-[2.15rem]"
          >
            {caseStudiesPageCopy.workflowTitle}
          </h2>
          <p className="mt-3 text-base leading-7 text-muted">
            {caseStudiesPageCopy.workflowDescription}
          </p>
        </div>

        <div
          data-case-workflow
          className="mt-8 overflow-hidden rounded-[1.6rem] border border-border bg-surface shadow-[var(--shadow-soft)]"
        >
          <div
            role="tablist"
            aria-label="Connected workflow stages"
            className="grid border-b border-border md:grid-cols-3"
          >
            {caseStudyWorkflowStages.map((stage, index) => {
              const selected = stage.id === activeId;
              const Icon = icons[stage.id as keyof typeof icons];
              return (
                <button
                  key={stage.id}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  onClick={() => setActiveId(stage.id)}
                  className={cn(
                    "relative flex items-center gap-3 px-5 py-4 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring md:justify-center",
                    selected
                      ? "bg-accent-soft/60 text-foreground"
                      : "text-muted hover:bg-surface-muted hover:text-foreground",
                    index < caseStudyWorkflowStages.length - 1 &&
                      "border-b border-border md:border-r md:border-b-0",
                  )}
                >
                  <span
                    className={cn(
                      "inline-flex size-9 items-center justify-center rounded-xl border",
                      selected
                        ? "border-accent/40 bg-accent text-accent-foreground"
                        : "border-border bg-surface",
                    )}
                  >
                    <Icon className="size-4" aria-hidden />
                  </span>
                  <span>
                    <span className="block text-[11px] font-semibold tracking-[0.14em] uppercase">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="mt-0.5 block text-sm font-semibold">
                      {stage.label}
                    </span>
                  </span>
                  {selected ? (
                    <span className="absolute inset-x-0 bottom-0 h-0.5 bg-accent md:inset-x-4" />
                  ) : null}
                </button>
              );
            })}
          </div>

          <div
            data-case-workflow
            role="tabpanel"
            className="grid gap-6 p-5 sm:p-7 lg:grid-cols-[1.1fr_0.9fr] lg:items-center"
          >
            <div>
              <p className="text-xs font-semibold tracking-[0.14em] text-accent uppercase">
                {active.label}
              </p>
              <h3 className="mt-2 font-heading text-2xl font-semibold tracking-tight">
                {active.title}
              </h3>
              <p className="mt-3 max-w-xl text-[0.975rem] leading-7 text-muted">
                {active.description}
              </p>
              <div className="mt-5 flex flex-wrap items-center gap-2 text-sm text-muted">
                {caseStudyWorkflowStages.map((stage, index) => (
                  <span key={stage.id} className="inline-flex items-center gap-2">
                    <span
                      className={cn(
                        "rounded-full px-2.5 py-1 text-xs font-medium",
                        stage.id === activeId
                          ? "bg-accent text-accent-foreground"
                          : "bg-surface-muted",
                      )}
                    >
                      {stage.label}
                    </span>
                    {index < caseStudyWorkflowStages.length - 1 ? (
                      <span aria-hidden className="text-border-strong">
                        →
                      </span>
                    ) : null}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-[1.35rem] border border-border bg-[linear-gradient(160deg,color-mix(in_oklab,var(--accent-soft)_70%,transparent),var(--surface))] p-5">
              <div className="mb-4 inline-flex size-11 items-center justify-center rounded-2xl bg-accent text-accent-foreground shadow-[0_12px_28px_color-mix(in_oklab,var(--accent)_28%,transparent)]">
                <ActiveIcon className="size-5" aria-hidden />
              </div>
              <div className="space-y-2">
                <div className="h-2.5 w-3/4 rounded-full bg-foreground/15" />
                <div className="h-2.5 w-full rounded-full bg-foreground/8" />
                <div className="h-2.5 w-5/6 rounded-full bg-foreground/8" />
              </div>
              <div className="mt-5 grid grid-cols-3 gap-2">
                {["Sample", "Local", "Read-only"].map((label) => (
                  <div
                    key={label}
                    className="rounded-xl border border-border bg-surface/80 px-2 py-3 text-center text-[10px] font-medium tracking-wide text-muted uppercase"
                  >
                    {label}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
