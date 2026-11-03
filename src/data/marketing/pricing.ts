import type { PricingPlan } from "@/types/marketing";

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
  },
];

export const pricingDisclaimer =
  "Sample concept pricing for this personal project—not a live paid service. No checkout or billing is connected.";
