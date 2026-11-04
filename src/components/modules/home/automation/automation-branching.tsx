"use client";

import { useMemo, useState } from "react";
import { automationHomeBranching } from "@/data/marketing/home-automation";
import { cn } from "@/utils/cn";

export function AutomationBranching() {
  const [nodeId, setNodeId] = useState("condition");
  const [topicId, setTopicId] = useState<string>(
    automationHomeBranching.topics[0].id,
  );
  const topic =
    automationHomeBranching.topics.find((item) => item.id === topicId) ??
    automationHomeBranching.topics[0];
  const matched = topic.branch === "matched";
  const node = useMemo(
    () =>
      automationHomeBranching.nodes.find((item) => item.id === nodeId) ??
      automationHomeBranching.nodes[1],
    [nodeId],
  );

  const explanation = (() => {
    if (nodeId === "condition") {
      return matched
        ? `The Order rule checks for Order Tracking. This sample topic is ${topic.label}, so the condition is true.`
        : `The Order rule checks for Order Tracking. This sample topic is ${topic.label}, so the condition is false.`;
    }
    if (nodeId === "matched") {
      return matched
        ? "This sample follows the Matched branch toward Orders."
        : "Matched stays inactive for this sample topic.";
    }
    if (nodeId === "otherwise") {
      return matched
        ? "Otherwise stays inactive because the topic matches."
        : "This sample follows Otherwise toward General Triage.";
    }
    if (nodeId === "orders") {
      return matched
        ? "Orders receives this matched inquiry."
        : "Orders is not the destination for this sample.";
    }
    if (nodeId === "triage") {
      return matched
        ? "General Triage is the fallback destination—not used here."
        : "General Triage receives this unmatched inquiry.";
    }
    return `Sample topic: ${topic.label}. Destination: ${topic.team}.`;
  })();

  return (
    <section id={automationHomeBranching.id} className="au-section py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="au-eyebrow">Every Decision Has a Path</p>
            <h2 className="mt-3 font-heading text-[2rem] font-semibold tracking-tight text-balance sm:text-[2.6rem]">
              {automationHomeBranching.title}
            </h2>
            <p className="mt-3 text-sm text-muted">
              {automationHomeBranching.instruction}
            </p>
          </div>
          <div
            role="radiogroup"
            aria-label="Sample topic"
            className="flex flex-wrap gap-2"
          >
            {automationHomeBranching.topics.map((item) => (
              <button
                key={item.id}
                type="button"
                role="radio"
                aria-checked={topicId === item.id}
                onClick={() => setTopicId(item.id)}
                className={cn(
                  "rounded-full border px-3 py-1.5 text-xs font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  topicId === item.id
                    ? "border-accent/40 bg-accent text-accent-foreground"
                    : "border-border bg-surface text-muted",
                )}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,0.75fr)]">
          <div className="au-panel rounded-[1.5rem] p-4 sm:p-6">
            <div className="mx-auto flex max-w-xl flex-col items-center gap-3">
              <NodeChip
                id="inquiry"
                label="New Inquiry"
                active={nodeId === "inquiry"}
                onRoute
                onSelect={setNodeId}
              />
              <Connector />
              <NodeChip
                id="condition"
                label="Topic Condition"
                active={nodeId === "condition"}
                onRoute
                onSelect={setNodeId}
              />
              <div className="grid w-full grid-cols-2 gap-3">
                <div className="flex flex-col items-center gap-2">
                  <p
                    className={cn(
                      "text-[10px] font-semibold tracking-[0.14em] uppercase",
                      matched ? "text-accent" : "text-muted",
                    )}
                  >
                    Matched
                  </p>
                  <NodeChip
                    id="matched"
                    label="Matched"
                    active={nodeId === "matched"}
                    onRoute={matched}
                    onSelect={setNodeId}
                  />
                  <Connector accent={matched} />
                  <NodeChip
                    id="orders"
                    label="Orders"
                    active={nodeId === "orders"}
                    onRoute={matched}
                    onSelect={setNodeId}
                  />
                </div>
                <div className="flex flex-col items-center gap-2">
                  <p
                    className={cn(
                      "text-[10px] font-semibold tracking-[0.14em] uppercase",
                      !matched ? "text-accent" : "text-muted",
                    )}
                  >
                    Otherwise
                  </p>
                  <NodeChip
                    id="otherwise"
                    label="Otherwise"
                    active={nodeId === "otherwise"}
                    onRoute={!matched}
                    onSelect={setNodeId}
                  />
                  <Connector accent={!matched} />
                  <NodeChip
                    id="triage"
                    label="General Triage"
                    active={nodeId === "triage"}
                    onRoute={!matched}
                    onSelect={setNodeId}
                  />
                </div>
              </div>
            </div>
            <p className="mt-6 text-center text-sm text-muted">
              {matched ? "Matched" : "Otherwise"} → {topic.team}
            </p>
          </div>

          <aside className="au-panel rounded-[1.5rem] p-5">
            <p className="text-[11px] font-semibold tracking-[0.14em] text-muted uppercase">
              Node Inspector
            </p>
            <h3 className="mt-2 font-heading text-xl font-semibold">
              {node.label}
            </h3>
            <p className="mt-2 text-sm text-accent">{node.role}</p>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              {explanation}
            </p>
            <p className="mt-5 text-xs text-muted">
              Read-only illustration · no execution or drag-and-drop.
            </p>
          </aside>
        </div>
      </div>
    </section>
  );
}

function Connector({ accent }: { accent?: boolean }) {
  return (
    <div
      className={cn(
        "h-6 w-px",
        accent === false ? "bg-border" : "bg-accent/70",
      )}
      aria-hidden
    />
  );
}

function NodeChip({
  id,
  label,
  active,
  onRoute,
  onSelect,
}: {
  id: string;
  label: string;
  active: boolean;
  onRoute?: boolean;
  onSelect: (id: string) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onSelect(id)}
      className={cn(
        "w-full max-w-[11rem] rounded-2xl border px-3 py-2.5 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        onRoute
          ? "border-accent/40 bg-accent/10 text-foreground"
          : "border-border bg-surface-muted text-muted",
        active && "ring-2 ring-ring",
      )}
    >
      {label}
    </button>
  );
}
