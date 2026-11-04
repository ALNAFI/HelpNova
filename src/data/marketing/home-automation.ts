import { allIntegrations } from "@/data/marketing/integrations";
import { faqItems } from "@/data/marketing/faq";
import { routes } from "@/config/routes";

export const automationHomeHero = {
  eyebrow: "THE ART OF AUTOMATION",
  titleLead: "Turn every trigger into",
  titleAccent: "something extraordinary.",
  description:
    "Explore a more connected approach to customer support, where incoming questions, thoughtful routing, and team handoffs become part of one clear workflow.",
  microcopy: "From the first inquiry to the next meaningful action.",
  primaryCta: { label: "Explore Interactive Demo", href: routes.demo.href },
  secondaryCta: {
    label: "Discover Automation",
    href: routes.automation.href,
  },
} as const;

export const automationHomeUseCases = {
  id: "automation-use-cases",
  title: "The right next step changes everything.",
  description:
    "Explore how topic recognition, organization, and escalation can shape a more understandable support workflow.",
  items: [
    {
      id: "routing",
      label: "Routing",
      title: "Guide the conversation",
      body: "Guide a conversation toward the team best suited to handle it.",
      detail:
        "In this sample, an Order Tracking topic points toward the Orders team—without executing a live rule.",
    },
    {
      id: "tagging",
      label: "Tagging",
      title: "Make the topic visible",
      body: "Make the topic and context easier to recognize.",
      detail:
        "Display-only tags such as orders and shipping help the next teammate understand the inquiry at a glance.",
    },
    {
      id: "escalation",
      label: "Escalation",
      title: "Move toward attention",
      body: "Show how an inquiry could move toward additional attention when needed.",
      detail:
        "When a topic falls outside the selected rule, General Triage remains a valid destination—not an error state.",
    },
  ],
} as const;

export const automationHomeProcess = {
  id: "automation-process",
  title: "Every workflow has a beginning, a decision, and a direction.",
  stages: [
    {
      id: "trigger",
      number: "01",
      label: "Trigger",
      title: "An incoming inquiry starts the example workflow.",
      body: "A fictional customer message enters the sample. Nothing is transmitted as a real ticket.",
    },
    {
      id: "condition",
      number: "02",
      label: "Condition",
      title: "A selected rule evaluates the inquiry topic.",
      body: "The Order rule checks a predefined topic field—not an AI classification of free text.",
    },
    {
      id: "action",
      number: "03",
      label: "Action",
      title: "The illustrated workflow points toward the appropriate team.",
      body: "Matched routes to Orders. Otherwise routes to General Triage. Both destinations are valid next steps.",
    },
  ],
} as const;

export const automationHomeBranching = {
  id: "automation-branching",
  title: "One condition. Two possible directions.",
  instruction: "Select a node to inspect this read-only Order rule.",
  nodes: [
    {
      id: "inquiry",
      label: "New Inquiry",
      role: "Starts the illustrated workflow with a customer question.",
    },
    {
      id: "condition",
      label: "Topic Condition",
      role: "Checks whether the topic equals Order Tracking.",
    },
    {
      id: "matched",
      label: "Matched",
      role: "Taken when the topic matches the Order rule.",
    },
    {
      id: "otherwise",
      label: "Otherwise",
      role: "Taken when the topic falls outside the Order rule.",
    },
    {
      id: "orders",
      label: "Orders",
      role: "Receives inquiries that match the Order rule.",
    },
    {
      id: "triage",
      label: "General Triage",
      role: "Receives inquiries that follow the fallback branch.",
    },
  ],
  topics: [
    {
      id: "order-tracking",
      label: "Order Tracking",
      branch: "matched" as const,
      team: "Orders",
    },
    {
      id: "billing-issue",
      label: "Billing Issue",
      branch: "otherwise" as const,
      team: "General Triage",
    },
    {
      id: "technical-support",
      label: "Technical Support",
      branch: "otherwise" as const,
      team: "General Triage",
    },
  ],
} as const;

export const automationHomeHandoff = {
  id: "automation-handoff",
  title: "A clear handoff makes the next conversation easier.",
  description:
    "See how an illustrative routing decision can connect with a shared inbox and give the receiving team useful context.",
  customer: "Maya Chen",
  subject: "Where is order #48291?",
  message:
    "My order was due yesterday, but the tracking page hasn’t changed. Can you check what happened?",
  note: "The customer has already checked the tracking page. Review the carrier’s latest scan before replying.",
  assignment: "Assigned to Orders",
  stages: [
    { id: "routing", label: "Routing", detail: "Order Tracking matches the Order rule." },
    { id: "assignment", label: "Assignment", detail: "Orders is shown as the destination team." },
    { id: "inbox", label: "Inbox context", detail: "The thread keeps the question and team-only note together." },
  ],
  cta: { label: "Explore Shared Inbox", href: routes.inbox.href },
} as const;

