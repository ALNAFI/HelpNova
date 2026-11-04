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

type AutomationScrollValue = {
  progress: number;
  sectionIndex: number;
};

const AutomationScrollContext = createContext<AutomationScrollValue>({
  progress: 0,
  sectionIndex: 0,
});

export function AutomationScrollProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [progress, setProgress] = useState(0);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const root = document.getElementById("automation-universe-page");
    if (!root) return;

    const { gsap, ScrollTrigger } = getGsap();
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: root,
        start: "top top",
        end: "bottom bottom",
        scrub: reducedMotion ? false : 0.45,
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
  const value = useMemo(
    () => ({ progress, sectionIndex }),
    [progress, sectionIndex],
  );

  return (
    <AutomationScrollContext.Provider value={value}>
      {children}
    </AutomationScrollContext.Provider>
  );
}

export function useAutomationScroll() {
  return useContext(AutomationScrollContext);
}
