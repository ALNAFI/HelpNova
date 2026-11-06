import { InboxFeatureCta } from "@/components/modules/features/inbox/inbox-feature-cta";
import { InboxFeatureDragSurface } from "@/components/modules/features/inbox/inbox-feature-drag-surface";

export function InboxFeaturePage() {
  return (
    <>
      <InboxFeatureDragSurface />
      <InboxFeatureCta />
    </>
  );
}
