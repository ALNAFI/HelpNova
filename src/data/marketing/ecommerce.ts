import type { DemoTeam, DemoTopic } from "@/types/demo";
import { routes } from "@/config/routes";

export type EcommerceInquiryId = "order-tracking" | "billing-issue";

export type EcommerceInquiryFixture = {
  id: EcommerceInquiryId;
  topic: DemoTopic;
  label: string;
  customerName: string;
  customerEmail: string;
  subject: string;
  message: string;
  orderReference: string | null;
  topicLabel: string;
  internalNote: string;
  outcome: string;
};

export const ecommerceHero = {
  eyebrow: "Ecommerce solution",
  title: "Where’s my order?",
  description:
    "Follow a delivery question from the customer’s first message to the team that can help.",
  primaryCta: { label: "Explore Demo", href: routes.demo.href },
  secondaryCta: {
    label: "Follow the inquiry",
    href: "#where-should-this-inquiry-go",
  },
  orderReference: "ORD-48291",
  trackingCode: "HN-48291-CA",
} as const;

export const ecommerceInquirySection = {
  eyebrow: "Sample conversation",
  title: "A delivery question lands in the inbox.",
  description:
    "One recognizable customer question sets the scene for the Order rule walkthrough below.",
} as const;

export const ecommerceWalkthroughCopy = {
  eyebrow: "Order rule walkthrough",
  title: "Where should this inquiry go?",
  instruction: "Change the inquiry to see how the Order rule handles it.",
  ruleLabel: "Order rule",
  conditionQuestion: "Is the topic Order Tracking?",
  liveRegionPrefix: "Routing result",
} as const;

export const ecommerceInquiries: EcommerceInquiryFixture[] = [
  {
    id: "order-tracking",
    topic: "order-tracking",
    label: "Order Tracking",
    customerName: "Maya Chen",
    customerEmail: "maya.chen@example.com",
    subject: "Where is order #48291?",
    message:
      "Hi, my tracking hasn’t changed since Monday. Could you check what’s happening with my order?",
    orderReference: "ORD-48291",
    topicLabel: "Order Tracking",
    internalNote:
      "Check the carrier’s latest scan before giving the customer a delivery estimate.",
    outcome:
      "The topic matches the Order rule, so the Orders team receives this inquiry.",
  },
  {
    id: "billing-issue",
    topic: "billing-issue",
    label: "Billing Issue",
    customerName: "Sam Rivera",
    customerEmail: "sam.r@example.com",
    subject: "Unexpected renewal charge",
    message:
      "I was charged today for a renewal, but I thought I cancelled last month. Can you help?",
    orderReference: null,
    topicLabel: "Billing Issue",
    internalNote:
      "Review the charge described by the customer and identify who should investigate it.",
    outcome:
      "This is a billing question. The Order rule sends it to General Triage for review.",
  },
];

export const ecommerceIntegrations = [
  {
    id: "shopify",
    name: "Shopify",
    caption:
      "Storefront order details can give a delivery question context.",
  },
  {
    id: "woocommerce",
    name: "WooCommerce",
    caption:
      "Purchase references can help a team identify the order a customer means.",
  },
  {
    id: "gmail",
    name: "Gmail",
    caption: "A delivery question can start as an email from the customer.",
  },
] as const;

export const ecommerceIntegrationsSection = {
  eyebrow: "Illustrative integrations",
  title: "Where the order context comes from",
  description:
    "These names describe examples of where ecommerce support context can begin—not live connections.",
  viewAllHref: routes.integrations.href,
  viewAllLabel: "View all integrations",
} as const;

export const ecommerceCta = {
  eyebrow: "Next step",
  title: "Try the Order Tracking scenario.",
  description:
    "Open the guided demo to explore the conversation, run a routing rule, and see how the assignment changes team workload.",
  primaryCta: { label: "Explore Demo", href: routes.demo.href },
} as const;

export function getEcommerceInquiry(
  id: EcommerceInquiryId,
): EcommerceInquiryFixture {
  return (
    ecommerceInquiries.find((item) => item.id === id) ?? ecommerceInquiries[0]
  );
}

export function getOrderRuleDestination(topic: DemoTopic): {
  matched: boolean;
  destination: DemoTeam;
} {
  const matched = topic === "order-tracking";
  return {
    matched,
    destination: matched ? "Orders" : "General Triage",
  };
}
