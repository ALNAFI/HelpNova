"use client";

import { useCallback, useRef, useState } from "react";
import { SolutionsCta } from "@/components/modules/solutions/solutions-cta";
import { SolutionsExplorer } from "@/components/modules/solutions/solutions-explorer";
import { SolutionsHero } from "@/components/modules/solutions/solutions-hero";
import type { SolutionsIndustryId } from "@/data/marketing/solutions";

export function SolutionsExperience() {
  const surfaceRef = useRef<HTMLDivElement>(null);
  const [selectedId, setSelectedId] =
    useState<SolutionsIndustryId>("ecommerce");

  const handleSelectIndustry = useCallback((id: SolutionsIndustryId) => {
    setSelectedId(id);
  }, []);

  return (
    <>
      <div ref={surfaceRef} className="relative overflow-visible touch-pan-y">
        <SolutionsHero surfaceRef={surfaceRef} />
        <SolutionsExplorer
          selectedId={selectedId}
          onSelectIndustry={handleSelectIndustry}
        />
      </div>
      <SolutionsCta selectedId={selectedId} />
    </>
  );
}
