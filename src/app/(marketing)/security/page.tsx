import type { Metadata } from "next";
import { SecurityPage } from "@/components/modules/other-pages/security-page";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Security",
  description:
    "Read HelpNova's sample security overview explaining local demonstrations, concept boundaries, and honest exploration guidelines.",
  alternates: {
    canonical: `${siteConfig.url}/security`,
  },
  openGraph: {
    title: "Security",
    description:
      "Sample security overview for the HelpNova concept website covering local demos, contained preferences, and clear product boundaries.",
    type: "website",
    url: `${siteConfig.url}/security`,
  },
};

export default function Page() {
  return <SecurityPage />;
}
