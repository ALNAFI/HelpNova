import { EcommerceCta } from "@/components/modules/solutions/ecommerce-cta";
import { EcommerceDragSurface } from "@/components/modules/solutions/ecommerce-drag-surface";
import { EcommerceIntegrations } from "@/components/modules/solutions/ecommerce-integrations";
import { EcommerceWalkthrough } from "@/components/modules/solutions/ecommerce-walkthrough";

export function EcommercePage() {
  return (
    <>
      <EcommerceDragSurface />
      <EcommerceWalkthrough />
      <EcommerceIntegrations />
      <EcommerceCta />
    </>
  );
}
