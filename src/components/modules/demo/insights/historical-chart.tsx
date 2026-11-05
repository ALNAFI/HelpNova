"use client";

import { useId, useMemo, useState } from "react";
import { getHistoricalSample } from "@/data/demo/historical-sample";
import { cn } from "@/utils/cn";

type HistoricalChartProps = {
  range: 7 | 30;
  onRangeChange: (range: 7 | 30) => void;
};

export function HistoricalChart({ range, onRangeChange }: HistoricalChartProps) {
  const gradientId = useId().replace(/:/g, "");
  const data = getHistoricalSample(range);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const max = Math.max(...data.map((d) => d.volume), 1);
  const yTicks = useMemo(() => niceTicks(max), [max]);
  const yMax = yTicks[yTicks.length - 1] ?? max;

  const width = 640;
  const height = 220;
  const padL = 40;
  const padR = 16;
  const padT = 16;
  const padB = 36;
  const innerW = width - padL - padR;
  const innerH = height - padT - padB;

  const points = data.map((point, index) => {
    const x =
      padL +
      (data.length === 1 ? innerW / 2 : (index / (data.length - 1)) * innerW);
    const y = padT + innerH - (point.volume / yMax) * innerH;
    return { ...point, x, y, index };
  });

  const line = points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`)
    .join(" ");
  const area = `${line} L ${points[points.length - 1].x.toFixed(1)} ${(padT + innerH).toFixed(1)} L ${points[0].x.toFixed(1)} ${(padT + innerH).toFixed(1)} Z`;
  const active = activeIndex === null ? null : points[activeIndex];

  return (
    <section className="rounded-2xl border border-[var(--demo-border)] bg-[var(--demo-panel)]/85 p-4 sm:p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-heading text-base font-semibold">
              Conversation volume
            </h3>
            <span className="rounded-md border border-[var(--demo-border)] bg-[var(--demo-panel-2)] px-1.5 py-0.5 text-[11px] font-medium text-[var(--demo-muted)]">
              Demo history
            </span>
          </div>
          <p className="mt-1 text-[13px] leading-snug text-[var(--demo-muted)] sm:text-sm">
            Fixed sample volume for this chart only.
          </p>
        </div>
        <div
          role="group"
          aria-label="Conversation volume range"
          className="inline-flex rounded-lg border border-[var(--demo-border)] bg-[var(--demo-panel-2)] p-0.5"
        >
          {([7, 30] as const).map((value) => (
            <button
              key={value}
              type="button"
              aria-pressed={range === value}
              onClick={() => {
                setActiveIndex(null);
                onRangeChange(value);
              }}
              className={cn(
                "rounded-md px-2.5 py-1.5 text-[12px] font-medium transition sm:text-[13px]",
                range === value
                  ? "bg-[var(--demo-panel)] text-[var(--demo-text)] shadow-sm"
                  : "text-[var(--demo-muted)] hover:text-[var(--demo-text)]",
              )}
            >
              {value} days
            </button>
          ))}
        </div>
      </div>

      <div className="relative mt-4 w-full">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="h-48 w-full sm:h-52"
          role="img"
          aria-label={`Demo conversation volume for ${range} days`}
          onMouseLeave={() => setActiveIndex(null)}
        >
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.32" />
              <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.02" />
            </linearGradient>
          </defs>

          {yTicks.map((tick) => {
            const y = padT + innerH - (tick / yMax) * innerH;
            return (
              <g key={tick}>
                <line
                  x1={padL}
                  x2={width - padR}
                  y1={y}
                  y2={y}
                  stroke="var(--demo-border)"
                  strokeWidth="1"
                />
                <text
                  x={padL - 8}
                  y={y + 3}
                  textAnchor="end"
                  className="fill-[var(--demo-muted)] text-[10px]"
                >
                  {tick}
                </text>
              </g>
            );
          })}

          <path d={area} fill={`url(#${gradientId})`} />
          <path
            d={line}
            fill="none"
            stroke="var(--accent)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {points.map((p) => (
            <g key={p.date}>
              <circle
                cx={p.x}
                cy={p.y}
                r={activeIndex === p.index ? 5 : 3.5}
                fill="var(--accent)"
                className="transition-[r] duration-150"
              />
              <text
                x={p.x}
                y={height - 10}
                textAnchor="middle"
                className="fill-[var(--demo-muted)] text-[10px]"
              >
                {p.label}
              </text>
              <rect
                x={p.x - innerW / data.length / 2}
                y={padT}
                width={innerW / data.length}
                height={innerH}
                fill="transparent"
                onMouseEnter={() => setActiveIndex(p.index)}
                onFocus={() => setActiveIndex(p.index)}
                tabIndex={0}
                role="listitem"
                aria-label={`${p.date}: ${p.volume} conversations`}
              />
            </g>
          ))}

          {active ? (
            <g pointerEvents="none">
              <line
                x1={active.x}
                x2={active.x}
                y1={padT}
                y2={padT + innerH}
                stroke="var(--accent)"
                strokeOpacity="0.35"
                strokeDasharray="3 3"
              />
            </g>
          ) : null}
        </svg>

        {active ? (
          <div
            role="tooltip"
            className="pointer-events-none absolute top-2 z-10 max-w-[200px] -translate-x-1/2 rounded-lg border border-[var(--demo-border)] bg-[var(--demo-panel)] px-2.5 py-1.5 text-[12px] shadow-lg"
            style={{
              left: `clamp(96px, ${(active.x / width) * 100}%, calc(100% - 96px))`,
            }}
          >
            <p className="font-medium text-[var(--demo-text)]">{active.date}</p>
            <p className="tabular-nums text-[var(--demo-muted)]">
              {active.volume} conversations
            </p>
          </div>
        ) : null}
      </div>

      <table className="sr-only">
        <caption>Demo conversation volume ({range} days)</caption>
        <thead>
          <tr>
            <th scope="col">Date</th>
            <th scope="col">Conversations</th>
          </tr>
        </thead>
        <tbody>
          {data.map((point) => (
            <tr key={point.date}>
              <td>{point.date}</td>
              <td>{point.volume}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

function niceTicks(max: number): number[] {
  if (max <= 0) return [0];
  const rough = max / 4;
  const magnitude = 10 ** Math.floor(Math.log10(rough));
  const residual = rough / magnitude;
  const step =
    residual <= 1 ? magnitude : residual <= 2 ? 2 * magnitude : residual <= 5 ? 5 * magnitude : 10 * magnitude;
  const top = Math.ceil(max / step) * step;
  const ticks: number[] = [];
  for (let value = 0; value <= top + 0.0001; value += step) {
    ticks.push(Math.round(value));
  }
  return ticks;
}
