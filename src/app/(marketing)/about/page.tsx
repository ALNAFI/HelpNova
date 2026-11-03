import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/modules/other-pages/placeholder-page";

export const metadata: Metadata = {
  title: "About Us",
};

export default function Page() {
  return <PlaceholderPage title="About Us" />;
}
