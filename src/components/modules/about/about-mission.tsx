"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { Container } from "@/components/ui/container";
import { RubberSegment } from "@/components/ui/rubber-segment";
import {
  AboutMissionVisual,
  type MissionConceptId,
} from "@/components/modules/about/about-mission-visuals";
import {
  aboutMissionConcepts,
  aboutPageCopy,
} from "@/data/marketing/about";
import { getGsap } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

function isMissionConceptId(value: string): value is MissionConceptId {
  return aboutMissionConcepts.some((concept) => concept.id === value);
}

export function AboutMission() {
  const sectionRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const baseId = useId();
  const [activeId, setActiveId] = useState<MissionConceptId>(
    aboutMissionConcepts[0].id,
  );
  const reducedMotion = usePrefersReducedMotion();
  const active =
    aboutMissionConcepts.find((item) => item.id === activeId) ??
    aboutMissionConcepts[0];

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || reducedMotion) return;
    const { gsap } = getGsap();
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-mission-reveal]",
        { y: 18, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.6,
          stagger: 0.07,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 80%" },
        },
      );
    }, el);
    return () => ctx.revert();
  }, [reducedMotion]);

  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;
    if (reducedMotion) {
      panel.style.opacity = "1";
      panel.style.transform = "none";
      return;
    }

    const { gsap } = getGsap();
    const ctx = gsap.context(() => {
      gsap.fromTo(
        panel,
        { autoAlpha: 0, y: 12 },
        { autoAlpha: 1, y: 0, duration: 0.35, ease: "power2.out" },
      );
    }, panel);
    return () => ctx.revert();
  }, [activeId, reducedMotion]);

  const onSegmentChange = useCallback((value: string) => {
    if (!isMissionConceptId(value)) return;
    setActiveId(value);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-16 sm:py-20"
      aria-labelledby="about-mission-heading"
    >
      <Container>
        <div className="max-w-2xl" data-mission-reveal>
          <p className="text-xs font-semibold tracking-[0.16em] text-accent uppercase">
            {aboutPageCopy.missionEyebrow}
          </p>
          <h2
            id="about-mission-heading"
            className="mt-3 font-heading text-[1.85rem] font-semibold tracking-tight text-balance sm:text-[2.35rem]"
          >
            {aboutPageCopy.missionTitle}
          </h2>
          <p className="mt-4 text-base leading-7 text-muted">
            {aboutPageCopy.missionStatement}
          </p>
        </div>

        <div
          data-mission-reveal
          className="mt-10 overflow-hidden rounded-[1.75rem] border border-border bg-surface shadow-[var(--shadow-soft)]"
        >
          <div className="border-b border-border">
            <div className="min-w-0 overflow-x-auto overscroll-x-contain p-3 [-ms-overflow-style:none] [scrollbar-width:none] sm:p-3.5 [&::-webkit-scrollbar]:hidden">
              <RubberSegment
                items={aboutMissionConcepts.map((concept) => ({
                  value: concept.id,
                  label: concept.label,
                }))}
                value={activeId}
                onChange={onSegmentChange}
                trackColor="var(--surface-muted)"
                thumbColor="var(--accent)"
                textColor="var(--muted)"
                activeTextColor="var(--accent-foreground)"
                size="lg"
                radius={12}
                inset={3}
                equalSlots
                stretch={100}
                squash={3}
                speed={1}
                glide={75}
                draggable
                className="w-full min-w-[28rem] sm:min-w-0"
                aria-label="Mission topics"
              />
            </div>
          </div>

          <div
            ref={panelRef}
            role="tabpanel"
            id={`${baseId}-panel-${active.id}`}
            aria-label={active.label}
            className="grid min-h-0 items-center gap-5 p-4 sm:gap-6 sm:p-6 lg:min-h-[22.5rem] lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-8 lg:p-7"
          >
            <AboutMissionVisual
              activeId={active.id}
              className="w-full lg:min-h-[18.5rem]"
            />

            <div className="flex min-w-0 flex-col justify-center lg:py-2">
              <p className="text-[11px] font-semibold tracking-[0.16em] text-accent uppercase">
                {active.label}
              </p>
              <h3 className="mt-2 font-heading text-xl font-semibold tracking-tight text-balance sm:text-2xl">
                {active.title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-muted sm:text-[0.98rem]">
                {active.description}
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
