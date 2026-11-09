import { Check, Inbox } from "lucide-react";
import {
  LAST_STEP,
  STEP_LABELS,
  describeStep,
  type Inquiry,
  type Rule,
} from "./automation-data";
import { cn } from "@/utils/cn";
import styles from "./automation-studio.module.css";

interface PanelProps {
  step: number;
  inquiry: Inquiry;
  rule: Rule;
  matched: boolean;
  team: string;
}

export function StepNarration({
  step,
  inquiry,
  rule,
  matched,
  team,
  announce,
  onStepSelect,
}: PanelProps & { announce: boolean; onStepSelect: (step: number) => void }) {
  const ctx = { inquiry, rule, matched, team };

  return (
    <div className={cn(styles.card, "p-4 sm:p-5")}>
      <ol className="flex items-center" aria-label="Automation steps">
        {STEP_LABELS.map((label, i) => {
          const state = i < step ? "done" : i === step ? "active" : "idle";
          return (
            <li key={label} className={cn("flex items-center", i < LAST_STEP && "flex-1")}>
              <button
                type="button"
                className={styles.stepDot}
                data-state={state}
                aria-label={`Go to step ${i + 1}: ${label}`}
                aria-current={i === step ? "step" : undefined}
                onClick={() => onStepSelect(i)}
              >
                {state === "done" ? <Check className="h-3.5 w-3.5" aria-hidden="true" /> : i + 1}
              </button>
              {i < LAST_STEP && <span className={styles.stepRail} data-filled={step > i} aria-hidden="true" />}
            </li>
          );
        })}
      </ol>

      {/* All five texts share one grid cell, so the card is always as tall as the longest one. */}
      <div className={cn(styles.narrStack, "mt-4")} aria-live={announce ? "polite" : "off"}>
        {STEP_LABELS.map((label, i) => {
          const copy = describeStep(i, ctx);
          return (
            <div key={`${inquiry.id}-${rule.id}-${i}`} data-on={i === step} aria-hidden={i !== step}>
              <p className={cn(styles.muted, "text-xs")}>
                Step {i + 1} of {STEP_LABELS.length}: {label}
              </p>
              <h3 className="mt-1 text-lg font-semibold leading-6">{copy.title}</h3>
              <p className="mt-2 max-w-prose text-sm leading-6">{copy.body}</p>
              <p
                className={cn(styles.muted, "mt-3 border-l-2 pl-3 text-[13px] leading-5")}
                style={{ borderColor: "var(--an-line)" }}
              >
                {copy.detail}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function SummaryItem({ label, value }: { label: string; value: string | null }) {
  return (
    <div className="rounded-xl border px-3 py-2" style={{ borderColor: "var(--an-border)" }}>
      <p className={cn(styles.muted, "text-xs")}>{label}</p>
      {value ? (
        <p key={value} className={cn(styles.summaryValue, "mt-0.5 truncate text-sm font-semibold")}>
          {value}
        </p>
      ) : (
        <p className={cn(styles.muted, "mt-0.5 text-sm")} aria-label="Not decided yet">
          –
        </p>
      )}
    </div>
  );
}

export function RunSummary({
  step,
  inquiry,
  rule,
  matched,
  team,
  onViewConversation,
}: PanelProps & { onViewConversation?: () => void }) {
  const done = step === LAST_STEP;

  return (
    <div className={cn(styles.card, "p-4 sm:p-5")}>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className={cn(styles.muted, "text-xs")}>Result</p>
          <h3 className="mt-0.5 text-base font-semibold leading-6">
            {done ? `Assigned to ${team}` : "Routing in progress"}
          </h3>
          <p className={cn(styles.muted, "mt-0.5 min-h-[3.75rem] text-[13px] leading-5")}>
            {done
              ? matched
                ? `${inquiry.title} matched the ${rule.title}.`
                : `${inquiry.title} didn’t match the ${rule.title}, so it went to the fallback.`
              : "Each box fills in as the conversation moves through the rule."}
          </p>
        </div>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-2">
        <SummaryItem label="Inquiry" value={inquiry.title} />
        <SummaryItem label="Rule" value={step >= 2 ? rule.title : null} />
        <SummaryItem label="Outcome" value={step >= 3 ? (matched ? "Matched" : "No match") : null} />
        <SummaryItem label="Team" value={step >= 4 ? team : null} />
      </div>

      {onViewConversation && (
        <button
          type="button"
          className={cn(styles.btn, "mt-3 w-full justify-center")}
          onClick={onViewConversation}
          disabled={!done}
          style={!done ? { opacity: 0.5, cursor: "not-allowed" } : undefined}
        >
          <Inbox className="h-4 w-4" aria-hidden="true" />
          View conversation
        </button>
      )}
    </div>
  );
}
