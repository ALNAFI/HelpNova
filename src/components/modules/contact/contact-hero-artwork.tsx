"use client";

import { useEffect, useRef } from "react";
import { getGsap } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { cn } from "@/utils/cn";

export function ContactHeroArtwork({ className }: { className?: string }) {
  const ref = useRef<SVGSVGElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const svg = ref.current;
    if (!svg || reducedMotion) return;
    const { gsap } = getGsap();
    const ctx = gsap.context(() => {
      svg.querySelectorAll("[data-contact-path]").forEach((path) => {
        const length = (path as SVGPathElement).getTotalLength?.() ?? 200;
        gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
        gsap.to(path, {
          strokeDashoffset: 0,
          duration: 1.35,
          ease: "power2.out",
          delay: 0.3,
        });
      });

      gsap.fromTo(
        "[data-contact-node]",
        { scale: 0.88, autoAlpha: 0.4 },
        {
          scale: 1,
          autoAlpha: 1,
          duration: 0.55,
          stagger: 0.08,
          ease: "power3.out",
          delay: 0.4,
          immediateRender: false,
        },
      );

      gsap.to("[data-contact-float]", {
        y: -7,
        duration: 2.8,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        stagger: 0.3,
      });

      // Rotate only the inner wrapper. Outer translate keeps the pivot fixed
      // at the illustration center so the orbit never drifts.
      gsap.set("[data-contact-orbit]", {
        transformOrigin: "center center",
        svgOrigin: "0 0",
        x: 0,
        y: 0,
      });
      gsap.to("[data-contact-orbit]", {
        rotate: 360,
        duration: 40,
        ease: "none",
        repeat: -1,
        transformOrigin: "center center",
        svgOrigin: "0 0",
      });
    }, svg);
    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <svg
      ref={ref}
      viewBox="0 0 420 420"
      fill="none"
      className={cn("text-accent", className)}
      aria-hidden
    >
      <circle
        cx="210"
        cy="210"
        r="170"
        stroke="currentColor"
        strokeOpacity="0.16"
      />
      {/* Position wrapper (static) + rotation wrapper (animated) */}
      <g transform="translate(210 210)">
        <g data-contact-orbit>
          <circle
            cx="0"
            cy="0"
            r="126"
            stroke="currentColor"
            strokeOpacity="0.28"
            strokeDasharray="5 11"
          />
        </g>
      </g>
      <path
        data-contact-path
        d="M96 268 C140 220 170 200 210 210 C252 220 286 250 330 292"
        stroke="currentColor"
        strokeOpacity="0.58"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        data-contact-path
        d="M120 130 C160 150 180 180 210 210 C245 185 275 140 300 114"
        stroke="currentColor"
        strokeOpacity="0.36"
        strokeWidth="1.25"
        strokeDasharray="5 8"
        strokeLinecap="round"
      />

      <g data-contact-float data-contact-node>
        <rect x="168" y="168" width="84" height="84" rx="22" fill="var(--accent)" />
        <path
          d="M190 198 H230 C236 198 240 202 240 208 V228 C240 234 236 238 230 238 H206 L190 250 V238 H190 C184 238 180 234 180 228 V208 C180 202 184 198 190 198 Z"
          fill="white"
          fillOpacity="0.92"
        />
      </g>

      <g data-contact-float data-contact-node>
        <rect
          x="78"
          y="108"
          width="64"
          height="42"
          rx="14"
          fill="var(--surface)"
          stroke="currentColor"
          strokeOpacity="0.42"
        />
        <path d="M92 124 H126 M92 134 H114" stroke="currentColor" strokeOpacity="0.55" strokeWidth="1.5" strokeLinecap="round" />
      </g>

      <g data-contact-float data-contact-node>
        <circle cx="330" cy="292" r="16" fill="var(--accent-soft)" />
        <circle cx="330" cy="292" r="5.5" fill="currentColor" />
      </g>
      <g data-contact-float data-contact-node>
        <circle cx="96" cy="268" r="12" fill="var(--surface)" stroke="currentColor" strokeOpacity="0.45" />
        <circle cx="96" cy="268" r="4" fill="currentColor" />
      </g>
      <g data-contact-float data-contact-node>
        <rect
          x="286"
          y="96"
          width="58"
          height="36"
          rx="12"
          fill="var(--accent-soft)"
          stroke="currentColor"
          strokeOpacity="0.4"
        />
        <circle cx="302" cy="114" r="3.5" fill="currentColor" fillOpacity="0.7" />
        <path d="M312 111 H330" stroke="currentColor" strokeOpacity="0.55" strokeWidth="1.5" strokeLinecap="round" />
      </g>
    </svg>
  );
}
