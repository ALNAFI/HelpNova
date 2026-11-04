import type { CaseStudyDetail } from "@/types/editorial";

export const caseStudyDetails: CaseStudyDetail[] = [
  {
    slug: "order-tracking",
    context: [
      "This illustrative ecommerce scenario explores how a delivery question can move from a shared inbox into a readable order workflow.",
      "Nothing here is a real customer account or measured business outcome. It is a product-concept story for exploring HelpNova's connected surfaces.",
    ],
    inquiry: {
      title: "Sample inquiry",
      customer: "Alex Rivera",
      channel: "Email",
      message:
        "Hi — my order #HN-20418 still shows processing. Can you tell me when it might ship?",
    },
    workflow: {
      title: "Example workflow",
      steps: [
        {
          label: "New inquiry",
          detail: "The message enters the shared inbox with Open status.",
        },
        {
          label: "Topic condition",
          detail: "An order-related rule looks for delivery and tracking language.",
        },
        {
          label: "Matched path",
          detail: "The conversation is routed toward the Orders team.",
        },
        {
          label: "Otherwise fallback",
          detail: "Unclear topics would move to General Triage instead.",
        },
      ],
    },
    handoff: {
      title: "Team handoff",
      team: "Orders",
      note: "Customer is asking about HN-20418 shipping status. Confirm carrier scan before replying.",
      summary: [
        "Assignment makes ownership explicit for the Orders team.",
        "An internal note keeps context close to the thread without cluttering the customer view.",
        "Insights can reflect the same local conversation state after the handoff.",
      ],
    },
    illustrates: [
      "How a sample order question can stay organized in one inbox.",
      "How Match · Otherwise routing can point toward a specialist team.",
      "How internal notes support a quieter handoff.",
      "How illustrative insights stay connected to the same local state.",
    ],
    relatedSlugs: ["billing-support", "technical-support"],
  },
  {
    slug: "billing-support",
    context: [
      "This fictional billing scenario shows how a sensitive inquiry can stay readable while ownership, notes, and status remain clear.",
      "The example is illustrative only. It does not represent a live billing system, payment provider, or verified customer result.",
    ],
    inquiry: {
      title: "Sample inquiry",
      customer: "Jordan Lee",
      channel: "Chat",
      message:
        "I was charged twice for last month's invoice. Can someone on billing help me understand what happened?",
    },
    workflow: {
      title: "Example workflow",
      steps: [
        {
          label: "New inquiry",
          detail: "The chat conversation appears in the shared inbox.",
        },
        {
          label: "Topic condition",
          detail: "A billing rule looks for invoice and charge-related language.",
        },
        {
          label: "Matched path",
          detail: "The conversation is assigned to the Billing team.",
        },
        {
          label: "Status and notes",
          detail: "Teammates keep private context while the customer thread stays clean.",
        },
      ],
    },
    handoff: {
      title: "Team handoff",
      team: "Billing",
      note: "Possible duplicate charge mention. Review the latest invoice summary before the next reply.",
      summary: [
        "Billing ownership is visible as soon as the rule matches.",
        "Internal notes keep collaboration quiet and practical.",
        "Open and Resolved status help the team manage attention without inventing metrics.",
      ],
    },
    illustrates: [
      "How a sample billing inquiry can be routed with a clear topic condition.",
      "How assignment and notes support careful collaboration.",
      "How conversation status keeps the queue scannable.",
      "How the same illustrative state can later appear in Insights.",
    ],
    relatedSlugs: ["order-tracking", "technical-support"],
  },
  {
    slug: "technical-support",
    context: [
      "This illustrative technical-support story explores how an issue report can move from intake to a specialist team with context preserved.",
      "It is a conceptual walkthrough for HelpNova's demo surfaces—not a claim about real incident response or measured resolution improvements.",
    ],
    inquiry: {
      title: "Sample inquiry",
      customer: "Sam Okonkwo",
      channel: "Email",
      message:
        "Our dashboard widget stopped loading after yesterday's update. We can still sign in, but the panel stays blank.",
    },
    workflow: {
      title: "Example workflow",
      steps: [
        {
          label: "New inquiry",
          detail: "The technical report enters the shared inbox as Open.",
        },
        {
          label: "Topic condition",
          detail: "A Technical rule looks for product-behavior and error language.",
        },
        {
          label: "Matched path",
          detail: "The conversation is routed to the Technical team.",
        },
        {
          label: "Connected insights",
          detail: "Local insights can reflect assignment and recent activity from the same state.",
        },
      ],
    },
    handoff: {
      title: "Team handoff",
      team: "Technical",
      note: "Blank dashboard panel after update. Ask for browser details before escalating further.",
      summary: [
        "Technical ownership is explicit after the matched route.",
        "Notes preserve diagnostic context for the next teammate.",
        "The illustrative insights view stays coherent because it reads the same conversations.",
      ],
    },
    illustrates: [
      "How a sample technical issue can be identified by topic.",
      "How routing can hand work to a specialist team.",
      "How internal notes protect continuity during review.",
      "How inbox, automation, and insights can stay connected in a local demo.",
    ],
    relatedSlugs: ["order-tracking", "billing-support"],
  },
];

export function getCaseStudyDetail(slug: string) {
  return caseStudyDetails.find((detail) => detail.slug === slug);
}
