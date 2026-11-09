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
