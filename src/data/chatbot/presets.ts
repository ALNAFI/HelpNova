export type ChatbotPreset = {
  id: string;
  question: string;
  answer: string;
  cta?: {
    label: string;
    href: string;
  };
};

/** Six local sample Q&A pairs shared by the floating widget and feature page. */
export const chatbotPresets: ChatbotPreset[] = [
  {
    id: "what-is-helpnova",
    question: "What is HelpNova?",
    answer:
      "HelpNova brings customer conversations, workflow automation, and support insights together. Try the interactive demo to explore how they work.",
  },
  {
    id: "shared-inbox",
    question: "How does the shared inbox work?",
    answer:
      "Manage conversations in one place. Assign a team, add replies or internal notes, and resolve or reopen conversations in the demo.",
  },
  {
    id: "workflow-automation",
    question: "What can workflow automation do?",
    answer:
      "Route conversations based on their topic. Matching inquiries go to the right specialist team; others go to General Triage.",
  },
  {
    id: "live-ai",
    question: "Does this chatbot use a live AI model?",
    answer:
      "No. Choose a suggested question to get a prepared answer about HelpNova.",
  },
  {
    id: "guided-demo",
    question: "Where can I try Inbox, Automation, and Insights?",
    answer:
      "Explore all three in the interactive demo. Assign conversations, try routing rules, and see your support insights update.",
    cta: {
      label: "Open Demo →",
      href: "/demo",
    },
  },
  {
    id: "without-signin",
    question: "Can I explore without signing in?",
    answer:
      "Yes. You can browse HelpNova and try the interactive demo without creating an account.",
  },
];

export const chatbotHeroPresetId = chatbotPresets[0].id;

export function getChatbotPreset(id: string): ChatbotPreset {
  return (
    chatbotPresets.find((preset) => preset.id === id) ?? chatbotPresets[0]
  );
}

export function getChatbotPresetIndex(id: string): number {
  const index = chatbotPresets.findIndex((preset) => preset.id === id);
  return index >= 0 ? index : 0;
}
