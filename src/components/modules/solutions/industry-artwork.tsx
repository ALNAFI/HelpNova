import { CalendarDays, Package, SquareStack } from "lucide-react";
import type { SolutionsIndustryId } from "@/data/marketing/solutions";
import { cn } from "@/utils/cn";

export function IndustryArtwork({
  industry,
  active,
  className,
}: {
  industry: SolutionsIndustryId;
  active?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative flex min-h-[7.5rem] flex-col justify-center overflow-hidden rounded-xl border border-border bg-[color-mix(in_oklab,var(--surface)_90%,#f4efe6)] p-3 dark:bg-surface-muted/60",
        active && "ring-1 ring-accent/35",
        className,
      )}
      aria-hidden
    >
      {industry === "ecommerce" ? <EcommerceMark /> : null}
      {industry === "saas" ? <SaasMark /> : null}
      {industry === "services" ? <ServicesMark /> : null}
    </div>
  );
}

function EcommerceMark() {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-2">
        <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold tracking-[0.14em] text-muted uppercase">
          <Package className="size-3.5 text-accent" />
          Order slip
        </span>
        <span className="font-mono text-[10px] text-accent">ORD-48291</span>
      </div>
      <div className="rounded-lg border border-dashed border-border bg-surface px-2.5 py-2">
        <p className="font-mono text-[10px] text-muted">In transit</p>
        <svg viewBox="0 0 120 12" className="mt-1.5 h-3 w-full">
          <path
            d="M2 6 H118"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="2"
            strokeDasharray="4 3"
          />
        </svg>
      </div>
    </div>
  );
}

function SaasMark() {
  return (
    <div className="overflow-hidden rounded-lg border border-border bg-surface">
      <div className="flex items-center gap-1.5 border-b border-border bg-surface-muted/70 px-2 py-1.5">
        <span className="size-1.5 rounded-full bg-danger/70" />
        <span className="size-1.5 rounded-full bg-warning/70" />
        <span className="size-1.5 rounded-full bg-success/70" />
        <span className="ml-2 inline-flex items-center gap-1 rounded-md bg-accent-soft px-1.5 py-0.5 text-[10px] font-medium text-accent">
          <SquareStack className="size-3" />
          Workspace access
        </span>
      </div>
      <div className="grid grid-cols-[48px_1fr] gap-2 p-2">
        <div className="rounded-md bg-surface-muted" />
        <div className="space-y-1.5">
          <div className="h-2 rounded bg-surface-muted" />
          <div className="h-2 w-3/4 rounded bg-accent/25" />
          <div className="h-2 w-1/2 rounded bg-surface-muted" />
        </div>
      </div>
    </div>
  );
}

function ServicesMark() {
  return (
    <div className="grid grid-cols-2 gap-2">
      <div className="rounded-lg border border-border bg-surface p-2">
        <p className="inline-flex items-center gap-1 text-[10px] font-semibold tracking-[0.12em] text-muted uppercase">
          <CalendarDays className="size-3 text-accent" />
          Booking
        </p>
        <p className="mt-2 font-mono text-[11px] font-medium">Thu · 2:00 PM</p>
        <p className="mt-1 text-[10px] text-muted">Consultation</p>
      </div>
      <div className="rounded-lg border border-border bg-surface p-2">
        <p className="text-[10px] font-semibold tracking-[0.12em] text-muted uppercase">
          Invoice
        </p>
        <p className="mt-2 font-mono text-[11px] font-medium text-accent">
          INV-2048
        </p>
        <p className="mt-1 text-[10px] text-muted">Review amount</p>
      </div>
    </div>
  );
}
