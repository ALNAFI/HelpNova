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
      "HelpNova is a visually ambitious customer-support and automation concept website. It showcases how a shared inbox, workflow automation, and insights can feel in one premium product experience—built as a personal project, not a live support platform.",
  },
  {
    id: "how-demo-works",
    category: "demo",
    question: "How does the interactive demo work?",
    answer:
      "The Guided Demo is a local, browser-only workspace. Inbox, Automation, and Insights share one sample state so you can assign conversations, add replies or internal notes, run a routing simulation, and watch the derived metrics update. Refreshing restores the original seed data.",
  },
  {
    id: "no-account",
    category: "getting-started",
    question: "Can I explore HelpNova without creating an account?",
    answer:
      "Yes. Login and Sign Up screens are UI simulations with local validation only. No accounts are created, and you can browse the marketing pages and Guided Demo freely without signing in.",
  },
  {
    id: "inbox-demo",
    category: "features",
    question: "What can I do inside the shared inbox demo?",
    answer:
      "You can search and filter sample conversations, open a thread, assign a team, add a local reply or visually distinct internal note, resolve or reopen a conversation, and review the activity log. Tags and priority are display-only in this concept.",
  },
  {
    id: "automation-demo",
    category: "features",
    question: "How does workflow automation work?",
    answer:
      "In the demo, you pick a sample inquiry and a rule, then run or replay a simulation along New Inquiry → Topic Condition → Matched or Otherwise. Matched routes to the corresponding team; Otherwise goes to General Triage. The inspector explains each node—nothing is executed against a real system.",
  },
  {
    id: "chatbot-ai",
    category: "features",
    question: "Does the chatbot use real AI?",
    answer:
      "No. Chatbot examples use a small set of preset local questions and answers. There is no AI model call, streaming response, or knowledge-base connection in this experience.",
  },
  {
    id: "integrations-live",
    category: "integrations",
    question: "Are the integrations connected to real services?",
    answer:
      "No. Integration cards are illustrative examples (such as Shopify, Slack, or Stripe) used for browsing and filtering on this site. There is no OAuth, Connect flow, or live third-party connection.",
  },
  {
    id: "pricing-real",
    category: "pricing",
    question: "Are the pricing plans real subscriptions?",
    answer:
      "The Essential, Team, and Scale plans are sample concepts for exploring the pricing layout. Monthly and yearly amounts are illustrative only—there is no checkout, billing, or paid subscription.",
  },
  {
    id: "demo-storage",
    category: "privacy",
    question: "Is my demo information stored or transmitted?",
    answer:
      "Demo actions stay in your browser session. They are not sent to a server as tickets, and refreshing returns to the original sample data. Theme preference may be stored locally so Light or Dark mode can persist between visits.",
  },
  {
    id: "get-in-touch",
    category: "getting-started",
    question: "How can I get in touch or learn more?",
    answer:
      "Use the Contact page to try the local form (it validates and confirms that nothing is sent), explore the Guided Demo, or browse Features, Blog, and Case Studies for more product storytelling.",
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
  emptyDescription: "Try another keyword or explore all questions.",
  ctaTitle: "Still have questions?",
  ctaDescription:
    "Explore the interactive demo or reach out to learn more about HelpNova.",
  contactLabel: "Contact Us",
  demoLabel: "Explore Demo",
} as const;
