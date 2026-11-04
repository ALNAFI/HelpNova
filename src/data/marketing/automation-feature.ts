import { routes } from "@/config/routes";
import { ruleLabels, topicLabels } from "@/data/demo/seed";
import type { DemoTeam, DemoTopic } from "@/types/demo";
import { evaluateAutomation } from "@/utils/demo-automation";

export type AutomationInquiryId = "order-tracking" | "billing-issue";

export type AutomationNodeId =
  | "inquiry"
  | "condition"
  | "matched"
  | "otherwise"
  | "orders"
  | "triage";

export type AutomationInquiryFixture = {
  id: AutomationInquiryId;
  topic: DemoTopic;
  label: string;
  customerName: string;
  subject: string;
  message: string;
  topicLabel: string;
};

export const automationFeatureHero = {
  eyebrow: "Workflow automation",
  title: "Give every inquiry a clear next step.",
  description:
    "Start with a customer question, check its topic, and assign it to a team. Follow both branches of a sample rule to see exactly how the decision works.",
  primaryCta: { label: "Explore Demo", href: routes.demo.href },
  secondaryCta: {
    label: "Explore the rule",
    href: "#which-path-will-the-inquiry-take",
  },
  sampleMessage: "Where’s my order?",
  conditionLabel: "Order Tracking?",
  matchedTeam: "Orders",
  otherwiseTeam: "General Triage",
} as const;

export const automationFeatureAnatomy = {
  title: "What makes up a routing rule?",
  sentence:
    "When a new inquiry arrives, check its topic. Send order-tracking questions to Orders and everything else to General Triage.",
  parts: [
    {
      id: "trigger",
      label: "Trigger",
      title: "A new inquiry arrives.",
      body: "The rule starts when a customer message enters the shared workspace. The customer’s words are the input—not a prediction.",
    },
    {
      id: "condition",
      label: "Condition",
      title: "Is the topic Order Tracking?",
      body: "The rule checks a predefined topic field on the inquiry. It does not invent a topic from the message text.",
    },
    {
      id: "action",
      label: "Action",
      title: "Assign the inquiry to a team.",
      body: "Matched → Orders. Otherwise → General Triage. Both destinations are valid next steps.",
    },
  ],
} as const;

export const automationFeatureWalkthrough = {
  id: "which-path-will-the-inquiry-take",
  title: "Which path will the inquiry take?",
  instruction:
    "Change the inquiry to compare outcomes. Select a node to inspect it.",
  ruleLabel: "Order rule",
  conditionQuestion: "Is the topic Order Tracking?",
  fixedRule: "order" as const,
} as const;

export const automationFeatureInquiries: AutomationInquiryFixture[] = [
  {
    id: "order-tracking",
    topic: "order-tracking",
    label: "Order Tracking",
    customerName: "Maya Chen",
    subject: "Where is order #48291?",
    message: "My tracking hasn’t updated. Could you check my order?",
    topicLabel: topicLabels["order-tracking"],
  },
  {
    id: "billing-issue",
    topic: "billing-issue",
    label: "Billing Issue",
    customerName: "Sam Rivera",
    subject: "Unexpected renewal charge",
    message: "I have a question about a charge on my invoice.",
    topicLabel: topicLabels["billing-issue"],
  },
];

export const automationFeatureNodes: {
  id: AutomationNodeId;
  label: string;
  role: string;
}[] = [
  {
    id: "inquiry",
    label: "New Inquiry",
    role: "The customer message that starts the rule.",
  },
  {
    id: "condition",
    label: "Topic Condition",
    role: "Compares the inquiry topic to the Order rule.",
  },
  {
    id: "matched",
    label: "Matched",
    role: "The branch taken when the topic equals Order Tracking.",
  },
  {
    id: "otherwise",
    label: "Otherwise",
    role: "The fallback branch when the topic does not match.",
  },
  {
    id: "orders",
    label: "Orders",
    role: "Receives inquiries that match the Order rule.",
  },
  {
    id: "triage",
    label: "General Triage",
    role: "Receives inquiries that fall outside the Order rule.",
  },
];

export const automationFeatureRoutingExamples = {
  title: "How would other inquiries be assigned?",
  observation:
    "The billing question reaches Billing when evaluated by the Billing rule. In the Order rule example above, it goes to General Triage.",
  rows: [
    {
      inquiry: "Order Tracking",
      rule: "Order rule",
      result: "Matched",
      team: "Orders" as DemoTeam,
    },
    {
      inquiry: "Billing Issue",
      rule: "Billing rule",
      result: "Matched",
      team: "Billing" as DemoTeam,
    },
    {
      inquiry: "Technical Support",
      rule: "Technical rule",
      result: "Matched",
      team: "Technical" as DemoTeam,
    },
    {
      inquiry: "Billing Issue",
      rule: "Order rule",
      result: "Otherwise",
      team: "General Triage" as DemoTeam,
    },
  ],
} as const;

