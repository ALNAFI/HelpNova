import { routes } from "@/config/routes";
import {
  chatbotHeroPresetId,
  chatbotPresets,
  getChatbotPreset,
} from "@/data/chatbot/presets";
import type { FaqItem } from "@/types/marketing";

export const chatbotFeatureHero = {
  eyebrow: "AI chatbot",
  title: "What would you like to ask?",
  description:
    "Explore how HelpNova answers common questions with clear, helpful responses. Try all twenty questions.",
  primaryCtaLabel: "Try the Chatbot",
  secondaryCta: {
    label: "Browse the questions",
    href: "#explore-the-six-sample-questions",
  },
  sampleCaption: "Help center",
  heroPresetId: chatbotHeroPresetId,
} as const;

export const chatbotFeatureShowcase = {
  id: "explore-the-six-sample-questions",
  title: "Explore What HelpNova Can Do!!",
  instruction:
    "Get clear answers about HelpNova's features, workflows, and capabilities.",
  openWidgetLabel: "Explore the Chatbot",
} as const;

export const chatbotFeatureHowItWorks = {
  title: "See How HelpNova Chatbot Works",
  note: "Explore a guided chatbot experience with 20 curated questions and answers. No account required.",
  steps: [
    {
      id: "open",
      label: "Open the chatbot",
      body: "Start exploring HelpNova through a simple, guided chat experience.",
    },
    {
      id: "choose",
      label: "Choose a question",
      body: "Explore 20 common questions about HelpNova's features, workflows, and capabilities.",
    },
    {
      id: "explore",
      label: "Explore another answer",
      body: "Discover more answers at your own pace and learn how HelpNova can support your team's needs.",
    },
  ],
} as const;

export const chatbotFeatureFaq: FaqItem[] = [
  {
    id: "what-can-i-ask",
    category: "features",
    question: "What can I ask the HelpNova chatbot?",
    answer:
      "Explore 20 curated questions covering HelpNova's features, automation, shared inbox, and support insights. The chatbot provides prepared answers to help you discover what HelpNova offers.",
  },
  {
    id: "where-answers-come-from",
    category: "features",
    question: "Where do the answers come from?",
    answer:
      "The chatbot uses carefully prepared responses to common questions about HelpNova. It is a guided preview rather than a live AI-powered conversation.",
  },
  {
    id: "without-signing-in",
    category: "getting-started",
    question: "Can I use the chatbot without signing in?",
    answer:
      "Yes. You can explore all 20 questions and their answers without creating an account or signing in.",
  },
  {
    id: "try-rest-of-helpnova",
    category: "demo",
    question: "Where can I explore more HelpNova features?",
    answer:
      "Visit the interactive demo to explore the Shared Inbox, Workflow Automation, and Insights together in one connected experience.",
  },
];

export const chatbotFeatureCta = {
  title: "Have a question in mind?",
  description:
    "Discover helpful answers to 20 common questions, or explore how HelpNova brings conversations, automation, and insights together.",
  primaryCtaLabel: "Explore the Chatbot",
  secondaryCta: { label: "Explore Demo", href: routes.demo.href },
} as const;

export { chatbotPresets, getChatbotPreset, chatbotHeroPresetId };
