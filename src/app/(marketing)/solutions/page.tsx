import type { Metadata } from "next";
import { SolutionsPage } from "@/components/modules/solutions/solutions-page";

export const metadata: Metadata = {
  title: "Solutions Overview",
  description:
    "Explore ecommerce, SaaS, and services support journeys—from a customer question to the team that owns it and where it appears in sample workload.",
};

export default function Page() {
  return <SolutionsPage />;
}
