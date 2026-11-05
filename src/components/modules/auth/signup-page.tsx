"use client";

import { AuthShell } from "@/components/modules/auth/auth-shell";
import { SignupForm } from "@/components/modules/auth/signup-form";

export function SignupPageView() {
  return (
    <AuthShell
      eyebrow="Get started"
      title="Create your HelpNova account."
      description="Bring your conversations, workflows, and team together."
    >
      <SignupForm />
    </AuthShell>
  );
}
