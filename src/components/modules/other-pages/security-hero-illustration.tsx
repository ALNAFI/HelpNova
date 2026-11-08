"use client";

import { useEffect, useRef, useState } from "react";
import { Eye, KeyRound, Lock, Shield } from "lucide-react";

import { cn } from "@/utils/cn";

import "./security-hero-illustration.css";

const ROW_LABELS = [
  { label: "Data protection", Icon: Lock },
  { label: "Access control", Icon: KeyRound },
  { label: "Responsible use", Icon: Eye },
] as const;

function sleep(ms: number) {
  return new Promise<void>((resolve) => {
    window.setTimeout(resolve, ms);
  });
}

export function SecurityHeroIllustration() {
  const visRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const [rowsOn, setRowsOn] = useState([false, false, false]);
  const [ok, setOk] = useState(false);
  const [pillText, setPillText] = useState("Scanning");
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
      setPillText("Protected");
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
        setPillText("Scanning");
        setScanning(false);
        setScanKey((k) => k + 1);

        await wait(700);
        if (signal.cancelled || generation !== loopGeneration) return;

        setScanning(true);

        await wait(800);
        if (signal.cancelled || generation !== loopGeneration) return;
        setRowsOn([true, false, false]);

        await wait(1000);
        if (signal.cancelled || generation !== loopGeneration) return;
        setRowsOn([true, true, false]);

        await wait(1000);
        if (signal.cancelled || generation !== loopGeneration) return;
        setRowsOn([true, true, true]);

        await wait(600);
        if (signal.cancelled || generation !== loopGeneration) return;
        setOk(true);
        setPillText("Protected");

        await wait(3800);
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
      className={cn("shi", ok && "shi--ok")}
      role="img"
      aria-label="Animated illustration: a security check runs through three safeguards and a shield confirms protection"
    >
      <div ref={stageRef} className="shi__stage" aria-hidden="true">
        <div className="shi__rg" style={{ width: 120, height: 120 }} />
        <div
          className="shi__rg shi__rg--dash"
          style={{ width: 180, height: 180 }}
        />
        <div
          className="shi__rg"
          style={{ width: 250, height: 250, opacity: 0.55 }}
        />
        <div className="shi__rg shi__rg--pulse" />
        <div className="shi__rg shi__rg--pulse shi__rg--pulse-b" />

        <div className="shi__card">
          <div className="shi__hd">
            <span className="shi__hl">
              <Shield aria-hidden="true" />
              SECURITY CHECK
            </span>
            <span className="shi__pill">
              <i className="shi__pill-dot" />
              <span>{pillText}</span>
            </span>
          </div>

          <div className="shi__rows">
            {ROW_LABELS.map(({ label, Icon }, index) => (
              <div
                key={label}
                className={cn("shi__rw", rowsOn[index] && "shi__rw--on")}
              >
                <span className="shi__ic">
                  <Icon aria-hidden="true" />
                </span>
                <span className="shi__lb">{label}</span>
                <span className="shi__tg" />
              </div>
            ))}
          </div>

          <div
            key={scanKey}
            className={cn("shi__scan", scanning && "shi__scan--go")}
          />
        </div>

        <div className="shi__link" />
        <span className="shi__dot" />

        <div className="shi__tile">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
            <path
              className="shi__chk"
              pathLength={1}
              d="m9 12 2 2 4-4"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
