import type { DemoActivity, DemoConversation, DemoState } from "@/types/demo";

const T1 = "2026-03-18T09:14:00.000Z";
const T2 = "2026-03-18T09:16:00.000Z";
const T3 = "2026-03-18T09:18:00.000Z";
const T4 = "2026-03-18T10:02:00.000Z";
const T5 = "2026-03-18T10:04:00.000Z";
const T6 = "2026-03-18T10:05:00.000Z";
const T7 = "2026-03-18T11:21:00.000Z";
const T8 = "2026-03-18T11:22:00.000Z";
const T9 = "2026-03-18T12:40:00.000Z";
const T10 = "2026-03-18T13:10:00.000Z";
const T11 = "2026-03-18T14:05:00.000Z";

export const DEMO_AGENT = "Alex Morgan";

export const seedConversations: DemoConversation[] = [
  {
    id: "conv-order-tracking",
    customerName: "Maya Chen",
    customerEmail: "maya.chen@example.com",
    subject: "Where is order #48291?",
    topic: "order-tracking",
    status: "open",
    team: null,
    priority: "Medium",
    tags: ["orders", "shipping"],
    channel: "Email",
    updatedAt: T3,
    messages: [
      {
        id: "msg-order-1",
        kind: "customer",
        author: "Maya Chen",
        body: "Hi—my package for order #48291 still shows in transit. Can you check the status?",
        createdAt: T1,
      },
      {
        id: "msg-order-2",
        kind: "note",
        author: DEMO_AGENT,
        body: "Carrier scan delayed 18 hours. Tracking HN-48291-CA ready for Orders review.",
        createdAt: T2,
      },
      {
        id: "msg-order-3",
        kind: "reply",
        author: DEMO_AGENT,
        body: "Thanks for reaching out, Maya. I can see a delayed scan—I'll confirm the updated delivery window and follow up shortly.",
        createdAt: T3,
      },
    ],
  },
  {
    id: "conv-billing-issue",
    customerName: "Sam Rivera",
    customerEmail: "sam.r@example.com",
    subject: "Unexpected renewal charge",
    topic: "billing-issue",
    status: "open",
    team: "Billing",
    priority: "High",
    tags: ["billing", "renewal"],
    channel: "Chat",
    updatedAt: T6,
    messages: [
      {
        id: "msg-billing-1",
        kind: "customer",
        author: "Sam Rivera",
        body: "I was charged today for a renewal, but I thought I cancelled last month. Can you help?",
        createdAt: T4,
      },
      {
        id: "msg-billing-2",
        kind: "reply",
        author: DEMO_AGENT,
        body: "Happy to help. I see the Team plan renewed this morning—I'll walk through the cancellation window with you.",
        createdAt: T5,
      },
      {
        id: "msg-billing-3",
        kind: "note",
        author: DEMO_AGENT,
        body: "Cancellation request logged 28 days ago but not confirmed. Billing to verify before issuing credit.",
        createdAt: T6,
      },
    ],
  },
  {
    id: "conv-technical-support",
    customerName: "Priya Nair",
    customerEmail: "priya.n@example.com",
    subject: "SSO login loop on mobile",
    topic: "technical-support",
    status: "open",
    team: null,
    priority: "High",
    tags: ["technical", "sso"],
    channel: "Email",
    updatedAt: T8,
    messages: [
      {
        id: "msg-tech-1",
        kind: "customer",
        author: "Priya Nair",
        body: "Signing in with SSO on iOS keeps bouncing me back to the login screen. Desktop works fine.",
        createdAt: T7,
      },
      {
        id: "msg-tech-2",
        kind: "note",
        author: DEMO_AGENT,
        body: "Matches known WebView cookie issue. Escalate to Technical if repro confirmed.",
        createdAt: T8,
      },
    ],
  },
  {
    id: "conv-order-delivered",
    customerName: "Jordan Hale",
    customerEmail: "jordan.hale@example.com",
    subject: "Confirm delivery for order #47820",
    topic: "order-tracking",
    status: "resolved",
    team: "Orders",
    priority: "Low",
    tags: ["orders", "delivery"],
    channel: "Email",
    updatedAt: T10,
    messages: [
      {
        id: "msg-delivered-1",
        kind: "customer",
        author: "Jordan Hale",
        body: "Can you confirm whether order #47820 was delivered yesterday? The tracker looks stuck.",
        createdAt: T9,
      },
      {
        id: "msg-delivered-2",
        kind: "reply",
        author: DEMO_AGENT,
        body: "The carrier confirmed delivery at 4:12 PM.",
        createdAt: T10,
      },
    ],
  },
  {
    id: "conv-billing-triage",
    customerName: "Elena Brooks",
    customerEmail: "elena.brooks@example.com",
    subject: "Invoice PDF missing from email",
    topic: "billing-issue",
    status: "open",
    team: "General Triage",
    priority: "Medium",
    tags: ["billing", "invoice"],
    channel: "Chat",
    updatedAt: T11,
    messages: [
      {
        id: "msg-triage-1",
        kind: "customer",
        author: "Elena Brooks",
        body: "I received a payment confirmation but the invoice PDF attachment is missing. Could you resend it?",
        createdAt: T11,
      },
    ],
  },
];

