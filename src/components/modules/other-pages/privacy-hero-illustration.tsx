"use client";

import { useEffect, useRef, useState } from "react";
import {
  ClipboardList,
  Eye,
  EyeOff,
  SlidersHorizontal,
  ToggleRight,
} from "lucide-react";

import { cn } from "@/utils/cn";

import "./privacy-hero-illustration.css";

const ROWS = [
  {
    label: "What’s collected",
    masked: "••••••••••••",
    clear: "Clearly listed",
    Icon: ClipboardList,
  },
  {
    label: "How it’s used",
    masked: "••••••••••••••••",
    clear: "Explained in plain words",
    Icon: SlidersHorizontal,
  },
  {
    label: "Your choices",
    masked: "••••••••••••••",
    clear: "Choices you can see",
    Icon: ToggleRight,
  },
] as const;

function sleep(ms: number) {
  return new Promise<void>((resolve) => {
    window.setTimeout(resolve, ms);
  });
}

export function PrivacyHeroIllustration() {
  const visRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const rowsRef = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);
  const [ok, setOk] = useState(false);

  useEffect(() => {
    const vis = visRef.current;
    const stage = stageRef.current;
    if (!vis || !stage) return;

    const resizeObserver = new ResizeObserver(() => {
      stage.style.transform = `scale(${vis.clientWidth / 400})`;
    });
    resizeObserver.observe(vis);
    stage.style.transform = `scale(${vis.clientWidth / 400})`;

    return () => resizeObserver.disconnect();
  }, []);

  useEffect(() => {
    const vis = visRef.current;
    const rows = rowsRef.current;
    if (!vis || !rows) return;

    const signal = { cancelled: false };
    let visible = true;
    let tabVisible = !document.hidden;
    let loopGeneration = 0;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );

    const setY = (value: number) => {
      rows.style.setProperty("--y", String(value));
    };

    const applyDone = () => {
      setOn(true);
      setOk(true);
      setY(0);
    };

    const waitWhilePaused = async () => {
      while (!signal.cancelled && (!visible || !tabVisible)) {
        await sleep(200);
      }
    };

    const wait = async (ms: number) => {
      let remaining = ms;
      while (remaining > 0 && !signal.cancelled) {
        await waitWhilePaused();
        if (signal.cancelled) return;
        const chunk = Math.min(100, remaining);
        await sleep(chunk);
        remaining -= chunk;
      }
    };

    const runLoop = async (generation: number) => {
      if (prefersReduced.matches) {
        applyDone();
        return;
      }

      while (!signal.cancelled && generation === loopGeneration) {
        await waitWhilePaused();
        if (signal.cancelled || generation !== loopGeneration) return;

        setOk(false);
        setOn(false);
        setY(0);

        await wait(900);
        if (signal.cancelled || generation !== loopGeneration) return;

        setOn(true);

        await wait(1500);
        if (signal.cancelled || generation !== loopGeneration) return;
        setY(52);

        await wait(1700);
        if (signal.cancelled || generation !== loopGeneration) return;
        setY(104);

        await wait(1700);
        if (signal.cancelled || generation !== loopGeneration) return;
        setOk(true);

        await wait(3600);
      }
    };

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        visible = entry?.isIntersecting ?? false;
      },
      { threshold: 0.15 },
    );
    intersectionObserver.observe(vis);

    const onVisibility = () => {
      tabVisible = !document.hidden;
    };
    document.addEventListener("visibilitychange", onVisibility);

    const onMotionChange = () => {
      loopGeneration += 1;
      if (prefersReduced.matches) {
        applyDone();
      } else {
        void runLoop(loopGeneration);
      }
    };
    prefersReduced.addEventListener("change", onMotionChange);

    void runLoop(loopGeneration);

    return () => {
      signal.cancelled = true;
      loopGeneration += 1;
      intersectionObserver.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      prefersReduced.removeEventListener("change", onMotionChange);
    };
  }, []);

  return (
    <div
      ref={visRef}
      className={cn("phi", on && "phi--on", ok && "phi--ok")}
      role="img"
      aria-label="Animated illustration: a lens moves over hidden information and reveals what is collected, how it is used, and the choices you have"
    >
      <div ref={stageRef} className="phi__stage" aria-hidden="true">
        <div className="phi__glow" />

        <div className="phi__card">
          <div className="phi__hd">
            <span className="phi__hl">
              <Eye aria-hidden="true" />
              YOUR INFORMATION
            </span>
          </div>

          <div ref={rowsRef} className="phi__rows">
            <div className="phi__lay">
              {ROWS.map(({ label, masked, Icon }) => (
                <div key={`mask-${label}`} className="phi__rw">
                  <span className="phi__ic">
                    <Icon aria-hidden="true" />
                  </span>
                  <div>
                    <span className="phi__lb">{label}</span>
                    <span className="phi__vl phi__mk">{masked}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="phi__lay phi__rev">
              {ROWS.map(({ label, clear, Icon }) => (
                <div key={`clear-${label}`} className="phi__rw">
                  <span className="phi__ic">
                    <Icon aria-hidden="true" />
                  </span>
                  <div>
                    <span className="phi__lb">{label}</span>
                    <span className="phi__vl">{clear}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="phi__lens" />
          </div>
        </div>

        <div className="phi__tag">
          <EyeOff className="phi__tag-off" aria-hidden="true" />
          <Eye className="phi__tag-on" aria-hidden="true" />
        </div>

        <div className="phi__chip">
          <i className="phi__chip-dot" />
          <span className="phi__cr">Hidden</span>
          <span className="phi__cd">Transparent</span>
        </div>
      </div>
    </div>
  );
}
