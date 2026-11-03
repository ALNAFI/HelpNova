import { homeAnchors, routes } from "@/config/routes";

export type NavLink = {
  label: string;
  href: string;
  description?: string;
};

export type NavGroup = {
  label: string;
  items: NavLink[];
};

/** Marketing header: live destinations use homepage anchors until later modules unlock. */
export const headerNav: NavGroup[] = [
  {
    label: "Product",
    items: [
      {
        label: "Features",
        href: homeAnchors.features,
        description: "Inbox, automation, and insights together",
      },
      {
        label: "Chatbot",
        href: homeAnchors.features,
        description: "Preset answers for common questions",
      },
      {
        label: "Automation",
        href: homeAnchors.automation,
        description: "Route inquiries with clear rules",
      },
      {
        label: "Shared Inbox",
        href: homeAnchors.inbox,
        description: "One queue for every channel",
      },
      {
        label: "Integrations",
        href: homeAnchors.integrations,
        description: "Illustrative tools your stack may include",
      },
    ],
  },
  {
    label: "Solutions",
    items: [
      {
        label: "Ecommerce",
        href: homeAnchors.audience,
        description: "Orders, shipping, and returns",
      },
      {
        label: "SaaS",
        href: homeAnchors.audience,
        description: "Billing and product questions",
      },
      {
        label: "Services",
        href: homeAnchors.audience,
        description: "Scheduling and account help",
      },
    ],
  },
  {
    label: "Resources",
    items: [
      {
        label: "Support scenarios",
        href: homeAnchors.scenarios,
        description: "Sample inquiry journeys",
      },
      {
        label: "FAQ",
        href: homeAnchors.faq,
        description: "Answers about this concept site",
      },
    ],
  },
];

export const headerPrimaryLinks: NavLink[] = [
  { label: routes.pricing.label, href: homeAnchors.pricing },
];

export const headerActions = {
  login: {
    label: routes.login.label,
    /** Anchor until auth modules are built — avoids a broken /login link. */
    href: homeAnchors.cta,
  },
  demo: {
    label: routes.demo.label,
    href: homeAnchors.workspace,
  },
} as const;

export const footerColumns: { title: string; links: NavLink[] }[] = [
  {
    title: "Homepages",
    links: [
      { label: "AI Customer Support", href: "/" },
      { label: "Automation preview", href: homeAnchors.automation },
      { label: "Shared Inbox preview", href: homeAnchors.inbox },
    ],
  },
  {
    title: "Product",
    links: [
      { label: "Features", href: homeAnchors.features },
      { label: "Integrations", href: homeAnchors.integrations },
      { label: "Pricing preview", href: homeAnchors.pricing },
      { label: "Guided workspace", href: homeAnchors.workspace },
    ],
  },
  {
    title: "Explore",
    links: [
      { label: "Who it’s for", href: homeAnchors.audience },
      { label: "Support scenarios", href: homeAnchors.scenarios },
      { label: "FAQ", href: homeAnchors.faq },
      { label: "Final CTA", href: homeAnchors.cta },
    ],
  },
];
