"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import { ArrowUp } from "lucide-react";
import { useLenis } from "@/context/lenis-context";
import { cn } from "@/utils/cn";

const SIZE = 52;
const STROKE = 2.75;
const RADIUS = (SIZE - STROKE) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
const SHOW_AFTER = 0.04;

export function BackToTop() {
  const { scrollToTop, getScrollProgress } = useLenis();
  const { resolvedTheme } = useTheme();
  const mounted = useSyncExternalStore(
    () => () => undefined,
    () => true,
    () => false,
  );
  const isDark = !mounted || resolvedTheme === "dark";

  const ringRef = useRef<SVGCircleElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let frame = 0;
    let active = true;
    let lastVisible = false;
    let lastOffset = -1;

    const tick = () => {
      if (!active) return;

      const progress = getScrollProgress();
      const offset = CIRCUMFERENCE * (1 - progress);

      if (ringRef.current && offset !== lastOffset) {
        lastOffset = offset;
        ringRef.current.style.strokeDashoffset = String(offset);
      }

      const nextVisible = progress > SHOW_AFTER;
      if (nextVisible !== lastVisible) {
        lastVisible = nextVisible;
        setVisible(nextVisible);
      }

      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);

    return () => {
      active = false;
      cancelAnimationFrame(frame);
    };
  }, [getScrollProgress]);

  return (
    <button
      type="button"
      aria-label="Back to top"
      onClick={scrollToTop}
      className={cn(
        "group fixed right-4 bottom-4 z-50 flex size-[52px] items-center justify-center sm:right-6 sm:bottom-6",
        "rounded-full backdrop-blur-md transition-[opacity,transform,box-shadow,background-color,border-color,color] duration-300",
        "active:scale-95",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        isDark
          ? "border-white/12 bg-[#181420]/92 text-[#F6F3FC] shadow-[0_8px_28px_rgb(0_0_0_/_0.35),0_0_20px_rgb(109_40_217_/_0.18)] hover:-translate-y-0.5 hover:bg-[#1f1830] hover:shadow-[0_10px_32px_rgb(0_0_0_/_0.4),0_0_24px_rgb(109_40_217_/_0.24)]"
          : "border-[#E7E2F3] bg-white/95 text-[#171321] shadow-[0_8px_24px_rgb(23_19_33_/_0.1),0_0_0_1px_rgb(109_40_217_/_0.04)] hover:-translate-y-0.5 hover:border-[#D4CBF0] hover:bg-white hover:shadow-[0_12px_28px_rgb(23_19_33_/_0.12),0_0_18px_rgb(109_40_217_/_0.12)]",
        visible
          ? "pointer-events-auto translate-y-0 opacity-100"
          : "pointer-events-none translate-y-3 opacity-0",
      )}
    >
      <svg
        className="pointer-events-none absolute inset-0 -rotate-90"
        width={SIZE}
        height={SIZE}
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        aria-hidden
      >
        <circle
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={RADIUS}
          fill="none"
          stroke={isDark ? "rgb(246 243 252 / 0.14)" : "rgb(23 19 33 / 0.1)"}
          strokeWidth={STROKE}
        />
        <circle
          ref={ringRef}
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={RADIUS}
          fill="none"
          stroke={
            isDark ? "url(#backToTopGlowDark)" : "url(#backToTopGlowLight)"
          }
          strokeWidth={STROKE}
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={CIRCUMFERENCE}
          style={{
            filter: isDark
              ? "drop-shadow(0 0 3px rgb(167 139 250 / 0.35))"
              : "drop-shadow(0 0 2px rgb(109 40 217 / 0.25))",
          }}
        />
        <defs>
          <linearGradient
            id="backToTopGlowDark"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#C4B5FD" />
            <stop offset="100%" stopColor="#8B5CF6" />
          </linearGradient>
          <linearGradient
            id="backToTopGlowLight"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#7C3AED" />
            <stop offset="100%" stopColor="#6D28D9" />
          </linearGradient>
        </defs>
      </svg>
      <ArrowUp
        className="relative size-5 stroke-[2.25] transition-transform duration-300 group-hover:-translate-y-0.5"
        aria-hidden
      />
    </button>
  );
}
