import type { Metadata } from "next";
import { NotFoundHero } from "@/components/modules/other-pages/not-found-hero";

export const metadata: Metadata = {
  title: "404 – Page not found",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <NotFoundHero />;
}
