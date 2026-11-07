import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { chatbotFeatureHowItWorks } from "@/data/marketing/chatbot-feature";

export function ChatbotFeatureHowItWorks() {
  return (
    <section className="py-16 sm:py-20 lg:py-24">
      <Container>
        <SectionHeading
          title={chatbotFeatureHowItWorks.title}
          className="mb-8 max-w-3xl"
        />

        <ol className="grid gap-5 sm:grid-cols-3">
          {chatbotFeatureHowItWorks.steps.map((step, index) => (
            <li
              key={step.id}
              className="rounded-[var(--radius-card)] border border-border bg-surface p-4 shadow-[var(--shadow-soft)] sm:p-5"
            >
              <p className="font-mono text-[11px] font-semibold tracking-[0.16em] text-accent uppercase">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-3 font-heading text-base font-semibold">
                {step.label}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-foreground/75 dark:text-foreground/70">
                {step.body}
              </p>
            </li>
          ))}
        </ol>

        <p className="mt-6 w-full rounded-xl border border-border bg-surface-muted/60 px-4 py-3 text-sm text-foreground/75 dark:text-foreground/70">
          {chatbotFeatureHowItWorks.note}
        </p>
      </Container>
    </section>
  );
}
