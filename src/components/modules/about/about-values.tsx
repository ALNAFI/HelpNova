"use client";

import {
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Flip } from "gsap/Flip";
import { Container } from "@/components/ui/container";
import { aboutPageCopy, aboutValues } from "@/data/marketing/about";
import { getGsap } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { cn } from "@/utils/cn";

type ValueId = (typeof aboutValues)[number]["id"];
type ValueItem = (typeof aboutValues)[number];
type FlipState = ReturnType<typeof Flip.getState>;

const CYCLE_MS = 15_000;
const SEGMENT_COUNT = aboutValues.length;
const PANEL_EASE = "sine.inOut";
const PANEL_OUT_MS = 0.3;
const PANEL_IN_MS = 0.34;
const PANEL_SHIFT = 8;
const STACK_FLIP_MS = 0.72;
const STACK_FLIP_EASE = "back.out(0.85)";

function indexFromProgress(progress: number) {
  if (progress >= 1) return 0;
  return Math.min(
    SEGMENT_COUNT - 1,
    Math.floor(progress * SEGMENT_COUNT),
  );
}

function progressFromIndex(index: number) {
  return index / SEGMENT_COUNT;
}

/** Active first; remaining keep canonical Clarity → Ownership → Care order. */
function stackForActive(activeId: ValueId): ValueItem[] {
  const active =
    aboutValues.find((value) => value.id === activeId) ?? aboutValues[0];
  const rest = aboutValues.filter((value) => value.id !== active.id);
  return [active, ...rest];
}

