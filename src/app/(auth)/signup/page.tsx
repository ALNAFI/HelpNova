import type { Metadata } from "next";
import { SignupPageView } from "@/components/modules/auth/signup-page";

export const metadata: Metadata = {
  title: "Sign Up",
  description:
    "Create a sample HelpNova account experience. This interactive concept does not register real users or store information.",
};

export default function SignupPage() {
  return <SignupPageView />;
}
