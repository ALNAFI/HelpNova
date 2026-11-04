"use client";

import { useEffect, useRef, useState } from "react";
import { Container } from "@/components/ui/container";
import { aboutPageCopy, aboutRoles } from "@/data/marketing/about";
import { getGsap } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { cn } from "@/utils/cn";

const accentStyles = {
  violet: "from-accent/30 via-accent-soft to-transparent",
  indigo: "from-indigo-400/25 via-accent-soft to-transparent",
  blue: "from-sky-400/25 via-accent-soft to-transparent",
  rose: "from-rose-400/25 via-accent-soft to-transparent",
} as const;

export function AboutRoles() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeId, setActiveId] = useState<(typeof aboutRoles)[number]["id"]>(
    aboutRoles[0].id,
  );
  const reducedMotion = usePrefersReducedMotion();
  const active =
    aboutRoles.find((role) => role.id === activeId) ?? aboutRoles[0];

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || reducedMotion) return;
    const { gsap } = getGsap();
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-role-card]",
        { y: 20, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.55,
          stagger: 0.07,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 80%" },
        },
      );
    }, el);
    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      ref={sectionRef}
      className="relative py-16 sm:py-20"
      aria-labelledby="about-roles-heading"
    >
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-[0.16em] text-accent uppercase">
              {aboutPageCopy.rolesEyebrow}
            </p>
            <h2
              id="about-roles-heading"
              className="mt-3 font-heading text-[1.85rem] font-semibold tracking-tight text-balance sm:text-[2.35rem]"
            >
              {aboutPageCopy.rolesTitle}
            </h2>
          </div>
          <span className="rounded-full border border-border bg-surface px-3 py-1.5 text-[11px] font-medium tracking-wide text-muted uppercase">
            {aboutPageCopy.rolesLabel}
          </span>
        </div>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-muted">
          {aboutPageCopy.rolesNote}
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {aboutRoles.map((role, index) => {
            const selected = role.id === activeId;
            return (
              <button
                key={role.id}
                type="button"
                data-role-card
                onClick={() => setActiveId(role.id)}
                aria-pressed={selected}
                className={cn(
                  "group overflow-hidden rounded-[1.45rem] border p-5 text-left transition-[border-color,transform,box-shadow] duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:p-6",
                  selected
                    ? "border-accent/40 bg-surface shadow-[var(--shadow-soft)]"
                    : "border-border bg-surface/85 hover:-translate-y-1 hover:border-accent/25",
                )}
              >
                <RolePortrait accent={role.accent} index={index} />
                <p className="mt-5 font-mono text-[11px] tracking-wide text-accent">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-2 font-heading text-lg font-semibold tracking-tight">
                  {role.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-muted opacity-90 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                  {role.description}
                </p>
              </button>
            );
          })}
        </div>

        <div className="mt-6 rounded-[1.35rem] border border-border bg-surface-muted/40 px-5 py-4 sm:px-6">
          <p className="text-sm font-medium text-foreground">{active.title}</p>
          <p className="mt-1 text-sm leading-6 text-muted">{active.description}</p>
        </div>
      </Container>
    </section>
  );
}

function RolePortrait({
  accent,
  index,
}: {
  accent: keyof typeof accentStyles;
  index: number;
}) {
  return (
    <div
      className={cn(
        "relative h-28 overflow-hidden rounded-[1.15rem] border border-border bg-gradient-to-br",
        accentStyles[accent],
      )}
      aria-hidden
    >
      <svg viewBox="0 0 200 120" className="absolute inset-0 size-full">
        <circle
          cx={60 + index * 8}
          cy="58"
          r="28"
          fill="var(--surface)"
          fillOpacity="0.55"
          stroke="var(--accent)"
          strokeOpacity="0.35"
        />
        <path
          d={`M${30 + index * 6} 98 C${50 + index * 6} 72 ${90 + index * 4} 72 ${110 + index * 4} 98`}
          fill="var(--accent)"
          fillOpacity="0.25"
        />
        <rect
          x="124"
          y="34"
          width="52"
          height="52"
          rx="14"
          fill="var(--accent)"
          fillOpacity="0.18"
          stroke="var(--accent)"
          strokeOpacity="0.35"
        />
        <circle cx="150" cy="60" r="8" fill="var(--accent)" fillOpacity="0.7" />
      </svg>
    </div>
  );
}
