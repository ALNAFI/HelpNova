"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Check,
  CreditCard,
  LoaderCircle,
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
    description: "Delivery and shipment updates",
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
  const [isRunning, setIsRunning] = useState(false);

  const isStale = Boolean(
    state.simulation &&
      (state.simulation.inquiry !== state.selectedInquiry ||
        state.simulation.rule !== state.selectedRule),
  );

  const runStatus = useMemo(() => {
    if (isRunning) return "running" as const;
    if (!state.simulation) return "pending" as const;
    if (isStale) return "pending" as const;
    return "completed" as const;
  }, [isRunning, state.simulation, isStale]);

  const handleAnimationComplete = useCallback(() => {
    setIsRunning(false);
  }, []);

  useEffect(() => {
    if (!isRunning) return;
    const safety = window.setTimeout(() => setIsRunning(false), 2800);
    return () => window.clearTimeout(safety);
  }, [isRunning, state.simulationNonce]);

  const handleRun = () => {
    setIsRunning(true);
    dispatch({ type: "RUN_SIMULATION" });
  };

  const handleReplay = () => {
    if (!state.simulation || isStale) return;
    setIsRunning(true);
    dispatch({ type: "REPLAY_SIMULATION" });
  };

  const handleViewConversation = (conversationId: string) => {
    dispatch({ type: "SELECT_CONVERSATION", conversationId });
    dispatch({ type: "SET_MOBILE_THREAD_OPEN", open: true });
    dispatch({ type: "SET_VIEW", view: "inbox" });
  };

  return (
    <div className="flex h-full min-h-0 flex-col overflow-x-hidden overflow-y-auto xl:overflow-hidden">
      <div className="shrink-0 space-y-3 border-b border-[var(--demo-border)] bg-[var(--demo-panel)]/70 p-3 sm:p-4">
        <div className="grid gap-3 lg:grid-cols-2">
          <SelectorGroup label="1. Choose an inquiry">
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
                    "relative flex items-start gap-2 rounded-xl border px-3 py-2.5 text-left transition",
                    active
                      ? "border-accent bg-accent/12 shadow-[0_0_0_1px_color-mix(in_oklab,var(--accent)_30%,transparent)]"
                      : "border-[var(--demo-border)] bg-[var(--demo-panel)] hover:border-accent/25",
                  )}
                >
                  {active ? (
                    <span className="absolute right-2 top-2 flex size-4 items-center justify-center rounded-full bg-accent text-accent-foreground">
                      <Check className="size-2.5" strokeWidth={3} />
                    </span>
                  ) : null}
                  <Icon className="mt-0.5 size-4 shrink-0 text-accent" />
                  <span className="min-w-0 pr-4">
                    <span className="block text-[14px] font-medium leading-snug sm:text-[15px]">
                      {item.label}
                    </span>
                    <span className="mt-0.5 block text-[12px] leading-snug text-[var(--demo-muted)] sm:text-[13px]">
                      {item.description}
                    </span>
                  </span>
                </button>
              );
            })}
          </SelectorGroup>

          <SelectorGroup label="2. Choose a routing rule">
            {rules.map((item) => {
              const active = state.selectedRule === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => dispatch({ type: "SET_RULE", rule: item.id })}
                  aria-pressed={active}
                  className={cn(
                    "relative rounded-xl border px-3 py-2.5 text-left transition",
                    active
                      ? "border-accent bg-accent/12 shadow-[0_0_0_1px_color-mix(in_oklab,var(--accent)_30%,transparent)]"
                      : "border-[var(--demo-border)] bg-[var(--demo-panel)] hover:border-accent/25",
                  )}
                >
                  {active ? (
                    <span className="absolute right-2 top-2 flex size-4 items-center justify-center rounded-full bg-accent text-accent-foreground">
                      <Check className="size-2.5" strokeWidth={3} />
                    </span>
                  ) : null}
                  <span className="block pr-4 text-[14px] font-medium leading-snug sm:text-[15px]">
                    {item.label}
                  </span>
                  <span className="mt-0.5 block text-[12px] leading-snug text-[var(--demo-muted)] sm:text-[13px]">
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
            onClick={handleRun}
            disabled={isRunning}
            className="inline-flex h-10 items-center gap-2 rounded-xl bg-accent px-4 text-sm font-semibold text-accent-foreground shadow-[0_10px_28px_rgb(109_40_217_/_0.28)] transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:cursor-wait disabled:opacity-80"
          >
            {isRunning ? (
              <LoaderCircle className="size-4 animate-spin" />
            ) : (
              <Play className="size-4" />
            )}
            {isRunning ? "Running…" : "Run Simulation"}
          </button>
          <button
            type="button"
            disabled={!state.simulation || isStale || isRunning}
            onClick={handleReplay}
            className="inline-flex h-10 items-center gap-2 rounded-xl border border-[var(--demo-border)] bg-[var(--demo-panel)] px-4 text-sm font-medium transition hover:bg-[var(--demo-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:cursor-not-allowed disabled:opacity-40"
          >
            <RotateCw className="size-4" />
            Replay
          </button>

          <StatusChip status={runStatus} isStale={isStale} />

          <button
            type="button"
            onClick={() => setInspectorOpen(true)}
            className="ml-auto inline-flex h-10 items-center rounded-xl border border-[var(--demo-border)] px-3 text-xs font-medium xl:hidden"
          >
            Step details
          </button>
        </div>
      </div>

      <div className="grid min-h-0 flex-1 gap-4 p-3 sm:p-4 xl:grid-cols-[minmax(0,1fr)_280px] xl:overflow-hidden">
        <div className="min-h-0 space-y-4 xl:overflow-y-auto">
          <WorkflowCanvas
            selectedNodeId={state.selectedNodeId}
            simulation={state.simulation}
            simulationNonce={state.simulationNonce}
            isStale={isStale}
            onAnimationComplete={handleAnimationComplete}
            onSelectNode={(nodeId) => {
              dispatch({ type: "SELECT_NODE", nodeId });
              setInspectorOpen(true);
            }}
          />
          <SimulationResultPanel
            simulation={state.simulation}
            isStale={isStale}
            onViewConversation={handleViewConversation}
          />
        </div>

        <aside className="hidden min-h-0 overflow-hidden rounded-2xl border border-[var(--demo-border)] bg-[var(--demo-panel)]/80 xl:block">
          <WorkflowInspector
            nodeId={state.selectedNodeId}
            inquiry={state.selectedInquiry}
            rule={state.selectedRule}
            simulation={state.simulation}
            isStale={isStale}
          />
        </aside>
      </div>

      <WorkflowInspector
        nodeId={state.selectedNodeId}
        inquiry={state.selectedInquiry}
        rule={state.selectedRule}
        simulation={state.simulation}
        isStale={isStale}
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
      <p className="mb-2 text-[12px] font-semibold text-[var(--demo-text)] sm:text-[13px]">
        {label}
      </p>
      <div className="grid gap-2 sm:grid-cols-3">{children}</div>
    </div>
  );
}

function StatusChip({
  status,
  isStale,
}: {
  status: "running" | "completed" | "pending";
  isStale: boolean;
}) {
  const label =
    status === "running"
      ? "Running"
      : status === "completed"
        ? "Completed"
        : isStale
          ? "Pending update"
          : "Pending";

  return (
    <span
      className={cn(
        "inline-flex h-8 items-center rounded-lg px-2.5 text-[12px] font-medium sm:text-[13px]",
        status === "running" && "bg-accent/15 text-accent",
        status === "completed" &&
          "bg-emerald-500/15 text-emerald-800 dark:text-emerald-200",
        status === "pending" &&
          "bg-[var(--demo-panel-2)] text-[var(--demo-muted)]",
      )}
    >
      {label}
    </span>
  );
}
