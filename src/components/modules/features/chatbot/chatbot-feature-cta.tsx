import { ArrowRight, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { OpenChatbotButton } from "@/components/common/chatbot/open-chatbot-button";
import { chatbotFeatureCta } from "@/data/marketing/chatbot-feature";

export function ChatbotFeatureCta() {
  return (
    <section className="py-16 sm:py-20 lg:py-24">
      <Container>
        <div className="relative max-w-2xl overflow-hidden rounded-[var(--radius-workspace)] border border-border bg-surface p-6 shadow-[var(--shadow-soft)] sm:p-8 lg:p-10">
          <div
            className="pointer-events-none absolute top-4 right-4 hidden w-36 opacity-70 sm:block"
            aria-hidden
          >
            <div className="rounded-xl rounded-bl-md border border-border bg-surface-muted px-2.5 py-2 text-[10px]">
              Question
            </div>
            <div className="mt-2 ml-4 rounded-xl rounded-tl-md border border-accent/25 bg-accent/10 px-2.5 py-2 text-[10px]">
              Sample answer
            </div>
          </div>

          <h2 className="font-heading text-[1.85rem] font-semibold tracking-tight text-balance sm:text-[2.25rem]">
            {chatbotFeatureCta.title}
          </h2>
          <p className="mt-4 max-w-lg text-base leading-7 text-muted">
            {chatbotFeatureCta.description}
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <OpenChatbotButton aria-label="Try the sample chatbot">
              {chatbotFeatureCta.primaryCtaLabel}
              <MessageCircle className="size-4" />
            </OpenChatbotButton>
            <Button
              href={chatbotFeatureCta.secondaryCta.href}
              variant="secondary"
              size="lg"
            >
              {chatbotFeatureCta.secondaryCta.label}
              <ArrowRight className="size-4" />
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
