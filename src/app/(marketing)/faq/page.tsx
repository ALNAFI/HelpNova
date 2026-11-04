import type { Metadata } from "next";
import { FaqPage } from "@/components/modules/faq/faq-page";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "FAQ",
  description: `Answers about ${siteConfig.name}, the interactive demo, pricing samples, and how this concept experience works.`,
};

export default function Page() {
  return <FaqPage />;
}
