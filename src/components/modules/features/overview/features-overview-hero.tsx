import { ArrowDown, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { FeaturesHeroIllustration } from "@/components/modules/features/features-hero-illustration";
import { featuresOverviewHero } from "@/data/marketing/features-overview";

export function FeaturesOverviewHero() {
  return (
    <header className="relative overflow-hidden pt-12 pb-14 sm:pt-16 sm:pb-16 lg:pb-20">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_75%_0%,var(--glow),transparent_60%)]" />
        <div
          className="absolute inset-0 [mask-image:linear-gradient(to_bottom,black_40%,transparent)]"
          style={{
            backgroundImage:
              "linear-gradient(to right, color-mix(in oklab, var(--foreground) 4%, transparent) 1px, transparent 1px), linear-gradient(to bottom, color-mix(in oklab, var(--foreground) 4%, transparent) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      <Container className="relative">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
          <div className="max-w-xl">
            <p className="text-xs font-semibold tracking-[0.18em] text-accent uppercase">
              {featuresOverviewHero.eyebrow}
            </p>
            <h1 className="mt-4 font-heading text-[2.2rem] leading-[1.08] font-semibold tracking-tight text-balance sm:text-[3.1rem] lg:text-[3.4rem]">
              {featuresOverviewHero.title}
            </h1>
            <p className="mt-5 max-w-lg text-base leading-8 text-muted sm:text-[1.05rem] sm:leading-8">
              {featuresOverviewHero.description}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href={featuresOverviewHero.primaryCta.href} size="lg">
                {featuresOverviewHero.primaryCta.label}
                <ArrowRight className="size-4" />
              </Button>
              <Button
                href={featuresOverviewHero.secondaryCta.href}
                variant="secondary"
                size="lg"
              >
                {featuresOverviewHero.secondaryCta.label}
                <ArrowDown className="size-4" />
              </Button>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[560px]">
            <FeaturesHeroIllustration className="w-full max-w-[560px]" />
          </div>
        </div>
      </Container>
    </header>
  );
}
