import type { Metadata } from "next";
import { ChatbotFeaturePage } from "@/components/modules/features/chatbot/chatbot-feature-page";

export const metadata: Metadata = {
  title: "AI Chatbot",
  description:
    "Try HelpNova’s chatbot with twenty prepared questions and authored answers.",
};

export default function Page() {
  return <ChatbotFeaturePage />;
}
