"use client";

import { AuthShell } from "@/components/modules/auth/auth-shell";
import { LoginForm } from "@/components/modules/auth/login-form";

export function LoginPageView() {
  return (
    <AuthShell
      eyebrow="Welcome back"
      title="Welcome back to HelpNova."
      description="Explore a smarter way to organize conversations, automate workflows, and understand support."
    >
      <LoginForm />
    </AuthShell>
  );
}
