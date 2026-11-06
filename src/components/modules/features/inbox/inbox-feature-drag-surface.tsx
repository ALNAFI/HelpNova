"use client";

import { useRef } from "react";
import { InboxFeatureHero } from "@/components/modules/features/inbox/inbox-feature-hero";
import { InboxFeatureWalkthrough } from "@/components/modules/features/inbox/inbox-feature-walkthrough";

export function InboxFeatureDragSurface() {
  const surfaceRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={surfaceRef} className="relative overflow-visible touch-pan-y">
      <InboxFeatureHero surfaceRef={surfaceRef} />
      <InboxFeatureWalkthrough />
    </div>
  );
}
