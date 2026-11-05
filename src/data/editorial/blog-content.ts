import type { BlogArticleBody } from "@/types/editorial";

export const blogArticleBodies: BlogArticleBody[] = [
  {
    slug: "better-support-handoffs",
    introduction: [
      "A handoff is one of the most delicate moments in customer support. The conversation already has history, emotion, and unfinished work. When ownership changes, customers should feel continuity—not a restart.",
      "This guide explores how teams can design calmer handoffs using shared context, clear ownership, and a visible next step. The ideas are illustrative and meant for product exploration, not operational claims.",
    ],
    sections: [
      {
        id: "why-handoffs-feel-broken",
        title: "Why handoffs often feel broken",
        blocks: [
          {
            type: "paragraph",
            text: "Most friction appears when context stays trapped with the previous owner. The customer explains the same issue twice. The new teammate reconstructs the story from fragments. Trust erodes in the gap between those moments.",
          },
          {
            type: "list",
            items: [
              "The conversation history is incomplete or hard to scan.",
              "Ownership changes without a clear reason or next action.",
              "Internal thinking is mixed into customer-facing replies.",
              "No one confirms what already happened and what comes next.",
            ],
          },
        ],
      },
      {
        id: "keep-context-visible",
        title: "Keep context visible at the moment of transfer",
        blocks: [
          {
            type: "paragraph",
            text: "A calm handoff starts with a shared view of the thread: the customer's latest message, prior replies, tags, and any relevant notes. When that information is already assembled, the receiving teammate can continue instead of reconstructing.",
          },
          {
            type: "callout",
            title: "Design cue",
            text: "Treat context as part of the handoff itself—not something the next person has to hunt for after they accept the conversation.",
          },
          {
            type: "diagram",
            kind: "handoff",
            caption:
              "An illustrative path from automation to specialist with context carried forward.",
          },
        ],
      },
      {
        id: "make-ownership-explicit",
        title: "Make ownership explicit",
        blocks: [
          {
            type: "paragraph",
            text: "Customers and teammates both benefit when ownership is obvious. Assignment should answer three questions: who is responsible now, why the conversation moved, and what the next expected action is.",
          },
          {
            type: "list",
            ordered: true,
            items: [
              "Capture the reason for the handoff in a short internal note.",
              "Assign a clear owner or team before the transfer is complete.",
              "Leave a customer-facing update when the wait or next step changes.",
            ],
          },
        ],
      },
      {
        id: "protect-the-customer-thread",
        title: "Protect the customer thread",
        blocks: [
          {
            type: "paragraph",
            text: "Internal collaboration should stay visually distinct from customer replies. Private notes help teams discuss edge cases, escalation paths, and sensitive details without cluttering the conversation the customer sees.",
          },
          {
            type: "quote",
            text: "A handoff should feel continuous, not like starting over.",
          },
        ],
      },
      {
        id: "close-the-loop",
        title: "Close the loop after the transfer",
        blocks: [
          {
            type: "paragraph",
            text: "Once a specialist owns the conversation, the thread still needs a gentle landing: acknowledgement, a next step, and eventual resolution. The quality of the handoff shows up in how little the customer has to restate.",
          },
        ],
      },
    ],
    conclusion: [
      "Calmer handoffs are less about speed and more about continuity. Shared context, explicit ownership, and a protected customer thread create a quieter path from first inquiry to thoughtful resolution.",
      "In HelpNova's guided demo, you can explore how assignment, notes, and activity come together as an illustrative workflow—without claiming a live support system.",
    ],
    relatedSlugs: [
      "internal-notes-collaboration",
      "organizing-shared-inbox",
      "topic-based-routing",
    ],
  },
  {
    slug: "organizing-shared-inbox",
    introduction: [
      "A shared inbox works when every message has a place, an owner, and a next action. Without that structure, channels blur together and attention scatters across unfinished threads.",
      "This article looks at practical ways to organize conversations status, ownership, and filters—so teams can stay oriented. The examples are conceptual and intended for product exploration.",
    ],
    sections: [
      {
        id: "one-place-many-channels",
        title: "One place for many channels",
        blocks: [
          {
            type: "paragraph",
            text: "Email, chat, and social messages often arrive with different shapes but the same underlying need: someone should acknowledge, understand, and respond. A shared inbox gathers those conversations into one readable surface.",
          },
          {
            type: "diagram",
            kind: "inbox",
            caption:
              "An illustrative shared inbox with filters for All, Open, and Resolved conversations.",
          },
        ],
      },
      {
        id: "status-creates-rhythm",
        title: "Status creates rhythm",
        blocks: [
          {
            type: "paragraph",
            text: "Open and Resolved are simple states, but they create a useful rhythm. Open conversations need attention. Resolved conversations preserve history without crowding the active queue.",
          },
          {
            type: "list",
            items: [
              "Open means work is still in progress or waiting.",
              "Resolved means the customer-facing loop is complete for now.",
              "Reopening should be intentional when a conversation returns.",
            ],
          },
        ],
      },
      {
        id: "ownership-and-assignment",
        title: "Ownership and assignment",
        blocks: [
          {
            type: "paragraph",
            text: "Filters help, but ownership decides who moves. Assigning a conversation to Orders, Billing, Technical, or General Triage turns a shared stream into accountable work.",
          },
          {
            type: "callout",
            title: "Keep tags readable",
            text: "Tags and priority can support scanning, but they work best as display cues—clear, restrained, and never a substitute for ownership.",
          },
        ],
      },
      {
        id: "search-and-focus",
        title: "Search and focus without noise",
        blocks: [
          {
            type: "paragraph",
            text: "Search should help teammates find a customer, subject, or fragment of a thread quickly. Combined with status filters, it keeps attention on the conversations that need a decision now.",
          },
          {
            type: "quote",
            text: "Shared inboxes work best when teams can see the same conversation state.",
          },
        ],
      },
      {
        id: "design-for-scanability",
        title: "Design for scanability",
        blocks: [
          {
            type: "paragraph",
            text: "A good inbox list rewards scanning: customer name, subject, preview, channel, and status should be readable at a glance. Detail belongs in the thread view, not in a crowded list row.",
          },
        ],
      },
    ],
    conclusion: [
      "Organizing a shared inbox is less about collecting every channel and more about making ownership and status unmistakable. When teammates can scan, filter, and open the right thread, conversations stay calmer.",
      "HelpNova's local demo illustrates how inbox filters, assignment, and thread context can sit together in one connected workspace.",
    ],
    relatedSlugs: [
      "better-support-handoffs",
      "internal-notes-collaboration",
      "meaningful-support-metrics",
    ],
  },
  {
    slug: "topic-based-routing",
    introduction: [
      "Topic-based routing helps inquiries land with the team best prepared to continue. The strongest designs stay readable: a trigger, a condition, a matched path, and a graceful Otherwise.",
      "This article walks through that pattern as an illustrative workflow concept—useful for exploring automation ideas without claiming live production behavior.",
    ],
    sections: [
      {
        id: "start-with-a-readable-flow",
        title: "Start with a readable flow",
        blocks: [
          {
            type: "paragraph",
            text: "Automation is easier to trust when the path can be explained out loud. New Inquiry leads to a topic condition. Matched inquiries go to a specialist team. Everything else goes to General Triage.",
          },
          {
            type: "diagram",
            kind: "routing",
            caption:
              "An illustrative Match · Otherwise branch for order, billing, or technical topics.",
          },
        ],
      },
      {
        id: "choose-topics-carefully",
        title: "Choose topics carefully",
        blocks: [
          {
            type: "paragraph",
            text: "Order tracking, billing, and technical support are common starting points because they map to distinct ownership. The goal is not infinite branching—it is enough clarity to route with confidence.",
          },
          {
            type: "list",
            items: [
              "Keep topic names close to how customers describe issues.",
              "Prefer a small set of durable topics over fragile edge cases.",
              "Document what happens when a topic is unclear.",
            ],
          },
        ],
      },
      {
        id: "matched-and-otherwise",
        title: "Matched and Otherwise",
        blocks: [
          {
            type: "paragraph",
            text: "The Matched path should feel decisive. The Otherwise path should feel safe. Unexpected inquiries still need a destination, even when no topic condition fits cleanly.",
          },
          {
            type: "callout",
            title: "Fallback is a feature",
            text: "A clear Otherwise route to General Triage prevents silent dead ends and keeps the workflow honest about uncertainty.",
          },
        ],
      },
      {
        id: "connect-routing-to-inbox",
        title: "Connect routing to the inbox",
        blocks: [
          {
            type: "paragraph",
            text: "Routing only matters if the resulting assignment appears in the shared inbox. The simulation should update the same conversation state teammates already use—assignment, activity, and next steps.",
          },
          {
            type: "quote",
            text: "Routing is most useful when conditions stay readable.",
          },
        ],
      },
      {
        id: "simulate-before-you-scale",
        title: "Simulate before you scale",
        blocks: [
          {
            type: "paragraph",
            text: "Running a local simulation helps teams inspect the path, outcome, and trace without pretending the rule is already live. Replay should show the same decision path clearly—not invent duplicate events.",
          },
        ],
      },
    ],
    conclusion: [
      "Thoughtful topic routing is a clarity exercise. Readable conditions, a reliable Otherwise path, and a connection back to inbox ownership keep automation grounded.",
      "In the HelpNova demo, Run Simulation and Replay are designed to visualize an illustrative outcome so teams can explore the idea before any real integration work.",
    ],
    relatedSlugs: [
      "better-support-handoffs",
      "explore-before-integrations",
      "meaningful-support-metrics",
    ],
  },
  {
    slug: "meaningful-support-metrics",
    introduction: [
      "Support metrics are most useful when they help a team notice what needs attention. Volume alone is not a story. Open work, resolution patterns, and assignment balance together create a clearer picture.",
      "This guide focuses on meaningful, illustrative signals—without inventing benchmarks, ROI claims, or measured customer outcomes.",
    ],
    sections: [
      {
        id: "start-with-live-state",
        title: "Start with live conversation state",
        blocks: [
          {
            type: "paragraph",
            text: "A useful dashboard begins with the current workspace: total conversations, open threads, resolved threads, and assignment coverage. Those numbers are grounded in what the team can act on now.",
          },
          {
            type: "diagram",
            kind: "metrics",
            caption:
              "An illustrative snapshot of open work, resolution, and team workload signals.",
          },
        ],
      },
      {
        id: "read-workload-carefully",
        title: "Read workload carefully",
        blocks: [
          {
            type: "paragraph",
            text: "Open workload by team—including unassigned—helps spot imbalance. The point is not to create pressure; it is to notice where conversations are waiting without an owner.",
          },
          {
            type: "list",
            items: [
              "Unassigned open conversations need a destination.",
              "Team load should be compared against current open work.",
              "Recent activity explains what changed since the last look.",
            ],
          },
        ],
      },
      {
        id: "resolution-rate-in-context",
        title: "Resolution rate in context",
        blocks: [
          {
            type: "paragraph",
            text: "Resolution rate is more informative beside open volume than on its own. A rising resolved count means little if open work is growing faster, and the reverse can be equally misleading.",
          },
          {
            type: "callout",
            title: "Avoid vanity metrics",
            text: "If a number cannot change a decision this week, it may not belong on the primary surface.",
          },
        ],
      },
      {
        id: "separate-live-and-historical",
        title: "Separate live and historical views",
        blocks: [
          {
            type: "paragraph",
            text: "Live state answers what needs attention now. Historical sample volume answers how patterns move over a selected window. Keeping those views distinct prevents one chart from pretending to be the whole story.",
          },
          {
            type: "quote",
            text: "Metrics should illuminate decisions, not create noise.",
          },
        ],
      },
    ],
    conclusion: [
      "Meaningful support metrics are calm, connected, and actionable. They describe open work, ownership, and resolution in language a team can use immediately.",
      "HelpNova's Insights view in the guided demo derives illustrative KPIs from the same local conversation state as Inbox and Automation—so the story stays coherent.",
    ],
    relatedSlugs: [
      "organizing-shared-inbox",
      "topic-based-routing",
      "better-support-handoffs",
    ],
  },
  {
    slug: "internal-notes-collaboration",
    introduction: [
      "Internal notes give teams a place to think together without rewriting the customer's conversation. They keep collaboration close to the thread while protecting what the customer sees.",
      "This article explores how private notes support quieter handoffs, clearer ownership, and more careful replies—as an illustrative product pattern.",
    ],
    sections: [
      {
        id: "why-notes-belong-in-the-thread",
        title: "Why notes belong in the thread",
        blocks: [
          {
            type: "paragraph",
            text: "Context decays when it lives in a separate chat or a forgotten document. Notes attached to the conversation keep the next teammate inside the same story, with less reconstruction and fewer side channels.",
          },
          {
            type: "diagram",
            kind: "notes",
            caption:
              "An illustrative thread with a visually distinct internal note beside customer messages.",
          },
        ],
      },
      {
        id: "make-notes-visually-distinct",
        title: "Make notes visually distinct",
        blocks: [
          {
            type: "paragraph",
            text: "Customers should never confuse a private note with a reply. Visual distinction—tone, label, and placement—protects trust and keeps the customer-facing timeline readable.",
          },
          {
            type: "list",
            items: [
              "Use a clear Internal Note label.",
              "Separate note styling from customer and agent replies.",
              "Keep note content practical: context, decisions, next steps.",
            ],
          },
        ],
      },
      {
        id: "write-notes-for-the-next-person",
        title: "Write notes for the next person",
        blocks: [
          {
            type: "paragraph",
            text: "A useful note anticipates the teammate who opens the thread next. What was already tried? What is still uncertain? What should happen before the next customer reply?",
          },
          {
            type: "callout",
            title: "A simple note pattern",
            text: "Situation → What we know → Suggested next step. Short notes travel farther than exhaustive ones.",
          },
        ],
      },
      {
        id: "notes-and-handoffs",
        title: "Notes and handoffs",
        blocks: [
          {
            type: "paragraph",
            text: "When ownership changes, a note can carry the reason for the transfer without exposing internal process in the customer timeline. That keeps the reply channel clean and the collaboration channel close.",
          },
          {
            type: "quote",
            text: "Clarity in notes often shows up as clarity in replies.",
          },
        ],
      },
    ],
    conclusion: [
      "Internal notes are a quiet collaboration layer. Used well, they reduce repetition, protect the customer view, and make handoffs feel intentional.",
      "In HelpNova's local inbox demo, replies and internal notes are deliberately distinct so teams can explore that separation without sending anything to a real customer.",
    ],
    relatedSlugs: [
      "better-support-handoffs",
      "organizing-shared-inbox",
      "explore-before-integrations",
    ],
  },
  {
    slug: "explore-before-integrations",
    introduction: [
      "Integrations are tempting to connect early. A more useful first step is understanding the workflow you want: how conversations move, how routing decides ownership, and which insights matter.",
      "This guide makes the case for exploring a local demo before wiring external tools—so integration choices stay intentional and grounded.",
    ],
    sections: [
      {
        id: "see-the-connected-journey",
        title: "See the connected journey first",
        blocks: [
          {
            type: "paragraph",
            text: "Inbox, automation, and insights are easier to evaluate when they share one local state. Exploring that journey reveals which moments need integrations and which moments need clearer product design.",
          },
          {
            type: "diagram",
            kind: "explore",
            caption:
              "An illustrative local journey across Inbox, Automation, and Insights before external connections.",
          },
        ],
      },
      {
        id: "decide-what-integrations-are-for",
        title: "Decide what integrations are for",
        blocks: [
          {
            type: "paragraph",
            text: "An integration should support a specific workflow moment: bringing order context into a conversation, notifying a team channel, or reflecting status elsewhere. Without that moment, the connection becomes decoration.",
          },
          {
            type: "list",
            ordered: true,
            items: [
              "Map the inquiry path you care about most.",
              "Note where external context would reduce repetition.",
              "Only then shortlist illustrative integrations to explore later.",
            ],
          },
        ],
      },
      {
        id: "keep-expectations-honest",
        title: "Keep expectations honest",
        blocks: [
          {
            type: "paragraph",
            text: "HelpNova's concept experience uses local simulations. Forms, demos, and integration cards are illustrative. That honesty helps teams evaluate ideas without mistaking a UI concept for a live platform.",
          },
          {
            type: "callout",
            title: "Product boundary",
            text: "Nothing in the guided demo transmits tickets, creates accounts, or completes OAuth. Exploration stays local by design.",
          },
        ],
      },
      {
        id: "carry-learning-into-later-choices",
        title: "Carry learning into later choices",
        blocks: [
          {
            type: "paragraph",
            text: "After a team has tried assignment, notes, routing simulation, and insights, integration discussions become more precise. You are no longer guessing which surfaces matter—you have already walked them.",
          },
          {
            type: "quote",
            text: "Explore first, then decide what belongs in your stack.",
          },
        ],
      },
    ],
    conclusion: [
      "Exploring workflows before integrations protects clarity. It keeps the conversation about outcomes and ownership ahead of connectors and credentials.",
      "When you are ready, HelpNova's Integrations page and guided demo remain available as illustrative places to continue that exploration.",
    ],
    relatedSlugs: [
      "topic-based-routing",
      "organizing-shared-inbox",
      "meaningful-support-metrics",
    ],
  },
];

export function getBlogArticleBody(slug: string) {
  return blogArticleBodies.find((article) => article.slug === slug);
}
