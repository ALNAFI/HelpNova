import type { Metadata } from "next";
import { TermsPage } from "@/components/modules/other-pages/terms-page";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Read HelpNova's sample Terms of Service explaining the concept website, interactive demonstrations, illustrative features, and usage guidelines.",
  alternates: {
    canonical: `${siteConfig.url}/terms`,
  },
  openGraph: {
    title: "Terms of Service",
    description:
      "Sample Terms of Service for the HelpNova concept website covering illustrative demos, pricing examples, and exploration guidelines.",
    type: "website",
    url: `${siteConfig.url}/terms`,
  },
};

export default function Page() {
  return <TermsPage />;
}
