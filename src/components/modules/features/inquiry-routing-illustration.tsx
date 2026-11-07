"use client";

import { useEffect, useId, useRef } from "react";
import { cn } from "@/utils/cn";
import "./inquiry-routing-illustration.css";

const TOPICS: ReadonlyArray<readonly [string, boolean]> = [
  ["Order Tracking", true],
  ["Billing Question", false],
  ["Order Tracking", true],
  ["Account Access", false],
];

type RunSignal = {
  cancelled: boolean;
  timers: Set<number>;
  frames: Set<number>;
};

function sleep(ms: number, signal: RunSignal) {
  return new Promise<void>((resolve) => {
    const start = performance.now();
    const id = window.setInterval(() => {
      if (signal.cancelled || performance.now() - start >= ms) {
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
) {
  return new Promise<void>((resolve) => {
    const length = path.getTotalLength();
    const start = performance.now();

    const tick = (now: number) => {
      if (signal.cancelled) {
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
  signal.cancelled = true;
  signal.timers.forEach((id) => window.clearInterval(id));
  signal.frames.forEach((id) => cancelAnimationFrame(id));
  signal.timers.clear();
  signal.frames.clear();
}

export function InquiryRoutingIllustration({
  className,
}: {
  className?: string;
}) {
  const reactId = useId();
  const haloId = `iri-halo-${reactId.replace(/:/g, "")}`;

  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<SVGGElement>(null);
  const condRef = useRef<SVGGElement>(null);
  const matchRef = useRef<SVGGElement>(null);
  const otherRef = useRef<SVGGElement>(null);
  const badgeRef = useRef<SVGGElement>(null);
  const badgeTextRef = useRef<SVGTextElement>(null);
  const topicRef = useRef<SVGTextElement>(null);
  const matchSubRef = useRef<SVGTextElement>(null);
  const otherSubRef = useRef<SVGTextElement>(null);
  const path1Ref = useRef<SVGPathElement>(null);
  const path2Ref = useRef<SVGPathElement>(null);
  const path3Ref = useRef<SVGPathElement>(null);
  const tokenRef = useRef<SVGGElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const trigger = triggerRef.current;
    const cond = condRef.current;
    const match = matchRef.current;
    const other = otherRef.current;
    const badge = badgeRef.current;
    const badgeText = badgeTextRef.current;
    const topic = topicRef.current;
    const matchSub = matchSubRef.current;
    const otherSub = otherSubRef.current;
    const path1 = path1Ref.current;
    const path2 = path2Ref.current;
    const path3 = path3Ref.current;
    const token = tokenRef.current;

    if (
      !root ||
      !trigger ||
      !cond ||
      !match ||
      !other ||
      !badge ||
      !badgeText ||
      !topic ||
      !matchSub ||
      !otherSub ||
      !path1 ||
      !path2 ||
      !path3 ||
      !token
    ) {
      return;
    }

    const signal: RunSignal = {
      cancelled: false,
      timers: new Set(),
      frames: new Set(),
    };
    let topicIndex = 0;
    let visible = true;
    let loopPromise: Promise<void> | null = null;

    const nodes = [trigger, cond, match, other];
    const links = [path1, path2, path3];

    const reset = () => {
      nodes.forEach((node) => node.classList.remove("iri-active"));
      links.forEach((link) => link.classList.remove("iri-on"));
      badge.classList.remove("iri-show");
      matchSub.textContent = "Assign it to Orders.";
      otherSub.textContent = "Assign it to General Support.";
      matchSub.classList.remove("iri-ok");
      otherSub.classList.remove("iri-ok");
      token.style.opacity = "0";
      token.setAttribute("transform", "translate(280 84)");
    };

    const runLoop = async () => {
      while (!signal.cancelled) {
        if (!visible) {
          await sleep(200, signal);
          continue;
        }

        const entry = TOPICS[topicIndex % TOPICS.length];
        if (!entry) break;
        const [topicLabel, yes] = entry;
        topicIndex += 1;

        reset();
        await sleep(500, signal);
        if (signal.cancelled || !visible) continue;

        topic.textContent = topicLabel;
        topic.style.display = "block";
        trigger.classList.add("iri-active");
        token.style.opacity = "1";
        await sleep(900, signal);
        if (signal.cancelled || !visible) continue;

        path1.classList.add("iri-on");
        await moveToken(token, path1, 600, signal);
        if (signal.cancelled || !visible) continue;

        trigger.classList.remove("iri-active");
        cond.classList.add("iri-active");
        await sleep(500, signal);
        if (signal.cancelled || !visible) continue;

        badgeText.textContent = yes ? "Yes" : "No";
        badge.classList.add("iri-show");
        await sleep(700, signal);
        if (signal.cancelled || !visible) continue;

        const branch = yes ? path2 : path3;
        branch.classList.add("iri-on");
        await moveToken(token, branch, 900, signal);
        if (signal.cancelled || !visible) continue;

        cond.classList.remove("iri-active");
        const dest = yes ? match : other;
        const destSub = yes ? matchSub : otherSub;
        dest.classList.add("iri-active");
        destSub.textContent = "Inquiry assigned";
        destSub.classList.add("iri-ok");
        token.style.opacity = "0";
        await sleep(2200, signal);
        if (signal.cancelled) break;

        topic.style.display = "none";
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = Boolean(entry?.isIntersecting);
        if (!visible) {
          reset();
          topic.style.display = "none";
        }
      },
      { threshold: 0.2 },
    );

    observer.observe(root);
    loopPromise = runLoop();

    return () => {
      clearSignal(signal);
      observer.disconnect();
      reset();
      void loopPromise;
    };
  }, []);

  return (
    <div ref={rootRef} className={cn("iri w-full", className)}>
      <svg
        viewBox="0 0 560 380"
        role="img"
        aria-label="HelpNova routing: a new inquiry is checked and assigned to the Orders team or General Support"
        className="h-auto w-full"
      >
        <defs>
          <radialGradient id={haloId}>
            <stop offset="0" stopColor="var(--iri-accent)" stopOpacity=".55" />
            <stop offset="1" stopColor="var(--iri-accent)" stopOpacity="0" />
          </radialGradient>
        </defs>

        <path ref={path1Ref} className="iri-link" d="M280 84 L280 130" />
        <path
          ref={path2Ref}
          className="iri-link"
          d="M280 194 C280 242 135 222 135 270"
        />
        <path
          ref={path3Ref}
          className="iri-link iri-dash"
          d="M280 194 C280 242 425 222 425 270"
        />

        <g ref={triggerRef} className="iri-node">
          <rect x="175" y="20" width="210" height="64" rx="14" />
          <rect
            className="iri-ring iri-pulse"
            x="175"
            y="20"
            width="210"
            height="64"
            rx="14"
          />
          <text className="iri-lbl" x="191" y="42">
            TRIGGER
          </text>
          <text className="iri-ttl" x="191" y="62">
            A new inquiry arrives.
          </text>
          <text
            ref={topicRef}
            className="iri-sub"
            x="191"
            y="77"
            style={{ display: "none" }}
          />
        </g>

        <g ref={condRef} className="iri-node">
          <rect x="160" y="130" width="240" height="64" rx="14" />
          <rect
            className="iri-ring iri-pulse"
            x="160"
            y="130"
            width="240"
            height="64"
            rx="14"
          />
          <text className="iri-lbl" x="176" y="152">
            CONDITION
          </text>
          <text className="iri-ttl" x="176" y="174">
            Is its topic Order Tracking?
          </text>
        </g>

        <g ref={badgeRef} className="iri-badge">
          <rect x="410" y="148" width="58" height="28" rx="14" />
          <text ref={badgeTextRef} x="439" y="166" textAnchor="middle">
            Yes
          </text>
        </g>

        <g ref={matchRef} className="iri-node">
          <rect x="30" y="270" width="210" height="84" rx="14" />
          <rect
            className="iri-ring iri-pulse"
            x="30"
            y="270"
            width="210"
            height="84"
            rx="14"
          />
          <path
            className="iri-icon"
            d="M48 292 l7 -4 l7 4 v8 l-7 4 l-7 -4 z M48 292 l7 4 l7 -4 M55 296 v8"
          />
          <text className="iri-lbl" x="72" y="300">
            MATCHED
          </text>
          <text className="iri-ttl" x="46" y="325">
            Orders
          </text>
          <text ref={matchSubRef} className="iri-sub" x="46" y="343">
            Assign it to Orders.
          </text>
        </g>

        <g ref={otherRef} className="iri-node">
          <rect x="320" y="270" width="210" height="84" rx="14" />
          <rect
            className="iri-ring iri-pulse"
            x="320"
            y="270"
            width="210"
            height="84"
            rx="14"
          />
          <circle className="iri-icon" cx="342" cy="294" r="3" />
          <circle className="iri-icon" cx="351" cy="296" r="2.4" />
          <path
            className="iri-icon"
            d="M336 304 c0 -5 8 -5 8 0 M346 304 c0 -4 6 -4 6 0"
          />
          <text className="iri-lbl" x="362" y="300">
            OTHERWISE
          </text>
          <text className="iri-ttl" x="336" y="325">
            General Support
          </text>
          <text ref={otherSubRef} className="iri-sub" x="336" y="343">
            Assign it to General Support.
          </text>
        </g>

        <g
          ref={tokenRef}
          className="iri-tok"
          transform="translate(280 84)"
        >
          <circle r="20" fill={`url(#${haloId})`} />
          <circle r="6" fill="var(--iri-accent)" />
        </g>
      </svg>
    </div>
  );
}
