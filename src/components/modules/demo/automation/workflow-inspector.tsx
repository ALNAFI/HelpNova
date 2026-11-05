"use client";

import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { ruleLabels, topicLabels } from "@/data/demo/seed";
import { workflowNodes } from "@/utils/demo-automation";
import type { DemoRule, DemoTopic, SimulationResult } from "@/types/demo";

type WorkflowInspectorProps = {
  nodeId: string;
  inquiry: DemoTopic;
  rule: DemoRule;
  simulation: SimulationResult | null;
  isStale?: boolean;
  mobileOpen?: boolean;
  onCloseMobile?: () => void;
};

export function WorkflowInspector({
  nodeId,
  inquiry,
  rule,
  simulation,
  isStale = false,
  mobileOpen,
  onCloseMobile,
}: WorkflowInspectorProps) {
  const node =
    workflowNodes.find((n) => n.id === nodeId) ?? workflowNodes[0];
  const panelRef = useRef<HTMLDivElement>(null);

  // Prefer the completed-run snapshot so step details stay aligned with the flowchart.
  const contextInquiry = simulation?.inquiry ?? inquiry;
  const contextRule = simulation?.rule ?? rule;

  useEffect(() => {
    if (!mobileOpen) return;
    const previous = document.activeElement as HTMLElement | null;
    panelRef.current?.querySelector<HTMLElement>("button")?.focus();

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onCloseMobile?.();
    }
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      previous?.focus?.();
    };
  }, [mobileOpen, onCloseMobile]);

  const content = (
    <div ref={panelRef} className="flex h-full min-h-0 flex-col">
      <div className="flex items-start justify-between gap-3 border-b border-[var(--demo-border)] px-4 py-3">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-accent">
            Step details
          </p>
          <h3 className="mt-1 font-heading text-[15px] font-semibold leading-snug sm:text-base">
            {node.label}
          </h3>
          <p className="mt-0.5 text-[12px] capitalize text-[var(--demo-muted)]">
            {node.type}
          </p>
        </div>
        {onCloseMobile ? (
          <button
            type="button"
            onClick={onCloseMobile}
            className="rounded-lg p-1.5 text-[var(--demo-muted)] xl:hidden"
            aria-label="Close step details"
          >
            <X className="size-4" />
          </button>
        ) : null}
      </div>

      <div className="space-y-4 overflow-y-auto p-4 text-sm">
        <p className="text-[13px] leading-relaxed text-[var(--demo-muted)] sm:text-sm">
          {node.purpose}
        </p>

        <div className="rounded-xl border border-[var(--demo-border)] bg-[var(--demo-panel-2)] p-3">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-[var(--demo-muted)]">
            {simulation
              ? isStale
                ? "Previous run"
                : "Completed run"
              : "Current selection"}
          </p>
          <dl className="mt-2.5 grid grid-cols-[auto_minmax(0,1fr)] gap-x-3 gap-y-2 text-[12px] sm:text-[13px]">
            <dt className="text-[var(--demo-muted)]">Inquiry</dt>
            <dd className="text-right font-medium">
              {topicLabels[contextInquiry]}
            </dd>
            <dt className="text-[var(--demo-muted)]">Rule</dt>
            <dd className="text-right font-medium">
              {ruleLabels[contextRule]}
            </dd>
            {simulation ? (
              <>
                <dt className="text-[var(--demo-muted)]">Outcome</dt>
                <dd className="text-right font-medium">
                  {simulation.matched ? "Matched" : "No match"}
                </dd>
                <dt className="text-[var(--demo-muted)]">Team</dt>
                <dd className="text-right font-medium">
                  {simulation.destination}
                </dd>
              </>
            ) : null}
          </dl>
        </div>

        {isStale ? (
          <p className="text-[12px] leading-relaxed text-[var(--demo-muted)] sm:text-[13px]">
            Selections changed. Run Simulation to update results.
          </p>
        ) : (
          <p className="text-[12px] leading-relaxed text-[var(--demo-muted)] sm:text-[13px]">
            Assign the conversation to the selected team.
          </p>
        )}
      </div>
    </div>
  );

  if (mobileOpen === undefined) {
    return content;
  }

  if (!mobileOpen) return null;

  return (
    <div className="fixed inset-0 z-50 xl:hidden">
      <button
        type="button"
        className="absolute inset-0 bg-black/50"
        aria-label="Close step details overlay"
        onClick={onCloseMobile}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Step details"
        className="absolute inset-x-0 bottom-0 max-h-[78dvh] overflow-hidden rounded-t-2xl border border-[var(--demo-border)] bg-[var(--demo-panel)] shadow-2xl"
      >
        {content}
      </div>
    </div>
  );
}
