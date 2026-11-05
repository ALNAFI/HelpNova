"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { ArrowUp } from "lucide-react";
import { SlingButton } from "@/components/ui/sling-button";
import { useChatbotOptional } from "@/context/chatbot-provider";
import { useTheme } from "@/context/theme-provider";
import { useLenis } from "@/context/lenis-context";
import { cn } from "@/utils/cn";

/** Show after roughly this many pixels of page scroll. */
const SHOW_AFTER_PX = 400;
/** Require enough scrollable distance that the control is useful. */
const MIN_SCROLL_LIMIT_PX = 480;
const STROKE = 2.5;
const SIZE = 44;

function ringMetrics(size: number) {
  const wellRadius = size / 2 + 4 + STROKE;
  const ringSize = Math.ceil(wellRadius * 2 + STROKE);
  const radius = (ringSize - STROKE) / 2;
  const circumference = 2 * Math.PI * radius;
  return { ringSize, radius, circumference };
}

export function BackToTop() {
  const { scrollToTop, getScrollProgress, getScrollY, getScrollLimit } =
    useLenis();
  const chatbotOpen = useChatbotOptional()?.isOpen ?? false;
  const { resolvedTheme } = useTheme();
  const mounted = useSyncExternalStore(
    () => () => undefined,
    () => true,
    () => false,
  );
  const isDark = !mounted || resolvedTheme === "dark";
  const ringRef = useRef<SVGCircleElement>(null);
  const [pastThreshold, setPastThreshold] = useState(false);

  const { ringSize, radius, circumference } = ringMetrics(SIZE);
  const visible = pastThreshold && !chatbotOpen;

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

      const scrollY = getScrollY();
      const limit = getScrollLimit();
      const nextVisible =
        limit >= MIN_SCROLL_LIMIT_PX && scrollY >= SHOW_AFTER_PX;
      if (nextVisible !== lastVisible) {
        lastVisible = nextVisible;
        setPastThreshold(nextVisible);
      }

      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);

    return () => {
      active = false;
      cancelAnimationFrame(frame);
    };
  }, [getScrollProgress, getScrollY, getScrollLimit, circumference]);

  return (
    <div
      data-fab-item="back-to-top"
      data-visible={visible ? "true" : "false"}
      className={cn(
        "relative flex items-center justify-center transition-[opacity,transform] duration-300",
        visible
          ? "pointer-events-auto translate-y-0 opacity-100"
          : "pointer-events-none invisible absolute inset-auto translate-y-3 opacity-0",
      )}
      style={{ width: ringSize, height: ringSize }}
      aria-hidden={!visible}
    >
      <div
        className="relative flex items-center justify-center"
        style={{ width: SIZE, height: SIZE }}
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
          size={SIZE}
          strokeWidth={STROKE}
          armAt={36}
          maxPull={120}
          launchSpeed={2400}
          recoil={0.18}
          flight={85}
          particles={10}
          spread={44}
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
              width: Math.round(SIZE * 0.4),
              height: Math.round(SIZE * 0.4),
            }}
          />
        </SlingButton>
      </div>
    </div>
  );
}
