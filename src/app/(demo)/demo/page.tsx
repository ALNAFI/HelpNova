import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/modules/other-pages/placeholder-page";

export const metadata: Metadata = {
  title: "Explore Demo",
};

export default function DemoPage() {
  return <PlaceholderPage title="Explore Demo" />;
}
