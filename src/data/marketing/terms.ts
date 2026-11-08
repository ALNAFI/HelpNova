import type { LegalDocumentSection } from "@/types/legal";

export const termsPageCopy = {
  eyebrow: "Terms & Conditions",
  title: "Terms of Service, Made Clear.",
  description:
    "Understand the terms, conditions, and guidelines that apply when accessing HelpNova, exploring its features, and using its interactive experiences.",
  glanceEyebrow: "Overview",
  glanceTitle: "The essentials, at a glance.",
  calloutTitle: "Explore HelpNova with Confidence.",
  calloutDescription:
    "Discover HelpNova's features, understand how our services work, and explore a more connected approach to customer support.",
  relatedTitle: "Explore related information.",
  ctaTitle: "Experience HelpNova in Action.",
  ctaDescription:
    "See how customer conversations, intelligent workflows, and support insights come together in one connected experience.",
  demoLabel: "Explore Demo",
  homeLabel: "Back to Home",
  onThisPage: "On this page",
  jumpToSection: "Jump to section",
} as const;

export const termsSummaryCards = [
  {
    id: "concept",
    title: "About HelpNova",
    description:
      "HelpNova brings customer conversations, workflow automation, and support insights together in an interactive product experience.",
    icon: "layout" as const,
  },
  {
    id: "workflows",
    title: "Interactive Workflows",
    description:
      "Explore how customer inquiries move through routing rules, team assignments, and connected support insights.",
    icon: "workflow" as const,
  },
  {
    id: "subscriptions",
    title: "Accounts & Subscriptions",
    description:
      "Account registration, authentication, and subscription purchases are not currently available as live services.",
    icon: "credit-card" as const,
  },
  {
    id: "responsible",
    title: "Responsible Use",
    description:
      "Use HelpNova's interactive features responsibly and avoid entering sensitive, financial, or confidential information.",
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
        text: "HelpNova brings customer conversations, workflow automation, and support insights together in one connected experience. These Terms of Service explain the conditions that apply when you access HelpNova, explore its features, and use its interactive experiences.",
      },
      {
        type: "paragraph",
        text: "By using the HelpNova website, you agree to review these Terms carefully. They describe what the site offers today, how interactive features work, and important limitations that help set clear expectations.",
      },
      {
        type: "callout",
        title: "Service availability",
        text: "Interactive features on HelpNova are available for exploration and are not connected to a live customer-support backend. Activity in those experiences is not transmitted as real support tickets.",
      },
    ],
  },
  {
    id: "scope-of-the-website",
    title: "Our Services & Features",
    blocks: [
      {
        type: "paragraph",
        text: "HelpNova includes product pages, feature overviews, pricing information, articles, case studies, a Guided Demo, and account-style and contact interfaces that help visitors explore the product experience.",
      },
      {
        type: "list",
        items: [
          "Marketing and feature pages describe HelpNova’s product capabilities.",
          "Pricing pages present plan information for review; live checkout is not currently available.",
          "Blog articles and case studies support product storytelling and education. Case studies are illustrative narratives and should not be read as verified customer results.",
          "Login, Sign Up, and Contact screens let you explore account and outreach interfaces.",
          "The Guided Demo connects Inbox, Automation, and Insights in one interactive experience.",
        ],
      },
      {
        type: "paragraph",
        text: "These experiences help you understand HelpNova. They do not operate as a live support desk, CRM, messaging platform, or subscription service at this time.",
      },
    ],
  },
  {
    id: "eligibility-and-access",
    title: "Eligibility and Access",
    blocks: [
      {
        type: "paragraph",
        text: "HelpNova is available for general website access. You do not need a HelpNova account to browse marketing pages or use the Guided Demo.",
      },
      {
        type: "list",
        items: [
          "Login and Sign Up screens are available for exploration.",
          "Live account registration and credential issuance are not currently available.",
          "No membership approval workflow is currently connected.",
        ],
      },
    ],
  },
  {
    id: "interactive-demo",
    title: "Interactive Product Experience",
    blocks: [
      {
        type: "paragraph",
        text: "The Guided Demo connects Inbox, Automation, and Insights so you can explore scenarios such as Order Tracking, Billing Issue, and Technical Support in one shared experience.",
      },
      {
        type: "list",
        items: [
          "Conversations, notes, and activity help you explore a shared inbox.",
          "Automation shows how an inquiry can follow a routing path.",
          "Insights reflect the conversations in that interactive experience.",
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
    id: "acceptable-use",
    title: "Acceptable Use",
    blocks: [
      {
        type: "paragraph",
        text: "Please use HelpNova in a way that is lawful and respectful of the website and other visitors.",
      },
      {
        type: "list",
        items: [
          "Use the site for lawful exploration of HelpNova’s features and content.",
          "Do not attempt to disrupt, damage, overload, or interfere with the website.",
          "Do not misuse forms or interactive features, or treat them as live operational services when they are not.",
          "Do not attempt unauthorized access to systems, accounts, or infrastructure beyond the publicly available website.",
          "Do not interfere with other visitors’ ability to use the site.",
        ],
      },
    ],
  },
  {
    id: "intellectual-property",
    title: "Intellectual Property",
    blocks: [
      {
        type: "paragraph",
        text: "HelpNova’s branding, original design, written content, and original visual elements may be protected by applicable intellectual property laws. Viewing or interacting with the website does not transfer ownership of that content to you.",
      },
      {
        type: "paragraph",
        text: "Third-party assets, libraries, fonts, icons, and dependencies remain subject to their respective licenses and ownership. HelpNova does not claim ownership of third-party materials.",
      },
    ],
  },
  {
    id: "illustrative-features-and-content",
    title: "Product Information & Content",
    blocks: [
      {
        type: "paragraph",
        text: "Product pages, workflows, articles, and case studies are provided to help you understand HelpNova. Workflow examples and Insights panels show how the product experience can work. Blog content is informational. Case studies are illustrative narratives for product storytelling.",
      },
      {
        type: "callout",
        title: "Information accuracy",
        text: "Examples and narratives on HelpNova do not establish verified business outcomes, customer results, savings, or service performance. Do not treat them as testimonials or measured results.",
      },
    ],
  },
  {
    id: "pricing-and-subscriptions",
    title: "Pricing and Subscriptions",
    blocks: [
      {
        type: "paragraph",
        text: "Pricing pages present plan information so you can compare HelpNova’s Essential, Team, and Scale options. Live checkout and subscription purchases are not currently available through the website.",
      },
      {
        type: "list",
        items: [
          "Plan names, amounts, and comparisons are shown for product information.",
          "Monthly and yearly toggles help you compare pricing views.",
          "Displayed plan details do not complete a live purchase at this time.",
        ],
      },
      {
        type: "paragraph",
        text: "These Terms do not set billing cycles, refund rules, automatic renewals, cancellation fees, payment processors, or tax arrangements, because live subscription purchasing is not currently available.",
      },
    ],
  },
  {
    id: "accounts-and-authentication",
    title: "Accounts and Authentication",
    blocks: [
      {
        type: "paragraph",
        text: "Login and Sign Up let you explore account-style screens. They may check required fields and password guidance on the page and show confirmation feedback. They do not create a real account, establish an authentication session, open a protected dashboard, or send a verification email.",
      },
      {
        type: "paragraph",
        text: "Account recovery, password-reset, and identity-verification services for a live HelpNova platform are not currently available.",
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
        text: "Integration names shown on HelpNova help illustrate how the product can fit into a broader support stack. Showing an integration example does not mean a live connection, OAuth link, or confirmed partnership is active.",
      },
    ],
  },
  {
    id: "availability-and-changes",
    title: "Availability and Changes",
    blocks: [
      {
        type: "paragraph",
        text: "Website content, features, and interactive experiences may change as HelpNova evolves. Pages, product information, and Guided Demo content may be revised or replaced over time.",
      },
      {
        type: "paragraph",
        text: "No formal uptime commitment or service-level agreement is offered for the current website experience.",
      },
    ],
  },
  {
    id: "disclaimer-of-warranties",
    title: "Disclaimer of Warranties",
    blocks: [
      {
        type: "paragraph",
        text: "HelpNova is provided for product exploration and information. Interactive features and product examples help you understand the experience and are not presented as a fully operational customer-support platform.",
      },
      {
        type: "paragraph",
        text: "No specific business outcomes, performance results, or operational readiness are promised. These Terms are informational and are not a substitute for legal advice.",
      },
    ],
  },
  {
    id: "limitation-of-liability",
    title: "Limitation of Liability",
    blocks: [
      {
        type: "paragraph",
        text: "HelpNova’s current website and interactive experiences are provided for exploration and information. These Terms do not invent monetary liability caps, broad liability waivers, or jurisdiction-specific exclusions.",
      },
      {
        type: "paragraph",
        text: "Any future operational service would require jurisdiction-specific legal review of liability terms against the actual product, infrastructure, and applicable law. Substantive liability provisions should be reviewed by qualified counsel before being treated as enforceable.",
      },
    ],
  },
  {
    id: "privacy",
    title: "Privacy",
    blocks: [
      {
        type: "paragraph",
        text: "Details about how information is handled while using HelpNova are described in the Privacy Policy (/privacy). That policy covers interactive experiences, theme preferences, forms, and related practices.",
      },
      {
        type: "paragraph",
        text: "Please avoid submitting sensitive personal, financial, or confidential information into forms or Guided Demo fields. The Contact page does not currently deliver messages to a HelpNova inbox.",
      },
    ],
  },
  {
    id: "changes-to-these-terms",
    title: "Updates to These Terms",
    blocks: [
      {
        type: "paragraph",
        text: "We may update these Terms as HelpNova evolves. Changes will reflect updates to our website, available features, and applicable requirements.",
      },
    ],
  },
  {
    id: "contact-and-questions",
    title: "Questions & Contact",
    blocks: [
      {
        type: "paragraph",
        text: "If you have questions about these Terms, visit the Contact page (/contact).",
      },
      {
        type: "callout",
        title: "About the Contact page",
        text: "The Contact page helps you explore how outreach can work on HelpNova. Submissions there are not delivered as messages to a HelpNova inbox, and these Terms do not list a separate legal email or postal address.",
      },
    ],
  },
];

export const termsRelatedLinks = [
  {
    id: "privacy",
    title: "Privacy Policy",
    description:
      "Learn how HelpNova handles information, preferences, and interactive experiences.",
    href: "/privacy",
    icon: "form" as const,
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
    description: "Explore contact options and get information about reaching HelpNova.",
    href: "/contact",
    icon: "mail" as const,
  },
] as const;
