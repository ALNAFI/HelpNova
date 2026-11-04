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
    <section className="scroll-mt-28 py-16 sm:py-20 lg:py-24">
      <Container>
        <SectionHeading
          eyebrow={ecommerceInquirySection.eyebrow}
          title={ecommerceInquirySection.title}
          description={ecommerceInquirySection.description}
          className="mb-10 max-w-3xl"
        />

        <article className="overflow-hidden rounded-[var(--radius-workspace)] border border-border bg-surface shadow-[var(--shadow-soft)]">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border bg-surface-muted/60 px-5 py-3 sm:px-6">
            <div>
              <p className="font-heading text-base font-semibold">
                {order.customerName}
              </p>
              <p className="text-sm text-muted">{order.subject}</p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full border border-border bg-surface px-2.5 py-1 font-mono text-[10px] tracking-[0.12em] text-muted uppercase">
                Sample conversation
              </span>
              <span className="rounded-full bg-accent-soft px-2.5 py-1 text-[11px] font-semibold text-accent">
                {order.topicLabel}
              </span>
            </div>
          </div>

          <div className="grid gap-0 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="space-y-4 p-5 sm:p-6">
              <div className="max-w-xl rounded-2xl rounded-tl-md border border-border bg-surface-muted/70 px-4 py-3.5">
                <p className="text-[11px] font-medium text-muted">
                  {order.customerName} · Customer
                </p>
                <p className="mt-2 text-[15px] leading-7 text-pretty">
                  {order.message}
                </p>
              </div>
              <p className="text-sm text-muted">
                The Orders team is relevant because this question is about a
                delivery status for a specific purchase—not a billing or account
                issue.
              </p>
            </div>

            <aside className="border-t border-border bg-[color-mix(in_oklab,var(--surface-muted)_70%,#f7f1e8)] p-5 sm:p-6 lg:border-t-0 lg:border-l dark:bg-[color-mix(in_oklab,var(--surface-muted)_85%,#241e2e)]">
              <p className="font-mono text-[10px] tracking-[0.18em] text-muted uppercase">
                Parcel reference
              </p>
              <dl className="mt-4 space-y-3 text-sm">
                <div className="flex items-baseline justify-between gap-4">
                  <dt className="text-muted">Order</dt>
                  <dd className="font-mono font-medium">
                    {order.orderReference}
                  </dd>
                </div>
                <div className="flex items-baseline justify-between gap-4">
                  <dt className="text-muted">Tracking</dt>
                  <dd className="font-mono font-medium">
                    {ecommerceHero.trackingCode}
                  </dd>
                </div>
                <div className="flex items-baseline justify-between gap-4">
                  <dt className="text-muted">Topic</dt>
                  <dd className="font-medium text-accent">{order.topicLabel}</dd>
                </div>
                <div className="flex items-baseline justify-between gap-4">
                  <dt className="text-muted">Channel</dt>
                  <dd className="font-medium">Email</dd>
                </div>
              </dl>
            </aside>
          </div>
        </article>
      </Container>
    </section>
  );
}
