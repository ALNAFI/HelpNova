import { CaseStudiesCta } from "@/components/modules/case-studies/case-studies-cta";
import { CaseStudiesHero } from "@/components/modules/case-studies/case-studies-hero";
import { CaseStudiesSpotlight } from "@/components/modules/case-studies/case-studies-spotlight";
import { CaseStudyGallery } from "@/components/modules/case-studies/case-study-gallery";
import { FeaturedCaseCarousel } from "@/components/modules/case-studies/featured-case-carousel";
import { WorkflowStorytelling } from "@/components/modules/case-studies/workflow-storytelling";
import {
  caseStudies,
  spotlightCaseStudy,
} from "@/data/editorial/case-studies";

export function CaseStudiesPage() {
  return (
    <div className="relative isolate overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_50%_at_50%_-8%,var(--glow),transparent_58%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[32rem] bg-grid-fade [mask-image:linear-gradient(to_bottom,black_40%,transparent_100%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute top-[24%] right-[-12%] size-[28rem] rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--accent)_14%,transparent),transparent_70%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute top-[62%] left-[-14%] size-[24rem] rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--accent)_10%,transparent),transparent_72%)]"
        aria-hidden
      />

      <CaseStudiesHero />
      <FeaturedCaseCarousel studies={caseStudies} />
      <CaseStudyGallery studies={caseStudies} />
      <WorkflowStorytelling />
      <CaseStudiesSpotlight study={spotlightCaseStudy} />
      <CaseStudiesCta />
    </div>
  );
}
