"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type RefObject,
} from "react";
import { ArrowDown, ArrowRight, Package, StickyNote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { inboxFeatureHero } from "@/data/marketing/inbox-feature";
import { getGsap } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { cn } from "@/utils/cn";

type InboxHeroPanelId = "message" | "stamp" | "note";
type DragOffset = { x: number; y: number };
type ReturnTween = { kill: () => void };

const INITIAL_STACK: InboxHeroPanelId[] = ["message", "stamp", "note"];
const INITIAL_OFFSETS: Record<InboxHeroPanelId, DragOffset> = {
  message: { x: 0, y: 0 },
  stamp: { x: 0, y: 0 },
  note: { x: 0, y: 0 },
};

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function isInboxHeroPanelId(
  value: string | undefined,
): value is InboxHeroPanelId {
  return value === "message" || value === "stamp" || value === "note";
}

/** Cubic path from stamp bottom → note top, bulging outward as distance grows. */
function buildConnectorPath(
  stage: HTMLElement,
  stamp: HTMLElement,
  note: HTMLElement,
) {
  const stageRect = stage.getBoundingClientRect();
  const stampRect = stamp.getBoundingClientRect();
  const noteRect = note.getBoundingClientRect();

  const startX = stampRect.left + stampRect.width * 0.55 - stageRect.left;
  const startY = stampRect.bottom - stageRect.top + 2;
  const endX = noteRect.left + noteRect.width * 0.22 - stageRect.left;
  const endY = noteRect.top - stageRect.top - 2;

  const midY = (startY + endY) / 2;
  const dist = Math.hypot(endX - startX, endY - startY);
  const bulge = Math.max(24, Math.min(96, dist * 0.3));

  const c1x = startX + bulge;
  const c1y = startY + (midY - startY) * 0.55;
  const c2x = endX + bulge * 0.55;
  const c2y = endY - (endY - midY) * 0.55;

  return `M${startX.toFixed(1)} ${startY.toFixed(1)} C${c1x.toFixed(1)} ${c1y.toFixed(1)}, ${c2x.toFixed(1)} ${c2y.toFixed(1)}, ${endX.toFixed(1)} ${endY.toFixed(1)}`;
}

export function InboxFeatureHero({
  surfaceRef,
}: {
  surfaceRef: RefObject<HTMLElement | null>;
}) {
  const rootRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const lineRef = useRef<SVGPathElement>(null);
  const offsetsRef = useRef(INITIAL_OFFSETS);
  const returnTweens = useRef<Partial<Record<InboxHeroPanelId, ReturnTween>>>({});
  const reducedMotion = usePrefersReducedMotion();

  const [offsets, setOffsets] = useState(INITIAL_OFFSETS);
  const [stack, setStack] = useState<InboxHeroPanelId[]>(INITIAL_STACK);
  const [draggingId, setDraggingId] = useState<InboxHeroPanelId | null>(null);

  const updateConnector = useCallback(() => {
    const stage = stageRef.current;
    const svg = svgRef.current;
    const line = lineRef.current;
    const stamp = stage?.querySelector<HTMLElement>("[data-inbox-hero-stamp]");
    const note = stage?.querySelector<HTMLElement>("[data-inbox-hero-note]");
    if (!stage || !svg || !line || !stamp || !note) return;

    const width = Math.max(1, stage.clientWidth);
    const height = Math.max(1, stage.clientHeight);
    svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
    line.setAttribute("d", buildConnectorPath(stage, stamp, note));

    // Keep a solid stroke while dragging / after entrance (dash is only for intro).
    if (line.dataset.drawing !== "true") {
      line.style.strokeDasharray = "none";
      line.style.strokeDashoffset = "0";
    }
  }, []);

  const dragRef = useRef<{
    pointerId: number;
    panelId: InboxHeroPanelId;
    startX: number;
    startY: number;
    originX: number;
    originY: number;
    active: boolean;
  } | null>(null);

  const zIndexFor = (id: InboxHeroPanelId) => 20 + stack.indexOf(id);

  const bringToFront = useCallback((id: InboxHeroPanelId) => {
    setStack((current) => [...current.filter((item) => item !== id), id]);
  }, []);

  const constrain = useCallback(
    (panelId: InboxHeroPanelId, x: number, y: number) => {
      const surface = surfaceRef.current;
      const stage = stageRef.current;
      const panel = stage?.querySelector<HTMLElement>(
        `[data-inbox-hero-panel="${panelId}"]`,
      );
      if (!surface || !panel) return { x, y };

      const offset = offsetsRef.current[panelId];
      const surfaceRect = surface.getBoundingClientRect();
      const panelRect = panel.getBoundingClientRect();
      const baseLeft = panelRect.left - offset.x - surfaceRect.left;
      const baseTop = panelRect.top - offset.y - surfaceRect.top;
      const maxX = Math.max(0, surfaceRect.width - panelRect.width);
      const maxY = Math.max(0, surfaceRect.height - panelRect.height);

      return {
        x: clamp(x, -baseLeft, maxX - baseLeft),
        y: clamp(y, -baseTop, maxY - baseTop),
      };
    },
    [surfaceRef],
  );

  const springBack = useCallback(
    (panelId: InboxHeroPanelId) => {
      returnTweens.current[panelId]?.kill();
      const from = offsetsRef.current[panelId];
      if (Math.hypot(from.x, from.y) < 0.5) {
        const next = { x: 0, y: 0 };
        offsetsRef.current = { ...offsetsRef.current, [panelId]: next };
        setOffsets((current) => ({ ...current, [panelId]: next }));
        return;
      }

      const { gsap } = getGsap();
      const proxy = { x: from.x, y: from.y };
      const tween = gsap.to(proxy, {
        x: 0,
        y: 0,
        duration: reducedMotion ? 0.01 : 0.95,
        ease: reducedMotion ? "none" : "elastic.out(0.85, 0.6)",
        onUpdate: () => {
          const next = { x: proxy.x, y: proxy.y };
          offsetsRef.current = { ...offsetsRef.current, [panelId]: next };
          setOffsets((current) => ({ ...current, [panelId]: next }));
          requestAnimationFrame(updateConnector);
        },
        onComplete: () => {
          const next = { x: 0, y: 0 };
          offsetsRef.current = { ...offsetsRef.current, [panelId]: next };
          setOffsets((current) => ({ ...current, [panelId]: next }));
          updateConnector();
          delete returnTweens.current[panelId];
        },
      });
      returnTweens.current[panelId] = tween;
    },
    [reducedMotion, updateConnector],
  );

  useEffect(() => {
    const stage = stageRef.current;
    const surface = surfaceRef.current;
    if (!stage || !surface) return;

    const onPointerDown = (event: PointerEvent) => {
      if (event.button > 0) return;
      const target = event.target as HTMLElement | null;
      if (target?.closest("a, button, input, textarea, select, label")) return;

      const panelEl = target?.closest<HTMLElement>("[data-inbox-hero-panel]");
      const panelId = panelEl?.dataset.inboxHeroPanel;
      if (!panelEl || !isInboxHeroPanelId(panelId)) return;

      returnTweens.current[panelId]?.kill();
      delete returnTweens.current[panelId];

      const origin = offsetsRef.current[panelId];
      dragRef.current = {
        pointerId: event.pointerId,
        panelId,
        startX: event.clientX,
        startY: event.clientY,
        originX: origin.x,
        originY: origin.y,
        active: false,
      };
      bringToFront(panelId);
    };

    const onPointerMove = (event: PointerEvent) => {
      const drag = dragRef.current;
      if (!drag || event.pointerId !== drag.pointerId) return;

      const dx = event.clientX - drag.startX;
      const dy = event.clientY - drag.startY;

      if (!drag.active) {
        if (Math.hypot(dx, dy) < 8) return;
        drag.active = true;
        setDraggingId(drag.panelId);
        try {
          surface.setPointerCapture(event.pointerId);
        } catch {
          /* ignore */
        }
      }

      event.preventDefault();
      const next = constrain(
        drag.panelId,
        drag.originX + dx,
        drag.originY + dy,
      );
      offsetsRef.current = { ...offsetsRef.current, [drag.panelId]: next };
      setOffsets((current) => ({ ...current, [drag.panelId]: next }));
      // Sync path after the transform style commits this frame.
      requestAnimationFrame(() => updateConnector());
    };

    const endDrag = (event: PointerEvent) => {
      const drag = dragRef.current;
      if (!drag || event.pointerId !== drag.pointerId) return;
      if (drag.active) {
        try {
          surface.releasePointerCapture(event.pointerId);
        } catch {
          /* ignore */
        }
        springBack(drag.panelId);
      }
      dragRef.current = null;
      setDraggingId(null);
    };

    stage.addEventListener("pointerdown", onPointerDown);
    surface.addEventListener("pointermove", onPointerMove);
    surface.addEventListener("pointerup", endDrag);
    surface.addEventListener("pointercancel", endDrag);

    return () => {
      stage.removeEventListener("pointerdown", onPointerDown);
      surface.removeEventListener("pointermove", onPointerMove);
      surface.removeEventListener("pointerup", endDrag);
      surface.removeEventListener("pointercancel", endDrag);
    };
  }, [bringToFront, constrain, springBack, surfaceRef, updateConnector]);

  useEffect(() => {
    const tweens = returnTweens.current;
    return () => {
      Object.values(tweens).forEach((tween) => tween?.kill());
    };
  }, []);

  useLayoutEffect(() => {
    updateConnector();
  }, [offsets, updateConnector]);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const observer = new ResizeObserver(() => updateConnector());
    observer.observe(stage);
    window.addEventListener("resize", updateConnector);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateConnector);
    };
  }, [updateConnector]);

  useEffect(() => {
    const surface = surfaceRef.current;
    if (draggingId) {
      if (surface) surface.dataset.inboxDragging = "true";
      document.body.style.cursor = "grabbing";
      document.body.style.userSelect = "none";
    } else {
      if (surface) delete surface.dataset.inboxDragging;
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    }
    return () => {
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };
  }, [draggingId, surfaceRef]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || reducedMotion) {
      updateConnector();
      return;
    }
    const { gsap } = getGsap();
    const ctx = gsap.context(() => {
      const message = root.querySelector<HTMLElement>("[data-inbox-hero-message]");
      const stamp = root.querySelector<HTMLElement>("[data-inbox-hero-stamp]");
      const note = root.querySelector<HTMLElement>("[data-inbox-hero-note]");
      const line = lineRef.current;

      const panels = [message, stamp, note].filter(Boolean) as HTMLElement[];
      gsap.set(panels, { autoAlpha: 0, "--entrance-y": "12px" });
      updateConnector();
      if (line) {
        line.dataset.drawing = "true";
        if (typeof line.getTotalLength === "function") {
          const length = line.getTotalLength();
          gsap.set(line, {
            strokeDasharray: length,
            strokeDashoffset: length,
            opacity: 0.35,
          });
        }
      }

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        onUpdate: updateConnector,
      });
      tl.to(message, { autoAlpha: 1, "--entrance-y": "0px", duration: 0.45 })
        .to(stamp, { autoAlpha: 1, "--entrance-y": "0px", duration: 0.35 }, "-=0.12")
        .add(() => {
          updateConnector();
          if (line && typeof line.getTotalLength === "function") {
            const length = line.getTotalLength();
            gsap.set(line, {
              strokeDasharray: length,
              strokeDashoffset: length,
            });
          }
        })
        .to(
          line,
          { strokeDashoffset: 0, opacity: 1, duration: 0.35 },
          "-=0.05",
        )
        .to(note, { autoAlpha: 1, "--entrance-y": "0px", duration: 0.4 }, "-=0.15")
        .add(() => {
          if (line) {
            delete line.dataset.drawing;
            line.style.strokeDasharray = "none";
            line.style.strokeDashoffset = "0";
          }
          updateConnector();
        });
    }, root);
    return () => ctx.revert();
  }, [reducedMotion, updateConnector]);

  const panelStyle = (id: InboxHeroPanelId): CSSProperties =>
    ({
      zIndex: zIndexFor(id),
      "--drag-x": `${offsets[id].x}px`,
      "--drag-y": `${offsets[id].y}px`,
      "--entrance-y": "0px",
      transform:
        id === "stamp"
          ? "translate3d(var(--drag-x), calc(var(--drag-y) + var(--entrance-y)), 0) rotate(-6deg)"
          : "translate3d(var(--drag-x), calc(var(--drag-y) + var(--entrance-y)), 0)",
    }) as CSSProperties;

  return (
    <header
      ref={rootRef}
      className="relative overflow-visible pt-12 pb-14 sm:pt-16 sm:pb-16 lg:pb-20"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_80%_0%,var(--glow),transparent_60%)]" />
        <div className="absolute inset-0 bg-grid-fade [mask-image:linear-gradient(to_bottom,black_40%,transparent)]" />
      </div>

      <Container className="relative">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
          <div className="max-w-xl">
            <p className="text-xs font-semibold tracking-[0.18em] text-accent uppercase">
              {inboxFeatureHero.eyebrow}
            </p>
            <h1 className="mt-4 font-heading text-[2.2rem] leading-[1.08] font-semibold tracking-tight text-balance sm:text-[3.1rem] lg:text-[3.4rem]">
              {inboxFeatureHero.title}
            </h1>
            <p className="mt-5 max-w-lg text-base leading-7 text-muted sm:text-[1.05rem] sm:leading-8">
              {inboxFeatureHero.description}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href={inboxFeatureHero.primaryCta.href} size="lg">
                {inboxFeatureHero.primaryCta.label}
                <ArrowRight className="size-4" />
              </Button>
              <Button
                href={inboxFeatureHero.secondaryCta.href}
                variant="secondary"
                size="lg"
              >
                {inboxFeatureHero.secondaryCta.label}
                <ArrowDown className="size-4" />
              </Button>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-md">
            <div
              ref={stageRef}
              className="relative min-h-[16.5rem] touch-pan-y sm:min-h-[18rem]"
            >
              <svg
                ref={svgRef}
                className="pointer-events-none absolute inset-0 z-[15] hidden h-full w-full overflow-visible sm:block"
                viewBox="0 0 360 280"
                fill="none"
                aria-hidden
              >
                <path
                  ref={lineRef}
                  data-inbox-hero-line
                  d="M293 60 C321 92, 234 146, 216 178"
                  stroke="var(--accent)"
                  strokeWidth="1.5"
                  fill="none"
                />
              </svg>

              <div
                data-inbox-hero-panel="message"
                data-inbox-hero-message
                className={cn(
                  "relative cursor-grab touch-none rounded-2xl border border-border bg-surface p-4 shadow-[var(--shadow-soft)] will-change-transform active:cursor-grabbing sm:absolute sm:top-8 sm:left-0 sm:w-[15.5rem]",
                  draggingId === "message" && "cursor-grabbing",
                )}
                style={panelStyle("message")}
              >
                <p className="text-[10px] font-semibold tracking-[0.14em] text-accent uppercase">
                  Maya Chen
                </p>
                <p className="mt-2 text-sm leading-relaxed">
                  My order was due yesterday, but the tracking page hasn’t
                  changed…
                </p>
              </div>

              <div
                data-inbox-hero-panel="stamp"
                data-inbox-hero-stamp
                className={cn(
                  "relative mt-3 inline-flex cursor-grab touch-none items-center gap-1.5 rounded-md border-2 border-accent/60 bg-accent/10 px-3 py-2 will-change-transform active:cursor-grabbing sm:absolute sm:top-4 sm:right-2 sm:mt-0",
                  draggingId === "stamp" && "cursor-grabbing",
                )}
                style={panelStyle("stamp")}
              >
                <Package className="size-3.5 text-accent" aria-hidden />
                <span className="font-mono text-[10px] font-bold tracking-[0.12em] text-accent uppercase">
                  Assigned to Orders
                </span>
              </div>

              <div
                data-inbox-hero-panel="note"
                data-inbox-hero-note
                className={cn(
                  "relative mt-3 cursor-grab touch-none rounded-xl border border-accent/25 bg-accent/10 p-3 will-change-transform active:cursor-grabbing sm:absolute sm:right-0 sm:bottom-2 sm:mt-0 sm:w-[14rem]",
                  draggingId === "note" && "cursor-grabbing",
                )}
                style={panelStyle("note")}
              >
                <p className="inline-flex items-center gap-1.5 text-[10px] font-semibold tracking-[0.12em] text-accent uppercase">
                  <StickyNote className="size-3" aria-hidden />
                  Internal note
                </p>
                <p className="mt-1.5 text-xs leading-relaxed text-foreground">
                  Check the carrier scan before replying.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </header>
  );
}