export function AboutValues() {
  const sectionRef = useRef<HTMLElement>(null);
  const tabListRef = useRef<HTMLDivElement>(null);
  const panelContentRef = useRef<HTMLDivElement>(null);
  const labelId = useId();
  const [activeId, setActiveId] = useState<ValueId>(aboutValues[0].id);
  const [renderedId, setRenderedId] = useState<ValueId>(aboutValues[0].id);
  const [progress, setProgress] = useState(0);
  const reducedMotion = usePrefersReducedMotion();

  const stackedValues = useMemo(() => stackForActive(activeId), [activeId]);
  const rendered =
    aboutValues.find((value) => value.id === renderedId) ?? aboutValues[0];

  const progressRef = useRef(0);
  const pausedRef = useRef(false);
  const rafRef = useRef<number | null>(null);
  const lastTsRef = useRef<number | null>(null);
  const panelAnimGen = useRef(0);
  const renderedIdRef = useRef<ValueId>(aboutValues[0].id);
  const activeIdRef = useRef<ValueId>(aboutValues[0].id);
  const reducedMotionRef = useRef(reducedMotion);
  const flipStateRef = useRef<FlipState | null>(null);
  const stackFlipTlRef = useRef<ReturnType<typeof Flip.from> | null>(null);

  useEffect(() => {
    activeIdRef.current = activeId;
  }, [activeId]);

  useEffect(() => {
    reducedMotionRef.current = reducedMotion;
  }, [reducedMotion]);

  const captureStackFlipState = useCallback(() => {
    const tabs = tabListRef.current?.querySelectorAll("[data-value-tab]");
    if (!tabs?.length || reducedMotionRef.current) {
      flipStateRef.current = null;
      return;
    }
    const { Flip: FlipPlugin } = getGsap();
    flipStateRef.current = FlipPlugin.getState(tabs);
  }, []);

  const syncFromProgress = useCallback(
    (nextProgress: number) => {
      const wrapped =
        nextProgress >= 1 ? nextProgress % 1 : Math.max(0, nextProgress);
      progressRef.current = wrapped;
      setProgress(wrapped * 100);
      const nextId = aboutValues[indexFromProgress(wrapped)].id;
      if (nextId === activeIdRef.current) return;
      captureStackFlipState();
      activeIdRef.current = nextId;
      setActiveId(nextId);
    },
    [captureStackFlipState],
  );

  const selectValue = useCallback(
    (id: ValueId) => {
      const index = aboutValues.findIndex((value) => value.id === id);
      if (index < 0) return;
      syncFromProgress(progressFromIndex(index));
    },
    [syncFromProgress],
  );

  useLayoutEffect(() => {
    const state = flipStateRef.current;
    flipStateRef.current = null;
    if (!state || reducedMotion) return;

    const tabs = tabListRef.current?.querySelectorAll("[data-value-tab]");
    if (!tabs?.length) return;

    const { gsap, Flip } = getGsap();
    stackFlipTlRef.current?.kill();
    gsap.killTweensOf(tabs);

    stackFlipTlRef.current = Flip.from(state, {
      targets: tabs,
      duration: STACK_FLIP_MS,
      ease: STACK_FLIP_EASE,
      stagger: 0.035,
      nested: true,
      prune: true,
      onComplete: () => {
        stackFlipTlRef.current = null;
      },
    });
  }, [activeId, stackedValues, reducedMotion]);

  useEffect(() => {
    return () => {
      stackFlipTlRef.current?.kill();
      stackFlipTlRef.current = null;
    };
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || reducedMotion) return;
    const { gsap } = getGsap();
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-values-reveal]",
        { y: 18, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.6,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 80%" },
        },
      );
    }, el);
    return () => ctx.revert();
  }, [reducedMotion]);

  useEffect(() => {
    if (reducedMotion) return;

    const tick = (timestamp: number) => {
      if (lastTsRef.current == null) {
        lastTsRef.current = timestamp;
      }
      const delta = timestamp - lastTsRef.current;
      lastTsRef.current = timestamp;

      if (!pausedRef.current) {
        syncFromProgress(progressRef.current + delta / CYCLE_MS);
      }

      rafRef.current = window.requestAnimationFrame(tick);
    };

    rafRef.current = window.requestAnimationFrame(tick);

    return () => {
      if (rafRef.current != null) {
        window.cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      lastTsRef.current = null;
    };
  }, [reducedMotion, syncFromProgress]);

  useEffect(() => {
    if (activeId === renderedIdRef.current) return;

    const node = panelContentRef.current;
    if (!node || reducedMotion) {
      renderedIdRef.current = activeId;
      setRenderedId(activeId);
      return;
    }

    const { gsap } = getGsap();
    const gen = ++panelAnimGen.current;
    gsap.killTweensOf(node);

    const tl = gsap.timeline({ defaults: { ease: PANEL_EASE } });

    tl.to(node, {
      autoAlpha: 0,
      y: -PANEL_SHIFT,
      duration: PANEL_OUT_MS,
    })
      .add(() => {
        if (gen !== panelAnimGen.current) return;
        renderedIdRef.current = activeId;
        setRenderedId(activeId);
      })
      .set(node, { y: PANEL_SHIFT })
      .to(node, {
        autoAlpha: 1,
        y: 0,
        duration: PANEL_IN_MS,
      });

    return () => {
      tl.kill();
      gsap.killTweensOf(node);
    };
  }, [activeId, reducedMotion]);

  const pauseAutoplay = () => {
    pausedRef.current = true;
  };

  const resumeAutoplay = () => {
    pausedRef.current = false;
    lastTsRef.current = null;
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-16 sm:py-20"
      aria-labelledby="about-values-heading"
    >
      <Container>
        <div className="max-w-2xl" data-values-reveal>
          <p className="text-xs font-semibold tracking-[0.16em] text-accent uppercase">
            {aboutPageCopy.valuesEyebrow}
          </p>
          <h2
            id="about-values-heading"
            className="mt-3 font-heading text-[1.85rem] font-semibold tracking-tight text-balance sm:text-[2.35rem]"
          >
            {aboutPageCopy.valuesTitle}
          </h2>
        </div>

        <div
          data-values-reveal
          className="mt-10 grid gap-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-10"
          onMouseEnter={pauseAutoplay}
          onMouseLeave={resumeAutoplay}
        >
          <div
            ref={tabListRef}
            role="tablist"
            aria-labelledby={labelId}
            className="relative space-y-3"
          >
            <span id={labelId} className="sr-only">
              Our principles
            </span>
            {stackedValues.map((value) => {
              const selected = value.id === activeId;
              return (
                <button
                  key={value.id}
                  type="button"
                  role="tab"
                  data-value-tab={value.id}
                  aria-selected={selected}
                  onClick={() => selectValue(value.id)}
                  className={cn(
                    "group w-full rounded-[1.35rem] border px-5 py-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:px-6 sm:py-5",
                    "transition-[border-color,background-color,box-shadow,color] duration-[600ms] ease-in-out",
                    selected
                      ? "border-accent/40 bg-accent-soft/50 shadow-[var(--shadow-soft)]"
                      : "border-border bg-surface shadow-none hover:border-accent/25",
                  )}
                >
                  <div className="flex items-baseline justify-between gap-4">
                    <span className="font-mono text-[11px] tracking-wide text-accent">
                      {value.number}
                    </span>
                    <span
                      className={cn(
                        "h-1 flex-1 rounded-full transition-colors duration-[600ms] ease-in-out",
                        selected ? "bg-accent/50" : "bg-border",
                      )}
                      aria-hidden
                    />
                  </div>
                  <p
                    className={cn(
                      "mt-3 font-heading text-3xl font-semibold tracking-tight transition-colors duration-[600ms] ease-in-out sm:text-4xl",
                      selected ? "text-foreground" : "text-muted",
                    )}
                  >
                    {value.title}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-muted">
                    {value.description}
                  </p>
                </button>
              );
            })}
          </div>

          <div className="overflow-hidden rounded-[1.75rem] border border-border bg-surface p-5 shadow-[var(--shadow-soft)] sm:p-7">
            <div
              className="mb-5 h-1 overflow-hidden rounded-full bg-border"
              aria-hidden
            >
              <div
                className="h-full rounded-full bg-accent"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div ref={panelContentRef} className="will-change-transform">
              <ValueArtwork valueId={rendered.id} />
              <h3 className="mt-6 font-heading text-2xl font-semibold tracking-tight">
                {rendered.title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-muted sm:text-[0.98rem]">
                {rendered.detail}
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function ValueArtwork({ valueId }: { valueId: string }) {
  if (valueId === "ownership") {
    return (
      <svg viewBox="0 0 420 220" className="w-full rounded-2xl bg-surface-muted/40" aria-hidden>
        <path d="M60 110 H160" stroke="var(--accent)" strokeWidth="2" />
        <path d="M160 110 H260" stroke="var(--accent)" strokeWidth="2" strokeOpacity="0.55" />
        <path d="M260 110 H360" stroke="var(--accent)" strokeWidth="2" strokeOpacity="0.3" />
        <circle cx="60" cy="110" r="14" fill="var(--accent)" />
        <circle cx="160" cy="110" r="14" fill="var(--accent-soft)" stroke="var(--accent)" />
        <circle cx="260" cy="110" r="14" fill="var(--surface)" stroke="var(--accent)" />
        <circle cx="360" cy="110" r="14" fill="var(--surface)" stroke="var(--border-strong)" />
        <path d="M250 70 H300 V95 H250 Z" fill="var(--accent-soft)" stroke="var(--accent)" />
      </svg>
    );
  }

  if (valueId === "care") {
    return (
      <svg viewBox="0 0 420 220" className="w-full rounded-2xl bg-surface-muted/40" aria-hidden>
        <circle cx="210" cy="110" r="54" fill="var(--accent-soft)" />
        <circle cx="210" cy="110" r="28" fill="var(--accent)" fillOpacity="0.85" />
        <circle cx="140" cy="78" r="16" fill="var(--surface)" stroke="var(--accent)" />
        <circle cx="286" cy="78" r="16" fill="var(--surface)" stroke="var(--accent)" />
        <circle cx="140" cy="148" r="16" fill="var(--surface)" stroke="var(--accent)" />
        <circle cx="286" cy="148" r="16" fill="var(--surface)" stroke="var(--accent)" />
        <path
          d="M154 84 L188 100 M266 84 L232 100 M154 142 L188 124 M266 142 L232 124"
          stroke="var(--accent)"
          strokeOpacity="0.45"
          strokeWidth="1.5"
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 420 220" className="w-full rounded-2xl bg-surface-muted/40" aria-hidden>
      <rect x="70" y="48" width="280" height="36" rx="10" fill="var(--accent-soft)" />
      <rect x="90" y="98" width="240" height="28" rx="8" fill="var(--accent)" fillOpacity="0.55" />
      <rect x="110" y="140" width="200" height="24" rx="8" fill="var(--surface)" stroke="var(--accent)" strokeOpacity="0.4" />
      <path d="M70 48 V164 M350 48 V164" stroke="var(--accent)" strokeOpacity="0.2" strokeDasharray="4 6" />
    </svg>
  );
}
