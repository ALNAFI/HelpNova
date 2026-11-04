"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import dynamic from "next/dynamic";
import { NovaFallback } from "@/components/modules/home/inbox/nova-fallback";
import {
  useNovaScroll,
  type NovaExpression,
} from "@/components/modules/home/inbox/nova-scroll-context";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { cn } from "@/utils/cn";

const NovaScene = dynamic(
  () =>
    import("@/components/modules/home/inbox/nova-scene").then(
      (mod) => mod.NovaScene,
    ),
  { ssr: false, loading: () => <NovaFallback /> },
);

function subscribeMobile(onStoreChange: () => void) {
  const media = window.matchMedia("(max-width: 767px)");
  media.addEventListener("change", onStoreChange);
  return () => media.removeEventListener("change", onStoreChange);
}

function getMobileSnapshot() {
  return window.matchMedia("(max-width: 767px)").matches;
}

function getServerMobileSnapshot() {
  return false;
}

function detectWebgl() {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(
      canvas.getContext("webgl") || canvas.getContext("experimental-webgl"),
    );
  } catch {
    return false;
  }
}

export function NovaRobot({
  className,
  expressionOverride,
}: {
  className?: string;
  expressionOverride?: NovaExpression;
}) {
  const { progress, expression, focusOffset } = useNovaScroll();
  const reducedMotion = usePrefersReducedMotion();
  const mobile = useSyncExternalStore(
    subscribeMobile,
    getMobileSnapshot,
    getServerMobileSnapshot,
  );
  const [webglOk, setWebglOk] = useState(true);
  const activeExpression = expressionOverride ?? expression;

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setWebglOk(detectWebgl());
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  const useFallback = reducedMotion || !webglOk || mobile;

  return (
    <div
      className={cn(
        "pointer-events-none relative mx-auto aspect-square w-full max-w-[20rem]",
        className,
      )}
      aria-hidden
    >
      {useFallback ? (
        <NovaFallback expression={activeExpression} />
      ) : (
        <NovaScene
          progress={progress}
          expression={activeExpression}
          focusOffset={focusOffset}
        />
      )}
    </div>
  );
}
