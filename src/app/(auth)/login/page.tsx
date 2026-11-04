import type { Metadata } from "next";
import { LoginPageView } from "@/components/modules/auth/login-page";

export const metadata: Metadata = {
  title: "Login",
  description:
    "Sign in to explore HelpNova’s sample customer-support experience. This interactive concept does not connect to a live account service.",
};

export default function LoginPage() {
  return <LoginPageView />;
}
