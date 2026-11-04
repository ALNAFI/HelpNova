"use client";

import { Package } from "lucide-react";
import { cn } from "@/utils/cn";

type ParcelLabelProps = {
  orderReference: string;
  trackingCode?: string;
  customerName?: string;
  topicLabel?: string;
  stampLabel?: string;
  messagePreview?: string;
  className?: string;
  showMessage?: boolean;
  showStamp?: boolean;
  compact?: boolean;
};

export function ParcelLabel({
  orderReference,
  trackingCode = "HN-48291-CA",
  customerName = "Maya Chen",
  topicLabel = "Order Tracking",
  stampLabel = "Assigned to Orders",
  messagePreview = "Hi, my tracking hasn’t changed since Monday…",
  className,
  showMessage = true,
  showStamp = true,
  compact = false,
}: ParcelLabelProps) {
  return (
    <div
      className={cn(
        "relative mx-auto w-full max-w-[26rem]",
        compact ? "min-h-[16rem]" : "min-h-[22rem] sm:min-h-[24rem]",
        className,
      )}
    >
      <div
        data-parcel-label
        className={cn(
          "relative overflow-hidden rounded-sm border border-[color-mix(in_oklab,var(--foreground)_18%,transparent)] bg-[color-mix(in_oklab,var(--surface)_92%,#f4efe6)] shadow-[var(--shadow-soft)] dark:border-workspace-border dark:bg-[color-mix(in_oklab,var(--surface)_88%,#2a2433)]",
          compact ? "p-4" : "p-5 sm:p-6",
        )}
      >
        <div
          className="pointer-events-none absolute inset-x-0 top-[42%] h-px border-t border-dashed border-[color-mix(in_oklab,var(--foreground)_22%,transparent)]"
          aria-hidden
        />

        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="font-mono text-[10px] tracking-[0.22em] text-muted uppercase">
              Shipping label · sample
            </p>
            <p className="mt-2 font-heading text-lg font-semibold tracking-tight sm:text-xl">
              HelpNova Parcel
            </p>
          </div>
          <span className="inline-flex size-9 items-center justify-center rounded-full border border-border bg-surface text-accent">
            <Package className="size-4" aria-hidden />
          </span>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <MetaRow label="Order ref" value={orderReference} />
          <MetaRow label="Tracking" value={trackingCode} />
          <MetaRow label="Customer" value={customerName} />
          <MetaRow label="Topic" value={topicLabel} accent />
        </div>

        <div
          className="mt-6 flex h-10 items-end justify-between gap-1 px-1"
          aria-hidden
        >
          {Array.from({ length: 28 }).map((_, index) => (
            <span
              key={index}
              className="bg-foreground/80 dark:bg-foreground/70"
              style={{
                width: index % 5 === 0 ? 3 : 2,
                height: `${10 + ((index * 7) % 22)}px`,
              }}
            />
          ))}
        </div>
        <p
          className="mt-2 font-mono text-[10px] tracking-[0.18em] text-muted"
          aria-hidden
        >
          {trackingCode.replace(/-/g, "")}
        </p>
      </div>

      {showMessage ? (
        <div
          data-parcel-message
          className="absolute top-[58%] right-0 left-[8%] z-10 max-w-[17rem] rounded-2xl border border-border bg-surface px-3.5 py-3 shadow-[var(--shadow-soft)] sm:left-auto sm:right-[-0.5rem]"
        >
          <p className="text-[10px] font-semibold tracking-[0.16em] text-accent uppercase">
            Customer message
          </p>
          <p className="mt-1.5 text-sm leading-relaxed text-foreground">
            {messagePreview}
          </p>
        </div>
      ) : null}

      {showStamp ? (
        <div
          data-parcel-stamp
          className="absolute top-4 right-[-0.35rem] z-20 rotate-[-8deg] rounded-md border-2 border-accent/70 bg-accent/10 px-3 py-2 text-center shadow-sm backdrop-blur-[1px] sm:right-[-0.75rem]"
        >
          <p className="font-mono text-[10px] font-bold tracking-[0.14em] text-accent uppercase">
            {stampLabel}
          </p>
        </div>
      ) : null}
    </div>
  );
}

function MetaRow({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div>
      <p className="font-mono text-[10px] tracking-[0.16em] text-muted uppercase">
        {label}
      </p>
      <p
        className={cn(
          "mt-1 font-mono text-xs sm:text-[13px]",
          accent
            ? "font-semibold text-accent"
            : "font-medium text-foreground",
        )}
      >
        {value}
      </p>
    </div>
  );
}
