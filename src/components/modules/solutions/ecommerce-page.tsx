import { EcommerceCta } from "@/components/modules/solutions/ecommerce-cta";
import { EcommerceDragSurface } from "@/components/modules/solutions/ecommerce-drag-surface";
import { EcommerceIntegrations } from "@/components/modules/solutions/ecommerce-integrations";
import { SmartRoutingSection } from "@/components/modules/solutions/smart-routing-section";

export function EcommercePage() {
  return (
    <>
      <EcommerceDragSurface />
      <SmartRoutingSection />
      <EcommerceIntegrations />
      <EcommerceCta />
    </>
  );
}
