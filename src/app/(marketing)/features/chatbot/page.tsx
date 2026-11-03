import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/modules/other-pages/placeholder-page";

export const metadata: Metadata = {
  title: "Chatbot",
};

export default function Page() {
  return <PlaceholderPage title="Chatbot" />;
}
