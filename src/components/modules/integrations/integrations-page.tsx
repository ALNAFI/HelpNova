import { IntegrationsCta } from "@/components/modules/integrations/integrations-cta";
import { IntegrationsDirectory } from "@/components/modules/integrations/integrations-directory";
import { IntegrationsHero } from "@/components/modules/integrations/integrations-hero";

export function IntegrationsPage() {
  return (
    <>
      <IntegrationsHero />
      <IntegrationsDirectory />
      <IntegrationsCta />
    </>
  );
}
