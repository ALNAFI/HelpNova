"use client";

import { useRef } from "react";
import { IntegrationsDirectory } from "@/components/modules/integrations/integrations-directory";
import { IntegrationsHero } from "@/components/modules/integrations/integrations-hero";

export function IntegrationsDragSurface() {
  const surfaceRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={surfaceRef} className="relative overflow-visible touch-pan-y">
      <IntegrationsHero surfaceRef={surfaceRef} />
      <IntegrationsDirectory />
    </div>
  );
}
