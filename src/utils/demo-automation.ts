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
    ? `${topicLabels[inquiry]} matched the ${ruleLabels[rule]}.`
    : `No match was found for ${topicLabels[inquiry]} against the ${ruleLabels[rule]}, so the conversation was assigned to General Triage.`;

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
    purpose: "A customer conversation arrives in the workspace.",
  },
  {
    id: "condition",
    label: "Check inquiry topic",
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
    label: "No match",
    type: "branch",
    purpose: "When the topic does not match, route to General Triage.",
  },
  {
    id: "destination",
    label: "Destination Team",
    type: "action",
    purpose: "Assign the conversation to the selected team.",
  },
] as const;

export type WorkflowNodeId = (typeof workflowNodes)[number]["id"];
