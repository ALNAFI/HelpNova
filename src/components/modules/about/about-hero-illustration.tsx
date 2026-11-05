"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
  type RefObject,
} from "react";
import {
  BarChart3,
  CheckCircle2,
  MessageSquareText,
  Route,
} from "lucide-react";
import { getGsap } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { cn } from "@/utils/cn";

type PanelId = "conversations" | "workflows" | "insights";

type DragOffset = { x: number; y: number };

const PANEL_IDS: PanelId[] = ["conversations", "workflows", "insights"];

const INITIAL_OFFSETS: Record<PanelId, DragOffset> = {
  conversations: { x: 0, y: 0 },
  workflows: { x: 0, y: 0 },
  insights: { x: 0, y: 0 },
};

const FLOAT_DISTANCE: Record<PanelId, number> = {
  conversations: 6,
  workflows: 8,
  insights: 7,
};

const FLOAT_DURATION: Record<PanelId, number> = {
  conversations: 3.4,
  workflows: 2.8,
  insights: 3.1,
};

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function PanelShell({
  id,
  offset,
  zIndex,
  dragging,
  className,
  children,
}: {
  id: PanelId;
  offset: DragOffset;
  zIndex: number;
  dragging: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      data-about-panel={id}
      data-about-float={id}
      className={cn(
        "min-w-0 cursor-grab touch-none will-change-transform [--float-y:0px] active:cursor-grabbing",
        dragging && "cursor-grabbing",
        className,
      )}
      style={
        {
          zIndex,
          "--drag-x": `${offset.x}px`,
          "--drag-y": `${offset.y}px`,
          transform:
            "translate3d(var(--drag-x), calc(var(--drag-y) + var(--float-y)), 0)",
        } as CSSProperties
      }
    >
      {children}
    </div>
  );
}

