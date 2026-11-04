"use client";

import { useId, useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { GoogleAuthButton } from "@/components/modules/auth/google-auth-button";
import { PasswordField } from "@/components/modules/auth/password-field";
import { PasswordRequirements } from "@/components/modules/auth/password-requirements";
import { Button } from "@/components/ui/button";
import { getSignupPasswordError } from "@/utils/password-requirements";
import {
  getEmailError,
  getNameError,
  normalizeEmail,
  normalizeName,
} from "@/utils/validators";
import { cn } from "@/utils/cn";

type FieldErrors = {
  name?: string | null;
  email?: string | null;
  password?: string | null;
};

export function SignupForm() {
  const nameId = useId();
  const emailId = useId();
  const requirementsId = useId();
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const [name, setName] = useState("");
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

    const nameError = getNameError(name);
    const emailError = getEmailError(email);
    const passwordError = getSignupPasswordError(password);
    setErrors({
      name: nameError,
      email: emailError,
      password: passwordError,
    });
    setSubmittedDemo(false);

    if (nameError || emailError || passwordError) {
      if (nameError) nameRef.current?.focus();
      else if (emailError) emailRef.current?.focus();
      else passwordRef.current?.focus();
      return;
    }

    setName(normalizeName(name));
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
            htmlFor={nameId}
            className="block text-sm font-medium text-foreground"
          >
            Full name
          </label>
          <input
            ref={nameRef}
            id={nameId}
            name="name"
            type="text"
            autoComplete="name"
            placeholder="Your full name"
            value={name}
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={errors.name ? `${nameId}-error` : undefined}
            onChange={(event) => {
              setName(event.target.value);
              clearFieldError("name");
              if (submittedDemo) setSubmittedDemo(false);
            }}
            className={cn(
              "auth-field h-12 w-full rounded-[var(--radius-control)] border bg-surface px-3.5 text-[15px] text-foreground shadow-[inset_0_1px_0_color-mix(in_oklab,white_45%,transparent)] outline-none transition-[border-color,box-shadow,background-color] placeholder:text-muted/70",
              errors.name
                ? "border-danger focus-visible:ring-2 focus-visible:ring-danger/35"
                : "border-border focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-ring/30",
            )}
          />
          {errors.name ? (
            <p id={`${nameId}-error`} role="alert" className="text-sm text-danger">
              {errors.name}
            </p>
          ) : null}
        </div>

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
            aria-describedby={errors.email ? `${emailId}-error` : undefined}
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
            <p
              id={`${emailId}-error`}
              role="alert"
              className="text-sm text-danger"
            >
              {errors.email}
            </p>
          ) : null}
        </div>

        <div data-auth-field className="space-y-3">
          <PasswordField
            label="Password"
            value={password}
            error={errors.password}
            autoComplete="new-password"
            placeholder="Create a password"
            inputRef={passwordRef}
            describedBy={requirementsId}
            onChange={(value) => {
              setPassword(value);
              clearFieldError("password");
              if (submittedDemo) setSubmittedDemo(false);
            }}
          />
          <PasswordRequirements value={password} id={requirementsId} />
        </div>

        <div data-auth-field className="pt-1">
          <Button
            type="submit"
            size="lg"
            className="w-full"
            disabled={isSubmitting}
          >
            Create Account
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

      <div role="status" aria-live="polite" className="min-h-[1px]">
        {submittedDemo ? (
          <div className="mt-5 rounded-2xl border border-border bg-surface p-4 shadow-[var(--shadow-soft)]">
            <p className="text-sm leading-6 text-foreground">
              Account creation is not available in this interactive concept. You
              can explore HelpNova&apos;s guided demo without signing up.
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
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-medium text-accent underline-offset-4 transition-colors hover:text-foreground hover:underline"
        >
          Sign In
        </Link>
      </p>
    </div>
  );
}
