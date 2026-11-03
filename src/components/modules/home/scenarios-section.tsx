"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/common/reveal";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { supportScenarios } from "@/data/marketing/home";
import { cn } from "@/utils/cn";

const steps = [
  { key: "inquiry", label: "Inquiry" },
  { key: "topic", label: "Topic" },
  { key: "routing", label: "Routing" },
  { key: "handoff", label: "Handoff" },
  { key: "outcome", label: "Outcome" },
] as const;

export function ScenariosSection() {
  const [activeId, setActiveId] = useState(supportScenarios[0].id);
  const active =
    supportScenarios.find((s) => s.id === activeId) ?? supportScenarios[0];

  const detailMap = {
    inquiry: active.inquiry,
    topic: active.topic,
    routing: active.routing,
    handoff: active.handoff,
    outcome: active.outcome,
  };

  return (
    <section id="scenarios" className="scroll-mt-28 py-16 sm:py-20 lg:py-24">
      <Container>
        <Reveal>
          <SectionHeading
            align="center"
            eyebrow="Support scenarios"
            title="Follow an inquiry from first message to handoff"
            description="Switch between Order Tracking, Billing Issue, and Technical Support. Each path is a fictional, local illustration."
            className="mb-10"
          />
        </Reveal>

        <div className="mx-auto mb-8 flex max-w-2xl flex-col gap-2 sm:flex-row sm:rounded-full sm:border sm:border-border sm:bg-surface sm:p-1">
          {supportScenarios.map((scenario) => {
            const selected = scenario.id === active.id;
            return (
              <button
                key={scenario.id}
                type="button"
                onClick={() => setActiveId(scenario.id)}
                className={cn(
                  "rounded-full px-4 py-2.5 text-sm font-medium transition-colors",
                  selected
                    ? "bg-accent text-accent-foreground shadow-sm"
                    : "bg-surface text-muted hover:text-foreground sm:bg-transparent",
                )}
              >
                {scenario.title}
              </button>
            );
          })}
        </div>

        <div className="overflow-hidden rounded-[var(--radius-workspace)] border border-border bg-surface shadow-[var(--shadow-soft)]">
          <div className="border-b border-border bg-surface-muted/40 px-5 py-4 sm:px-8">
            <h3 className="font-heading text-xl font-semibold">{active.title}</h3>
            <p className="mt-1 text-sm text-muted">
              Local read-only journey · no tickets are created
            </p>
          </div>
          <ol className="divide-y divide-border">
            {steps.map((step, index) => (
              <li
                key={step.key}
                className="grid gap-3 px-5 py-5 sm:grid-cols-[140px_minmax(0,1fr)] sm:px-8"
              >
                <div className="flex items-center gap-2 text-sm font-semibold text-accent">
                  <span className="inline-flex size-7 items-center justify-center rounded-full bg-accent-soft text-xs">
                    {index + 1}
                  </span>
                  {step.label}
                  {index < steps.length - 1 ? (
                    <ArrowRight
                      className="hidden size-3.5 text-muted sm:inline"
                      aria-hidden
                    />
                  ) : null}
                </div>
                <p className="text-sm leading-6 text-foreground">
                  {detailMap[step.key]}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
