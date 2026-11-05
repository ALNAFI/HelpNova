"use client";

import { useEffect, useRef } from "react";
import { Container } from "@/components/ui/container";
import { aboutPageCopy, aboutRoles } from "@/data/marketing/about";
import { getGsap } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { cn } from "@/utils/cn";

type RoleId = (typeof aboutRoles)[number]["id"];

export function AboutRoles() {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || reducedMotion) return;
    const { gsap } = getGsap();
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-role-card]",
        { y: 20, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.55,
          stagger: 0.07,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 80%" },
        },
      );
    }, el);
    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-x-clip py-16 sm:py-20"
      aria-labelledby="about-roles-heading"
    >
      <Container>
        <div className="max-w-2xl">
          <p className="text-xs font-semibold tracking-[0.16em] text-accent uppercase">
            {aboutPageCopy.rolesEyebrow}
          </p>
          <h2
            id="about-roles-heading"
            className="mt-3 font-heading text-[1.85rem] font-semibold tracking-tight text-balance sm:text-[2.35rem]"
          >
            {aboutPageCopy.rolesTitle}
          </h2>
          <p className="mt-4 text-base leading-7 text-muted">
            {aboutPageCopy.rolesDescription}
          </p>
        </div>

        <ul className="mt-8 grid list-none grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {aboutRoles.map((role) => (
            <li
              key={role.id}
              data-role-card
              className={cn(
                "flex h-full flex-col overflow-hidden rounded-[1.45rem] border border-border bg-surface p-5 shadow-[var(--shadow-soft)] sm:p-6",
                "transition-[border-color,box-shadow] duration-300 hover:border-accent/30",
              )}
            >
              <RoleVisual roleId={role.id} />
              <p className="mt-5 font-mono text-[11px] tracking-wide text-accent">
                {role.number}
              </p>
              <h3 className="mt-2 font-heading text-lg font-semibold tracking-tight">
                {role.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-muted">
                {role.description}
              </p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

function RoleVisual({ roleId }: { roleId: RoleId }) {
  return (
    <div
      className="relative h-28 overflow-hidden rounded-[1.15rem] border border-border bg-gradient-to-br from-accent/25 via-accent-soft to-transparent"
      aria-hidden
    >
      {roleId === "product" ? <ProductBoardVisual /> : null}
      {roleId === "design" ? <DesignWireframeVisual /> : null}
      {roleId === "engineering" ? <EngineeringCodeVisual /> : null}
      {roleId === "customer" ? <CustomerConversationVisual /> : null}
    </div>
  );
}

function ProductBoardVisual() {
  return (
    <svg viewBox="0 0 200 112" className="absolute inset-0 size-full" preserveAspectRatio="xMidYMid meet">
      <rect x="18" y="16" width="50" height="80" rx="10" fill="var(--surface)" fillOpacity="0.7" stroke="var(--accent)" strokeOpacity="0.28" />
      <rect x="75" y="16" width="50" height="80" rx="10" fill="var(--surface)" fillOpacity="0.55" stroke="var(--accent)" strokeOpacity="0.22" />
      <rect x="132" y="16" width="50" height="80" rx="10" fill="var(--surface)" fillOpacity="0.4" stroke="var(--border-strong)" strokeOpacity="0.55" />
      <rect x="26" y="26" width="34" height="8" rx="4" fill="var(--accent)" fillOpacity="0.75" />
      <rect x="26" y="42" width="34" height="18" rx="6" fill="var(--accent-soft)" stroke="var(--accent)" strokeOpacity="0.35" />
      <rect x="26" y="66" width="34" height="14" rx="6" fill="var(--surface)" stroke="var(--accent)" strokeOpacity="0.25" />
      <rect x="83" y="26" width="34" height="8" rx="4" fill="var(--accent)" fillOpacity="0.45" />
      <rect x="83" y="42" width="34" height="22" rx="6" fill="var(--accent-soft)" stroke="var(--accent)" strokeOpacity="0.3" />
      <rect x="83" y="70" width="34" height="12" rx="6" fill="var(--surface)" stroke="var(--accent)" strokeOpacity="0.2" />
      <rect x="140" y="26" width="34" height="8" rx="4" fill="var(--accent)" fillOpacity="0.28" />
      <rect x="140" y="42" width="34" height="16" rx="6" fill="var(--surface)" stroke="var(--border-strong)" strokeOpacity="0.45" />
    </svg>
  );
}

function DesignWireframeVisual() {
  return (
    <svg viewBox="0 0 200 112" className="absolute inset-0 size-full" preserveAspectRatio="xMidYMid meet">
      <rect x="22" y="14" width="156" height="84" rx="12" fill="var(--surface)" fillOpacity="0.65" stroke="var(--accent)" strokeOpacity="0.28" />
      <rect x="34" y="26" width="48" height="8" rx="4" fill="var(--accent)" fillOpacity="0.7" />
      <rect x="34" y="42" width="132" height="6" rx="3" fill="var(--accent)" fillOpacity="0.22" />
      <rect x="34" y="54" width="98" height="6" rx="3" fill="var(--accent)" fillOpacity="0.16" />
      <rect x="34" y="70" width="58" height="16" rx="8" fill="var(--accent-soft)" stroke="var(--accent)" strokeOpacity="0.4" />
      <rect x="100" y="70" width="58" height="16" rx="8" fill="var(--surface)" stroke="var(--accent)" strokeOpacity="0.25" />
      <circle cx="158" cy="30" r="5" fill="var(--accent)" fillOpacity="0.55" />
    </svg>
  );
}

function EngineeringCodeVisual() {
  return (
    <svg viewBox="0 0 200 112" className="absolute inset-0 size-full" preserveAspectRatio="xMidYMid meet">
      <rect x="22" y="16" width="156" height="80" rx="12" fill="var(--surface)" fillOpacity="0.6" stroke="var(--accent)" strokeOpacity="0.28" />
      <rect x="34" y="28" width="18" height="6" rx="3" fill="var(--accent)" fillOpacity="0.75" />
      <rect x="56" y="28" width="42" height="6" rx="3" fill="var(--accent)" fillOpacity="0.35" />
      <rect x="102" y="28" width="28" height="6" rx="3" fill="var(--accent-soft)" stroke="var(--accent)" strokeOpacity="0.35" />
      <rect x="42" y="44" width="24" height="6" rx="3" fill="var(--accent)" fillOpacity="0.55" />
      <rect x="70" y="44" width="56" height="6" rx="3" fill="var(--accent)" fillOpacity="0.22" />
      <rect x="42" y="60" width="36" height="6" rx="3" fill="var(--accent)" fillOpacity="0.4" />
      <rect x="82" y="60" width="48" height="6" rx="3" fill="var(--accent)" fillOpacity="0.18" />
      <rect x="34" y="76" width="14" height="6" rx="3" fill="var(--accent)" fillOpacity="0.65" />
      <rect x="52" y="76" width="64" height="6" rx="3" fill="var(--accent)" fillOpacity="0.28" />
    </svg>
  );
}

function CustomerConversationVisual() {
  return (
    <svg viewBox="0 0 200 112" className="absolute inset-0 size-full" preserveAspectRatio="xMidYMid meet">
      <rect x="22" y="18" width="96" height="34" rx="12" fill="var(--surface)" fillOpacity="0.75" stroke="var(--accent)" strokeOpacity="0.28" />
      <rect x="34" y="28" width="58" height="6" rx="3" fill="var(--accent)" fillOpacity="0.35" />
      <rect x="34" y="38" width="40" height="5" rx="2.5" fill="var(--accent)" fillOpacity="0.18" />
      <rect x="82" y="58" width="96" height="34" rx="12" fill="var(--accent-soft)" stroke="var(--accent)" strokeOpacity="0.4" />
      <rect x="94" y="68" width="62" height="6" rx="3" fill="var(--accent)" fillOpacity="0.55" />
      <rect x="94" y="78" width="44" height="5" rx="2.5" fill="var(--accent)" fillOpacity="0.28" />
      <circle cx="40" cy="92" r="7" fill="var(--accent)" fillOpacity="0.45" />
      <circle cx="164" cy="30" r="7" fill="var(--accent)" fillOpacity="0.7" />
    </svg>
  );
}
