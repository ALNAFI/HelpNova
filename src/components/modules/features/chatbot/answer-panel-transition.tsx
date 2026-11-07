"use client";

import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { cn } from "@/utils/cn";

const EASE = "cubic-bezier(0.65, 0, 0.35, 1)";
const OUT_MS = 280;
const IN_MS = 520;
/** Height ease — coordinated with the content enter. */
const HEIGHT_MS = 520;
const HEIGHT_TICK_MS = 16;

type Phase = "idle" | "out" | "in";

/** GooeyNav / CSS ease-in-out cubic. */
function travelEase(t: number) {
  const x = Math.min(1, Math.max(0, t));
  return x < 0.5 ? 4 * x * x * x : 1 - (-2 * x + 2) ** 3 / 2;
}

function stopHeightAnimations(shell: HTMLDivElement) {
  shell.getAnimations?.().forEach((animation) => animation.cancel());
}

function measureIncomingHeight(
  shell: HTMLDivElement,
  live: HTMLDivElement,
): number {
  const probe = live.cloneNode(true) as HTMLElement;
  probe.setAttribute("data-answer-probe", "");
  probe.style.position = "absolute";
  probe.style.visibility = "hidden";
  probe.style.pointerEvents = "none";
  probe.style.left = "0";
  probe.style.right = "0";
  probe.style.top = "0";
  probe.style.height = "auto";
  probe.style.maxHeight = "none";
  probe.style.overflow = "visible";
  probe.style.transform = "none";
  probe.style.opacity = "1";
  probe.style.transition = "none";
  probe.classList.remove(
    "invisible",
    "answer-panel-enter-prep",
    "answer-panel-enter",
    "answer-panel-exit",
  );
  probe.querySelectorAll("[data-answer-stage]").forEach((node) => {
    const el = node as HTMLElement;
    el.style.opacity = "1";
    el.style.transform = "none";
    el.style.animation = "none";
    el.style.transition = "none";
  });
  shell.appendChild(probe);
  const height = probe.getBoundingClientRect().height;
  shell.removeChild(probe);
  return height;
}

type HeightRun = { stop: () => void };

/**
 * Interval-driven height tween keeps the card top fixed while the bottom
 * edge expands or shrinks. Avoids rAF/WAAPI throttling in some environments.
 */
function animateShellHeight(
  shell: HTMLDivElement,
  from: number,
  to: number,
  durationMs: number,
): HeightRun {
  stopHeightAnimations(shell);
  shell.style.transition = "none";
  shell.style.overflow = "hidden";
  shell.style.height = `${from}px`;

  if (Math.round(from) === Math.round(to) || durationMs <= 0) {
    shell.style.height = `${Math.round(to)}px`;
    return { stop: () => undefined };
  }

  let timer = 0;
  const start = performance.now();

  timer = window.setInterval(() => {
    const progress = Math.min(1, (performance.now() - start) / durationMs);
    const next = from + (to - from) * travelEase(progress);
    shell.style.height = `${next}px`;
    if (progress >= 1) {
      window.clearInterval(timer);
      shell.style.height = `${Math.round(to)}px`;
    }
  }, HEIGHT_TICK_MS);

  return {
    stop: () => {
      window.clearInterval(timer);
    },
  };
}

/**
 * Premium staged transition for the chatbot answer panel.
 * Fades the previous answer out, reveals heading → body → CTA,
 * and smoothly expands or shrinks the card height.
 */
