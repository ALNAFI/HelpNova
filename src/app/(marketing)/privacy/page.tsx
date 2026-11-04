import type { Metadata } from "next";
import { PrivacyPage } from "@/components/modules/other-pages/privacy-page";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Read HelpNova's sample privacy notice explaining local interactive demonstrations, browser preferences, and external links.",
  alternates: {
    canonical: `${siteConfig.url}/privacy`,
  },
  openGraph: {
    title: "Privacy Policy",
    description:
      "Sample privacy notice for the HelpNova concept website covering local demos, theme preferences, and demonstration forms.",
    type: "website",
    url: `${siteConfig.url}/privacy`,
  },
};

export default function Page() {
  return <PrivacyPage />;
}