export const automationFeatureConsequence = {
  title: "What happens after assignment?",
  inboxTitle: "Shared Inbox",
  inboxLinkLabel: "Explore Shared Inbox",
  inboxHref: routes.inbox.href,
  insightsTitle: "Insights",
  sampleLabel: "Sample contribution",
} as const;

export const automationFeatureCta = {
  title: "Try a different inquiry. Run a different rule.",
  description:
    "Open the guided demo to choose an inquiry and a rule, run the simulation, and inspect the assignment in Inbox and Insights.",
  primaryCta: { label: "Explore Demo", href: routes.demo.href },
} as const;

export function getAutomationInquiry(
  id: AutomationInquiryId,
): AutomationInquiryFixture {
  return (
    automationFeatureInquiries.find((item) => item.id === id) ??
    automationFeatureInquiries[0]
  );
}

export function getAutomationNode(id: AutomationNodeId) {
  return (
    automationFeatureNodes.find((node) => node.id === id) ??
    automationFeatureNodes[1]
  );
}

export function evaluateOrderRule(topic: DemoTopic) {
  // Stable timestamp keeps this marketing walkthrough prerender-safe.
  return evaluateAutomation(topic, "order", "2026-01-01T00:00:00.000Z");
}

export function getAutomationResultSummary(
  inquiry: AutomationInquiryFixture,
  matched: boolean,
  destination: DemoTeam,
) {
  const branch = matched ? "Matched" : "Otherwise";
  return `${branch} → ${destination}. The inquiry topic is ${inquiry.topicLabel}, so it takes the ${
    matched ? "matched" : "fallback"
  } branch of the ${ruleLabels.order}.`;
}

export function getNodeExplanation(
  nodeId: AutomationNodeId,
  inquiry: AutomationInquiryFixture,
  matched: boolean,
  destination: DemoTeam,
): { title: string; value: string; explanation: string } {
  const node = getAutomationNode(nodeId);
  const passesMatched = matched;
  const passesOtherwise = !matched;

  switch (nodeId) {
    case "inquiry":
      return {
        title: node.label,
        value: inquiry.message,
        explanation: `This sample starts with ${inquiry.customerName}’s message. Its predefined topic is ${inquiry.topicLabel}.`,
      };
    case "condition":
      return {
        title: node.label,
        value: `Topic: ${inquiry.topicLabel}`,
        explanation: passesMatched
          ? `The rule checks whether the topic equals Order Tracking. This inquiry’s topic is ${inquiry.topicLabel}, so the condition is true.`
          : `The rule checks whether the topic equals Order Tracking. This inquiry’s topic is ${inquiry.topicLabel}, so the condition is false.`,
      };
    case "matched":
      return {
        title: node.label,
        value: passesMatched ? "Active on this example" : "Not taken",
        explanation: passesMatched
          ? "This inquiry matches the Order rule, so it follows the Matched branch to Orders."
          : "This inquiry does not match the Order rule, so the Matched branch stays inactive.",
      };
    case "otherwise":
      return {
        title: node.label,
        value: passesOtherwise ? "Active on this example" : "Not taken",
        explanation: passesOtherwise
          ? "This inquiry falls outside the Order rule, so it follows the Otherwise branch to General Triage."
          : "This inquiry matches the Order rule, so the Otherwise branch stays inactive.",
      };
    case "orders":
      return {
        title: node.label,
        value: destination === "Orders" ? "Receives this inquiry" : "Not assigned",
        explanation:
          destination === "Orders"
            ? "Orders receives this inquiry because its topic matches the Order rule."
            : "Orders receives inquiries that match this rule. The current inquiry goes to General Triage.",
      };
    case "triage":
      return {
        title: node.label,
        value:
          destination === "General Triage"
            ? "Receives this inquiry"
            : "Not assigned",
        explanation:
          destination === "General Triage"
            ? "This team receives the inquiry because its topic falls outside the Order rule."
            : "General Triage is the fallback destination. This example matches the Order rule and goes to Orders instead.",
      };
    default:
      return {
        title: node.label,
        value: inquiry.topicLabel,
        explanation: node.role,
      };
  }
}

export function getWorkloadContribution(destination: DemoTeam) {
  return `This sample contributes 1 open inquiry to ${destination}.`;
}
