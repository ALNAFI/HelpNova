"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Accordion } from "@/components/ui/accordion";
import { Container } from "@/components/ui/container";
import { contactFaqPreview, contactPageCopy } from "@/data/marketing/contact";
import { getGsap } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

export function ContactFaq() {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || reducedMotion) return;
    const { gsap } = getGsap();
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-contact-faq]",
        { y: 16, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.55,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 84%" },
        },
      );
    }, el);
    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      ref={sectionRef}
      className="relative py-12 sm:py-16"
      aria-labelledby="contact-faq-heading"
    >
      <Container>
        <div
          data-contact-faq
          className="flex flex-wrap items-end justify-between gap-4"
        >
          <h2
            id="contact-faq-heading"
            className="font-heading text-[1.85rem] font-semibold tracking-tight text-balance sm:text-[2.25rem]"
          >
            {contactPageCopy.faqTitle}
          </h2>
          <Link
            href="/faq"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-accent transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            {contactPageCopy.faqLinkLabel}
            <ArrowUpRight className="size-4" aria-hidden />
          </Link>
        </div>
        <div data-contact-faq className="mt-6">
          <Accordion
            items={contactFaqPreview.map((item) => ({
              id: item.id,
              question: item.question,
              answer: item.answer,
            }))}
          />
        </div>
      </Container>
    </section>
  );
}
