export type TopicId = "orders" | "billing" | "technical";

export interface Inquiry {
  id: TopicId;
  title: string;
  shortTitle: string;
  hint: string;
  message: string;
  topic: TopicId;
}

export interface Rule {
  id: TopicId;
  title: string;
  shortTitle: string;
  hint: string;
  topic: TopicId;
  team: string;
}

export const TOPIC_LABELS: Record<TopicId, string> = {
  orders: "Order tracking",
  billing: "Billing",
  technical: "Technical",
};

export const FALLBACK_TEAM = "General Triage";

export const INQUIRIES: Inquiry[] = [
  {
    id: "orders",
    title: "Order tracking",
    shortTitle: "Orders",
    hint: "Delivery and shipment updates",
    message: "Where is my order #4821? It was due on Friday.",
    topic: "orders",
  },
  {
    id: "billing",
    title: "Billing issue",
    shortTitle: "Billing",
    hint: "Charge or invoice question",
    message: "I was charged twice for this month’s plan.",
    topic: "billing",
  },
  {
    id: "technical",
    title: "Technical support",
    shortTitle: "Technical",
    hint: "Product or access problem",
    message: "I can’t sign in after resetting my password.",
    topic: "technical",
  },
];

export const RULES: Rule[] = [
  {
    id: "orders",
    title: "Order rule",
    shortTitle: "Order",
    hint: "Routes to Orders when matched",
    topic: "orders",
    team: "Orders",
  },
  {
    id: "billing",
    title: "Billing rule",
    shortTitle: "Billing",
    hint: "Routes to Billing when matched",
    topic: "billing",
    team: "Billing",
  },
  {
    id: "technical",
    title: "Technical rule",
    shortTitle: "Technical",
    hint: "Routes to Technical when matched",
    topic: "technical",
    team: "Technical",
  },
];

/** Steps of one run: 0 arrives, 1 topic, 2 rule check, 3 branch, 4 assign. */
export const STEP_LABELS = ["Arrives", "Topic", "Rule", "Branch", "Assign"] as const;
export const LAST_STEP = STEP_LABELS.length - 1;

/**
 * "Play" sequence: every inquiry against every rule, one by one.
 * First the three matches, then the six mismatches (which take the fallback path).
 */
export const AUTO_SCENARIOS: ReadonlyArray<{ inquiry: TopicId; rule: TopicId }> = [
  { inquiry: "orders", rule: "orders" },
  { inquiry: "billing", rule: "billing" },
  { inquiry: "technical", rule: "technical" },
  { inquiry: "orders", rule: "billing" },
  { inquiry: "orders", rule: "technical" },
  { inquiry: "billing", rule: "orders" },
  { inquiry: "billing", rule: "technical" },
  { inquiry: "technical", rule: "orders" },
  { inquiry: "technical", rule: "billing" },
];

export const STEP_MS = 2600;
export const RESULT_HOLD_MS = 3600;

export function getInquiry(id: TopicId): Inquiry {
  return INQUIRIES.find((i) => i.id === id) ?? INQUIRIES[0];
}

export function getRule(id: TopicId): Rule {
  return RULES.find((r) => r.id === id) ?? RULES[0];
}

export function resolveOutcome(inquiry: Inquiry, rule: Rule) {
  const matched = inquiry.topic === rule.topic;
  return { matched, team: matched ? rule.team : FALLBACK_TEAM };
}

export interface StepContext {
  inquiry: Inquiry;
  rule: Rule;
  matched: boolean;
  team: string;
}

export function describeStep(step: number, { inquiry, rule, matched, team }: StepContext) {
  const topic = TOPIC_LABELS[inquiry.topic].toLowerCase();
  const ruleTopic = TOPIC_LABELS[rule.topic].toLowerCase();

  switch (step) {
    case 0:
      return {
        title: "A customer writes in",
        body: `A new conversation reaches the inbox: “${inquiry.message}”`,
        detail: "Automation starts the moment a message arrives. Nobody has to open it first.",
      };
    case 1:
      return {
        title: "HelpNova reads the topic",
        body: `The message is about ${topic}, so the conversation gets a “${TOPIC_LABELS[inquiry.topic]}” tag.`,
        detail: "Tags turn free-form messages into something a rule can act on.",
      };
    case 2:
      return {
        title: "The rule checks the topic",
        body: `${rule.title} looks for ${ruleTopic} conversations. This one is tagged ${topic}, so they ${
          matched ? "line up." : "don’t line up."
        }`,
        detail: "A rule is a simple question with a yes or no answer.",
      };
    case 3:
      return matched
        ? {
            title: "It’s a match",
            body: `The answer is yes, so the conversation takes the path to the ${rule.team} team.`,
            detail: "Matched conversations skip the general queue and go straight to a specialist.",
          }
        : {
            title: "No match",
            body: `The answer is no. Instead of getting stuck, the conversation takes the fallback path to ${FALLBACK_TEAM}.`,
            detail: "Every rule needs a fallback so no conversation is left unassigned.",
          };
    default:
      return {
        title: `Assigned to ${team}`,
        body: matched
          ? `${team} now owns the conversation and can reply with the full message history in view.`
          : `${team} now owns the conversation and can pass it to the right team after a quick look.`,
        detail: "The whole run took a moment and no one had to sort it by hand.",
      };
  }
}
