import { ArrowRight, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { OpenChatbotButton } from "@/components/common/chatbot/open-chatbot-button";
import { chatbotFeatureCta } from "@/data/marketing/chatbot-feature";

export function ChatbotFeatureCta() {
  return (
    <section className="py-16 sm:py-20 lg:py-24">
      <Container>
        <div className="relative mx-auto max-w-3xl overflow-hidden rounded-[var(--radius-workspace)] border border-border bg-surface p-6 shadow-[var(--shadow-soft)] sm:p-8 lg:p-10">
          <div
            className="pointer-events-none absolute -top-8 -right-6 hidden size-44 rounded-full bg-[radial-gradient(circle_at_center,var(--glow),transparent_68%)] sm:block"
            aria-hidden
          />

          <div
            className="pointer-events-none absolute top-5 right-5 hidden w-[9.5rem] sm:block"
            aria-hidden
          >
            <div className="flex flex-col gap-2">
              <div className="self-end max-w-[7.75rem] rounded-2xl rounded-br-md border border-border bg-surface-muted px-2.5 py-2 shadow-[var(--shadow-soft)]">
                <p className="text-[9px] font-semibold tracking-[0.12em] text-muted uppercase">
                  Your Question
                </p>
                <div className="mt-1.5 space-y-1">
                  <span className="block h-1 w-14 rounded-full bg-border-strong/80" />
                  <span className="block h-1 w-10 rounded-full bg-border/90" />
                </div>
              </div>
              <div className="self-start max-w-[8.25rem] rounded-2xl rounded-bl-md border border-accent/25 bg-accent/10 px-2.5 py-2 shadow-[var(--shadow-soft)]">
                <p className="text-[9px] font-semibold tracking-[0.12em] text-accent uppercase">
                  Helpful Answer
                </p>
                <div className="mt-1.5 space-y-1">
                  <span className="block h-1 w-16 rounded-full bg-accent/35" />
                  <span className="block h-1 w-12 rounded-full bg-accent/25" />
                  <span className="block h-1 w-9 rounded-full bg-accent/20" />
                </div>
              </div>
            </div>
          </div>

          <div className="relative sm:pr-40">
            <h2 className="font-heading text-[1.85rem] font-semibold tracking-tight text-balance sm:text-[2.25rem]">
              {chatbotFeatureCta.title}
            </h2>
            <p className="mt-4 max-w-lg text-base leading-7 text-muted">
              {chatbotFeatureCta.description}
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <OpenChatbotButton aria-label={chatbotFeatureCta.primaryCtaLabel}>
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
        </div>
      </Container>
    </section>
  );
}
