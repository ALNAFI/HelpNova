import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { featuresOverviewChatbot } from "@/data/marketing/features-overview";

export function FeaturesOverviewChatbot() {
  const { preset } = featuresOverviewChatbot;

  return (
    <section
      id={featuresOverviewChatbot.id}
      className="scroll-mt-28 border-y border-border bg-surface-muted/35 py-16 sm:py-20 lg:py-24"
    >
      <Container>
        <SectionHeading
          title={featuresOverviewChatbot.title}
          className="mb-8 max-w-3xl"
        />

        <div className="max-w-3xl">
          <p className="mb-3 text-[10px] font-semibold tracking-[0.14em] text-muted uppercase">
            {featuresOverviewChatbot.caption}
          </p>

          <div className="space-y-3">
            <div className="rounded-2xl rounded-bl-md border border-border bg-surface p-4 shadow-[var(--shadow-soft)] sm:max-w-[92%]">
              <p className="text-[10px] font-semibold tracking-[0.14em] text-muted uppercase">
                Question
              </p>
              <p className="mt-2 font-heading text-base font-semibold text-pretty sm:text-lg">
                {preset.question}
              </p>
            </div>
            <div className="rounded-2xl rounded-tl-md border border-accent/25 bg-accent/10 p-4 sm:ml-6 sm:max-w-[94%]">
              <p className="text-[10px] font-semibold tracking-[0.14em] text-accent uppercase">
                HelpNova · Chatbot response
              </p>
              <p className="mt-2 text-sm leading-relaxed text-pretty sm:text-[15px] sm:leading-7">
                {preset.answer}
              </p>
            </div>
          </div>

          <p className="mt-5 text-sm text-foreground/75 dark:text-foreground/70">
            {featuresOverviewChatbot.note}
          </p>

          <Link
            href={featuresOverviewChatbot.href}
            className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-accent transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            {featuresOverviewChatbot.linkLabel}
            <ArrowRight className="size-3.5" />
          </Link>

          <p className="mt-8 border-t border-border pt-5 text-xs tracking-wide text-foreground/70 dark:text-foreground/65 uppercase">
            {featuresOverviewChatbot.nextCaption}
          </p>
        </div>
      </Container>
    </section>
  );
}
