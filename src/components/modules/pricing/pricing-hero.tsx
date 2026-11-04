"use client";

import { Sparkles } from "lucide-react";
import { pricingPageCopy } from "@/data/marketing/pricing";

export function PricingHero() {
  return (
    <header className="relative mx-auto max-w-3xl pt-10 text-center sm:pt-14 lg:pt-16">
      <div
        className="pointer-events-none absolute top-0 left-1/2 h-56 w-[min(100%,36rem)] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--accent)_28%,transparent),transparent_70%)] blur-2xl"
        aria-hidden
      />
      <div
        data-pricing-hero="eyebrow"
        className="relative mb-5 inline-flex items-center gap-2 rounded-full border border-border/80 bg-surface/70 px-3.5 py-1.5 text-xs font-semibold tracking-[0.14em] text-muted uppercase shadow-[var(--shadow-soft)] backdrop-blur-md"
      >
        <Sparkles className="size-3.5 text-accent" aria-hidden />
        {pricingPageCopy.eyebrow}
      </div>
      <h1
        data-pricing-hero="title"
        className="relative font-heading text-[2.15rem] font-semibold leading-[1.08] tracking-tight text-balance sm:text-5xl lg:text-[3.4rem]"
      >
        <span className="text-foreground">{pricingPageCopy.titleBefore} </span>
        <span className="bg-gradient-to-r from-accent via-[#8b5cf6] to-[#c4b5fd] bg-clip-text text-transparent dark:from-[#c4b5fd] dark:via-accent dark:to-[#ddd6fe]">
          {pricingPageCopy.titleAccent}
        </span>
      </h1>
      <p
        data-pricing-hero="copy"
        className="relative mx-auto mt-5 max-w-2xl text-base leading-7 text-pretty text-muted sm:text-[1.0625rem] sm:leading-8"
      >
        {pricingPageCopy.description}
      </p>
    </header>
  );
}
