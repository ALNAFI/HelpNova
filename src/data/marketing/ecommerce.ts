import type { DemoTopic } from "@/types/demo";
import { routes } from "@/config/routes";

export type EcommerceInquiryId = "order-tracking";

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
    href: "#smart-routing",
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
