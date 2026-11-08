import type { Metadata } from "next";
import { SiteHeader } from "@/components/common/site-header";
import { NotFoundHero } from "@/components/modules/other-pages/not-found-hero";

export const metadata: Metadata = {
  title: "404 – Page not found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div className="flex min-h-full flex-1 flex-col bg-background">
      <SiteHeader />
      <main className="flex flex-1 flex-col">
        <NotFoundHero />
      </main>
    </div>
  );
}
