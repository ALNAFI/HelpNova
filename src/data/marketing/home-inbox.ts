import { faqItems } from "@/data/marketing/faq";
import { routes } from "@/config/routes";

export type InboxHomeConversation = {
  id: string;
  scenario: "Order Tracking" | "Billing Issue" | "Technical Support";
  customer: string;
  email: string;
  subject: string;
  preview: string;
  channel: "Email" | "Chat" | "Social";
  status: "Open" | "Resolved";
  priority: "Low" | "Medium" | "High";
  tags: string[];
  team: string;
  assignee: string;
  messages: {
    id: string;
    author: string;
    role: "customer" | "agent" | "note";
    body: string;
    time: string;
  }[];
  context: string;
};

export const inboxHomeHero = {
  eyebrow: "THE FUTURE OF SHARED CONVERSATIONS",
  title: "One inbox. Every conversation. A clearer way forward.",
  description:
    "Explore a shared workspace concept where customer conversations, team assignments, and useful context come together.",
  primaryCta: { label: "Explore Interactive Demo", href: routes.demo.href },
  secondaryCta: {
    label: "Discover Shared Inbox",
    href: routes.inbox.href,
  },
} as const;

export const inboxHomeConversations: InboxHomeConversation[] = [
  {
    id: "ih-order",
    scenario: "Order Tracking",
    customer: "Maya Chen",
    email: "maya.chen@example.com",
    subject: "Where is order #48291?",
    preview: "Hi—my package still shows in transit. Can you check the status?",
    channel: "Email",
    status: "Open",
    priority: "Medium",
    tags: ["orders", "shipping"],
    team: "Orders",
    assignee: "Jordan Lee",
    context:
      "Order #48291 · Carrier scan delayed · Tracking HN-48291-CA available for the Orders team.",
    messages: [
      {
        id: "ih-o1",
        author: "Maya Chen",
        role: "customer",
        body: "Hi—my package for order #48291 still shows in transit. Can you check the status?",
        time: "09:14",
      },
      {
        id: "ih-o2",
        author: "HelpNova",
        role: "note",
        body: "Internal note: Carrier scan delayed 18 hours. Keep tracking linked for Orders.",
        time: "09:16",
      },
      {
        id: "ih-o3",
        author: "Jordan Lee",
        role: "agent",
        body: "Thanks for reaching out, Maya. I can see a delayed scan—I'll confirm the updated delivery window shortly.",
        time: "09:18",
      },
    ],
  },
  {
    id: "ih-billing",
    scenario: "Billing Issue",
    customer: "Sam Rivera",
    email: "sam.r@example.com",
    subject: "Unexpected renewal charge",
    preview: "I was charged today but thought I cancelled last month.",
    channel: "Chat",
    status: "Open",
    priority: "High",
    tags: ["billing", "renewal"],
    team: "Billing",
    assignee: "Avery Kim",
    context:
      "Team plan renewed this morning · Cancellation request logged 28 days ago but not confirmed.",
    messages: [
      {
        id: "ih-b1",
        author: "Sam Rivera",
        role: "customer",
        body: "I was charged today for a renewal, but I thought I cancelled last month. Can you help?",
        time: "10:02",
      },
      {
        id: "ih-b2",
        author: "Avery Kim",
        role: "agent",
        body: "Happy to help. I see the Team plan renewed this morning—I'll walk through the cancellation window with you.",
        time: "10:04",
      },
      {
        id: "ih-b3",
        author: "HelpNova",
        role: "note",
        body: "Internal note: Cancellation request logged but not confirmed. Billing to verify before refund guidance.",
        time: "10:05",
      },
    ],
  },
  {
    id: "ih-tech",
    scenario: "Technical Support",
    customer: "Priya Nair",
    email: "priya.n@example.com",
    subject: "SSO login loop on mobile",
    preview: "Signing in with SSO keeps bouncing me back to the login screen.",
    channel: "Social",
    status: "Resolved",
    priority: "High",
    tags: ["technical", "sso"],
    team: "Technical",
    assignee: "Casey Brooks",
    context:
      "iOS WebView cookie issue · Desktop works · Matches known SSO sample pattern.",
    messages: [
      {
        id: "ih-t1",
        author: "Priya Nair",
        role: "customer",
        body: "Signing in with SSO on iOS keeps bouncing me back to the login screen. Desktop works fine.",
        time: "11:21",
      },
      {
        id: "ih-t2",
        author: "HelpNova",
        role: "note",
        body: "Internal note: Matches known WebView cookie issue. Escalate to Technical if repro confirmed.",
        time: "11:22",
      },
      {
        id: "ih-t3",
        author: "Casey Brooks",
        role: "agent",
        body: "Thanks Priya—we reproduced the loop and shared a temporary workaround while the mobile SSO path is reviewed.",
        time: "11:40",
      },
    ],
  },
];

