import { routes } from "@/config/routes";
import { topicLabels } from "@/data/demo/seed";
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
    "Simplify customer support with smart workflows that organize incoming requests, route conversations to the right teams, and keep every inquiry moving forward.",
  primaryCta: { label: "Explore Demo", href: routes.demo.href },
  secondaryCta: {
    label: "Explore Automation",
    href: "#inquiry-path",
  },
  sampleMessage: "Where’s my order?",
  conditionLabel: "Order Tracking?",
  matchedTeam: "Orders",
  otherwiseTeam: "General Support",
} as const;

export const automationFeatureAnatomy = {
  title: "What makes up a routing rule?",
  sentence:
    "Every customer inquiry follows a clear path. HelpNova checks its topic and routes it to the right team, keeping support organized and efficient.",
  parts: [
    {
      id: "trigger",
      label: "Trigger",
      title: "A new inquiry arrives.",
      body: "A new customer request enters the shared inbox, ready to be organized and directed to the right team.",
    },
    {
      id: "condition",
      label: "Condition",
      title: "Is the topic Order Tracking?",
      body: "HelpNova checks the inquiry's assigned topic to determine which support team should handle it.",
    },
    {
      id: "action",
      label: "Action",
      title: "Assign the inquiry to a team.",
      body: "Order-related inquiries go to the Orders team, while other requests are directed to General Support for review.",
    },
  ],
} as const;

export const automationFeatureWalkthrough = {
  id: "inquiry-path",
  title: "Which path will the inquiry take?",
  instruction:
    "Explore how different customer inquiries follow the right path to the right support team.",
  ruleLabel: "Order Routing",
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
    label: "General Support",
    role: "Receives inquiries that fall outside the Order rule.",
  },
];

export const automationFeatureRoutingExamples = {
  title: "How would other inquiries be assigned?",
  observation:
    "HelpNova routes each inquiry based on the selected rule. Matching requests reach their dedicated teams, while unmatched inquiries are directed to General Support.",
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
      result: "No Match",
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
  sampleLabel: "Team workload overview",
  insightsNote:
    "See how conversation assignments and resolution statuses shape team workloads and support insights.",
} as const;

export const automationFeatureCta = {
  title: "Explore Smarter Ways to Handle Every Inquiry.",
  description:
    "Discover how HelpNova connects intelligent routing, team assignments, and support insights to create a smoother customer support experience.",
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
  _destination: DemoTeam,
) {
  if (matched) {
    return "Order tracking inquiries are directed to the Orders team, ensuring clear ownership and an organized support process.";
  }
  return `${inquiry.topicLabel} inquiries are directed to General Support for review, ensuring clear ownership and an organized support process.`;
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
          ? "This inquiry matches the Order Tracking category and follows the path to the Orders team."
          : "This inquiry does not match the Order Tracking category and follows the path to General Support.",
      };
    case "matched":
      return {
        title: node.label,
        value: passesMatched ? "Active on this example" : "Not taken",
        explanation: passesMatched
          ? "This inquiry matches Order Routing, so it follows the Matched branch to Orders."
          : "This inquiry does not match Order Routing, so the Matched branch stays inactive.",
      };
    case "otherwise":
      return {
        title: node.label,
        value: passesOtherwise ? "Active on this example" : "Not taken",
        explanation: passesOtherwise
          ? "This inquiry falls outside Order Routing, so it follows the Otherwise branch to General Support."
          : "This inquiry matches Order Routing, so the Otherwise branch stays inactive.",
      };
    case "orders":
      return {
        title: node.label,
        value:
          destination === "Orders" ? "Receives this inquiry" : "Not Selected",
        explanation:
          destination === "Orders"
            ? "Orders receives this inquiry because its topic matches Order Routing."
            : "Orders receives inquiries that match this rule. The current inquiry goes to General Support.",
      };
    case "triage":
      return {
        title: node.label,
        value:
          destination === "General Triage"
            ? "Receives this inquiry"
            : "Not Selected",
        explanation:
          destination === "General Triage"
            ? "This team receives the inquiry because its topic falls outside Order Routing."
            : "General Support is the fallback destination. This example matches Order Routing and goes to Orders instead.",
      };
    default:
      return {
        title: node.label,
        value: inquiry.topicLabel,
        explanation: node.role,
      };
  }
}

export function displayAutomationTeam(destination: DemoTeam) {
  return destination === "General Triage" ? "General Support" : destination;
}

export function getWorkloadContribution(destination: DemoTeam) {
  const team = displayAutomationTeam(destination);
  return `${team} currently has 1 open conversation awaiting resolution.`;
}
