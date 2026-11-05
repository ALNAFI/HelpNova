"use client";

import { useEffect, useRef } from "react";
import { MessageSquare, UserRound, Users } from "lucide-react";
import { getGsap } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { cn } from "@/utils/cn";

const FRAGMENTS = [
  {
    id: "messages",
    label: "Messages",
    hint: "Thread replies",
    icon: MessageSquare,
    place: "justify-self-start self-start",
  },
  {
    id: "assignments",
    label: "Assignments",
    hint: "Team routing",
    icon: Users,
    place: "justify-self-end self-start",
  },
  {
    id: "details",
    label: "Customer details",
    hint: "Order & profile",
    icon: UserRound,
    place: "col-span-2 justify-self-center self-end",
  },
] as const;

export function AboutStoryIllustration({
  className,
}: {
  className?: string;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const root = rootRef.current;
    if (!root || reducedMotion) return;

    const { gsap } = getGsap();
    const fragments = root.querySelectorAll<HTMLElement>("[data-story-fragment]");
    const unified = root.querySelector<HTMLElement>("[data-story-unified]");
    const glow = root.querySelector<HTMLElement>("[data-story-glow]");
    if (!unified || fragments.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.set(fragments, { x: 0, y: 0, scale: 1, autoAlpha: 1, rotate: 0 });
      gsap.set(unified, { autoAlpha: 0, scale: 0.94, y: 12 });
      gsap.set(glow, { autoAlpha: 0.35, scale: 0.92 });

      const tl = gsap.timeline({
        repeat: -1,
        defaults: { ease: "power2.inOut" },
      });

      tl.to(glow, { autoAlpha: 0.55, scale: 1.04, duration: 0.9 }, 0.35)
        .to(
          fragments[0],
          { x: 36, y: 42, scale: 0.9, rotate: -2, duration: 0.95 },
          0.4,
        )
        .to(
          fragments[1],
          { x: -36, y: 42, scale: 0.9, rotate: 2, duration: 0.95 },
          0.48,
        )
        .to(
          fragments[2],
          { x: 0, y: -36, scale: 0.9, rotate: -1, duration: 0.95 },
          0.56,
        )
        .to(
          fragments,
          { autoAlpha: 0, scale: 0.78, duration: 0.4, stagger: 0.04 },
          1.25,
        )
        .to(
          unified,
          { autoAlpha: 1, scale: 1, y: 0, duration: 0.55, ease: "power3.out" },
          1.32,
        )
        .to(glow, { autoAlpha: 0.7, scale: 1.1, duration: 0.55 }, 1.32)
        .to({}, { duration: 1.6 })
        .to(
          unified,
          { autoAlpha: 0, scale: 0.96, y: 10, duration: 0.45, ease: "power2.in" },
          "+=0.05",
        )
        .to(glow, { autoAlpha: 0.35, scale: 0.92, duration: 0.45 }, "<")
        .set(fragments, { x: 0, y: 0, scale: 1, rotate: 0 })
        .to(fragments, {
          autoAlpha: 1,
          scale: 1,
          duration: 0.5,
          stagger: 0.06,
          ease: "power2.out",
        });
    }, root);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <div
      ref={rootRef}
      className={cn(
        "relative isolate overflow-hidden rounded-[1.35rem] border border-border bg-surface",
        "shadow-[var(--shadow-soft)]",
        className,
      )}
      aria-hidden
    >
      <div
        data-story-glow
        className="pointer-events-none absolute top-1/2 left-1/2 size-[68%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--accent)_28%,transparent)_0%,transparent_70%)] blur-2xl"
      />

      <div className="absolute inset-0 bg-[linear-gradient(160deg,color-mix(in_oklab,var(--accent-soft)_55%,transparent),transparent_42%,color-mix(in_oklab,var(--surface-muted)_70%,transparent))]" />

      <div className="relative min-h-[20rem] p-4 sm:min-h-[21.5rem] sm:p-5">
        {!reducedMotion ? (
          <div className="grid h-full min-h-[18rem] grid-cols-2 grid-rows-[auto_auto] gap-3 sm:min-h-[19.5rem] sm:gap-4">
            {FRAGMENTS.map((fragment) => {
              const Icon = fragment.icon;
              return (
                <div
                  key={fragment.id}
                  data-story-fragment={fragment.id}
                  className={cn(
                    "z-10 w-full max-w-[10.25rem] rounded-[0.95rem] border border-border/90 bg-surface/95 p-2.5 shadow-[var(--shadow-soft)] backdrop-blur-sm sm:max-w-[11rem] sm:p-3",
                    fragment.place,
                  )}
                >
                  <div className="flex items-start gap-2">
                    <span className="mt-0.5 inline-flex size-7 shrink-0 items-center justify-center rounded-lg border border-accent/25 bg-accent-soft/70 text-accent">
                      <Icon className="size-3.5" strokeWidth={2} />
                    </span>
                    <div className="min-w-0">
                      <p className="truncate text-[0.72rem] font-semibold tracking-tight text-foreground sm:text-[0.78rem]">
                        {fragment.label}
                      </p>
                      <p className="mt-0.5 truncate text-[0.65rem] text-muted">
                        {fragment.hint}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : null}

        <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center p-4 sm:p-5">
          <div
            data-story-unified
            className={cn(
              "w-full max-w-[17.5rem] rounded-[1.15rem] border border-accent/35 bg-surface/95 p-3.5 shadow-[0_0_0_1px_color-mix(in_oklab,var(--accent)_12%,transparent),var(--shadow-soft)] backdrop-blur-sm sm:p-4",
              !reducedMotion && "opacity-0",
            )}
          >
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-[0.65rem] font-semibold tracking-[0.14em] text-accent uppercase">
                  Unified view
                </p>
                <p className="mt-1 font-heading text-sm font-semibold tracking-tight text-foreground sm:text-[0.95rem]">
                  Conversation
                </p>
              </div>
              <span className="rounded-full border border-accent/30 bg-accent-soft/80 px-2 py-0.5 text-[0.62rem] font-semibold text-accent">
                Connected
              </span>
            </div>

            <ul className="mt-3 space-y-2">
              {FRAGMENTS.map((fragment) => {
                const Icon = fragment.icon;
                return (
                  <li
                    key={fragment.id}
                    className="flex items-center gap-2 rounded-xl border border-border/80 bg-surface-muted/40 px-2.5 py-2"
                  >
                    <span className="inline-flex size-6 shrink-0 items-center justify-center rounded-md bg-accent-soft/80 text-accent">
                      <Icon className="size-3" strokeWidth={2} />
                    </span>
                    <span className="truncate text-[0.72rem] font-medium text-foreground">
                      {fragment.label}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
