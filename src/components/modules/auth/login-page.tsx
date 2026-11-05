"use client";

import { AuthShell } from "@/components/modules/auth/auth-shell";
import { LoginForm } from "@/components/modules/auth/login-form";

export function LoginPageView() {
  return (
    <AuthShell
      eyebrow="Great to see you"
      title="Welcome back to HelpNova."
      description="Sign in to your HelpNova account."
    >
      <LoginForm />
    </AuthShell>
  );
}
