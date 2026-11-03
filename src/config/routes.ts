export type AppRoute = {
  label: string;
  href: string;
  /** When false, keep in config for later modules — do not render as a live link. */
  available: boolean;
  description?: string;
};

export const routes = {
  home: { label: "Home", href: "/", available: true },
  homeAutomation: {
    label: "Automation Home",
    href: "/home-automation",
    available: false,
  },
  homeInbox: {
    label: "Shared Inbox Home",
    href: "/home-inbox",
    available: false,
  },
  features: { label: "Features", href: "/features", available: false },
  chatbot: {
    label: "Chatbot",
    href: "/features/chatbot",
    available: false,
  },
  automation: {
    label: "Automation",
    href: "/features/automation",
    available: false,
  },
  inbox: { label: "Shared Inbox", href: "/features/inbox", available: false },
  integrations: {
    label: "Integrations",
    href: "/integrations",
    available: false,
  },
  solutions: { label: "Solutions", href: "/solutions", available: false },
  ecommerce: {
    label: "Ecommerce",
    href: "/solutions/ecommerce",
    available: false,
  },
  pricing: { label: "Pricing", href: "/pricing", available: false },
  about: { label: "About", href: "/about", available: false },
  contact: { label: "Contact", href: "/contact", available: false },
  blog: { label: "Blog", href: "/blog", available: false },
  caseStudies: {
    label: "Case Studies",
    href: "/case-studies",
    available: false,
  },
  faq: { label: "FAQ", href: "/faq", available: false },
  privacy: { label: "Privacy", href: "/privacy", available: false },
  terms: { label: "Terms", href: "/terms", available: false },
  demo: { label: "Explore Demo", href: "/demo", available: false },
  login: { label: "Login", href: "/login", available: false },
  signup: { label: "Sign Up", href: "/signup", available: false },
} as const satisfies Record<string, AppRoute>;

/** Homepage section anchors used while later routes are inactive. */
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
