import type { Metadata } from "next";
import { NotFoundView } from "@/components/modules/other-pages/not-found-view";

export const metadata: Metadata = {
  title: "404",
};

export default function Page() {
  return <NotFoundView />;
}
