import type { ReactNode } from "react";
import { cn } from "@/utils/cn";
import type { BlogVisualId } from "@/types/editorial";

type ArticleVisualProps = {
  visual: BlogVisualId;
  className?: string;
  tone?: "default" | "spotlight";
};

const titles: Record<BlogVisualId, string> = {
  handoffs: "Illustration of a calm conversation handoff",
  inbox: "Illustration of a shared inbox workspace",
  routing: "Illustration of topic-based workflow routing",
  metrics: "Illustration of support metrics and charts",
  notes: "Illustration of internal notes beside a thread",
  integrations: "Illustration of exploring workflows before integrations",
};

export function ArticleVisual({
  visual,
  className,
  tone = "default",
}: ArticleVisualProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[1.25rem]",
        tone === "spotlight" ? "min-h-[16rem] sm:min-h-[20rem]" : "aspect-[16/11]",
        className,
      )}
      role="img"
      aria-label={titles[visual]}
    >
      <div
        className={cn(
          "absolute inset-0",
          visual === "handoffs" &&
            "bg-[radial-gradient(circle_at_20%_20%,color-mix(in_oklab,var(--accent)_34%,transparent),transparent_42%),linear-gradient(145deg,#171321,#2a2140_48%,#6d28d9)]",
          visual === "inbox" &&
            "bg-[radial-gradient(circle_at_80%_10%,color-mix(in_oklab,#38bdf8_28%,transparent),transparent_40%),linear-gradient(160deg,#12101a,#1c2438_50%,#334155)]",
          visual === "routing" &&
            "bg-[radial-gradient(circle_at_70%_80%,color-mix(in_oklab,#34d399_22%,transparent),transparent_45%),linear-gradient(150deg,#10141c,#1a2740_46%,#4338ca)]",
          visual === "metrics" &&
            "bg-[radial-gradient(circle_at_30%_70%,color-mix(in_oklab,#f59e0b_20%,transparent),transparent_42%),linear-gradient(155deg,#140f1c,#241832_48%,#7c3aed)]",
          visual === "notes" &&
            "bg-[radial-gradient(circle_at_75%_25%,color-mix(in_oklab,#a78bfa_30%,transparent),transparent_44%),linear-gradient(145deg,#15111f,#221a32_52%,#4c1d95)]",
          visual === "integrations" &&
            "bg-[radial-gradient(circle_at_18%_75%,color-mix(in_oklab,#22d3ee_20%,transparent),transparent_40%),linear-gradient(160deg,#10141a,#182433_48%,#0f766e)]",
        )}
      />
      <div className="absolute inset-0 bg-[linear-gradient(to_top,rgb(0_0_0_/_0.28),transparent_42%)]" />
      <div className="absolute inset-0 opacity-[0.18] [background-image:linear-gradient(to_right,rgb(255_255_255_/_0.16)_1px,transparent_1px),linear-gradient(to_bottom,rgb(255_255_255_/_0.16)_1px,transparent_1px)] [background-size:28px_28px]" />

      {visual === "handoffs" ? <HandoffsArt /> : null}
      {visual === "inbox" ? <InboxArt /> : null}
      {visual === "routing" ? <RoutingArt /> : null}
      {visual === "metrics" ? <MetricsArt /> : null}
      {visual === "notes" ? <NotesArt /> : null}
      {visual === "integrations" ? <IntegrationsArt /> : null}
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
        "rounded-2xl border border-white/15 bg-white/10 shadow-[0_18px_40px_rgb(0_0_0_/_0.22)] backdrop-blur-md",
        className,
      )}
    >
      {children}
    </div>
  );
}

function HandoffsArt() {
  return (
    <div className="absolute inset-0 flex items-center justify-center p-5 sm:p-6">
      <div className="relative w-full max-w-[27rem]">
        <Panel className="p-5 sm:p-6">
          <div className="mb-3 flex items-center gap-2">
            <span className="size-2.5 rounded-full bg-emerald-300" />
            <span className="text-xs font-medium tracking-wide text-white/80 uppercase">
              Handoff ready
            </span>
          </div>
          <div className="space-y-2.5">
            <div className="h-3 w-4/5 rounded-full bg-white/25" />
            <div className="h-3 w-3/5 rounded-full bg-white/15" />
          </div>
          <div className="mt-5 flex items-center justify-between gap-3">
            <div className="rounded-full bg-white/15 px-3.5 py-1.5 text-xs text-white/85">
              Automation
            </div>
            <div className="h-px flex-1 bg-gradient-to-r from-white/40 to-transparent" />
            <div className="rounded-full bg-accent px-3.5 py-1.5 text-xs text-accent-foreground">
              Specialist
            </div>
          </div>
        </Panel>
        <Panel className="absolute -right-2 -bottom-3 w-[58%] p-3.5 sm:-right-4 sm:p-4">
          <div className="text-[11px] tracking-wide text-white/65 uppercase">
            Context kept
          </div>
          <div className="mt-2.5 h-2.5 w-full rounded-full bg-white/20" />
          <div className="mt-2 h-2.5 w-2/3 rounded-full bg-white/12" />
        </Panel>
      </div>
    </div>
  );
}

