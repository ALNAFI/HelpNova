"use client";

import { useEffect, useRef, useState } from "react";
import { Container } from "@/components/ui/container";
import { aboutPageCopy, aboutStoryChapters } from "@/data/marketing/about";
import { getGsap } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { cn } from "@/utils/cn";

export function AboutStory() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeId, setActiveId] = useState<(typeof aboutStoryChapters)[number]["id"]>(
    aboutStoryChapters[0].id,
  );
  const reducedMotion = usePrefersReducedMotion();
  const activeIndex = aboutStoryChapters.findIndex((c) => c.id === activeId);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const chapters = Array.from(
      section.querySelectorAll<HTMLElement>("[data-story-chapter]"),
    );
    if (chapters.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        const id = visible[0]?.target.getAttribute("data-story-chapter");
        if (
          id === "challenge" ||
          id === "idea" ||
          id === "exploration"
        ) {
          setActiveId(id);
        }
      },
      { rootMargin: "-35% 0px -45% 0px", threshold: [0.2, 0.5, 0.8] },
    );

    chapters.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || reducedMotion) return;
    const { gsap } = getGsap();
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-story-heading]",
        { y: 18, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.65,
          ease: "power3.out",
          scrollTrigger: { trigger: section, start: "top 78%" },
        },
      );
    }, section);
    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      ref={sectionRef}
      className="relative z-10 py-16 sm:py-20"
      aria-labelledby="about-story-heading"
    >
      <Container>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-14">
          <div className="lg:sticky lg:top-[calc(var(--header-height)+1.5rem)] lg:self-start">
            <p
              data-story-heading
              className="text-xs font-semibold tracking-[0.16em] text-accent uppercase"
            >
              Origin
            </p>
            <h2
              id="about-story-heading"
              data-story-heading
              className="mt-3 font-heading text-[1.85rem] font-semibold tracking-tight text-balance sm:text-[2.35rem]"
            >
              {aboutPageCopy.storyTitle}
            </h2>
            <p
              data-story-heading
              className="mt-4 text-base leading-7 text-muted"
            >
              {aboutPageCopy.storySupport}
            </p>

            <div className="mt-8 hidden lg:block" aria-hidden>
              <StoryArtwork index={activeIndex} />
            </div>
          </div>

          <div className="relative">
            <div
              className="absolute top-2 bottom-2 left-[0.7rem] w-px bg-border sm:left-[0.85rem]"
              aria-hidden
            />
            <ol className="space-y-8 sm:space-y-10">
              {aboutStoryChapters.map((chapter, index) => {
                const active = chapter.id === activeId;
                return (
                  <li
                    key={chapter.id}
                    data-story-chapter={chapter.id}
                    className="relative scroll-mt-[calc(var(--header-height)+2rem)] pl-10 sm:pl-12"
                  >
                    <span
                      className={cn(
                        "absolute top-1.5 left-0 inline-flex size-6 items-center justify-center rounded-full border text-[10px] font-semibold transition-colors",
                        active
                          ? "border-accent bg-accent text-accent-foreground"
                          : "border-border bg-surface text-muted",
                      )}
                      aria-hidden
                    >
                      {chapter.number}
                    </span>
                    <article
                      className={cn(
                        "rounded-[1.4rem] border p-5 transition-[border-color,background-color,box-shadow] duration-300 sm:p-6",
                        active
                          ? "border-accent/35 bg-accent-soft/35 shadow-[var(--shadow-soft)]"
                          : "border-border bg-surface/70",
                      )}
                    >
                      <p className="text-[11px] font-semibold tracking-[0.16em] text-accent uppercase">
                        Chapter {chapter.number}
                      </p>
                      <h3 className="mt-2 font-heading text-xl font-semibold tracking-tight sm:text-2xl">
                        {chapter.title}
                      </h3>
                      <p className="mt-3 text-[0.98rem] leading-7 text-muted">
                        {chapter.body}
                      </p>
                      <div className="mt-5 lg:hidden" aria-hidden>
                        <StoryArtwork index={index} compact />
                      </div>
                    </article>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </Container>
    </section>
  );
}

function StoryArtwork({
  index,
  compact = false,
}: {
  index: number;
  compact?: boolean;
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-[1.35rem] border border-border bg-surface",
        compact ? "h-28" : "h-56",
      )}
    >
      <svg viewBox="0 0 360 220" className="size-full" aria-hidden>
        <rect width="360" height="220" fill="var(--surface-muted)" fillOpacity="0.35" />
        <path
          d="M40 170 C110 120 150 90 180 110 C220 136 250 150 320 70"
          stroke="var(--accent)"
          strokeOpacity={index === 0 ? 0.55 : 0.25}
          strokeWidth="2"
          fill="none"
        />
        <path
          d="M50 60 H150 V140 H50 Z"
          stroke="var(--accent)"
          strokeOpacity={index === 1 ? 0.7 : 0.2}
          strokeWidth="1.5"
          fill="var(--accent-soft)"
          fillOpacity={index === 1 ? 0.55 : 0.15}
          rx="12"
        />
        <circle
          cx="260"
          cy="140"
          r="34"
          fill="var(--accent)"
          fillOpacity={index === 2 ? 0.85 : 0.18}
        />
        <circle cx="248" cy="132" r="4" fill="white" fillOpacity="0.85" />
        <circle cx="268" cy="148" r="4" fill="white" fillOpacity="0.85" />
        <path
          d="M250 148 L266 132"
          stroke="white"
          strokeOpacity="0.7"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}
