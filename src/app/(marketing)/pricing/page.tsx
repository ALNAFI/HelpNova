import type { Metadata } from "next";
import { PricingPage } from "@/components/modules/pricing/pricing-page";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Explore Essential, Team, and Scale sample plans for HelpNova—illustrative pricing with monthly and yearly views, plan comparison, and FAQ.",
};

export default function Page() {
  return <PricingPage />;
}
