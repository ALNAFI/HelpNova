import type { Metadata } from "next";
import { IntegrationsPage } from "@/components/modules/integrations/integrations-page";

export const metadata: Metadata = {
  title: "Integrations",
  description:
    "Explore 12 illustrative integrations across commerce, communication, support, and team knowledge.",
};

export default function Page() {
  return <IntegrationsPage />;
}
