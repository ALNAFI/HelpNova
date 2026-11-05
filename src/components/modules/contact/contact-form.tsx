"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import { ContactSubjectSelector } from "@/components/modules/contact/contact-subject-selector";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { routes } from "@/config/routes";
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

  useEffect(() => {
    if (!confirmed) return;
    const timer = window.setTimeout(() => {
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
      setErrors({});
      setConfirmed(false);
    }, 5000);
    return () => window.clearTimeout(timer);
  }, [confirmed]);

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
  };

  return (
    <section
      ref={sectionRef}
      id="contact-form"
      className="relative scroll-mt-[calc(var(--header-height)+1rem)] py-12 sm:py-16"
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
          <p className="mt-3 max-w-xl text-base leading-7 text-muted">
            {contactPageCopy.formSupport}
          </p>
        </div>

        <div className="mt-8 grid items-start gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-8">
          <div className="relative order-1 lg:order-2">
            <div
              data-contact-form-reveal
              className="rounded-[1.75rem] border border-border bg-surface p-5 shadow-[var(--shadow-soft)] sm:p-7"
            >
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
                    placeholder="Your full name"
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
                    {contactPageCopy.subjectLabel}{" "}
                    <span className="text-accent">*</span>
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
                  <label
                    htmlFor={messageId}
                    className="block text-sm font-medium"
                  >
                    Message <span className="text-accent">*</span>
                  </label>
                  <textarea
                    ref={messageRef}
                    id={messageId}
                    name="message"
                    rows={4}
                    placeholder="Tell us how we can help…"
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
                      "min-h-[7rem] resize-y py-3",
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

                <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:items-center">
                  <Button type="submit" size="lg">
                    {contactPageCopy.submitLabel}
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="lg"
                    onClick={resetForm}
                    className="px-3 text-muted hover:text-foreground"
                  >
                    {contactPageCopy.clearLabel}
                  </Button>
                </div>
              </form>
            </div>

            {confirmed ? (
              <div
                ref={confirmationRef}
                id={confirmationId}
                role="status"
                aria-live="polite"
                className="absolute top-full left-0 right-0 z-10 mt-3 flex items-center gap-2.5 rounded-[1.15rem] border border-accent/30 bg-surface px-4 py-3 text-sm font-medium text-foreground shadow-[var(--shadow-soft)]"
              >
                <CheckCircle2
                  className="size-4 shrink-0 text-accent"
                  aria-hidden
                />
                <p>{contactPageCopy.confirmationTitle}</p>
              </div>
            ) : null}
          </div>

          <aside
            data-contact-form-reveal
            className="order-2 h-fit rounded-[1.75rem] border border-border bg-surface p-6 shadow-[var(--shadow-soft)] sm:p-7 lg:sticky lg:top-[calc(var(--header-height)+1.5rem)] lg:order-1 lg:self-start"
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
            <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
              <Link
                href={routes.demo.href}
                className="inline-flex items-center gap-1 font-medium text-accent transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                {contactPageCopy.formDemoLinkLabel}
                <ArrowRight className="size-3.5" aria-hidden />
              </Link>
              <span className="text-border" aria-hidden>
                ·
              </span>
              <Link
                href={routes.faq.href}
                className="inline-flex items-center gap-1 font-medium text-accent transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                {contactPageCopy.formFaqLinkLabel}
                <ArrowRight className="size-3.5" aria-hidden />
              </Link>
            </div>
          </aside>
        </div>
      </Container>
    </section>
  );
}
