import type {
  AudienceCard,
  BentoFeature,
  HeroContent,
  InsightMetric,
  SampleConversation,
  SupportScenario,
  WorkflowNode,
} from "@/types/marketing";
import { homeAnchors } from "@/config/routes";

export const heroContent: HeroContent = {
  eyebrow: "Customer support, thoughtfully automated",
  headline: "Unify every conversation with calm,",
  highlight: "intelligent routing",
  description:
    "HelpNova brings shared inbox, workflow automation, and live insights into one premium workspace—so teams resolve the right conversations with clarity.",
  primaryCta: { label: "Explore Demo", href: homeAnchors.workspace },
  secondaryCta: { label: "Explore Features", href: homeAnchors.features },
  trustLine:
    "A local concept experience—explore the product UI without creating accounts or connecting services.",
};

export const audienceCards: AudienceCard[] = [
  {
    id: "ecommerce",
    title: "Ecommerce",
    description:
      "Keep order, shipping, and return questions organized without losing the human handoff.",
    scenario:
      "A shopper asks where order #48291 is—HelpNova routes it to Orders with tracking context ready.",
    icon: "shopping-bag",
  },
  {
    id: "saas",
    title: "SaaS",
    description:
      "Guide billing and product questions to the right specialists before queues pile up.",
    scenario:
      "A subscriber questions a renewal charge—Billing receives the thread with plan details attached.",
    icon: "layers",
  },
  {
    id: "services",
    title: "Services",
    description:
      "Coordinate scheduling, account changes, and follow-ups across a focused support team.",
    scenario:
      "A client needs to reschedule—General Triage assigns ownership and leaves a clear internal note.",
    icon: "briefcase",
  },
];

export const sampleConversations: SampleConversation[] = [
  {
    id: "conv-order",
    customer: "Maya Chen",
    email: "maya.chen@example.com",
    subject: "Where is order #48291?",
    preview: "Hi—my package still shows in transit. Can you check the status?",
    channel: "Email",
    status: "Open",
    priority: "Medium",
    tags: ["orders", "shipping"],
    assignee: "Jordan Lee",
    team: "Orders",
    messages: [
      {
        id: "m1",
        author: "Maya Chen",
        role: "customer",
        body: "Hi—my package for order #48291 still shows in transit. Can you check the status?",
        time: "09:14",
      },
      {
        id: "m2",
        author: "HelpNova",
        role: "note",
        body: "Internal note: Carrier scan delayed 18 hours. Tracking HN-48291-CA linked for Orders.",
        time: "09:16",
      },
      {
        id: "m3",
        author: "Jordan Lee",
        role: "agent",
        body: "Thanks for reaching out, Maya. I can see a delayed scan—I'll confirm the updated delivery window and follow up shortly.",
        time: "09:18",
      },
    ],
  },
  {
    id: "conv-billing",
    customer: "Sam Rivera",
    email: "sam.r@example.com",
    subject: "Unexpected renewal charge",
    preview: "I was charged today but thought I cancelled last month.",
    channel: "Chat",
    status: "Open",
    priority: "High",
    tags: ["billing", "renewal"],
    assignee: "Avery Kim",
    team: "Billing",
    messages: [
      {
        id: "b1",
        author: "Sam Rivera",
        role: "customer",
        body: "I was charged today for a renewal, but I thought I cancelled last month. Can you help?",
        time: "10:02",
      },
      {
        id: "b2",
        author: "Avery Kim",
        role: "agent",
        body: "Happy to help. I see the Team plan renewed this morning—I'll walk through the cancellation window with you.",
        time: "10:04",
      },
      {
        id: "b3",
        author: "HelpNova",
        role: "note",
        body: "Internal note: Cancellation request logged 28 days ago but not confirmed. Billing to verify.",
        time: "10:05",
      },
    ],
  },
  {
    id: "conv-tech",
    customer: "Priya Nair",
    email: "priya.n@example.com",
    subject: "SSO login loop on mobile",
    preview: "Signing in with SSO keeps bouncing me back to the login screen.",
    channel: "Email",
    status: "Open",
    priority: "High",
    tags: ["technical", "sso"],
    assignee: "Unassigned",
    team: "Technical",
    messages: [
      {
        id: "t1",
        author: "Priya Nair",
        role: "customer",
        body: "Signing in with SSO on iOS keeps bouncing me back to the login screen. Desktop works fine.",
        time: "11:21",
      },
      {
        id: "t2",
        author: "HelpNova",
        role: "note",
        body: "Internal note: Matches known WebView cookie issue. Escalate to Technical if repro confirmed.",
        time: "11:22",
      },
    ],
  },
];

