"use client";

import { useEffect, useRef } from "react";

type ReadingProgressProps = {
  targetId: string;
};

export function ReadingProgress({ targetId }: ReadingProgressProps) {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bar = barRef.current;
    const article = document.getElementById(targetId);
    if (!bar || !article) return;

    let frame = 0;

    const update = () => {
      frame = 0;
      const rect = article.getBoundingClientRect();
      const articleTop = window.scrollY + rect.top;
      const articleHeight = article.offsetHeight;
      const viewport = window.innerHeight;
      const readable = Math.max(articleHeight - viewport, 1);
      const progress = Math.min(
        Math.max((window.scrollY - articleTop) / readable, 0),
        1,
      );
      bar.style.transform = `scaleX(${progress})`;
    };

    const onScrollOrResize = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize);
    const observer = new ResizeObserver(onScrollOrResize);
    observer.observe(article);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
      observer.disconnect();
    };
  }, [targetId]);

  return (
    <div
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[3px] bg-border/50"
      aria-hidden
    >
      <div
        ref={barRef}
        className="h-full origin-left scale-x-0 bg-accent will-change-transform"
      />
    </div>
  );
}
