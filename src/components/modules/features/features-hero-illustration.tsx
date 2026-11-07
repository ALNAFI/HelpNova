import { cn } from "@/utils/cn";
import "./features-hero-illustration.css";

export function FeaturesHeroIllustration({
  className,
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 680 340"
      role="img"
      aria-label="A customer message is triaged, assigned to the Orders team, resolved, and the team workload drops by one."
      className={cn("fhi h-auto w-full", className)}
    >
      <title>Inquiry flow illustration</title>

      <path
        d="M110 148V196"
        fill="none"
        strokeWidth="1.5"
        className="fhi-dash fhi-stroke-line"
      />
      <path
        d="M144 230C170 230 175 212 200 212"
        fill="none"
        strokeWidth="1.5"
        className="fhi-dash fhi-stroke-accent"
      />
      <path
        d="M144 230C170 230 175 274 200 274"
        fill="none"
        strokeWidth="1.5"
        className="fhi-dash fhi-stroke-line"
      />
      <path
        d="M390 212C410 212 415 248 430 248"
        fill="none"
        strokeWidth="1.5"
        className="fhi-dash fhi-stroke-accent"
      />
      <path
        d="M535 200V148"
        fill="none"
        strokeWidth="1.5"
        className="fhi-dash fhi-stroke-info-line"
      />

      {/* Customer message card */}
      <g className="fhi-float">
        <rect
          x="40"
          y="36"
          width="300"
          height="112"
          rx="14"
          strokeWidth="0.5"
          className="fhi-fill-card fhi-stroke-card"
        />
        <text
          x="64"
          y="62"
          className="fhi-ts fhi-fill-muted"
          letterSpacing="0.08em"
        >
          MAYA CHEN
        </text>
        <rect
          x="266"
          y="46"
          width="60"
          height="20"
          rx="6"
          strokeWidth="0.5"
          className="fhi-fill-accent-soft fhi-stroke-accent-mid"
        />
        <text
          x="296"
          y="56"
          textAnchor="middle"
          dominantBaseline="central"
          className="fhi-mono fhi-fill-accent-text"
        >
          ORDERS
        </text>
        <text x="64" y="92" className="fhi-th fhi-fill-text">
          My order was due yesterday,
        </text>
        <text x="64" y="114" className="fhi-th fhi-fill-text">
          can you check what happened?
        </text>

        <g className="fhi-s1">
          <rect
            x="244"
            y="136"
            width="92"
            height="24"
            rx="12"
            strokeWidth="0.5"
            className="fhi-fill-success-soft fhi-stroke-success"
          />
          <circle cx="262" cy="148" r="3" className="fhi-fill-success" />
          <text
            x="294"
            y="148"
            textAnchor="middle"
            dominantBaseline="central"
            className="fhi-ts fhi-fill-success"
          >
            Open
          </text>
        </g>
        <g className="fhi-s2">
          <rect
            x="244"
            y="136"
            width="92"
            height="24"
            rx="12"
            strokeWidth="0.5"
            className="fhi-fill-accent-soft fhi-stroke-accent"
          />
          <circle cx="260" cy="148" r="3" className="fhi-fill-accent-chip" />
          <text
            x="296"
            y="148"
            textAnchor="middle"
            dominantBaseline="central"
            className="fhi-ts fhi-fill-accent-text"
          >
            Assigned
          </text>
        </g>
        <g className="fhi-s3">
          <rect
            x="244"
            y="136"
            width="92"
            height="24"
            rx="12"
            strokeWidth="0.5"
            className="fhi-fill-info-soft fhi-stroke-info"
          />
          <circle cx="260" cy="148" r="3" className="fhi-fill-info" />
          <text
            x="296"
            y="148"
            textAnchor="middle"
            dominantBaseline="central"
            className="fhi-ts fhi-fill-info-text"
          >
            Resolved
          </text>
        </g>
      </g>

      {/* Triage hub */}
      <circle
        className="fhi-hp fhi-stroke-accent"
        cx="110"
        cy="230"
        r="34"
        fill="none"
        strokeWidth="1"
      />
      <circle
        cx="110"
        cy="230"
        r="34"
        strokeWidth="1"
        className="fhi-fill-card fhi-stroke-accent"
      />
      <path
        d="M92 232h10l3 6h10l3-6h10v14h-36z"
        fill="none"
        strokeWidth="1.5"
        strokeLinejoin="round"
        className="fhi-stroke-accent"
      />
      <path
        d="M95 232l5-12h20l5 12"
        fill="none"
        strokeWidth="1.5"
        strokeLinejoin="round"
        className="fhi-stroke-accent"
      />
      <text
        x="110"
        y="284"
        textAnchor="middle"
        className="fhi-ts fhi-fill-muted"
      >
        Triage
      </text>

      {/* Orders team (active) */}
      <rect
        x="200"
        y="190"
        width="190"
        height="44"
        rx="12"
        strokeWidth="0.5"
        className="fhi-fill-card fhi-stroke-card"
      />
      <rect
        className="fhi-og fhi-stroke-accent"
        x="200"
        y="190"
        width="190"
        height="44"
        rx="12"
        fill="none"
        strokeWidth="1.5"
      />
      <circle cx="224" cy="212" r="12" className="fhi-fill-accent-avatar" />
      <text
        x="246"
        y="205"
        dominantBaseline="central"
        className="fhi-th fhi-fill-text"
      >
        Orders team
      </text>
      <text
        x="246"
        y="222"
        dominantBaseline="central"
        className="fhi-ts fhi-fill-muted"
      >
        2 members online
      </text>

      {/* Billing team (dim) */}
      <rect
        x="200"
        y="252"
        width="190"
        height="44"
        rx="12"
        strokeWidth="0.5"
        className="fhi-fill-card fhi-stroke-card-soft"
      />
      <circle cx="224" cy="274" r="12" className="fhi-fill-avatar-dim" />
      <text
        x="246"
        y="267"
        dominantBaseline="central"
        className="fhi-th fhi-fill-muted-dim"
      >
        Billing team
      </text>
      <text
        x="246"
        y="284"
        dominantBaseline="central"
        className="fhi-ts fhi-fill-muted-dim"
      >
        Not needed
      </text>

      {/* Resolved card */}
      <g className="fhi-rc">
        <rect
          x="430"
          y="200"
          width="210"
          height="96"
          rx="14"
          strokeWidth="0.5"
          className="fhi-fill-card fhi-stroke-success-soft"
        />
        <circle
          cx="462"
          cy="236"
          r="16"
          strokeWidth="1"
          className="fhi-fill-success-soft fhi-stroke-success"
        />
        <path
          d="M454 236l6 6 10-12"
          fill="none"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="fhi-stroke-success"
        />
        <text
          x="488"
          y="230"
          dominantBaseline="central"
          className="fhi-th fhi-fill-text"
        >
          Resolved
        </text>
        <text
          x="488"
          y="248"
          dominantBaseline="central"
          className="fhi-ts fhi-fill-muted"
        >
          Reply sent in 2 min
        </text>
        <path
          d="M454 266H616"
          fill="none"
          strokeWidth="1"
          className="fhi-stroke-divider"
        />
        <circle cx="458" cy="282" r="3" className="fhi-fill-info" />
        <text
          x="470"
          y="282"
          dominantBaseline="central"
          className="fhi-ts fhi-fill-muted"
        >
          Customer notified
        </text>
      </g>

      {/* Workload card */}
      <rect
        x="370"
        y="36"
        width="270"
        height="112"
        rx="14"
        strokeWidth="0.5"
        className="fhi-fill-card fhi-stroke-card"
      />
      <text x="394" y="60" className="fhi-ts fhi-fill-muted">
        Team workload
      </text>
      <rect
        x="394"
        y="96"
        width="14"
        height="36"
        rx="3"
        className="fhi-fill-bar"
      />
      <rect
        x="416"
        y="104"
        width="14"
        height="28"
        rx="3"
        className="fhi-fill-bar"
      />
      <rect
        x="438"
        y="90"
        width="14"
        height="42"
        rx="3"
        className="fhi-fill-bar"
      />
      <rect
        x="460"
        y="100"
        width="14"
        height="32"
        rx="3"
        className="fhi-fill-bar"
      />
      <rect
        x="482"
        y="92"
        width="14"
        height="40"
        rx="3"
        className="fhi-fill-bar"
      />
      <rect
        className="fhi-b5 fhi-fill-accent"
        x="504"
        y="98"
        width="14"
        height="34"
        rx="3"
      />
      <text
        x="624"
        y="96"
        textAnchor="end"
        className="fhi-big fhi-n12 fhi-fill-text"
      >
        12
      </text>
      <text
        x="624"
        y="96"
        textAnchor="end"
        className="fhi-big fhi-n11 fhi-fill-info-text"
      >
        11
      </text>
      <text
        x="624"
        y="118"
        textAnchor="end"
        className="fhi-ts fhi-fill-muted"
      >
        open
      </text>

      {/* Travelling dots */}
      <circle className="fhi-d1 fhi-fill-dot-a" r="5" />
      <circle className="fhi-d2 fhi-fill-dot-b" r="5" />
    </svg>
  );
}
