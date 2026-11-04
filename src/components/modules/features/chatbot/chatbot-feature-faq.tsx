"use client";

import { Accordion } from "@/components/ui/accordion";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { chatbotFeatureFaq } from "@/data/marketing/chatbot-feature";

export function ChatbotFeatureFaq() {
  return (
    <section className="border-y border-border bg-surface-muted/30 py-16 sm:py-20 lg:py-24">
      <Container>
        <SectionHeading
          title="Questions about this sample"
          description="These answers explain the floating chatbot on this page—not the six preset prompts themselves."
          className="mb-8 max-w-3xl"
        />
        <div className="max-w-3xl">
          <Accordion
            items={chatbotFeatureFaq.map((item) => ({
              id: item.id,
              question: item.question,
              answer: item.answer,
            }))}
          />
        </div>
      </Container>
    </section>
  );
}
