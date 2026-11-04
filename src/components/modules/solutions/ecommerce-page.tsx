import { EcommerceCta } from "@/components/modules/solutions/ecommerce-cta";
import { EcommerceHero } from "@/components/modules/solutions/ecommerce-hero";
import { EcommerceInquiry } from "@/components/modules/solutions/ecommerce-inquiry";
import { EcommerceIntegrations } from "@/components/modules/solutions/ecommerce-integrations";
import { EcommerceWalkthrough } from "@/components/modules/solutions/ecommerce-walkthrough";

export function EcommercePage() {
  return (
    <>
      <EcommerceHero />
      <EcommerceInquiry />
      <EcommerceWalkthrough />
      <EcommerceIntegrations />
      <EcommerceCta />
    </>
  );
}
