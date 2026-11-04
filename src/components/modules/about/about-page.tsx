import { AboutCta } from "@/components/modules/about/about-cta";
import { AboutHero } from "@/components/modules/about/about-hero";
import { AboutManifesto } from "@/components/modules/about/about-manifesto";
import { AboutMission } from "@/components/modules/about/about-mission";
import { AboutRoles } from "@/components/modules/about/about-roles";
import { AboutStory } from "@/components/modules/about/about-story";
import { AboutValues } from "@/components/modules/about/about-values";
import { AboutVision } from "@/components/modules/about/about-vision";

export function AboutPage() {
  return (
    <div className="relative isolate">
      <AboutHero />
      <AboutStory />
      <AboutMission />
      <AboutValues />
      <AboutVision />
      <AboutRoles />
      <AboutManifesto />
      <AboutCta />
    </div>
  );
}
