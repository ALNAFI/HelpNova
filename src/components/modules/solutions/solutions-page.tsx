import { SolutionsCta } from "@/components/modules/solutions/solutions-cta";
import { SolutionsExplorer } from "@/components/modules/solutions/solutions-explorer";
import { SolutionsHero } from "@/components/modules/solutions/solutions-hero";

export function SolutionsPage() {
  return (
    <>
      <SolutionsHero />
      <SolutionsExplorer />
      <SolutionsCta />
    </>
  );
}
