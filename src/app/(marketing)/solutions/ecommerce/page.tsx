import type { Metadata } from "next";
import { EcommercePage } from "@/components/modules/solutions/ecommerce-page";

export const metadata: Metadata = {
  title: "Ecommerce Customer Support",
  description:
    "Follow a delivery question from the customer’s first message through an Order rule and into the Orders team’s Inbox—then see why a billing question falls to General Triage.",
};

export default function Page() {
  return <EcommercePage />;
}
