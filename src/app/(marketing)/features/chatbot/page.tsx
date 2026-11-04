import type { Metadata } from "next";
import { ChatbotFeaturePage } from "@/components/modules/features/chatbot/chatbot-feature-page";

export const metadata: Metadata = {
  title: "AI Chatbot",
  description:
    "Try HelpNova’s sample chatbot with six local preset questions and authored answers—no AI model call required.",
};

export default function Page() {
  return <ChatbotFeaturePage />;
}
