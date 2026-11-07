import { IntegrationsCta } from "@/components/modules/integrations/integrations-cta";
import { IntegrationsDragSurface } from "@/components/modules/integrations/integrations-drag-surface";

export function IntegrationsPage() {
  return (
    <>
      <IntegrationsDragSurface />
      <IntegrationsCta />
    </>
  );
}
