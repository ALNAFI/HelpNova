"use client";

import { getHistoricalSample } from "@/data/demo/historical-sample";
import { cn } from "@/utils/cn";

type HistoricalChartProps = {
  range: 7 | 30;
  onRangeChange: (range: 7 | 30) => void;
};

export function HistoricalChart({ range, onRangeChange }: HistoricalChartProps) {
  const data = getHistoricalSample(range);
  const max = Math.max(...data.map((d) => d.volume), 1);
  const width = 320;
  const height = 140;
  const padX = 16;
  const padY = 16;
  const innerW = width - padX * 2;
  const innerH = height - padY * 2;

  const points = data.map((point, index) => {
    const x =
      padX +
      (data.length === 1 ? innerW / 2 : (index / (data.length - 1)) * innerW);
    const y = padY + innerH - (point.volume / max) * innerH;
    return { ...point, x, y };
  });

  const line = points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`)
    .join(" ");
  const area = `${line} L ${points[points.length - 1].x.toFixed(1)} ${(padY + innerH).toFixed(1)} L ${points[0].x.toFixed(1)} ${(padY + innerH).toFixed(1)} Z`;

  return (
    <section className="rounded-2xl border border-[var(--demo-border)] bg-[var(--demo-panel)]/85 p-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="font-heading text-sm font-semibold">
            Historical Sample
          </h3>
          <p className="mt-1 text-xs text-[var(--demo-muted)]">
            Illustrative volume only — separate from live demo metrics.
          </p>
        </div>
        <div
          role="group"
          aria-label="Historical range"
          className="inline-flex rounded-lg border border-[var(--demo-border)] bg-[var(--demo-panel-2)] p-0.5"
        >
          {([7, 30] as const).map((value) => (
            <button
              key={value}
              type="button"
              aria-pressed={range === value}
              onClick={() => onRangeChange(value)}
              className={cn(
                "rounded-md px-2.5 py-1 text-xs font-medium transition",
                range === value
                  ? "bg-[var(--demo-panel)] text-[var(--demo-text)] shadow-sm"
                  : "text-[var(--demo-muted)]",
              )}
            >
              {value} Days
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4 overflow-x-auto">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="h-40 w-full min-w-[280px]"
          role="img"
          aria-label={`Historical sample volume for ${range} days`}
        >
          {[0, 0.5, 1].map((t) => {
            const y = padY + innerH * (1 - t);
            return (
              <line
                key={t}
                x1={padX}
                x2={width - padX}
                y1={y}
                y2={y}
                stroke="var(--demo-border)"
                strokeWidth="1"
              />
            );
          })}
          <path d={area} fill="url(#histFill)" opacity="0.9" />
          <path
            d={line}
            fill="none"
            stroke="var(--accent)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {points.map((p) => (
            <g key={p.label}>
              <circle cx={p.x} cy={p.y} r="3.5" fill="var(--accent)" />
              <text
                x={p.x}
                y={height - 2}
                textAnchor="middle"
                className="fill-[var(--demo-muted)] text-[9px]"
              >
                {p.label}
              </text>
            </g>
          ))}
          <defs>
            <linearGradient id="histFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.35" />
              <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.02" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <ul className="mt-2 grid grid-cols-2 gap-1 text-[11px] text-[var(--demo-muted)] sm:grid-cols-4">
        {points.map((p) => (
          <li key={`${p.label}-${p.volume}`} className="tabular-nums">
            {p.label}: {p.volume}
          </li>
        ))}
      </ul>
    </section>
  );
}
