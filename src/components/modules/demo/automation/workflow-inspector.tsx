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
  mobileOpen?: boolean;
  onCloseMobile?: () => void;
};

export function WorkflowInspector({
  nodeId,
  inquiry,
  rule,
  simulation,
  mobileOpen,
  onCloseMobile,
}: WorkflowInspectorProps) {
  const node =
    workflowNodes.find((n) => n.id === nodeId) ?? workflowNodes[0];
  const panelRef = useRef<HTMLDivElement>(null);

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
            Inspector
          </p>
          <h3 className="mt-1 font-heading text-base font-semibold">
            {node.label}
          </h3>
          <p className="mt-0.5 text-xs capitalize text-[var(--demo-muted)]">
            {node.type}
          </p>
        </div>
        {onCloseMobile ? (
          <button
            type="button"
            onClick={onCloseMobile}
            className="rounded-lg p-1.5 text-[var(--demo-muted)] xl:hidden"
            aria-label="Close inspector"
          >
            <X className="size-4" />
          </button>
        ) : null}
      </div>

      <div className="space-y-4 overflow-y-auto p-4 text-sm">
        <p className="leading-relaxed text-[var(--demo-muted)]">
          {node.purpose}
        </p>

        <div className="rounded-xl border border-[var(--demo-border)] bg-[var(--demo-panel-2)] p-3">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-[var(--demo-muted)]">
            Current context
          </p>
          <dl className="mt-2 space-y-2 text-xs">
            <div className="flex justify-between gap-3">
              <dt className="text-[var(--demo-muted)]">Inquiry</dt>
              <dd className="font-medium">{topicLabels[inquiry]}</dd>
            </div>
            <div className="flex justify-between gap-3">
              <dt className="text-[var(--demo-muted)]">Rule</dt>
              <dd className="font-medium">{ruleLabels[rule]}</dd>
            </div>
            {simulation ? (
              <>
                <div className="flex justify-between gap-3">
                  <dt className="text-[var(--demo-muted)]">Last result</dt>
                  <dd className="font-medium">
                    {simulation.matched ? "Matched" : "Otherwise"}
                  </dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-[var(--demo-muted)]">Destination</dt>
                  <dd className="font-medium">{simulation.destination}</dd>
                </div>
              </>
            ) : null}
          </dl>
        </div>

        <p className="text-xs leading-relaxed text-[var(--demo-muted)]">
          Read-only preview. Run Simulation to apply a local assignment for the
          selected inquiry conversation.
        </p>
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
        aria-label="Close inspector overlay"
        onClick={onCloseMobile}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Node inspector"
        className="absolute inset-x-0 bottom-0 max-h-[78dvh] overflow-hidden rounded-t-2xl border border-[var(--demo-border)] bg-[var(--demo-panel)] shadow-2xl"
      >
        {content}
      </div>
    </div>
  );
}
