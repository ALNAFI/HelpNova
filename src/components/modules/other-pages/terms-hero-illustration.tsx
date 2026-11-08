"use client";

import { useEffect, useRef, useState } from "react";
import { Check, FileText } from "lucide-react";

import { cn } from "@/utils/cn";

import "./terms-hero-illustration.css";

const CLAUSES = [
  "Using HelpNova",
  "Your responsibilities",
  "Interactive experiences",
] as const;

function sleep(ms: number) {
  return new Promise<void>((resolve) => {
    window.setTimeout(resolve, ms);
  });
}

export function TermsHeroIllustration() {
  const visRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const [rowsOn, setRowsOn] = useState([false, false, false]);
  const [ok, setOk] = useState(false);
  const [scanKey, setScanKey] = useState(0);
  const [scanning, setScanning] = useState(false);

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
    if (!vis) return;

    const signal = { cancelled: false };
    let visible = true;
    let tabVisible = !document.hidden;
    let loopGeneration = 0;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );

    const applyDone = () => {
      setRowsOn([true, true, true]);
      setOk(true);
      setScanning(false);
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

        setRowsOn([false, false, false]);
        setOk(false);
        setScanning(false);
        setScanKey((k) => k + 1);

        await wait(700);
        if (signal.cancelled || generation !== loopGeneration) return;

        setScanning(true);

        await wait(700);
        if (signal.cancelled || generation !== loopGeneration) return;
        setRowsOn([true, false, false]);

        await wait(900);
        if (signal.cancelled || generation !== loopGeneration) return;
        setRowsOn([true, true, false]);

        await wait(900);
        if (signal.cancelled || generation !== loopGeneration) return;
        setRowsOn([true, true, true]);

        await wait(600);
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
      className={cn("thi", ok && "thi--ok")}
      role="img"
      aria-label="Animated illustration: a terms document is read clause by clause and each clause is marked as clear"
    >
      <div ref={stageRef} className="thi__stage" aria-hidden="true">
        <div className="thi__glow" />
        <div className="thi__back" />

        <div className="thi__card">
          <div className="thi__hd">
            <span className="thi__hl">
              <FileText aria-hidden="true" />
              TERMS OF SERVICE
            </span>
          </div>

          <div className="thi__rows">
            {CLAUSES.map((label, index) => (
              <div
                key={label}
                className={cn("thi__rw", rowsOn[index] && "thi__rw--on")}
              >
                <span className="thi__n">{index + 1}</span>
                <div className="thi__tx">
                  <div className="thi__t">{label}</div>
                  <div className="thi__s" />
                </div>
                <span className="thi__ck">
                  <Check aria-hidden="true" />
                </span>
              </div>
            ))}
          </div>

          <div
            key={scanKey}
            className={cn("thi__scan", scanning && "thi__scan--go")}
          />
        </div>

        <div className="thi__tag">
          <span className="thi__tag-glyph">§</span>
          <Check aria-hidden="true" />
        </div>

        <div className="thi__chip">
          <i className="thi__chip-dot" />
          <span className="thi__cr">Reading</span>
          <span className="thi__cd">Made clear</span>
        </div>
      </div>
    </div>
  );
}
