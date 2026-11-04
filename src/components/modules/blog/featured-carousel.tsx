"use client";

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { FeaturedArticleCard } from "@/components/modules/blog/featured-article-card";
import { Container } from "@/components/ui/container";
import { blogPageCopy } from "@/data/editorial/blog";
import { getGsap } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import type { BlogPost } from "@/types/editorial";
import { cn } from "@/utils/cn";

type FeaturedCarouselProps = {
  posts: BlogPost[];
};

export function FeaturedCarousel({ posts }: FeaturedCarouselProps) {
  const labelId = useId();
  const reducedMotion = usePrefersReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [index, setIndex] = useState(0);
  const dragRef = useRef<{
    active: boolean;
    startX: number;
    delta: number;
  }>({ active: false, startX: 0, delta: 0 });

  const count = posts.length;
  const goTo = useCallback(
    (next: number) => {
      if (count === 0) return;
      const wrapped = ((next % count) + count) % count;
      setIndex(wrapped);
    },
    [count],
  );

  const previous = useCallback(() => goTo(index - 1), [goTo, index]);
  const next = useCallback(() => goTo(index + 1), [goTo, index]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const { gsap } = getGsap();
    gsap.to(track, {
      xPercent: -index * 100,
      duration: reducedMotion ? 0 : 0.7,
      ease: "power3.out",
      overwrite: "auto",
    });
  }, [index, reducedMotion]);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || reducedMotion) return;
    const { gsap } = getGsap();
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-blog-featured]",
        { y: 24, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.7,
          stagger: 0.08,
          ease: "power3.out",
          immediateRender: false,
          scrollTrigger: { trigger: el, start: "top 82%" },
        },
      );
    }, el);
    return () => ctx.revert();
  }, [reducedMotion]);

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      previous();
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      next();
    }
    if (event.key === "Home") {
      event.preventDefault();
      goTo(0);
    }
    if (event.key === "End") {
      event.preventDefault();
      goTo(count - 1);
    }
  };

  const onPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    dragRef.current = {
      active: true,
      startX: event.clientX,
      delta: 0,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const onPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!dragRef.current.active) return;
    dragRef.current.delta = event.clientX - dragRef.current.startX;
  };

  const onPointerUp = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!dragRef.current.active) return;
    const delta = dragRef.current.delta;
    dragRef.current.active = false;
    try {
      event.currentTarget.releasePointerCapture(event.pointerId);
    } catch {
      // ignore
    }
    if (Math.abs(delta) < 48) return;
    if (delta > 0) previous();
    else next();
  };

  if (count === 0) return null;

  const counter = `${String(index + 1).padStart(2, "0")} / ${String(count).padStart(2, "0")}`;

  return (
    <section
      ref={sectionRef}
      className="relative py-6 sm:py-8"
      aria-labelledby={labelId}
    >
      <Container>
        <div
          data-blog-featured
          className="mb-5 flex flex-wrap items-end justify-between gap-4"
        >
          <div>
            <p className="text-xs font-semibold tracking-[0.16em] text-accent uppercase">
              {blogPageCopy.featuredLabel}
            </p>
            <h2
              id={labelId}
              className="mt-2 font-heading text-2xl font-semibold tracking-tight sm:text-3xl"
            >
              Stories worth opening first.
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <span
              className="font-mono text-xs tracking-[0.14em] text-muted tabular-nums"
              aria-live="polite"
            >
              {counter}
            </span>
            <div className="flex items-center gap-2">
              <CarouselButton
                label="Previous featured story"
                onClick={previous}
                icon={<ChevronLeft className="size-4" aria-hidden />}
              />
              <CarouselButton
                label="Next featured story"
                onClick={next}
                icon={<ChevronRight className="size-4" aria-hidden />}
              />
            </div>
          </div>
        </div>

        <div
          data-blog-featured
          className="relative outline-none"
          role="region"
          aria-roledescription="carousel"
          aria-label="Featured stories"
          tabIndex={0}
          onKeyDown={onKeyDown}
        >
          <div className="overflow-hidden rounded-[1.6rem]">
            <div
              ref={trackRef}
              className="flex touch-pan-y will-change-transform"
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={onPointerUp}
              onPointerCancel={onPointerUp}
            >
              {posts.map((post, slideIndex) => (
                <div
                  key={post.id}
                  className="w-full shrink-0 px-0"
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`${slideIndex + 1} of ${count}`}
                  aria-hidden={slideIndex !== index}
                >
                  <FeaturedArticleCard
                    post={post}
                    active={slideIndex === index}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="mt-5 flex items-center gap-2" aria-hidden={false}>
            <div
              className="h-1 flex-1 overflow-hidden rounded-full bg-border"
              role="presentation"
            >
              <div
                className="h-full rounded-full bg-accent transition-[width] duration-500 ease-out"
                style={{ width: `${((index + 1) / count) * 100}%` }}
              />
            </div>
            <div className="flex gap-1.5" role="tablist" aria-label="Featured slides">
              {posts.map((post, slideIndex) => (
                <button
                  key={post.id}
                  type="button"
                  role="tab"
                  aria-selected={slideIndex === index}
                  aria-label={`Go to featured story ${slideIndex + 1}`}
                  onClick={() => goTo(slideIndex)}
                  className={cn(
                    "size-2.5 rounded-full transition-[transform,background-color] duration-300",
                    slideIndex === index
                      ? "scale-110 bg-accent"
                      : "bg-border-strong hover:bg-muted",
                  )}
                />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function CarouselButton({
  label,
  onClick,
  icon,
}: {
  label: string;
  onClick: () => void;
  icon: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="inline-flex size-10 items-center justify-center rounded-full border border-border bg-surface text-foreground shadow-sm transition-colors hover:border-border-strong hover:bg-surface-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      {icon}
    </button>
  );
}