export const inboxHomeChannels = {
  id: "inbox-channels",
  eyebrow: "Different Channels. One Clear View.",
  title: "Every conversation deserves a place.",
  description:
    "Explore how email, chat, and social inquiries could appear together in a shared support workspace.",
  items: [
    {
      id: "email",
      label: "Email",
      title: "A structured written inquiry",
      description:
        "Longer messages arrive with subject lines and full thread history—ideal for order and account questions.",
      conversationId: "ih-order",
    },
    {
      id: "chat",
      label: "Chat",
      title: "A faster back-and-forth",
      description:
        "Short turns keep momentum while assignment and notes stay visible for the next teammate.",
      conversationId: "ih-billing",
    },
    {
      id: "social",
      label: "Social",
      title: "A public-facing mention",
      description:
        "Illustrative social messages land beside other channels so teams can respond with shared context.",
      conversationId: "ih-tech",
    },
  ],
  notice: "Illustrative channels only · no live email, chat, or social connection.",
} as const;

export const inboxHomeShowcase = {
  id: "inbox-conversations",
  eyebrow: "Inside Every Conversation",
  title: "The full story, not just the latest message.",
  description:
    "Explore how conversation history and relevant context can be presented together in one clear interface.",
  notice: "Read-only marketing preview · no replies are sent.",
} as const;

export const inboxHomeCollaboration = {
  id: "inbox-collaboration",
  eyebrow: "Support Works Better Together",
  title: "Give every conversation a clearer next step.",
  description:
    "Explore how assignment, internal notes, and handoffs can make a shared support workflow easier to follow.",
  concepts: [
    {
      id: "assignment",
      label: "Assignment",
      title: "Place ownership where it belongs",
      description:
        "An Order Tracking inquiry can be illustrated as assigned to the Orders team so the next reply has a clear owner.",
    },
    {
      id: "notes",
      label: "Internal Notes",
      title: "Keep team context private",
      description:
        "Internal notes stay visually distinct from customer replies so teammates can share context without exposing it.",
    },
    {
      id: "handoff",
      label: "Handoff",
      title: "Move responsibility with clarity",
      description:
        "A conversation can travel from General Triage to a specialist team while the thread history stays intact.",
    },
  ],
  notice: "Read-only collaboration preview · no live team is notified.",
} as const;

export const inboxHomeOrganization = {
  id: "inbox-organization",
  eyebrow: "Find Clarity in the Details",
  title: "A little structure changes the whole view.",
  description:
    "See how status, tags, priority, and filters can help organize an illustrative shared inbox.",
  filters: [
    { id: "all", label: "All" },
    { id: "open", label: "Open" },
    { id: "resolved", label: "Resolved" },
  ] as const,
  notice: "Tags and priority are display-only in this concept.",
  emptyTitle: "No conversations match this view",
  emptyDescription:
    "Try another status filter to browse the fictional sample set again.",
} as const;

export const inboxHomeHandoff = {
  id: "inbox-handoff",
  eyebrow: "Where Workflows Meet Conversations",
  title: "From a decision to the right conversation.",
  description:
    "Explore how an illustrative automation rule can connect an incoming inquiry with the appropriate team.",
  stages: [
    {
      id: "inquiry",
      label: "Incoming Inquiry",
      detail: "An Order Tracking question enters the sample workspace.",
    },
    {
      id: "rule",
      label: "Topic Rule",
      detail: "The Order rule checks a predefined topic field.",
    },
    {
      id: "team",
      label: "Team Assignment",
      detail: "Matched destination points toward the Orders team.",
    },
    {
      id: "inbox",
      label: "Shared Inbox",
      detail: "The conversation preview keeps context ready for a teammate.",
    },
  ],
  cta: { label: "Explore Automation", href: routes.automation.href },
  notice: "Illustrative handoff · no automation is executed.",
} as const;

