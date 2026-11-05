import { routes } from "@/config/routes";
import type { DemoTeam } from "@/types/demo";

export type SolutionsIndustryId = "ecommerce" | "saas" | "services";

export type SolutionsScenario = {
  id: SolutionsIndustryId;
  industry: string;
  topic: string;
  topicLabel: string;
  customerName: string;
  subject: string;
  message: string;
  reference: string | null;
  team: DemoTeam;
  assignmentExplanation: string;
  workloadLabel: string;
  workloadDescription: string;
  workloadSummary: string;
  galleryCategory: string;
  galleryQuote: string;
  context: string;
  selectionLabel: string;
};

export const solutionsHero = {
  eyebrow: "SOLUTIONS",
  title: "Different businesses. Better connected support.",
  description:
    "From order updates to account access and billing questions, bring every request to the right team with the context they need.",
  primaryCta: {
    label: "Find your solution",
    href: "#choose-your-industry",
  },
  secondaryCta: {
    label: "Explore Demo",
    href: routes.demo.href,
  },
  slips: [
    {
      industry: "Ecommerce",
      question: "Where is my order?",
    },
    {
      industry: "Software & SaaS",
      question: "Why can’t I access my workspace?",
    },
    {
      industry: "Services",
      question: "Can you help with my invoice?",
    },
  ],
} as const;

export const solutionsIndustrySection = {
  id: "choose-your-industry",
  title: "Find the right fit for your business.",
  description:
    "Choose your industry to see how a customer request moves from the first message to the right team.",
} as const;

export const solutionsJourneySection = {
  id: "follow-the-inquiry",
  title: "From first message to clear ownership.",
  description:
    "See how a customer question reaches the right team and becomes part of their open workload.",
  workloadStatus: "Open · Assigned",
  workloadScope: "From this journey",
} as const;

export const solutionsGallerySection = {
  title: "A familiar question. A clear next step.",
  description:
    "Choose a customer question to see who takes ownership and how the conversation moves forward.",
  actionLabel: "Follow this request",
} as const;

export const solutionsCta = {
  title: "Start your next conversation.",
  description:
    "Assign a conversation, try a routing rule, and see your team’s workload update all in one workspace.",
  previewHeader: "Shared inbox",
  previewStatus: "Open",
  primaryCta: { label: "Explore Demo", href: routes.demo.href },
  secondaryCta: {
    label: "Explore ecommerce solution",
    href: routes.ecommerce.href,
  },
} as const;

export const solutionsScenarios: SolutionsScenario[] = [
  {
    id: "ecommerce",
    industry: "Ecommerce",
    topic: "order-tracking",
    topicLabel: "Order Tracking",
    customerName: "Maya Chen",
    subject: "Where is order #48291?",
    message:
      "My tracking hasn’t changed since Monday. Could you check my order?",
    reference: "ORD-48291",
    team: "Orders",
    assignmentExplanation:
      "The Orders team takes ownership, with the customer’s message and order reference in view.",
    workloadLabel: "Open conversations",
    workloadDescription:
      "This conversation now appears in the Orders team’s open workload.",
    workloadSummary: "Orders · 1 open conversation",
    galleryCategory: "Order Tracking",
    galleryQuote:
      "My tracking hasn’t changed since Monday. Could you check my order?",
    context:
      "Keep order updates, delivery questions, and customer conversations connected.",
    selectionLabel: "View ecommerce journey",
  },
  {
    id: "saas",
    industry: "Software & SaaS",
    topic: "technical-support",
    topicLabel: "Technical Support",
    customerName: "Priya Nair",
    subject: "Workspace won’t open after sign-in",
    message:
      "I can sign in, but my workspace won’t open. Can you help?",
    reference: "WS-Nova-Studio",
    team: "Technical",
    assignmentExplanation:
      "The Technical team takes ownership, with the sign-in issue and workspace details in view.",
    workloadLabel: "Open conversations",
    workloadDescription:
      "This conversation now appears in the Technical team’s open workload.",
    workloadSummary: "Technical · 1 open conversation",
    galleryCategory: "Account Access",
    galleryQuote:
      "I can sign in, but my workspace won’t open. Can you help?",
    context:
      "Help customers resolve account access and workspace issues with the right context.",
    selectionLabel: "View SaaS journey",
  },
  {
    id: "services",
    industry: "Services",
    topic: "billing-issue",
    topicLabel: "Billing Issue",
    customerName: "Elena Brooks",
    subject: "Invoice amount doesn’t match booking",
    message:
      "The amount on my invoice looks different from my booking. Could you check it?",
    reference: "INV-2048",
    team: "Billing",
    assignmentExplanation:
      "The Billing team takes ownership, with the client’s question and invoice details in view.",
    workloadLabel: "Open conversations",
    workloadDescription:
      "This conversation now appears in the Billing team’s open workload.",
    workloadSummary: "Billing · 1 open conversation",
    galleryCategory: "Billing Questions",
    galleryQuote:
      "The amount on my invoice looks different from my booking. Could you check it?",
    context:
      "Keep booking details and billing questions together for clearer client support.",
    selectionLabel: "View services journey",
  },
];

export function getSolutionsScenario(
  id: SolutionsIndustryId,
): SolutionsScenario {
  return (
    solutionsScenarios.find((item) => item.id === id) ?? solutionsScenarios[0]
  );
}
