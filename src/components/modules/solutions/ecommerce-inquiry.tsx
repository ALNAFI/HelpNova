import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import {
  ecommerceHero,
  ecommerceInquiries,
  ecommerceInquirySection,
} from "@/data/marketing/ecommerce";

export function EcommerceInquiry() {
  const order = ecommerceInquiries[0];

  return (
    <section className="scroll-mt-28 pt-8 pb-16 sm:pt-10 sm:pb-20 lg:pt-12 lg:pb-24">
      <Container className="min-w-0 overflow-visible">
        <SectionHeading
          eyebrow={ecommerceInquirySection.eyebrow}
          title={ecommerceInquirySection.title}
          description={ecommerceInquirySection.description}
          className="mb-10 max-w-3xl"
        />

        <article className="min-w-0 overflow-hidden rounded-[var(--radius-workspace)] border border-border bg-surface shadow-[var(--shadow-soft)]">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border bg-surface-muted/60 px-5 py-3 sm:px-6">
            <div className="min-w-0">
              <p className="font-heading text-base font-semibold">
                {order.customerName}
              </p>
              <p className="text-sm text-muted">{order.subject}</p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full border border-border bg-surface px-2.5 py-1 font-mono text-[10px] tracking-[0.12em] text-muted uppercase">
                {ecommerceInquirySection.statusBadge}
              </span>
              <span className="rounded-full bg-accent-soft px-2.5 py-1 text-[11px] font-semibold text-accent">
                {order.topicLabel}
              </span>
            </div>
          </div>

          <div className="grid min-w-0 grid-cols-1 items-stretch gap-4 p-5 sm:gap-5 sm:p-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-5">
            <div className="min-w-0 space-y-4">
              <div className="max-w-xl rounded-2xl rounded-tl-md border border-border bg-surface-muted/70 px-4 py-3.5">
                <p className="text-[11px] font-medium text-muted">
                  {order.customerName} · Customer
                </p>
                <p className="mt-2 text-[15px] leading-7 text-pretty">
                  {order.message}
                </p>
              </div>
              <p className="max-w-xl text-sm leading-6 text-muted">
                {ecommerceInquirySection.explanation}
              </p>
            </div>

            <aside className="min-w-0 overflow-hidden rounded-2xl border border-border bg-[color-mix(in_oklab,var(--surface-muted)_70%,#f7f1e8)] p-5 dark:bg-[color-mix(in_oklab,var(--surface-muted)_85%,#241e2e)] sm:p-6">
              <p className="font-mono text-[10px] tracking-[0.18em] text-muted uppercase">
                {ecommerceInquirySection.detailsTitle}
              </p>
              <dl className="mt-4 space-y-3 text-sm">
                <DetailRow
                  label="Order reference"
                  value={order.orderReference ?? "—"}
                  mono
                />
                <DetailRow
                  label="Tracking number"
                  value={ecommerceHero.trackingCode}
                  mono
                />
                <DetailRow
                  label="Topic"
                  value={order.topicLabel}
                  accent
                />
                <DetailRow label="Channel" value="Email" />
              </dl>
            </aside>
          </div>
        </article>
      </Container>
    </section>
  );
}

function DetailRow({
  label,
  value,
  mono,
  accent,
}: {
  label: string;
  value: string;
  mono?: boolean;
  accent?: boolean;
}) {
  return (
    <div className="flex items-start justify-between gap-4">
      <dt className="shrink-0 text-muted">{label}</dt>
      <dd
        className={`min-w-0 text-right break-words ${
          accent
            ? "font-medium text-accent"
            : mono
              ? "font-mono font-medium"
              : "font-medium"
        }`}
      >
        {value}
      </dd>
    </div>
  );
}