export const workflowNodes: WorkflowNode[] = [
  {
    id: "trigger",
    label: "New Inquiry",
    kind: "trigger",
    detail: "A customer message arrives in the shared inbox from email, chat, or social.",
  },
  {
    id: "condition",
    label: "Topic Condition",
    kind: "condition",
    detail: "Match keywords and intent for Orders, Billing, or Technical topics.",
  },
  {
    id: "matched",
    label: "Matched",
    kind: "branch",
    detail: "When the topic matches, assign to the corresponding specialist team.",
  },
  {
    id: "otherwise",
    label: "Otherwise",
    kind: "branch",
    detail: "If no topic matches confidently, send the conversation to General Triage.",
  },
  {
    id: "action-team",
    label: "Assign Team",
    kind: "action",
    detail: "Orders, Billing, or Technical receive the thread with context intact.",
  },
  {
    id: "action-triage",
    label: "General Triage",
    kind: "action",
    detail: "A human reviews ambiguous inquiries and chooses the next owner.",
  },
];

export const insightMetrics: InsightMetric[] = [
  {
    id: "total",
    label: "Total",
    value: "128",
    hint: "Sample volume for the illustrated period",
  },
  {
    id: "open",
    label: "Open",
    value: "34",
    hint: "Conversations waiting on a reply",
  },
  {
    id: "resolved",
    label: "Resolved",
    value: "94",
    hint: "Closed in the sample dataset",
  },
  {
    id: "rate",
    label: "Resolution rate",
    value: "73%",
    hint: "Illustrative ratio from sample data",
  },
];

export const workloadByTeam = [
  { team: "Orders", open: 11 },
  { team: "Billing", open: 8 },
  { team: "Technical", open: 9 },
  { team: "General Triage", open: 4 },
  { team: "Unassigned", open: 2 },
] as const;

export const volumeTrend = [
  { day: "Mon", value: 18 },
  { day: "Tue", value: 22 },
  { day: "Wed", value: 16 },
  { day: "Thu", value: 28 },
  { day: "Fri", value: 24 },
  { day: "Sat", value: 12 },
  { day: "Sun", value: 8 },
] as const;

export const bentoFeatures: BentoFeature[] = [
  {
    id: "chatbot",
    title: "Preset chatbot assistance",
    description:
      "Offer curated answers for common questions. This sample widget uses local presets—no live AI model is called.",
    size: "large",
    kind: "chatbot",
  },
  {
    id: "inbox",
    title: "Shared inbox",
    description: "Email, chat, and social threads in one prioritized queue.",
    size: "medium",
    kind: "inbox",
  },
  {
    id: "automation",
    title: "Workflow automation",
    description: "Trigger → condition → action with clear Matched and Otherwise paths.",
    size: "medium",
    kind: "automation",
  },
  {
    id: "insights",
    title: "Insights & reporting",
    description: "See open workload, resolution mix, and recent activity at a glance.",
    size: "small",
    kind: "insights",
  },
  {
    id: "collaboration",
    title: "Team collaboration",
    description: "Assign owners and leave internal notes without cluttering the customer thread.",
    size: "small",
    kind: "collaboration",
  },
  {
    id: "organization",
    title: "Organized conversations",
    description: "Status, tags, and priority stay visible so nothing important gets buried.",
    size: "small",
    kind: "organization",
  },
];

export const supportScenarios: SupportScenario[] = [
  {
    id: "order-tracking",
    title: "Order Tracking",
    inquiry: "Customer asks for the status of order #48291 after a delayed carrier scan.",
    topic: "Orders / shipping keywords detected",
    routing: "Matched → Orders team",
    handoff: "Assignee Jordan Lee with tracking context and an internal note",
    outcome: "Customer receives a clear delivery update; thread stays open until confirmed",
  },
  {
    id: "billing-issue",
    title: "Billing Issue",
    inquiry: "Subscriber reports an unexpected renewal charge on the Team plan.",
    topic: "Billing / renewal intent detected",
    routing: "Matched → Billing team",
    handoff: "Assignee Avery Kim reviews cancellation window and plan history",
    outcome: "Billing clarifies next steps; resolution tracked in Insights",
  },
  {
    id: "technical-support",
    title: "Technical Support",
    inquiry: "User hits an SSO login loop on mobile while desktop works normally.",
    topic: "Technical / SSO symptoms detected",
    routing: "Matched → Technical team",
    handoff: "Escalation note prepared; ownership confirmed by Technical",
    outcome: "Specialist investigates repro steps; General Triage unused on match",
  },
];

export const finalCta = {
  headline: "See how support feels when routing is calm and clear",
  description:
    "Explore the interactive workspace preview, switch themes, and walk through sample conversations—entirely local, with nothing sent.",
  cta: { label: "Explore the workspace", href: homeAnchors.workspace },
} as const;
