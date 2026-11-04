import type { LegalDocumentSection } from "@/types/legal";

export const privacyPageCopy = {
  eyebrow: "Privacy & Transparency",
  title: "Privacy, explained clearly.",
  description:
    "Understand how information is handled while exploring the HelpNova website and its interactive demonstrations.",
  sampleLabel: "Sample Privacy Notice",
  sampleNotice:
    "This is an editable sample privacy notice for the HelpNova concept website. It is not a finalized policy for an operational service.",
  glanceEyebrow: "Overview",
  glanceTitle: "Privacy at a glance.",
  calloutTitle: "Designed for exploration.",
  calloutDescription:
    "HelpNova currently demonstrates interface concepts and local workflows. Avoid entering sensitive personal information into sample forms or demo fields.",
  relatedTitle: "Explore our information pages.",
  ctaTitle: "Explore HelpNova with clarity.",
  ctaDescription:
    "Discover the interactive demo and learn how HelpNova's illustrative workflows come together.",
  demoLabel: "Explore Demo",
  homeLabel: "Back to Home",
  onThisPage: "On this page",
  jumpToSection: "Jump to section",
} as const;

export const privacySummaryCards = [
  {
    id: "demo",
    title: "Local demo interactions",
    description:
      "HelpNova's guided demo uses illustrative information and local interactive state rather than a connected customer-support service.",
    icon: "sparkles" as const,
  },
  {
    id: "theme",
    title: "Your display preferences",
    description:
      "Theme preferences may be saved in your browser so the selected appearance can be restored on future visits.",
    icon: "palette" as const,
  },
  {
    id: "forms",
    title: "Demonstration forms",
    description:
      "Contact and account forms demonstrate interface behavior without creating accounts or submitting requests to a live service.",
    icon: "form" as const,
  },
  {
    id: "external",
    title: "External destinations",
    description:
      "External websites may follow their own privacy practices when you choose to visit them.",
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
        text: "HelpNova is a visually ambitious customer-support and automation concept website. It presents marketing pages, sample product interfaces, and a local Guided Demo so visitors can explore how conversations, workflows, and insights might feel in a connected workspace.",
      },
      {
        type: "paragraph",
        text: "This page is an editable sample privacy notice. It describes the demonstrated website behavior based on the current implementation. It is not a finalized privacy policy for an operational service, and it is not legal advice.",
      },
      {
        type: "callout",
        title: "Product boundary",
        text: "HelpNova does not currently operate as a live customer-support platform. Unless this project later adds a backend or third-party service, demonstrated interactions remain local interface simulations.",
      },
    ],
  },
  {
    id: "information-you-enter",
    title: "Information You Enter",
    blocks: [
      {
        type: "paragraph",
        text: "Some pages invite you to type into demonstration fields. Depending on the page, that may include names, email addresses, subjects, messages, passwords, or sample conversation replies and notes inside the Guided Demo.",
      },
      {
        type: "list",
        items: [
          "Login and Sign Up screens validate input for interface demonstration only.",
          "Contact-style forms are intended as local UI simulations, not message delivery.",
          "Guided Demo fields may include sample replies, internal notes, assignment choices, and filters.",
        ],
      },
      {
        type: "paragraph",
        text: "In the current implementation, those fields update on-screen state. They are not designed to create accounts, open tickets, or send information to a HelpNova backend.",
      },
      {
        type: "callout",
        title: "Practical tip",
        text: "Avoid entering sensitive personal, financial, or confidential information into demonstration forms or demo fields.",
      },
    ],
  },
  {
    id: "interactive-demo-data",
    title: "Interactive Demo Data",
    blocks: [
      {
        type: "paragraph",
        text: "The Guided Demo presents fictional conversations and illustrative workflows for Order Tracking, Billing Issue, and Technical Support scenarios. Inbox, Automation, and Insights views share the same local demo state.",
      },
      {
        type: "list",
        items: [
          "Sample conversations, activity, and notes exist to support exploration.",
          "Workflow simulations visualize an illustrative routing path.",
          "Insights shown in the demo are derived from that local conversation state, not from website visitor analytics.",
          "Reset Demo restores the original sample data and clears local draft or simulation selections while preserving theme preference.",
          "Refreshing the demo page starts again from the seeded sample data.",
        ],
      },
      {
        type: "paragraph",
        text: "Nothing in the Guided Demo is transmitted as a real support ticket, and it is not connected to a live ticketing, CRM, or messaging system.",
      },
    ],
  },
  {
    id: "browser-storage",
    title: "Browser Storage and Preferences",
    blocks: [
      {
        type: "paragraph",
        text: "HelpNova may store your theme preference in the browser using localStorage under the key theme. That preference can be light, dark, or system, and it helps restore your selected appearance on later visits.",
      },
      {
        type: "paragraph",
        text: "The current application code does not intentionally store Guided Demo conversations, form submissions, passwords, or account details in cookies or browser storage. Demo state is designed to live in the page session and return to its sample starting point after a refresh.",
      },
      {
        type: "callout",
        title: "What this does not claim",
        text: "This notice does not claim that every browser, extension, hosting provider, or future dependency never stores technical data. It describes the storage behavior implemented in the HelpNova application itself.",
      },
    ],
  },
  {
    id: "forms-and-accounts",
    title: "Forms and Account Demonstrations",
    blocks: [
      {
        type: "paragraph",
        text: "Login and Sign Up are simulated interfaces. They may validate required fields and password rules locally, then show demonstration feedback. They do not create real accounts or sign anyone into an operational service.",
      },
      {
        type: "paragraph",
        text: "Contact-style forms are likewise intended to demonstrate validation and confirmation patterns. In the current concept, they do not deliver messages to a support inbox or CRM.",
      },
      {
        type: "list",
        items: [
          "No real authentication service is connected.",
          "No account database is created by these screens.",
          "Passwords entered into demonstration fields are not intentionally persisted or logged by the application.",
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
        text: "The current HelpNova codebase does not include a website analytics package, advertising pixel, or customer-data backend. The Insights panels you may see in marketing previews or the Guided Demo are illustrative product UI, not measurements of your browsing activity.",
      },
      {
        type: "paragraph",
        text: "The site is built with Next.js and may load fonts and static assets through the application build. Hosting or delivery infrastructure used to publish the site may process ordinary technical request data, such as IP addresses or server logs, according to that provider's practices.",
      },
      {
        type: "callout",
        title: "No invented vendors",
        text: "This sample notice does not invent analytics vendors, cookie lists, or transfer arrangements. If future services are added, this page should be updated to match the actual implementation.",
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
        text: "If you follow an external link, review that destination's privacy information when it matters to you. HelpNova's sample notice does not control third-party websites.",
      },
    ],
  },
  {
    id: "retention-and-reset",
    title: "Data Retention and Reset",
    blocks: [
      {
        type: "paragraph",
        text: "Because the Guided Demo is designed around local interactive state, refreshing the demo returns you to the seeded sample conversations rather than retaining your exploratory edits as a permanent record.",
      },
      {
        type: "list",
        items: [
          "Reset Demo restores original sample data and clears local draft or simulation selections.",
          "Theme preference can remain in browser storage until you clear site data or change the preference.",
          "There is no operational HelpNova account archive, ticket history, or formal retention schedule in the current concept.",
        ],
      },
      {
        type: "paragraph",
        text: "This page does not claim server-side deletion workflows, because the current experience is not built around a HelpNova-operated customer database.",
      },
    ],
  },
  {
    id: "security-considerations",
    title: "Security Considerations",
    blocks: [
      {
        type: "paragraph",
        text: "HelpNova is currently a UI concept and local demonstration. It is not presented here as an operational support platform with audited production security controls.",
      },
      {
        type: "paragraph",
        text: "Please treat demonstration forms as exploratory interfaces. Do not use them for passwords you rely on elsewhere, payment details, government identifiers, or other sensitive personal information.",
      },
      {
        type: "callout",
        title: "No fabricated assurances",
        text: "This sample notice does not claim SOC 2, ISO, GDPR certification, end-to-end encryption, or enterprise security guarantees for an operational service.",
      },
    ],
  },
  {
    id: "your-choices",
    title: "Your Choices",
    blocks: [
      {
        type: "paragraph",
        text: "While exploring HelpNova, you can make several practical choices:",
      },
      {
        type: "list",
        items: [
          "Select a light, dark, or system theme.",
          "Reset the Guided Demo when you want to return to the original sample state.",
          "Avoid entering personal or sensitive information into demonstration fields.",
          "Leave pages or skip external links you do not wish to visit.",
          "Clear browser site data, including the stored theme preference, through your browser controls.",
        ],
      },
      {
        type: "paragraph",
        text: "The current concept does not provide account deletion, data export, or privacy-request workflows, because it does not create operational accounts.",
      },
    ],
  },
  {
    id: "childrens-privacy",
    title: "Children's Privacy",
    blocks: [
      {
        type: "paragraph",
        text: "HelpNova is a concept website intended for general product exploration. It is not directed at children, and it does not include an age-verification system.",
      },
      {
        type: "paragraph",
        text: "If you believe a child has entered personal information into a demonstration field, stop using that form and clear the relevant browser data if needed. This editable sample wording can be revisited if the project later becomes an operational service.",
      },
    ],
  },
  {
    id: "changes",
    title: "Changes to This Notice",
    blocks: [
      {
        type: "paragraph",
        text: "Because this is an editable sample notice for a concept website, its wording may change as HelpNova evolves.",
      },
      {
        type: "paragraph",
        text: "If the project later becomes an operational service, any future privacy policy should be reviewed against the actual data practices, infrastructure, and legal requirements in effect at that time.",
      },
    ],
  },
  {
    id: "contact",
    title: "Contact and Further Information",
    blocks: [
      {
        type: "paragraph",
        text: "For general questions about this concept website, you can visit the Contact page.",
      },
      {
        type: "callout",
        title: "Contact form note",
        text: "The current Contact experience is a local UI demonstration and does not deliver messages to an operational HelpNova inbox. This sample notice does not invent a privacy email address or postal address.",
      },
    ],
  },
];

export const privacyRelatedLinks = [
  {
    id: "terms",
    title: "Terms & Conditions",
    description: "Sample terms describing fictional content and usage boundaries.",
    href: "/terms",
    icon: "scroll" as const,
  },
  {
    id: "faq",
    title: "Frequently Asked Questions",
    description: "Answers about the demo, pricing samples, and how this concept works.",
    href: "/faq",
    icon: "help" as const,
  },
  {
    id: "contact",
    title: "Contact",
    description: "Open the demonstration contact experience.",
    href: "/contact",
    icon: "mail" as const,
  },
] as const;
