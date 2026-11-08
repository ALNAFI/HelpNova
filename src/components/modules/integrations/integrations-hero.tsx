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
import { ArrowDown, ArrowRight } from "lucide-react";
import { integrationIconById } from "@/components/modules/integrations/integration-icons";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { integrationsPageCopy } from "@/data/marketing/integrations-page";
import { getGsap } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { cn } from "@/utils/cn";

type TileId = "shopify" | "gmail" | "notion";
type CardId = "message" | TileId;
type DragOffset = { x: number; y: number };
type ReturnTween = { kill: () => void };
type Placement = "none" | "center" | "x";

const TILE_IDS: TileId[] = ["shopify", "gmail", "notion"];
const INITIAL_STACK: CardId[] = ["shopify", "gmail", "notion", "message"];
const INITIAL_OFFSETS: Record<CardId, DragOffset> = {
  message: { x: 0, y: 0 },
  shopify: { x: 0, y: 0 },
  gmail: { x: 0, y: 0 },
  notion: { x: 0, y: 0 },
};

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function isCardId(value: string | undefined): value is CardId {
  return (
    value === "message" ||
    value === "shopify" ||
    value === "gmail" ||
    value === "notion"
  );
}

function visibleCard(stage: ParentNode, id: CardId) {
  const cards = stage.querySelectorAll<HTMLElement>(`[data-int-card="${id}"]`);
  return [...cards].find((card) => card.getClientRects().length > 0) ?? null;
}

/** Curve from the message card to a reference tile, attached to the facing edges. */
function buildConnectorPath(
  stage: HTMLElement,
  message: HTMLElement,
  tile: HTMLElement,
  tileId: TileId,
) {
  const stageRect = stage.getBoundingClientRect();
  const from = message.getBoundingClientRect();
  const to = tile.getBoundingClientRect();

  const fromX = from.left + from.width / 2;
  const fromY = from.top + from.height / 2;
  const toX = to.left + to.width / 2;
  const toY = to.top + to.height / 2;
  const dx = toX - fromX;
  const dy = toY - fromY;
  const horizontal = Math.abs(dx) > Math.abs(dy);

  let startX: number;
  let startY: number;
  let endX: number;
  let endY: number;

  if (horizontal) {
    startX = (dx > 0 ? from.right : from.left) - stageRect.left;
    startY = from.top + from.height * 0.5 - stageRect.top;
    endX = (dx > 0 ? to.left : to.right) - stageRect.left;
    endY = to.top + to.height * 0.5 - stageRect.top;
    startX += dx > 0 ? -1 : 1;
    endX += dx > 0 ? 1 : -1;
  } else {
    startX = from.left + from.width * 0.5 - stageRect.left;
    startY = (dy > 0 ? from.bottom : from.top) - stageRect.top;
    endX = to.left + to.width * 0.5 - stageRect.left;
    endY = (dy > 0 ? to.top : to.bottom) - stageRect.top;
    startY += dy > 0 ? -1 : 1;
    endY += dy > 0 ? 1 : -1;
  }

  const spanX = endX - startX;
  const spanY = endY - startY;
  const dist = Math.hypot(spanX, spanY) || 1;
  const px = -spanY / dist;
  const py = spanX / dist;
  const bow = tileId === "gmail" ? 1 : -1;
  const bulge = Math.max(12, Math.min(96, dist * 0.22));
  const bowX = px * bow * bulge;
  const bowY = py * bow * bulge;

  const c1x = startX + spanX * 0.33 + bowX;
  const c1y = startY + spanY * 0.33 + bowY;
  const c2x = startX + spanX * 0.66 + bowX * 0.55;
  const c2y = startY + spanY * 0.66 + bowY * 0.55;

  return `M${startX.toFixed(1)} ${startY.toFixed(1)} C${c1x.toFixed(1)} ${c1y.toFixed(1)}, ${c2x.toFixed(1)} ${c2y.toFixed(1)}, ${endX.toFixed(1)} ${endY.toFixed(1)}`;
}

