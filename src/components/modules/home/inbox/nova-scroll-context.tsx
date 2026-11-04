"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { getGsap } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

export type NovaExpression =
  | "neutral"
  | "curious"
  | "listening"
  | "thinking"
  | "connected"
  | "celebrating";

type NovaScrollValue = {
  progress: number;
  sectionIndex: number;
  expression: NovaExpression;
  focusOffset: number;
  setFocusOffset: (value: number) => void;
};

const expressions: NovaExpression[] = [
  "curious",
  "listening",
  "listening",
  "connected",
  "thinking",
  "connected",
  "thinking",
  "neutral",
  "celebrating",
];

const NovaScrollContext = createContext<NovaScrollValue>({
  progress: 0,
  sectionIndex: 0,
  expression: "curious",
  focusOffset: 0,
  setFocusOffset: () => undefined,
});

export function NovaScrollProvider({ children }: { children: ReactNode }) {
  const [progress, setProgress] = useState(0);
  const [focusOffset, setFocusOffset] = useState(0);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const root = document.getElementById("inbox-companion-page");
    if (!root) return;

    const { gsap, ScrollTrigger } = getGsap();
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: root,
        start: "top top",
        end: "bottom bottom",
        scrub: reducedMotion ? false : 0.4,
        onUpdate: (self) => setProgress(self.progress),
      });
    }, root);

    const onResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      ctx.revert();
    };
  }, [reducedMotion]);

  const sectionIndex = Math.min(8, Math.floor(progress * 9));
  const expression = expressions[sectionIndex] ?? "neutral";

  const value = useMemo(
    () => ({
      progress,
      sectionIndex,
      expression,
      focusOffset,
      setFocusOffset,
    }),
    [progress, sectionIndex, expression, focusOffset],
  );

  return (
    <NovaScrollContext.Provider value={value}>
      {children}
    </NovaScrollContext.Provider>
  );
}

export function useNovaScroll() {
  return useContext(NovaScrollContext);
}
