"use client";

import { ActivityLog } from "@/components/modules/demo/inbox/activity-log";
import type { DemoActivity } from "@/types/demo";

export function RecentActivity({ items }: { items: DemoActivity[] }) {
  return (
    <section className="rounded-2xl border border-[var(--demo-border)] bg-[var(--demo-panel)]/85 p-4">
      <h3 className="font-heading text-sm font-semibold">Recent activity</h3>
      <p className="mt-1 text-xs text-[var(--demo-muted)]">
        Updates as you assign, reply, resolve, or run automation.
      </p>
      <div className="mt-4 max-h-[320px] overflow-y-auto pr-1">
        <ActivityLog items={items} />
      </div>
    </section>
  );
}
