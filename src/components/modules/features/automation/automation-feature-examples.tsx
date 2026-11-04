import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { automationFeatureRoutingExamples } from "@/data/marketing/automation-feature";

export function AutomationFeatureExamples() {
  return (
    <section className="py-16 sm:py-20 lg:py-24">
      <Container>
        <SectionHeading
          title={automationFeatureRoutingExamples.title}
          className="mb-8 max-w-3xl"
        />

        <div className="overflow-hidden rounded-[var(--radius-workspace)] border border-border bg-surface shadow-[var(--shadow-soft)]">
          <div className="hidden overflow-x-auto md:block">
            <table className="w-full min-w-[40rem] text-left text-sm">
              <thead className="border-b border-border bg-surface-muted/60 text-[11px] font-semibold tracking-[0.14em] text-muted uppercase">
                <tr>
                  <th className="px-4 py-3 font-semibold">Inquiry</th>
                  <th className="px-4 py-3 font-semibold">Rule evaluated</th>
                  <th className="px-4 py-3 font-semibold">Result</th>
                  <th className="px-4 py-3 font-semibold">Assigned team</th>
                </tr>
              </thead>
              <tbody>
                {automationFeatureRoutingExamples.rows.map((row, index) => (
                  <tr
                    key={`${row.inquiry}-${row.rule}-${index}`}
                    className="border-b border-border last:border-b-0"
                  >
                    <td className="px-4 py-3 font-medium">{row.inquiry}</td>
                    <td className="px-4 py-3 text-muted">{row.rule}</td>
                    <td className="px-4 py-3">
                      <span
                        className={
                          row.result === "Matched"
                            ? "font-medium text-accent"
                            : "font-medium text-foreground"
                        }
                      >
                        {row.result}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-medium">{row.team}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="divide-y divide-border md:hidden">
            {automationFeatureRoutingExamples.rows.map((row, index) => (
              <div
                key={`${row.inquiry}-${row.rule}-m-${index}`}
                className="space-y-2 px-4 py-3.5"
              >
                <p className="font-heading text-sm font-semibold">
                  {row.inquiry}
                </p>
                <dl className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 text-xs">
                  <dt className="text-muted">Rule evaluated</dt>
                  <dd className="font-medium">{row.rule}</dd>
                  <dt className="text-muted">Result</dt>
                  <dd className="font-medium">{row.result}</dd>
                  <dt className="text-muted">Assigned team</dt>
                  <dd className="font-medium">{row.team}</dd>
                </dl>
              </div>
            ))}
          </div>
        </div>

        <p className="mt-5 max-w-3xl text-sm leading-relaxed text-muted text-pretty">
          {automationFeatureRoutingExamples.observation}
        </p>
      </Container>
    </section>
  );
}
