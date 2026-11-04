import { routes } from "@/config/routes";
import {
  chatbotHeroPresetId,
  chatbotPresets,
  getChatbotPreset,
} from "@/data/chatbot/presets";
import type { FaqItem } from "@/types/marketing";

export const chatbotFeatureHero = {
  eyebrow: "AI chatbot feature",
  title: "What would you like to ask?",
  description:
    "Choose a sample question and see how HelpNova presents the answer. Try all six in the floating chatbot.",
  primaryCtaLabel: "Try the sample chatbot",
  secondaryCta: {
    label: "Browse the questions",
    href: "#explore-the-six-sample-questions",
  },
  sampleCaption: "Sample exchange",
  heroPresetId: chatbotHeroPresetId,
} as const;

export const chatbotFeatureShowcase = {
  id: "explore-the-six-sample-questions",
  title: "Explore the six sample questions.",
  instruction: "Select a question to read its sample answer.",
  openWidgetLabel: "Open sample chatbot",
} as const;

export const chatbotFeatureHowItWorks = {
  title: "How the sample works",
  note: "This sample uses six preset answers and runs locally in your browser.",
  steps: [
    {
      id: "open",
      label: "Open the chatbot",
      body: "The launcher or any chatbot CTA opens the same conversation panel.",
    },
    {
      id: "choose",
      label: "Choose a question",
      body: "Pick one of six prepared prompts. The sample displays its paired answer locally.",
    },
    {
      id: "explore",
      label: "Explore another answer",
      body: "Choose another prompt or close the panel when finished. Refreshing the page starts a new local session.",
    },
  ],
} as const;

export const chatbotFeatureFaq: FaqItem[] = [
  {
    id: "what-can-i-ask",
    category: "features",
    question: "What can I ask the sample chatbot?",
    answer:
      "You can choose from the six sample questions shown on this page. Free-form questions are not answered in this concept experience.",
  },
  {
    id: "where-answers-come-from",
    category: "features",
    question: "Where do the answers come from?",
    answer:
      "Each question has a predefined answer included with the sample. The widget looks up the matching text by question ID—no AI model is called.",
  },
  {
    id: "without-signing-in",
    category: "getting-started",
    question: "Can I use the chatbot without signing in?",
    answer:
      "Yes. The floating sample chatbot is public and local. It does not require an account, and nothing you select is sent to a server as a support ticket.",
  },
  {
    id: "try-rest-of-helpnova",
    category: "demo",
    question: "Where can I try the rest of HelpNova?",
    answer:
      "Open the Guided Demo to explore Inbox, Automation, and Insights with one shared sample state. Chatbot selections stay separate from that demo workspace.",
  },
];

export const chatbotFeatureCta = {
  title: "Have a question in mind?",
  description:
    "Open the sample chatbot to browse its six questions, or explore how a support team handles a conversation in the guided demo.",
  primaryCtaLabel: "Try the sample chatbot",
  secondaryCta: { label: "Explore Demo", href: routes.demo.href },
} as const;

export { chatbotPresets, getChatbotPreset, chatbotHeroPresetId };
