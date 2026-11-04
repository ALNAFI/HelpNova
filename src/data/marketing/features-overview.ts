import { routes } from "@/config/routes";
import { getChatbotPreset } from "@/data/chatbot/presets";
import { inboxFeatureConversation } from "@/data/marketing/inbox-feature";

export const featuresOverviewHero = {
  eyebrow: "HelpNova features",
  title: "What happens after a customer asks?",
  description:
    "Explore a sample answer, follow an inquiry to its team, and see how one resolved conversation changes the workload.",
  primaryCta: { label: "Explore Demo", href: routes.demo.href },
  secondaryCta: {
    label: "Explore the features",
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
  caption: "Preset Q&A",
  note: "The floating sample offers six prepared answers and runs locally.",
  nextCaption: "Next example: routing an incoming order inquiry.",
  linkLabel: "Explore AI Chatbot",
  href: routes.chatbot.href,
  preset: getChatbotPreset(featuresOverviewChatbotPresetId),
} as const;

export const featuresOverviewAutomation = {
  id: "see-why-an-inquiry-reaches-a-team",
  title: "See why an inquiry reaches a team.",
  trigger: "A new inquiry arrives.",
  condition: "Is its topic Order Tracking?",
  matched: "Assign it to Orders.",
  otherwise: "Assign it to General Triage.",
  result:
    "This inquiry is tagged Order Tracking, so the Order rule assigns it to Orders.",
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
  sampleLabel: "Workload from this sample conversation",
  openExplanation:
    "Orders owns this open conversation, so it contributes one item to the team’s open workload.",
  resolvedExplanation:
    "Orders still owns the conversation. Resolving it removes it from the team’s open workload.",
  linkLabel: "Explore Insights in the demo",
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
        "Browse six sample questions and try the floating chatbot.",
      href: routes.chatbot.href,
      visual: "dialogue" as const,
    },
    {
      id: "automation",
      title: "Workflow Automation",
      description:
        "Inspect the condition that sends an inquiry to Orders or General Triage.",
      href: routes.automation.href,
      visual: "decision" as const,
    },
    {
      id: "inbox",
      title: "Shared Inbox",
      description:
        "Read a customer thread alongside its owner and team-only note.",
      href: routes.inbox.href,
      visual: "thread" as const,
    },
    {
      id: "insights",
      title: "Insights in the demo",
      description:
        "See how assignments and resolution affect open team workload.",
      href: routes.demo.href,
      visual: "workload" as const,
    },
  ],
} as const;

export const featuresOverviewCta = {
  title: "Take the next conversation.",
  description:
    "Open the guided demo to assign a conversation, run a routing rule, and see the workload change.",
  primaryCta: { label: "Explore Demo", href: routes.demo.href },
} as const;
