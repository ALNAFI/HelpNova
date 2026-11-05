"use client";

import { useEffect, useMemo, useRef } from "react";
import Lenis from "lenis";
import { FloatingActions } from "@/components/common/floating-actions";
import { TextCursor } from "@/components/ui/text-cursor";
import { LenisProvider } from "@/context/lenis-context";
import { getGsap } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

function nativeScrollLimit() {
  return Math.max(
    0,
    document.documentElement.scrollHeight - window.innerHeight,
  );
}

function nativeProgress() {
  const max = nativeScrollLimit();
  if (max <= 0) return 0;
  return Math.min(1, Math.max(0, window.scrollY / max));
}

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const reducedMotion = usePrefersReducedMotion();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (reducedMotion) {
      lenisRef.current = null;
      return;
    }

    const { gsap, ScrollTrigger } = getGsap();
    const instance = new Lenis({
      duration: 1.1,
      smoothWheel: true,
      touchMultiplier: 1.4,
      allowNestedScroll: true,
    });

    lenisRef.current = instance;
    instance.on("scroll", ScrollTrigger.update);

    const ticker = (time: number) => {
      instance.raf(time * 1000);
    };

    gsap.ticker.add(ticker);
    gsap.ticker.lagSmoothing(0);

    const onAnchorClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const anchor = target?.closest("a[href^='#']") as HTMLAnchorElement | null;
      if (!anchor) return;
      const hash = anchor.getAttribute("href");
      if (!hash || hash === "#") return;
      const el = document.querySelector(hash);
      if (!el) return;
      event.preventDefault();
      instance.scrollTo(el as HTMLElement, { offset: -80 });
    };

    document.addEventListener("click", onAnchorClick);

    return () => {
      document.removeEventListener("click", onAnchorClick);
      gsap.ticker.remove(ticker);
      instance.destroy();
      lenisRef.current = null;
      ScrollTrigger.refresh();
    };
  }, [reducedMotion]);

  const value = useMemo(
    () => ({
      scrollToTop: () => {
        if (lenisRef.current) {
          lenisRef.current.scrollTo(0, { duration: 1.15 });
          return;
        }
        window.scrollTo({
          top: 0,
          behavior: reducedMotion ? "auto" : "smooth",
        });
      },
      getScrollProgress: () => {
        const lenis = lenisRef.current;
        if (lenis) return lenis.progress;
        return nativeProgress();
      },
      getScrollY: () => {
        const lenis = lenisRef.current;
        if (lenis) return lenis.scroll;
        return window.scrollY;
      },
      getScrollLimit: () => {
        const lenis = lenisRef.current;
        if (lenis) return lenis.limit;
        return nativeScrollLimit();
      },
    }),
    [reducedMotion],
  );

  return (
    <LenisProvider value={value}>
      <TextCursor
        text="!!"
        mode="stamp"
        fontSize={28}
        spacing={72}
        maxPoints={7}
        shrink={0.5}
        fade={0.55}
        smoothing={0.3}
        exitDuration={0.5}
        removalInterval={30}
        followMouseDirection
        keepUpright
        randomFloat
        popIn
        color="var(--accent)"
        fontFamily="var(--font-plus-jakarta), ui-sans-serif, system-ui, sans-serif"
        className="flex h-auto min-h-full w-full flex-1 flex-col"
      >
        {children}
      </TextCursor>
      <FloatingActions />
    </LenisProvider>
  );
}
