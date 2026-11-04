"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { ArrowUp } from "lucide-react";
import { SlingButton } from "@/components/ui/sling-button";
import { useTheme } from "@/context/theme-provider";
import { useLenis } from "@/context/lenis-context";
import { cn } from "@/utils/cn";

const SHOW_AFTER = 0.04;
const STROKE = 2.75;
/** Desktop control size — mobile uses a smaller size with the same corner anchor. */
const SIZE_DESKTOP = 52;
const SIZE_MOBILE = 40;

function ringMetrics(size: number) {
  const wellRadius = size / 2 + 4 + STROKE;
  const ringSize = Math.ceil(wellRadius * 2 + STROKE);
  const radius = (ringSize - STROKE) / 2;
  const circumference = 2 * Math.PI * radius;
  return { ringSize, radius, circumference };
}

function subscribeMobile(onChange: () => void) {
  const mq = window.matchMedia("(max-width: 639px)");
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

function getMobileSnapshot() {
  return window.matchMedia("(max-width: 639px)").matches;
}

export function BackToTop() {
  const { scrollToTop, getScrollProgress } = useLenis();
  const { resolvedTheme } = useTheme();
  const mounted = useSyncExternalStore(
    () => () => undefined,
    () => true,
    () => false,
  );
  const isMobile = useSyncExternalStore(
    subscribeMobile,
    getMobileSnapshot,
    () => false,
  );
  const isDark = !mounted || resolvedTheme === "dark";
  const ringRef = useRef<SVGCircleElement>(null);
  const [visible, setVisible] = useState(false);

  const size = isMobile ? SIZE_MOBILE : SIZE_DESKTOP;
  const { ringSize, radius, circumference } = ringMetrics(size);

  useEffect(() => {
    let frame = 0;
    let active = true;
    let lastVisible = false;
    let lastOffset = -1;

    const tick = () => {
      if (!active) return;

      const progress = getScrollProgress();
      const offset = circumference * (1 - progress);

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
  }, [getScrollProgress, circumference]);

  return (
    <div
      className={cn(
        // Same corner insets at every breakpoint — size shrinks inward from here.
        "fixed right-4 bottom-4 z-50 sm:right-6 sm:bottom-6",
        "transition-[opacity,transform] duration-300",
        visible
          ? "pointer-events-auto translate-y-0 opacity-100"
          : "pointer-events-none translate-y-3 opacity-0",
      )}
    >
      <div
        className="relative flex items-center justify-center"
        style={{ width: size, height: size }}
      >
        <svg
          className="pointer-events-none absolute top-1/2 left-1/2 z-0 -translate-x-1/2 -translate-y-1/2 -rotate-90"
          width={ringSize}
          height={ringSize}
          viewBox={`0 0 ${ringSize} ${ringSize}`}
          aria-hidden
        >
          <circle
            cx={ringSize / 2}
            cy={ringSize / 2}
            r={radius}
            fill="none"
            stroke={isDark ? "rgb(246 243 252 / 0.14)" : "rgb(23 19 33 / 0.1)"}
            strokeWidth={STROKE}
          />
          <circle
            ref={ringRef}
            cx={ringSize / 2}
            cy={ringSize / 2}
            r={radius}
            fill="none"
            stroke={
              isDark ? "url(#backToTopGlowDark)" : "url(#backToTopGlowLight)"
            }
            strokeWidth={STROKE}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={circumference}
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

        <SlingButton
          className="relative z-[1] isolate"
          onSend={scrollToTop}
          size={size}
          strokeWidth={STROKE}
          armAt={isMobile ? 34 : 44}
          maxPull={isMobile ? 110 : 140}
          launchSpeed={2400}
          recoil={0.18}
          flight={isMobile ? 80 : 100}
          particles={isMobile ? 10 : 12}
          spread={isMobile ? 40 : 52}
          axis="any"
          tapSends
          ariaLabel="Back to top"
          padColor={isDark ? "#F6F3FC" : "#FFFFFF"}
          iconColor="#171321"
          accentColor={isDark ? "#A78BFA" : "#6D28D9"}
          wellColor={isDark ? "#181420" : "#E7E2F3"}
          bandColor={isDark ? "#5B5470" : "#C4B5FD"}
        >
          <ArrowUp
            aria-hidden
            className="stroke-[2.25]"
            style={{
              width: Math.round(size * 0.4),
              height: Math.round(size * 0.4),
            }}
          />
        </SlingButton>
      </div>
    </div>
  );
}
