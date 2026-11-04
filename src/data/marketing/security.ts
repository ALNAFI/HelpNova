export const securityPageCopy = {
  eyebrow: "Security & Trust",
  title: "Security, explained for a concept product.",
  description:
    "HelpNova is a premium interface concept. This page describes the practical boundaries that keep exploration clear, local, and honest.",
  sampleLabel: "Sample Security Overview",
  sampleNotice:
    "This is an editable security overview for the HelpNova concept website. It is not a certification report or an operational security policy.",
  pillarsEyebrow: "Principles",
  pillarsTitle: "Built around clarity first.",
  pillarsDescription:
    "These principles describe how the current concept behaves—not production guarantees for a live customer-support platform.",
  practicesEyebrow: "Practices",
  practicesTitle: "How exploration stays contained.",
  practicesDescription:
    "The Guided Demo, forms, and preferences are designed as local interface simulations with clear product boundaries.",
  boundariesEyebrow: "Boundaries",
  boundariesTitle: "What this page does not claim.",
  boundariesDescription:
    "HelpNova does not invent audited controls, compliance badges, or enterprise security assurances for an operational service.",
  calloutTitle: "Explore with intention.",
  calloutDescription:
    "Treat demonstration forms as exploratory interfaces. Avoid entering sensitive personal, financial, or confidential information.",
  relatedTitle: "Explore related information.",
  ctaTitle: "See the product concept in motion.",
  ctaDescription:
    "Open the Guided Demo to explore illustrative conversations, workflow simulations, and connected insights.",
  demoLabel: "Explore Demo",
  homeLabel: "Back to Home",
} as const;

export const securityPillars = [
  {
    id: "local",
    title: "Local demonstrations",
    description:
      "Inbox, Automation, and Insights share illustrative state in the browser rather than a connected ticketing system.",
    icon: "shield" as const,
  },
  {
    id: "transparent",
    title: "Transparent simulations",
    description:
      "Login, Sign Up, Contact, and pricing experiences demonstrate interface behavior without creating live accounts or charges.",
    icon: "eye" as const,
  },
  {
    id: "contained",
    title: "Contained preferences",
    description:
      "Theme preference may persist in browser storage. Demo conversations and form inputs are not designed as lasting tickets.",
    icon: "lock" as const,
  },
  {
    id: "honest",
    title: "Honest boundaries",
    description:
      "Marketing copy, fictional case studies, and sample workflows stay clearly labeled as concept material.",
    icon: "badge" as const,
  },
] as const;

export const securityPractices = [
  {
    id: "demo-state",
    title: "Demo state resets",
    description:
      "Refreshing the Guided Demo returns you to seeded sample conversations. Reset Demo clears local drafts and simulation selections while preserving theme choice.",
    icon: "refresh" as const,
  },
  {
    id: "no-live-auth",
    title: "No live authentication",
    description:
      "Password fields validate for demonstration only. They do not establish sessions, send verification email, or open protected dashboards.",
    icon: "key" as const,
  },
  {
    id: "no-payment",
    title: "No payment processing",
    description:
      "Pricing plans are illustrative. There is no checkout, subscription billing, or payment processor connected to this concept.",
    icon: "card" as const,
  },
  {
    id: "illustrative-integrations",
    title: "Illustrative integrations",
    description:
      "Integration cards describe examples. They are not live OAuth connections or operational partnerships.",
    icon: "plug" as const,
  },
  {
    id: "sample-analytics",
    title: "Sample insights only",
    description:
      "Insights charts in marketing previews and the Guided Demo illustrate product UI. They are not visitor analytics or advertising pixels.",
    icon: "chart" as const,
  },
  {
    id: "external-links",
    title: "External destinations",
    description:
      "Links outside HelpNova follow their own practices. Review third-party policies when those destinations matter to you.",
    icon: "link" as const,
  },
] as const;

export const securityBoundaries = [
  "No SOC 2, ISO, or GDPR certification claims for an operational service.",
  "No end-to-end encryption guarantees for live customer data, because this concept does not operate a customer database.",
  "No invented security audit reports, penetration-test summaries, or uptime SLAs.",
  "No fabricated data-center, DPO, or enterprise compliance program details.",
] as const;

export const securityRelatedLinks = [
  {
    id: "privacy",
    title: "Privacy Policy",
    description:
      "Sample notice covering local demos, theme preferences, and demonstration forms.",
    href: "/privacy",
    icon: "form" as const,
  },
  {
    id: "terms",
    title: "Terms of Service",
    description:
      "Sample terms describing exploration guidelines and concept limitations.",
    href: "/terms",
    icon: "scroll" as const,
  },
  {
    id: "contact",
    title: "Contact",
    description: "Open the demonstration contact experience.",
    href: "/contact",
    icon: "mail" as const,
  },
] as const;
