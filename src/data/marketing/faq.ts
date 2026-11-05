import type { FaqCategory, FaqItem } from "@/types/marketing";

/** Short FAQ set shared with the homepage pricing preview. */
export const homeFaqItems: FaqItem[] = [
  {
    id: "what-is",
    question: "What is HelpNova?",
    answer:
      "HelpNova is a premium customer-support and automation concept website. It demonstrates how a shared inbox, workflow routing, and insights can work together in a polished product UI.",
    category: "getting-started",
  },
  {
    id: "real-service",
    question: "Is this a live customer-support platform?",
    answer:
      "No. Conversations, workflows, pricing, and forms on this site are local simulations. Nothing is transmitted to a backend, and no accounts or integrations are created.",
    category: "getting-started",
  },
  {
    id: "demo",
    question: "What can I explore on this homepage?",
    answer:
      "You can switch the hero workspace tabs, select sample conversations, inspect workflow nodes, browse scenarios, and open the FAQ—all without leaving this page.",
    category: "demo",
  },
  {
    id: "ai",
    question: "Does the chatbot use a live AI model?",
    answer:
      "No. Chatbot examples use preset local answers for common questions. No AI API is called in this concept experience.",
    category: "features",
  },
  {
    id: "pricing",
    question: "Are the pricing plans real?",
    answer:
      "The Essential, Team, and Scale plans are illustrative samples for the concept site. There is no checkout or payment processing.",
    category: "pricing",
  },
];

export const faqCategories: FaqCategory[] = [
  { id: "all", label: "All Questions" },
  { id: "getting-started", label: "Getting Started" },
  { id: "features", label: "Features" },
  { id: "demo", label: "Interactive Demo" },
  { id: "pricing", label: "Pricing" },
  { id: "integrations", label: "Integrations" },
  { id: "privacy", label: "Privacy & Security" },
];

/** Full FAQ inventory for `/faq` (~10 items). */
export const faqItems: FaqItem[] = [
  {
    id: "what-is-helpnova",
    category: "getting-started",
    question: "What is HelpNova?",
    answer:
      "HelpNova brings customer conversations, automated workflows, and support insights into one interactive product demo. Explore it to see how these tools work together.",
  },
  {
    id: "how-demo-works",
    category: "demo",
    question: "How does the interactive demo work?",
    answer:
      "Try assigning conversations, adding replies or internal notes, and running automated routing examples. The support insights update as you explore. The demo uses sample data and resets when you refresh.",
  },
  {
    id: "no-account",
    category: "getting-started",
    question: "Can I explore HelpNova without creating an account?",
    answer:
      "Yes. You can explore all pages and try the interactive demo without signing in. The sign-in and sign-up forms are demonstrations and do not create accounts.",
  },
  {
    id: "inbox-demo",
    category: "features",
    question: "What can I do inside the shared inbox demo?",
    answer:
      "Search and filter conversations, assign teams, add replies or internal notes, and resolve or reopen conversations. You can also review their activity history. Tags and priority labels are examples and cannot be edited.",
  },
  {
    id: "automation-demo",
    category: "features",
    question: "How does workflow automation work?",
    answer:
      "Choose a sample inquiry and a routing rule to see how conversations reach the right team. Inquiries that do not match the rule go to general triage. You can replay the example to follow each step.",
  },
  {
    id: "chatbot-ai",
    category: "features",
    question: "How does the chatbot demo work?",
    answer:
      "The chatbot responds to a selection of example questions using prepared answers. It lets you explore the chat experience without connecting to a live AI service.",
  },
  {
    id: "integrations-live",
    category: "integrations",
    question: "Are the integrations connected to real services?",
    answer:
      "The integration gallery shows examples of tools that could work with HelpNova. You can browse and filter them, but they are not connected to live services.",
  },
  {
    id: "pricing-real",
    category: "pricing",
    question: "Can I purchase a plan?",
    answer:
      "The plans and prices show example packages for HelpNova. Paid subscriptions and checkout are currently unavailable.",
  },
  {
    id: "demo-storage",
    category: "privacy",
    question: "What happens to the information I enter?",
    answer:
      "Conversation changes stay in your browser session and are not submitted as support tickets. Refreshing restores the sample conversations. Your theme preference may be saved on your device for future visits.",
  },
  {
    id: "get-in-touch",
    category: "getting-started",
    question: "Where can I learn more about HelpNova?",
    answer:
      "Explore the features, try the interactive demo, or browse the blog and case studies to learn more.",
    links: [
      { phrase: "Explore the features", href: "/features" },
      { phrase: "interactive demo", href: "/demo" },
      { phrase: "blog", href: "/blog" },
      { phrase: "case studies", href: "/case-studies" },
    ],
  },
];

export const faqPageCopy = {
  eyebrow: "Help Center / FAQ",
  titleBefore: "Questions?",
  titleAccent: "We've got answers.",
  description:
    "Find answers about HelpNova, explore features, and discover how our interactive demo works.",
  searchPlaceholder: "Search for answers...",
  sectionTitle: "Browse answers",
  emptyTitle: "No answers found.",
  emptyDescription: "Try another keyword.",
  emptyMessage: "No answers found. Try another keyword.",
  clearFiltersLabel: "Clear filters",
  ctaTitle: "Get to know HelpNova better.",
  ctaDescription:
    "Try the interactive demo or explore the features at your own pace.",
  featuresLabel: "Explore Features",
  demoLabel: "Explore Demo",
} as const;