export function AboutHeroIllustration({
  className,
  surfaceRef,
}: {
  className?: string;
  surfaceRef: RefObject<HTMLElement | null>;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const offsetsRef = useRef(INITIAL_OFFSETS);
  const stackRef = useRef<PanelId[]>([...PANEL_IDS]);
  const reducedMotion = usePrefersReducedMotion();
  const [offsets, setOffsets] = useState(INITIAL_OFFSETS);
  const [stack, setStack] = useState<PanelId[]>([...PANEL_IDS]);
  const [draggingId, setDraggingId] = useState<PanelId | null>(null);

  const dragRef = useRef<{
    pointerId: number;
    panelId: PanelId;
    startX: number;
    startY: number;
    originX: number;
    originY: number;
    active: boolean;
  } | null>(null);

  useEffect(() => {
    offsetsRef.current = offsets;
  }, [offsets]);

  useEffect(() => {
    stackRef.current = stack;
  }, [stack]);

  const zIndexFor = (id: PanelId) => 30 + stack.indexOf(id);

  const bringToFront = useCallback((id: PanelId) => {
    setStack((current) => [...current.filter((item) => item !== id), id]);
  }, []);

  const constrain = useCallback(
    (panelId: PanelId, x: number, y: number) => {
      const surface = surfaceRef.current;
      const root = rootRef.current;
      const panel = root?.querySelector<HTMLElement>(
        `[data-about-panel="${panelId}"]`,
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

  useEffect(() => {
    const root = rootRef.current;
    const surface = surfaceRef.current;
    if (!root || !surface) return;

    const isPanelId = (value: string | undefined): value is PanelId =>
      value === "conversations" ||
      value === "workflows" ||
      value === "insights";

    const onPointerDown = (event: PointerEvent) => {
      if (event.button > 0) return;
      const target = event.target as HTMLElement | null;
      if (target?.closest("a, button, input, textarea, select, label")) return;

      // Only start drag when the pointer is directly on one of the three cards.
      const panelEl = target?.closest<HTMLElement>("[data-about-panel]");
      const panelId = panelEl?.dataset.aboutPanel;
      if (!panelEl || !isPanelId(panelId)) return;

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
      setOffsets((current) => ({ ...current, [drag.panelId]: next }));
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
      }
      dragRef.current = null;
      setDraggingId(null);
    };

    root.addEventListener("pointerdown", onPointerDown);
    surface.addEventListener("pointermove", onPointerMove);
    surface.addEventListener("pointerup", endDrag);
    surface.addEventListener("pointercancel", endDrag);

    return () => {
      root.removeEventListener("pointerdown", onPointerDown);
      surface.removeEventListener("pointermove", onPointerMove);
      surface.removeEventListener("pointerup", endDrag);
      surface.removeEventListener("pointercancel", endDrag);
    };
  }, [bringToFront, constrain, surfaceRef]);

  useEffect(() => {
    const surface = surfaceRef.current;
    if (!surface) return;
    if (draggingId) {
      surface.dataset.aboutDragging = "true";
      document.body.style.cursor = "grabbing";
      document.body.style.userSelect = "none";
    } else {
      delete surface.dataset.aboutDragging;
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
    if (!root || reducedMotion) return;
    const { gsap } = getGsap();
    const ctx = gsap.context(() => {
      PANEL_IDS.forEach((id, index) => {
        const panel = root.querySelector<HTMLElement>(
          `[data-about-float="${id}"]`,
        );
        if (!panel) return;
        gsap.to(panel, {
          "--float-y": `${-FLOAT_DISTANCE[id]}px`,
          duration: FLOAT_DURATION[id],
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          delay: index * 0.28,
        });
      });
    }, root);
    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <div
      ref={rootRef}
      className={cn(
        "relative mx-auto flex h-full min-h-[22rem] w-full max-w-none flex-col justify-center overflow-visible py-3 sm:min-h-[24rem]",
        className,
      )}
      aria-hidden
    >
      <div className="pointer-events-none absolute inset-[6%] rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--accent)_16%,transparent),transparent_70%)] blur-2xl" />

      <div className="relative mx-auto flex w-full max-w-[28rem] flex-col gap-3 sm:gap-3.5">
        <PanelShell
          id="conversations"
          offset={offsets.conversations}
          zIndex={zIndexFor("conversations")}
          dragging={draggingId === "conversations"}
          className="w-full"
        >
          <div className="rounded-[1.35rem] border border-border bg-surface p-3.5 shadow-[0_18px_40px_-24px_color-mix(in_oklab,var(--accent)_40%,transparent),var(--shadow-soft)] sm:p-4">
            <div className="flex items-center gap-2">
              <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-accent text-[11px] font-semibold text-accent-foreground sm:size-9 sm:text-xs">
                MC
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="truncate text-sm font-semibold text-foreground">
                    Maya Chen
                  </p>
                  <span className="rounded-full bg-accent-soft px-1.5 py-0.5 text-[10px] font-medium text-accent">
                    Email
                  </span>
                </div>
                <p className="mt-0.5 flex items-center gap-1 text-[11px] text-muted">
                  <MessageSquareText className="size-3 shrink-0" />
                  Conversations
                </p>
              </div>
            </div>

            <div className="mt-3.5 space-y-2">
              <div className="max-w-[95%] rounded-2xl rounded-tl-md border border-border bg-surface-muted/70 px-3 py-2 text-[12px] leading-5 text-foreground sm:max-w-[92%] sm:text-[13px]">
                My order hasn’t arrived. Can you check the delivery status?
              </div>
              <div className="ml-auto max-w-[92%] rounded-2xl rounded-tr-md bg-accent/15 px-3 py-2 text-[12px] leading-5 text-foreground sm:max-w-[88%] sm:text-[13px]">
                Thanks, Maya — I’m checking the tracking details now.
              </div>
            </div>

            <div className="mt-3 rounded-xl border border-dashed border-border bg-surface-muted/40 px-3 py-2">
              <p className="text-[10px] font-medium tracking-[0.08em] text-muted uppercase">
                Reply preview
              </p>
              <p className="mt-1 text-[12px] leading-5 text-muted sm:text-[13px]">
                Carrier scan delayed · tracking linked for Orders…
              </p>
            </div>
          </div>
        </PanelShell>

        <div className="grid grid-cols-2 gap-3 sm:gap-3.5">
          <PanelShell
            id="workflows"
            offset={offsets.workflows}
            zIndex={zIndexFor("workflows")}
            dragging={draggingId === "workflows"}
          >
            <div className="h-full rounded-[1.15rem] border border-border bg-surface p-3 shadow-[var(--shadow-soft)] sm:p-3.5">
              <div className="flex items-center gap-1.5 text-accent">
                <Route className="size-3.5 shrink-0" />
                <p className="text-[10px] font-semibold tracking-[0.12em] uppercase">
                  Workflows
                </p>
              </div>
              <div className="mt-3 space-y-2">
                <div className="rounded-lg border border-border bg-surface-muted/55 px-2.5 py-2">
                  <p className="text-[10px] text-muted">Inquiry</p>
                  <p className="mt-0.5 text-[11px] font-medium leading-4 text-foreground">
                    Order delivery question
                  </p>
                </div>
                <div className="flex justify-center" aria-hidden>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    className="text-accent"
                  >
                    <path
                      d="M7 2v8M4 8l3 3 3-3"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div className="rounded-lg border border-accent/35 bg-accent px-2.5 py-2 text-accent-foreground">
                  <p className="text-[10px] opacity-80">Assigned to</p>
                  <p className="mt-0.5 text-[11px] font-semibold">Orders team</p>
                </div>
              </div>
            </div>
          </PanelShell>

          <PanelShell
            id="insights"
            offset={offsets.insights}
            zIndex={zIndexFor("insights")}
            dragging={draggingId === "insights"}
          >
            <div className="h-full rounded-[1.15rem] border border-border bg-surface p-3 shadow-[var(--shadow-soft)] sm:p-3.5">
              <div className="flex items-center gap-1.5 text-accent">
                <BarChart3 className="size-3.5 shrink-0" />
                <p className="text-[10px] font-semibold tracking-[0.12em] uppercase">
                  Insights
                </p>
              </div>
              <div className="mt-3 flex h-12 items-end gap-1.5 px-0.5 sm:h-14">
                {[38, 58, 46, 72, 64, 84].map((height, index) => (
                  <span
                    key={height}
                    className={cn(
                      "w-full rounded-sm",
                      index === 5 ? "bg-accent" : "bg-accent-soft",
                    )}
                    style={{ height: `${height}%` }}
                  />
                ))}
              </div>
              <div className="mt-3 flex items-center gap-1.5 rounded-lg border border-border/80 bg-surface-muted/50 px-2 py-1.5">
                <CheckCircle2 className="size-3.5 shrink-0 text-accent" />
                <p className="text-[11px] font-medium text-foreground">
                  Resolved · 73%
                </p>
              </div>
            </div>
          </PanelShell>
        </div>
      </div>
    </div>
  );
}
