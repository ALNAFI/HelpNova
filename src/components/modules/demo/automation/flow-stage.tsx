import type { CSSProperties, ReactNode } from "react";
import { Check, Filter, GitBranch, Inbox, Tag, Users, type LucideIcon } from "lucide-react";
import { FALLBACK_TEAM, TOPIC_LABELS, type Inquiry, type Rule } from "./automation-data";
import { cn } from "@/utils/cn";
import styles from "./automation-studio.module.css";

type NodeState = "idle" | "active" | "done" | "skipped";
type Tone = "accent" | "ok" | "warn";

function stateAt(step: number, at: number): "idle" | "active" | "done" {
  return step < at ? "idle" : step === at ? "active" : "done";
}

function Node({
  state,
  tone = "accent",
  icon: Icon,
  title,
  stacked = false,
  children,
}: {
  state: NodeState;
  tone?: Tone;
  icon: LucideIcon;
  title: string;
  stacked?: boolean;
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        styles.node,
        "flex gap-3 overflow-hidden p-3 sm:p-4",
        stacked ? "h-full w-full flex-row items-start" : "items-start",
      )}
      data-state={state}
      data-tone={tone}
    >
      <span className={cn(styles.nodeIcon, "grid h-9 w-9 shrink-0 place-items-center rounded-lg")}>
        <Icon className="h-4 w-4" aria-hidden="true" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold leading-5">{title}</p>
        <div className={cn(styles.muted, "mt-0.5 text-[13px] leading-5")}>{children}</div>
      </div>
    </div>
  );
}

function Connector({ step, arriveAt }: { step: number; arriveAt: number }) {
  const state = step < arriveAt ? "idle" : step === arriveAt ? "travel" : "done";
  return (
    <div className="relative mx-auto h-7 w-0.5" aria-hidden="true">
      <span className={styles.track} />
      <span className={styles.fill} data-state={state} />
      {state === "travel" && <span key={`${arriveAt}-${step}`} className={styles.packet} />}
    </div>
  );
}

function Seg({ lit, tone, style }: { lit: boolean; tone: Tone; style: CSSProperties }) {
  return <span className={styles.seg} data-lit={lit} data-tone={tone} style={style} />;
}

/** Splits one path into the two branches (or merges them back into one). */
function Fork({
  direction,
  step,
  arriveAt,
  matched,
}: {
  direction: "split" | "merge";
  step: number;
  arriveAt: number;
  matched: boolean;
}) {
  const lit = step >= arriveAt;
  const tone: Tone = matched ? "ok" : "warn";
  const stemTone: Tone = direction === "split" ? "accent" : tone;
  const split = direction === "split";

  const vertical = (left: string, top: string, height: string): CSSProperties => ({
    left,
    top,
    height,
    width: 2,
    marginLeft: -1,
  });
  const horizontal = (left: string): CSSProperties => ({
    left,
    top: "50%",
    width: "25%",
    height: 2,
    marginTop: -1,
  });

  const stem = split ? vertical("50%", "0%", "50%") : vertical("50%", "50%", "50%");
  const drop = (left: string) => (split ? vertical(left, "50%", "50%") : vertical(left, "0%", "50%"));

  return (
    <div className="relative h-10 w-full" aria-hidden="true">
      <Seg lit={lit} tone={stemTone} style={stem} />
      <Seg lit={lit && matched} tone={tone} style={horizontal("25%")} />
      <Seg lit={lit && !matched} tone={tone} style={horizontal("50%")} />
      <Seg lit={lit && matched} tone={tone} style={drop("25%")} />
      <Seg lit={lit && !matched} tone={tone} style={drop("75%")} />
    </div>
  );
}

export interface FlowStageProps {
  step: number;
  inquiry: Inquiry;
  rule: Rule;
  matched: boolean;
  team: string;
}

export function FlowStage({ step, inquiry, rule, matched, team }: FlowStageProps) {
  const topicLabel = TOPIC_LABELS[inquiry.topic];
  const ruleTopicLabel = TOPIC_LABELS[rule.topic];

  const matchState: NodeState = step < 3 ? "idle" : !matched ? "skipped" : step === 3 ? "active" : "done";
  const fallbackState: NodeState = step < 3 ? "idle" : matched ? "skipped" : step === 3 ? "active" : "done";
  const destTone: Tone = matched ? "ok" : "warn";

  return (
    <div className="mx-auto w-full max-w-md" role="img" aria-label={`Routing flow for ${inquiry.title} using ${rule.title}`}>
      <Node state={stateAt(step, 0)} icon={Inbox} title="New inquiry">
        <span>A customer conversation arrives</span>
        <br />
        <span key={inquiry.id} className={styles.bubble}>
          “{inquiry.message}”
        </span>
      </Node>

      <Connector step={step} arriveAt={1} />

      <Node state={stateAt(step, 1)} icon={Tag} title="Detect topic">
        <span>Read the message and tag its topic</span>
        <br />
        {/* Always rendered (hidden until reached) so the card never changes height. */}
        <span
          key={inquiry.id}
          className={cn(styles.tag, step >= 1 ? styles.pop : styles.reserve, "mt-1.5")}
          aria-hidden={step < 1}
        >
          {topicLabel}
        </span>
      </Node>

      <Connector step={step} arriveAt={2} />

      <Node state={stateAt(step, 2)} icon={Filter} title="Check the rule">
        <span>Does the topic match {rule.title}?</span>
        <br />
        <span
          key={`${inquiry.id}-${rule.id}`}
          className={cn(step >= 2 ? styles.pop : styles.reserve, "mt-1.5 inline-flex flex-wrap items-center gap-1.5")}
          aria-hidden={step < 2}
        >
          <span className={styles.tag}>{topicLabel}</span>
          <span aria-hidden="true" className="font-semibold">
            {matched ? "=" : "≠"}
          </span>
          <span className={styles.tag}>{ruleTopicLabel}</span>
          <span className="sr-only">{matched ? "match" : "no match"}</span>
        </span>
      </Node>

      <Fork direction="split" step={step} arriveAt={3} matched={matched} />

      <div className="grid grid-cols-2 items-stretch">
        <div className="flex px-1.5">
          <Node state={matchState} tone="ok" icon={GitBranch} title="Matched" stacked>
            <span className="block truncate">Route to {rule.team}</span>
          </Node>
        </div>
        <div className="flex px-1.5">
          <Node state={fallbackState} tone="warn" icon={GitBranch} title="No match" stacked>
            <span className="block truncate" title={`Fallback to ${FALLBACK_TEAM}`}>
              To {FALLBACK_TEAM}
            </span>
          </Node>
        </div>
      </div>

      <Fork direction="merge" step={step} arriveAt={4} matched={matched} />

      <Node state={stateAt(step, 4)} tone={destTone} icon={Users} title="Destination team">
        <div className="flex min-h-6 items-center">
          {step >= 4 ? (
            <span key={team} className={cn(styles.tag, styles.pop)} data-tone={destTone}>
              <Check className="h-3 w-3" aria-hidden="true" />
              Assigned to {team}
            </span>
          ) : (
            <span>Waiting for a route</span>
          )}
        </div>
      </Node>
    </div>
  );
}
