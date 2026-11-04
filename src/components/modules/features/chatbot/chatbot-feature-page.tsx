import { ChatbotFeatureCta } from "@/components/modules/features/chatbot/chatbot-feature-cta";
import { ChatbotFeatureFaq } from "@/components/modules/features/chatbot/chatbot-feature-faq";
import { ChatbotFeatureHero } from "@/components/modules/features/chatbot/chatbot-feature-hero";
import { ChatbotFeatureHowItWorks } from "@/components/modules/features/chatbot/chatbot-feature-how-it-works";
import { ChatbotFeatureShowcase } from "@/components/modules/features/chatbot/chatbot-feature-showcase";

export function ChatbotFeaturePage() {
  return (
    <>
      <ChatbotFeatureHero />
      <ChatbotFeatureShowcase />
      <ChatbotFeatureHowItWorks />
      <ChatbotFeatureFaq />
      <ChatbotFeatureCta />
    </>
  );
}
