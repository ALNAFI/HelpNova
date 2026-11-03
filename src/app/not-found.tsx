import { PlaceholderPage } from "@/components/modules/other-pages/placeholder-page";
import { SiteFooter } from "@/components/common/site-footer";
import { SiteHeader } from "@/components/common/site-header";

export default function NotFound() {
  return (
    <div className="flex min-h-full flex-1 flex-col">
      <SiteHeader />
      <main className="flex-1">
        <PlaceholderPage title="404" />
      </main>
      <SiteFooter />
    </div>
  );
}
