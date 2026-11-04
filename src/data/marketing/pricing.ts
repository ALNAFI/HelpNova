import { faqItems } from "@/data/marketing/faq";
import type {
  BillingPeriod,
  FaqItem,
  PricingComparisonRow,
  PricingPlan,
} from "@/types/marketing";

export const pricingPlans: PricingPlan[] = [
  {
    id: "essential",
    name: "Essential",
    priceMonthly: 29,
    priceYearly: 24,
    description: "For small teams exploring a unified support workspace.",
    features: [
      "Shared inbox preview",
      "Basic topic routing examples",
      "Sample insights dashboard",
      "Up to 3 teammate seats (sample)",
    ],
    cta: { label: "Explore Demo", href: "/demo" },
  },
  {
    id: "team",
    name: "Team",
    priceMonthly: 79,
    priceYearly: 66,
    description: "For growing support orgs that need clearer handoffs.",
    features: [
      "Everything in Essential",
      "Matched / Otherwise workflows",
      "Internal notes & assignments",
      "Workload by team views",
      "Priority tags (display-only in samples)",
    ],
    highlighted: true,
    cta: { label: "Explore Demo", href: "/demo" },
  },
  {
    id: "scale",
    name: "Scale",
    priceMonthly: 149,
    priceYearly: 124,
    description: "For larger fictional orgs evaluating advanced structure.",
    features: [
      "Everything in Team",
      "Expanded scenario library",
      "Historical sample charts",
      "Illustrative integration map",
      "Dedicated concept walkthrough",
    ],
    cta: { label: "Contact Us", href: "/contact" },
  },
];

/** Comparison matrix derived from the same plan capabilities — no invented features. */
export const pricingComparisonRows: PricingComparisonRow[] = [
  {
    id: "shared-inbox",
    label: "Shared inbox preview",
    essential: true,
    team: true,
    scale: true,
  },
  {
    id: "topic-routing",
    label: "Basic topic routing examples",
    essential: true,
    team: true,
    scale: true,
  },
  {
    id: "insights",
    label: "Sample insights dashboard",
    essential: true,
    team: true,
    scale: true,
  },
  {
    id: "teammate-seats",
    label: "Teammate seats (sample)",
    essential: "Up to 3",
    team: "Growing teams",
    scale: "Expanded teams",
  },
  {
    id: "matched-workflows",
    label: "Matched / Otherwise workflows",
    essential: false,
    team: true,
    scale: true,
  },
  {
    id: "internal-notes",
    label: "Internal notes & assignments",
    essential: false,
    team: true,
    scale: true,
  },
  {
    id: "workload",
    label: "Workload by team views",
    essential: false,
    team: true,
    scale: true,
  },
  {
    id: "priority-tags",
    label: "Priority tags (display-only)",
    essential: false,
    team: true,
    scale: true,
  },
  {
    id: "scenario-library",
    label: "Expanded scenario library",
    essential: false,
    team: false,
    scale: true,
  },
  {
    id: "historical-charts",
    label: "Historical sample charts",
    essential: false,
    team: false,
    scale: true,
  },
  {
    id: "integration-map",
    label: "Illustrative integration map",
    essential: false,
    team: false,
    scale: true,
  },
  {
    id: "walkthrough",
    label: "Dedicated concept walkthrough",
    essential: false,
    team: false,
    scale: true,
  },
];

export const pricingDisclaimer =
  "Sample concept pricing for this personal project—not a live paid service. No checkout or billing is connected.";

export const pricingPageCopy = {
  eyebrow: "Flexible pricing",
  titleBefore: "Simple plans.",
  titleAccent: "Extraordinary possibilities.",
  description:
    "Explore flexible plans designed to bring conversations, workflows, and team collaboration together.",
  comparisonEyebrow: "Plan comparison",
  comparisonTitle: "Compare plans with confidence.",
  comparisonDescription:
    "See how Essential, Team, and Scale differ across the same sample capabilities shown in the cards above.",
  faqEyebrow: "Pricing FAQ",
  faqTitle: "Questions about these sample plans.",
  faqDescription:
    "Clear answers about illustrative pricing, what you can explore locally, and where to go next.",
  faqViewAllLabel: "View all FAQs",
  faqViewAllHref: "/faq",
  ctaTitle: "Ready to explore a smarter way to support?",
  ctaDescription:
    "Discover how conversations, automation, and insights come together in one connected experience.",
  ctaPrimary: { label: "Explore Demo", href: "/demo" },
  ctaSecondary: { label: "Contact Us", href: "/contact" },
  featuredBadge: "Most Popular",
  monthlyLabel: "Monthly",
  yearlyLabel: "Yearly",
  perMonthSuffix: "/mo",
  billedYearlyHint: "billed yearly",
  billedMonthlyHint: "billed monthly",
} as const;

const pricingFaqIds = [
  "pricing-real",
  "what-is-helpnova",
  "how-demo-works",
  "no-account",
  "get-in-touch",
] as const;

export const pricingFaqItems: FaqItem[] = pricingFaqIds
  .map((id) => faqItems.find((item) => item.id === id))
  .filter((item): item is FaqItem => Boolean(item));

export function getPlanPrice(
  plan: PricingPlan,
  period: BillingPeriod,
): number {
  return period === "yearly" ? plan.priceYearly : plan.priceMonthly;
}

/** Yearly amount is a lower monthly-equivalent from the same plan data. */
export function getYearlySavingsPercent(plan: PricingPlan): number | null {
  if (plan.priceYearly >= plan.priceMonthly) return null;
  return Math.round((1 - plan.priceYearly / plan.priceMonthly) * 100);
}

export function getMaxYearlySavingsPercent(
  plans: PricingPlan[] = pricingPlans,
): number | null {
  const values = plans
    .map(getYearlySavingsPercent)
    .filter((value): value is number => value !== null);
  if (values.length === 0) return null;
  return Math.max(...values);
}

export function formatPlanPrice(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}
