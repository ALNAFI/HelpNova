import type { IntegrationPreview } from "@/types/marketing";

/** Six of the twelve approved illustrative integrations for the homepage preview. */
export const homeIntegrations: IntegrationPreview[] = [
  { id: "shopify", name: "Shopify", category: "Commerce" },
  { id: "stripe", name: "Stripe", category: "Payments" },
  { id: "gmail", name: "Gmail", category: "Email" },
  { id: "slack", name: "Slack", category: "Collaboration" },
  { id: "hubspot", name: "HubSpot", category: "CRM" },
  { id: "zapier", name: "Zapier", category: "Automation" },
];

export const integrationsDisclaimer =
  "Names describe illustrative examples—not connected services. No OAuth or live integrations run on this site.";
