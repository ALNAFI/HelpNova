"use client";

import { useSyncExternalStore } from "react";
import { NovaRobot } from "@/components/modules/home/inbox/nova-robot";
import { useNovaScroll } from "@/components/modules/home/inbox/nova-scroll-context";
import { cn } from "@/utils/cn";

function subscribeDesktop(onStoreChange: () => void) {
  const media = window.matchMedia("(min-width: 1280px)");
  media.addEventListener("change", onStoreChange);
  return () => media.removeEventListener("change", onStoreChange);
}

function getDesktopSnapshot() {
  return window.matchMedia("(min-width: 1280px)").matches;
}

function getServerDesktopSnapshot() {
  return false;
}

/** Section-anchored placement for the single NOVA canvas. */
const anchors = [
  { top: "18%", right: "6%", scale: 1 },
  { top: "28%", right: "5%", scale: 0.92 },
  { top: "24%", right: "4%", scale: 0.88 },
  { top: "30%", right: "5%", scale: 0.86 },
  { top: "34%", right: "7%", scale: 0.8 },
  { top: "28%", right: "6%", scale: 0.84 },
  { top: "42%", right: "5%", scale: 0.62 },
  { top: "48%", right: "6%", scale: 0.52 },
  { top: "22%", right: "8%", scale: 1.05 },
];

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function parsePercent(value: string) {
  return Number.parseFloat(value);
}

export function NovaCompanionLayer() {
  const { progress, sectionIndex } = useNovaScroll();
  const desktop = useSyncExternalStore(
    subscribeDesktop,
    getDesktopSnapshot,
    getServerDesktopSnapshot,
  );

  if (!desktop) return null;

  const scaled = progress * 8;
  const index = Math.min(7, Math.floor(scaled));
  const next = Math.min(8, index + 1);
  const t = scaled - index;
  const a = anchors[index];
  const b = anchors[next];
  const top = lerp(parsePercent(a.top), parsePercent(b.top), t);
  const right = lerp(parsePercent(a.right), parsePercent(b.right), t);
  const scale = lerp(a.scale, b.scale, t);
  const quiet = sectionIndex === 7;

  return (
    <div
      className={cn(
        "pointer-events-none fixed z-20 transition-opacity duration-200",
        quiet ? "opacity-45" : "opacity-100",
      )}
      style={{
        top: `${top}%`,
        right: `${right}%`,
        width: "15rem",
        transform: `scale(${scale})`,
        transformOrigin: "top right",
      }}
      aria-hidden
    >
      <NovaRobot className="max-w-none" />
    </div>
  );
}
