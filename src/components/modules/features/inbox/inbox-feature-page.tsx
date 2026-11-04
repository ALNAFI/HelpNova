import { InboxFeatureCta } from "@/components/modules/features/inbox/inbox-feature-cta";
import { InboxFeatureHero } from "@/components/modules/features/inbox/inbox-feature-hero";
import { InboxFeatureWalkthrough } from "@/components/modules/features/inbox/inbox-feature-walkthrough";

export function InboxFeaturePage() {
  return (
    <>
      <InboxFeatureHero />
      <InboxFeatureWalkthrough />
      <InboxFeatureCta />
    </>
  );
}
