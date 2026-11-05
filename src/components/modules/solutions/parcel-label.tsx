"use client";

import type { CSSProperties } from "react";
import { Package } from "lucide-react";
import { cn } from "@/utils/cn";

export type ParcelPanelId = "label" | "message" | "stamp";

type DragOffset = { x: number; y: number };

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
  dragOffsets?: Record<ParcelPanelId, DragOffset>;
  dragStack?: ParcelPanelId[];
  draggingId?: ParcelPanelId | null;
};

const DEFAULT_OFFSETS: Record<ParcelPanelId, DragOffset> = {
  label: { x: 0, y: 0 },
  message: { x: 0, y: 0 },
  stamp: { x: 0, y: 0 },
};

const DEFAULT_STACK: ParcelPanelId[] = ["label", "message", "stamp"];

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
  dragOffsets = DEFAULT_OFFSETS,
  dragStack = DEFAULT_STACK,
  draggingId = null,
}: ParcelLabelProps) {
  const zIndexFor = (id: ParcelPanelId) => 20 + dragStack.indexOf(id);

  return (
    <div
      className={cn(
        "relative mx-auto w-full max-w-[26rem]",
        compact ? "min-h-[16rem]" : "min-h-[22rem] sm:min-h-[24rem]",
        className,
      )}
    >
      <div
        data-parcel-panel="label"
        data-parcel-label
        className={cn(
          "relative cursor-grab touch-none overflow-hidden rounded-sm border border-[color-mix(in_oklab,var(--foreground)_18%,transparent)] bg-[color-mix(in_oklab,var(--surface)_92%,#f4efe6)] shadow-[var(--shadow-soft)] will-change-transform active:cursor-grabbing dark:border-workspace-border dark:bg-[color-mix(in_oklab,var(--surface)_88%,#2a2433)]",
          draggingId === "label" && "cursor-grabbing",
          compact ? "p-4" : "p-5 sm:p-6",
        )}
        style={
          {
            zIndex: zIndexFor("label"),
            "--drag-x": `${dragOffsets.label.x}px`,
            "--drag-y": `${dragOffsets.label.y}px`,
            "--entrance-y": "0px",
            transform:
              "translate3d(var(--drag-x), calc(var(--drag-y) + var(--entrance-y)), 0)",
          } as CSSProperties
        }
      >
        <div
          className="pointer-events-none absolute inset-x-0 top-[42%] h-px border-t border-dashed border-[color-mix(in_oklab,var(--foreground)_22%,transparent)]"
          aria-hidden
        />

        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="font-mono text-[10px] tracking-[0.22em] text-muted uppercase">
              Shipping label
            </p>
            <p className="mt-2 font-heading text-lg font-semibold tracking-tight sm:text-xl">
              Delivery Overview
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
          data-parcel-barcode
          className="relative mt-6 flex h-10 items-end justify-between gap-1 overflow-hidden px-1"
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
          <span
            data-parcel-scan
            className="pointer-events-none absolute inset-y-0 left-0 w-10 -translate-x-full bg-[linear-gradient(90deg,transparent,color-mix(in_oklab,var(--accent)_35%,transparent),transparent)]"
          />
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
          data-parcel-panel="message"
          data-parcel-message
          className={cn(
            "absolute top-[58%] right-0 left-[8%] z-10 max-w-[17rem] cursor-grab touch-none rounded-2xl border border-border bg-surface px-3.5 py-3 shadow-[var(--shadow-soft)] will-change-transform backface-hidden active:cursor-grabbing sm:left-auto sm:right-[-0.5rem]",
            draggingId === "message" && "cursor-grabbing",
          )}
          style={
            {
              zIndex: zIndexFor("message"),
              "--drag-x": `${dragOffsets.message.x}px`,
              "--drag-y": `${dragOffsets.message.y}px`,
              "--entrance-x": "0px",
              "--entrance-y": "0px",
              "--float-y": "0px",
              transform:
                "translate3d(calc(var(--drag-x) + var(--entrance-x)), calc(var(--drag-y) + var(--float-y) + var(--entrance-y)), 0)",
            } as CSSProperties
          }
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
          data-parcel-panel="stamp"
          data-parcel-stamp
          className={cn(
            "absolute top-4 right-[-0.35rem] z-20 cursor-grab touch-none rounded-md border-2 border-accent/70 bg-accent/10 px-3 py-2 text-center shadow-sm backdrop-blur-[1px] will-change-transform active:cursor-grabbing sm:right-[-0.75rem]",
            draggingId === "stamp" && "cursor-grabbing",
          )}
          style={
            {
              zIndex: zIndexFor("stamp"),
              "--drag-x": `${dragOffsets.stamp.x}px`,
              "--drag-y": `${dragOffsets.stamp.y}px`,
              "--entrance-y": "0px",
              "--stamp-scale": "1",
              "--stamp-rotate": "-8deg",
              transform:
                "translate3d(var(--drag-x), calc(var(--drag-y) + var(--entrance-y)), 0) rotate(var(--stamp-rotate)) scale(var(--stamp-scale))",
            } as CSSProperties
          }
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