export function AnswerPanelTransition({
  switchKey,
  children,
  className,
}: {
  switchKey: string;
  children: ReactNode;
  className?: string;
}) {
  const reducedRef = useRef(false);
  const generationRef = useRef(0);
  const shellRef = useRef<HTMLDivElement>(null);
  const liveRef = useRef<HTMLDivElement>(null);
  const pendingRef = useRef<{ key: string; node: ReactNode } | null>(null);
  const lastShownRef = useRef(children);
  const fromHeightRef = useRef(0);
  const heightRunRef = useRef<HeightRun | null>(null);

  const [activeKey, setActiveKey] = useState(switchKey);
  const [held, setHeld] = useState(children);
  const [leaving, setLeaving] = useState<ReactNode | null>(null);
  const [phase, setPhase] = useState<Phase>("idle");
  const [enterArmed, setEnterArmed] = useState(false);
  const [hasSwitched, setHasSwitched] = useState(false);

  const stopHeight = () => {
    heightRunRef.current?.stop();
    heightRunRef.current = null;
  };

  const clearShellHeight = (shell: HTMLDivElement | null) => {
    if (!shell) return;
    stopHeight();
    stopHeightAnimations(shell);
    shell.style.transition = "";
    shell.style.height = "";
    shell.style.overflow = "";
  };

  const lockShellHeight = (shell: HTMLDivElement | null, height: number) => {
    if (!shell || height <= 0) return;
    stopHeight();
    stopHeightAnimations(shell);
    shell.style.transition = "none";
    shell.style.overflow = "hidden";
    shell.style.height = `${Math.round(height)}px`;
  };

  useLayoutEffect(() => {
    reducedRef.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
  }, []);

  useEffect(() => {
    if (phase === "idle" && switchKey === activeKey) {
      lastShownRef.current = children;
    }
  }, [phase, switchKey, activeKey, children]);

  useEffect(() => {
    if (switchKey === activeKey) return;

    const shell = shellRef.current;

    if (reducedRef.current) {
      generationRef.current += 1;
      pendingRef.current = null;
      clearShellHeight(shell);
      setLeaving(null);
      setPhase("idle");
      setEnterArmed(false);
      setActiveKey(switchKey);
      setHeld(children);
      lastShownRef.current = children;
      return;
    }

    pendingRef.current = { key: switchKey, node: children };
    setHasSwitched(true);

    if (phase === "out") return;

    const height =
      shell?.offsetHeight || liveRef.current?.offsetHeight || 0;
    fromHeightRef.current = height;
    lockShellHeight(shell, height);

    generationRef.current += 1;
    setLeaving(lastShownRef.current);
    setEnterArmed(false);
    setPhase("out");
  }, [switchKey, children, activeKey, phase]);

  useEffect(() => {
    if (phase !== "out") return;

    const generation = generationRef.current;
    const timer = window.setTimeout(() => {
      if (generation !== generationRef.current) return;
      const next = pendingRef.current;
      pendingRef.current = null;
      if (next) {
        setActiveKey(next.key);
        setHeld(next.node);
        lastShownRef.current = next.node;
      }
      setLeaving(null);
      setPhase("in");
      setEnterArmed(false);
    }, OUT_MS);

    return () => window.clearTimeout(timer);
  }, [phase]);

  useLayoutEffect(() => {
    if (phase !== "in") return;
    lockShellHeight(
      shellRef.current,
      fromHeightRef.current || shellRef.current?.offsetHeight || 0,
    );
    setEnterArmed(true);
  }, [phase, activeKey]);

  useLayoutEffect(() => {
    if (phase !== "in" || !enterArmed) return;

    const shell = shellRef.current;
    const live = liveRef.current;
    if (!shell || !live) return;

    const from = Math.round(fromHeightRef.current || shell.offsetHeight);
    const to = Math.round(measureIncomingHeight(shell, live) || from);

    stopHeight();
    heightRunRef.current = animateShellHeight(shell, from, to, HEIGHT_MS);

    return () => {
      stopHeight();
    };
  }, [phase, enterArmed, activeKey]);

  useEffect(() => {
    if (phase !== "in" || !enterArmed) return;

    const generation = generationRef.current;
    const timer = window.setTimeout(() => {
      if (generation !== generationRef.current) return;
      clearShellHeight(shellRef.current);
      setPhase("idle");
      setEnterArmed(false);
    }, Math.max(IN_MS + 240, HEIGHT_MS + 40));

    return () => window.clearTimeout(timer);
  }, [phase, enterArmed, activeKey]);

  useEffect(() => {
    return () => {
      clearShellHeight(shellRef.current);
    };
  }, []);

  const live =
    phase === "idle" && switchKey === activeKey ? children : held;

  return (
    <div
      className={cn(className)}
      style={{
        ["--answer-ease" as string]: EASE,
        ["--answer-out-ms" as string]: `${OUT_MS}ms`,
        ["--answer-in-ms" as string]: `${IN_MS}ms`,
      }}
    >
      <div ref={shellRef} className="relative" data-answer-shell="">
        {leaving ? (
          <div
            className="answer-panel-layer answer-panel-exit pointer-events-none absolute inset-x-0 top-0"
            aria-hidden
          >
            {leaving}
          </div>
        ) : null}

        <div
          ref={liveRef}
          className={cn(
            "answer-panel-layer",
            phase === "out" && "invisible",
            phase === "in" && !enterArmed && "answer-panel-enter-prep",
            phase === "in" && enterArmed && "answer-panel-enter",
            !hasSwitched && phase === "idle" && "answer-panel-idle",
          )}
        >
          {live}
        </div>
      </div>
    </div>
  );
}
