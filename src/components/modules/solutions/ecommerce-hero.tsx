"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type MouseEvent,
  type RefObject,
} from "react";
import { ArrowDown, ArrowRight } from "lucide-react";
import {
  ParcelLabel,
  type ParcelPanelId,
} from "@/components/modules/solutions/parcel-label";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { useLenis } from "@/context/lenis-context";
import { ecommerceHero } from "@/data/marketing/ecommerce";
import { getGsap } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

type DragOffset = { x: number; y: number };

const INITIAL_STACK: ParcelPanelId[] = ["label", "message", "stamp"];
const INITIAL_OFFSETS: Record<ParcelPanelId, DragOffset> = {
  label: { x: 0, y: 0 },
  message: { x: 0, y: 0 },
  stamp: { x: 0, y: 0 },
};

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function isParcelPanelId(value: string | undefined): value is ParcelPanelId {
  return value === "label" || value === "message" || value === "stamp";
}

export function EcommerceHero({
  surfaceRef,
}: {
  surfaceRef: RefObject<HTMLElement | null>;
}) {
  const ref = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();
  const { scrollToElement } = useLenis();
  const offsetsRef = useRef(INITIAL_OFFSETS);

  const [offsets, setOffsets] = useState(INITIAL_OFFSETS);
  const [stack, setStack] = useState<ParcelPanelId[]>(INITIAL_STACK);
  const [draggingId, setDraggingId] = useState<ParcelPanelId | null>(null);

  const dragRef = useRef<{
    pointerId: number;
    panelId: ParcelPanelId;
    startX: number;
    startY: number;
    originX: number;
    originY: number;
    active: boolean;
  } | null>(null);

  useEffect(() => {
    offsetsRef.current = offsets;
  }, [offsets]);

  const bringToFront = useCallback((id: ParcelPanelId) => {
    setStack((current) => [...current.filter((item) => item !== id), id]);
  }, []);

  const constrain = useCallback(
    (panelId: ParcelPanelId, x: number, y: number) => {
      const surface = surfaceRef.current;
      const stage = stageRef.current;
      const panel = stage?.querySelector<HTMLElement>(
        `[data-parcel-panel="${panelId}"]`,
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
    const stage = stageRef.current;
    const surface = surfaceRef.current;
    if (!stage || !surface) return;

    const onPointerDown = (event: PointerEvent) => {
      if (event.button > 0) return;
      const target = event.target as HTMLElement | null;
      if (target?.closest("a, button, input, textarea, select, label")) return;

      const panelEl = target?.closest<HTMLElement>("[data-parcel-panel]");
      const panelId = panelEl?.dataset.parcelPanel;
      if (!panelEl || !isParcelPanelId(panelId)) return;

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
      if (surface) surface.dataset.ecommerceDragging = "true";
      document.body.style.cursor = "grabbing";
      document.body.style.userSelect = "none";
    } else {
      if (surface) delete surface.dataset.ecommerceDragging;
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    }
    return () => {
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };
  }, [draggingId, surfaceRef]);

  useEffect(() => {
    const root = ref.current;
    if (!root || reducedMotion) return;
    const { gsap } = getGsap();
    const ctx = gsap.context(() => {
      const label = root.querySelector<HTMLElement>("[data-parcel-label]");
      const message = root.querySelector<HTMLElement>("[data-parcel-message]");
      const stamp = root.querySelector<HTMLElement>("[data-parcel-stamp]");
      const scan = root.querySelector<HTMLElement>("[data-parcel-scan]");

      gsap.set([label, message, stamp].filter(Boolean), { autoAlpha: 0 });
      if (label) gsap.set(label, { "--entrance-y": "18px" });
      if (message) {
        gsap.set(message, {
          "--entrance-y": "16px",
          "--entrance-x": "12px",
          "--float-y": "0px",
        });
      }
      if (stamp) {
        gsap.set(stamp, {
          "--stamp-scale": "1.12",
          "--stamp-rotate": "-12deg",
        });
      }
      if (scan) gsap.set(scan, { autoAlpha: 0, x: "-100%" });

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.to(label, { autoAlpha: 1, "--entrance-y": "0px", duration: 0.55 })
        .to(
          message,
          {
            autoAlpha: 1,
            "--entrance-y": "0px",
            "--entrance-x": "0px",
            duration: 0.45,
          },
          "-=0.18",
        )
        .to(
          stamp,
          {
            autoAlpha: 1,
            "--stamp-scale": "0.97",
            "--stamp-rotate": "-8deg",
            duration: 0.34,
            ease: "power2.out",
          },
          "-=0.06",
        )
        .to(stamp, { "--stamp-scale": "1", duration: 0.2, ease: "power2.out" });

      if (scan) {
        tl.to(
          scan,
          {
            autoAlpha: 0.9,
            x: "280%",
            duration: 1.35,
            ease: "sine.inOut",
          },
          "-=0.15",
        ).to(scan, { autoAlpha: 0, duration: 0.25 }, "-=0.2");
      }

      if (message) {
        tl.to(
          message,
          {
            "--float-y": "6px",
            duration: 4.2,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
          },
          "+=0.2",
        );
      }
    }, root);
    return () => ctx.revert();
  }, [reducedMotion]);

  const scrollToWalkthrough = (event: MouseEvent<HTMLElement>) => {
    const href = ecommerceHero.secondaryCta.href;
    if (!href.startsWith("#")) return;
    event.preventDefault();
    scrollToElement(href.replace("#", ""), { immediate: reducedMotion });
  };

  return (
    <header
      ref={ref}
      className="relative z-30 overflow-visible pt-12 pb-8 sm:pt-16 sm:pb-10 lg:pb-12"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_80%_0%,var(--glow),transparent_60%)]" />
        <div className="absolute top-24 left-[8%] hidden h-40 w-px bg-gradient-to-b from-accent/50 via-border to-transparent lg:block" />
        <div className="absolute inset-0 bg-grid-fade [mask-image:linear-gradient(to_bottom,black_35%,transparent)]" />
      </div>

      <Container className="relative">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-10">
          <div className="relative z-10 max-w-xl">
            <p className="text-xs font-semibold tracking-[0.18em] text-accent uppercase">
              {ecommerceHero.eyebrow}
            </p>
            <h1 className="mt-4 font-heading text-[2.35rem] leading-[1.05] font-semibold tracking-tight text-balance sm:text-[3.25rem] lg:text-[3.75rem]">
              {ecommerceHero.title}
            </h1>
            <p className="mt-5 max-w-lg text-base leading-7 text-muted sm:text-[1.05rem] sm:leading-8">
              {ecommerceHero.description}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button href={ecommerceHero.primaryCta.href} size="lg">
                {ecommerceHero.primaryCta.label}
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </Button>
              <Button
                href={ecommerceHero.secondaryCta.href}
                variant="secondary"
                size="lg"
                onClick={scrollToWalkthrough}
              >
                {ecommerceHero.secondaryCta.label}
                <ArrowDown className="size-4" />
              </Button>
            </div>
          </div>

          <div ref={stageRef} className="relative z-40 overflow-visible">
            <div
              className="pointer-events-none absolute top-8 -left-6 hidden h-[70%] w-px bg-gradient-to-b from-transparent via-accent/45 to-transparent lg:block"
              aria-hidden
            />
            <ParcelLabel
              orderReference={ecommerceHero.orderReference}
              trackingCode={ecommerceHero.trackingCode}
              messagePreview="Hi, my tracking hasn’t changed since Monday…"
              dragOffsets={offsets}
              dragStack={stack}
              draggingId={draggingId}
            />
          </div>
        </div>
      </Container>
    </header>
  );
}