export function IntegrationsHero({
  surfaceRef,
}: {
  surfaceRef: RefObject<HTMLElement | null>;
}) {
  const rootRef = useRef<HTMLElement>(null);
  const offsetsRef = useRef(INITIAL_OFFSETS);
  const returnTweens = useRef<Partial<Record<CardId, ReturnTween>>>({});
  const reducedMotion = usePrefersReducedMotion();
  const copy = integrationsPageCopy.hero;

  const [offsets, setOffsets] = useState(INITIAL_OFFSETS);
  const [stack, setStack] = useState<CardId[]>(INITIAL_STACK);
  const [draggingId, setDraggingId] = useState<CardId | null>(null);

  const updateConnector = useCallback(() => {
    const root = rootRef.current;
    if (!root) return;

    root.querySelectorAll<HTMLElement>("[data-int-stage]").forEach((stage) => {
      if (stage.getClientRects().length === 0) return;
      const svg = stage.querySelector("svg");
      const message = visibleCard(stage, "message");
      if (!svg || !message) return;

      const width = Math.max(1, stage.clientWidth);
      const height = Math.max(1, stage.clientHeight);
      svg.setAttribute("viewBox", `0 0 ${width} ${height}`);

      TILE_IDS.forEach((id) => {
        const tile = visibleCard(stage, id);
        const line = stage.querySelector<SVGPathElement>(`[data-int-line="${id}"]`);
        if (!tile || !line) return;
        line.setAttribute("d", buildConnectorPath(stage, message, tile, id));
        if (line.dataset.drawing !== "true") {
          line.style.strokeDasharray = "none";
          line.style.strokeDashoffset = "0";
        }
      });
    });
  }, []);

  const dragRef = useRef<{
    pointerId: number;
    cardId: CardId;
    startX: number;
    startY: number;
    originX: number;
    originY: number;
    active: boolean;
  } | null>(null);

  const zIndexFor = (id: CardId) => 20 + stack.indexOf(id);

  const bringToFront = useCallback((id: CardId) => {
    setStack((current) => [...current.filter((item) => item !== id), id]);
  }, []);

  const constrain = useCallback(
    (cardId: CardId, x: number, y: number) => {
      const surface = surfaceRef.current;
      const root = rootRef.current;
      const card = root ? visibleCard(root, cardId) : null;
      if (!surface || !card) return { x, y };

      const offset = offsetsRef.current[cardId];
      const surfaceRect = surface.getBoundingClientRect();
      const cardRect = card.getBoundingClientRect();
      const baseLeft = cardRect.left - offset.x - surfaceRect.left;
      const baseTop = cardRect.top - offset.y - surfaceRect.top;
      const maxX = Math.max(0, surfaceRect.width - cardRect.width);
      const maxY = Math.max(0, surfaceRect.height - cardRect.height);

      return {
        x: clamp(x, -baseLeft, maxX - baseLeft),
        y: clamp(y, -baseTop, maxY - baseTop),
      };
    },
    [surfaceRef],
  );

  const springBack = useCallback(
    (cardId: CardId) => {
      returnTweens.current[cardId]?.kill();
      const from = offsetsRef.current[cardId];
      if (Math.hypot(from.x, from.y) < 0.5) {
        setOffsets((current) => ({ ...current, [cardId]: { x: 0, y: 0 } }));
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
          offsetsRef.current = { ...offsetsRef.current, [cardId]: next };
          setOffsets((current) => ({ ...current, [cardId]: next }));
          requestAnimationFrame(updateConnector);
        },
        onComplete: () => {
          const next = { x: 0, y: 0 };
          offsetsRef.current = { ...offsetsRef.current, [cardId]: next };
          setOffsets((current) => ({ ...current, [cardId]: next }));
          updateConnector();
          delete returnTweens.current[cardId];
        },
      });
      returnTweens.current[cardId] = tween;
    },
    [reducedMotion, updateConnector],
  );

  useEffect(() => {
    const root = rootRef.current;
    const surface = surfaceRef.current;
    if (!root || !surface) return;

    const onPointerDown = (event: PointerEvent) => {
      if (event.button > 0) return;
      const target = event.target as HTMLElement | null;
      if (target?.closest("a, button, input, textarea, select, label")) return;

      const cardEl = target?.closest<HTMLElement>("[data-int-card]");
      const cardId = cardEl?.dataset.intCard;
      if (!cardEl || !isCardId(cardId) || cardEl.getClientRects().length === 0) return;

      returnTweens.current[cardId]?.kill();
      delete returnTweens.current[cardId];

      const origin = offsetsRef.current[cardId];
      dragRef.current = {
        pointerId: event.pointerId,
        cardId,
        startX: event.clientX,
        startY: event.clientY,
        originX: origin.x,
        originY: origin.y,
        active: false,
      };
      bringToFront(cardId);
    };

    const onPointerMove = (event: PointerEvent) => {
      const drag = dragRef.current;
      if (!drag || event.pointerId !== drag.pointerId) return;

      const dx = event.clientX - drag.startX;
      const dy = event.clientY - drag.startY;

      if (!drag.active) {
        if (Math.hypot(dx, dy) < 8) return;
        drag.active = true;
        setDraggingId(drag.cardId);
        try {
          surface.setPointerCapture(event.pointerId);
        } catch {
          /* ignore */
        }
      }

      event.preventDefault();
      const next = constrain(drag.cardId, drag.originX + dx, drag.originY + dy);
      offsetsRef.current = { ...offsetsRef.current, [drag.cardId]: next };
      setOffsets((current) => ({ ...current, [drag.cardId]: next }));
      requestAnimationFrame(updateConnector);
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
        springBack(drag.cardId);
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
    const root = rootRef.current;
    if (!root) return;
    const stages = [...root.querySelectorAll<HTMLElement>("[data-int-stage]")];
    const observer = new ResizeObserver(() => updateConnector());
    stages.forEach((stage) => observer.observe(stage));
    window.addEventListener("resize", updateConnector);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateConnector);
    };
  }, [updateConnector]);

  useEffect(() => {
    if (draggingId) {
      document.body.style.cursor = "grabbing";
      document.body.style.userSelect = "none";
    } else {
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    }
    return () => {
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };
  }, [draggingId]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || reducedMotion) {
      updateConnector();
      return;
    }

    const { gsap } = getGsap();
    const ctx = gsap.context(() => {
      const message = [...root.querySelectorAll<HTMLElement>("[data-int-message]")];
      const tiles = [...root.querySelectorAll<HTMLElement>("[data-int-tile]")];
      const lines = [...root.querySelectorAll<SVGPathElement>("[data-int-line]")].filter(
        (path) => path.closest<HTMLElement>("[data-int-stage]")?.getClientRects().length,
      );

      gsap.set([...message, ...tiles], { autoAlpha: 0, "--entrance-y": "14px" });
      updateConnector();
      lines.forEach((path) => {
        path.dataset.drawing = "true";
        if (typeof path.getTotalLength !== "function") return;
        const length = path.getTotalLength();
        if (length <= 0) return;
        gsap.set(path, {
          strokeDasharray: length,
          strokeDashoffset: length,
          opacity: 0.3,
        });
      });

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        onUpdate: updateConnector,
      });
      tl.to(message, { autoAlpha: 1, "--entrance-y": "0px", duration: 0.45 })
        .to(tiles, { autoAlpha: 1, "--entrance-y": "0px", duration: 0.4, stagger: 0.08 }, "-=0.15")
        .add(() => {
          updateConnector();
          lines.forEach((path) => {
            if (typeof path.getTotalLength !== "function") return;
            const length = path.getTotalLength();
            if (length <= 0) return;
            gsap.set(path, {
              strokeDasharray: length,
              strokeDashoffset: length,
            });
          });
        })
        .to(lines, { strokeDashoffset: 0, opacity: 1, duration: 0.45, stagger: 0.06 }, "-=0.2")
        .add(() => {
          lines.forEach((path) => {
            delete path.dataset.drawing;
            path.style.strokeDasharray = "none";
            path.style.strokeDashoffset = "0";
          });
          updateConnector();
        });
    }, root);

    return () => ctx.revert();
  }, [reducedMotion, updateConnector]);

  const cardStyle = (id: CardId, placement: Placement): CSSProperties => {
    const y = "calc(var(--drag-y) + var(--entrance-y))";
    const transform =
      placement === "center"
        ? `translate3d(calc(-50% + var(--drag-x)), calc(-50% + ${y}), 0)`
        : placement === "x"
          ? `translate3d(calc(-50% + var(--drag-x)), ${y}, 0)`
          : `translate3d(var(--drag-x), ${y}, 0)`;

    return {
      zIndex: zIndexFor(id),
      "--drag-x": `${offsets[id].x}px`,
      "--drag-y": `${offsets[id].y}px`,
      "--entrance-y": "0px",
      transform,
    } as CSSProperties;
  };

  const cardClass = (id: CardId, className?: string) =>
    cn(
      "cursor-grab touch-none will-change-transform active:cursor-grabbing",
      draggingId === id && "cursor-grabbing",
      className,
    );

  return (
    <header
      ref={rootRef}
      className="relative overflow-visible pt-12 pb-10 sm:pt-16 sm:pb-12 lg:pb-14"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_65%_50%_at_85%_0%,var(--glow),transparent_60%)]" />
        <div className="absolute inset-0 bg-grid-fade [mask-image:linear-gradient(to_bottom,black_40%,transparent)]" />
        <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-background via-background/80 to-transparent sm:w-16" />
      </div>

      <Container className="relative">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-12 xl:gap-14">
          <div className="max-w-xl">
            <p className="text-xs font-semibold tracking-[0.18em] text-accent uppercase">
              {copy.eyebrow}
            </p>
            <h1 className="mt-4 font-heading text-[2.2rem] leading-[1.08] font-semibold tracking-tight text-balance sm:text-[3.1rem] lg:text-[3.4rem]">
              {copy.title}
            </h1>
            <p className="mt-5 max-w-lg text-base leading-7 text-muted sm:text-[1.05rem] sm:leading-8">
              {copy.description}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href={copy.primaryCta.href} size="lg">
                {copy.primaryCta.label}
                <ArrowDown className="size-4" />
              </Button>
              <Button href={copy.secondaryCta.href} variant="secondary" size="lg">
                {copy.secondaryCta.label}
                <ArrowRight className="size-4" />
              </Button>
            </div>
          </div>

          <div className="mx-auto w-full max-w-md lg:mx-0 lg:justify-self-end">
            <div data-int-stage className="relative lg:hidden">
              <ConnectorField />
              <div className="relative space-y-3">
                <div
                  data-int-card="message"
                  data-int-message
                  className={cardClass("message")}
                  style={cardStyle("message", "none")}
                >
                  <MessageCard text={copy.sampleMessage} />
                </div>
                {copy.tiles.map((tile) => (
                  <div
                    key={tile.id}
                    data-int-card={tile.id}
                    data-int-tile
                    className={cardClass(tile.id as TileId)}
                    style={cardStyle(tile.id as TileId, "none")}
                  >
                    <ReferenceTile {...tile} />
                  </div>
                ))}
              </div>
            </div>

            <div data-int-stage className="relative hidden min-h-[20rem] lg:block">
              <ConnectorField />
              <div
                data-int-card="shopify"
                data-int-tile
                className={cardClass("shopify", "absolute top-2 left-0 w-[10rem]")}
                style={cardStyle("shopify", "none")}
              >
                <ReferenceTile {...copy.tiles[0]} />
              </div>
              <div
                data-int-card="gmail"
                data-int-tile
                className={cardClass(
                  "gmail",
                  "absolute top-2 right-0 w-[11.5rem]",
                )}
                style={cardStyle("gmail", "none")}
              >
                <ReferenceTile {...copy.tiles[1]} />
              </div>
              <div
                data-int-card="message"
                data-int-message
                className={cardClass("message", "absolute top-1/2 left-1/2 w-[17.5rem]")}
                style={cardStyle("message", "center")}
              >
                <MessageCard text={copy.sampleMessage} />
              </div>
              <div
                data-int-card="notion"
                data-int-tile
                className={cardClass("notion", "absolute bottom-2 left-1/2 w-[11rem]")}
                style={cardStyle("notion", "x")}
              >
                <ReferenceTile {...copy.tiles[2]} />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </header>
  );
}

