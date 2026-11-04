import type { Metadata } from "next";
import { AutomationHomePage } from "@/components/modules/home/automation/automation-home-page";

export const metadata: Metadata = {
  title: "Workflow Automation",
  description:
    "Explore HelpNova's automation concept through interactive routing, branching workflows, team handoffs, and cinematic product storytelling.",
};

export default function Page() {
  return <AutomationHomePage />;
}
