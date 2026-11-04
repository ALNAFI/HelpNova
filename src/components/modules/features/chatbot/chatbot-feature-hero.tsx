"use client";

import { useEffect, useRef } from "react";
import { ArrowDown, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { OpenChatbotButton } from "@/components/common/chatbot/open-chatbot-button";
import {
  chatbotFeatureHero,
  getChatbotPreset,
} from "@/data/marketing/chatbot-feature";
import { getGsap } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

export function ChatbotFeatureHero() {
  const rootRef = useRef<HTMLElement>(null);
  const reducedMotion = usePrefersReducedMotion();
  const preset = getChatbotPreset(chatbotFeatureHero.heroPresetId);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || reducedMotion) return;

    const { gsap } = getGsap();
    const ctx = gsap.context(() => {
      const question = root.querySelector("[data-chatbot-hero-q]");
      const answer = root.querySelector("[data-chatbot-hero-a]");
      const line = root.querySelector<SVGPathElement>("[data-chatbot-hero-line]");

      gsap.set([question, answer], { autoAlpha: 0, y: 12 });
      if (line && typeof line.getTotalLength === "function") {
        const length = line.getTotalLength();
        gsap.set(line, {
          strokeDasharray: length,
          strokeDashoffset: length,
          opacity: 0.35,
        });
      }

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.to(question, { autoAlpha: 1, y: 0, duration: 0.4 })
        .to(line, { strokeDashoffset: 0, opacity: 1, duration: 0.3 }, "-=0.1")
        .to(answer, { autoAlpha: 1, y: 0, duration: 0.4 }, "-=0.12");
    }, root);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <header
      ref={rootRef}
      className="relative overflow-hidden pt-12 pb-14 sm:pt-16 sm:pb-16 lg:pb-20"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_65%_50%_at_70%_0%,var(--glow),transparent_60%)]" />
        <div className="absolute inset-0 bg-grid-fade [mask-image:linear-gradient(to_bottom,black_40%,transparent)]" />
      </div>

      <Container className="relative">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <div className="max-w-xl">
            <p className="text-xs font-semibold tracking-[0.18em] text-accent uppercase">
              {chatbotFeatureHero.eyebrow}
            </p>
            <h1 className="mt-4 font-heading text-[2.2rem] leading-[1.08] font-semibold tracking-tight text-balance sm:text-[3.1rem] lg:text-[3.4rem]">
              {chatbotFeatureHero.title}
            </h1>
            <p className="mt-5 max-w-lg text-base leading-7 text-muted sm:text-[1.05rem] sm:leading-8">
              {chatbotFeatureHero.description}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <OpenChatbotButton aria-label="Try the sample chatbot">
                {chatbotFeatureHero.primaryCtaLabel}
                <MessageCircle className="size-4" />
              </OpenChatbotButton>
              <Button
                href={chatbotFeatureHero.secondaryCta.href}
                variant="secondary"
                size="lg"
              >
                {chatbotFeatureHero.secondaryCta.label}
                <ArrowDown className="size-4" />
              </Button>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-md">
            <p className="mb-3 text-[10px] font-semibold tracking-[0.14em] text-muted uppercase">
              {chatbotFeatureHero.sampleCaption}
            </p>
            <div className="relative space-y-3 sm:min-h-[14rem]">
              <svg
                className="pointer-events-none absolute top-10 left-8 hidden h-24 w-16 sm:block"
                viewBox="0 0 64 96"
                fill="none"
                aria-hidden
              >
                <path
                  data-chatbot-hero-line
                  d="M20 8 C20 48, 44 56, 44 88"
                  stroke="var(--accent)"
                  strokeWidth="1.5"
                />
              </svg>

              <div
                data-chatbot-hero-q
                className="relative z-10 rounded-2xl rounded-bl-md border border-border bg-surface p-4 shadow-[var(--shadow-soft)] sm:max-w-[90%]"
              >
                <p className="text-[10px] font-semibold tracking-[0.14em] text-muted uppercase">
                  Question
                </p>
                <p className="mt-2 font-heading text-lg leading-snug font-semibold text-pretty sm:text-xl">
                  {preset.question}
                </p>
              </div>

              <div
                data-chatbot-hero-a
                className="relative z-20 rounded-2xl rounded-tl-md border border-accent/25 bg-accent/10 p-4 sm:ml-8 sm:max-w-[92%]"
              >
                <p className="text-[10px] font-semibold tracking-[0.14em] text-accent uppercase">
                  HelpNova · Sample answer
                </p>
                <p className="mt-2 text-sm leading-relaxed text-pretty">
                  {preset.answer}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </header>
  );
}
