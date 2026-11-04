"use client";

import { cn } from "@/utils/cn";

export function AutomationCoreFallback({
  className,
  stage = 0,
}: {
  className?: string;
  stage?: number;
}) {
  return (
    <div
      className={cn(
        "pointer-events-none relative aspect-square w-full max-w-[28rem]",
        className,
      )}
      aria-hidden
    >
      <div className="absolute inset-[18%] rounded-full border border-[color-mix(in_oklab,var(--au-cyan)_45%,transparent)] opacity-70" />
      <div className="absolute inset-[28%] rounded-full border border-[color-mix(in_oklab,var(--accent)_55%,transparent)]" />
      <div
        className="absolute inset-[38%] rounded-full bg-[radial-gradient(circle_at_30%_30%,var(--au-lavender),var(--accent)_55%,var(--au-indigo))] shadow-[0_0_60px_color-mix(in_oklab,var(--accent)_45%,transparent)]"
        style={{ transform: `scale(${1 + stage * 0.02})` }}
      />
      {[0, 1, 2, 3, 4].map((index) => {
        const angle = (index / 5) * Math.PI * 2 + stage * 0.35;
        const x = 50 + Math.cos(angle) * 38;
        const y = 50 + Math.sin(angle) * 38;
        return (
          <span
            key={index}
            className="absolute size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--au-cyan)] shadow-[0_0_12px_var(--au-cyan)]"
            style={{ left: `${x}%`, top: `${y}%` }}
          />
        );
      })}
    </div>
  );
}
