export type AppRoute = {
  label: string;
  href: string;
  /** When false, keep in config for later modules — do not render as a live link. */
  available: boolean;
  description?: string;
};

export const routes = {
  home: { label: "AI Customer Support", href: "/", available: true },
  homeAutomation: {
    label: "Automation",
    href: "/home-automation",
    available: true,
  },
  homeInbox: {
    label: "Shared Inbox",
    href: "/home-inbox",
    available: true,
  },
  features: { label: "Features", href: "/features", available: true },
  chatbot: {
    label: "Chatbot",
    href: "/features/chatbot",
    available: true,
  },
  automation: {
    label: "Automation",
    href: "/features/automation",
    available: true,
  },
  inbox: { label: "Shared Inbox", href: "/features/inbox", available: true },
  integrations: {
    label: "Integrations",
    href: "/integrations",
    available: true,
  },
  solutions: { label: "All Solutions", href: "/solutions", available: true },
  ecommerce: {
    label: "Ecommerce",
    href: "/solutions/ecommerce",
    available: true,
  },
  pricing: { label: "Pricing", href: "/pricing", available: true },
  about: { label: "About Us", href: "/about", available: true },
  contact: { label: "Contact Us", href: "/contact", available: true },
  blog: { label: "Blog", href: "/blog", available: true },
  caseStudies: {
    label: "Case Studies",
    href: "/case-studies",
    available: true,
  },
  faq: { label: "FAQ", href: "/faq", available: true },
  notFound: { label: "404", href: "/404", available: true },
  privacy: { label: "Privacy", href: "/privacy", available: false },
  terms: { label: "Terms", href: "/terms", available: false },
  demo: { label: "Explore Demo", href: "/demo", available: true },
  login: { label: "Login", href: "/login", available: true },
  signup: { label: "Sign Up", href: "/signup", available: true },
} as const satisfies Record<string, AppRoute>;

/** Homepage section anchors for in-page navigation. */
export const homeAnchors = {
  top: "#top",
  workspace: "#workspace",
  audience: "#audience",
  inbox: "#inbox",
  automation: "#automation",
  insights: "#insights",
  features: "#features",
  integrations: "#integrations",
  scenarios: "#scenarios",
  pricing: "#pricing",
  faq: "#faq",
  cta: "#cta",
} as const;
