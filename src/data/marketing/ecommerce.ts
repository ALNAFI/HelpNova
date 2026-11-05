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
  eyebrow: "Ecommerce Support",
  title: "Where’s my order?",
  description:
    "Follow a delivery question from the customer’s first message to the team that can help.",
  primaryCta: { label: "Explore Demo", href: routes.demo.href },
  secondaryCta: {
    label: "Follow an order inquiry",
    href: "#where-should-this-inquiry-go",
  },
  orderReference: "ORD-48291",
  trackingCode: "HN-48291-CA",
} as const;

export const ecommerceInquirySection = {
  eyebrow: "CUSTOMER CONVERSATION",
  title: "Every order question starts here.",
  description:
    "See the customer’s message alongside the order details your team needs to take the next step.",
  statusBadge: "Open",
  detailsTitle: "Order details",
  explanation:
    "This delivery question belongs with the Orders team. The order and tracking references provide the context they need.",
} as const;

export const ecommerceWalkthroughCopy = {
  eyebrow: "SMART ROUTING",
  title: "Where should this inquiry go?",
  description:
    "Switch between inquiries to see which team takes ownership—and why.",
  activeRuleLabel: "Active rule: Order Tracking",
  conditionQuestion: "Is the topic Order Tracking?",
  liveRegionPrefix: "Routing result",
  conversationTitle: "Conversation details",
  internalNoteLabel: "Internal note",
  internalNoteHelper: "Visible only to your team.",
  matchedResult:
    "The topic matches Order Tracking. This inquiry is assigned to Orders.",
  otherwiseResult:
    "This inquiry doesn’t match Order Tracking. It goes to General Triage for review.",
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
      "The topic matches Order Tracking. This inquiry is assigned to Orders.",
  },
  {
    id: "billing-issue",
    topic: "billing-issue",
    label: "Billing Issue",
    customerName: "Sam Rivera",
    customerEmail: "sam.r@example.com",
    subject: "Charged twice for my order",
    message:
      "I can see two charges for the same order. Could you check this?",
    orderReference: null,
    topicLabel: "Billing Issue",
    internalNote:
      "Review the order’s payment history and confirm whether the second charge is a duplicate or a pending authorization.",
    outcome:
      "This inquiry doesn’t match Order Tracking. It goes to General Triage for review.",
  },
];

export const ecommerceIntegrations = [
  {
    id: "shopify",
    name: "Shopify",
    caption:
      "Storefront details add context to delivery and purchase questions.",
  },
  {
    id: "woocommerce",
    name: "WooCommerce",
    caption:
      "Purchase references help teams identify the right order and understand the context behind each customer request.",
  },
  {
    id: "gmail",
    name: "Gmail",
    caption:
      "Customer emails keep delivery questions and follow-ups together.",
  },
] as const;

export const ecommerceIntegrationsSection = {
  eyebrow: "ECOMMERCE ECOSYSTEM",
  title: "Better context for every order question.",
  description:
    "Order details, purchase references, and customer emails help teams understand the question before taking the next step.",
  previewLabel: "Preview",
  note: "Integration previews. Live connections are not enabled.",
  viewAllHref: routes.integrations.href,
  viewAllLabel: "View all integrations",
} as const;

export const ecommerceCta = {
  eyebrow: "Next step",
  title: "Try the Order Tracking scenario.",
  description:
    "Open a conversation, try a routing rule, and see how team assignments shape the workload.",
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
