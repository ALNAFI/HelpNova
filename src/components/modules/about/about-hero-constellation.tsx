"use client";

import { useEffect, useRef } from "react";
import { getGsap } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { cn } from "@/utils/cn";

export function AboutHeroConstellation({ className }: { className?: string }) {
  const ref = useRef<SVGSVGElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const svg = ref.current;
    if (!svg || reducedMotion) return;
    const { gsap } = getGsap();
    const ctx = gsap.context(() => {
      const paths = svg.querySelectorAll("[data-constellation-path]");
      paths.forEach((path) => {
        const length = (path as SVGPathElement).getTotalLength?.() ?? 240;
        gsap.set(path, {
          strokeDasharray: length,
          strokeDashoffset: length,
        });
        gsap.to(path, {
          strokeDashoffset: 0,
          duration: 1.4,
          ease: "power2.out",
          delay: 0.35,
        });
      });

      gsap.fromTo(
        "[data-constellation-node]",
        { scale: 0.86, autoAlpha: 0.35 },
        {
          scale: 1,
          autoAlpha: 1,
          duration: 0.55,
          stagger: 0.08,
          ease: "power3.out",
          delay: 0.45,
          immediateRender: false,
        },
      );

      gsap.to("[data-constellation-orbit]", {
        rotate: 360,
        transformOrigin: "210px 210px",
        duration: 36,
        ease: "none",
        repeat: -1,
      });

      gsap.to("[data-constellation-float]", {
        y: -6,
        duration: 2.8,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        stagger: 0.35,
      });
    }, svg);
    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <svg
      ref={ref}
      viewBox="0 0 420 420"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("text-accent", className)}
      aria-hidden
    >
      <circle
        cx="210"
        cy="210"
        r="168"
        stroke="currentColor"
        strokeOpacity="0.08"
        strokeWidth="1"
      />
      <circle
        data-constellation-orbit
        cx="210"
        cy="210"
        r="128"
        stroke="currentColor"
        strokeOpacity="0.14"
        strokeWidth="1"
        strokeDasharray="4 10"
      />

      <path
        data-constellation-path
        d="M112 286 C148 240 174 220 210 210 C248 198 278 164 312 118"
        stroke="currentColor"
        strokeOpacity="0.45"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        data-constellation-path
        d="M98 168 C140 150 168 176 210 210 C246 238 286 262 334 274"
        stroke="currentColor"
        strokeOpacity="0.28"
        strokeWidth="1.25"
        strokeLinecap="round"
      />
      <path
        data-constellation-path
        d="M168 92 C186 132 196 168 210 210 C224 248 248 286 288 328"
        stroke="currentColor"
        strokeOpacity="0.22"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeDasharray="5 8"
      />

      <g data-constellation-float data-constellation-node>
        <rect
          x="176"
          y="176"
          width="68"
          height="68"
          rx="18"
          fill="var(--accent)"
        />
        <path
          d="M198 214 H222 M210 202 V226"
          stroke="white"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </g>

      <g data-constellation-float data-constellation-node>
        <circle cx="112" cy="286" r="14" fill="var(--accent-soft)" />
        <circle cx="112" cy="286" r="5" fill="currentColor" />
      </g>
      <g data-constellation-float data-constellation-node>
        <circle cx="312" cy="118" r="12" fill="var(--accent-soft)" />
        <circle cx="312" cy="118" r="4.5" fill="currentColor" />
      </g>
      <g data-constellation-float data-constellation-node>
        <circle cx="98" cy="168" r="10" fill="var(--surface)" stroke="currentColor" strokeOpacity="0.35" />
        <circle cx="98" cy="168" r="3.5" fill="currentColor" />
      </g>
      <g data-constellation-float data-constellation-node>
        <circle cx="334" cy="274" r="11" fill="var(--accent-soft)" />
        <circle cx="334" cy="274" r="4" fill="currentColor" />
      </g>
      <g data-constellation-float data-constellation-node>
        <rect
          x="288"
          y="318"
          width="42"
          height="28"
          rx="8"
          fill="var(--surface)"
          stroke="currentColor"
          strokeOpacity="0.25"
        />
        <path d="M298 328 H318 M298 335 H310" stroke="currentColor" strokeOpacity="0.45" strokeWidth="1.5" strokeLinecap="round" />
      </g>
      <g data-constellation-float data-constellation-node>
        <rect
          x="146"
          y="74"
          width="48"
          height="30"
          rx="8"
          fill="var(--surface)"
          stroke="currentColor"
          strokeOpacity="0.22"
        />
        <circle cx="160" cy="89" r="3" fill="currentColor" fillOpacity="0.5" />
        <path d="M170 86 H184" stroke="currentColor" strokeOpacity="0.35" strokeWidth="1.5" strokeLinecap="round" />
      </g>
    </svg>
  );
}
