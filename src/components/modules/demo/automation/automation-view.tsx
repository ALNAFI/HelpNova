"use client";

import { useState } from "react";
import {
  CreditCard,
  Package,
  Play,
  RotateCw,
  Wrench,
} from "lucide-react";
import { useDemo } from "@/context/demo-context";
import { ruleLabels, topicLabels } from "@/data/demo/seed";
import { WorkflowCanvas } from "@/components/modules/demo/automation/workflow-canvas";
import { WorkflowInspector } from "@/components/modules/demo/automation/workflow-inspector";
import { SimulationResultPanel } from "@/components/modules/demo/automation/simulation-result";
import type { DemoRule, DemoTopic } from "@/types/demo";
import { cn } from "@/utils/cn";

const inquiries: Array<{
  id: DemoTopic;
  label: string;
  description: string;
  icon: typeof Package;
}> = [
  {
    id: "order-tracking",
    label: topicLabels["order-tracking"],
    description: "Delivery status for a fictional order",
    icon: Package,
  },
  {
    id: "billing-issue",
    label: topicLabels["billing-issue"],
    description: "Charge or invoice question",
    icon: CreditCard,
  },
  {
    id: "technical-support",
    label: topicLabels["technical-support"],
    description: "Product or access problem",
    icon: Wrench,
  },
];

const rules: Array<{ id: DemoRule; label: string; team: string }> = [
  { id: "order", label: ruleLabels.order, team: "Orders" },
  { id: "billing", label: ruleLabels.billing, team: "Billing" },
  { id: "technical", label: ruleLabels.technical, team: "Technical" },
];

export function AutomationView() {
  const { state, dispatch } = useDemo();
  const [inspectorOpen, setInspectorOpen] = useState(false);

  return (
    <div className="flex h-full min-h-0 flex-col overflow-y-auto xl:overflow-hidden">
      <div className="shrink-0 space-y-3 border-b border-[var(--demo-border)] bg-[var(--demo-panel)]/70 p-3 sm:p-4">
        <div className="grid gap-3 lg:grid-cols-2">
          <SelectorGroup label="Inquiry">
            {inquiries.map((item) => {
              const Icon = item.icon;
              const active = state.selectedInquiry === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() =>
                    dispatch({ type: "SET_INQUIRY", inquiry: item.id })
                  }
                  aria-pressed={active}
                  className={cn(
                    "flex items-start gap-2 rounded-xl border px-3 py-2.5 text-left transition",
                    active
                      ? "border-accent/40 bg-accent/15"
                      : "border-[var(--demo-border)] bg-[var(--demo-panel)] hover:border-accent/25",
                  )}
                >
                  <Icon className="mt-0.5 size-4 shrink-0 text-accent" />
                  <span>
                    <span className="block text-sm font-medium">{item.label}</span>
                    <span className="block text-[11px] text-[var(--demo-muted)]">
                      {item.description}
                    </span>
                  </span>
                </button>
              );
            })}
          </SelectorGroup>

          <SelectorGroup label="Rule">
            {rules.map((item) => {
              const active = state.selectedRule === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => dispatch({ type: "SET_RULE", rule: item.id })}
                  aria-pressed={active}
                  className={cn(
                    "rounded-xl border px-3 py-2.5 text-left transition",
                    active
                      ? "border-accent/40 bg-accent/15"
                      : "border-[var(--demo-border)] bg-[var(--demo-panel)] hover:border-accent/25",
                  )}
                >
                  <span className="block text-sm font-medium">{item.label}</span>
                  <span className="block text-[11px] text-[var(--demo-muted)]">
                    Routes to {item.team} when matched
                  </span>
                </button>
              );
            })}
          </SelectorGroup>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => dispatch({ type: "RUN_SIMULATION" })}
            className="inline-flex h-10 items-center gap-2 rounded-xl bg-accent px-4 text-sm font-semibold text-accent-foreground shadow-[0_10px_28px_rgb(109_40_217_/_0.28)] transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            <Play className="size-4" />
            Run Simulation
          </button>
          <button
            type="button"
            disabled={!state.simulation}
            onClick={() => dispatch({ type: "REPLAY_SIMULATION" })}
            className="inline-flex h-10 items-center gap-2 rounded-xl border border-[var(--demo-border)] bg-[var(--demo-panel)] px-4 text-sm font-medium transition hover:bg-[var(--demo-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:cursor-not-allowed disabled:opacity-40"
          >
            <RotateCw className="size-4" />
            Replay
          </button>
          <button
            type="button"
            onClick={() => setInspectorOpen(true)}
            className="ml-auto inline-flex h-10 items-center rounded-xl border border-[var(--demo-border)] px-3 text-xs font-medium xl:hidden"
          >
            Open Inspector
          </button>
        </div>
      </div>

      <div className="grid min-h-0 flex-1 gap-4 p-3 sm:p-4 xl:grid-cols-[minmax(0,1fr)_300px] xl:overflow-hidden">
        <div className="min-h-0 space-y-4 xl:overflow-y-auto">
          <WorkflowCanvas
            selectedNodeId={state.selectedNodeId}
            simulation={state.simulation}
            simulationNonce={state.simulationNonce}
            onSelectNode={(nodeId) => {
              dispatch({ type: "SELECT_NODE", nodeId });
              setInspectorOpen(true);
            }}
          />
          <SimulationResultPanel simulation={state.simulation} />
        </div>

        <aside className="hidden min-h-0 overflow-hidden rounded-2xl border border-[var(--demo-border)] bg-[var(--demo-panel)]/80 xl:block">
          <WorkflowInspector
            nodeId={state.selectedNodeId}
            inquiry={state.selectedInquiry}
            rule={state.selectedRule}
            simulation={state.simulation}
          />
        </aside>
      </div>

      <WorkflowInspector
        nodeId={state.selectedNodeId}
        inquiry={state.selectedInquiry}
        rule={state.selectedRule}
        simulation={state.simulation}
        mobileOpen={inspectorOpen}
        onCloseMobile={() => setInspectorOpen(false)}
      />
    </div>
  );
}

function SelectorGroup({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--demo-muted)]">
        {label}
      </p>
      <div className="grid gap-2 sm:grid-cols-3">{children}</div>
    </div>
  );
}
