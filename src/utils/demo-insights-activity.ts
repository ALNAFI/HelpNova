import { DEMO_AGENT } from "@/data/demo/seed";
import type { DemoActivity, DemoConversation } from "@/types/demo";

export function formatInsightsActivity(
  item: DemoActivity,
  conversations: DemoConversation[],
): string {
  const customer =
    conversations.find((c) => c.id === item.conversationId)?.customerName ??
    "a customer";

  switch (item.kind) {
    case "created":
      return `${customer}'s conversation opened.`;
    case "assigned": {
      const team = item.team ?? "Unassigned";
      return team === "Unassigned" || item.team === null
        ? `${customer}'s conversation marked as unassigned.`
        : `${customer}'s conversation assigned to ${team}.`;
    }
    case "reply":
      return `${DEMO_AGENT} replied to ${customer}'s conversation.`;
    case "note":
      return `${DEMO_AGENT} added an internal note on ${customer}'s conversation.`;
    case "resolved":
      return `${DEMO_AGENT} resolved ${customer}'s conversation.`;
    case "reopened":
      return `${DEMO_AGENT} reopened ${customer}'s conversation.`;
    case "automation": {
      const team = item.team ?? "General Triage";
      return `Automation routed ${customer}'s conversation to ${team}.`;
    }
    default:
      return item.summary;
  }
}
