import type {
  Integration,
  IntegrationCategory,
  IntegrationPreview,
} from "@/types/marketing";

/** Stable category order for filters and display. */
export const integrationCategories: IntegrationCategory[] = [
  "Commerce & payments",
  "Communication",
  "CRM & support",
  "Knowledge & files",
  "Automation",
];

/** All twelve integrations shown in the directory. */
export const allIntegrations: Integration[] = [
  {
    id: "shopify",
    name: "Shopify",
    category: "Commerce & payments",
    description:
      "Access order details to understand customer delivery questions.",
  },
  {
    id: "woocommerce",
    name: "WooCommerce",
    category: "Commerce & payments",
    description: "Find purchase details and customer order information.",
  },
  {
    id: "stripe",
    name: "Stripe",
    category: "Commerce & payments",
    description: "View payment details to help resolve billing questions.",
  },
  {
    id: "gmail",
    name: "Gmail",
    category: "Communication",
    description: "Keep customer emails and support conversations together.",
  },
  {
    id: "slack",
    name: "Slack",
    category: "Communication",
    description: "Collaborate with your team on customer follow-ups.",
  },
  {
    id: "microsoft-teams",
    name: "Microsoft Teams",
    category: "Communication",
    description: "Coordinate customer requests and team handoffs.",
  },
  {
    id: "hubspot",
    name: "HubSpot",
    category: "CRM & support",
    description: "Bring customer records into support conversations.",
  },
  {
    id: "salesforce",
    name: "Salesforce",
    category: "CRM & support",
    description: "Understand customer history and account details.",
  },
  {
    id: "zendesk",
    name: "Zendesk",
    category: "CRM & support",
    description:
      "Keep ticket history and previous support requests accessible.",
  },
  {
    id: "notion",
    name: "Notion",
    category: "Knowledge & files",
    description: "Find guides and documentation when answering questions.",
  },
  {
    id: "google-drive",
    name: "Google Drive",
    category: "Knowledge & files",
    description: "Access shared documents and helpful support resources.",
  },
  {
    id: "zapier",
    name: "Zapier",
    category: "Automation",
    description: "Connect workflows and automate repetitive support tasks.",
  },
];

const homeIntegrationIds = [
  "shopify",
  "stripe",
  "gmail",
  "slack",
  "hubspot",
  "zapier",
] as const;

/** Short category labels retained for the homepage six-card preview. */
const homeCategoryLabels: Record<(typeof homeIntegrationIds)[number], string> =
  {
    shopify: "Commerce",
    stripe: "Payments",
    gmail: "Email",
    slack: "Collaboration",
    hubspot: "CRM",
    zapier: "Automation",
  };

/** Six of the twelve approved illustrative integrations for the homepage preview. */
export const homeIntegrations: IntegrationPreview[] = homeIntegrationIds.map(
  (id) => {
    const item = allIntegrations.find((entry) => entry.id === id)!;
    return {
      id: item.id,
      name: item.name,
      category: homeCategoryLabels[id],
      description: item.description,
    };
  },
);

export const integrationsDisclaimer =
  "These examples show how familiar tools could fit into a support workflow. Connections are illustrative.";

export const integrationsLegacyDisclaimer =
  "Names describe illustrative examples—not connected services. No OAuth or live integrations run on this site.";

export function filterIntegrations(
  integrations: Integration[],
  query: string,
  category: IntegrationCategory | "all",
): Integration[] {
  const normalized = query.trim().toLowerCase();

  return integrations.filter((item) => {
    if (category !== "all" && item.category !== category) return false;
    if (!normalized) return true;

    const haystack = [item.name, item.category, item.description]
      .join(" ")
      .toLowerCase();
    return haystack.includes(normalized);
  });
}

export function formatIntegrationCount(count: number) {
  return count === 1 ? "1 integration" : `${count} integrations`;
}
