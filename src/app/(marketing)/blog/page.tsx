import type { Metadata } from "next";
import { BlogPage } from "@/components/modules/blog/blog-page";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Explore ideas, practical guides, and thoughtful perspectives on customer support, automation, and building better experiences.",
};

export default function Page() {
  return <BlogPage />;
}
