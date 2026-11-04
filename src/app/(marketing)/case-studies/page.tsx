import type { Metadata } from "next";
import { CaseStudiesPage } from "@/components/modules/case-studies/case-studies-page";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Case Studies",
  description:
    "Explore illustrative HelpNova support scenarios for order tracking, billing, and technical conversations—connected through inbox, automation, and insights.",
  alternates: {
    canonical: `${siteConfig.url}/case-studies`,
  },
  openGraph: {
    title: "Case Studies",
    description:
      "Illustrative support scenarios showing how sample inquiries can move through shared conversations, routing, and insights.",
    type: "website",
    url: `${siteConfig.url}/case-studies`,
  },
};

export default function Page() {
  return <CaseStudiesPage />;
}
