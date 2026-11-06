import { routes } from "@/config/routes";

export const integrationsPageCopy = {
  hero: {
    eyebrow: "Integrations",
    title: "Where does your support context come from?",
    description:
      "An order in Shopify, a question in Gmail, a guide in Notion. Explore the tools that can give a support team the details behind a customer’s question.",
    primaryCta: {
      label: "Browse integrations",
      href: "#browse-integrations",
    },
    secondaryCta: {
      label: "Explore Features",
      href: routes.features.href,
    },
    sampleMessage: "Can you check the status of my order?",
    tiles: [
      { id: "shopify", name: "Shopify", caption: "Order reference" },
      { id: "gmail", name: "Gmail", caption: "Customer question" },
      { id: "notion", name: "Notion", caption: "Shipping guide" },
    ],
  },
  directory: {
    id: "browse-integrations",
    title: "Browse integrations",
    description:
      "Find the tools your team uses. Search by name or explore integrations by category.",
    searchLabel: "Search integrations",
    searchPlaceholder: "Search by tool, category, or use case",
    clearSearchLabel: "Clear search",
    categoryGroupLabel: "Integration category",
    allLabel: "All",
  },
  empty: {
    title: "No integrations found. Try another search or category.",
    actionLabel: "Clear all filters",
  },
  cta: {
    title: "Follow a customer question through HelpNova.",
    description:
      "See how HelpNova brings customer questions, smart routing, and team workflows together in one seamless experience.",
    primaryCta: {
      label: "Explore Demo",
      href: routes.demo.href,
    },
    messageLabel: "Customer message",
    message: "Can you check the status of my order?",
    messageSupport:
      "See how a customer question moves from the first message to the right team.",
  },
} as const;
