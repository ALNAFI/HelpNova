"use client";

import type { MouseEvent } from "react";
import { ArrowDown, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { AutomationHeroIllustration } from "@/components/modules/features/automation/automation-hero-illustration";
import { automationFeatureHero } from "@/data/marketing/automation-feature";

function scrollToInquiryPath(event: MouseEvent<HTMLElement>) {
  const section = document.getElementById("inquiry-path");
  const heading = document.getElementById("inquiry-path-heading");
  if (!section) return;

  event.preventDefault();
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  section.scrollIntoView({
    behavior: reduced ? "auto" : "smooth",
    block: "start",
  });

  window.setTimeout(
    () => {
      heading?.focus({ preventScroll: true });
    },
    reduced ? 0 : 450,
  );
}

export function AutomationFeatureHero() {
  return (
    <header className="relative overflow-hidden pt-12 pb-14 sm:pt-16 sm:pb-16 lg:pb-20">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_15%_0%,var(--glow),transparent_60%)]" />
        <div className="absolute inset-0 bg-grid-fade [mask-image:linear-gradient(to_bottom,black_40%,transparent)]" />
      </div>

      <Container className="relative">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
          <div className="max-w-xl">
            <p className="text-xs font-semibold tracking-[0.18em] text-accent uppercase">
              {automationFeatureHero.eyebrow}
            </p>
            <h1 className="mt-4 font-heading text-[2.2rem] leading-[1.08] font-semibold tracking-tight text-balance sm:text-[3.1rem] lg:text-[3.4rem]">
              {automationFeatureHero.title}
            </h1>
            <p className="mt-5 max-w-lg text-base leading-7 text-muted sm:text-[1.05rem] sm:leading-8">
              {automationFeatureHero.description}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href={automationFeatureHero.primaryCta.href} size="lg">
                {automationFeatureHero.primaryCta.label}
                <ArrowRight className="size-4" />
              </Button>
              <Button
                href={automationFeatureHero.secondaryCta.href}
                variant="secondary"
                size="lg"
                onClick={scrollToInquiryPath}
              >
                {automationFeatureHero.secondaryCta.label}
                <ArrowDown className="size-4" />
              </Button>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[720px]">
            <AutomationHeroIllustration />
          </div>
        </div>
      </Container>
    </header>
  );
}
