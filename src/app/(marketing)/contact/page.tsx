import type { Metadata } from "next";
import { ContactPage } from "@/components/modules/contact/contact-page";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Contact HelpNova | Questions, Ideas & Feedback",
  description:
    "Explore HelpNova's contact experience, find answers to common questions, and discover the customer-support product concept.",
  alternates: {
    canonical: `${siteConfig.url}/contact`,
  },
  openGraph: {
    title: "Contact HelpNova | Questions, Ideas & Feedback",
    description:
      "Try HelpNova's local contact demonstration, browse FAQs, and explore the product concept—no messages are sent.",
    type: "website",
    url: `${siteConfig.url}/contact`,
  },
};

export default function Page() {
  return <ContactPage />;
}
