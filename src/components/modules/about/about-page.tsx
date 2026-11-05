import { AboutCta } from "@/components/modules/about/about-cta";
import { AboutDragSurface } from "@/components/modules/about/about-drag-surface";
import { AboutManifesto } from "@/components/modules/about/about-manifesto";
import { AboutMission } from "@/components/modules/about/about-mission";
import { AboutRoles } from "@/components/modules/about/about-roles";
import { AboutValues } from "@/components/modules/about/about-values";
import { AboutVision } from "@/components/modules/about/about-vision";

export function AboutPage() {
  return (
    <div className="relative isolate">
      <AboutDragSurface />
      <AboutMission />
      <AboutValues />
      <AboutVision />
      <AboutRoles />
      <AboutManifesto />
      <AboutCta />
    </div>
  );
}
