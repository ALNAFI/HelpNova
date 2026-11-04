"use client";

import { useEffect, useRef } from "react";
import { ContactHeroArtwork } from "@/components/modules/contact/contact-hero-artwork";
import { Container } from "@/components/ui/container";
import { contactPageCopy } from "@/data/marketing/contact";
import { getGsap } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

export function ContactHero() {
  const ref = useRef<HTMLElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || reducedMotion) return;
    const { gsap } = getGsap();
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-contact-hero]",
        { y: 20, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.7,
          stagger: 0.09,
          ease: "power3.out",
          immediateRender: false,
        },
      );
    }, el);
    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <header
      ref={ref}
      className="relative overflow-hidden pt-12 pb-10 sm:pt-16 sm:pb-14"
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[34rem] overflow-hidden"
        aria-hidden
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_55%_at_75%_-8%,var(--glow),transparent_58%)]" />
        <div className="absolute inset-0 bg-grid-fade [mask-image:linear-gradient(to_bottom,black_40%,transparent_100%)]" />
      </div>

      <Container className="relative">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
          <div className="max-w-2xl">
            <p
              data-contact-hero
              className="text-xs font-semibold tracking-[0.18em] text-accent uppercase"
            >
              {contactPageCopy.heroEyebrow}
            </p>
            <h1
              data-contact-hero
              className="mt-5 font-heading text-[2.2rem] leading-[1.08] font-semibold tracking-tight text-balance sm:text-[3rem] lg:text-[3.4rem]"
            >
              {contactPageCopy.heroTitle}
            </h1>
            <p
              data-contact-hero
              className="mt-5 max-w-xl text-base leading-7 text-muted sm:text-[1.05rem] sm:leading-8"
            >
              {contactPageCopy.heroDescription}
            </p>
            <p
              data-contact-hero
              className="mt-4 text-sm font-medium tracking-wide text-accent"
            >
              {contactPageCopy.heroSecondary}
            </p>
          </div>
          <div data-contact-hero className="mx-auto w-full max-w-md lg:max-w-none">
            <ContactHeroArtwork className="mx-auto aspect-square w-full max-w-[26rem]" />
          </div>
        </div>
      </Container>
    </header>
  );
}
