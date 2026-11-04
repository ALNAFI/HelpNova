import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { automationFeatureAnatomy } from "@/data/marketing/automation-feature";

export function AutomationFeatureAnatomy() {
  return (
    <section className="border-y border-border bg-surface-muted/35 py-16 sm:py-20 lg:py-24">
      <Container>
        <SectionHeading
          title={automationFeatureAnatomy.title}
          className="mb-8 max-w-3xl"
        />

        <p className="max-w-3xl font-heading text-lg leading-relaxed font-medium text-pretty sm:text-xl">
          {automationFeatureAnatomy.sentence}
        </p>

        <ol className="mt-10 grid gap-6 lg:grid-cols-3 lg:gap-0">
          {automationFeatureAnatomy.parts.map((part, index) => (
            <li
              key={part.id}
              className="relative lg:border-l lg:border-border lg:pl-6 lg:first:border-l-0 lg:first:pl-0"
            >
              <div className="flex items-baseline gap-3">
                <span className="font-mono text-[11px] font-semibold tracking-[0.16em] text-accent uppercase">
                  {String(index + 1).padStart(2, "0")} · {part.label}
                </span>
              </div>
              <h3 className="mt-3 font-heading text-base font-semibold sm:text-lg">
                {part.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {part.body}
              </p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
