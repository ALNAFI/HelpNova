"use client";

import {
  BarChart3,
  Bot,
  GitBranch,
  Inbox,
  Tags,
  UsersRound,
} from "lucide-react";
import { Reveal } from "@/components/common/reveal";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { bentoFeatures } from "@/data/marketing/home";
import { cn } from "@/utils/cn";

const iconMap = {
  chatbot: Bot,
  inbox: Inbox,
  automation: GitBranch,
  insights: BarChart3,
  collaboration: UsersRound,
  organization: Tags,
} as const;

function BentoPreview({ kind }: { kind: (typeof bentoFeatures)[number]["kind"] }) {
  if (kind === "chatbot") {
    return (
      <div className="mt-5 space-y-2 rounded-2xl border border-border bg-surface-muted/60 p-3">
        <div className="rounded-xl bg-surface px-3 py-2 text-xs text-muted">
          Preset: “Where is my order?”
        </div>
        <div className="rounded-xl bg-accent-soft px-3 py-2 text-xs text-foreground">
          Local answer: Share your order number and we’ll show the sample tracking steps.
        </div>
        <p className="text-[11px] text-muted">Preset simulation · no AI API</p>
      </div>
    );
  }

  if (kind === "inbox") {
    return (
      <div className="mt-5 space-y-2">
        {["Maya · Order #48291", "Sam · Renewal charge", "Priya · SSO loop"].map(
          (row, index) => (
            <div
              key={row}
              className={cn(
                "rounded-xl border border-border px-3 py-2 text-xs",
                index === 0 ? "bg-accent-soft" : "bg-surface-muted/50",
              )}
            >
              {row}
            </div>
          ),
        )}
      </div>
    );
  }

  if (kind === "automation") {
    return (
      <div className="mt-5 flex items-center gap-2 text-xs">
        <span className="rounded-lg bg-accent-soft px-2 py-1 text-accent">
          Trigger
        </span>
        <span className="text-muted">→</span>
        <span className="rounded-lg bg-surface-muted px-2 py-1">Condition</span>
        <span className="text-muted">→</span>
        <span className="rounded-lg bg-surface-muted px-2 py-1">Action</span>
      </div>
    );
  }

  if (kind === "insights") {
    return (
      <div className="mt-5 flex h-16 items-end gap-1.5">
        {[40, 70, 55, 90, 65].map((h, i) => (
          <div
            key={i}
            className="flex-1 rounded-t-md bg-accent/70"
            style={{ height: `${h}%` }}
          />
        ))}
      </div>
    );
  }

  if (kind === "collaboration") {
    return (
      <div className="mt-5 rounded-xl border border-dashed border-warning/40 bg-warning/10 px-3 py-2 text-xs">
        Internal note: Confirm carrier scan before replying.
      </div>
    );
  }

  return (
    <div className="mt-5 flex flex-wrap gap-2">
      {["Open", "orders", "Medium"].map((tag) => (
        <span
          key={tag}
          className="rounded-full bg-surface-muted px-2.5 py-1 text-[11px] text-muted"
        >
          {tag}
        </span>
      ))}
    </div>
  );
}

export function FeatureBento() {
  return (
    <section id="features" className="scroll-mt-28 py-16 sm:py-20 lg:py-24">
      <Container>
        <Reveal>
          <SectionHeading
            align="center"
            eyebrow="Feature bento"
            title="Every surface designed to feel like a real product"
            description="Asymmetric cards with living micro-UI—not flat icon grids. Explore how chatbot presets, inbox, automation, and insights fit together."
            className="mb-12"
          />
        </Reveal>

        <div className="grid auto-rows-[minmax(180px,auto)] gap-4 md:grid-cols-6">
          {bentoFeatures.map((feature, index) => {
            const Icon = iconMap[feature.kind];
            return (
              <Reveal
                key={feature.id}
                delay={index * 0.04}
                className={cn(
                  "group rounded-[var(--radius-card)] border border-border bg-surface p-5 shadow-[var(--shadow-soft)] transition-transform duration-300 hover:-translate-y-0.5 sm:p-6",
                  feature.size === "large" && "md:col-span-3 md:row-span-2",
                  feature.size === "medium" && "md:col-span-3",
                  feature.size === "small" && "md:col-span-2",
                )}
              >
                <div className="inline-flex size-10 items-center justify-center rounded-2xl bg-accent-soft text-accent">
                  <Icon className="size-5" aria-hidden />
                </div>
                <h3 className="mt-4 font-heading text-lg font-semibold tracking-tight">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-muted">
                  {feature.description}
                </p>
                <BentoPreview kind={feature.kind} />
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
