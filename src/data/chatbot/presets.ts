export type ChatbotPreset = {
  id: string;
  question: string;
  answer: string;
  cta?: {
    label: string;
    href: string;
  };
};

/** Prepared Q&A pairs shared by the floating widget and feature page. */
export const chatbotPresets: ChatbotPreset[] = [
  {
    id: "what-is-helpnova",
    question: "What is HelpNova?",
    answer:
      "HelpNova brings customer conversations, workflow automation, and support insights together. Explore how customer conversations, automated workflows, and team insights connect in one place.",
  },
  {
    id: "shared-inbox",
    question: "How does the shared inbox work?",
    answer:
      "Bring customer conversations into one organized workspace. Keep your team aligned with clear ownership, internal notes, and conversation statuses.",
  },
  {
    id: "workflow-automation",
    question: "What can workflow automation do?",
    answer:
      "Organize incoming requests with topic-based routing. Direct matching conversations to the right team and keep unmatched inquiries organized for review.",
  },
  {
    id: "live-ai",
    question: "How does HelpNova's AI chatbot help customers?",
    answer:
      "Explore helpful answers to common questions about HelpNova. This interactive preview uses prepared responses to demonstrate the chatbot experience.",
  },
  {
    id: "guided-demo",
    question: "How do HelpNova's tools work together?",
    answer:
      "Inbox, Automation, and Insights work together to organize conversations, streamline team handoffs, and provide a clearer view of support activity. Explore them in the interactive demo.",
    cta: {
      label: "Open Demo →",
      href: "/demo",
    },
  },
  {
    id: "without-signin",
    question: "Can I explore without signing in?",
    answer:
      "Absolutely. Explore HelpNova's features and experience the interactive demo without creating an account.",
  },
  {
    id: "improve-support",
    question: "How can HelpNova improve customer support?",
    answer:
      "HelpNova brings conversations, team assignments, and workflow automation into one organized workspace, helping teams manage customer requests with greater clarity.",
  },
  {
    id: "inquiry-types",
    question: "Can HelpNova handle different types of customer inquiries?",
    answer:
      "Yes. Explore how HelpNova organizes order tracking, billing, and technical support inquiries using dedicated teams and topic-based workflows.",
  },
  {
    id: "team-collaboration",
    question: "How does HelpNova help teams collaborate?",
    answer:
      "Keep everyone aligned with shared conversations, clear assignments, and internal notes, so each team member understands what needs attention.",
  },
  {
    id: "track-performance",
    question: "Can I track customer support performance?",
    answer:
      "Explore HelpNova Insights to view conversation statuses, team workloads, resolution rates, and support activity in the interactive demo.",
  },
  {
    id: "integrations",
    question: "Does HelpNova support integrations with other tools?",
    answer:
      "HelpNova showcases integrations with popular tools such as Shopify, Slack, Gmail, and HubSpot. These are illustrative previews, not active connections.",
  },
  {
    id: "business-fit",
    question: "Is HelpNova suitable for my business?",
    answer:
      "HelpNova is designed to illustrate customer support workflows for ecommerce, SaaS, and service businesses. Explore different scenarios to see how its features could fit your team's needs.",
  },
  {
    id: "reduce-repetitive-tasks",
    question: "How can HelpNova help reduce repetitive support tasks?",
    answer:
      "HelpNova demonstrates how workflow automation can organize incoming requests, route conversations by topic, and simplify team handoffs, helping teams focus on customer needs.",
  },
  {
    id: "assign-to-teams",
    question: "Can I assign conversations to specific teams?",
    answer:
      "Yes. In the interactive demo, you can assign conversations to Orders, Billing, Technical, or General Triage teams and see how ownership is organized.",
  },
  {
    id: "keep-conversations-organized",
    question: "How does HelpNova keep conversations organized?",
    answer:
      "HelpNova brings customer messages, conversation statuses, team assignments, and internal notes into one shared workspace, making it easier to see what needs attention.",
  },
  {
    id: "extra-attention",
    question: "What happens when a conversation needs extra attention?",
    answer:
      "HelpNova illustrates how conversations can be directed to the appropriate team for review, with clear ownership and shared context to support the next steps.",
  },
  {
    id: "see-open-conversations",
    question: "Can I see which customer conversations are still open?",
    answer:
      "Yes. The interactive demo lets you explore open and resolved conversations, filter your inbox, and review how support requests are organized.",
  },
  {
    id: "better-decisions",
    question: "How does HelpNova help teams make better decisions?",
    answer:
      "HelpNova Insights brings conversation statuses, team workloads, and resolution metrics into one view, helping teams understand support activity and identify areas that may need attention.",
  },
  {
    id: "customize-automation",
    question: "Can I customize automation rules for different inquiries?",
    answer:
      "The interactive demo lets you select predefined routing rules for order, billing, and technical support inquiries and explore how different conditions affect team assignments.",
  },
  {
    id: "different-from-traditional",
    question: "What makes HelpNova different from traditional support tools?",
    answer:
      "HelpNova combines the concepts of shared conversations, workflow automation, and support insights in one connected experience. Explore how these features work together through realistic customer support scenarios.",
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
