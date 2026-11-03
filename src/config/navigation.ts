import { routes } from "@/config/routes";

export type NavLink = {
  label: string;
  href: string;
  description?: string;
};

export type NavGroup = {
  label: string;
  items: NavLink[];
};

export const headerNav: NavGroup[] = [
  {
    label: "Home",
    items: [
      { label: routes.home.label, href: routes.home.href },
      { label: routes.homeAutomation.label, href: routes.homeAutomation.href },
      { label: routes.homeInbox.label, href: routes.homeInbox.href },
    ],
  },
  {
    label: "Product",
    items: [
      { label: routes.features.label, href: routes.features.href },
      { label: routes.chatbot.label, href: routes.chatbot.href },
      { label: routes.automation.label, href: routes.automation.href },
      { label: routes.inbox.label, href: routes.inbox.href },
      { label: routes.integrations.label, href: routes.integrations.href },
    ],
  },
  {
    label: "Solutions",
    items: [
      { label: routes.solutions.label, href: routes.solutions.href },
      { label: routes.ecommerce.label, href: routes.ecommerce.href },
    ],
  },
  {
    label: "Resources",
    items: [
      { label: routes.blog.label, href: routes.blog.href },
      { label: routes.caseStudies.label, href: routes.caseStudies.href },
      { label: routes.about.label, href: routes.about.href },
      { label: routes.contact.label, href: routes.contact.href },
      { label: routes.faq.label, href: routes.faq.href },
      { label: routes.notFound.label, href: routes.notFound.href },
    ],
  },
];

export const headerPrimaryLinks: NavLink[] = [
  { label: routes.pricing.label, href: routes.pricing.href },
];

export const headerActions = {
  login: {
    label: routes.login.label,
    href: routes.login.href,
  },
  demo: {
    label: routes.demo.label,
    href: routes.demo.href,
  },
} as const;

export const footerColumns: { title: string; links: NavLink[] }[] = [
  {
    title: "Home",
    links: [
      { label: routes.home.label, href: routes.home.href },
      { label: routes.homeAutomation.label, href: routes.homeAutomation.href },
      { label: routes.homeInbox.label, href: routes.homeInbox.href },
    ],
  },
  {
    title: "Product",
    links: [
      { label: routes.features.label, href: routes.features.href },
      { label: routes.chatbot.label, href: routes.chatbot.href },
      { label: routes.automation.label, href: routes.automation.href },
      { label: routes.inbox.label, href: routes.inbox.href },
      { label: routes.integrations.label, href: routes.integrations.href },
      { label: routes.pricing.label, href: routes.pricing.href },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: routes.solutions.label, href: routes.solutions.href },
      { label: routes.blog.label, href: routes.blog.href },
      { label: routes.caseStudies.label, href: routes.caseStudies.href },
      { label: routes.about.label, href: routes.about.href },
      { label: routes.faq.label, href: routes.faq.href },
    ],
  },
];

/** Bottom bar legal / utility links (right of copyright). */
export const footerLegalLinks: NavLink[] = [
  { label: "Privacy", href: routes.privacy.href },
  { label: "Terms", href: routes.terms.href },
  { label: "Security", href: routes.security.href },
  { label: "Contact", href: routes.contact.href },
];
