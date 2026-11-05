"use client";

import { useRef } from "react";
import { EcommerceHero } from "@/components/modules/solutions/ecommerce-hero";
import { EcommerceInquiry } from "@/components/modules/solutions/ecommerce-inquiry";

export function EcommerceDragSurface() {
  const surfaceRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={surfaceRef} className="relative overflow-visible touch-pan-y">
      <EcommerceHero surfaceRef={surfaceRef} />
      <EcommerceInquiry />
    </div>
  );
}
