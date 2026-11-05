import { topicLabels } from "@/data/demo/seed";
import type {
  DemoActivity,
  DemoConversation,
  DemoState,
  DemoTeam,
  InboxFilter,
} from "@/types/demo";

export function getSelectedConversation(
  state: DemoState,
): DemoConversation | null {
  if (!state.selectedConversationId) return null;
  return (
    state.conversations.find((c) => c.id === state.selectedConversationId) ??
    null
  );
}

export function filterConversations(
  conversations: DemoConversation[],
  search: string,
  filter: InboxFilter,
): DemoConversation[] {
  const q = search.trim().toLowerCase();

  return conversations.filter((c) => {
    if (filter === "open" && c.status !== "open") return false;
    if (filter === "resolved" && c.status !== "resolved") return false;

    if (!q) return true;

    const haystack = [
      c.customerName,
      c.subject,
      topicLabels[c.topic],
      c.team ?? "Unassigned",
      ...c.tags,
      ...c.messages.map((m) => m.body),
    ]
      .join(" ")
      .toLowerCase();

    return haystack.includes(q);
  });
}

export type LiveKpis = {
  total: number;
  open: number;
  resolved: number;
  assigned: number;
  resolutionRate: number;
};

export function selectLiveKpis(conversations: DemoConversation[]): LiveKpis {
  const total = conversations.length;
  const open = conversations.filter((c) => c.status === "open").length;
  const resolved = conversations.filter((c) => c.status === "resolved").length;
  const assigned = conversations.filter((c) => c.team !== null).length;
  const resolutionRate = total === 0 ? 0 : Math.round((resolved / total) * 100);

  return { total, open, resolved, assigned, resolutionRate };
}

export type TeamWorkload = {
  team: DemoTeam | "Unassigned";
  count: number;
};

const workloadOrder: Array<DemoTeam | "Unassigned"> = [
  "Orders",
  "Billing",
  "Technical",
  "General Triage",
  "Unassigned",
];

export function selectOpenWorkload(
  conversations: DemoConversation[],
): TeamWorkload[] {
  const counts = new Map<DemoTeam | "Unassigned", number>();
  for (const key of workloadOrder) counts.set(key, 0);

  for (const c of conversations) {
    if (c.status !== "open") continue;
    const key = c.team ?? "Unassigned";
    counts.set(key, (counts.get(key) ?? 0) + 1);
  }

  return workloadOrder.map((team) => ({
    team,
    count: counts.get(team) ?? 0,
  }));
}

export function selectStatusDistribution(conversations: DemoConversation[]) {
  const open = conversations.filter((c) => c.status === "open").length;
  const resolved = conversations.filter((c) => c.status === "resolved").length;
  return { open, resolved };
}

export function selectRecentActivity(
  activity: DemoActivity[],
  limit = 12,
): DemoActivity[] {
  return [...activity]
    .sort((a, b) => {
      const byTime =
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      if (byTime !== 0) return byTime;
      return b.id.localeCompare(a.id);
    })
    .slice(0, limit);
}

export function selectConversationActivity(
  activity: DemoActivity[],
  conversationId: string,
): DemoActivity[] {
  return activity
    .filter((a) => a.conversationId === conversationId)
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
}