export const inboxHomeInsights = {
  id: "inbox-insights",
  eyebrow: "See the Bigger Picture",
  title: "Clarity for conversations. Perspective for teams.",
  description:
    "Explore how conversation status and team workload can be presented through illustrative support insights.",
  status: [
    { id: "open", label: "Open", value: 34 },
    { id: "resolved", label: "Resolved", value: 94 },
  ],
  workload: [
    { team: "Orders", open: 11 },
    { team: "Billing", open: 8 },
    { team: "Technical", open: 9 },
    { team: "General Triage", open: 4 },
    { team: "Unassigned", open: 2 },
  ],
  resolutionSummary: {
    title: "Resolution overview",
    resolved: 94,
    total: 128,
    rateLabel: "73% illustrative resolution rate",
    note: "Fixed fictional sample · not live operational metrics.",
  },
  cta: { label: "Explore Guided Demo", href: routes.demo.href },
} as const;

export const inboxHomePricingFaq = {
  id: "inbox-pricing-faq",
  eyebrow: "Find Your Way Forward",
  title: "Find your way forward.",
  pricingIntro:
    "Browse three illustrative sample plans. Amounts are concept figures—there is no checkout.",
  pricingCta: { label: "Explore Pricing", href: routes.pricing.href },
  faqTitle: "Questions about this Shared Inbox concept",
  faqCta: { label: "View All FAQs", href: routes.faq.href },
  faqIds: ["inbox-demo", "no-account", "how-demo-works", "demo-storage"] as const,
} as const;

export const inboxHomeFaqItems = inboxHomePricingFaq.faqIds
  .map((id) => faqItems.find((item) => item.id === id))
  .filter((item): item is NonNullable<typeof item> => Boolean(item))
  .map((item) => {
    if (item.id === "inbox-demo") {
      return {
        ...item,
        question: "Is the Shared Inbox connected to real customer channels?",
        answer:
          "No. Conversations on this page are fictional samples for product storytelling. No live email, chat, or social channel is connected.",
      };
    }
    if (item.id === "no-account") {
      return {
        ...item,
        question: "Can I explore conversations without creating an account?",
        answer:
          "Yes. You can browse this Shared Inbox homepage and open the Guided Demo without signing in. Login and Sign Up remain UI simulations.",
      };
    }
    if (item.id === "how-demo-works") {
      return {
        ...item,
        question: "Are internal notes visible to customers?",
        answer:
          "In this concept, internal notes are visually distinct and marked as team-only. They illustrate private context and are never presented as customer-facing replies.",
      };
    }
    return {
      ...item,
      question: "Does the demo send real replies?",
      answer:
        "No. Replies and notes in the Guided Demo stay in your browser session. Nothing is transmitted as a real ticket or message.",
    };
  });

export const inboxHomeCta = {
  id: "inbox-final-cta",
  eyebrow: "Every Conversation Has a Next Chapter",
  title: "Bring every conversation into focus.",
  description:
    "Explore how shared context, team collaboration, and thoughtful workflows can come together in one connected experience.",
  primaryCta: { label: "Explore Interactive Demo", href: routes.demo.href },
  secondaryCta: {
    label: "Discover Shared Inbox",
    href: routes.inbox.href,
  },
} as const;

export const inboxHomeFooter = {
  statement: "Better conversations begin with connection.",
  supporting:
    "Explore a more thoughtful way to bring conversations, context, and teams together.",
  primaryCta: {
    label: "Explore Interactive Demo",
    href: routes.demo.href,
  },
  secondaryCta: {
    label: "Discover Shared Inbox",
    href: routes.inbox.href,
  },
} as const;

export const inboxHomeSections = [
  { id: "inbox-hero", label: "01", name: "Hero" },
  { id: inboxHomeChannels.id, label: "02", name: "Channels" },
  { id: inboxHomeShowcase.id, label: "03", name: "Threads" },
  { id: inboxHomeCollaboration.id, label: "04", name: "Team" },
  { id: inboxHomeOrganization.id, label: "05", name: "Organize" },
  { id: inboxHomeHandoff.id, label: "06", name: "Handoff" },
  { id: inboxHomeInsights.id, label: "07", name: "Insights" },
  { id: inboxHomePricingFaq.id, label: "08", name: "Plans" },
  { id: inboxHomeCta.id, label: "09", name: "Next" },
] as const;
