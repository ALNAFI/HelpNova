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
import { ArrowDown, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { OpenChatbotButton } from "@/components/common/chatbot/open-chatbot-button";
import {
  chatbotFeatureHero,
  getChatbotPreset,
} from "@/data/marketing/chatbot-feature";
import { getGsap } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { cn } from "@/utils/cn";

type ChatbotHeroCardId = "question" | "answer";
type DragOffset = { x: number; y: number };
type ReturnTween = { kill: () => void };

const INITIAL_STACK: ChatbotHeroCardId[] = ["question", "answer"];
const INITIAL_OFFSETS: Record<ChatbotHeroCardId, DragOffset> = {
  question: { x: 0, y: 0 },
  answer: { x: 0, y: 0 },
};

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function isChatbotHeroCardId(
  value: string | undefined,
): value is ChatbotHeroCardId {
  return value === "question" || value === "answer";
}

/** Cubic curve from the question card’s lower edge to the answer card’s upper edge. */
function buildConnectorPath(
  stage: HTMLElement,
  question: HTMLElement,
  answer: HTMLElement,
) {
  const stageRect = stage.getBoundingClientRect();
  const questionRect = question.getBoundingClientRect();
  const answerRect = answer.getBoundingClientRect();

  const startX = questionRect.left + questionRect.width * 0.22 - stageRect.left;
  const startY = questionRect.bottom - stageRect.top - 1;
  const endX = answerRect.left + answerRect.width * 0.28 - stageRect.left;
  const endY = answerRect.top - stageRect.top + 1;

  const dx = endX - startX;
  const dy = endY - startY;
  const dist = Math.hypot(dx, dy) || 1;
  const nx = -dy / dist;
  const ny = dx / dist;
  const sign = nx < 0 ? -1 : 1;
  const bulge = Math.max(16, Math.min(120, dist * 0.28));
  const bowX = nx * sign * bulge;
  const bowY = ny * sign * bulge;

  const c1x = startX + dx * 0.33 + bowX;
  const c1y = startY + dy * 0.33 + bowY;
  const c2x = startX + dx * 0.66 + bowX * 0.55;
  const c2y = startY + dy * 0.66 + bowY * 0.55;

  return `M${startX.toFixed(1)} ${startY.toFixed(1)} C${c1x.toFixed(1)} ${c1y.toFixed(1)}, ${c2x.toFixed(1)} ${c2y.toFixed(1)}, ${endX.toFixed(1)} ${endY.toFixed(1)}`;
}

export function ChatbotFeatureHero({
  surfaceRef,
}: {
  surfaceRef: RefObject<HTMLElement | null>;
}) {
  const rootRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const lineRef = useRef<SVGPathElement>(null);
  const offsetsRef = useRef(INITIAL_OFFSETS);
  const returnTweens = useRef<Partial<Record<ChatbotHeroCardId, ReturnTween>>>({});
  const reducedMotion = usePrefersReducedMotion();
  const preset = getChatbotPreset(chatbotFeatureHero.heroPresetId);

  const [offsets, setOffsets] = useState(INITIAL_OFFSETS);
  const [stack, setStack] = useState<ChatbotHeroCardId[]>(INITIAL_STACK);
  const [draggingId, setDraggingId] = useState<ChatbotHeroCardId | null>(null);

  const updateConnector = useCallback(() => {
    const stage = stageRef.current;
    const svg = svgRef.current;
    const line = lineRef.current;
    const question = stage?.querySelector<HTMLElement>("[data-chatbot-hero-q]");
    const answer = stage?.querySelector<HTMLElement>("[data-chatbot-hero-a]");
    if (!stage || !svg || !line || !question || !answer) return;

    const width = Math.max(1, stage.clientWidth);
    const height = Math.max(1, stage.clientHeight);
    svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
    line.setAttribute("d", buildConnectorPath(stage, question, answer));

    if (line.dataset.drawing !== "true") {
      line.style.strokeDasharray = "none";
      line.style.strokeDashoffset = "0";
    }
  }, []);

  const dragRef = useRef<{
    pointerId: number;
    cardId: ChatbotHeroCardId;
    startX: number;
    startY: number;
    originX: number;
    originY: number;
    active: boolean;
  } | null>(null);

  const zIndexFor = (id: ChatbotHeroCardId) => 10 + stack.indexOf(id);

  const bringToFront = useCallback((id: ChatbotHeroCardId) => {
    setStack((current) => [...current.filter((item) => item !== id), id]);
  }, []);

  const constrain = useCallback(
    (cardId: ChatbotHeroCardId, x: number, y: number) => {
      const surface = surfaceRef.current;
      const stage = stageRef.current;
      const card = stage?.querySelector<HTMLElement>(
        `[data-chatbot-hero-card="${cardId}"]`,
      );
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
    (cardId: ChatbotHeroCardId) => {
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
    const stage = stageRef.current;
    const surface = surfaceRef.current;
    if (!stage || !surface) return;

    const onPointerDown = (event: PointerEvent) => {
      if (event.button > 0) return;
      const target = event.target as HTMLElement | null;
      if (target?.closest("a, button, input, textarea, select, label")) return;

      const cardEl = target?.closest<HTMLElement>("[data-chatbot-hero-card]");
      const cardId = cardEl?.dataset.chatbotHeroCard;
      if (!cardEl || !isChatbotHeroCardId(cardId)) return;

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
      const question = root.querySelector<HTMLElement>("[data-chatbot-hero-q]");
      const answer = root.querySelector<HTMLElement>("[data-chatbot-hero-a]");
      const line = lineRef.current;
      const panels = [question, answer].filter(Boolean);

      gsap.set(panels, { autoAlpha: 0, "--entrance-y": "12px" });
      updateConnector();
      if (line && typeof line.getTotalLength === "function") {
        line.dataset.drawing = "true";
        const length = line.getTotalLength();
        gsap.set(line, {
          strokeDasharray: length,
          strokeDashoffset: length,
          opacity: 0.35,
        });
      }

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        onUpdate: updateConnector,
      });
      tl.to(question, { autoAlpha: 1, "--entrance-y": "0px", duration: 0.4 })
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
        .to(line, { strokeDashoffset: 0, opacity: 1, duration: 0.3 }, "-=0.1")
        .to(answer, { autoAlpha: 1, "--entrance-y": "0px", duration: 0.4 }, "-=0.12")
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

  const cardStyle = (id: ChatbotHeroCardId): CSSProperties =>
    ({
      zIndex: zIndexFor(id),
      "--drag-x": `${offsets[id].x}px`,
      "--drag-y": `${offsets[id].y}px`,
      "--entrance-y": "0px",
      transform:
        "translate3d(var(--drag-x), calc(var(--drag-y) + var(--entrance-y)), 0)",
    }) as CSSProperties;

  return (
    <header
      ref={rootRef}
      className="relative overflow-visible pt-12 pb-14 sm:pt-16 sm:pb-16 lg:pb-20"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_65%_50%_at_70%_0%,var(--glow),transparent_60%)]" />
        <div className="absolute inset-0 bg-grid-fade [mask-image:linear-gradient(to_bottom,black_40%,transparent)]" />
      </div>

      <Container className="relative">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <div className="max-w-xl">
            <p className="text-xs font-semibold tracking-[0.18em] text-accent uppercase">
              {chatbotFeatureHero.eyebrow}
            </p>
            <h1 className="mt-4 font-heading text-[2.2rem] leading-[1.08] font-semibold tracking-tight text-balance sm:text-[3.1rem] lg:text-[3.4rem]">
              {chatbotFeatureHero.title}
            </h1>
            <p className="mt-5 max-w-lg text-base leading-7 text-muted sm:text-[1.05rem] sm:leading-8">
              {chatbotFeatureHero.description}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <OpenChatbotButton aria-label="Try the Chatbot">
                {chatbotFeatureHero.primaryCtaLabel}
                <MessageCircle className="size-4" />
              </OpenChatbotButton>
              <Button
                href={chatbotFeatureHero.secondaryCta.href}
                variant="secondary"
                size="lg"
              >
                {chatbotFeatureHero.secondaryCta.label}
                <ArrowDown className="size-4" />
              </Button>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-md">
            <p className="mb-3 text-[10px] font-semibold tracking-[0.14em] text-muted uppercase">
              {chatbotFeatureHero.sampleCaption}
            </p>
            <div ref={stageRef} className="relative space-y-3 sm:min-h-[14rem]">
              <svg
                ref={svgRef}
                className="pointer-events-none absolute inset-0 z-[8] h-full w-full overflow-visible"
                viewBox="0 0 360 220"
                fill="none"
                aria-hidden
              >
                <path
                  ref={lineRef}
                  data-chatbot-hero-line
                  d="M20 8 C20 48, 44 56, 44 88"
                  stroke="var(--accent)"
                  strokeWidth="1.5"
                  fill="none"
                />
              </svg>

              <div
                data-chatbot-hero-card="question"
                data-chatbot-hero-q
                className={cn(
                  "relative cursor-grab touch-none rounded-2xl rounded-bl-md border border-border bg-surface p-4 shadow-[var(--shadow-soft)] will-change-transform active:cursor-grabbing sm:max-w-[90%]",
                  draggingId === "question" && "cursor-grabbing",
                )}
                style={cardStyle("question")}
              >
                <p className="text-[10px] font-semibold tracking-[0.14em] text-muted uppercase">
                  Question
                </p>
                <p className="mt-2 font-heading text-lg leading-snug font-semibold text-pretty sm:text-xl">
                  {preset.question}
                </p>
              </div>

              <div
                data-chatbot-hero-card="answer"
                data-chatbot-hero-a
                className={cn(
                  "relative cursor-grab touch-none rounded-2xl rounded-tl-md border border-accent/25 bg-accent/10 p-4 will-change-transform active:cursor-grabbing sm:ml-8 sm:max-w-[92%]",
                  draggingId === "answer" && "cursor-grabbing",
                )}
                style={cardStyle("answer")}
              >
                <p className="text-[10px] font-semibold tracking-[0.14em] text-accent uppercase">
                  HelpNova · Answer preview
                </p>
                <p className="mt-2 text-sm leading-relaxed text-pretty">
                  {preset.answer}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </header>
  );
}
