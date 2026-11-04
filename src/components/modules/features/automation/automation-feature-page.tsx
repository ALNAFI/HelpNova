import { AutomationFeatureAnatomy } from "@/components/modules/features/automation/automation-feature-anatomy";
import { AutomationFeatureCta } from "@/components/modules/features/automation/automation-feature-cta";
import { AutomationFeatureExamples } from "@/components/modules/features/automation/automation-feature-examples";
import { AutomationFeatureExplorer } from "@/components/modules/features/automation/automation-feature-explorer";
import { AutomationFeatureHero } from "@/components/modules/features/automation/automation-feature-hero";

export function AutomationFeaturePage() {
  return (
    <>
      <AutomationFeatureHero />
      <AutomationFeatureAnatomy />
      <AutomationFeatureExplorer />
      <AutomationFeatureExamples />
      <AutomationFeatureCta />
    </>
  );
}
