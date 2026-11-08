"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import {
  Check,
  FileText,
  Filter,
  GitBranch,
  Inbox,
  Split,
  Users,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { cn } from "@/utils/cn";
import "./smart-routing-section.css";

type Inquiry = {
  name: string;
  topic: string;
  matched: boolean;
  customer: string;
  subject: string;
  orderId: string;
  message: string;
  note: string;
  result: string;
};

const INQUIRIES: readonly Inquiry[] = [
  {
    name: "Order Tracking",
    topic: "Order Tracking",
    matched: true,
    customer: "Maya Chen",
    subject: "Where is order #48291?",
    orderId: "ORD-48291",
    message:
      "Hi, my tracking hasn’t changed since Monday. Could you check what’s happening with my order?",
    note: "Check the carrier’s latest scan before giving the customer a delivery estimate.",
    result:
      "The topic matches Order Tracking. This inquiry is assigned to Orders.",
  },
  {
    name: "Billing Issue",
    topic: "Billing Issue",
    matched: false,
    customer: "Sam Rivera",
    subject: "Charged twice for my order",
    orderId: "",
    message:
      "I can see two charges for the same order. Could you check this?",
    note: "Review the order’s payment history and confirm whether the second charge is a duplicate or a pending authorization.",
    result:
      "This inquiry doesn’t match Order Tracking. It goes to General Triage for review.",
  },
  {
    name: "Delivery Delay",
    topic: "Order Tracking",
    matched: true,
    customer: "Priya Nair",
    subject: "My package is late",
    orderId: "ORD-48355",
    message:
      "My package was due yesterday and still hasn’t arrived. Where is it now?",
    note: "Confirm the carrier’s latest status and offer a reship if the package is marked as lost.",
    result:
      "Delivery questions are classified as Order Tracking. This inquiry is assigned to Orders.",
  },
  {
    name: "Account Access",
    topic: "Account Access",
    matched: false,
    customer: "Leo Martins",
    subject: "Can’t log in to my account",
    orderId: "",
    message:
      "I keep getting an error when I try to reset my password. Can you help?",
    note: "Verify the customer’s email address and send a manual password reset link.",
    result:
      "This inquiry doesn’t match Order Tracking. It goes to General Triage for review.",
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
    if (!length) {
      resolve();
      return;
    }
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

function curvePath(x0: number, y0: number, x1: number, y1: number) {
  const m = (y1 - y0) / 2;
  return `M${x0} ${y0} C${x0} ${y0 + m} ${x1} ${y1 - m} ${x1} ${y1}`;
}

export function SmartRoutingSection() {
  const reducedMotion = usePrefersReducedMotion();
  const [topicIndex, setTopicIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(false);
  const [progressRun, setProgressRun] = useState(false);
  const [bodyFade, setBodyFade] = useState(false);

  const [customer, setCustomer] = useState(INQUIRIES[0].customer);
  const [subject, setSubject] = useState(INQUIRIES[0].subject);
  const [message, setMessage] = useState(INQUIRIES[0].message);
  const [note, setNote] = useState(INQUIRIES[0].note);
  const [topicTag, setTopicTag] = useState(INQUIRIES[0].topic);
  const [orderTag, setOrderTag] = useState(INQUIRIES[0].orderId);
  const [showOrderTag, setShowOrderTag] = useState(Boolean(INQUIRIES[0].orderId));
  const [showTopicTag, setShowTopicTag] = useState(false);
  const [showAssignedTag, setShowAssignedTag] = useState(false);
  const [assignedTag, setAssignedTag] = useState("");
  const [statusOpen, setStatusOpen] = useState(false);
  const [noteShow, setNoteShow] = useState(false);
  const [destLabel, setDestLabel] = useState("Pending");
  const [destPending, setDestPending] = useState(true);
  const [destWarm, setDestWarm] = useState(false);
  const [destTagShow, setDestTagShow] = useState(false);
  const [destTagLong, setDestTagLong] = useState("");
  const [resultHtml, setResultHtml] = useState(
    '<span style="color:var(--srs-muted)">Waiting for the topic check…</span>',
  );
  const [activity, setActivity] = useState({
    a1: "idle" as "idle" | "cur" | "done",
    a2: "idle" as "idle" | "cur" | "done",
    a3: "idle" as "idle" | "cur" | "done",
    a2Text: "Detect topic",
    a3Text: "Route to team",
  });

  const runIdRef = useRef(0);
  const autoPlayRef = useRef(false);
  const visibleRef = useRef(true);
  const pageVisibleRef = useRef(true);
  const topicIndexRef = useRef(0);
  const signalRef = useRef<RunSignal>({ timers: new Set(), frames: new Set() });
  const playRef = useRef<(index: number) => void>(() => {});
  const fadeTimerRef = useRef<number | null>(null);

  const sectionRef = useRef<HTMLElement>(null);
  const flowRef = useRef<HTMLDivElement>(null);
  const n1Ref = useRef<HTMLDivElement>(null);
  const n2Ref = useRef<HTMLDivElement>(null);
  const bmRef = useRef<HTMLDivElement>(null);
  const boRef = useRef<HTMLDivElement>(null);
  const ndRef = useRef<HTMLDivElement>(null);
  const linesRef = useRef<SVGSVGElement>(null);
  const toklRef = useRef<SVGSVGElement>(null);
  const p1Ref = useRef<SVGPathElement>(null);
  const p2yRef = useRef<SVGPathElement>(null);
  const p2nRef = useRef<SVGPathElement>(null);
  const p3yRef = useRef<SVGPathElement>(null);
  const p3nRef = useRef<SVGPathElement>(null);
  const tokenRef = useRef<SVGGElement>(null);

  useEffect(() => {
    const next = !reducedMotion;
    setAutoPlay(next);
    autoPlayRef.current = next;
  }, [reducedMotion]);

  const layout = useCallback(() => {
    const flow = flowRef.current;
    const n1 = n1Ref.current;
    const n2 = n2Ref.current;
    const bm = bmRef.current;
    const bo = boRef.current;
    const nd = ndRef.current;
    const p1 = p1Ref.current;
    const p2y = p2yRef.current;
    const p2n = p2nRef.current;
    const p3y = p3yRef.current;
    const p3n = p3nRef.current;
    const lines = linesRef.current;
    const tokl = toklRef.current;
    if (!flow || !n1 || !n2 || !bm || !bo || !nd || !p1 || !p2y || !p2n || !p3y || !p3n || !lines || !tokl) {
      return;
    }

    const c = flow.getBoundingClientRect();
    if (!c.width || !c.height) return;

    const R = (el: HTMLElement) => {
      const r = el.getBoundingClientRect();
      return {
        t: r.top - c.top,
        b: r.bottom - c.top,
        x: (r.left + r.right) / 2 - c.left,
      };
    };

    const a = R(n1);
    const b = R(n2);
    const y = R(bm);
    const n = R(bo);
    const d = R(nd);

    p1.setAttribute("d", curvePath(a.x, a.b, b.x, b.t));
    p2y.setAttribute("d", curvePath(b.x, b.b, y.x, y.t));
    p2n.setAttribute("d", curvePath(b.x, b.b, n.x, n.t));
    p3y.setAttribute("d", curvePath(y.x, y.b, d.x, d.t));
    p3n.setAttribute("d", curvePath(n.x, n.b, d.x, d.t));

    const vb = `0 0 ${c.width} ${c.height}`;
    lines.setAttribute("viewBox", vb);
    tokl.setAttribute("viewBox", vb);
  }, []);

  useLayoutEffect(() => {
    const flow = flowRef.current;
    if (!flow) return;
    const ro = new ResizeObserver(() => layout());
    ro.observe(flow);
    void document.fonts?.ready.then(() => layout());
    layout();
    return () => ro.disconnect();
  }, [layout]);

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
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    autoPlayRef.current = !prefersReduced;
    setAutoPlay(!prefersReduced);

    const clearNodeClasses = () => {
      [n1Ref, n2Ref, bmRef, boRef, ndRef].forEach((ref) => {
        ref.current?.classList.remove("srs-act", "srs-dim", "srs-warm");
      });
      [p1Ref, p2yRef, p2nRef, p3yRef, p3nRef].forEach((ref) => {
        ref.current?.classList.remove("srs-on");
      });
    };

    const resetVisual = () => {
      clearNodeClasses();
      setDestPending(true);
      setDestWarm(false);
      setDestLabel("Pending");
      setDestTagShow(false);
      setResultHtml(
        '<span style="color:var(--srs-muted)">Waiting for the topic check…</span>',
      );
      if (tokenRef.current) tokenRef.current.style.opacity = "0";
      setActivity({
        a1: "idle",
        a2: "idle",
        a3: "idle",
        a2Text: "Detect topic",
        a3Text: "Route to team",
      });
      setStatusOpen(false);
      setShowTopicTag(false);
      setShowAssignedTag(false);
      setNoteShow(false);
    };

    const fillCard = (q: Inquiry) => {
      setCustomer(q.customer);
      setSubject(q.subject);
      setMessage(q.message);
      setNote(q.note);
      setTopicTag(q.topic);
      setOrderTag(q.orderId);
      setShowOrderTag(Boolean(q.orderId));
    };

    const play = (index: number) => {
      const runId = ++runIdRef.current;
      const isCurrent = () => runId === runIdRef.current;
      const q = INQUIRIES[index % INQUIRIES.length];
      if (!q) return;

      topicIndexRef.current = index;
      setTopicIndex(index);
      setProgressRun(false);
      window.requestAnimationFrame(() => {
        if (!isCurrent()) return;
        setProgressRun(autoPlayRef.current);
      });

      if (fadeTimerRef.current) window.clearTimeout(fadeTimerRef.current);
      setBodyFade(true);
      resetVisual();
      layout();

      fadeTimerRef.current = window.setTimeout(() => {
        if (!isCurrent()) return;
        fillCard(q);
        setBodyFade(false);
        // Recompute connectors after the right card content settles.
        window.requestAnimationFrame(() => {
          if (!isCurrent()) return;
          layout();
        });
      }, 230);

      void (async () => {
        await sleep(450, signal, isCurrent);
        if (!isCurrent()) return;

        n1Ref.current?.classList.add("srs-act");
        setActivity((s) => ({ ...s, a1: "done" }));
        await sleep(600, signal, isCurrent);
        if (!isCurrent()) return;

        const p0 = p1Ref.current;
        const tok = tokenRef.current;
        if (!p0 || !tok) return;
        p0.classList.add("srs-on");
        const s0 = p0.getPointAtLength(0);
        tok.setAttribute("transform", `translate(${s0.x} ${s0.y})`);
        tok.style.opacity = "1";
        await moveToken(tok, p0, 600, signal, isCurrent);
        if (!isCurrent()) return;

        n1Ref.current?.classList.remove("srs-act");
        n2Ref.current?.classList.add("srs-act");
        setActivity((s) => ({ ...s, a2: "cur" }));
        await sleep(700, signal, isCurrent);
        if (!isCurrent()) return;

        setActivity((s) => ({
          ...s,
          a2: "done",
          a2Text: `Topic detected: ${q.topic}`,
        }));
        setShowTopicTag(true);

        const matched = q.matched;
        const sel = matched ? bmRef.current : boRef.current;
        const oth = matched ? boRef.current : bmRef.current;
        const p2 = matched ? p2yRef.current : p2nRef.current;
        const p3 = matched ? p3yRef.current : p3nRef.current;
        sel?.classList.add("srs-act");
        oth?.classList.add("srs-dim");
        p2?.classList.add("srs-on");
        setActivity((s) => ({ ...s, a3: "cur" }));

        if (p2 && tok) await moveToken(tok, p2, 700, signal, isCurrent);
        if (!isCurrent()) return;
        p3?.classList.add("srs-on");
        if (p3 && tok) await moveToken(tok, p3, 700, signal, isCurrent);
        if (!isCurrent()) return;

        tok.style.opacity = "0";
        const team = matched ? "Orders" : "General Triage";
        ndRef.current?.classList.remove("srs-pend");
        ndRef.current?.classList.add("srs-act");
        if (!matched) ndRef.current?.classList.add("srs-warm");
        setDestPending(false);
        setDestWarm(!matched);
        setDestLabel(team);
        setDestTagLong(`ASSIGNED TO ${team.toUpperCase()}`);
        setDestTagShow(true);

        setResultHtml(
          `<b>Routing result:</b> ${q.result}<span class="srs-rc srs-mono">${
            matched ? "MATCHED" : "OTHERWISE"
          } → ${team.toUpperCase()}</span>`,
        );
        setActivity((s) => ({
          ...s,
          a3: "done",
          a3Text: `Assigned to ${team}`,
        }));
        setAssignedTag(`Assigned · ${team}`);
        setShowAssignedTag(true);
        setStatusOpen(true);

        await sleep(400, signal, isCurrent);
        if (!isCurrent()) return;
        setNoteShow(true);

        await sleep(3800, signal, isCurrent);
        if (!isCurrent()) return;
        if (!autoPlayRef.current) return;

        while (
          isCurrent() &&
          (!visibleRef.current || !pageVisibleRef.current)
        ) {
          await sleep(300, signal, isCurrent);
        }
        if (!isCurrent() || !autoPlayRef.current) return;
        play((index + 1) % INQUIRIES.length);
      })();
    };

    playRef.current = play;
    play(0);

    return () => {
      runIdRef.current += 1;
      clearSignal(signal);
      if (fadeTimerRef.current) window.clearTimeout(fadeTimerRef.current);
    };
  }, [layout]);

  const onTabClick = (index: number) => {
    playRef.current(index);
  };

  const onToggleAuto = () => {
    const next = !autoPlayRef.current;
    autoPlayRef.current = next;
    setAutoPlay(next);
    if (next) playRef.current(topicIndexRef.current);
    else setProgressRun(false);
  };

  return (
    <section
      ref={sectionRef}
      id="smart-routing"
      aria-labelledby="smart-routing-heading"
      className="srs scroll-mt-28 py-16 sm:py-20 lg:py-24"
    >
      <Container>
        <div className="srs-eb srs-eb-ac">SMART ROUTING</div>
        <h2
          id="smart-routing-heading"
          tabIndex={-1}
          className="mt-3 font-heading text-[clamp(1.75rem,5vw,2.75rem)] font-semibold tracking-tight text-balance outline-none"
        >
          Where should this inquiry go?
        </h2>
        <p className="mt-3 max-w-3xl text-[clamp(0.875rem,2vw,1.0625rem)] leading-relaxed text-muted">
          Switch between inquiries to see which team takes ownership—and why.
        </p>

        <div className="srs-ctl">
          <div className="srs-ctl-main">
            <div className="srs-cl">Select an inquiry</div>
            <div className="srs-cr">
              <div
                className="srs-seg"
                role="tablist"
                aria-label="Inquiries"
              >
                {INQUIRIES.map((item, index) => {
                  const selected = topicIndex === index;
                  return (
                    <button
                      key={item.name}
                      type="button"
                      role="tab"
                      aria-selected={selected}
                      className={cn("srs-tab", selected && "srs-tab-on")}
                      onClick={() => onTabClick(index)}
                    >
                      <span>{item.name}</span>
                      <span
                        className={cn(
                          "srs-tab-pg",
                          selected && progressRun && "srs-tab-pg-run",
                        )}
                        aria-hidden
                      />
                    </button>
                  );
                })}
              </div>
              <button
                type="button"
                className="srs-auto"
                aria-pressed={autoPlay}
                onClick={onToggleAuto}
              >
                <i aria-hidden />
                Auto-play
              </button>
            </div>
          </div>
          <span className="srs-rule">
            <Filter className="size-4" aria-hidden />
            Active rule: Order Tracking
          </span>
        </div>

        <div className="srs-grid">
          <div className="srs-card srs-fl">
            <div ref={flowRef} className="srs-flow">
              <svg
                ref={linesRef}
                className="srs-lines"
                aria-hidden
              >
                <path ref={p1Ref} className="srs-link" />
                <path ref={p2yRef} className="srs-link" />
                <path ref={p2nRef} className="srs-link srs-dash" />
                <path ref={p3yRef} className="srs-link" />
                <path ref={p3nRef} className="srs-link srs-dash" />
              </svg>
              <svg ref={toklRef} className="srs-tokl" aria-hidden>
                <g ref={tokenRef} className="srs-tok">
                  <circle r="18" fill="var(--srs-accent)" opacity=".25" />
                  <circle r="6" fill="var(--srs-accent)" />
                </g>
              </svg>

              <div ref={n1Ref} className="srs-nd">
                <span className="srs-ib">
                  <Inbox className="size-[18px]" aria-hidden />
                </span>
                <div>
                  <b>New Inquiry</b>
                  <small>Customer message enters the shared inbox</small>
                </div>
              </div>
              <div className="srs-gap" aria-hidden />
              <div ref={n2Ref} className="srs-nd">
                <span className="srs-ib">
                  <Filter className="size-[18px]" aria-hidden />
                </span>
                <div>
                  <b>Topic Condition</b>
                  <small>Is the topic Order Tracking?</small>
                </div>
              </div>
              <div className="srs-gap" aria-hidden />
              <div className="srs-br">
                <div ref={bmRef} className="srs-nd">
                  <span className="srs-ib">
                    <GitBranch className="size-4" aria-hidden />
                  </span>
                  <div>
                    <b>Matched</b>
                    <small>Route to Orders</small>
                  </div>
                </div>
                <div ref={boRef} className="srs-nd">
                  <span className="srs-ib">
                    <Split className="size-4" aria-hidden />
                  </span>
                  <div>
                    <b>Otherwise</b>
                    <small>Route to General Triage</small>
                  </div>
                </div>
              </div>
              <div className="srs-gap" aria-hidden />
              <div
                ref={ndRef}
                className={cn(
                  "srs-nd srs-dest",
                  destPending && "srs-pend",
                  destWarm && "srs-warm",
                )}
              >
                <span className="srs-ib">
                  <Users className="size-[18px]" aria-hidden />
                </span>
                <div className="srs-db">
                  <div className="srs-eb srs-dr">
                    <span>DESTINATION</span>
                    <span
                      className={cn(
                        "srs-tagm srs-mono",
                        destTagShow && "srs-show",
                      )}
                    >
                      <span className="srs-tl">{destTagLong}</span>
                      <span className="srs-ts">ASSIGNED</span>
                    </span>
                  </div>
                  <b>{destLabel}</b>
                </div>
              </div>
              <div
                className="srs-res"
                aria-live="polite"
                dangerouslySetInnerHTML={{ __html: resultHtml }}
              />
            </div>
          </div>

          <aside className="srs-card srs-rcard" aria-live="polite">
            <div className="srs-rh">
              <div>
                <div className="srs-eb srs-eb-ac" style={{ fontSize: "10.5px" }}>
                  CONVERSATION DETAILS
                </div>
                <div className="srs-nm">{customer}</div>
                <div className="srs-sj">{subject}</div>
              </div>
              <span className={cn("srs-pill", statusOpen && "srs-open")}>
                {statusOpen ? "Open" : "New"}
              </span>
            </div>

            <div className={cn("srs-rb", bodyFade && "srs-fade")}>
              <div className="srs-tags">
                <span
                  className={cn(
                    "srs-tg srs-mono",
                    !showTopicTag && "srs-hid",
                  )}
                >
                  {topicTag || "Order Tracking"}
                </span>
                <span
                  className={cn(
                    "srs-tg srs-mono",
                    (!showOrderTag || !orderTag) && "srs-hid",
                  )}
                >
                  {orderTag || "ORD-00000"}
                </span>
                <span
                  className={cn(
                    "srs-tg srs-mono srs-as",
                    !showAssignedTag && "srs-hid",
                  )}
                >
                  {assignedTag || "Assigned · Orders"}
                </span>
              </div>

              <div className="srs-msg">
                <small>
                  {customer} · Customer
                </small>
                <p>{message}</p>
              </div>

              <div className={cn("srs-nt", noteShow && "srs-show")}>
                <div className="srs-eb">
                  <FileText className="size-3.5" aria-hidden />
                  INTERNAL NOTE
                </div>
                <p>{note}</p>
                <small>Visible only to your team.</small>
              </div>

              <ul className="srs-actl">
                <li className="srs-eb">ACTIVITY</li>
                <li
                  className={cn(
                    "srs-st",
                    activity.a1 === "cur" && "srs-cur",
                    activity.a1 === "done" && "srs-done",
                  )}
                >
                  <b>
                    <Check aria-hidden />
                  </b>
                  <span>Inquiry received</span>
                </li>
                <li
                  className={cn(
                    "srs-st",
                    activity.a2 === "cur" && "srs-cur",
                    activity.a2 === "done" && "srs-done",
                  )}
                >
                  <b>
                    <Check aria-hidden />
                  </b>
                  <span>{activity.a2Text}</span>
                </li>
                <li
                  className={cn(
                    "srs-st",
                    activity.a3 === "cur" && "srs-cur",
                    activity.a3 === "done" && "srs-done",
                  )}
                >
                  <b>
                    <Check aria-hidden />
                  </b>
                  <span>{activity.a3Text}</span>
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </Container>
    </section>
  );
}
