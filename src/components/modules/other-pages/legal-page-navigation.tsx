"use client";

import { useEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { LegalInformationCard } from "@/components/modules/other-pages/legal-information-card";
import { Container } from "@/components/ui/container";
import { getGsap } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

type RelatedLink = {
  id: string;
  title: string;
  description: string;
  href: string;
  icon: "scroll" | "help" | "mail";
};

type LegalPageNavigationProps = {
  title: string;
  links: readonly RelatedLink[];
};

export function LegalPageNavigation({
  title,
  links,
}: LegalPageNavigationProps) {
  const ref = useRef<HTMLElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || reducedMotion) return;
    const { gsap } = getGsap();
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-legal-nav]",
        { y: 18, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.6,
          stagger: 0.07,
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
      className="relative py-10 sm:py-12"
      aria-labelledby="legal-related-heading"
    >
      <Container>
        <div data-legal-nav className="flex items-end justify-between gap-4">
          <h2
            id="legal-related-heading"
            className="font-heading text-[1.65rem] font-semibold tracking-tight sm:text-[1.9rem]"
          >
            {title}
          </h2>
          <ArrowUpRight className="hidden size-5 text-muted sm:block" aria-hidden />
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {links.map((link) => (
            <div key={link.id} data-legal-nav>
              <LegalInformationCard
                title={link.title}
                description={link.description}
                icon={link.icon}
                href={link.href}
              />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
