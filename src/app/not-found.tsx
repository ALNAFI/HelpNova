import { SiteHeader } from "@/components/common/site-header";
import { NotFoundView } from "@/components/modules/other-pages/not-found-view";

export default function NotFound() {
  return (
    <div className="flex min-h-full flex-1 flex-col bg-background">
      <SiteHeader />
      <main className="flex flex-1 flex-col">
        <NotFoundView />
      </main>
    </div>
  );
}
