import type { LegalDocumentSection } from "@/types/legal";

export const privacyPageCopy = {
  eyebrow: "Privacy & Transparency",
  title: "Privacy, explained clearly.",
  description:
    "Learn how HelpNova approaches privacy, handles information, and keeps its interactive experiences transparent.",
  glanceEyebrow: "Overview",
  glanceTitle: "Privacy at a glance.",
  calloutTitle: "Your Privacy Matters.",
  calloutDescription:
    "We believe clear information and thoughtful privacy practices are essential to building trust.",
  relatedTitle: "Helpful Resources & Information",
  ctaTitle: "Explore HelpNova with clarity.",
  ctaDescription:
    "Discover how HelpNova brings customer conversations, workflow automation, and support insights together in one connected experience.",
  demoLabel: "Explore Demo",
  homeLabel: "Back to Home",
  onThisPage: "On this page",
  jumpToSection: "Jump to section",
} as const;

export const privacySummaryCards = [
  {
    id: "demo",
    title: "Interactive Experiences",
    description:
      "Explore HelpNova's interactive features using local data. Your demo activity is not sent to a live customer support service.",
    icon: "sparkles" as const,
  },
  {
    id: "theme",
    title: "Your Preferences",
    description:
      "Your selected theme may be saved in your browser to keep your preferred appearance across visits.",
    icon: "palette" as const,
  },
  {
    id: "forms",
    title: "Demo Forms",
    description:
      "Explore contact and account forms without creating an account or submitting information to a live service.",
    icon: "form" as const,
  },
  {
    id: "external",
    title: "External Websites",
    description:
      "When you visit external websites through HelpNova, their own privacy policies and practices may apply.",
    icon: "link" as const,
  },
] as const;

export type PrivacySection = LegalDocumentSection;

