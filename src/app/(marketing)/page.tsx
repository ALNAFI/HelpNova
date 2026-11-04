import type { Metadata } from "next";
import { AudienceSection } from "@/components/modules/home/audience-section";
import { AutomationShowcase } from "@/components/modules/home/automation-showcase";
import { FeatureBento } from "@/components/modules/home/feature-bento";
import { FinalCta } from "@/components/modules/home/final-cta";
import { HeroSection } from "@/components/modules/home/hero-section";
import { HomeScrollRibbon } from "@/components/modules/home/home-scroll-ribbon";
import { InboxShowcase } from "@/components/modules/home/inbox-showcase";
import { InsightsSection } from "@/components/modules/home/insights-section";
import { IntegrationsPreview } from "@/components/modules/home/integrations-preview";
import { PricingFaqSection } from "@/components/modules/home/pricing-faq-section";
import { ScenariosSection } from "@/components/modules/home/scenarios-section";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "AI Customer Support",
  description: siteConfig.description,
};

export default function HomePage() {
  return (
    <HomeScrollRibbon>
      <HeroSection />
      <AudienceSection />
      <InboxShowcase />
      <AutomationShowcase />
      <InsightsSection />
      <FeatureBento />
      <IntegrationsPreview />
      <ScenariosSection />
      <PricingFaqSection />
      <FinalCta />
    </HomeScrollRibbon>
  );
}
