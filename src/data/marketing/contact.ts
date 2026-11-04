import { faqItems, homeFaqItems } from "@/data/marketing/faq";

export const contactPageCopy = {
  heroEyebrow: "Let's start a conversation",
  heroTitle: "Great ideas begin with a conversation.",
  heroDescription:
    "Have a question, an idea, or feedback about HelpNova? Explore the contact experience and discover more about the product concept.",
  heroSecondary: "Your thoughts. A clearer conversation.",
  formTitle: "Tell us what's on your mind.",
  formSupport:
    "Use this sample form to explore the contact interface. Nothing you enter will be sent.",
  formIntroTitle: "A local contact experience",
  formIntroBody:
    "This form demonstrates labels, validation, and confirmation patterns for the HelpNova concept. It is not connected to email delivery or a support inbox.",
  formNotice: "Local demonstration · nothing is transmitted",
  submitLabel: "Preview Submission",
  clearLabel: "Clear Form",
  startAgainLabel: "Start Again",
  confirmationTitle: "Your form is ready.",
  confirmationDescription:
    "This is a local demonstration. Your message was not sent or saved.",
  confirmationHint:
    "You can clear the fields and try again, or continue exploring HelpNova.",
  workflowTitle: "A clearer way to connect.",
  workflowDescription:
    "See how HelpNova's concept brings conversations, context, and workflows into one connected experience.",
  resourcesTitle: "Looking for something specific?",
  resourcesDescription:
    "Explore the resources and experiences that can help you learn more about HelpNova.",
  faqTitle: "A few things worth knowing.",
  faqLinkLabel: "View All FAQs",
  ctaTitle: "Curiosity starts something great.",
  ctaDescription:
    "Explore the ideas, interfaces, and interactive workflows behind HelpNova.",
  demoLabel: "Explore Demo",
  aboutLabel: "About HelpNova",
} as const;

export const contactSubjects = [
  {
    id: "general",
    label: "General Inquiry",
    description: "A broad question about the concept.",
    icon: "message" as const,
  },
  {
    id: "product",
    label: "Product Question",
    description: "Ask about features, demo, or workflows.",
    icon: "sparkles" as const,
  },
  {
    id: "feedback",
    label: "Feedback",
    description: "Share an idea or observation.",
    icon: "heart" as const,
  },
  {
    id: "other",
    label: "Other",
    description: "Anything else on your mind.",
    icon: "pen" as const,
  },
] as const;

export type ContactSubjectId = (typeof contactSubjects)[number]["id"];

export const contactWorkflowStages = [
  {
    id: "conversation",
    label: "Conversation",
    title: "Start with the message",
    description:
      "A sample customer note appears first—clear, readable, and ready for context.",
    sample: {
      eyebrow: "Sample message",
      body: "Could you help me understand how HelpNova connects inbox conversations with workflows?",
    },
  },
  {
    id: "context",
    label: "Context",
    title: "Keep the details nearby",
    description:
      "Topic, assignment cues, and an internal note concept sit beside the conversation so teammates stay oriented.",
    sample: {
      eyebrow: "Sample context",
      body: "Topic: Product Question · Internal note: Share Guided Demo path and FAQ links.",
    },
  },
  {
    id: "workflow",
    label: "Workflow",
    title: "Show the next step",
    description:
      "An illustrative rule routes the inquiry toward a clear team destination without claiming a live ticket system.",
    sample: {
      eyebrow: "Sample routing",
      body: "If topic matches Product Question → Product Guidance. Otherwise → General Triage.",
    },
  },
] as const;

export const contactResources = [
  {
    id: "demo",
    title: "See HelpNova in action.",
    description:
      "Explore sample conversations, automation workflows, and illustrative insights.",
    href: "/demo",
    cta: "Explore Demo",
    accent: "violet" as const,
  },
  {
    id: "faq",
    title: "Find a quick answer.",
    description:
      "Discover answers to common questions about the HelpNova concept.",
    href: "/faq",
    cta: "Browse FAQs",
    accent: "indigo" as const,
  },
  {
    id: "features",
    title: "Explore what's possible.",
    description:
      "Learn about the customer-support interfaces and workflow concepts behind HelpNova.",
    href: "/features",
    cta: "Explore Features",
    accent: "rose" as const,
  },
] as const;

/** Contact-page FAQ preview with an explicit contact-form answer. */
export const contactFaqPreview = [
  homeFaqItems.find((item) => item.id === "real-service")!,
  {
    id: "contact-form-sends",
    category: "getting-started" as const,
    question: "Does the contact form send a real message?",
    answer:
      "No. The Contact page is a local UI demonstration. Preview Submission validates your fields and shows confirmation, but nothing is emailed, stored, or turned into a ticket.",
  },
  faqItems.find((item) => item.id === "no-account")!,
  faqItems.find((item) => item.id === "integrations-live")!,
];