export const privacySections: PrivacySection[] = [
  {
    id: "introduction",
    title: "Introduction",
    blocks: [
      {
        type: "paragraph",
        text: "HelpNova brings customer conversations, workflow automation, and support insights into one connected experience. Across the site and Guided Demo, you can explore how inbox, automation, and insights work together in a modern support workspace.",
      },
      {
        type: "paragraph",
        text: "This Privacy Policy explains how information is handled when you explore HelpNova, use interactive features, and manage your preferences.",
      },
      {
        type: "callout",
        title: "About our interactive features",
        text: "Interactive experiences on HelpNova currently use local data in your browser session. They are not connected to a live customer-support backend, and activity in these experiences is not transmitted as real support tickets.",
      },
    ],
  },
  {
    id: "information-you-enter",
    title: "Information You Enter",
    blocks: [
      {
        type: "paragraph",
        text: "Some pages let you enter information such as a name, email address, subject, message, or password. In the Guided Demo, you may also add replies, internal notes, assignments, and filters while exploring conversations.",
      },
      {
        type: "list",
        items: [
          "Login and Sign Up check your input for clarity, but do not create real accounts.",
          "Contact forms help you review how outreach works on HelpNova and do not send messages.",
          "Guided Demo fields update the interactive experience on the page so you can explore workflows.",
        ],
      },
      {
        type: "paragraph",
        text: "Information you enter in these areas stays on the page for the experience you are using. It is not used to create accounts, open tickets, or send data to a HelpNova support system.",
      },
      {
        type: "callout",
        title: "Please keep sensitive details private",
        text: "Avoid entering sensitive personal, financial, or confidential information into forms or Guided Demo fields.",
      },
    ],
  },
  {
    id: "interactive-demo-data",
    title: "Interactive Experiences & Data",
    blocks: [
      {
        type: "paragraph",
        text: "The Guided Demo connects Inbox, Automation, and Insights so you can explore Order Tracking, Billing Issue, and Technical Support scenarios in one shared experience.",
      },
      {
        type: "list",
        items: [
          "Conversations, activity, and notes help you explore how a shared inbox can feel.",
          "Automation shows how an inquiry can follow a routing path.",
          "Insights reflect the conversations in that interactive experience, not website visitor analytics.",
          "Reset Demo restores the starting conversations and clears temporary edits while keeping your theme preference.",
          "Refreshing the Guided Demo returns you to the original starting point.",
        ],
      },
      {
        type: "paragraph",
        text: "Guided Demo activity stays in the interactive experience. It is not created as a real support ticket and is not sent to a live ticketing, CRM, or messaging system.",
      },
    ],
  },
  {
    id: "browser-storage",
    title: "Browser Storage and Preferences",
    blocks: [
      {
        type: "paragraph",
        text: "Your selected theme may be saved in your browser to maintain your preferred appearance across visits. HelpNova offers Light and Dark themes.",
      },
      {
        type: "paragraph",
        text: "Guided Demo conversations, form entries, passwords, and account details are not intentionally saved in cookies or browser storage. Interactive data is temporary for the page session and returns to its starting point after a refresh.",
      },
      {
        type: "callout",
        title: "About browser and hosting data",
        text: "Your browser, extensions, or hosting provider may still process ordinary technical data as part of normal web use. This policy describes how HelpNova itself handles preferences and interactive data.",
      },
    ],
  },
  {
    id: "forms-and-accounts",
    title: "Forms & Account Information",
    blocks: [
      {
        type: "paragraph",
        text: "Login and Sign Up let you explore account-style screens. They may check required fields and password guidance on the page, then show confirmation feedback. They do not create real accounts or sign anyone in.",
      },
      {
        type: "paragraph",
        text: "The Contact page lets you explore how a message form can work on HelpNova. Entries made there are not delivered to a support inbox or CRM.",
      },
      {
        type: "list",
        items: [
          "These forms are not connected to an authentication service.",
          "They do not create an account database.",
          "Passwords you type are not intentionally saved or logged by HelpNova.",
        ],
      },
    ],
  },
  {
    id: "analytics-and-external-services",
    title: "Analytics and External Services",
    blocks: [
      {
        type: "paragraph",
        text: "HelpNova does not currently use a website analytics tool, advertising pixel, or customer-data backend. Insights you see in product previews or the Guided Demo are part of the product experience, not measurements of your browsing activity.",
      },
      {
        type: "paragraph",
        text: "When the site is published, hosting or content-delivery infrastructure may process ordinary technical request data—such as IP addresses or server logs—according to that provider’s practices.",
      },
      {
        type: "callout",
        title: "External services",
        text: "If HelpNova adds analytics or other third-party services in the future, this Privacy Policy will be updated to describe those services accurately.",
      },
    ],
  },
  {
    id: "external-links",
    title: "External Links",
    blocks: [
      {
        type: "paragraph",
        text: "Some pages may include links to destinations outside HelpNova. Those websites operate independently and may collect or use information under their own policies.",
      },
      {
        type: "paragraph",
        text: "If you follow an external link, review that destination’s privacy information when it matters to you. HelpNova does not control third-party websites.",
      },
    ],
  },
  {
    id: "retention-and-reset",
    title: "Data Storage & Retention",
    blocks: [
      {
        type: "paragraph",
        text: "Interactive data in the Guided Demo is temporary. Refreshing the experience returns you to the original conversations rather than keeping your edits as a permanent record.",
      },
      {
        type: "list",
        items: [
          "Reset Demo restores the starting conversations and clears temporary edits.",
          "Your theme preference may remain in browser storage until you change it or clear site data.",
          "HelpNova does not maintain an account archive or ticket history from these interactive experiences.",
        ],
      },
      {
        type: "paragraph",
        text: "Because interactive activity is handled locally in these experiences, HelpNova does not provide server-side deletion tools for that temporary data.",
      },
    ],
  },
  {
    id: "security-considerations",
    title: "Keeping Your Information Safe",
    blocks: [
      {
        type: "paragraph",
        text: "We want visitors to explore HelpNova with clear expectations. Forms and interactive experiences are designed for product exploration, not for submitting confidential business or personal records.",
      },
      {
        type: "paragraph",
        text: "Do not use these forms for passwords you rely on elsewhere, payment details, government identifiers, or other sensitive personal information.",
      },
      {
        type: "callout",
        title: "Transparent security guidance",
        text: "This Privacy Policy does not claim security certifications or enterprise guarantees. Please treat public website forms with care and avoid sharing sensitive information.",
      },
    ],
  },
  {
    id: "your-choices",
    title: "Your Choices",
    blocks: [
      {
        type: "paragraph",
        text: "While exploring HelpNova, you can:",
      },
      {
        type: "list",
        items: [
          "Choose Light or Dark theme.",
          "Reset interactive data in the Guided Demo when you want to start fresh.",
          "Manage browser site data, including a saved theme preference, through your browser controls.",
          "Avoid sharing sensitive information in forms or Guided Demo fields.",
          "Review external websites before visiting them, or skip links you do not wish to open.",
        ],
      },
      {
        type: "paragraph",
        text: "Because these experiences do not create operational accounts, HelpNova does not currently offer account deletion, data export, or formal privacy-request workflows for account records.",
      },
    ],
  },
  {
    id: "childrens-privacy",
    title: "Children's Privacy",
    blocks: [
      {
        type: "paragraph",
        text: "HelpNova is intended for a general business audience and is not directed at children.",
      },
      {
        type: "paragraph",
        text: "If you believe a child has entered personal information into a HelpNova form, stop using that form and clear the relevant browser data if needed.",
      },
    ],
  },
  {
    id: "changes",
    title: "Updates to This Policy",
    blocks: [
      {
        type: "paragraph",
        text: "We may update this Privacy Policy as HelpNova evolves. Any changes will reflect the features, services, and information practices available at that time.",
      },
    ],
  },
  {
    id: "contact",
    title: "Privacy Questions & Contact",
    blocks: [
      {
        type: "paragraph",
        text: "If you have questions about this Privacy Policy, visit the Contact page (/contact).",
      },
      {
        type: "callout",
        title: "About the Contact page",
        text: "The Contact page helps you explore how outreach can work on HelpNova. Submissions there are not delivered as messages to a HelpNova inbox, and this policy does not list a separate privacy email or postal address.",
      },
    ],
  },
];

export const privacyRelatedLinks = [
  {
    id: "terms",
    title: "Terms & Conditions",
    description:
      "Understand the terms, guidelines, and conditions for using HelpNova.",
    href: "/terms",
    icon: "scroll" as const,
  },
  {
    id: "faq",
    title: "FAQ",
    description:
      "Find clear answers about HelpNova's features, pricing, and services.",
    href: "/faq",
    icon: "help" as const,
  },
  {
    id: "contact",
    title: "Contact",
    description:
      "Explore contact options and find information about getting in touch with HelpNova.",
    href: "/contact",
    icon: "mail" as const,
  },
] as const;
