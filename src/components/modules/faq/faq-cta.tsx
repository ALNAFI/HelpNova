"use client";

import { useEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { faqPageCopy } from "@/data/marketing/faq";
import { getGsap } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

export function FaqCta() {
  const ref = useRef<HTMLElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || reducedMotion) return;
    const { gsap } = getGsap();
    const ctx = gsap.context(() => {
      const targets = el.querySelectorAll<HTMLElement>("[data-faq-cta]");
      gsap.fromTo(
        targets,
        { y: 18, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.65,
          stagger: 0.06,
          ease: "power3.out",
          immediateRender: false,
          scrollTrigger: { trigger: el, start: "top 88%" },
        },
      );
    }, el);
    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      ref={ref}
      className="mt-10 sm:mt-12"
      aria-labelledby="faq-cta-heading"
    >
      <div className="relative overflow-hidden rounded-[1.35rem] border border-border bg-gradient-to-br from-accent-soft/70 via-surface to-surface px-6 py-8 shadow-[var(--shadow-soft)] sm:flex sm:items-center sm:justify-between sm:gap-8 sm:px-8 sm:py-9">
        <div
          className="pointer-events-none absolute -top-16 -right-10 size-48 rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--accent)_28%,transparent),transparent_70%)]"
          aria-hidden
        />
        <div className="relative max-w-xl">
          <h2
            id="faq-cta-heading"
            data-faq-cta
            className="font-heading text-xl font-semibold tracking-tight text-foreground sm:text-2xl"
          >
            {faqPageCopy.ctaTitle}
          </h2>
          <p
            data-faq-cta
            className="mt-2 text-sm leading-6 text-muted sm:text-[0.9375rem]"
          >
            {faqPageCopy.ctaDescription}
          </p>
        </div>
        <div
          data-faq-cta
          className="relative mt-5 flex flex-col gap-2.5 sm:mt-0 sm:flex-row sm:items-center"
        >
          <Button href="/contact" size="lg">
            {faqPageCopy.contactLabel}
            <ArrowUpRight className="size-4" aria-hidden />
          </Button>
          <Button href="/demo" variant="secondary" size="lg">
            {faqPageCopy.demoLabel}
          </Button>
        </div>
      </div>
    </section>
  );
}
