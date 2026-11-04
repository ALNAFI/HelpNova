"use client";

import { useId, useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { GoogleAuthButton } from "@/components/modules/auth/google-auth-button";
import { PasswordField } from "@/components/modules/auth/password-field";
import { Button } from "@/components/ui/button";
import { getEmailError, getPasswordError, normalizeEmail } from "@/utils/validators";
import { cn } from "@/utils/cn";

type FieldErrors = {
  email?: string | null;
  password?: string | null;
};

export function LoginForm() {
  const emailId = useId();
  const feedbackId = useId();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submittedDemo, setSubmittedDemo] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const clearFieldError = (field: keyof FieldErrors) => {
    setErrors((current) => {
      if (!current[field]) return current;
      return { ...current, [field]: null };
    });
  };

  const showDemoFeedback = () => {
    setIsSubmitting(true);
    setSubmittedDemo(true);
    window.setTimeout(() => setIsSubmitting(false), 250);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) return;

    const emailError = getEmailError(email);
    const passwordError = getPasswordError(password);
    setErrors({
      email: emailError,
      password: passwordError,
    });
    setSubmittedDemo(false);

    if (emailError || passwordError) {
      if (emailError) emailRef.current?.focus();
      else passwordRef.current?.focus();
      return;
    }

    setEmail(normalizeEmail(email));
    showDemoFeedback();
  };

  const handleGoogleClick = () => {
    if (isSubmitting) return;
    setErrors({});
    showDemoFeedback();
  };

  return (
    <div className="w-full">
      <form noValidate onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-2" data-auth-field>
          <label
            htmlFor={emailId}
            className="block text-sm font-medium text-foreground"
          >
            Email address
          </label>
          <input
            ref={emailRef}
            id={emailId}
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder="you@example.com"
            value={email}
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={
              errors.email ? `${emailId}-error` : undefined
            }
            onChange={(event) => {
              setEmail(event.target.value);
              clearFieldError("email");
              if (submittedDemo) setSubmittedDemo(false);
            }}
            className={cn(
              "auth-field h-12 w-full rounded-[var(--radius-control)] border bg-surface px-3.5 text-[15px] text-foreground shadow-[inset_0_1px_0_color-mix(in_oklab,white_45%,transparent)] outline-none transition-[border-color,box-shadow,background-color] placeholder:text-muted/70",
              errors.email
                ? "border-danger focus-visible:ring-2 focus-visible:ring-danger/35"
                : "border-border focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-ring/30",
            )}
          />
          {errors.email ? (
            <p id={`${emailId}-error`} role="alert" className="text-sm text-danger">
              {errors.email}
            </p>
          ) : null}
        </div>

        <div data-auth-field>
          <PasswordField
            label="Password"
            value={password}
            error={errors.password}
            inputRef={passwordRef}
            onChange={(value) => {
              setPassword(value);
              clearFieldError("password");
              if (submittedDemo) setSubmittedDemo(false);
            }}
          />
        </div>

        <div data-auth-field className="pt-1">
          <Button
            type="submit"
            size="lg"
            className="w-full"
            disabled={isSubmitting}
          >
            Sign In
          </Button>
        </div>
      </form>

      <div
        data-auth-field
        className="my-5 flex items-center gap-3"
        aria-hidden
      >
        <span className="h-px flex-1 bg-border" />
        <span className="text-xs font-medium tracking-wide text-muted uppercase">
          or
        </span>
        <span className="h-px flex-1 bg-border" />
      </div>

      <div data-auth-field>
        <GoogleAuthButton
          label="Connect with Google"
          onClick={handleGoogleClick}
          disabled={isSubmitting}
        />
      </div>

      <div
        id={feedbackId}
        role="status"
        aria-live="polite"
        className="min-h-[1px]"
      >
        {submittedDemo ? (
          <div className="mt-5 rounded-2xl border border-border bg-surface p-4 shadow-[var(--shadow-soft)]">
            <p className="text-sm leading-6 text-foreground">
              Sign-in is not available in this interactive concept. You can
              explore the guided demo without an account.
            </p>
            <div className="mt-3">
              <Button href="/demo" size="md">
                Explore Demo
                <ArrowUpRight className="size-4" aria-hidden />
              </Button>
            </div>
          </div>
        ) : null}
      </div>

      <p data-auth-field className="mt-6 text-center text-sm text-muted">
        Don&apos;t have an account?{" "}
        <Link
          href="/signup"
          className="font-medium text-accent underline-offset-4 transition-colors hover:text-foreground hover:underline"
        >
          Create an account
        </Link>
      </p>
    </div>
  );
}
