"use client";

import { useRef } from "react";
import { AboutHero } from "@/components/modules/about/about-hero";
import { AboutStory } from "@/components/modules/about/about-story";

export function AboutDragSurface() {
  const surfaceRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={surfaceRef}
      className="relative cursor-grab overflow-hidden touch-pan-y [&[data-about-dragging]]:cursor-grabbing"
    >
      <AboutHero surfaceRef={surfaceRef} />
      <AboutStory />
    </div>
  );
}
