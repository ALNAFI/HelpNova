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

/** All twelve approved illustrative integrations. */
export const allIntegrations: Integration[] = [
  {
    id: "shopify",
    name: "Shopify",
    category: "Commerce & payments",
    description:
      "An order reference gives a delivery question context.",
  },
  {
    id: "woocommerce",
    name: "WooCommerce",
    category: "Commerce & payments",
    description:
      "Purchase details help identify the item a shopper means.",
  },
  {
    id: "stripe",
    name: "Stripe",
    category: "Commerce & payments",
    description:
      "An invoice reference helps frame a billing question.",
  },
  {
    id: "gmail",
    name: "Gmail",
    category: "Communication",
    description:
      "A customer email provides the original question and subject.",
  },
  {
    id: "slack",
    name: "Slack",
    category: "Communication",
    description:
      "A team discussion can clarify who owns a follow-up.",
  },
  {
    id: "microsoft-teams",
    name: "Microsoft Teams",
    category: "Communication",
    description:
      "A channel conversation can give a handoff useful background.",
  },
  {
    id: "hubspot",
    name: "HubSpot",
    category: "CRM & support",
    description:
      "A customer record gives an agent account context.",
  },
  {
    id: "salesforce",
    name: "Salesforce",
    category: "CRM & support",
    description:
      "An account record helps distinguish customers with similar requests.",
  },
  {
    id: "zendesk",
    name: "Zendesk",
    category: "CRM & support",
    description:
      "A ticket reference preserves the history of a reported issue.",
  },
  {
    id: "notion",
    name: "Notion",
    category: "Knowledge & files",
    description:
      "A shipping guide gives the team a policy to consult.",
  },
  {
    id: "google-drive",
    name: "Google Drive",
    category: "Knowledge & files",
    description:
      "A shared document can hold instructions relevant to a reply.",
  },
  {
    id: "zapier",
    name: "Zapier",
    category: "Automation",
    description:
      "A trigger-and-action example illustrates a possible handoff.",
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
