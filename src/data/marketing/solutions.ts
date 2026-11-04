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
  insightLabel: string;
  workloadSummary: string;
  galleryQuote: string;
  context: string;
  selectionLabel: string;
};

export const solutionsHero = {
  eyebrow: "Solutions",
  title: "Different businesses. Familiar support questions.",
  description:
    "A delayed order, a workspace issue, or a question about an invoice. Choose an example and follow it from the first message to the team responsible.",
  primaryCta: {
    label: "Choose your industry",
    href: "#choose-your-industry",
  },
  secondaryCta: {
    label: "Explore Demo",
    href: routes.demo.href,
  },
  slips: [
    {
      industry: "Ecommerce",
      question: "Has my order shipped?",
    },
    {
      industry: "SaaS",
      question: "Why can’t I open my workspace?",
    },
    {
      industry: "Services",
      question: "Can you check this invoice?",
    },
  ],
} as const;

export const solutionsIndustrySection = {
  id: "choose-your-industry",
  title: "Choose your industry.",
  description:
    "Pick the kind of business you support. The journey below will show a customer question, its owner, and how it appears in the team’s workload.",
} as const;

export const solutionsJourneySection = {
  id: "follow-the-inquiry",
  title: "Follow the inquiry.",
  description:
    "A sample journey from the first message to the team that owns it—and where that open conversation appears in workload.",
  sampleLabel: "Sample journey",
} as const;

export const solutionsGallerySection = {
  title: "Start with a customer question.",
  description:
    "Recognize a specific issue? Trace it into the journey above.",
} as const;

export const solutionsCta = {
  title: "Take the next conversation.",
  description:
    "Open the guided demo to assign a conversation, run a routing rule, and see how the team’s workload changes.",
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
      "The customer is asking about delivery, so the Orders team owns this inquiry.",
    insightLabel: "Sample workload",
    workloadSummary: "Orders · 1 open inquiry in this example.",
    galleryQuote:
      "My tracking hasn’t changed since Monday. Could you check my order?",
    context:
      "A shopper is waiting for a delivery update and has an order reference.",
    selectionLabel: "Show ecommerce journey",
  },
  {
    id: "saas",
    industry: "SaaS",
    topic: "technical-support",
    topicLabel: "Technical Support",
    customerName: "Priya Nair",
    subject: "Workspace won’t open after sign-in",
    message:
      "I can sign in, but my workspace won’t open. Can you help?",
    reference: "WS-Nova-Studio",
    team: "Technical",
    assignmentExplanation:
      "The customer can authenticate but cannot open the product workspace, so Technical owns this inquiry.",
    insightLabel: "Sample workload",
    workloadSummary: "Technical · 1 open inquiry in this example.",
    galleryQuote:
      "I can sign in, but my workspace won’t open. Can you help?",
    context:
      "A customer needs help opening a workspace they normally use.",
    selectionLabel: "Show SaaS journey",
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
      "The client is questioning an invoice tied to a booked service, so Billing owns this inquiry.",
    insightLabel: "Sample workload",
    workloadSummary: "Billing · 1 open inquiry in this example.",
    galleryQuote:
      "The amount on my invoice looks different from my booking. Could you check it?",
    context:
      "A client has a question about an invoice for a booked service.",
    selectionLabel: "Show services journey",
  },
];

export function getSolutionsScenario(
  id: SolutionsIndustryId,
): SolutionsScenario {
  return (
    solutionsScenarios.find((item) => item.id === id) ?? solutionsScenarios[0]
  );
}
