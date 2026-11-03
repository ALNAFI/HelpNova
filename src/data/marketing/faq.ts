import type { FaqItem } from "@/types/marketing";

export const homeFaqItems: FaqItem[] = [
  {
    id: "what-is",
    question: "What is HelpNova?",
    answer:
      "HelpNova is a premium customer-support and automation concept website. It demonstrates how a shared inbox, workflow routing, and insights can work together in a polished product UI.",
  },
  {
    id: "real-service",
    question: "Is this a live customer-support platform?",
    answer:
      "No. Conversations, workflows, pricing, and forms on this site are local simulations. Nothing is transmitted to a backend, and no accounts or integrations are created.",
  },
  {
    id: "demo",
    question: "What can I explore on this homepage?",
    answer:
      "You can switch the hero workspace tabs, select sample conversations, inspect workflow nodes, browse scenarios, and open the FAQ—all without leaving this page.",
  },
  {
    id: "ai",
    question: "Does the chatbot use a live AI model?",
    answer:
      "No. Chatbot examples use preset local answers for common questions. No AI API is called in this concept experience.",
  },
  {
    id: "pricing",
    question: "Are the pricing plans real?",
    answer:
      "The Essential, Team, and Scale plans are illustrative samples for the concept site. There is no checkout or payment processing.",
  },
];
