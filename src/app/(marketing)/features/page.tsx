import type { Metadata } from "next";
import { FeaturesOverviewPage } from "@/components/modules/features/overview/features-overview-page";

export const metadata: Metadata = {
  title: "Features",
  description:
    "Follow one customer question through HelpNova’s chatbot, automation, shared inbox, and insights—then choose what to explore next.",
};

export default function Page() {
  return <FeaturesOverviewPage />;
}
