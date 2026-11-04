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
      label: "Explore Demo",
      href: "/demo",
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
      "Search by name or filter by category to find the tools that fit a support conversation.",
    searchLabel: "Search integrations",
    searchPlaceholder: "Search by tool, category, or use case",
    clearSearchLabel: "Clear search",
    categoryGroupLabel: "Integration category",
    allLabel: "All",
  },
  empty: {
    title: "No integrations match your filters.",
    description:
      "Try another tool name or clear your filters to browse all 12 integrations.",
    actionLabel: "Clear all filters",
  },
  cta: {
    title: "Follow a customer question through HelpNova.",
    description:
      "Open the guided demo to explore a sample conversation, run a routing rule, and see the receiving team’s workload.",
    primaryCta: { label: "Explore Demo", href: "/demo" },
  },
} as const;
