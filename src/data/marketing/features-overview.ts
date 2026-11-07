import { routes } from "@/config/routes";
import { getChatbotPreset } from "@/data/chatbot/presets";
import { inboxFeatureConversation } from "@/data/marketing/inbox-feature";

export const featuresOverviewHero = {
  eyebrow: "Explore HelpNova",
  title: "What happens after a customer asks?",
  description:
    "Discover how HelpNova connects customer conversations, intelligent workflows, and team insights to create a smoother support experience.",
  primaryCta: { label: "Explore Demo", href: routes.demo.href },
  secondaryCta: {
    label: "Discover Features",
    href: "#start-with-a-clear-answer",
  },
} as const;

/** Shared fictional order inquiry used across Automation, Inbox, and Insights. */
export const featuresOverviewOrder = {
  customerName: inboxFeatureConversation.customerName,
  subject: inboxFeatureConversation.subject,
  topic: inboxFeatureConversation.topic,
  orderReference: inboxFeatureConversation.orderReference,
  message:
    "My order was due yesterday, but the tracking page hasn’t changed. Can you check what happened?",
  internalNote:
    "The customer has already checked the tracking page. Review the carrier’s latest scan before replying.",
  noteAuthor: "Alex Morgan",
} as const;

/** Chatbot preset for the overview narrative (shared widget data). */
export const featuresOverviewChatbotPresetId = "workflow-automation";

export const featuresOverviewChatbot = {
  id: "start-with-a-clear-answer",
  title: "Start with a clear answer.",
  caption: "AI Chatbot",
  note: "Explore 20 helpful answers to common questions about HelpNova and discover how its features work together.",
  nextCaption: "Up next · Smart workflow automation",
  linkLabel: "Explore AI Chatbot",
  href: routes.chatbot.href,
  preset: getChatbotPreset(featuresOverviewChatbotPresetId),
} as const;

export const featuresOverviewAutomation = {
  id: "see-why-an-inquiry-reaches-a-team",
  title: "Route Every Inquiry to the Right Team.",
  trigger: "A new inquiry arrives.",
  condition: "Is its topic Order Tracking?",
  matched: "Assign it to Orders.",
  otherwise: "Assign it to General Support.",
  otherwiseTeam: "General Support",
  result:
    "HelpNova identifies order-related inquiries and directs them to the Orders team, keeping every request organized and in the right hands.",
  linkLabel: "Explore Workflow Automation",
  href: routes.automation.href,
} as const;

export const featuresOverviewInbox = {
  id: "give-the-next-agent-the-whole-conversation",
  title: "Give the next agent the whole conversation.",
  assignment: "Assigned to Orders",
  status: "Open" as const,
  linkLabel: "Explore Shared Inbox",
  href: routes.inbox.href,
} as const;

export type FeaturesInsightsSnapshotId = "open" | "resolved";

export const featuresOverviewInsights = {
  id: "what-changes-when-this-conversation-is-resolved",
  title: "What changes when this conversation is resolved?",
  sampleLabel: "Team workload overview",
  workloadLabel: "Orders Team · Open Conversations",
  openLabel: "Open conversations",
  resolvedLabel: "Resolved conversations",
  openExplanation:
    "This conversation is assigned to the Orders team. Once resolved, it moves out of the team's open workload and into resolved conversations.",
  resolvedExplanation:
    "Orders still owns the conversation until it’s resolved, removing it from the team’s open workload while keeping the full conversation history available for future reference.",
  linkLabel: "Explore Support Insights",
  href: routes.demo.href,
  snapshots: {
    open: {
      id: "open" as const,
      label: "Open",
      status: "Open" as const,
      owner: "Orders",
      openCount: 1,
      resolvedCount: 0,
    },
    resolved: {
      id: "resolved" as const,
      label: "Resolved",
      status: "Resolved" as const,
      owner: "Orders",
      openCount: 0,
      resolvedCount: 1,
    },
  },
} as const;

export const featuresOverviewBento = {
  title: "What would you like to explore?",
  tiles: [
    {
      id: "chatbot",
      title: "AI Chatbot",
      description:
        "Discover helpful answers to 20 common questions and explore a guided chatbot experience.",
      href: routes.chatbot.href,
      visual: "dialogue" as const,
    },
    {
      id: "automation",
      title: "Workflow Automation",
      description:
        "Discover how smart workflows organize incoming requests and direct them to the right support teams.",
      href: routes.automation.href,
      visual: "decision" as const,
    },
    {
      id: "inbox",
      title: "Shared Inbox",
      description:
        "Keep customer conversations, team assignments, and internal notes together in one organized workspace.",
      href: routes.inbox.href,
      visual: "thread" as const,
    },
    {
      id: "insights",
      title: "Support Insights",
      description:
        "Understand team workloads, track conversation statuses, and explore support performance at a glance.",
      href: routes.demo.href,
      visual: "workload" as const,
    },
  ],
} as const;

export const featuresOverviewCta = {
  title: "Take the next conversation.",
  description:
    "Experience how HelpNova connects customer conversations, smart automation, and team insights in one seamless support workspace.",
  primaryCta: { label: "Explore Demo", href: routes.demo.href },
} as const;
