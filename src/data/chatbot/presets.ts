export type ChatbotPreset = {
  id: string;
  question: string;
  answer: string;
};

/** Six local sample Q&A pairs shared by the floating widget and feature page. */
export const chatbotPresets: ChatbotPreset[] = [
  {
    id: "what-is-helpnova",
    question: "What is HelpNova?",
    answer:
      "HelpNova is a premium customer-support and automation concept website. It shows how a shared inbox, workflow routing, and insights can work together in a polished product UI—built as a personal project, not a live support platform.",
  },
  {
    id: "shared-inbox",
    question: "How does the shared inbox work?",
    answer:
      "In the Guided Demo, you can open a sample conversation, assign a team, add a reply or team-only internal note, and resolve or reopen the thread. Tags and priority stay display-only in this concept.",
  },
  {
    id: "workflow-automation",
    question: "What can workflow automation do?",
    answer:
      "A sample rule checks an inquiry’s topic, then follows Matched or Otherwise. Matched routes to a specialist team such as Orders; Otherwise goes to General Triage. You can inspect each node in the demo.",
  },
  {
    id: "live-ai",
    question: "Does this chatbot use a live AI model?",
    answer:
      "No. This sample uses six preset questions and authored answers that run locally in your browser. There is no AI model call, streaming response, or remote knowledge base.",
  },
  {
    id: "without-signin",
    question: "Can I explore without signing in?",
    answer:
      "Yes. Login and Sign Up are UI simulations with local validation only. You can browse the marketing pages, open this sample chatbot, and try the Guided Demo without creating an account.",
  },
  {
    id: "guided-demo",
    question: "Where can I try Inbox, Automation, and Insights?",
    answer:
      "Open the Guided Demo at /demo. Inbox, Automation, and Insights share one local sample state so you can assign conversations, run a routing simulation, and watch the derived metrics update.",
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
