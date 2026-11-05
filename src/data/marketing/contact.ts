import { faqItems, homeFaqItems } from "@/data/marketing/faq";

export const contactPageCopy = {
  heroEyebrow: "Get in touch",
  heroTitle: "Great ideas begin with a conversation.",
  heroDescription:
    "Have a question about HelpNova? Share your ideas, ask about features, or leave your feedback below.",
  heroCtaLabel: "Get in touch",
  heroCtaHref: "#contact-form",
  formTitle: "Tell us what's on your mind.",
  formSupport:
    "Have a question or an idea? Choose a topic and leave your message below.",
  formIntroTitle: "Let's talk about HelpNova.",
  formIntroBody:
    "Ask about features, share your feedback, or tell us what you're looking to build.",
  formDemoLinkLabel: "Explore the demo",
  formFaqLinkLabel: "Browse FAQs",
  subjectLabel: "What can we help with?",
  submitLabel: "Send message",
  clearLabel: "Clear",
  confirmationTitle: "Your message was sent successfully.",
  workflowTitle: "From conversation to resolution.",
  workflowDescription:
    "See how messages, customer context, and workflows come together in HelpNova.",
  workflowPreviewLabel: "Interactive preview",
  resourcesTitle: "Looking for something specific?",
  resourcesDescription:
    "Find answers, explore features, or take HelpNova for a spin.",
  faqTitle: "A few things worth knowing.",
  faqLinkLabel: "View All FAQs",
  ctaTitle: "See what HelpNova can do.",
  ctaDescription:
    "Explore the inbox, try automated workflows, and discover a simpler way to manage support.",
  demoLabel: "Explore Demo",
  aboutLabel: "About HelpNova",
} as const;

export const contactSubjects = [
  {
    id: "general",
    label: "General Inquiry",
    description: "General questions about HelpNova.",
    icon: "message" as const,
  },
  {
    id: "product",
    label: "Product Question",
    description: "Features, integrations, and workflows.",
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

/** Shared order-delivery story used by all three contact walkthrough tabs. */
export const contactWorkflowStory = {
  customerName: "Maya Chen",
  customerInitials: "MC",
  customerEmail: "maya.chen@example.com",
  channel: "Email",
  timestamp: "9:14 AM",
  messageEyebrow: "Customer message",
  message: "My order hasn’t arrived. Can you check the delivery status?",
  subject: "Where is order #48291?",
  orderNumber: "#48291",
  tracking: "HN-48291-CA",
  deliveryStatus: "In transit",
  deliveryDetail: "Carrier scan delayed 18 hours",
  topic: "Order delivery",
  team: "Orders",
} as const;

export const contactWorkflowStages = [
  {
    id: "conversation",
    label: "Conversation",
    title: "Every conversation starts here.",
    description:
      "Bring customer questions into one shared inbox so your team can understand the issue and take the next step.",
  },
  {
    id: "context",
    label: "Customer context",
    title: "See the context behind the question.",
    description:
      "Keep customer and order details alongside the conversation so your team can respond with clarity.",
  },
  {
    id: "routing",
    label: "Routing",
    title: "Connect the conversation to the right team.",
    description:
      "Route delivery questions to your Orders team so the right people can take the next step.",
  },
] as const;

export const contactResources = [
  {
    id: "demo",
    title: "See HelpNova in action",
    description:
      "Explore the inbox, try automated workflows, and view support insights.",
    href: "/demo",
    cta: "Explore Demo",
    accent: "featured" as const,
    folderLabel: "Demo",
    folderItems: [
      { title: "Inbox" },
      { title: "Automation" },
      { title: "Insights" },
    ],
  },
  {
    id: "faq",
    title: "Find a quick answer",
    description:
      "Get answers to common questions about HelpNova and its features.",
    href: "/faq",
    cta: "Browse FAQs",
    accent: "subtle" as const,
    folderLabel: "FAQs",
    folderItems: [
      { title: "Getting started" },
      { title: "Plans" },
      { title: "Product questions" },
    ],
  },
  {
    id: "features",
    title: "Discover what you can do",
    description:
      "See how shared conversations, automation, and insights help your team stay organized.",
    href: "/features",
    cta: "Explore Features",
    accent: "subtle" as const,
    folderLabel: "Features",
    folderItems: [
      { title: "Shared inbox" },
      { title: "Workflow automation" },
      { title: "Support insights" },
    ],
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