function InboxArt() {
  return (
    <div className="absolute inset-0 flex items-center justify-center p-6 sm:p-8">
      <Panel className="w-full max-w-[21rem] p-3">
        <div className="mb-3 flex gap-2">
          {["All", "Open", "Resolved"].map((label, index) => (
            <span
              key={label}
              className={cn(
                "rounded-full px-2.5 py-1 text-[10px] font-medium",
                index === 1
                  ? "bg-sky-300/90 text-slate-900"
                  : "bg-white/10 text-white/75",
              )}
            >
              {label}
            </span>
          ))}
        </div>
        <div className="space-y-2">
          {[0, 1, 2].map((row) => (
            <div
              key={row}
              className={cn(
                "rounded-xl border border-white/10 px-3 py-2.5",
                row === 0 ? "bg-white/12" : "bg-white/5",
              )}
            >
              <div className="h-2 w-2/3 rounded-full bg-white/30" />
              <div className="mt-2 h-1.5 w-full rounded-full bg-white/12" />
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
}

function RoutingArt() {
  return (
    <div className="absolute inset-0 flex items-center justify-center p-6">
      <div className="relative flex w-full max-w-[20rem] flex-col items-center gap-3">
        <Panel className="px-4 py-2 text-[11px] font-medium text-white/90">
          New inquiry
        </Panel>
        <div className="h-6 w-px bg-white/30" />
        <Panel className="px-4 py-2 text-[11px] font-medium text-white/90">
          Topic condition
        </Panel>
        <div className="flex w-full items-start justify-center gap-4">
          <div className="flex flex-1 flex-col items-center gap-2">
            <div className="h-5 w-px bg-emerald-300/50" />
            <Panel className="w-full px-3 py-2 text-center text-[10px] text-emerald-100">
              Matched → Team
            </Panel>
          </div>
          <div className="flex flex-1 flex-col items-center gap-2">
            <div className="h-5 w-px bg-white/25" />
            <Panel className="w-full px-3 py-2 text-center text-[10px] text-white/80">
              Otherwise → Triage
            </Panel>
          </div>
        </div>
      </div>
    </div>
  );
}

function MetricsArt() {
  return (
    <div className="absolute inset-0 flex items-end justify-center p-6 sm:p-8">
      <Panel className="w-full max-w-[22rem] p-4">
        <div className="mb-4 grid grid-cols-3 gap-2">
          {["Open", "Resolved", "Rate"].map((label) => (
            <div key={label} className="rounded-xl bg-white/8 px-2.5 py-2">
              <div className="text-[9px] tracking-wide text-white/55 uppercase">
                {label}
              </div>
              <div className="mt-1 h-2 w-10 rounded-full bg-white/35" />
            </div>
          ))}
        </div>
        <div className="flex h-20 items-end gap-2">
          {[42, 58, 36, 70, 48, 64, 52].map((height, index) => (
            <div
              key={index}
              className="flex-1 rounded-t-md bg-gradient-to-t from-violet-300/30 to-violet-200/90"
              style={{ height: `${height}%` }}
            />
          ))}
        </div>
      </Panel>
    </div>
  );
}

function NotesArt() {
  return (
    <div className="absolute inset-0 flex items-center justify-center p-6 sm:p-8">
      <div className="relative w-full max-w-[21rem]">
        <Panel className="p-4">
          <div className="mb-3 text-[10px] tracking-wide text-white/60 uppercase">
            Customer thread
          </div>
          <div className="space-y-2">
            <div className="ml-auto h-8 w-3/4 rounded-2xl rounded-br-md bg-white/18" />
            <div className="h-8 w-2/3 rounded-2xl rounded-bl-md bg-white/10" />
          </div>
        </Panel>
        <Panel className="absolute -right-1 -bottom-4 w-[70%] border-amber-200/20 bg-amber-300/15 p-3 sm:-right-3">
          <div className="text-[10px] font-semibold tracking-wide text-amber-100 uppercase">
            Internal note
          </div>
          <div className="mt-2 h-2 w-full rounded-full bg-amber-100/35" />
          <div className="mt-1.5 h-2 w-4/5 rounded-full bg-amber-100/20" />
        </Panel>
      </div>
    </div>
  );
}

function IntegrationsArt() {
  return (
    <div className="absolute inset-0 flex items-center justify-center p-6 sm:p-8">
      <div className="relative w-full max-w-[21rem]">
        <Panel className="p-4">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-[11px] font-medium text-white/85">
              Product workspace
            </span>
            <span className="rounded-full bg-cyan-300/90 px-2 py-0.5 text-[10px] font-semibold text-slate-900">
              Local
            </span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {["Inbox", "Flows", "Insights"].map((label) => (
              <div
                key={label}
                className="rounded-xl border border-white/10 bg-white/8 px-2 py-3 text-center text-[10px] text-white/80"
              >
                {label}
              </div>
            ))}
          </div>
        </Panel>
        <div className="absolute -top-3 -left-2 flex gap-2">
          {["A", "B", "C"].map((label) => (
            <span
              key={label}
              className="flex size-8 items-center justify-center rounded-xl border border-white/15 bg-white/10 text-[11px] font-semibold text-white/80 backdrop-blur-md"
            >
              {label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
