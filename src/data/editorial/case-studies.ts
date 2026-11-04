import { getCaseStudyDetail } from "@/data/editorial/case-study-details";
import type { CaseStudy } from "@/types/editorial";

export const caseStudiesPageCopy = {
  eyebrow: "Explore the possibilities",
  title: "Every conversation has a story.",
  description:
    "Explore illustrative support scenarios and discover how connected conversations, workflows, and insights can shape better customer experiences.",
  fictionalLabel: "Illustrative scenarios",
  featuredLabel: "Featured Stories",
  featuredTitle: "Three scenarios. One connected journey.",
  galleryEyebrow: "Gallery",
  galleryTitle: "Explore every illustrative story.",
  galleryDescription:
    "Each scenario shows how a sample inquiry can move through inbox, routing, and insights—without claiming real customer results.",
  exploreStory: "Explore Story",
  workflowEyebrow: "Connected experience",
  workflowTitle: "Different challenges. One connected experience.",
  workflowDescription:
    "See how sample inquiries move through shared conversations, workflow routing, and illustrative insights.",
  spotlightEyebrow: "Editorial Spotlight",
  spotlightTitle: "Behind every inquiry is a better workflow.",
  ctaTitle: "See the workflows come together.",
  ctaDescription:
    "Explore sample conversations, run local workflow simulations, and discover how insights connect inside HelpNova's guided demo.",
  demoLabel: "Explore Demo",
  featuresLabel: "Explore Features",
  detailBadge: "Fictional example",
  contextLabel: "Context",
  inquiryLabel: "Inquiry",
  workflowLabel: "Example Workflow",
  handoffLabel: "Team Handoff",
  illustratesLabel: "What It Illustrates",
  relatedTitle: "Related stories",
  relatedDescription: "Continue exploring illustrative support scenarios.",
  detailCtaTitle: "Try the connected journey.",
  detailCtaDescription:
    "Open the guided demo to explore sample inbox conversations, workflow routing, and insights in one local experience.",
  backToCaseStudies: "Back to Case Studies",
} as const;

export const caseStudyWorkflowStages = [
  {
    id: "inbox",
    label: "Inbox",
    title: "Shared conversations",
    description:
      "Sample inquiries arrive in one calm place where ownership, status, and context stay visible.",
  },
  {
    id: "automation",
    label: "Automation",
    title: "Topic routing",
    description:
      "Illustrative Match · Otherwise rules help route order, billing, or technical topics to the right team.",
  },
  {
    id: "insights",
    label: "Insights",
    title: "Connected signals",
    description:
      "Open work, assignment, and recent activity stay derived from the same local conversation state.",
  },
] as const;

export const caseStudies: CaseStudy[] = [
  {
    id: "orders",
    slug: "order-tracking",
    title: "From order questions to organized conversations.",
    excerpt:
      "An illustrative ecommerce scenario where a delivery question enters the inbox, matches an order rule, and lands with the Orders team—with context ready for the next step.",
    category: "order-tracking",
    categoryLabel: "Order Tracking",
    readingTime: "4 min story",
    visual: "orders",
    layout: "feature",
    accent: "violet-blue",
    spotlight: true,
    storyBeats: [
      "A customer asks about delivery status.",
      "An order-related rule identifies the topic.",
      "The conversation is routed to the Orders team.",
      "An internal note preserves context for handoff.",
    ],
  },
  {
    id: "billing",
    slug: "billing-support",
    title: "Making billing conversations easier to manage.",
    excerpt:
      "A sample billing inquiry shows how topic routing, team assignment, and internal notes can keep sensitive conversations organized and readable.",
    category: "billing-support",
    categoryLabel: "Billing Support",
    readingTime: "4 min story",
    visual: "billing",
    layout: "editorial",
    accent: "violet-teal",
    storyBeats: [
      "A billing question enters the shared inbox.",
      "A billing rule identifies the topic.",
      "The Billing team receives the assignment.",
      "Notes and status keep collaboration quiet and clear.",
    ],
  },
  {
    id: "technical",
    slug: "technical-support",
    title: "Bringing clarity to technical support.",
    excerpt:
      "An illustrative technical issue moves from intake to Technical routing, preserving context through notes and connecting the outcome to sample insights.",
    category: "technical-support",
    categoryLabel: "Technical Support",
    readingTime: "5 min story",
    visual: "technical",
    layout: "compact",
    accent: "violet-cyan",
    storyBeats: [
      "A customer reports a technical issue.",
      "The topic condition matches Technical.",
      "The Technical team reviews with full context.",
      "Insights reflect the connected local state.",
    ],
  },
];

export const spotlightCaseStudy =
  caseStudies.find((study) => study.spotlight) ?? caseStudies[0];

export function getCaseStudyBySlug(slug: string) {
  return caseStudies.find((study) => study.slug === slug);
}

export function getCaseStudyStory(slug: string) {
  const study = getCaseStudyBySlug(slug);
  const detail = getCaseStudyDetail(slug);
  if (!study || !detail) return null;
  return { study, detail };
}

export function getRelatedCaseStudies(slug: string, limit = 2) {
  const detail = getCaseStudyDetail(slug);
  const related = (detail?.relatedSlugs ?? [])
    .map((relatedSlug) => getCaseStudyBySlug(relatedSlug))
    .filter((study): study is CaseStudy => study != null && study.slug !== slug);

  if (related.length >= limit) return related.slice(0, limit);

  const fallback = caseStudies.filter(
    (study) =>
      study.slug !== slug && !related.some((item) => item.id === study.id),
  );
  return [...related, ...fallback].slice(0, limit);
}
