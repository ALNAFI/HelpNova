"use client";

import { Accordion } from "@/components/ui/accordion";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { chatbotFeatureFaq } from "@/data/marketing/chatbot-feature";

export function ChatbotFeatureFaq() {
  return (
    <section className="border-y border-border bg-surface-muted/30 py-16 sm:py-20 lg:py-24">
      <Container>
        <div className="mx-auto w-full max-w-3xl">
          <SectionHeading
            title="Frequently Asked Questions"
            description="Everything you need to know about HelpNova's chatbot experience."
            className="mb-8 max-w-none"
          />
          <Accordion
            answerClassName="text-foreground/75 dark:text-foreground/70"
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
