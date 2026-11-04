"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Container } from "@/components/ui/container";
import { aboutPageCopy, aboutVisionStages } from "@/data/marketing/about";
import { getGsap } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { cn } from "@/utils/cn";

export function AboutVision() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelId = useId();
  const [activeId, setActiveId] = useState<(typeof aboutVisionStages)[number]["id"]>(
    aboutVisionStages[0].id,
  );
  const reducedMotion = usePrefersReducedMotion();
  const active =
    aboutVisionStages.find((stage) => stage.id === activeId) ??
    aboutVisionStages[0];

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || reducedMotion) return;
    const { gsap } = getGsap();
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: el, start: "top 78%" },
      });
      tl.fromTo(
        "[data-vision-stage='inbox']",
        { y: 24, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.55, ease: "power3.out" },
      )
        .fromTo(
          "[data-vision-line-1]",
          { scaleX: 0 },
          { scaleX: 1, duration: 0.45, ease: "power2.out" },
          "-=0.15",
        )
        .fromTo(
          "[data-vision-stage='automation']",
          { y: 24, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.55, ease: "power3.out" },
          "-=0.1",
        )
        .fromTo(
          "[data-vision-line-2]",
          { scaleX: 0 },
          { scaleX: 1, duration: 0.45, ease: "power2.out" },
          "-=0.15",
        )
        .fromTo(
          "[data-vision-stage='insights']",
          { y: 24, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.55, ease: "power3.out" },
          "-=0.1",
        );
    }, el);
    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      ref={sectionRef}
      className="relative py-16 sm:py-20"
      aria-labelledby="about-vision-heading"
    >
      <Container>
        <div className="max-w-2xl">
          <p className="text-xs font-semibold tracking-[0.16em] text-accent uppercase">
            {aboutPageCopy.visionEyebrow}
          </p>
          <h2
            id="about-vision-heading"
            className="mt-3 font-heading text-[1.85rem] font-semibold tracking-tight text-balance sm:text-[2.35rem]"
          >
            {aboutPageCopy.visionTitle}
          </h2>
          <p className="mt-4 text-base leading-7 text-muted">
            {aboutPageCopy.visionDescription}
          </p>
        </div>

        <div
          role="tablist"
          aria-labelledby={labelId}
          className="mt-8 flex flex-wrap gap-2"
        >
          <span id={labelId} className="sr-only">
            Product vision stages
          </span>
          {aboutVisionStages.map((stage) => {
            const selected = stage.id === activeId;
            return (
              <button
                key={stage.id}
                type="button"
                role="tab"
                aria-selected={selected}
                onClick={() => setActiveId(stage.id)}
                className={cn(
                  "rounded-full border px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  selected
                    ? "border-accent bg-accent text-accent-foreground"
                    : "border-border bg-surface text-muted hover:text-foreground",
                )}
              >
                {stage.label}
              </button>
            );
          })}
        </div>

        <div className="mt-8 grid items-stretch gap-4 lg:grid-cols-[1fr_auto_1fr_auto_1fr]">
          {aboutVisionStages.map((stage, index) => (
            <div key={stage.id} className="contents">
              <button
                type="button"
                data-vision-stage={stage.id}
                onClick={() => setActiveId(stage.id)}
                className={cn(
                  "rounded-[1.35rem] border p-4 text-left transition-[border-color,box-shadow,transform] duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:p-5",
                  activeId === stage.id
                    ? "border-accent/40 bg-surface shadow-[var(--shadow-soft)]"
                    : "border-border bg-surface/80 hover:border-accent/25",
                )}
              >
                <p className="text-[11px] font-semibold tracking-[0.14em] text-accent uppercase">
                  {stage.label}
                </p>
                <StagePreview stageId={stage.id} />
              </button>
              {index < aboutVisionStages.length - 1 ? (
                <div className="hidden items-center lg:flex" aria-hidden>
                  <div
                    {...(index === 0
                      ? { "data-vision-line-1": true }
                      : { "data-vision-line-2": true })}
                    className="h-px w-10 origin-left bg-accent/50"
                  />
                </div>
              ) : null}
            </div>
          ))}
        </div>

        <div className="mt-6 rounded-[1.35rem] border border-border bg-accent-soft/35 px-5 py-4 sm:px-6">
          <h3 className="font-heading text-xl font-semibold tracking-tight">
            {active.title}
          </h3>
          <p className="mt-2 text-sm leading-7 text-muted">{active.description}</p>
        </div>
      </Container>
    </section>
  );
}

function StagePreview({ stageId }: { stageId: string }) {
  if (stageId === "automation") {
    return (
      <div className="mt-4 space-y-2 rounded-2xl border border-border bg-surface-muted/40 p-3">
        <div className="rounded-lg bg-accent px-3 py-2 text-[11px] font-medium text-accent-foreground">
          New inquiry
        </div>
        <div className="rounded-lg border border-border bg-surface px-3 py-2 text-[11px] text-muted">
          Topic condition
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="rounded-lg border border-accent/30 bg-accent-soft px-2 py-2 text-[10px] text-accent">
            Matched
          </div>
          <div className="rounded-lg border border-border bg-surface px-2 py-2 text-[10px] text-muted">
            Otherwise
          </div>
        </div>
      </div>
    );
  }

  if (stageId === "insights") {
    return (
      <div className="mt-4 space-y-3 rounded-2xl border border-border bg-workspace p-3 text-workspace-text">
        <div className="grid grid-cols-3 gap-2">
          {["12", "5", "7"].map((value) => (
            <div
              key={value}
              className="rounded-lg bg-white/8 px-2 py-2 text-center text-xs font-semibold"
            >
              {value}
            </div>
          ))}
        </div>
        <div className="flex h-14 items-end gap-1.5 px-1">
          {[40, 65, 35, 80, 55, 70].map((height, index) => (
            <div
              key={index}
              className="flex-1 rounded-t bg-accent/70"
              style={{ height: `${height}%` }}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mt-4 space-y-2 rounded-2xl border border-border bg-surface-muted/40 p-3">
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs font-medium">Order tracking</span>
        <span className="rounded-full bg-accent-soft px-2 py-0.5 text-[10px] text-accent">
          Open
        </span>
      </div>
      <p className="text-[11px] leading-5 text-muted">
        Assigned to Orders · Internal note: confirm carrier scan.
      </p>
      <div className="rounded-lg border border-border bg-surface px-3 py-2 text-[11px] text-muted">
        Customer: Where is my package?
      </div>
    </div>
  );
}
