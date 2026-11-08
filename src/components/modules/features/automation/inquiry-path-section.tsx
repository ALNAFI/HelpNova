"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Container } from "@/components/ui/container";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { cn } from "@/utils/cn";
import "./inquiry-path-section.css";

type Topic = {
  name: string;
  matched: boolean;
  desc: string;
  detail: string;
};

const TOPICS: readonly Topic[] = [
  {
    name: "Order Tracking",
    matched: true,
    desc: "Order Tracking inquiries are directed to the Orders team, keeping every shipment question with the people who can answer it.",
    detail:
      "This inquiry matches the Order Tracking category and follows the path to Orders.",
  },
  {
    name: "Billing Issue",
    matched: false,
    desc: "Billing Issue inquiries are directed to General Support for review, ensuring clear ownership and an organized support process.",
    detail:
      "This inquiry does not match the Order Tracking category and follows the path to General Support.",
  },
  {
    name: "Delivery Status",
    matched: true,
    desc: "Delivery Status questions are recognized as order-related and sent straight to the Orders team, with no manual sorting.",
    detail:
      "This inquiry is classified under Order Tracking and follows the path to Orders.",
  },
  {
    name: "Account Access",
    matched: false,
    desc: "Account Access inquiries fall outside order topics, so they go to General Support where they are reviewed and owned.",
    detail:
      "This inquiry does not match the Order Tracking category and follows the path to General Support.",
  },
];

type RunSignal = {
  timers: Set<number>;
  frames: Set<number>;
};

function sleep(ms: number, signal: RunSignal, isCurrent: () => boolean) {
  return new Promise<void>((resolve) => {
    const start = performance.now();
    const id = window.setInterval(() => {
      if (!isCurrent() || performance.now() - start >= ms) {
        window.clearInterval(id);
        signal.timers.delete(id);
        resolve();
      }
    }, 32);
    signal.timers.add(id);
  });
}

function easeInOut(t: number) {
  return t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2;
}

function moveToken(
  token: SVGGElement,
  path: SVGPathElement,
  ms: number,
  signal: RunSignal,
  isCurrent: () => boolean,
) {
  return new Promise<void>((resolve) => {
    const length = path.getTotalLength();
    const start = performance.now();

    const tick = (now: number) => {
      if (!isCurrent()) {
        resolve();
        return;
      }
      const t = Math.min(1, (now - start) / ms);
      const point = path.getPointAtLength(length * easeInOut(t));
      token.setAttribute("transform", `translate(${point.x} ${point.y})`);
      if (t < 1) {
        const frame = requestAnimationFrame(tick);
        signal.frames.add(frame);
      } else {
        resolve();
      }
    };

    const frame = requestAnimationFrame(tick);
    signal.frames.add(frame);
  });
}

function clearSignal(signal: RunSignal) {
  signal.timers.forEach((id) => window.clearInterval(id));
  signal.frames.forEach((id) => cancelAnimationFrame(id));
  signal.timers.clear();
  signal.frames.clear();
}

