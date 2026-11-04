import {
  ruleLabels,
  topicLabels,
  topicToConversationId,
} from "@/data/demo/seed";
import type { DemoRule, DemoTeam, DemoTopic, SimulationResult } from "@/types/demo";

const topicRuleMap: Record<DemoTopic, DemoRule> = {
  "order-tracking": "order",
  "billing-issue": "billing",
  "technical-support": "technical",
};

const ruleTeamMap: Record<DemoRule, DemoTeam> = {
  order: "Orders",
  billing: "Billing",
  technical: "Technical",
};

export function evaluateAutomation(
  inquiry: DemoTopic,
  rule: DemoRule,
  ranAt = new Date().toISOString(),
): SimulationResult {
  const matched = topicRuleMap[inquiry] === rule;
  const destination: DemoTeam = matched ? ruleTeamMap[rule] : "General Triage";

  const explanation = matched
    ? `The ${topicLabels[inquiry]} inquiry matches the ${ruleLabels[rule]}, so the example routes to ${destination}.`
    : `The inquiry topic does not match the selected rule, so the example follows the fallback route to General Triage.`;

  return {
    inquiry,
    rule,
    matched,
    destination,
    conversationId: topicToConversationId[inquiry],
    explanation,
    ranAt,
  };
}

export const workflowNodes = [
  {
    id: "inquiry",
    label: "New Inquiry",
    type: "trigger",
    purpose: "A fictional customer inquiry enters the shared inbox.",
  },
  {
    id: "condition",
    label: "Topic Condition",
    type: "condition",
    purpose: "Compare the inquiry topic against the selected routing rule.",
  },
  {
    id: "matched",
    label: "Matched",
    type: "branch",
    purpose: "When the topic matches the rule, route to the specialist team.",
  },
  {
    id: "otherwise",
    label: "Otherwise",
    type: "branch",
    purpose: "When the topic does not match, route to General Triage.",
  },
  {
    id: "destination",
    label: "Destination Team",
    type: "action",
    purpose: "Apply the local assignment outcome for the selected inquiry.",
  },
] as const;

export type WorkflowNodeId = (typeof workflowNodes)[number]["id"];
