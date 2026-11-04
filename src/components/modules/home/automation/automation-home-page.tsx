"use client";

import { AutomationBranching } from "@/components/modules/home/automation/automation-branching";
import { AutomationCta } from "@/components/modules/home/automation/automation-cta";
import { AutomationHandoff } from "@/components/modules/home/automation/automation-handoff";
import { AutomationHero } from "@/components/modules/home/automation/automation-hero";
import { AutomationIntegrations } from "@/components/modules/home/automation/automation-integrations";
import { AutomationOutcomes } from "@/components/modules/home/automation/automation-outcomes";
import { AutomationPricingFaq } from "@/components/modules/home/automation/automation-pricing-faq";
import { AutomationProcess } from "@/components/modules/home/automation/automation-process";
import { AutomationScrollProvider } from "@/components/modules/home/automation/automation-scroll-context";
import { AutomationScrollProgress } from "@/components/modules/home/automation/automation-scroll-progress";
import { AutomationUseCases } from "@/components/modules/home/automation/automation-use-cases";

export function AutomationHomePage() {
  return (
    <AutomationScrollProvider>
      <div id="automation-universe-page">
        <AutomationScrollProgress />
        <AutomationHero />
        <AutomationUseCases />
        <AutomationProcess />
        <AutomationBranching />
        <AutomationHandoff />
        <AutomationIntegrations />
        <AutomationOutcomes />
        <AutomationPricingFaq />
        <AutomationCta />
      </div>
    </AutomationScrollProvider>
  );
}
