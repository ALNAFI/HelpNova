"use client";

import { createContext, useContext } from "react";

type LenisContextValue = {
  scrollToTop: () => void;
  /** Current page scroll progress from 0 to 1 (Lenis-aware). */
  getScrollProgress: () => number;
};

const LenisContext = createContext<LenisContextValue>({
  scrollToTop: () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  },
  getScrollProgress: () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    if (max <= 0) return 0;
    return Math.min(1, Math.max(0, window.scrollY / max));
  },
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
