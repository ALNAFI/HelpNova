import { FeaturesOverviewAutomation } from "@/components/modules/features/overview/features-overview-automation";
import { FeaturesOverviewBento } from "@/components/modules/features/overview/features-overview-bento";
import { FeaturesOverviewChatbot } from "@/components/modules/features/overview/features-overview-chatbot";
import { FeaturesOverviewCta } from "@/components/modules/features/overview/features-overview-cta";
import { FeaturesOverviewHero } from "@/components/modules/features/overview/features-overview-hero";
import { FeaturesOverviewInbox } from "@/components/modules/features/overview/features-overview-inbox";
import { FeaturesOverviewInsights } from "@/components/modules/features/overview/features-overview-insights";

export function FeaturesOverviewPage() {
  return (
    <>
      <FeaturesOverviewHero />
      <FeaturesOverviewChatbot />
      <FeaturesOverviewAutomation />
      <FeaturesOverviewInbox />
      <FeaturesOverviewInsights />
      <FeaturesOverviewBento />
      <FeaturesOverviewCta />
    </>
  );
}
