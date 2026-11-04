"use client";

type StatusChartProps = {
  open: number;
  resolved: number;
};

export function StatusChart({ open, resolved }: StatusChartProps) {
  const total = open + resolved;
  const openPct = total === 0 ? 0 : (open / total) * 100;
  const resolvedPct = total === 0 ? 0 : (resolved / total) * 100;

  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const openLen = (openPct / 100) * circumference;
  const resolvedLen = (resolvedPct / 100) * circumference;

  return (
    <section className="rounded-2xl border border-[var(--demo-border)] bg-[var(--demo-panel)]/85 p-4">
      <h3 className="font-heading text-sm font-semibold">Status distribution</h3>
      <p className="mt-1 text-xs text-[var(--demo-muted)]">
        Live counts from canonical conversations.
      </p>

      <div className="mt-4 flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
        <div className="relative size-36">
          <svg viewBox="0 0 140 140" className="size-full -rotate-90" aria-hidden>
            <circle
              cx="70"
              cy="70"
              r={radius}
              fill="none"
              stroke="color-mix(in oklab, var(--demo-border) 80%, transparent)"
              strokeWidth="14"
            />
            <circle
              cx="70"
              cy="70"
              r={radius}
              fill="none"
              stroke="rgb(16 185 129)"
              strokeWidth="14"
              strokeDasharray={`${openLen} ${circumference - openLen}`}
              strokeLinecap="round"
              className="transition-[stroke-dasharray] duration-500"
            />
            <circle
              cx="70"
              cy="70"
              r={radius}
              fill="none"
              stroke="rgb(56 189 248)"
              strokeWidth="14"
              strokeDasharray={`${resolvedLen} ${circumference - resolvedLen}`}
              strokeDashoffset={-openLen}
              strokeLinecap="round"
              className="transition-[stroke-dasharray,stroke-dashoffset] duration-500"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="font-heading text-2xl font-semibold tabular-nums">
              {total}
            </span>
            <span className="text-[10px] uppercase tracking-wide text-[var(--demo-muted)]">
              Total
            </span>
          </div>
        </div>

        <ul className="w-full space-y-2 text-sm sm:max-w-[180px]">
          <li className="flex items-center justify-between gap-3 rounded-xl bg-[var(--demo-panel-2)] px-3 py-2">
            <span className="inline-flex items-center gap-2">
              <span className="size-2.5 rounded-full bg-emerald-500" />
              Open
            </span>
            <span className="font-semibold tabular-nums">{open}</span>
          </li>
          <li className="flex items-center justify-between gap-3 rounded-xl bg-[var(--demo-panel-2)] px-3 py-2">
            <span className="inline-flex items-center gap-2">
              <span className="size-2.5 rounded-full bg-sky-400" />
              Resolved
            </span>
            <span className="font-semibold tabular-nums">{resolved}</span>
          </li>
        </ul>
      </div>

      <p className="sr-only">
        Open: {open}. Resolved: {resolved}.
      </p>
    </section>
  );
}
