"use client";

import { useRef } from "react";
import { ChatbotFeatureHero } from "@/components/modules/features/chatbot/chatbot-feature-hero";
import { ChatbotFeatureShowcase } from "@/components/modules/features/chatbot/chatbot-feature-showcase";

export function ChatbotFeatureDragSurface() {
  const surfaceRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={surfaceRef} className="relative overflow-visible touch-pan-y">
      <ChatbotFeatureHero surfaceRef={surfaceRef} />
      <ChatbotFeatureShowcase />
    </div>
  );
}
