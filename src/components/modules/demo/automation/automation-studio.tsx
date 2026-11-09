"use client";

import { useEffect, useRef, useState } from "react";
import { Package, Pause, Play, Receipt, Repeat, RotateCcw, Wrench, type LucideIcon } from "lucide-react";
import { INQUIRIES, RULES, type TopicId } from "./automation-data";
import { useAutomationRun } from "./use-automation-run";
import { FlowStage } from "./flow-stage";
import { RunSummary, StepNarration } from "./step-panels";
import { cn } from "@/utils/cn";
import styles from "./automation-studio.module.css";

const TOPIC_ICONS: Record<TopicId, LucideIcon> = {
  orders: Package,
  billing: Receipt,
  technical: Wrench,
};

interface ChoiceItem {
  id: TopicId;
  title: string;
  shortTitle: string;
  hint: string;
}

function ChoiceGroup({
  label,
  items,
  value,
  onSelect,
}: {
  label: string;
  items: ChoiceItem[];
  value: TopicId;
  onSelect: (id: TopicId) => void;
}) {
  const labelId = `${label.replace(/\s+/g, "-").toLowerCase()}-label`;
  const selected = items.find((i) => i.id === value);

  return (
    <div role="group" aria-labelledby={labelId}>
      <p id={labelId} className="text-sm font-medium">
        {label}
      </p>
      <div className="mt-2 grid grid-cols-3 gap-2">
        {items.map((item) => {
          const Icon = TOPIC_ICONS[item.id];
          return (
            <button
              key={item.id}
              type="button"
              className={cn(styles.choice, "min-w-0 flex-col items-start sm:flex-row sm:items-center")}
              aria-pressed={item.id === value}
              onClick={() => onSelect(item.id)}
            >
              <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
              <span className="min-w-0 truncate text-sm font-medium sm:hidden">{item.shortTitle}</span>
              <span className="hidden min-w-0 truncate text-sm font-medium sm:inline">{item.title}</span>
            </button>
          );
        })}
      </div>
      <p className={cn(styles.muted, "mt-1.5 text-xs")}>{selected?.hint}</p>
    </div>
  );
}

export interface AutomationStudioProps {
  /** Called when the visitor clicks "View conversation" after a finished run. */
  onViewConversation?: (result: { inquiryId: TopicId; team: string }) => void;
  /** Change this value (e.g. increment it from "Reset Demo") to restart the section. */
  resetSignal?: number;
}

export function AutomationStudio({ onViewConversation, resetSignal }: AutomationStudioProps) {
  const rootRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  const run = useAutomationRun({ active: inView });
  const { reset } = run;

  // Only advance while the section is actually on screen.
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      threshold: 0.3,
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Let the page-level "Reset Demo" restart this section.
  const firstRender = useRef(true);
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    reset();
  }, [resetSignal, reset]);

  const { phase, mode, step, inquiry, rule, matched, team, scenarioIndex, scenarioCount } = run;
  const panelProps = { step, inquiry, rule, matched, team };

  const statusLabel =
    phase === "paused"
      ? step === 0
        ? "Ready"
        : "Paused"
      : phase === "complete"
        ? "Completed"
        : mode === "auto"
          ? `Scenario ${scenarioIndex + 1} of ${scenarioCount}`
          : "Running";
  const playLabel = phase === "playing" ? "Pause" : phase === "complete" ? "Play again" : "Play";
  const PlayIcon = phase === "playing" ? Pause : phase === "complete" ? RotateCcw : Play;

  return (
    <section
      ref={rootRef}
      aria-label="Automation Studio demo"
      className={cn(styles.root, "mx-auto w-full max-w-6xl space-y-5 p-4 sm:p-6")}
    >
      

      <div className="grid gap-4 md:grid-cols-2 md:gap-6">
        <ChoiceGroup label="Customer asks about" items={INQUIRIES} value={inquiry.id} onSelect={run.selectInquiry} />
        <ChoiceGroup label="Routing rule" items={RULES} value={rule.id} onSelect={run.selectRule} />
      </div>

      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-start xl:grid-cols-[minmax(0,1fr)_24rem]">
        <div className="lg:col-start-2 lg:row-start-1">
          <StepNarration {...panelProps} announce={mode === "manual"} onStepSelect={run.goToStep} />
        </div>

        <div className={cn(styles.card, "overflow-hidden lg:col-start-1 lg:row-span-2 lg:row-start-1")}>
          <div className={cn(styles.divider, "flex flex-wrap items-center justify-between gap-2 px-4 py-3 sm:px-5")}>
            <p className="flex items-center gap-2 text-sm font-medium" role="status">
              <span className={styles.statusDot} data-tone={phase} aria-hidden="true" />
              {statusLabel}
            </p>
            <div className="flex flex-wrap items-center gap-2">
              {mode === "manual" && (
                <button type="button" className={styles.btn} onClick={run.playAll}>
                  <Repeat className="h-4 w-4" aria-hidden="true" />
                  Play all {scenarioCount} scenarios
                </button>
              )}
              {phase !== "complete" && (
                <button type="button" className={styles.btn} onClick={run.replay}>
                  <RotateCcw className="h-4 w-4" aria-hidden="true" />
                  Restart
                </button>
              )}
              <button type="button" className={cn(styles.btn, styles.btnPrimary)} onClick={run.togglePlay}>
                <PlayIcon className="h-4 w-4" aria-hidden="true" />
                {playLabel}
              </button>
            </div>
          </div>
          <div className={cn(styles.dots, "px-3 py-6 sm:px-6 sm:py-8")}>
            <FlowStage {...panelProps} />
          </div>
        </div>

        <div className="lg:col-start-2 lg:row-start-2">
          <RunSummary
            {...panelProps}
            onViewConversation={
              onViewConversation ? () => onViewConversation({ inquiryId: inquiry.id, team }) : undefined
            }
          />
        </div>
      </div>
    </section>
  );
}

export default AutomationStudio;
