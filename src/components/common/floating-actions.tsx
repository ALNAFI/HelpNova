"use client";

import { usePathname } from "next/navigation";
import { BackToTop } from "@/components/common/back-to-top";
import { ChatbotWidget } from "@/components/common/chatbot/chatbot-widget";

/**
 * Shared bottom-right floating dock for HelpNova Assistant + Back to Top.
 * Positioning uses --fab-* CSS variables; children stack (chatbot below).
 */
export function FloatingActions() {
  const pathname = usePathname();
  const isDemoRoute = pathname.startsWith("/demo");

  return (
    <div
      data-floating-actions
      data-demo-route={isDemoRoute ? "true" : "false"}
    >
      <ChatbotWidget />
      <BackToTop />
    </div>
  );
}
