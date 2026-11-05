"use client";

import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { contactPageCopy } from "@/data/marketing/contact";
import { getGsap } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

const LINE_PATHS = [
  {
    d: "M28 188 C92 168 118 72 188 96 C248 116 268 48 308 28",
    opacity: 0.55,
    width: 1.6,
    delay: 0,
  },
  {
    d: "M18 204 C78 186 108 108 172 122 C230 134 258 78 298 58",
    opacity: 0.32,
    width: 1.25,
    delay: 0.12,
  },
  {
    d: "M48 170 C110 154 138 58 198 78 C250 94 274 36 312 18",
    opacity: 0.22,
    width: 1.1,
    delay: 0.22,
  },
] as const;

export function ContactCta() {
  const sectionRef = useRef<HTMLElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const el = sectionRef.current;
    const svg = svgRef.current;
    if (!el || !svg || reducedMotion) return;
    const { gsap, ScrollTrigger } = getGsap();
    const paths = Array.from(
      svg.querySelectorAll<SVGPathElement>("[data-contact-cta-line]"),
    );
    const lengths = paths.map((path) => path.getTotalLength());

    paths.forEach((path, index) => {
      gsap.set(path, {
        strokeDasharray: lengths[index],
        strokeDashoffset: lengths[index],
      });
    });

    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-contact-cta]",
        { y: 18, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.65,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 86%" },
        },
      );

      ScrollTrigger.create({
        trigger: el,
        start: "top 75%",
        end: "top 25%",
        scrub: 0.65,
        onUpdate: (self) => {
          paths.forEach((path, index) => {
            const delay = LINE_PATHS[index]?.delay ?? 0;
            const local = Math.min(
              1,
              Math.max(0, (self.progress - delay) / (1 - delay)),
            );
            gsap.set(path, {
              strokeDashoffset: lengths[index] * (1 - local),
            });
          });
        },
      });
    }, el);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      ref={sectionRef}
      className="relative pb-16 sm:pb-24"
      aria-labelledby="contact-cta-heading"
    >
      <Container>
        <div className="relative overflow-hidden rounded-[2rem] border border-border bg-workspace px-6 py-12 text-workspace-text shadow-[var(--shadow-soft)] sm:px-10 sm:py-14">
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,color-mix(in_oklab,var(--accent)_32%,transparent),transparent_40%),radial-gradient(circle_at_90%_10%,color-mix(in_oklab,#a78bfa_18%,transparent),transparent_34%)]"
            aria-hidden
          />
          <svg
            ref={svgRef}
            className="pointer-events-none absolute right-0 bottom-0 z-0 h-[58%] w-[min(52%,22rem)] opacity-50 sm:h-[62%] sm:w-[min(46%,26rem)] sm:opacity-60 lg:w-[min(42%,28rem)]"
            viewBox="0 0 320 220"
            preserveAspectRatio="xMaxYMax meet"
            aria-hidden
          >
            {LINE_PATHS.map((line) => (
              <path
                key={line.d}
                data-contact-cta-line
                d={line.d}
                stroke="var(--accent)"
                strokeOpacity={line.opacity}
                strokeWidth={line.width}
                strokeLinecap="round"
                fill="none"
              />
            ))}
          </svg>
          <div className="relative z-10 max-w-2xl">
            <h2
              id="contact-cta-heading"
              data-contact-cta
              className="font-heading text-[1.95rem] font-semibold tracking-tight text-balance sm:text-[2.5rem]"
            >
              {contactPageCopy.ctaTitle}
            </h2>
            <p
              data-contact-cta
              className="mt-4 text-base leading-7 text-workspace-text/75"
            >
              {contactPageCopy.ctaDescription}
            </p>
            <div
              data-contact-cta
              className="mt-7 flex flex-col gap-3 sm:flex-row"
            >
              <Button href="/demo" size="lg">
                {contactPageCopy.demoLabel}
              </Button>
              <Button href="/about" variant="secondary" size="lg">
                {contactPageCopy.aboutLabel}
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
