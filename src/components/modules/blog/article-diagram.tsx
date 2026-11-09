import { cn } from "@/utils/cn";
import type { BlogDiagramKind } from "@/types/editorial";

type ArticleDiagramProps = {
  kind: BlogDiagramKind;
  caption: string;
  className?: string;
};

export function ArticleDiagram({
  kind,
  caption,
  className,
}: ArticleDiagramProps) {
  return (
    <figure className={cn("my-5", className)}>
      <div
        className="overflow-hidden rounded-[1.35rem] border border-border bg-surface-muted/40 p-5 shadow-[var(--shadow-soft)] sm:p-6"
        role="img"
        aria-label={caption}
      >
        {kind === "handoff" ? <HandoffDiagram /> : null}
        {kind === "inbox" ? <InboxDiagram /> : null}
        {kind === "routing" ? <RoutingDiagram /> : null}
        {kind === "metrics" ? <MetricsDiagram /> : null}
        {kind === "notes" ? <NotesDiagram /> : null}
        {kind === "explore" ? <ExploreDiagram /> : null}
      </div>
      <figcaption className="mt-3 text-sm leading-6 text-muted">
        {caption}
      </figcaption>
    </figure>
  );
}

function Node({
  label,
  accent,
}: {
  label: string;
  accent?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-xl border px-3 py-2 text-center text-xs font-medium sm:text-sm",
        accent
          ? "border-accent/40 bg-accent-soft text-accent"
          : "border-border bg-surface text-foreground",
      )}
    >
      {label}
    </div>
  );
}

function HandoffDiagram() {
  return (
    <div className="flex flex-col items-stretch sm:flex-row sm:items-center sm:justify-between">
      <Node label="Automation" />
      <div
        className="mx-auto h-5 w-px shrink-0 bg-gradient-to-b from-border to-accent/55 sm:mx-0 sm:hidden"
        aria-hidden
      />
      <div
        className="mx-3 hidden h-px min-w-6 flex-1 bg-gradient-to-r from-border to-accent/55 sm:block"
        aria-hidden
      />
      <Node label="Shared context" accent />
      <div
        className="mx-auto h-5 w-px shrink-0 bg-gradient-to-b from-accent/55 to-border sm:mx-0 sm:hidden"
        aria-hidden
      />
      <div
        className="mx-3 hidden h-px min-w-6 flex-1 bg-gradient-to-r from-accent/55 to-border sm:block"
        aria-hidden
      />
      <Node label="Specialist" />
    </div>
  );
}

function InboxDiagram() {
  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        {["All", "Open", "Resolved"].map((label, index) => (
          <span
            key={label}
            className={cn(
              "rounded-full px-3 py-1 text-xs font-medium",
              index === 1
                ? "bg-accent text-accent-foreground"
                : "bg-surface text-muted border border-border",
            )}
          >
            {label}
          </span>
        ))}
      </div>
      <div className="space-y-2">
        {["Order update", "Billing question", "Login help"].map((title, index) => (
          <div
            key={title}
            className={cn(
              "rounded-xl border border-border bg-surface px-3 py-2.5",
              index === 0 && "border-accent/35 shadow-sm",
            )}
          >
            <div className="text-sm font-medium text-foreground">{title}</div>
            <div className="mt-1 text-xs text-muted">Waiting for assignment</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function RoutingDiagram() {
  return (
    <div className="flex flex-col items-center gap-3">
      <Node label="New inquiry" />
      <div className="h-6 w-px bg-border" />
      <Node label="Topic condition" accent />
      <div className="grid w-full gap-3 sm:grid-cols-2">
        <div className="flex flex-col items-center gap-2">
          <div className="h-5 w-px bg-accent/40" />
          <Node label="Matched → Team" accent />
        </div>
        <div className="flex flex-col items-center gap-2">
          <div className="h-5 w-px bg-border" />
          <Node label="Otherwise → Triage" />
        </div>
      </div>
    </div>
  );
}

function MetricsDiagram() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {["Total", "Open", "Resolved", "Assigned"].map((label) => (
          <div
            key={label}
            className="rounded-xl border border-border bg-surface px-3 py-3"
          >
            <div className="text-[10px] tracking-wide text-muted uppercase">
              {label}
            </div>
            <div className="mt-2 h-2 w-12 rounded-full bg-accent/70" />
          </div>
        ))}
      </div>
      <div className="flex h-16 items-end gap-2 rounded-xl border border-border bg-surface px-3 py-2">
        {[40, 55, 35, 70, 48, 62, 50].map((height, index) => (
          <div
            key={index}
            className="flex-1 rounded-t-md bg-gradient-to-t from-accent/25 to-accent/80"
            style={{ height: `${height}%` }}
          />
        ))}
      </div>
    </div>
  );
}

function NotesDiagram() {
  return (
    <div className="space-y-3">
      <div className="rounded-2xl rounded-bl-md border border-border bg-surface px-4 py-3 text-sm text-muted">
        Customer message in the shared thread
      </div>
      <div className="rounded-2xl rounded-br-md border border-amber-500/25 bg-amber-500/10 px-4 py-3 text-sm text-foreground">
        <div className="text-[10px] font-semibold tracking-wide text-amber-700 uppercase dark:text-amber-200">
          Internal note
        </div>
        <p className="mt-1 text-muted">
          Context for the next teammate—never mixed into the customer reply.
        </p>
      </div>
    </div>
  );
}

function ExploreDiagram() {
  return (
    <div className="grid gap-3 sm:grid-cols-3">
      {["Inbox", "Automation", "Insights"].map((label, index) => (
        <div
          key={label}
          className={cn(
            "rounded-2xl border border-border bg-surface px-4 py-5 text-center",
            index === 1 && "border-accent/40 bg-accent-soft/40",
          )}
        >
          <div className="text-sm font-semibold text-foreground">{label}</div>
          <div className="mt-2 text-xs text-muted">Connected view</div>
        </div>
      ))}
    </div>
  );
}