function ConnectorField() {
  return (
    <svg
      className="pointer-events-none absolute inset-0 z-[8] h-full w-full overflow-visible"
      viewBox="0 0 400 320"
      fill="none"
      aria-hidden
    >
      {TILE_IDS.map((id) => (
        <path
          key={id}
          data-int-line={id}
          d="M200 160 L200 160"
          stroke="var(--accent)"
          strokeWidth="1.5"
          fill="none"
        />
      ))}
    </svg>
  );
}

function MessageCard({ text }: { text: string }) {
  return (
    <div className="rounded-2xl border border-border bg-surface px-4 py-3.5 shadow-[var(--shadow-soft)]">
      <p className="text-[10px] font-semibold tracking-[0.14em] text-accent uppercase">
        Customer message
      </p>
      <p className="mt-2 font-heading text-sm font-semibold leading-snug sm:text-base">
        “{text}”
      </p>
    </div>
  );
}

function ReferenceTile({
  id,
  name,
  caption,
}: {
  id: string;
  name: string;
  caption: string;
}) {
  const Icon = integrationIconById[id];
  return (
    <div className="rounded-xl border border-border bg-surface px-3 py-2.5 shadow-[var(--shadow-soft)]">
      <div className="flex items-center gap-2">
        <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-accent-soft text-accent">
          {Icon ? <Icon className="size-3.5" aria-hidden /> : null}
        </span>
        <div className="min-w-0">
          <p className="text-sm font-semibold">{name}</p>
          <p className="whitespace-nowrap text-[11px] text-muted">{caption}</p>
        </div>
      </div>
    </div>
  );
}
