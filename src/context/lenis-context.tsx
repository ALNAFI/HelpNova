"use client";

import { createContext, useContext } from "react";

type LenisContextValue = {
  scrollToTop: () => void;
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

const LenisContext = createContext<LenisContextValue>({
  scrollToTop: () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  },
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
