"use client";

import { useEffect, useId, useRef, useState } from "react";
import { CheckCircle2, Info, Sparkles } from "lucide-react";
import { ContactSubjectSelector } from "@/components/modules/contact/contact-subject-selector";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import {
  contactPageCopy,
  type ContactSubjectId,
} from "@/data/marketing/contact";
import { getGsap } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import {
  getEmailError,
  getMessageError,
  getNameError,
  getSubjectError,
  normalizeEmail,
  normalizeName,
} from "@/utils/validators";
import { cn } from "@/utils/cn";

type FieldErrors = {
  name?: string | null;
  email?: string | null;
  subject?: string | null;
  message?: string | null;
};

const fieldClass = (invalid?: boolean) =>
  cn(
    "w-full rounded-[var(--radius-control)] border bg-surface px-3.5 text-[15px] text-foreground outline-none transition-[border-color,box-shadow,background-color] placeholder:text-muted/70 focus-visible:ring-2",
    invalid
      ? "border-danger focus-visible:ring-danger/35"
      : "border-border focus-visible:border-accent focus-visible:ring-ring/30",
  );

export function ContactFormSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);
  const confirmationRef = useRef<HTMLDivElement>(null);
  const nameId = useId();
  const emailId = useId();
  const subjectId = useId();
  const messageId = useId();
  const confirmationId = useId();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState<ContactSubjectId | "">("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [confirmed, setConfirmed] = useState(false);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || reducedMotion) return;
    const { gsap } = getGsap();
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-contact-form-reveal]",
        { y: 16 },
        {
          y: 0,
          duration: 0.55,
          stagger: 0.06,
          ease: "power3.out",
          immediateRender: false,
          clearProps: "transform",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            once: true,
          },
        },
      );
    }, el);
    return () => ctx.revert();
  }, [reducedMotion]);

  useEffect(() => {
    if (!confirmed || reducedMotion) return;
    const panel = confirmationRef.current;
    if (!panel) return;
    const { gsap } = getGsap();
    const ctx = gsap.context(() => {
      gsap.fromTo(
        panel,
        { y: 12, autoAlpha: 0, scale: 0.98 },
        {
          y: 0,
          autoAlpha: 1,
          scale: 1,
          duration: 0.45,
          ease: "power3.out",
        },
      );
    }, panel);
    return () => ctx.revert();
  }, [confirmed, reducedMotion]);

  const clearFieldError = (field: keyof FieldErrors) => {
    setErrors((current) => {
      if (!current[field]) return current;
      return { ...current, [field]: null };
    });
  };

  const resetForm = () => {
    setName("");
    setEmail("");
    setSubject("");
    setMessage("");
    setErrors({});
    setConfirmed(false);
    nameRef.current?.focus();
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors: FieldErrors = {
      name: getNameError(name),
      email: getEmailError(email),
      subject: getSubjectError(subject),
      message: getMessageError(message),
    };
    setErrors(nextErrors);
    setConfirmed(false);

    if (
      nextErrors.name ||
      nextErrors.email ||
      nextErrors.subject ||
      nextErrors.message
    ) {
      if (nextErrors.name) nameRef.current?.focus();
      else if (nextErrors.email) emailRef.current?.focus();
      else if (nextErrors.subject) {
        const firstSubject = sectionRef.current?.querySelector<HTMLButtonElement>(
          '[role="radio"]',
        );
        firstSubject?.focus();
      } else messageRef.current?.focus();
      return;
    }

    setName(normalizeName(name));
    setEmail(normalizeEmail(email));
    setMessage(message.trim());
    setConfirmed(true);
    window.requestAnimationFrame(() => {
      confirmationRef.current?.focus();
    });
  };

  return (
    <section
      ref={sectionRef}
      id="contact-form"
      className="relative py-12 sm:py-16"
      aria-labelledby="contact-form-heading"
    >
      <Container>
        <div className="max-w-2xl" data-contact-form-reveal>
          <h2
            id="contact-form-heading"
            className="font-heading text-[1.85rem] font-semibold tracking-tight text-balance sm:text-[2.35rem]"
          >
            {contactPageCopy.formTitle}
          </h2>
          <p className="mt-3 text-base leading-7 text-muted">
            {contactPageCopy.formSupport}
          </p>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-8">
          <aside
            data-contact-form-reveal
            className="rounded-[1.75rem] border border-border bg-surface p-6 shadow-[var(--shadow-soft)] sm:p-7"
          >
            <span className="inline-flex size-11 items-center justify-center rounded-2xl border border-accent/25 bg-accent-soft text-accent">
              <Sparkles className="size-5" aria-hidden />
            </span>
            <h3 className="mt-5 font-heading text-xl font-semibold tracking-tight">
              {contactPageCopy.formIntroTitle}
            </h3>
            <p className="mt-3 text-sm leading-7 text-muted">
              {contactPageCopy.formIntroBody}
            </p>
            <div className="mt-6 rounded-[1.2rem] border border-accent/25 bg-accent-soft/45 px-4 py-3 text-sm text-foreground">
              <p className="flex items-start gap-2">
                <Info className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden />
                <span>{contactPageCopy.formNotice}</span>
              </p>
            </div>
            <div className="mt-6 overflow-hidden rounded-[1.25rem] border border-border bg-surface-muted/40 p-4" aria-hidden>
              <div className="rounded-2xl bg-accent px-4 py-3 text-sm text-accent-foreground">
                Exploring HelpNova&apos;s contact interface…
              </div>
              <div className="mt-3 rounded-2xl border border-border bg-surface px-4 py-3 text-sm text-muted">
                Local preview only. No inbox delivery.
              </div>
            </div>
          </aside>

          <div
            data-contact-form-reveal
            className="rounded-[1.75rem] border border-border bg-surface p-5 shadow-[var(--shadow-soft)] sm:p-7"
          >
            {confirmed ? (
              <div
                ref={confirmationRef}
                id={confirmationId}
                tabIndex={-1}
                role="status"
                aria-live="polite"
                className="outline-none"
              >
                <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
                  <span className="inline-flex size-14 items-center justify-center rounded-2xl bg-accent text-accent-foreground">
                    <CheckCircle2 className="size-7" aria-hidden />
                  </span>
                  <div>
                    <h3 className="font-heading text-2xl font-semibold tracking-tight">
                      {contactPageCopy.confirmationTitle}
                    </h3>
                    <p className="mt-2 text-sm leading-7 text-muted">
                      {contactPageCopy.confirmationDescription}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-muted">
                      {contactPageCopy.confirmationHint}
                    </p>
                  </div>
                </div>
                <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                  <Button type="button" onClick={resetForm} size="lg">
                    {contactPageCopy.startAgainLabel}
                  </Button>
                  <Button href="/demo" variant="secondary" size="lg">
                    Explore Demo
                  </Button>
                </div>
              </div>
            ) : (
              <form noValidate onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <label htmlFor={nameId} className="block text-sm font-medium">
                    Full name <span className="text-accent">*</span>
                  </label>
                  <input
                    ref={nameRef}
                    id={nameId}
                    name="name"
                    type="text"
                    autoComplete="name"
                    placeholder="Alex Morgan"
                    value={name}
                    aria-invalid={errors.name ? true : undefined}
                    aria-describedby={
                      errors.name ? `${nameId}-error` : undefined
                    }
                    onBlur={() => {
                      if (!name && !errors.name) return;
                      setErrors((current) => ({
                        ...current,
                        name: getNameError(name),
                      }));
                    }}
                    onChange={(event) => {
                      setName(event.target.value);
                      clearFieldError("name");
                    }}
                    className={cn(fieldClass(Boolean(errors.name)), "h-12")}
                  />
                  {errors.name ? (
                    <p
                      id={`${nameId}-error`}
                      role="alert"
                      className="text-sm text-danger"
                    >
                      {errors.name}
                    </p>
                  ) : null}
                </div>

                <div className="space-y-2">
                  <label htmlFor={emailId} className="block text-sm font-medium">
                    Email address <span className="text-accent">*</span>
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
                    onBlur={() => {
                      if (!email && !errors.email) return;
                      setErrors((current) => ({
                        ...current,
                        email: getEmailError(email),
                      }));
                    }}
                    onChange={(event) => {
                      setEmail(event.target.value);
                      clearFieldError("email");
                    }}
                    className={cn(fieldClass(Boolean(errors.email)), "h-12")}
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

                <div className="space-y-2">
                  <p id={subjectId} className="block text-sm font-medium">
                    Subject <span className="text-accent">*</span>
                  </p>
                  <ContactSubjectSelector
                    value={subject}
                    labelledBy={subjectId}
                    describedBy={
                      errors.subject ? `${subjectId}-error` : undefined
                    }
                    error={errors.subject}
                    onChange={(value) => {
                      setSubject(value);
                      clearFieldError("subject");
                    }}
                  />
                  {errors.subject ? (
                    <p
                      id={`${subjectId}-error`}
                      role="alert"
                      className="text-sm text-danger"
                    >
                      {errors.subject}
                    </p>
                  ) : null}
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-3">
                    <label
                      htmlFor={messageId}
                      className="block text-sm font-medium"
                    >
                      Message <span className="text-accent">*</span>
                    </label>
                    <span className="text-xs text-muted">
                      {message.trim().length} characters
                    </span>
                  </div>
                  <textarea
                    ref={messageRef}
                    id={messageId}
                    name="message"
                    rows={6}
                    placeholder="Share a question, idea, or note about the HelpNova concept…"
                    value={message}
                    aria-invalid={errors.message ? true : undefined}
                    aria-describedby={
                      errors.message ? `${messageId}-error` : undefined
                    }
                    onBlur={() => {
                      if (!message && !errors.message) return;
                      setErrors((current) => ({
                        ...current,
                        message: getMessageError(message),
                      }));
                    }}
                    onChange={(event) => {
                      setMessage(event.target.value);
                      clearFieldError("message");
                    }}
                    className={cn(
                      fieldClass(Boolean(errors.message)),
                      "min-h-[9.5rem] resize-y py-3",
                    )}
                  />
                  {errors.message ? (
                    <p
                      id={`${messageId}-error`}
                      role="alert"
                      className="text-sm text-danger"
                    >
                      {errors.message}
                    </p>
                  ) : null}
                </div>

                <div className="flex flex-col gap-3 pt-1 sm:flex-row">
                  <Button type="submit" size="lg">
                    {contactPageCopy.submitLabel}
                  </Button>
                  <Button
                    type="button"
                    variant="secondary"
                    size="lg"
                    onClick={resetForm}
                  >
                    {contactPageCopy.clearLabel}
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
