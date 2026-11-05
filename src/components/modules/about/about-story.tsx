"use client";

import { useEffect, useRef, useState } from "react";
import { Container } from "@/components/ui/container";
import { AboutStoryIllustration } from "@/components/modules/about/about-story-illustration";
import { aboutPageCopy, aboutStoryChapters } from "@/data/marketing/about";
import { getGsap } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { cn } from "@/utils/cn";

type StoryChapterId = (typeof aboutStoryChapters)[number]["id"];

function isStoryChapterId(value: string | null): value is StoryChapterId {
  return (
    value === "challenge" || value === "idea" || value === "approach"
  );
}

export function AboutStory() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeId, setActiveId] = useState<StoryChapterId>(
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
        if (isStoryChapterId(id)) setActiveId(id);
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
        "[data-story-intro]",
        { y: 16, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.6,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: { trigger: section, start: "top 78%" },
        },
      );

      gsap.fromTo(
        "[data-story-chapter]",
        { y: 22, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.65,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section.querySelector("[data-story-timeline]"),
            start: "top 82%",
          },
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
        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-12 xl:gap-16">
          <div className="min-w-0 lg:self-start">
            <p
              data-story-intro
              className="text-xs font-semibold tracking-[0.16em] text-accent uppercase"
            >
              {aboutPageCopy.storyEyebrow}
            </p>
            <h2
              id="about-story-heading"
              data-story-intro
              className="mt-3 font-heading text-[1.85rem] font-semibold tracking-tight text-balance sm:text-[2.35rem]"
            >
              {aboutPageCopy.storyTitle}
            </h2>
            <p
              data-story-intro
              className="mt-4 max-w-md text-base leading-7 text-muted"
            >
              {aboutPageCopy.storySupport}
            </p>

            <div data-story-intro className="mt-7 sm:mt-8">
              <AboutStoryIllustration />
            </div>
          </div>

          <div data-story-timeline className="min-w-0">
            <ol className="relative">
              {aboutStoryChapters.map((chapter, index) => {
                const active = chapter.id === activeId;
                const passed = index < activeIndex;
                const isLast = index === aboutStoryChapters.length - 1;

                return (
                  <li
                    key={chapter.id}
                    data-story-chapter={chapter.id}
                    className={cn(
                      "relative flex gap-4 sm:gap-5",
                      !isLast && "pb-8 sm:pb-9",
                    )}
                  >
                    <div className="flex w-7 shrink-0 flex-col items-center sm:w-8">
                      <span
                        className={cn(
                          "relative z-10 inline-flex size-7 items-center justify-center rounded-full border text-[10px] font-semibold transition-colors duration-300 sm:size-8 sm:text-[11px]",
                          active
                            ? "border-accent bg-accent text-accent-foreground shadow-[0_0_0_4px_color-mix(in_oklab,var(--accent)_16%,transparent)]"
                            : passed
                              ? "border-accent/50 bg-accent-soft text-accent"
                              : "border-border bg-surface text-muted",
                        )}
                        aria-hidden
                      >
                        {chapter.number}
                      </span>

                      {!isLast ? (
                        <span
                          className="relative mt-2 w-px flex-1 overflow-hidden bg-border"
                          aria-hidden
                        >
                          <span
                            className={cn(
                              "absolute inset-x-0 top-0 bg-accent transition-[height] duration-500 ease-out",
                              passed
                                ? "h-full"
                                : active
                                  ? "h-1/2"
                                  : "h-0",
                            )}
                          />
                        </span>
                      ) : null}
                    </div>

                    <article
                      className={cn(
                        "min-w-0 flex-1 rounded-[1.25rem] border p-5 transition-[border-color,background-color,box-shadow] duration-300 sm:rounded-[1.35rem] sm:p-6",
                        active
                          ? "border-accent/35 bg-accent-soft/35 shadow-[var(--shadow-soft)]"
                          : "border-border bg-surface/80",
                      )}
                    >
                      <h3 className="font-heading text-lg font-semibold tracking-tight text-foreground sm:text-xl">
                        {chapter.title}
                      </h3>
                      <p className="mt-2.5 text-[0.98rem] leading-7 text-muted">
                        {chapter.body}
                      </p>
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
