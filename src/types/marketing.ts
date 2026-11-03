export type HeroContent = {
  eyebrow: string;
  headline: string;
  highlight: string;
  description: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  trustLine: string;
};

export type AudienceCard = {
  id: string;
  title: string;
  description: string;
  scenario: string;
  icon: "shopping-bag" | "layers" | "briefcase";
};

export type SampleMessage = {
  id: string;
  author: string;
  role: "customer" | "agent" | "note";
  body: string;
  time: string;
};

export type SampleConversation = {
  id: string;
  customer: string;
  email: string;
  subject: string;
  preview: string;
  channel: "Email" | "Chat" | "Social";
  status: "Open" | "Resolved";
  priority: "Low" | "Medium" | "High";
  tags: string[];
  assignee: string;
  team: string;
  messages: SampleMessage[];
};

export type WorkflowNode = {
  id: string;
  label: string;
  kind: "trigger" | "condition" | "branch" | "action";
  detail: string;
};

export type InsightMetric = {
  id: string;
  label: string;
  value: string;
  hint: string;
};

export type BentoFeature = {
  id: string;
  title: string;
  description: string;
  size: "large" | "medium" | "small";
  kind:
    | "chatbot"
    | "inbox"
    | "automation"
    | "insights"
    | "collaboration"
    | "organization";
};

export type IntegrationPreview = {
  id: string;
  name: string;
  category: string;
};

export type SupportScenario = {
  id: string;
  title: string;
  inquiry: string;
  topic: string;
  routing: string;
  handoff: string;
  outcome: string;
};

export type PricingPlan = {
  id: string;
  name: string;
  priceMonthly: number;
  priceYearly: number;
  description: string;
  features: string[];
  highlighted?: boolean;
};

export type FaqItem = {
  id: string;
  question: string;
  answer: string;
};
