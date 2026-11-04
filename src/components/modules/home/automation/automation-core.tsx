"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import dynamic from "next/dynamic";
import { AutomationCoreFallback } from "@/components/modules/home/automation/automation-core-fallback";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { cn } from "@/utils/cn";

const AutomationCoreCanvas = dynamic(
  () =>
    import("@/components/modules/home/automation/automation-core-canvas").then(
      (mod) => mod.AutomationCoreCanvas,
    ),
  { ssr: false, loading: () => <AutomationCoreFallback /> },
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

export function AutomationCore({
  className,
  progress = 0,
}: {
  className?: string;
  progress?: number;
}) {
  const reducedMotion = usePrefersReducedMotion();
  const mobile = useSyncExternalStore(
    subscribeMobile,
    getMobileSnapshot,
    getServerMobileSnapshot,
  );
  const [webglOk, setWebglOk] = useState(true);

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
        "pointer-events-none relative mx-auto aspect-square w-full max-w-[32rem]",
        className,
      )}
      aria-hidden
    >
      {useFallback ? (
        <AutomationCoreFallback stage={progress * 8} />
      ) : (
        <AutomationCoreCanvas progress={progress} />
      )}
    </div>
  );
}
