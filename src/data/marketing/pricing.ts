import type {
  BillingPeriod,
  PricingComparisonRow,
  PricingPlan,
} from "@/types/marketing";

export type PricingFaqItem = {
  id: string;
  question: string;
  answer: string;
  /** Phrases in `answer` that render as in-copy links. */
  links?: ReadonlyArray<{ phrase: string; href: string }>;
};

export const pricingPlans: PricingPlan[] = [
  {
    id: "essential",
    name: "Essential",
    priceMonthly: 29,
    priceYearly: 24,
    description:
      "Everything a small team needs to organize customer support.",
    features: [
      "Shared inbox",
      "Automatic routing by topic",
      "Support performance dashboard",
      "Up to 3 team members",
    ],
    cta: { label: "Purchase", href: "/demo" },
  },
  {
    id: "team",
    name: "Team",
    priceMonthly: 79,
    priceYearly: 66,
    description:
      "Help your growing team collaborate and automate everyday tasks.",
    features: [
      "Everything in Essential",
      "Conditional workflows",
      "Internal notes & assignments",
      "Team workload overview",
      "Conversation priority tags",
    ],
    highlighted: true,
    cta: { label: "Purchase", href: "/demo" },
  },
  {
    id: "scale",
    name: "Scale",
    priceMonthly: 149,
    priceYearly: 124,
    description:
      "Manage more conversations with advanced workflows and insights.",
    features: [
      "Everything in Team",
      "Order, billing & technical support workflows",
      "7-day & 30-day conversation insights",
      "12 integration previews (browse only)",
      "Interactive guided demo walkthrough",
    ],
    cta: { label: "Contact Us", href: "/contact" },
  },
];

/** Comparison matrix derived from the same plan capabilities — no invented features. */
export const pricingComparisonRows: PricingComparisonRow[] = [
  {
    id: "shared-inbox",
    label: "Shared inbox",
    essential: true,
    team: true,
    scale: true,
  },
  {
    id: "topic-routing",
    label: "Automatic routing by topic",
    essential: true,
    team: true,
    scale: true,
  },
  {
    id: "insights",
    label: "Support performance dashboard",
    essential: true,
    team: true,
    scale: true,
  },
  {
    id: "teammate-seats",
    label: "Team members",
    // Essential defines “Up to 3”; Team/Scale inherit that cap via “Everything in …”.
    // No higher seat counts exist in project data.
    essential: "Up to 3",
    team: "Up to 3",
    scale: "Up to 3",
  },
  {
    id: "matched-workflows",
    label: "Conditional workflows",
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
    label: "Team workload overview",
    essential: false,
    team: true,
    scale: true,
  },
  {
    id: "priority-tags",
    label: "Conversation priority tags",
    essential: false,
    team: true,
    scale: true,
  },
  {
    id: "scenario-library",
    label: "Order, billing & technical support workflows",
    essential: false,
    team: false,
    scale: true,
  },
  {
    id: "historical-charts",
    label: "7-day & 30-day conversation insights",
    essential: false,
    team: false,
    scale: true,
  },
  {
    id: "integration-map",
    label: "12 integration previews (browse only)",
    essential: false,
    team: false,
    scale: true,
  },
  {
    id: "walkthrough",
    label: "Interactive guided demo walkthrough",
    essential: false,
    team: false,
    scale: true,
  },
];

export const pricingDisclaimer = "Find the right fit for your team.";

export const pricingPageCopy = {
  eyebrow: "Flexible pricing",
  titleBefore: "Better support.",
  titleAccent: "A plan for every team.",
  description:
    "Choose the right plan to manage conversations, automate tasks, and support your customers.",
  comparisonEyebrow: "Plan comparison",
  comparisonTitle: "Compare plans with confidence.",
  comparisonDescription:
    "Compare features and choose the right plan for your team.",
  comparisonFeaturesLabel: "Features",
  comparisonLegendIncluded: "Included",
  comparisonLegendNotIncluded: "Not included",
  faqEyebrow: "Pricing FAQ",
  faqTitle: "Your pricing questions, answered.",
  faqDescription:
    "Learn about the plans, explore the demo, and find the right fit for your team.",
  faqViewAllLabel: "View all FAQs",
  faqViewAllHref: "/faq",
  ctaTitle: "See HelpNova in action.",
  ctaDescription:
    "Explore the inbox, try automated workflows, and see your team’s insights all in one interactive demo.",
  ctaPrimary: { label: "Explore Demo", href: "/demo" },
  ctaSecondary: { label: "Explore Features", href: "/features" },
  featuredBadge: "Most Popular",
  monthlyLabel: "Monthly",
  yearlyLabel: "Yearly",
  perMonthSuffix: "/mo",
  billedYearlyHint: "billed yearly",
  billedMonthlyHint: "billed monthly",
  billingToggleHint: "Choose monthly or yearly billing.",
} as const;

export const pricingFaqItems: PricingFaqItem[] = [
  {
    id: "plans-available",
    question: "Are these plans available to purchase?",
    answer:
      "The plans and prices shown are examples of how HelpNova could be packaged. Paid subscriptions are currently unavailable.",
  },
  {
    id: "plans-compare",
    question: "How do the plans compare?",
    answer:
      "Essential covers shared inbox and basic support tools. Team adds workflows and collaboration features. Scale showcases additional insights and advanced support workflows. See the comparison table above for the full breakdown.",
  },
  {
    id: "try-before",
    question: "Can I try HelpNova before choosing a plan?",
    answer:
      "Yes. Explore the interactive demo to manage conversations, try automated workflows, and view support insights. It uses sample data, which resets when you refresh the page.",
    links: [{ phrase: "Explore the interactive demo", href: "/demo" }],
  },
  {
    id: "account-required",
    question: "Do I need an account to explore HelpNova?",
    answer:
      "No account is required. You can browse the website and explore the interactive demo freely.",
  },
  {
    id: "learn-more",
    question: "Where can I learn more about HelpNova?",
    answer:
      "Explore our features to learn about the inbox, automation, and insights, or visit the full FAQ for more answers.",
    links: [
      { phrase: "Explore our features", href: "/features" },
      { phrase: "full FAQ", href: "/faq" },
    ],
  },
];

export function getPlanPrice(
  plan: PricingPlan,
  period: BillingPeriod,
): number {
  return period === "yearly" ? plan.priceYearly : plan.priceMonthly;
}

/** Yearly field is the monthly equivalent; annual total is that amount × 12. */
export function getYearlyAnnualTotal(plan: PricingPlan): number {
  return plan.priceYearly * 12;
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
