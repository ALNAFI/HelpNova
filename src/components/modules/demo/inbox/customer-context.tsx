"use client";

import { Mail, Tag, Users } from "lucide-react";
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
  return (
    <div className="flex h-full min-h-0 flex-col overflow-y-auto">
      <div className="border-b border-[var(--demo-border)] p-4">
        <div className="flex items-center gap-3">
          <span className="flex size-11 items-center justify-center rounded-full bg-accent/15 text-sm font-semibold text-accent">
            {initials(conversation.customerName)}
          </span>
          <div className="min-w-0">
            <p className="truncate font-medium">{conversation.customerName}</p>
            <p className="truncate text-xs text-[var(--demo-muted)]">
              {conversation.customerEmail}
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4 p-4">
        <Section title="Details">
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
          <InfoRow
            icon={<Users className="size-3.5" />}
            label="Priority"
            value={conversation.priority}
          />
          <div className="flex flex-wrap gap-1.5 pt-1">
            {conversation.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-md border border-[var(--demo-border)] bg-[var(--demo-panel-2)] px-2 py-0.5 text-[10px] text-[var(--demo-muted)]"
              >
                {tag}
              </span>
            ))}
          </div>
          <p className="pt-1 text-[10px] text-[var(--demo-muted)]">
            Tags and priority are display-only in this demo.
          </p>
        </Section>

        <Section title="Assignment">
          <label className="block">
            <span className="mb-1.5 block text-[11px] font-medium text-[var(--demo-muted)]">
              Team
            </span>
            <select
              value={conversation.team ?? ""}
              onChange={(e) =>
                onAssign(e.target.value === "" ? null : (e.target.value as DemoTeam))
              }
              className="h-10 w-full rounded-xl border border-[var(--demo-border)] bg-[var(--demo-panel)] px-3 text-sm outline-none focus:border-accent/40 focus:ring-2 focus:ring-accent/20"
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
                className="h-9 flex-1 rounded-lg bg-sky-500/15 text-xs font-semibold text-sky-700 transition hover:bg-sky-500/25 dark:text-sky-300"
              >
                Resolve
              </button>
            ) : (
              <button
                type="button"
                onClick={onReopen}
                className="h-9 flex-1 rounded-lg bg-emerald-500/15 text-xs font-semibold text-emerald-700 transition hover:bg-emerald-500/25 dark:text-emerald-300"
              >
                Reopen
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
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h3 className="mb-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--demo-muted)]">
        {title}
      </h3>
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
    <div className="flex items-center justify-between gap-3 text-sm">
      <span className="inline-flex items-center gap-2 text-[var(--demo-muted)]">
        <span className={cn("text-[var(--demo-muted)]")}>{icon}</span>
        {label}
      </span>
      <span className="font-medium text-[var(--demo-text)]">{value}</span>
    </div>
  );
}
