import type { Metadata } from "next";
import { AboutPage } from "@/components/modules/about/about-page";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "About HelpNova | Our Story, Mission & Values",
  description:
    "Discover the thinking behind HelpNova, a customer-support product concept exploring connected conversations, thoughtful workflows, and meaningful insights.",
  alternates: {
    canonical: `${siteConfig.url}/about`,
  },
  openGraph: {
    title: "About HelpNova | Our Story, Mission & Values",
    description:
      "Explore HelpNova's story, mission, values, and product vision as an independent customer-support concept.",
    type: "website",
    url: `${siteConfig.url}/about`,
  },
};

export default function Page() {
  return <AboutPage />;
}
