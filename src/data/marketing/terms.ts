import type { LegalDocumentSection } from "@/types/legal";

export const termsPageCopy = {
  eyebrow: "Terms & Conditions",
  title: "Clear terms for exploring HelpNova.",
  description:
    "Understand the guidelines, limitations, and conditions associated with exploring the HelpNova concept website and its interactive demonstrations.",
  sampleLabel: "Sample Terms of Service",
  sampleNotice:
    "These are editable sample terms for the HelpNova concept website. They are not a finalized legal agreement for an operational service.",
  glanceEyebrow: "Overview",
  glanceTitle: "The essentials, at a glance.",
  calloutTitle: "Built for exploration.",
  calloutDescription:
    "HelpNova is currently an interactive concept. The website, example workflows, pricing illustrations, and account interfaces are not connected to operational services.",
  relatedTitle: "Explore related information.",
  ctaTitle: "Explore what HelpNova could look like.",
  ctaDescription:
    "Discover illustrative conversations, workflow simulations, and connected insights inside the guided demo.",
  demoLabel: "Explore Demo",
  homeLabel: "Back to Home",
  onThisPage: "On this page",
  jumpToSection: "Jump to section",
} as const;

export const termsSummaryCards = [
  {
    id: "concept",
    title: "A concept experience",
    description:
      "HelpNova currently presents a website and interactive UI demonstrations rather than an operational customer-support service.",
    icon: "layout" as const,
  },
  {
    id: "workflows",
    title: "Illustrative workflows",
    description:
      "Conversations, automation rules, and insights in the guided demo are simulated for exploration.",
    icon: "workflow" as const,
  },
  {
    id: "subscriptions",
    title: "No live subscriptions",
    description:
      "Account creation, authentication, and subscription purchasing are not connected to operational services.",
    icon: "credit-card" as const,
  },
  {
    id: "responsible",
    title: "Explore responsibly",
    description:
      "Use the demonstrations for their intended purpose and avoid entering sensitive personal information.",
    icon: "shield" as const,
  },
] as const;

