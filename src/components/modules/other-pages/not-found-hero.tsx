"use client";

import { useId } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import "./not-found-hero.css";

export function NotFoundHero() {
  const gradientId = `nf-dk-${useId().replace(/:/g, "")}`;

  return (
    <section className="nf-hero" aria-labelledby="not-found-heading">
      <div className="nf-hero__in">
        <div className="nf-hero__rise">
          <div className="nf-hero__eb">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="12" cy="12" r="9" />
              <path d="m15.5 8.5-2 5-5 2 2-5z" />
            </svg>
            404 — Page not found
          </div>
          <div className="nf-hero__num" aria-hidden="true">
            404
          </div>
          <h1 id="not-found-heading" className="nf-hero__title">
            Oops! You’ve wandered off the map.
          </h1>
          <p className="nf-hero__copy">
            The page you’re looking for may have moved, disappeared, or never
            existed. Don’t worry, there’s still plenty to explore.
          </p>
          <div className="nf-hero__btns">
            <Button href="/" size="lg">
              Back Home
              <ArrowRight className="size-4" aria-hidden />
            </Button>
            <Button href="/demo" variant="secondary" size="lg">
              Explore Demo
            </Button>
          </div>
        </div>

        <div className="nf-hero__vis">
          <div
            className="nf-radar"
            role="img"
            aria-label="Animated radar searching for a page that cannot be found"
          >
            <div className="nf-radar__sweep" />
            <svg viewBox="0 0 480 480" aria-hidden="true">
              <defs>
                <radialGradient id={gradientId}>
                  <stop
                    offset="0"
                    stopColor="var(--nf-card2)"
                    stopOpacity=".55"
                  />
                  <stop
                    offset="1"
                    stopColor="var(--nf-card)"
                    stopOpacity=".1"
                  />
                </radialGradient>
              </defs>
              <circle cx="240" cy="240" r="200" fill={`url(#${gradientId})`} />
              <circle className="nf-radar__ring" cx="240" cy="240" r="215" />
              <circle className="nf-radar__ring" cx="240" cy="240" r="200" />
              <g className="nf-radar__spin">
                <circle
                  cx="240"
                  cy="240"
                  r="215"
                  fill="none"
                  stroke="var(--nf-accent)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeDasharray="620 731"
                />
              </g>
              <g className="nf-radar__spinr">
                <circle
                  cx="240"
                  cy="240"
                  r="150"
                  fill="none"
                  stroke="var(--nf-muted)"
                  strokeOpacity=".5"
                  strokeWidth="1.2"
                  strokeDasharray="1 7"
                />
              </g>
              <line
                className="nf-radar__diag"
                x1="105"
                y1="375"
                x2="378"
                y2="105"
              />

              <circle
                className="nf-radar__blip"
                cx="353"
                cy="199"
                r="3.5"
                style={{ animationDelay: "-4.83s" }}
              />
              <circle
                className="nf-radar__blip"
                cx="184"
                cy="395"
                r="3.5"
                style={{ animationDelay: "-2.67s" }}
              />
              <circle
                className="nf-radar__blip"
                cx="158"
                cy="183"
                r="3.5"
                style={{ animationDelay: "-0.92s" }}
              />

              <g transform="translate(240 240)">
                <circle className="nf-radar__pr" r="5" />
                <circle className="nf-radar__pr nf-radar__pr--b" r="5" />
                <path className="nf-radar__ch" d="M-22 -4 L22 4 M-4 22 L4 -22" />
                <circle r="5.5" fill="var(--nf-accent)" />
              </g>

              <g className="nf-radar__orb">
                <g transform="translate(455 240)">
                  <circle className="nf-radar__halo" r="24" />
                  <circle
                    r="17"
                    fill="var(--nf-card2)"
                    stroke="var(--nf-accent)"
                    strokeOpacity=".5"
                  />
                  <circle r="7" fill="var(--nf-accent)" />
                </g>
              </g>

              <g transform="translate(92 100)">
                <g
                  className="nf-radar__spin"
                  style={{
                    transformOrigin: "0 0",
                    animationDuration: "30s",
                  }}
                >
                  <circle
                    r="26"
                    fill="none"
                    stroke="var(--nf-line)"
                    strokeWidth="1.4"
                  />
                  <path
                    className="nf-radar__ch"
                    d="M-38 0H-12M12 0H38M0 -38V-12M0 12V38"
                  />
                </g>
              </g>
            </svg>

            <div className="nf-radar__chip nf-radar__chip--lost">
              <span className="nf-radar__dot" />
              <div>
                <b>Signal lost</b>
                <small>/missing-page</small>
              </div>
            </div>
            <div className="nf-radar__chip nf-radar__chip--search">
              <b>
                Searching
                <span className="nf-radar__dots">
                  <i />
                  <i />
                  <i />
                </span>
              </b>
              <div className="nf-radar__bar">
                <i />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