export const seedActivity: DemoActivity[] = [
  {
    id: "act-1",
    conversationId: "conv-order-tracking",
    kind: "created",
    summary: "Conversation opened for Maya Chen",
    createdAt: T1,
  },
  {
    id: "act-2",
    conversationId: "conv-order-tracking",
    kind: "note",
    summary: `Internal note added by ${DEMO_AGENT}`,
    createdAt: T2,
  },
  {
    id: "act-3",
    conversationId: "conv-order-tracking",
    kind: "reply",
    summary: `Reply added by ${DEMO_AGENT}`,
    createdAt: T3,
  },
  {
    id: "act-4",
    conversationId: "conv-billing-issue",
    kind: "created",
    summary: "Conversation opened for Sam Rivera",
    createdAt: T4,
  },
  {
    id: "act-5",
    conversationId: "conv-billing-issue",
    kind: "assigned",
    summary: "Assigned to Billing",
    createdAt: T5,
    team: "Billing",
  },
  {
    id: "act-6",
    conversationId: "conv-billing-issue",
    kind: "note",
    summary: `Internal note added by ${DEMO_AGENT}`,
    createdAt: T6,
  },
  {
    id: "act-7",
    conversationId: "conv-technical-support",
    kind: "created",
    summary: "Conversation opened for Priya Nair",
    createdAt: T7,
  },
  {
    id: "act-8",
    conversationId: "conv-technical-support",
    kind: "note",
    summary: `Internal note added by ${DEMO_AGENT}`,
    createdAt: T8,
  },
  {
    id: "act-9",
    conversationId: "conv-order-delivered",
    kind: "created",
    summary: "Conversation opened for Jordan Hale",
    createdAt: T9,
  },
  {
    id: "act-10",
    conversationId: "conv-order-delivered",
    kind: "assigned",
    summary: "Assigned to Orders",
    createdAt: T9,
    team: "Orders",
  },
  {
    id: "act-11",
    conversationId: "conv-order-delivered",
    kind: "resolved",
    summary: `Conversation marked as resolved by ${DEMO_AGENT}`,
    createdAt: T10,
  },
  {
    id: "act-12",
    conversationId: "conv-billing-triage",
    kind: "created",
    summary: "Conversation opened for Elena Brooks",
    createdAt: T11,
  },
  {
    id: "act-13",
    conversationId: "conv-billing-triage",
    kind: "assigned",
    summary: "Assigned to General Triage",
    createdAt: T11,
    team: "General Triage",
  },
];

export function createInitialDemoState(): DemoState {
  return {
    conversations: structuredClone(seedConversations),
    activity: structuredClone(seedActivity),
    view: "inbox",
    selectedConversationId: "conv-order-tracking",
    inboxSearch: "",
    inboxFilter: "all",
    composerMode: "reply",
    replyDraft: "",
    noteDraft: "",
    mobileThreadOpen: false,
    selectedInquiry: "order-tracking",
    selectedRule: "order",
    selectedNodeId: "inquiry",
    simulation: null,
    simulationNonce: 0,
    historicalRange: 7,
    activityCounter: seedActivity.length,
    messageCounter: 20,
  };
}

export const topicLabels: Record<DemoConversation["topic"], string> = {
  "order-tracking": "Order Tracking",
  "billing-issue": "Billing Issue",
  "technical-support": "Technical Support",
};

export const ruleLabels = {
  order: "Order Rule",
  billing: "Billing Rule",
  technical: "Technical Rule",
} as const;

export const topicToConversationId: Record<
  DemoConversation["topic"],
  string
> = {
  "order-tracking": "conv-order-tracking",
  "billing-issue": "conv-billing-issue",
  "technical-support": "conv-technical-support",
};
