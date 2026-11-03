"use client";

import { useEffect, useRef, useState } from "react";
import { Reveal } from "@/components/common/reveal";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { workflowNodes } from "@/data/marketing/home";
import { getGsap } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { cn } from "@/utils/cn";

export function AutomationShowcase() {
  const [selectedId, setSelectedId] = useState(workflowNodes[0].id);
  const flowRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();
  const selected =
    workflowNodes.find((node) => node.id === selectedId) ?? workflowNodes[0];

  useEffect(() => {
    const flow = flowRef.current;
    if (!flow || reducedMotion) return;
    const { gsap } = getGsap();
    const ctx = gsap.context(() => {
      gsap.from("[data-flow-node]", {
        scale: 0.94,
        autoAlpha: 0,
        duration: 0.55,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: { trigger: flow, start: "top 75%" },
      });
      gsap.fromTo(
        "[data-flow-line]",
        { scaleY: 0 },
        {
          scaleY: 1,
          transformOrigin: "top",
          duration: 0.45,
          stagger: 0.08,
          ease: "power1.out",
          scrollTrigger: { trigger: flow, start: "top 75%" },
        },
      );
    }, flow);
    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section id="automation" className="scroll-mt-28 py-16 sm:py-20 lg:py-24">
      <Container>
        <Reveal>
          <SectionHeading
            align="center"
            eyebrow="Workflow automation"
            title="Route with intention—Matched or Otherwise"
            description="Inspect each node in this read-only flow. Trigger, condition, and action stay visible so teams understand why a conversation landed where it did."
            className="mb-12"
          />
        </Reveal>

        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <Reveal>
            <div
              ref={flowRef}
              className="rounded-[var(--radius-workspace)] border border-border bg-surface p-5 shadow-[var(--shadow-soft)] sm:p-8"
            >
              <div className="mx-auto flex max-w-xl flex-col items-center">
                {workflowNodes.slice(0, 2).map((node, index) => (
                  <div key={node.id} className="flex w-full flex-col items-center">
                    <button
                      type="button"
                      data-flow-node
                      onClick={() => setSelectedId(node.id)}
                      className={cn(
                        "w-full max-w-sm rounded-2xl border px-4 py-4 text-left transition-colors",
                        selectedId === node.id
                          ? "border-accent bg-accent-soft"
                          : "border-border bg-surface-muted/50 hover:border-border-strong",
                      )}
                    >
                      <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-accent">
                        {node.kind}
                      </span>
                      <span className="mt-1 block font-heading text-lg font-semibold">
                        {node.label}
                      </span>
                    </button>
                    {index === 0 ? (
                      <div
                        data-flow-line
                        className="my-2 h-8 w-px bg-gradient-to-b from-accent to-border"
                      />
                    ) : (
                      <div
                        data-flow-line
                        className="my-2 h-8 w-px bg-gradient-to-b from-accent to-border"
                      />
                    )}
                  </div>
                ))}

                <div className="grid w-full gap-3 sm:grid-cols-2">
                  {workflowNodes.slice(2, 4).map((node) => (
                    <button
                      key={node.id}
                      type="button"
                      data-flow-node
                      onClick={() => setSelectedId(node.id)}
                      className={cn(
                        "rounded-2xl border px-4 py-4 text-left transition-colors",
                        selectedId === node.id
                          ? "border-accent bg-accent-soft"
                          : node.id === "matched"
                            ? "border-success/30 bg-success/5 hover:border-success/50"
                            : "border-border bg-surface-muted/50 hover:border-border-strong",
                      )}
                    >
                      <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-accent">
                        {node.kind}
                      </span>
                      <span className="mt-1 block font-heading text-base font-semibold">
                        {node.label}
                      </span>
                    </button>
                  ))}
                </div>

                <div className="my-2 grid w-full grid-cols-2 gap-3">
                  <div data-flow-line className="mx-auto h-8 w-px bg-border" />
                  <div data-flow-line className="mx-auto h-8 w-px bg-border" />
                </div>

                <div className="grid w-full gap-3 sm:grid-cols-2">
                  {workflowNodes.slice(4).map((node) => (
                    <button
                      key={node.id}
                      type="button"
                      data-flow-node
                      onClick={() => setSelectedId(node.id)}
                      className={cn(
                        "rounded-2xl border px-4 py-4 text-left transition-colors",
                        selectedId === node.id
                          ? "border-accent bg-accent-soft"
                          : "border-border bg-surface-muted/50 hover:border-border-strong",
                      )}
                    >
                      <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-accent">
                        {node.kind}
                      </span>
                      <span className="mt-1 block font-heading text-base font-semibold">
                        {node.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <aside className="flex h-full flex-col justify-between rounded-[var(--radius-workspace)] border border-border bg-workspace p-6 text-workspace-text shadow-[var(--shadow-soft)] sm:p-8">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-accent">
                  Node inspector
                </p>
                <h3 className="mt-3 font-heading text-2xl font-semibold">
                  {selected.label}
                </h3>
                <p className="mt-4 text-sm leading-7 text-workspace-muted">
                  {selected.detail}
                </p>
              </div>
              <p className="mt-8 rounded-2xl border border-workspace-border bg-workspace-surface p-4 text-sm text-workspace-muted">
                Preview only—no rules execute and nothing is written to the Guided
                Demo state.
              </p>
            </aside>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
