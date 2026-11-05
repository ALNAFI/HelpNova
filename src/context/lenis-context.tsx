"use client";

import { createContext, useContext } from "react";

type LenisContextValue = {
  scrollToTop: () => void;
  /** Smooth-scroll to an element id or node, accounting for the sticky header. */
  scrollToElement: (
    target: string | HTMLElement,
    options?: { offset?: number; immediate?: boolean },
  ) => void;
  /** Current page scroll progress from 0 to 1 (Lenis-aware). */
  getScrollProgress: () => number;
  /** Current vertical scroll offset in pixels (Lenis-aware). */
  getScrollY: () => number;
  /** Maximum scrollable distance in pixels. */
  getScrollLimit: () => number;
};

function nativeScrollLimit() {
  return Math.max(
    0,
    document.documentElement.scrollHeight - window.innerHeight,
  );
}

function nativeScrollToElement(
  target: string | HTMLElement,
  options?: { offset?: number; immediate?: boolean },
) {
  const el =
    typeof target === "string" ? document.getElementById(target) : target;
  if (!el) return;
  const headerOffset =
    options?.offset ??
    (Number.parseFloat(
      getComputedStyle(document.documentElement).getPropertyValue(
        "--header-height",
      ),
    ) ||
      72);
  const top =
    el.getBoundingClientRect().top + window.scrollY - (headerOffset + 16);
  window.scrollTo({
    top: Math.max(0, top),
    behavior: options?.immediate ? "auto" : "smooth",
  });
}

const LenisContext = createContext<LenisContextValue>({
  scrollToTop: () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  },
  scrollToElement: nativeScrollToElement,
  getScrollProgress: () => {
    const max = nativeScrollLimit();
    if (max <= 0) return 0;
    return Math.min(1, Math.max(0, window.scrollY / max));
  },
  getScrollY: () => window.scrollY,
  getScrollLimit: () => nativeScrollLimit(),
});

export function LenisProvider({
  value,
  children,
}: {
  value: LenisContextValue;
  children: React.ReactNode;
}) {
  return (
    <LenisContext.Provider value={value}>{children}</LenisContext.Provider>
  );
}

export function useLenis() {
  return useContext(LenisContext);
}