export const automationHomeIntegrations = {
  id: "automation-integrations",
  title: "Imagine the connections around every workflow.",
  description:
    "Explore how familiar business tools can fit into a connected support experience through illustrative integration concepts.",
  notice: "These names describe examples—not live connections.",
  items: allIntegrations.slice(0, 8).map((item) => ({
    id: item.id,
    name: item.name,
    category: item.category,
    relationship: item.description,
  })),
  cta: { label: "Explore Integrations", href: routes.integrations.href },
} as const;

export const automationHomeOutcomes = {
  id: "automation-outcomes",
  title: "See the structure behind a smoother workflow.",
  description:
    "Explore what thoughtful routing, visible context, and connected handoffs can illustrate.",
  outcomes: [
    {
      id: "routing",
      title: "Clearer Routing",
      body: "Understand how an inquiry can move toward the right team.",
    },
    {
      id: "context",
      title: "Better Context",
      body: "Keep the topic and relevant information visible throughout the example journey.",
    },
    {
      id: "visibility",
      title: "More Visible Workflows",
      body: "Follow each stage from inquiry to assignment.",
    },
  ],
  fragmentedLabel: "Fragmented View",
  connectedLabel: "Connected View",
} as const;

export const automationHomePricingFaq = {
  id: "automation-pricing-faq",
  title: "Explore the possibilities.",
  pricingIntro:
    "Browse three illustrative sample plans. Amounts are editable concept figures—there is no checkout.",
  pricingCta: { label: "Explore Pricing", href: routes.pricing.href },
  faqTitle: "Questions about this automation concept",
  faqCta: { label: "View All FAQs", href: routes.faq.href },
  faqIds: ["automation-demo", "no-account", "integrations-live", "how-demo-works"] as const,
} as const;

export const automationHomeFaqItems = automationHomePricingFaq.faqIds
  .map((id) => faqItems.find((item) => item.id === id))
  .filter((item): item is NonNullable<typeof item> => Boolean(item))
  .map((item) => {
    if (item.id === "automation-demo") {
      return {
        ...item,
        question: "Is automation connected to real customer inquiries?",
        answer:
          "No. The workflows on this page and in the Guided Demo are local illustrations. They do not receive, send, or execute real customer tickets.",
      };
    }
    if (item.id === "no-account") {
      return {
        ...item,
        question: "Can I explore routing without creating an account?",
        answer:
          "Yes. You can browse this Automation Universe page and open the Guided Demo without signing in. Login and Sign Up remain UI simulations.",
      };
    }
    if (item.id === "integrations-live") {
      return {
        ...item,
        question: "Are integrations active in the demo?",
        answer:
          "No. Integration names are illustrative examples only. There is no OAuth, Connect flow, or live third-party synchronization.",
      };
    }
    return {
      ...item,
      question: "What happens when a rule does not match?",
      answer:
        "In the sample Order rule, unmatched topics follow the Otherwise branch to General Triage. That destination is a valid handoff—not an error.",
    };
  });

export const automationHomeCta = {
  id: "automation-final-cta",
  title: "The next great workflow starts here.",
  description:
    "Explore a world where conversations, decisions, and team handoffs come together in one thoughtful experience.",
  primaryCta: { label: "Explore Interactive Demo", href: routes.demo.href },
  secondaryCta: { label: "Discover All Features", href: routes.features.href },
} as const;

export const automationHomeFooter = {
  statement: "Every great workflow starts with a connection.",
  supporting:
    "Explore how conversations, decisions, and teams can come together through thoughtfully designed automation.",
  primaryCta: {
    label: "Explore Interactive Demo",
    href: routes.demo.href,
  },
  secondaryCta: {
    label: "Discover Automation",
    href: routes.automation.href,
  },
} as const;

export const automationHomeSections = [
  { id: "automation-hero", label: "01" },
  { id: automationHomeUseCases.id, label: "02" },
  { id: automationHomeProcess.id, label: "03" },
  { id: automationHomeBranching.id, label: "04" },
  { id: automationHomeHandoff.id, label: "05" },
  { id: automationHomeIntegrations.id, label: "06" },
  { id: automationHomeOutcomes.id, label: "07" },
  { id: automationHomePricingFaq.id, label: "08" },
  { id: automationHomeCta.id, label: "09" },
] as const;
