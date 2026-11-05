"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type MouseEvent,
  type RefObject,
} from "react";
import { ArrowDown, ArrowRight, Briefcase, Layers, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { useLenis } from "@/context/lenis-context";
import { solutionsHero } from "@/data/marketing/solutions";
import { getGsap } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { cn } from "@/utils/cn";

const slipIcons = [Package, Layers, Briefcase] as const;

type SlipId = "ecommerce" | "saas" | "services";

type DragOffset = { x: number; y: number };

const SLIP_IDS: SlipId[] = ["ecommerce", "saas", "services"];

/** Back → front: Services, Software, Ecommerce on top. */
const INITIAL_STACK: SlipId[] = ["services", "saas", "ecommerce"];

const INITIAL_OFFSETS: Record<SlipId, DragOffset> = {
  ecommerce: { x: 0, y: 0 },
  saas: { x: 0, y: 0 },
  services: { x: 0, y: 0 },
};

const SLIP_ROTATE: Record<SlipId, string> = {
  ecommerce: "-2deg",
  saas: "1.5deg",
  services: "-1deg",
};

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export function SolutionsHero({
  surfaceRef,
}: {
  surfaceRef: RefObject<HTMLElement | null>;
}) {
  const rootRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const offsetsRef = useRef(INITIAL_OFFSETS);
  const reducedMotion = usePrefersReducedMotion();
  const { scrollToElement } = useLenis();

  const [offsets, setOffsets] = useState(INITIAL_OFFSETS);
  const [stack, setStack] = useState<SlipId[]>(INITIAL_STACK);
  const [draggingId, setDraggingId] = useState<SlipId | null>(null);

  const dragRef = useRef<{
    pointerId: number;
    slipId: SlipId;
    startX: number;
    startY: number;
    originX: number;
    originY: number;
    active: boolean;
  } | null>(null);

  useEffect(() => {
    offsetsRef.current = offsets;
  }, [offsets]);

  const zIndexFor = (id: SlipId) => 40 + stack.indexOf(id);

  const bringToFront = useCallback((id: SlipId) => {
    setStack((current) => [...current.filter((item) => item !== id), id]);
  }, []);

  const constrain = useCallback(
    (slipId: SlipId, x: number, y: number) => {
      const surface = surfaceRef.current;
      const stage = stageRef.current;
      const panel = stage?.querySelector<HTMLElement>(
        `[data-solutions-slip="${slipId}"]`,
      );
      if (!surface || !panel) return { x, y };

      const offset = offsetsRef.current[slipId];
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
    const stage = stageRef.current;
    const surface = surfaceRef.current;
    if (!stage || !surface) return;

    const isSlipId = (value: string | undefined): value is SlipId =>
      value === "ecommerce" || value === "saas" || value === "services";

    const onPointerDown = (event: PointerEvent) => {
      if (event.button > 0) return;
      const target = event.target as HTMLElement | null;
      if (target?.closest("a, button, input, textarea, select, label")) return;

      const panelEl = target?.closest<HTMLElement>("[data-solutions-slip]");
      const slipId = panelEl?.dataset.solutionsSlip;
      if (!panelEl || !isSlipId(slipId)) return;

      const origin = offsetsRef.current[slipId];
      dragRef.current = {
        pointerId: event.pointerId,
        slipId,
        startX: event.clientX,
        startY: event.clientY,
        originX: origin.x,
        originY: origin.y,
        active: false,
      };
      bringToFront(slipId);
    };

    const onPointerMove = (event: PointerEvent) => {
      const drag = dragRef.current;
      if (!drag || event.pointerId !== drag.pointerId) return;

      const dx = event.clientX - drag.startX;
      const dy = event.clientY - drag.startY;

      if (!drag.active) {
        if (Math.hypot(dx, dy) < 8) return;
        drag.active = true;
        setDraggingId(drag.slipId);
        try {
          surface.setPointerCapture(event.pointerId);
        } catch {
          /* ignore */
        }
      }

      event.preventDefault();
      const next = constrain(
        drag.slipId,
        drag.originX + dx,
        drag.originY + dy,
      );
      setOffsets((current) => ({ ...current, [drag.slipId]: next }));
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
  }, [bringToFront, constrain, surfaceRef]);

  useEffect(() => {
    const surface = surfaceRef.current;
    if (draggingId) {
      if (surface) surface.dataset.solutionsDragging = "true";
      document.body.style.cursor = "grabbing";
      document.body.style.userSelect = "none";
    } else {
      if (surface) delete surface.dataset.solutionsDragging;
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
      gsap.fromTo(
        "[data-solutions-slip]",
        { autoAlpha: 0, "--entrance-y": "18px" },
        {
          autoAlpha: 1,
          "--entrance-y": "0px",
          duration: 0.55,
          stagger: 0.1,
          ease: "power3.out",
          immediateRender: false,
        },
      );
    }, root);
    return () => ctx.revert();
  }, [reducedMotion]);

  const scrollToSolutions = (event: MouseEvent<HTMLElement>) => {
    event.preventDefault();
    scrollToElement(solutionsHero.primaryCta.href.replace("#", ""), {
      immediate: reducedMotion,
    });
  };

  return (
    <header
      ref={rootRef}
      className="relative z-30 overflow-visible pt-12 pb-14 sm:pt-16 sm:pb-16 lg:pb-20"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_15%_0%,var(--glow),transparent_60%)]" />
        <div className="absolute inset-0 bg-grid-fade [mask-image:linear-gradient(to_bottom,black_40%,transparent)]" />
      </div>

      <Container className="relative">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
          <div className="relative z-10 max-w-xl">
            <p className="text-xs font-semibold tracking-[0.18em] text-accent uppercase">
              {solutionsHero.eyebrow}
            </p>
            <h1 className="mt-4 font-heading text-[2.2rem] leading-[1.08] font-semibold tracking-tight text-balance sm:text-[3.1rem] lg:text-[3.5rem]">
              {solutionsHero.title}
            </h1>
            <p className="mt-5 max-w-lg text-base leading-7 text-muted sm:text-[1.05rem] sm:leading-8">
              {solutionsHero.description}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button
                href={solutionsHero.primaryCta.href}
                size="lg"
                onClick={scrollToSolutions}
              >
                {solutionsHero.primaryCta.label}
                <ArrowDown className="size-4" aria-hidden />
              </Button>
              <Button
                href={solutionsHero.secondaryCta.href}
                variant="secondary"
                size="lg"
              >
                {solutionsHero.secondaryCta.label}
                <ArrowRight className="size-4" aria-hidden />
              </Button>
            </div>
          </div>

          <div
            ref={stageRef}
            className="relative z-40 mx-auto min-h-[17.5rem] w-full max-w-md overflow-visible sm:min-h-[19rem]"
            aria-hidden
          >
            {solutionsHero.slips.map((slip, index) => {
              const Icon = slipIcons[index];
              const slipId = SLIP_IDS[index];
              const offset = offsets[slipId];
              const dragging = draggingId === slipId;

              return (
                <article
                  key={slipId}
                  data-solutions-slip={slipId}
                  className={cn(
                    "absolute w-[88%] cursor-grab touch-none rounded-2xl border border-border bg-surface p-4 shadow-[var(--shadow-soft)] will-change-transform active:cursor-grabbing",
                    dragging && "cursor-grabbing",
                    index === 0 && "top-8 left-0 sm:top-6",
                    index === 1 &&
                      "top-16 left-[8%] opacity-95 sm:left-[10%]",
                    index === 2 &&
                      "top-24 left-[16%] opacity-90 sm:left-[18%]",
                  )}
                  style={
                    {
                      zIndex: zIndexFor(slipId),
                      "--drag-x": `${offset.x}px`,
                      "--drag-y": `${offset.y}px`,
                      "--entrance-y": "0px",
                      "--slip-rotate": SLIP_ROTATE[slipId],
                      transform:
                        "translate3d(var(--drag-x), calc(var(--drag-y) + var(--entrance-y)), 0) rotate(var(--slip-rotate))",
                    } as CSSProperties
                  }
                >
                  <div className="flex items-center gap-2">
                    <span className="flex size-8 items-center justify-center rounded-lg bg-accent-soft text-accent">
                      <Icon className="size-3.5" />
                    </span>
                    <span className="font-mono text-[10px] tracking-[0.16em] text-muted uppercase">
                      {slip.industry}
                    </span>
                  </div>
                  <p className="mt-3 font-heading text-base font-semibold tracking-tight sm:text-lg">
                    “{slip.question}”
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </Container>
    </header>
  );
}
