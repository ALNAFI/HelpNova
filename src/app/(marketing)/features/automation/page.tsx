import type { Metadata } from "next";
import { AutomationFeaturePage } from "@/components/modules/features/automation/automation-feature-page";

export const metadata: Metadata = {
  title: "Workflow Automation",
  description:
    "Follow a sample Order rule from customer inquiry to Matched or Otherwise—and see how assignment reaches Shared Inbox and Insights.",
};

export default function Page() {
  return <AutomationFeaturePage />;
}
