export const securityPageCopy = {
  eyebrow: "Security & Trust",
  title: "Your Security Matters.",
  description:
    "Learn how HelpNova approaches security, protects user trust, and promotes responsible use across its website and interactive experiences.",
  pillarsEyebrow: "Principles",
  pillarsTitle: "Built around clarity first.",
  pillarsDescription:
    "Our approach to security focuses on transparency, responsible data handling, and clear expectations across every HelpNova experience.",
  practicesEyebrow: "Practices",
  practicesTitle: "How We Approach Security.",
  practicesDescription:
    "Explore how HelpNova handles interactive data, account access, payment information, and third-party services with transparency and clear security practices.",
  boundariesEyebrow: "Security Transparency",
  boundariesTitle: "Transparency Builds Trust.",
  boundariesDescription:
    "We believe trust starts with transparency. Understand the security measures, service limitations, and responsibilities that shape your HelpNova experience.",
  calloutTitle: "Protect Your Information.",
  calloutDescription:
    "Avoid sharing sensitive personal details, financial information, passwords, or confidential business data through interactive forms.",
  relatedTitle: "Explore related information.",
  ctaTitle: "Experience HelpNova in Action.",
  ctaDescription:
    "Discover how customer conversations, workflow automation, and support insights come together in one connected experience.",
  demoLabel: "Explore Demo",
  homeLabel: "Back to Home",
} as const;

export const securityPillars = [
  {
    id: "local",
    title: "Privacy by Design",
    description:
      "Interactive features use temporary browser-based data, helping keep exploratory activity separate from live customer-support systems.",
    icon: "shield" as const,
  },
  {
    id: "transparent",
    title: "Transparent Experiences",
    description:
      "Explore HelpNova's features with clear information about available capabilities, account access, and service limitations.",
    icon: "eye" as const,
  },
  {
    id: "contained",
    title: "Your Data, Your Control",
    description:
      "Your display preferences may be saved in your browser, while interactive conversations and form entries are not designed for permanent storage.",
    icon: "lock" as const,
  },
  {
    id: "honest",
    title: "Clear Security Commitments",
    description:
      "We communicate the current scope of our features and security practices without making unverified claims or guarantees.",
    icon: "badge" as const,
  },
] as const;

export const securityPractices = [
  {
    id: "demo-state",
    title: "Temporary Interactive Data",
    description:
      "Your Guided Demo activity uses temporary browser-based data. Resetting or refreshing the experience restores its original state without retaining your changes.",
    icon: "refresh" as const,
  },
  {
    id: "no-live-auth",
    title: "Account Access & Authentication",
    description:
      "Login and signup interfaces currently demonstrate account experiences without creating real accounts, authentication sessions, or storing passwords.",
    icon: "key" as const,
  },
  {
    id: "no-payment",
    title: "Payment & Subscription Security",
    description:
      "HelpNova does not currently process payments or create subscriptions. Pricing information is provided for product exploration.",
    icon: "card" as const,
  },
  {
    id: "illustrative-integrations",
    title: "Third-Party Integrations",
    description:
      "Explore available integration information and connected workflow possibilities. Displayed integrations do not represent active third-party connections.",
    icon: "plug" as const,
  },
  {
    id: "sample-analytics",
    title: "Support Insights & Analytics",
    description:
      "HelpNova's interactive insights reflect demonstration activity, not personal browsing analytics or live customer data.",
    icon: "chart" as const,
  },
  {
    id: "external-links",
    title: "External Websites & Services",
    description:
      "External websites operate under their own privacy and security practices. Review their policies before sharing information.",
    icon: "link" as const,
  },
] as const;

export const securityBoundaries = [
  {
    id: "certifications",
    title: "Security Certifications & Compliance",
    description:
      "HelpNova does not currently hold independently verified security certifications. Any future compliance claims will require formal verification.",
  },
  {
    id: "encryption",
    title: "Data Protection & Encryption",
    description:
      "HelpNova's interactive experiences do not currently operate a live customer database. Enterprise encryption guarantees are not claimed.",
  },
  {
    id: "audits",
    title: "Security Audits & Reliability",
    description:
      "Independent security audits, penetration-testing certifications, and formal uptime guarantees are not currently provided.",
  },
  {
    id: "governance",
    title: "Infrastructure & Governance",
    description:
      "Infrastructure arrangements, data protection responsibilities, and compliance information will be communicated when verified and applicable.",
  },
] as const;

export const securityRelatedLinks = [
  {
    id: "privacy",
    title: "Privacy Policy",
    description:
      "Learn how HelpNova handles information, privacy preferences, and interactive experiences.",
    href: "/privacy",
    icon: "form" as const,
  },
  {
    id: "terms",
    title: "Terms of Service",
    description:
      "Understand the terms, conditions, and guidelines that apply when using HelpNova.",
    href: "/terms",
    icon: "scroll" as const,
  },
  {
    id: "contact",
    title: "Contact",
    description:
      "Explore contact options and find information about reaching HelpNova.",
    href: "/contact",
    icon: "mail" as const,
  },
] as const;
