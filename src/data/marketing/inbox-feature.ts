export type InboxMomentId = "inquiry" | "handoff" | "resolved";

export type InboxThreadItem =
  | {
      id: string;
      kind: "customer" | "reply" | "note";
      author: string;
      body: string;
      time: string;
    }
  | {
      id: string;
      kind: "activity";
      summary: string;
      time: string;
    };

export type InboxMoment = {
  id: InboxMomentId;
  label: string;
  status: "Open" | "Resolved";
  team: "Orders" | "Unassigned";
  explanation: string;
  openContribution: {
    label: string;
    count: number;
  };
  items: InboxThreadItem[];
};

export const inboxFeatureHero = {
  eyebrow: "Shared Inbox",
  title: "Pick up the conversation where your team left off.",
  description:
    "Read the customer’s question, see who owns the reply, and catch up on the notes your teammates left.",
  primaryCta: { label: "Explore Demo", href: "/demo" },
  secondaryCta: {
    label: "Follow a conversation",
    href: "#follow-one-conversation",
  },
} as const;

export const inboxFeatureConversation = {
  id: "conv-order",
  customerName: "Maya Chen",
  customerEmail: "maya.chen@example.com",
  subject: "Where is order #48291?",
  topic: "Order Tracking",
  orderReference: "ORD-48291",
  priority: "Medium",
  tags: ["orders", "shipping"],
  sampleLabel: "Conversation journey",
} as const;

export const inboxFeatureMoments: InboxMoment[] = [
  {
    id: "inquiry",
    label: "Inquiry received",
    status: "Open",
    team: "Unassigned",
    explanation:
      "The customer’s delivery question has arrived. No teammate owns the next reply yet.",
    openContribution: {
      label: "Unassigned",
      count: 1,
    },
    items: [
      {
        id: "msg-customer",
        kind: "customer",
        author: "Maya Chen",
        body: "My order was due yesterday, but the tracking page hasn’t changed. Can you check what happened?",
        time: "09:14",
      },
    ],
  },
  {
    id: "handoff",
    label: "Team handoff",
    status: "Open",
    team: "Orders",
    explanation:
      "Orders owns the next step. The internal note tells the next agent what to verify before replying.",
    openContribution: {
      label: "Orders",
      count: 1,
    },
    items: [
      {
        id: "msg-customer",
        kind: "customer",
        author: "Maya Chen",
        body: "My order was due yesterday, but the tracking page hasn’t changed. Can you check what happened?",
        time: "09:14",
      },
      {
        id: "act-assigned",
        kind: "activity",
        summary: "Assigned to Orders",
        time: "09:16",
      },
      {
        id: "msg-note",
        kind: "note",
        author: "Alex Morgan",
        body: "Please check the carrier’s latest scan before replying. The customer has already checked the tracking page.",
        time: "09:16",
      },
    ],
  },
  {
    id: "resolved",
    label: "Resolved",
    status: "Resolved",
    team: "Orders",
    explanation:
      "Orders remains the owner. The conversation is resolved, and the earlier handoff note stays in the history.",
    openContribution: {
      label: "Orders",
      count: 0,
    },
    items: [
      {
        id: "msg-customer",
        kind: "customer",
        author: "Maya Chen",
        body: "My order was due yesterday, but the tracking page hasn’t changed. Can you check what happened?",
        time: "09:14",
      },
      {
        id: "act-assigned",
        kind: "activity",
        summary: "Assigned to Orders",
        time: "09:16",
      },
      {
        id: "msg-note",
        kind: "note",
        author: "Alex Morgan",
        body: "Please check the carrier’s latest scan before replying. The customer has already checked the tracking page.",
        time: "09:16",
      },
      {
        id: "msg-reply",
        kind: "reply",
        author: "Alex Morgan",
        body: "The carrier’s tracking page has updated. You can use the tracking link in your order email to see the latest scan.",
        time: "09:28",
      },
      {
        id: "act-resolved",
        kind: "activity",
        summary: "Conversation marked Resolved",
        time: "09:29",
      },
    ],
  },
];

export const inboxFeatureWalkthrough = {
  id: "follow-one-conversation",
  title: "Follow one conversation.",
  instruction: "Choose a moment to see what the next agent would know.",
} as const;

export const inboxFeatureConnection = {
  title: "What changes beyond the thread?",
  description:
    "See how one customer conversation connects routing, team ownership, and workload insights.",
  automation: {
    title: "Automation — Routing",
    copy: "Route order-related questions to the right team, so every inquiry has a clear owner.",
    href: "/features/automation",
    linkLabel: "Explore automation",
  },
  inbox: {
    title: "Shared Inbox — Ownership",
    copy: "Keep customer messages, team assignments, and internal notes together in one conversation.",
  },
  insights: {
    title: "Insights — Open workload",
    copy: "See how conversations affect your team's workload and track what still needs attention.",
  },
} as const;

export const inboxFeatureCta = {
  title: "Take the next conversation.",
  description:
    "Take control of customer conversations. Assign them to the right team, leave internal notes, and keep every request moving forward.",
  primaryCta: { label: "Explore Demo", href: "/demo" },
} as const;

export function getInboxMoment(id: InboxMomentId): InboxMoment {
  return (
    inboxFeatureMoments.find((moment) => moment.id === id) ??
    inboxFeatureMoments[1]
  );
}
