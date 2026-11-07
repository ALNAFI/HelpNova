import { ChatbotFeatureCta } from "@/components/modules/features/chatbot/chatbot-feature-cta";
import { ChatbotFeatureDragSurface } from "@/components/modules/features/chatbot/chatbot-feature-drag-surface";
import { ChatbotFeatureFaq } from "@/components/modules/features/chatbot/chatbot-feature-faq";
import { ChatbotFeatureHowItWorks } from "@/components/modules/features/chatbot/chatbot-feature-how-it-works";

export function ChatbotFeaturePage() {
  return (
    <>
      <ChatbotFeatureDragSurface />
      <ChatbotFeatureHowItWorks />
      <ChatbotFeatureFaq />
      <ChatbotFeatureCta />
    </>
  );
}
