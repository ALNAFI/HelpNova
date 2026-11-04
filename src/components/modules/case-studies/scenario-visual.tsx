import type { ReactNode } from "react";
import { cn } from "@/utils/cn";
import type { CaseStudyVisualId } from "@/types/editorial";

type ScenarioVisualProps = {
  visual: CaseStudyVisualId;
  className?: string;
  tone?: "default" | "spotlight" | "hero";
};

const labels: Record<CaseStudyVisualId, string> = {
  orders: "Illustration of an order-tracking support scenario",
  billing: "Illustration of a billing support scenario",
  technical: "Illustration of a technical support scenario",
};

export function ScenarioVisual({
  visual,
  className,
  tone = "default",
}: ScenarioVisualProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[1.35rem]",
        tone === "spotlight" || tone === "hero"
          ? "min-h-[16rem] sm:min-h-[20rem]"
          : "aspect-[16/11]",
        className,
      )}
      role="img"
      aria-label={labels[visual]}
    >
      <div
        className={cn(
          "absolute inset-0",
          visual === "orders" &&
            "bg-[radial-gradient(circle_at_18%_20%,color-mix(in_oklab,#60a5fa_28%,transparent),transparent_42%),linear-gradient(150deg,#12101a,#1a2744_48%,#5b21b6)]",
          visual === "billing" &&
            "bg-[radial-gradient(circle_at_82%_18%,color-mix(in_oklab,#2dd4bf_24%,transparent),transparent_40%),linear-gradient(155deg,#10141a,#16303a_50%,#5b21b6)]",
          visual === "technical" &&
            "bg-[radial-gradient(circle_at_70%_80%,color-mix(in_oklab,#22d3ee_22%,transparent),transparent_44%),linear-gradient(148deg,#0f141c,#15263a_48%,#4c1d95)]",
        )}
      />
      <div className="absolute inset-0 bg-[linear-gradient(to_top,rgb(0_0_0_/_0.28),transparent_45%)]" />
      <div className="absolute inset-0 opacity-[0.16] [background-image:linear-gradient(to_right,rgb(255_255_255_/_0.15)_1px,transparent_1px),linear-gradient(to_bottom,rgb(255_255_255_/_0.15)_1px,transparent_1px)] [background-size:26px_26px]" />

      {visual === "orders" ? <OrdersArt /> : null}
      {visual === "billing" ? <BillingArt /> : null}
      {visual === "technical" ? <TechnicalArt /> : null}
    </div>
  );
}

function Panel({
  className,
  children,
}: {
  className?: string;
  children?: ReactNode;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-white/15 bg-white/10 shadow-[0_16px_36px_rgb(0_0_0_/_0.22)] backdrop-blur-md",
        className,
      )}
    >
      {children}
    </div>
  );
}

function OrdersArt() {
  return (
    <div className="absolute inset-0 flex items-center justify-center p-5 sm:p-7">
      <div className="relative w-full max-w-[22rem]">
        <Panel className="p-4">
          <div className="mb-3 flex items-center justify-between gap-3">
            <span className="text-[11px] font-medium text-white/85">
              Order inquiry
            </span>
            <span className="rounded-full bg-sky-300/90 px-2.5 py-0.5 text-[10px] font-semibold text-slate-900">
              Open
            </span>
          </div>
          <div className="space-y-2">
            <div className="h-2.5 w-4/5 rounded-full bg-white/30" />
            <div className="h-2.5 w-3/5 rounded-full bg-white/15" />
          </div>
          <div className="mt-4 flex items-center gap-2">
            <span className="rounded-full bg-white/12 px-2.5 py-1 text-[10px] text-white/80">
              Inbox
            </span>
            <div className="h-px flex-1 bg-gradient-to-r from-white/35 to-transparent" />
            <span className="rounded-full bg-accent px-2.5 py-1 text-[10px] text-accent-foreground">
              Orders
            </span>
          </div>
        </Panel>
        <Panel className="absolute -right-2 -bottom-3 w-[58%] border-amber-200/20 bg-amber-300/15 p-3">
          <div className="text-[10px] font-semibold tracking-wide text-amber-100 uppercase">
            Internal note
          </div>
          <div className="mt-2 h-2 w-full rounded-full bg-amber-100/30" />
          <div className="mt-1.5 h-2 w-2/3 rounded-full bg-amber-100/15" />
        </Panel>
      </div>
    </div>
  );
}

function BillingArt() {
  return (
    <div className="absolute inset-0 flex items-center justify-center p-5 sm:p-7">
      <div className="relative w-full max-w-[21rem]">
        <Panel className="p-4">
          <div className="mb-3 text-[10px] tracking-wide text-white/60 uppercase">
            Sample invoice cue
          </div>
          <div className="rounded-xl border border-white/10 bg-white/8 p-3">
            <div className="h-2 w-1/2 rounded-full bg-teal-200/70" />
            <div className="mt-3 space-y-1.5">
              <div className="h-1.5 w-full rounded-full bg-white/18" />
              <div className="h-1.5 w-4/5 rounded-full bg-white/12" />
              <div className="h-1.5 w-3/5 rounded-full bg-white/10" />
            </div>
          </div>
          <div className="mt-4 flex gap-2">
            <span className="rounded-full bg-white/12 px-2.5 py-1 text-[10px] text-white/80">
              Billing rule
            </span>
            <span className="rounded-full bg-teal-300/90 px-2.5 py-1 text-[10px] font-semibold text-slate-900">
              Billing team
            </span>
          </div>
        </Panel>
      </div>
    </div>
  );
}

function TechnicalArt() {
  return (
    <div className="absolute inset-0 flex items-center justify-center p-5 sm:p-7">
      <div className="w-full max-w-[21rem] space-y-3">
        <Panel className="p-3">
          <div className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-cyan-300" />
            <span className="text-[11px] text-white/85">Technical inquiry</span>
          </div>
        </Panel>
        <div className="grid grid-cols-2 gap-3">
          <Panel className="p-3">
            <div className="text-[10px] text-white/60 uppercase">Matched</div>
            <div className="mt-2 h-2 w-full rounded-full bg-cyan-200/70" />
          </Panel>
          <Panel className="p-3">
            <div className="text-[10px] text-white/60 uppercase">Team</div>
            <div className="mt-2 text-[11px] font-medium text-white/90">
              Technical
            </div>
          </Panel>
        </div>
        <Panel className="p-3">
          <div className="mb-2 text-[10px] text-white/60 uppercase">Insights</div>
          <div className="flex h-10 items-end gap-1.5">
            {[35, 55, 42, 70, 48, 62].map((height, index) => (
              <div
                key={index}
                className="flex-1 rounded-t-sm bg-gradient-to-t from-cyan-300/20 to-violet-200/80"
                style={{ height: `${height}%` }}
              />
            ))}
          </div>
        </Panel>
      </div>
    </div>
  );
}
