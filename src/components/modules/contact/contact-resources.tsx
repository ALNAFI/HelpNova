"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowUpRight, Compass, HelpCircle, Sparkles } from "lucide-react";
import { Container } from "@/components/ui/container";
import { contactPageCopy, contactResources } from "@/data/marketing/contact";
import { getGsap } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { cn } from "@/utils/cn";

const icons = {
  demo: Sparkles,
  faq: HelpCircle,
  features: Compass,
} as const;

const accents = {
  featured:
    "border-accent/30 bg-[linear-gradient(160deg,color-mix(in_oklab,var(--accent)_22%,transparent),var(--accent-soft)_42%,var(--surface)_78%)] shadow-[0_18px_40px_-28px_color-mix(in_oklab,var(--accent)_55%,transparent)]",
  subtle:
    "border-border bg-surface hover:border-accent/25",
} as const;

export function ContactResources() {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || reducedMotion) return;
    const { gsap } = getGsap();
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-contact-resource]",
        { y: 18, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.55,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 82%" },
        },
      );
    }, el);
    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      ref={sectionRef}
      className="relative py-12 sm:py-16"
      aria-labelledby="contact-resources-heading"
    >
      <Container>
        <div className="max-w-2xl" data-contact-resource>
          <h2
            id="contact-resources-heading"
            className="font-heading text-[1.85rem] font-semibold tracking-tight text-balance sm:text-[2.25rem]"
          >
            {contactPageCopy.resourcesTitle}
          </h2>
          <p className="mt-3 text-base leading-7 text-muted">
            {contactPageCopy.resourcesDescription}
          </p>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {contactResources.map((resource) => {
            const Icon = icons[resource.id as keyof typeof icons];
            return (
              <Link
                key={resource.id}
                href={resource.href}
                data-contact-resource
                className={cn(
                  "group relative flex h-full flex-col overflow-hidden rounded-[1.55rem] border p-6 shadow-[var(--shadow-soft)] transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:p-6",
                  accents[resource.accent],
                  resource.accent === "featured" &&
                    "hover:border-accent/45 hover:shadow-[0_22px_48px_-26px_color-mix(in_oklab,var(--accent)_65%,transparent)]",
                )}
              >
                <span className="inline-flex size-10 items-center justify-center rounded-2xl border border-accent/25 bg-accent-soft text-accent">
                  <Icon className="size-4" aria-hidden />
                </span>
                <h3 className="mt-5 font-heading text-xl font-semibold tracking-tight text-balance">
                  {resource.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-7 text-muted">
                  {resource.description}
                </p>
                <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-accent">
                  {resource.cta}
                  <ArrowUpRight
                    className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    aria-hidden
                  />
                </span>
              </Link>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
