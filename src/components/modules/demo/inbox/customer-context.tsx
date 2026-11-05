"use client";

import { useId, useState } from "react";
import { Info, Mail, Tag, Users } from "lucide-react";
import { topicLabels } from "@/data/demo/seed";
import { ActivityLog } from "@/components/modules/demo/inbox/activity-log";
import type { DemoActivity, DemoConversation, DemoTeam } from "@/types/demo";
import { initials } from "@/utils/demo-format";
import { cn } from "@/utils/cn";

const teams: Array<DemoTeam | null> = [
  null,
  "Orders",
  "Billing",
  "Technical",
  "General Triage",
];

type CustomerContextProps = {
  conversation: DemoConversation;
  activity: DemoActivity[];
  onAssign: (team: DemoTeam | null) => void;
  onResolve: () => void;
  onReopen: () => void;
};

export function CustomerContext({
  conversation,
  activity,
  onAssign,
  onResolve,
  onReopen,
}: CustomerContextProps) {
  const tipId = useId();
  const [tipOpen, setTipOpen] = useState(false);

  return (
    <div className="flex h-full min-h-0 flex-col overflow-y-auto overscroll-contain">
      <div className="shrink-0 border-b border-[var(--demo-border)] p-4">
        <div className="flex items-center gap-3">
          <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-accent/15 text-[13px] font-semibold text-accent">
            {initials(conversation.customerName)}
          </span>
          <div className="min-w-0">
            <p className="truncate text-[14px] font-medium leading-5">
              {conversation.customerName}
            </p>
            <p className="truncate text-[12px] leading-4 text-[var(--demo-muted)]">
              {conversation.customerEmail}
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-5 p-4">
        <Section
          title="Details"
          action={
            <span className="relative inline-flex">
              <button
                type="button"
                aria-describedby={tipOpen ? tipId : undefined}
                aria-label="About tags and priority"
                onClick={() => setTipOpen((open) => !open)}
                onBlur={() => setTipOpen(false)}
                className="inline-flex size-6 items-center justify-center rounded-md text-[var(--demo-muted)] transition hover:bg-[var(--demo-hover)] hover:text-[var(--demo-text)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                <Info className="size-3.5" />
              </button>
              {tipOpen ? (
                <span
                  id={tipId}
                  role="tooltip"
                  className="absolute top-full right-0 z-20 mt-1 w-44 rounded-lg border border-[var(--demo-border)] bg-[var(--demo-panel)] px-2.5 py-2 text-[11px] leading-4 text-[var(--demo-muted)] shadow-lg"
                >
                  Tags and priority are display-only.
                </span>
              ) : null}
            </span>
          }
        >
          <dl className="grid grid-cols-[88px_minmax(0,1fr)] gap-x-3 gap-y-2.5 text-[13px]">
            <InfoRow
              icon={<Mail className="size-3.5" />}
              label="Channel"
              value={conversation.channel}
            />
            <InfoRow
              icon={<Tag className="size-3.5" />}
              label="Topic"
              value={topicLabels[conversation.topic]}
            />
            <dt className="inline-flex items-center gap-2 text-[12px] text-[var(--demo-muted)]">
              <Users className="size-3.5" aria-hidden />
              Priority
            </dt>
            <dd>
              <PriorityBadge priority={conversation.priority} />
            </dd>
          </dl>
          <div className="flex flex-wrap gap-1.5 pt-1">
            {conversation.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-md border border-[var(--demo-border)] bg-[var(--demo-panel-2)] px-2 py-0.5 text-[11px] text-[var(--demo-muted)]"
              >
                {tag}
              </span>
            ))}
          </div>
        </Section>

        <Section title="Assignment">
          <label className="block">
            <span className="mb-1.5 block text-[12px] font-medium text-[var(--demo-muted)]">
              Team
            </span>
            <select
              value={conversation.team ?? ""}
              onChange={(e) =>
                onAssign(
                  e.target.value === "" ? null : (e.target.value as DemoTeam),
                )
              }
              className="h-10 w-full rounded-xl border border-[var(--demo-border)] bg-[var(--demo-panel)] px-3 text-[14px] outline-none focus:border-accent/40 focus:ring-2 focus:ring-accent/20"
            >
              {teams.map((team) => (
                <option key={team ?? "unassigned"} value={team ?? ""}>
                  {team ?? "Unassigned"}
                </option>
              ))}
            </select>
          </label>
        </Section>

        <Section title="Status">
          <div className="flex gap-2">
            {conversation.status === "open" ? (
              <button
                type="button"
                onClick={onResolve}
                className="h-9 flex-1 rounded-lg bg-sky-500/15 text-[12px] font-semibold text-sky-700 transition hover:bg-sky-500/25 dark:text-sky-300"
              >
                Mark as resolved
              </button>
            ) : (
              <button
                type="button"
                onClick={onReopen}
                className="h-9 flex-1 rounded-lg bg-emerald-500/15 text-[12px] font-semibold text-emerald-700 transition hover:bg-emerald-500/25 dark:text-emerald-300"
              >
                Reopen conversation
              </button>
            )}
          </div>
        </Section>

        <Section title="Activity">
          <ActivityLog items={activity} compact />
        </Section>
      </div>
    </div>
  );
}

function Section({
  title,
  action,
  children,
}: {
  title: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section>
      <div className="mb-2.5 flex items-center justify-between gap-2">
        <h3 className="text-[11px] font-semibold tracking-[0.14em] text-[var(--demo-muted)] uppercase">
          {title}
        </h3>
        {action}
      </div>
      <div className="space-y-2">{children}</div>
    </section>
  );
}

function InfoRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <>
      <dt className="inline-flex items-center gap-2 text-[12px] text-[var(--demo-muted)]">
        <span aria-hidden>{icon}</span>
        {label}
      </dt>
      <dd className="truncate text-right font-medium text-[var(--demo-text)]">
        {value}
      </dd>
    </>
  );
}

function PriorityBadge({
  priority,
}: {
  priority: DemoConversation["priority"];
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md px-2 py-0.5 text-[11px] font-semibold",
        priority === "High" &&
          "bg-rose-500/15 text-rose-700 dark:text-rose-300",
        priority === "Medium" &&
          "bg-amber-500/15 text-amber-800 dark:text-amber-200",
        priority === "Low" &&
          "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300",
      )}
    >
      {priority}
    </span>
  );
}