export const termsSections: LegalDocumentSection[] = [
  {
    id: "introduction",
    title: "Introduction",
    blocks: [
      {
        type: "paragraph",
        text: "HelpNova is a premium customer-support and automation concept website. It presents marketing pages, sample product interfaces, and a local Guided Demo so visitors can explore how conversations, workflows, and insights might feel together.",
      },
      {
        type: "paragraph",
        text: "These are editable sample Terms of Service. They describe intended conditions for exploring the website and its demonstrations based on the current implementation. They are not a finalized legal agreement for an operational service, and they are not legal advice.",
      },
      {
        type: "callout",
        title: "Product boundary",
        text: "HelpNova does not currently operate as a live customer-support platform. Unless this project later adds a backend or third-party service, demonstrated interactions remain local interface simulations.",
      },
    ],
  },
  {
    id: "scope-of-the-website",
    title: "Scope of the Website",
    blocks: [
      {
        type: "paragraph",
        text: "The HelpNova website includes marketing pages, feature narratives, pricing illustrations, blog articles, fictional case studies, an interactive Guided Demo, and simulated authentication and contact interfaces.",
      },
      {
        type: "list",
        items: [
          "Marketing and feature pages describe a product concept.",
          "Pricing pages show illustrative sample plans without live checkout.",
          "Blog articles and case studies are editorial or fictional content for exploration.",
          "Login, Sign Up, and Contact screens demonstrate interface behavior.",
          "The Guided Demo presents local Inbox, Automation, and Insights simulations.",
        ],
      },
      {
        type: "paragraph",
        text: "These elements are demonstrations. They are not an operational support desk, CRM, messaging platform, or subscription product.",
      },
    ],
  },
  {
    id: "eligibility-and-access",
    title: "Eligibility and Access",
    blocks: [
      {
        type: "paragraph",
        text: "The website is available for general exploration. You do not need an operational HelpNova user account to open marketing pages or use the Guided Demo.",
      },
      {
        type: "list",
        items: [
          "Login and Sign Up screens are interface simulations.",
          "No real account credentials are issued by the current concept.",
          "No membership approval workflow is connected.",
        ],
      },
      {
        type: "callout",
        title: "What these sample terms do not invent",
        text: "These terms do not invent age-verification systems, paid access requirements, account approval processes, or membership eligibility checks.",
      },
    ],
  },
  {
    id: "interactive-demo",
    title: "Interactive Demo",
    blocks: [
      {
        type: "paragraph",
        text: "The Guided Demo presents fictional conversations and illustrative workflows for scenarios such as Order Tracking, Billing Issue, and Technical Support. Inbox, Automation, and Insights views share local interactive state for exploration.",
      },
      {
        type: "list",
        items: [
          "Sample conversations, notes, and activity exist to support demonstration.",
          "Automation rules visualize illustrative routing paths.",
          "Insights shown in the demo are derived from that local conversation state.",
          "Reset Demo restores original sample data and clears local draft or simulation selections while preserving theme preference.",
          "Refreshing the demo page starts again from the seeded sample data.",
        ],
      },
      {
        type: "paragraph",
        text: "The Guided Demo does not provide live customer-support services and is not connected to a ticketing, CRM, or messaging system.",
      },
    ],
  },
  {
    id: "acceptable-use",
    title: "Acceptable Use",
    blocks: [
      {
        type: "paragraph",
        text: "Please explore HelpNova in a way that respects the concept website and other visitors.",
      },
      {
        type: "list",
        items: [
          "Use the site for lawful exploration of the concept and demonstrations.",
          "Do not attempt to disrupt, damage, overload, or interfere with the website.",
          "Do not misuse demonstration forms or attempt to treat them as operational services.",
          "Do not attempt unauthorized access to systems, accounts, or infrastructure beyond the public concept website.",
          "Do not interfere with other visitors' ability to explore the site.",
        ],
      },
      {
        type: "paragraph",
        text: "These expectations are proportionate to a concept website. They are not an extensive enterprise services agreement.",
      },
    ],
  },
  {
    id: "intellectual-property",
    title: "Intellectual Property",
    blocks: [
      {
        type: "paragraph",
        text: "The HelpNova website's original design, branding, written content, and original visual elements may be protected by applicable intellectual property laws. Visitors should not assume ownership of the site's content simply by viewing or interacting with it.",
      },
      {
        type: "paragraph",
        text: "Third-party assets, libraries, fonts, icons, and dependencies remain subject to their respective licenses and ownership. These sample terms do not claim exclusive ownership of third-party materials and do not invent trademark registrations.",
      },
    ],
  },
  {
    id: "illustrative-features-and-content",
    title: "Illustrative Features and Content",
    blocks: [
      {
        type: "paragraph",
        text: "Feature descriptions represent a product concept. Workflow examples, product mockups, and Insights panels are illustrative. Blog content is informational. Case studies are fictional stories created for the concept website.",
      },
      {
        type: "callout",
        title: "No operational performance claims",
        text: "This content is not evidence of operational product performance, customer results, savings, or service outcomes. Do not treat sample scenarios as real customer testimonials.",
      },
    ],
  },
  {
    id: "pricing-and-subscriptions",
    title: "Pricing and Subscriptions",
    blocks: [
      {
        type: "paragraph",
        text: "Pricing plans shown on HelpNova are illustrative examples intended to support the marketing concept. No live payment processing is available in the current project, and no real subscriptions are created through the website.",
      },
      {
        type: "list",
        items: [
          "Displayed plan names, amounts, and comparisons are sample content.",
          "Monthly and yearly toggles demonstrate interface behavior only.",
          "Displayed plan details do not represent an active purchase offer.",
        ],
      },
      {
        type: "callout",
        title: "Not invented here",
        text: "These sample terms do not invent enforceable billing cycles, refund policies, automatic renewal terms, cancellation fees, payment processors, or tax arrangements.",
      },
    ],
  },
  {
    id: "accounts-and-authentication",
    title: "Accounts and Authentication",
    blocks: [
      {
        type: "paragraph",
        text: "Login and Sign Up are UI demonstrations. They may validate fields locally and show demonstration feedback, but they do not create a real account, establish an authentication session, provide a protected user dashboard, or send a verification email.",
      },
      {
        type: "paragraph",
        text: "These sample terms do not invent account recovery, password-reset, or identity-verification services for an operational HelpNova platform.",
      },
    ],
  },
  {
    id: "third-party-links-and-integrations",
    title: "Third-Party Links and Integrations",
    blocks: [
      {
        type: "paragraph",
        text: "Some pages may include links to destinations outside HelpNova. Those websites operate independently and under their own terms and privacy practices.",
      },
      {
        type: "paragraph",
        text: "Integration cards and names shown on HelpNova are illustrative examples. They are not live integrations, connected OAuth services, or confirmed partnerships. Showing an integration example does not imply an active commercial relationship.",
      },
    ],
  },
  {
    id: "availability-and-changes",
    title: "Availability and Changes",
    blocks: [
      {
        type: "paragraph",
        text: "The concept website may be updated as the project evolves. Demonstration content, page structure, sample data, and interactions may change. Certain pages or examples may be revised or replaced.",
      },
      {
        type: "paragraph",
        text: "No operational uptime commitment, service-level agreement, or formal maintenance policy is offered for this concept website.",
      },
    ],
  },
  {
    id: "disclaimer-of-warranties",
    title: "Disclaimer of Warranties",
    blocks: [
      {
        type: "paragraph",
        text: "HelpNova is presented for demonstration and informational purposes. It is not a production-ready customer-support service. Examples, mockups, workflows, pricing illustrations, and sample content are illustrative.",
      },
      {
        type: "paragraph",
        text: "No specific business outcomes, performance results, or operational readiness are promised. This wording is editable sample language and has not been presented as legally reviewed counsel.",
      },
    ],
  },
  {
    id: "limitation-of-liability",
    title: "Limitation of Liability",
    blocks: [
      {
        type: "paragraph",
        text: "Because HelpNova is currently a concept website rather than an operational service, these sample terms do not invent enforceable monetary liability caps, broad liability waivers, or jurisdiction-specific exclusions.",
      },
      {
        type: "callout",
        title: "Future operational review",
        text: "If HelpNova later becomes an operational service, any limitation-of-liability language would need jurisdiction-specific legal review against the actual product, infrastructure, and applicable law. These sample terms do not claim the project is exempt from applicable law.",
      },
    ],
  },
  {
    id: "privacy",
    title: "Privacy",
    blocks: [
      {
        type: "paragraph",
        text: "Details about how information is handled while exploring HelpNova are described in the Privacy Policy. That notice covers local demo interactions, theme preferences, demonstration forms, and related boundaries.",
      },
      {
        type: "paragraph",
        text: "Please avoid submitting sensitive personal, financial, or confidential information into sample forms or demo fields. The current Contact experience is a local UI demonstration and does not deliver messages.",
      },
    ],
  },
  {
    id: "changes-to-these-terms",
    title: "Changes to These Terms",
    blocks: [
      {
        type: "paragraph",
        text: "Because these are editable sample terms for a concept website, their wording may change as HelpNova evolves.",
      },
      {
        type: "paragraph",
        text: "If the project later becomes an operational service, any future Terms of Service should be finalized against the actual functionality, infrastructure, and legal requirements in effect at that time. These sample terms do not invent a formal revision history.",
      },
    ],
  },
  {
    id: "contact-and-questions",
    title: "Contact and Questions",
    blocks: [
      {
        type: "paragraph",
        text: "For general questions about this concept website, you can visit the Contact page.",
      },
      {
        type: "callout",
        title: "Contact form note",
        text: "The current Contact experience is a local UI demonstration and does not deliver messages to an operational HelpNova inbox. These sample terms do not invent a legal department, registered office, or operational support email address.",
      },
    ],
  },
];

export const termsRelatedLinks = [
  {
    id: "privacy",
    title: "Privacy Policy",
    description:
      "Sample privacy notice covering local demos, preferences, and demonstration forms.",
    href: "/privacy",
    icon: "form" as const,
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
