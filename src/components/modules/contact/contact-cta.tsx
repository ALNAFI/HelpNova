"use client";

import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { contactPageCopy } from "@/data/marketing/contact";
import { getGsap } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

export function ContactCta() {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || reducedMotion) return;
    const { gsap } = getGsap();
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
      gsap.to("[data-contact-cta-line]", {
        strokeDashoffset: 0,
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 80%" },
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
            className="pointer-events-none absolute inset-0 size-full opacity-60"
            aria-hidden
          >
            <path
              data-contact-cta-line
              d="M30 150 C160 60 260 220 560 90"
              stroke="var(--accent)"
              strokeOpacity="0.45"
              strokeWidth="1.5"
              fill="none"
              strokeDasharray="420"
              strokeDashoffset="420"
            />
          </svg>
          <div className="relative max-w-2xl">
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
