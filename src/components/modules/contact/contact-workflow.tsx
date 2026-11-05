"use client";

import { useEffect, useId, useRef, useState } from "react";
import { ArrowRight, Mail, Package, Route } from "lucide-react";
import { Container } from "@/components/ui/container";
import {
  contactPageCopy,
  contactWorkflowStages,
  contactWorkflowStory,
} from "@/data/marketing/contact";
import { getGsap } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { cn } from "@/utils/cn";

type WorkflowStageId = (typeof contactWorkflowStages)[number]["id"];

function ConversationPreview() {
  return (
    <div className="w-full max-w-md">
      <div className="rounded-2xl border border-border/80 bg-surface p-4 shadow-[var(--shadow-soft)]">
        <div className="flex items-start gap-3">
          <span
            className="inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-accent text-sm font-semibold text-accent-foreground"
            aria-hidden
          >
            {contactWorkflowStory.customerInitials}
          </span>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <p className="text-sm font-semibold text-foreground">
                {contactWorkflowStory.customerName}
              </p>
              <span className="inline-flex items-center gap-1 rounded-full bg-accent-soft px-2 py-0.5 text-[11px] font-medium text-accent">
                <Mail className="size-3" aria-hidden />
                {contactWorkflowStory.channel}
              </span>
              <span className="text-[11px] text-muted">
                {contactWorkflowStory.timestamp}
              </span>
            </div>
            <p className="mt-3 text-[11px] font-semibold tracking-[0.14em] text-accent uppercase">
              {contactWorkflowStory.messageEyebrow}
            </p>
            <p className="mt-1.5 text-sm leading-6 text-foreground">
              {contactWorkflowStory.message}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ContextPreview() {
  return (
    <div className="w-full max-w-md space-y-3">
      <div className="rounded-2xl border border-border/80 bg-surface p-4 shadow-[var(--shadow-soft)]">
        <div className="flex items-center gap-3">
          <span
            className="inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-accent text-sm font-semibold text-accent-foreground"
            aria-hidden
          >
            {contactWorkflowStory.customerInitials}
          </span>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-foreground">
              {contactWorkflowStory.customerName}
            </p>
            <p className="mt-0.5 truncate text-xs text-muted">
              {contactWorkflowStory.customerEmail}
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-border/80 bg-surface p-4 shadow-[var(--shadow-soft)]">
        <div className="flex items-center gap-2 text-accent">
          <Package className="size-4 shrink-0" aria-hidden />
          <p className="text-[11px] font-semibold tracking-[0.14em] uppercase">
            Order details
          </p>
        </div>
        <dl className="mt-3 space-y-2.5 text-sm">
          <div className="flex items-center justify-between gap-3">
            <dt className="text-muted">Order</dt>
            <dd className="font-medium text-foreground">
              {contactWorkflowStory.orderNumber}
            </dd>
          </div>
          <div className="flex items-center justify-between gap-3">
            <dt className="text-muted">Tracking</dt>
            <dd className="font-medium text-foreground">
              {contactWorkflowStory.tracking}
            </dd>
          </div>
          <div className="flex items-center justify-between gap-3">
            <dt className="text-muted">Delivery</dt>
            <dd className="font-medium text-foreground">
              {contactWorkflowStory.deliveryStatus}
            </dd>
          </div>
          <div className="rounded-xl border border-border/70 bg-surface-muted/50 px-3 py-2 text-xs leading-5 text-muted">
            {contactWorkflowStory.deliveryDetail}
          </div>
        </dl>
      </div>
    </div>
  );
}

function RoutingPreview() {
  return (
    <div className="w-full max-w-md">
      <div className="rounded-2xl border border-border/80 bg-surface p-4 shadow-[var(--shadow-soft)]">
        <div className="flex items-center gap-2 text-accent">
          <Route className="size-4 shrink-0" aria-hidden />
          <p className="text-[11px] font-semibold tracking-[0.14em] uppercase">
            Topic routing
          </p>
        </div>

        <div className="mt-4 space-y-2.5">
          <div className="rounded-xl border border-border bg-surface-muted/50 px-3.5 py-2.5">
            <p className="text-[11px] text-muted">Inquiry</p>
            <p className="mt-0.5 text-sm font-medium text-foreground">
              {contactWorkflowStory.subject}
            </p>
          </div>

          <div className="flex justify-center" aria-hidden>
            <ArrowRight className="size-4 text-accent" />
          </div>

          <div className="rounded-xl border border-accent/25 bg-accent-soft/60 px-3.5 py-2.5">
            <p className="text-[11px] text-accent">Topic matched</p>
            <p className="mt-0.5 text-sm font-medium text-foreground">
              {contactWorkflowStory.topic}
            </p>
          </div>

          <div className="flex justify-center" aria-hidden>
            <ArrowRight className="size-4 text-accent" />
          </div>

          <div className="rounded-xl border border-accent/40 bg-accent px-3.5 py-2.5 text-accent-foreground">
            <p className="text-[11px] opacity-80">Assigned to</p>
            <p className="mt-0.5 text-sm font-semibold">
              {contactWorkflowStory.team} team
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function WorkflowVisual({ stageId }: { stageId: WorkflowStageId }) {
  if (stageId === "context") return <ContextPreview />;
  if (stageId === "routing") return <RoutingPreview />;
  return <ConversationPreview />;
}

export function ContactWorkflow() {
  const sectionRef = useRef<HTMLElement>(null);
  const tabsId = useId();
  const [activeId, setActiveId] = useState<WorkflowStageId>(
    contactWorkflowStages[0].id,
  );
  const reducedMotion = usePrefersReducedMotion();
  const active =
    contactWorkflowStages.find((stage) => stage.id === activeId) ??
    contactWorkflowStages[0];
  const activeIndex = contactWorkflowStages.findIndex(
    (stage) => stage.id === activeId,
  );

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

  const focusTab = (id: WorkflowStageId) => {
    document.getElementById(`${tabsId}-${id}`)?.focus();
  };

  const selectStage = (id: WorkflowStageId) => {
    setActiveId(id);
    focusTab(id);
  };

  const moveSelection = (fromId: WorkflowStageId, delta: number) => {
    const current = contactWorkflowStages.findIndex(
      (stage) => stage.id === fromId,
    );
    const next =
      contactWorkflowStages[
        (current + delta + contactWorkflowStages.length) %
          contactWorkflowStages.length
      ];
    selectStage(next.id);
  };

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
            aria-label="Product walkthrough stages"
            className="flex gap-2 overflow-x-auto border-b border-border p-3 sm:p-4"
          >
            {contactWorkflowStages.map((stage, index) => {
              const selected = stage.id === activeId;
              return (
                <button
                  key={stage.id}
                  id={`${tabsId}-${stage.id}`}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  aria-controls={`${tabsId}-panel`}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActiveId(stage.id)}
                  onKeyDown={(event) => {
                    if (
                      event.key === "ArrowRight" ||
                      event.key === "ArrowDown"
                    ) {
                      event.preventDefault();
                      moveSelection(stage.id, 1);
                      return;
                    }
                    if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
                      event.preventDefault();
                      moveSelection(stage.id, -1);
                      return;
                    }
                    if (event.key === "Home") {
                      event.preventDefault();
                      selectStage(contactWorkflowStages[0].id);
                      return;
                    }
                    if (event.key === "End") {
                      event.preventDefault();
                      selectStage(
                        contactWorkflowStages[contactWorkflowStages.length - 1]
                          .id,
                      );
                    }
                  }}
                  className={cn(
                    "inline-flex min-w-[10.5rem] shrink-0 items-center gap-2 rounded-2xl px-4 py-3 text-left text-sm font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
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

          <div
            role="tabpanel"
            id={`${tabsId}-panel`}
            aria-labelledby={`${tabsId}-${active.id}`}
            className="grid items-center gap-6 p-5 sm:p-7 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-8"
          >
            <div
              key={active.id}
              className={cn(
                "flex h-[22rem] items-center justify-center rounded-[1.35rem] border border-border bg-[linear-gradient(160deg,var(--accent-soft),var(--surface)_58%)] p-4 sm:h-[23rem] sm:p-5",
                !reducedMotion && "animate-[demoFadeIn_220ms_ease-out]",
              )}
            >
              <WorkflowVisual stageId={active.id} />
            </div>

            <div
              key={`${active.id}-copy`}
              className={cn(
                "flex h-[22rem] flex-col justify-center sm:h-[23rem]",
                !reducedMotion && "animate-[demoFadeIn_220ms_ease-out]",
              )}
            >
              <p className="text-[11px] font-semibold tracking-[0.16em] text-accent uppercase">
                {String(activeIndex + 1).padStart(2, "0")} · {active.label}
              </p>
              <h3 className="mt-2 font-heading text-2xl font-semibold tracking-tight text-balance">
                {active.title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-muted">
                {active.description}
              </p>
            </div>
          </div>
        </div>

        <p
          data-contact-workflow
          className="mt-4 text-center text-xs font-medium tracking-[0.08em] text-muted uppercase"
        >
          {contactPageCopy.workflowPreviewLabel}
        </p>
      </Container>
    </section>
  );
}
