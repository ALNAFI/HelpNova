"use client";

import { useEffect, useId, useRef } from "react";
import { cn } from "@/utils/cn";
import "./automation-hero-illustration.css";

type Inquiry = {
  message: string;
  via: string;
  topic: string;
  matched: boolean;
};

const INQUIRIES: readonly Inquiry[] = [
  {
    message: "Where\u2019s my order?",
    via: "Chat",
    topic: "Order status",
    matched: true,
  },
  {
    message: "How do I reset my password?",
    via: "Email",
    topic: "Account access",
    matched: false,
  },
  {
    message: "Track package #4821",
    via: "Chat",
    topic: "Shipment tracking",
    matched: true,
  },
  {
    message: "Can I change my plan?",
    via: "Chat",
    topic: "Billing",
    matched: false,
  },
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

async function typeMessage(
  el: SVGTextElement,
  text: string,
  signal: RunSignal,
) {
  for (let i = 0; i <= text.length; i += 1) {
    if (signal.cancelled) return;
    el.textContent =
      text.slice(0, i) + (i < text.length ? "\u258D" : "");
    await sleep(34, signal);
  }
}

function clearSignal(signal: RunSignal) {
  signal.cancelled = true;
  signal.timers.forEach((id) => window.clearInterval(id));
  signal.frames.forEach((id) => cancelAnimationFrame(id));
  signal.timers.clear();
  signal.frames.clear();
}

export function AutomationHeroIllustration({
  className,
}: {
  className?: string;
}) {
  const reactId = useId().replace(/:/g, "");
  const haloId = `ahi-halo-${reactId}`;
  const sweepGradId = `ahi-sw-${reactId}`;
  const clipId = `ahi-cc-${reactId}`;

  const rootRef = useRef<HTMLDivElement>(null);
  const inquiryRef = useRef<SVGGElement>(null);
  const viaRef = useRef<SVGTextElement>(null);
  const msgRef = useRef<SVGTextElement>(null);
  const condRef = useRef<SVGGElement>(null);
  const topicRef = useRef<SVGTextElement>(null);
  const sweepRef = useRef<SVGRectElement>(null);
  const resRef = useRef<SVGGElement>(null);
  const resTextRef = useRef<SVGTextElement>(null);
  const ordersRef = useRef<SVGGElement>(null);
  const supportRef = useRef<SVGGElement>(null);
  const ordersCountRef = useRef<SVGTextElement>(null);
  const supportCountRef = useRef<SVGTextElement>(null);
  const chipOrdersRef = useRef<SVGGElement>(null);
  const chipSupportRef = useRef<SVGGElement>(null);
  const path1Ref = useRef<SVGPathElement>(null);
  const path2Ref = useRef<SVGPathElement>(null);
  const path3Ref = useRef<SVGPathElement>(null);
  const tokenRef = useRef<SVGGElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const inquiry = inquiryRef.current;
    const via = viaRef.current;
    const msg = msgRef.current;
    const cond = condRef.current;
    const topic = topicRef.current;
    const sweep = sweepRef.current;
    const res = resRef.current;
    const resText = resTextRef.current;
    const orders = ordersRef.current;
    const support = supportRef.current;
    const ordersCount = ordersCountRef.current;
    const supportCount = supportCountRef.current;
    const chipOrders = chipOrdersRef.current;
    const chipSupport = chipSupportRef.current;
    const path1 = path1Ref.current;
    const path2 = path2Ref.current;
    const path3 = path3Ref.current;
    const token = tokenRef.current;

    if (
      !root ||
      !inquiry ||
      !via ||
      !msg ||
      !cond ||
      !topic ||
      !sweep ||
      !res ||
      !resText ||
      !orders ||
      !support ||
      !ordersCount ||
      !supportCount ||
      !chipOrders ||
      !chipSupport ||
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

    const links = [path1, path2, path3];
    const counts = { orders: 128, support: 342 };
    let inquiryIndex = 0;
    let visible = true;
    let pageVisible = document.visibilityState !== "hidden";

    const isActive = () => visible && pageVisible && !signal.cancelled;

    const reset = () => {
      cond.classList.remove("ahi-active");
      orders.classList.remove("ahi-active");
      support.classList.remove("ahi-active");
      links.forEach((link) => link.classList.remove("ahi-on"));
      res.classList.remove("ahi-show", "ahi-no");
      chipOrders.classList.remove("ahi-show");
      chipSupport.classList.remove("ahi-show");
      topic.textContent = "Waiting for inquiry";
      topic.classList.remove("ahi-ok");
      token.style.opacity = "0";
      token.setAttribute("transform", "translate(320 114)");
    };

    const runLoop = async () => {
      while (!signal.cancelled) {
        if (!isActive()) {
          await sleep(200, signal);
          continue;
        }

        const entry = INQUIRIES[inquiryIndex % INQUIRIES.length];
        if (!entry) break;
        inquiryIndex += 1;

        reset();
        inquiry.classList.remove("ahi-show");
        await sleep(500, signal);
        if (signal.cancelled || !isActive()) continue;

        msg.textContent = "";
        via.textContent = `via ${entry.via}`;
        inquiry.classList.add("ahi-show");
        await sleep(450, signal);
        if (signal.cancelled || !isActive()) continue;

        await typeMessage(msg, entry.message, signal);
        if (signal.cancelled || !isActive()) continue;
        await sleep(400, signal);
        if (signal.cancelled || !isActive()) continue;

        token.style.opacity = "1";
        path1.classList.add("ahi-on");
        await moveToken(token, path1, 600, signal);
        if (signal.cancelled || !isActive()) continue;

        cond.classList.add("ahi-active");
        topic.textContent = "Analyzing\u2026";
        sweep.classList.remove("ahi-on");
        void sweep.getBoundingClientRect();
        sweep.classList.add("ahi-on");
        await sleep(950, signal);
        if (signal.cancelled || !isActive()) continue;

        topic.textContent = `Topic: ${entry.topic}`;
        topic.classList.add("ahi-ok");
        resText.textContent = entry.matched ? "\u2713 Match" : "\u2715 No match";
        res.classList.toggle("ahi-no", !entry.matched);
        res.classList.add("ahi-show");
        await sleep(800, signal);
        if (signal.cancelled || !isActive()) continue;

        const branch = entry.matched ? path2 : path3;
        const dest = entry.matched ? orders : support;
        const destCount = entry.matched ? ordersCount : supportCount;
        const destChip = entry.matched ? chipOrders : chipSupport;
        const countKey = entry.matched ? "orders" : "support";

        branch.classList.add("ahi-on");
        await moveToken(token, branch, 900, signal);
        if (signal.cancelled || !isActive()) continue;

        token.style.opacity = "0";
        cond.classList.remove("ahi-active");
        dest.classList.add("ahi-active");
        counts[countKey] += 1;
        destCount.textContent = String(counts[countKey]);
        destChip.classList.add("ahi-show");
        await sleep(2300, signal);
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = Boolean(entry?.isIntersecting);
        if (!visible) {
          reset();
          inquiry.classList.remove("ahi-show");
          msg.textContent = "";
        }
      },
      { threshold: 0.2 },
    );

    const onVisibility = () => {
      pageVisible = document.visibilityState !== "hidden";
    };

    observer.observe(root);
    document.addEventListener("visibilitychange", onVisibility);
    void runLoop();

    return () => {
      clearSignal(signal);
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      reset();
      inquiry.classList.remove("ahi-show");
    };
  }, []);

  return (
    <div ref={rootRef} className={cn("ahi", className)}>
      <svg
        viewBox="0 0 640 440"
        role="img"
        aria-label="HelpNova automation: an incoming inquiry is analyzed and routed to Orders or General Support"
      >
        <defs>
          <radialGradient id={haloId}>
            <stop offset="0" stopColor="var(--ahi-accent)" stopOpacity=".6" />
            <stop offset="1" stopColor="var(--ahi-accent)" stopOpacity="0" />
          </radialGradient>
          <linearGradient id={sweepGradId} x1="0" x2="1">
            <stop offset="0" stopColor="var(--ahi-accent)" stopOpacity="0" />
            <stop
              offset=".5"
              stopColor="var(--ahi-accent)"
              stopOpacity=".35"
            />
            <stop offset="1" stopColor="var(--ahi-accent)" stopOpacity="0" />
          </linearGradient>
          <clipPath id={clipId}>
            <rect x="190" y="170" width="260" height="84" rx="16" />
          </clipPath>
        </defs>

        <path ref={path1Ref} className="ahi-link" d="M320 114 L320 170" />
        <path
          ref={path2Ref}
          className="ahi-link"
          d="M320 254 C320 310 145 290 145 340"
        />
        <path
          ref={path3Ref}
          className="ahi-link ahi-dash"
          d="M320 254 C320 310 505 290 505 340"
        />

        <g ref={inquiryRef} className="ahi-node ahi-in ahi-active">
          <rect className="ahi-b" x="150" y="30" width="340" height="84" rx="16" />
          <circle className="ahi-icon" cx="184" cy="72" r="16" />
          <circle className="ahi-icon" cx="184" cy="67" r="4.5" />
          <path className="ahi-icon" d="M175 81 c2 -6 16 -6 18 0" />
          <text className="ahi-lbl" x="214" y="56">
            INCOMING INQUIRY
          </text>
          <text
            ref={viaRef}
            className="ahi-via"
            x="474"
            y="56"
            textAnchor="end"
          >
            via Chat
          </text>
          <text ref={msgRef} className="ahi-ttl" x="214" y="84" />
        </g>

        <g ref={condRef} className="ahi-node">
          <rect className="ahi-b" x="190" y="170" width="260" height="84" rx="16" />
          <rect
            className="ahi-ring ahi-pulse"
            x="190"
            y="170"
            width="260"
            height="84"
            rx="16"
          />
          <g clipPath={`url(#${clipId})`}>
            <rect
              ref={sweepRef}
              className="ahi-sweep"
              x="160"
              y="170"
              width="60"
              height="84"
              fill={`url(#${sweepGradId})`}
            />
          </g>
          <text className="ahi-lbl" x="320" y="196" textAnchor="middle">
            CONDITION
          </text>
          <text className="ahi-ttl" x="320" y="220" textAnchor="middle">
            Order Tracking?
          </text>
          <text
            ref={topicRef}
            className="ahi-sub"
            x="320"
            y="240"
            textAnchor="middle"
          >
            Waiting for inquiry
          </text>
        </g>

        <g ref={resRef} className="ahi-res">
          <rect x="462" y="198" width="88" height="28" rx="14" />
          <text ref={resTextRef} x="506" y="216" textAnchor="middle">
            ✓ Match
          </text>
        </g>

        <g ref={ordersRef} className="ahi-node">
          <rect className="ahi-b" x="60" y="340" width="170" height="54" rx="14" />
          <rect
            className="ahi-ring ahi-pulse"
            x="60"
            y="340"
            width="170"
            height="54"
            rx="14"
          />
          <path
            className="ahi-icon"
            d="M80 360 l8 -4.5 l8 4.5 v9 l-8 4.5 l-8 -4.5 z M80 360 l8 4.5 l8 -4.5 M88 364.5 v9"
          />
          <text className="ahi-pl" x="108" y="371">
            ORDERS
          </text>
          <text
            ref={ordersCountRef}
            className="ahi-cnt"
            x="214"
            y="371"
            textAnchor="end"
          >
            128
          </text>
        </g>

        <g ref={supportRef} className="ahi-node">
          <rect
            className="ahi-b"
            x="390"
            y="340"
            width="230"
            height="54"
            rx="14"
          />
          <rect
            className="ahi-ring ahi-pulse"
            x="390"
            y="340"
            width="230"
            height="54"
            rx="14"
          />
          <circle className="ahi-icon" cx="413" cy="362" r="3.6" />
          <circle className="ahi-icon" cx="423" cy="364" r="2.8" />
          <path
            className="ahi-icon"
            d="M406 374 c0 -6 10 -6 10 0 M418 374 c0 -4.5 7 -4.5 7 0"
          />
          <text className="ahi-pl" x="436" y="371">
            GENERAL SUPPORT
          </text>
          <text
            ref={supportCountRef}
            className="ahi-cnt"
            x="604"
            y="371"
            textAnchor="end"
          >
            342
          </text>
        </g>

        <g ref={chipOrdersRef} className="ahi-chip">
          <rect x="103" y="404" width="84" height="24" rx="12" />
          <text x="145" y="420" textAnchor="middle">
            Assigned ✓
          </text>
        </g>
        <g ref={chipSupportRef} className="ahi-chip">
          <rect x="463" y="404" width="84" height="24" rx="12" />
          <text x="505" y="420" textAnchor="middle">
            Assigned ✓
          </text>
        </g>

        <g
          ref={tokenRef}
          className="ahi-tok"
          transform="translate(320 114)"
        >
          <circle r="22" fill={`url(#${haloId})`} />
          <circle r="6" fill="var(--ahi-accent)" />
        </g>
      </svg>
    </div>
  );
}
