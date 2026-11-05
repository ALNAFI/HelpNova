"use client";

type StatusChartProps = {
  open: number;
  resolved: number;
};

export function StatusChart({ open, resolved }: StatusChartProps) {
  const total = open + resolved;
  const openPct = total === 0 ? 0 : Math.round((open / total) * 100);
  const resolvedPct = total === 0 ? 0 : Math.round((resolved / total) * 100);
  // Keep pie segments exact when rounding leaves a 1% gap.
  const openShare = total === 0 ? 0 : open / total;
  const resolvedShare = total === 0 ? 0 : resolved / total;

  const radius = 62;
  const circumference = 2 * Math.PI * radius;
  const openLen = openShare * circumference;
  const resolvedLen = resolvedShare * circumference;

  return (
    <section className="rounded-2xl border border-[var(--demo-border)] bg-[var(--demo-panel)]/85 p-4 sm:p-5">
      <h3 className="font-heading text-base font-semibold">Conversation status</h3>
      <p className="mt-1 text-[13px] leading-snug text-[var(--demo-muted)] sm:text-sm">
        Open and resolved conversations at a glance.
      </p>

      <div className="mt-5 flex flex-col items-center gap-5 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
        <div className="relative size-44 shrink-0 sm:size-48">
          <svg
            viewBox="0 0 160 160"
            className="size-full -rotate-90"
            aria-hidden
          >
            <circle
              cx="80"
              cy="80"
              r={radius}
              fill="none"
              stroke="color-mix(in oklab, var(--demo-border) 80%, transparent)"
              strokeWidth="16"
            />
            {total > 0 ? (
              <>
                <circle
                  cx="80"
                  cy="80"
                  r={radius}
                  fill="none"
                  stroke="rgb(16 185 129)"
                  strokeWidth="16"
                  strokeDasharray={`${openLen} ${circumference - openLen}`}
                  strokeLinecap="butt"
                  className="transition-[stroke-dasharray] duration-500"
                />
                <circle
                  cx="80"
                  cy="80"
                  r={radius}
                  fill="none"
                  stroke="rgb(56 189 248)"
                  strokeWidth="16"
                  strokeDasharray={`${resolvedLen} ${circumference - resolvedLen}`}
                  strokeDashoffset={-openLen}
                  strokeLinecap="butt"
                  className="transition-[stroke-dasharray,stroke-dashoffset] duration-500"
                />
              </>
            ) : null}
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="font-heading text-[28px] font-semibold tabular-nums leading-none sm:text-[30px]">
              {total}
            </span>
            <span className="mt-1 text-[11px] font-medium uppercase tracking-wide text-[var(--demo-muted)]">
              Total
            </span>
          </div>
        </div>

        <ul className="w-full min-w-0 space-y-2.5 sm:max-w-[220px]">
          <StatusRow
            label="Open"
            count={open}
            percent={openPct}
            swatch="bg-emerald-500"
          />
          <StatusRow
            label="Resolved"
            count={resolved}
            percent={resolvedPct}
            swatch="bg-sky-500"
          />
        </ul>
      </div>

      <p className="sr-only">
        Open: {open} ({openPct}%). Resolved: {resolved} ({resolvedPct}%).
      </p>
    </section>
  );
}

function StatusRow({
  label,
  count,
  percent,
  swatch,
}: {
  label: string;
  count: number;
  percent: number;
  swatch: string;
}) {
  return (
    <li className="flex items-center justify-between gap-3 rounded-xl bg-[var(--demo-panel-2)] px-3 py-2.5 text-sm">
      <span className="inline-flex min-w-0 items-center gap-2">
        <span className={`size-2.5 shrink-0 rounded-full ${swatch}`} />
        <span className="truncate font-medium">{label}</span>
      </span>
      <span className="shrink-0 text-right tabular-nums">
        <span className="font-semibold text-[var(--demo-text)]">{count}</span>
        <span className="ml-2 text-[12px] text-[var(--demo-muted)]">
          {percent}%
        </span>
      </span>
    </li>
  );
}
