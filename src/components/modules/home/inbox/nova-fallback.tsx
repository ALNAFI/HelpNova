"use client";

import { cn } from "@/utils/cn";

export function NovaFallback({
  className,
  expression = "curious",
}: {
  className?: string;
  expression?: string;
}) {
  const celebrating = expression === "celebrating";
  const connected = expression === "connected";

  return (
    <div
      className={cn("relative mx-auto aspect-square w-full max-w-[18rem]", className)}
      aria-hidden
    >
      <div className="absolute inset-[18%] rounded-full bg-[radial-gradient(circle_at_35%_30%,color-mix(in_oklab,var(--accent)_28%,transparent),transparent_62%)] blur-2xl" />
      <div className="absolute inset-[22%] rounded-[2rem] border border-border bg-[linear-gradient(160deg,var(--ih-pearl),color-mix(in_oklab,var(--surface)_70%,var(--ih-graphite)))] shadow-[var(--shadow-soft)]">
        <div className="absolute top-[18%] left-1/2 h-[28%] w-[46%] -translate-x-1/2 rounded-[1.4rem] bg-[color-mix(in_oklab,var(--ih-graphite)_18%,white)] dark:bg-[color-mix(in_oklab,var(--ih-pearl)_18%,#1a1624)]">
          <div className="absolute top-[38%] left-[22%] size-2.5 rounded-full bg-accent shadow-[0_0_12px_var(--accent)]" />
          <div className="absolute top-[38%] right-[22%] size-2.5 rounded-full bg-accent shadow-[0_0_12px_var(--accent)]" />
          <div className="absolute bottom-[22%] left-1/2 h-1 w-5 -translate-x-1/2 rounded-full bg-[var(--ih-cyan)]/70" />
        </div>
        <div className="absolute top-[8%] left-1/2 size-2 -translate-x-1/2 rounded-full bg-[var(--ih-cyan)] shadow-[0_0_10px_var(--ih-cyan)]" />
        <div
          className={cn(
            "absolute top-[48%] left-[8%] size-3 rounded-full bg-accent/40 transition",
            celebrating && "translate-y-1",
          )}
        />
        <div
          className={cn(
            "absolute top-[48%] right-[8%] size-3 rounded-full bg-[var(--ih-cyan)]/40 transition",
            celebrating && "-translate-y-1",
          )}
        />
        <div
          className={cn(
            "absolute inset-x-[28%] bottom-[16%] h-2 rounded-full transition",
            connected ? "bg-[var(--ih-cyan)]/50" : "bg-accent/30",
          )}
        />
      </div>
    </div>
  );
}
