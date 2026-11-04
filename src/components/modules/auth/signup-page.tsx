"use client";

import { AuthShell } from "@/components/modules/auth/auth-shell";
import { SignupForm } from "@/components/modules/auth/signup-form";

export function SignupPageView() {
  return (
    <AuthShell
      eyebrow="Get started"
      title="Explore a smarter way to support."
      description="Discover connected conversations, intelligent workflows, and meaningful insights—all in one interactive experience."
    >
      <SignupForm />
    </AuthShell>
  );
}