export function InquiryPathSection() {
  const reducedMotion = usePrefersReducedMotion();
  const reactId = useId().replace(/:/g, "");
  const haloId = `ips-halo-${reactId}`;
  const sweepGradId = `ips-sw-${reactId}`;
  const clipId = `ips-cc-${reactId}`;
  const headingId = "inquiry-path-heading";

  const [topicIndex, setTopicIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(!reducedMotion);
  const [note, setNote] = useState(TOPICS[0].desc);
  const [noteFade, setNoteFade] = useState(false);
  const [panelTopic, setPanelTopic] = useState(`Topic: ${TOPICS[0].name}`);
  const [panelDetail, setPanelDetail] = useState("Checking the topic…");
  const [step3Label, setStep3Label] = useState("Routed to Orders");
  const [stepStates, setStepStates] = useState<
    Array<"idle" | "act" | "done">
  >(["idle", "idle", "idle"]);
  const [progressRun, setProgressRun] = useState(false);

  const runIdRef = useRef(0);
  const autoPlayRef = useRef(autoPlay);
  const visibleRef = useRef(true);
  const pageVisibleRef = useRef(true);
  const topicIndexRef = useRef(0);
  const signalRef = useRef<RunSignal>({ timers: new Set(), frames: new Set() });
  const sectionRef = useRef<HTMLElement>(null);
  const noteTimerRef = useRef<number | null>(null);

  const triggerRef = useRef<SVGGElement>(null);
  const condRef = useRef<SVGGElement>(null);
  const ordersRef = useRef<SVGGElement>(null);
  const supportRef = useRef<SVGGElement>(null);
  const triggerSubRef = useRef<SVGTextElement>(null);
  const condSubRef = useRef<SVGTextElement>(null);
  const ordersSubRef = useRef<SVGTextElement>(null);
  const supportSubRef = useRef<SVGTextElement>(null);
  const branchYesRef = useRef<SVGGElement>(null);
  const branchNoRef = useRef<SVGGElement>(null);
  const sweepRef = useRef<SVGRectElement>(null);
  const path1Ref = useRef<SVGPathElement>(null);
  const path2Ref = useRef<SVGPathElement>(null);
  const path3Ref = useRef<SVGPathElement>(null);
  const tokenRef = useRef<SVGGElement>(null);
  const playRef = useRef<(index: number) => void>(() => {});

  autoPlayRef.current = autoPlay;
  topicIndexRef.current = topicIndex;

  useEffect(() => {
    setAutoPlay(!reducedMotion);
    autoPlayRef.current = !reducedMotion;
  }, [reducedMotion]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        visibleRef.current = Boolean(entry?.isIntersecting);
      },
      { threshold: 0.15 },
    );
    observer.observe(section);

    const onVisibility = () => {
      pageVisibleRef.current = document.visibilityState !== "hidden";
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  useEffect(() => {
    const signal = signalRef.current;

    const resetVisual = (topic: Topic) => {
      triggerRef.current?.classList.remove("ips-active", "ips-dim");
      condRef.current?.classList.remove("ips-active", "ips-dim");
      ordersRef.current?.classList.remove("ips-active", "ips-dim");
      supportRef.current?.classList.remove("ips-active", "ips-dim");
      path1Ref.current?.classList.remove("ips-on");
      path2Ref.current?.classList.remove("ips-on");
      path3Ref.current?.classList.remove("ips-on");
      branchYesRef.current?.classList.remove("ips-sel", "ips-off");
      branchNoRef.current?.classList.remove("ips-sel", "ips-off");

      if (triggerSubRef.current) triggerSubRef.current.textContent = topic.name;
      if (condSubRef.current) {
        condSubRef.current.textContent = "Waiting for inquiry";
        condSubRef.current.classList.remove("ips-ok");
      }
      if (ordersSubRef.current) {
        ordersSubRef.current.textContent = "Awaiting routing";
        ordersSubRef.current.classList.remove("ips-ok");
      }
      if (supportSubRef.current) {
        supportSubRef.current.textContent = "Awaiting routing";
        supportSubRef.current.classList.remove("ips-ok");
      }

      setPanelTopic(`Topic: ${topic.name}`);
      setPanelDetail("Checking the topic…");
      setStep3Label(
        `Routed to ${topic.matched ? "Orders" : "General Support"}`,
      );
      setStepStates(["idle", "idle", "idle"]);

      if (tokenRef.current) {
        tokenRef.current.style.opacity = "0";
        tokenRef.current.setAttribute("transform", "translate(260 90)");
      }
    };

    const play = (index: number) => {
      const runId = ++runIdRef.current;
      const isCurrent = () => runId === runIdRef.current;
      const topic = TOPICS[index % TOPICS.length];
      if (!topic) return;

      topicIndexRef.current = index;
      setTopicIndex(index);
      setProgressRun(false);

      window.requestAnimationFrame(() => {
        if (!isCurrent()) return;
        setProgressRun(autoPlayRef.current);
      });

      if (noteTimerRef.current) window.clearTimeout(noteTimerRef.current);
      setNoteFade(true);
      resetVisual(topic);
      noteTimerRef.current = window.setTimeout(() => {
        if (!isCurrent()) return;
        setNote(topic.desc);
        setNoteFade(false);
      }, 220);

      void (async () => {
        await sleep(350, signal, isCurrent);
        if (!isCurrent()) return;

        triggerRef.current?.classList.add("ips-active");
        setStepStates(["act", "idle", "idle"]);
        if (tokenRef.current) tokenRef.current.style.opacity = "1";
        path1Ref.current?.classList.add("ips-on");

        await sleep(250, signal, isCurrent);
        if (!isCurrent() || !path1Ref.current || !tokenRef.current) return;
        await moveToken(tokenRef.current, path1Ref.current, 600, signal, isCurrent);
        if (!isCurrent()) return;

        setStepStates(["done", "act", "idle"]);
        triggerRef.current?.classList.remove("ips-active");
        condRef.current?.classList.add("ips-active");
        if (condSubRef.current) {
          condSubRef.current.textContent = "Checking topic…";
        }

        const sweep = sweepRef.current;
        if (sweep) {
          sweep.classList.remove("ips-on");
          void sweep.getBoundingClientRect();
          sweep.classList.add("ips-on");
        }

        await sleep(900, signal, isCurrent);
        if (!isCurrent()) return;

        if (condSubRef.current) {
          condSubRef.current.textContent = `Topic: ${topic.name}`;
          condSubRef.current.classList.add("ips-ok");
        }
        setPanelDetail(topic.detail);
        branchYesRef.current?.classList.add(topic.matched ? "ips-sel" : "ips-off");
        branchNoRef.current?.classList.add(topic.matched ? "ips-off" : "ips-sel");
        setStepStates(["done", "done", "idle"]);

        await sleep(600, signal, isCurrent);
        if (!isCurrent()) return;

        const branch = topic.matched ? path2Ref.current : path3Ref.current;
        const dest = topic.matched ? ordersRef.current : supportRef.current;
        const other = topic.matched ? supportRef.current : ordersRef.current;
        const destSub = topic.matched
          ? ordersSubRef.current
          : supportSubRef.current;
        const otherSub = topic.matched
          ? supportSubRef.current
          : ordersSubRef.current;

        branch?.classList.add("ips-on");
        setStepStates(["done", "done", "act"]);

        if (branch && tokenRef.current) {
          await moveToken(tokenRef.current, branch, 900, signal, isCurrent);
        }
        if (!isCurrent()) return;

        if (tokenRef.current) tokenRef.current.style.opacity = "0";
        condRef.current?.classList.remove("ips-active");
        dest?.classList.add("ips-active");
        other?.classList.add("ips-dim");
        if (destSub) {
          destSub.textContent = "Selected Team";
          destSub.classList.add("ips-ok");
        }
        if (otherSub) {
          otherSub.textContent = "Not Selected";
          otherSub.classList.remove("ips-ok");
        }
        setStepStates(["done", "done", "done"]);

        await sleep(3400, signal, isCurrent);
        if (!isCurrent()) return;

        if (!autoPlayRef.current) return;

        while (
          isCurrent() &&
          (!visibleRef.current || !pageVisibleRef.current)
        ) {
          await sleep(300, signal, isCurrent);
        }
        if (!isCurrent() || !autoPlayRef.current) return;
        play((index + 1) % TOPICS.length);
      })();
    };

    playRef.current = play;
    play(0);

    return () => {
      runIdRef.current += 1;
      clearSignal(signal);
      if (noteTimerRef.current) window.clearTimeout(noteTimerRef.current);
    };
  }, []);

  const onTabClick = (index: number) => {
    playRef.current(index);
  };

  const onToggleAuto = () => {
    const next = !autoPlayRef.current;
    autoPlayRef.current = next;
    setAutoPlay(next);
    if (next) {
      playRef.current(topicIndexRef.current);
    } else {
      setProgressRun(false);
    }
  };

  return (
    <section
      ref={sectionRef}
      id="inquiry-path"
      aria-labelledby={headingId}
      className="ips scroll-mt-24 py-16 sm:py-20 lg:py-24"
    >
      <Container>
        <div className="max-w-3xl">
          <h2
            id={headingId}
            tabIndex={-1}
            className="font-heading text-[clamp(1.75rem,5vw,2.75rem)] font-semibold tracking-tight text-balance outline-none"
          >
            Which path will the inquiry take?
          </h2>
          <p className="mt-2.5 text-[clamp(0.875rem,2vw,1.0625rem)] leading-relaxed text-muted">
            Explore how different customer inquiries follow the right path to
            the right support team.
          </p>
        </div>

        <div className="ips-bar-row">
          <div
            className="ips-tabs"
            role="tablist"
            aria-label="Inquiry topics"
          >
            {TOPICS.map((topic, index) => {
              const selected = topicIndex === index;
              return (
                <button
                  key={topic.name}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  className={cn("ips-tab", selected && "ips-tab-on")}
                  onClick={() => onTabClick(index)}
                >
                  <span className="ips-tab-dot" aria-hidden />
                  <span>{topic.name}</span>
                  <span
                    className={cn(
                      "ips-tab-pg",
                      selected && progressRun && "ips-tab-pg-run",
                    )}
                    aria-hidden
                  />
                </button>
              );
            })}
          </div>

          <button
            type="button"
            className="ips-auto"
            aria-pressed={autoPlay}
            onClick={onToggleAuto}
          >
            <i aria-hidden />
            <span>Auto-play</span>
          </button>
        </div>

        <div
          className={cn("ips-note", noteFade && "ips-note-fade")}
          aria-live="polite"
        >
          {note}
        </div>

        <div className="ips-grid">
          <div className="ips-card ips-viz">
            <svg
              viewBox="0 0 520 400"
              role="img"
              aria-label="Workflow: a new inquiry is checked against the Order Tracking topic and routed to Orders or General Support"
            >
              <defs>
                <radialGradient id={haloId}>
                  <stop
                    offset="0"
                    stopColor="var(--ips-accent)"
                    stopOpacity=".6"
                  />
                  <stop
                    offset="1"
                    stopColor="var(--ips-accent)"
                    stopOpacity="0"
                  />
                </radialGradient>
                <linearGradient id={sweepGradId} x1="0" x2="1">
                  <stop
                    offset="0"
                    stopColor="var(--ips-accent)"
                    stopOpacity="0"
                  />
                  <stop
                    offset=".5"
                    stopColor="var(--ips-accent)"
                    stopOpacity=".35"
                  />
                  <stop
                    offset="1"
                    stopColor="var(--ips-accent)"
                    stopOpacity="0"
                  />
                </linearGradient>
                <clipPath id={clipId}>
                  <rect x="125" y="132" width="270" height="84" rx="16" />
                </clipPath>
              </defs>

              <path ref={path1Ref} className="ips-link" d="M260 90 L260 132" />
              <path
                ref={path2Ref}
                className="ips-link"
                d="M260 216 C260 258 125 250 125 300"
              />
              <path
                ref={path3Ref}
                className="ips-link ips-dash"
                d="M260 216 C260 258 395 250 395 300"
              />

              <g ref={triggerRef} className="ips-node">
                <rect
                  className="ips-b"
                  x="165"
                  y="14"
                  width="190"
                  height="76"
                  rx="16"
                />
                <rect
                  className="ips-ring ips-pulse"
                  x="165"
                  y="14"
                  width="190"
                  height="76"
                  rx="16"
                />
                <text className="ips-lbl" x="183" y="38">
                  TRIGGER
                </text>
                <text className="ips-ttl" x="183" y="60">
                  New Inquiry
                </text>
                <text ref={triggerSubRef} className="ips-sub" x="183" y="79" />
              </g>

              <g ref={condRef} className="ips-node">
                <rect
                  className="ips-b"
                  x="125"
                  y="132"
                  width="270"
                  height="84"
                  rx="16"
                />
                <rect
                  className="ips-ring ips-pulse"
                  x="125"
                  y="132"
                  width="270"
                  height="84"
                  rx="16"
                />
                <g clipPath={`url(#${clipId})`}>
                  <rect
                    ref={sweepRef}
                    className="ips-sweep"
                    x="90"
                    y="132"
                    width="70"
                    height="84"
                    fill={`url(#${sweepGradId})`}
                  />
                </g>
                <text className="ips-lbl" x="145" y="158">
                  CONDITION
                </text>
                <text className="ips-ttl" x="145" y="180">
                  Is the topic Order Tracking?
                </text>
                <text ref={condSubRef} className="ips-sub" x="145" y="201" />
              </g>

              <g
                ref={branchYesRef}
                className="ips-bp"
                transform="translate(155 242)"
              >
                <rect width="76" height="26" rx="13" />
                <text x="38" y="17.5" textAnchor="middle">
                  Matched
                </text>
              </g>
              <g
                ref={branchNoRef}
                className="ips-bp"
                transform="translate(289 242)"
              >
                <rect width="76" height="26" rx="13" />
                <text x="38" y="17.5" textAnchor="middle">
                  Otherwise
                </text>
              </g>

              <g ref={ordersRef} className="ips-node">
                <rect
                  className="ips-b"
                  x="20"
                  y="300"
                  width="210"
                  height="84"
                  rx="16"
                />
                <rect
                  className="ips-ring ips-pulse"
                  x="20"
                  y="300"
                  width="210"
                  height="84"
                  rx="16"
                />
                <g transform="translate(-9 26)">
                  <path
                    className="ips-icon"
                    d="M48 292 l7 -4 l7 4 v8 l-7 4 l-7 -4 z M48 292 l7 4 l7 -4 M55 296 v8"
                  />
                </g>
                <text className="ips-lbl" x="58" y="326">
                  DESTINATION
                </text>
                <text className="ips-ttl" x="40" y="352">
                  Orders
                </text>
                <text ref={ordersSubRef} className="ips-sub" x="40" y="372" />
              </g>

              <g ref={supportRef} className="ips-node">
                <rect
                  className="ips-b"
                  x="290"
                  y="300"
                  width="210"
                  height="84"
                  rx="16"
                />
                <rect
                  className="ips-ring ips-pulse"
                  x="290"
                  y="300"
                  width="210"
                  height="84"
                  rx="16"
                />
                <g transform="translate(-28 24)">
                  <circle className="ips-icon" cx="342" cy="294" r="3" />
                  <circle className="ips-icon" cx="351" cy="296" r="2.4" />
                  <path
                    className="ips-icon"
                    d="M336 304 c0 -5 8 -5 8 0 M346 304 c0 -4 6 -4 6 0"
                  />
                </g>
                <text className="ips-lbl" x="328" y="326">
                  DESTINATION
                </text>
                <text className="ips-ttl" x="310" y="352">
                  General Support
                </text>
                <text ref={supportSubRef} className="ips-sub" x="310" y="372" />
              </g>

              <g
                ref={tokenRef}
                className="ips-tok"
                transform="translate(260 90)"
              >
                <circle r="20" fill={`url(#${haloId})`} />
                <circle r="6" fill="var(--ips-accent)" />
              </g>
            </svg>
          </div>

          <aside className="ips-card ips-panel" aria-live="polite">
            <div className="ips-eb">WORKFLOW DETAILS</div>
            <div className="ips-pt">Topic Condition</div>
            <div className="ips-tp">{panelTopic}</div>
            <p className="ips-ex">{panelDetail}</p>
            <div className="ips-role">
              <div className="ips-eb">ROLE</div>
              <p>
                Identifies the appropriate routing path based on the inquiry’s
                assigned topic.
              </p>
            </div>
            <ul className="ips-steps">
              <li
                className={cn(
                  "ips-st",
                  stepStates[0] === "act" && "ips-st-act",
                  stepStates[0] === "done" && "ips-st-done",
                )}
              >
                <b>1</b>
                Inquiry received
              </li>
              <li
                className={cn(
                  "ips-st",
                  stepStates[1] === "act" && "ips-st-act",
                  stepStates[1] === "done" && "ips-st-done",
                )}
              >
                <b>2</b>
                Topic checked
              </li>
              <li
                className={cn(
                  "ips-st",
                  stepStates[2] === "act" && "ips-st-act",
                  stepStates[2] === "done" && "ips-st-done",
                )}
              >
                <b>3</b>
                <span>{step3Label}</span>
              </li>
            </ul>
          </aside>
        </div>
      </Container>
    </section>
  );
}
