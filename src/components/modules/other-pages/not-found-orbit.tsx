export function NotFoundOrbit({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 420 420"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Fixed orbital tracks (the “solar system” paths) */}
      <circle
        cx="210"
        cy="210"
        r="168"
        stroke="currentColor"
        strokeOpacity="0.08"
        strokeWidth="1"
      />
      <circle
        cx="210"
        cy="210"
        r="118"
        stroke="currentColor"
        strokeOpacity="0.12"
        strokeWidth="1"
        strokeDasharray="3 10"
      />

      <path
        data-orbit-ring
        d="M210 42 A168 168 0 1 1 58 268"
        stroke="var(--accent)"
        strokeOpacity="0.55"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
      <path
        data-orbit-gap
        d="M58 268 A168 168 0 0 1 148 52"
        stroke="var(--accent)"
        strokeOpacity="0.22"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeDasharray="6 14"
      />

      <path
        data-orbit-path
        d="M96 300 C140 250 170 230 210 210 C248 190 280 150 318 112"
        stroke="var(--accent)"
        strokeOpacity="0.35"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeDasharray="5 9"
      />

      {/* Outer body — purple node on the far orbit */}
      <g data-orbit-body data-orbit-duration="160" data-orbit-dir="forward">
        <g data-orbit-node>
          <circle cx="332" cy="78" r="18" fill="var(--accent-soft)" />
          <circle cx="332" cy="78" r="7" fill="var(--accent)" />
          <circle
            cx="332"
            cy="78"
            r="28"
            stroke="var(--accent)"
            strokeOpacity="0.28"
          />
        </g>
      </g>

      {/* Mid orbit — UI chips (counter-rotated so they stay upright) */}
      <g data-orbit-body data-orbit-duration="130" data-orbit-dir="reverse">
        <g data-orbit-counter>
          <g data-orbit-chip opacity="0.9">
            <rect
              x="62"
              y="96"
              width="78"
              height="34"
              rx="10"
              fill="var(--surface)"
              stroke="var(--border-strong)"
            />
            <circle
              cx="80"
              cy="113"
              r="5"
              fill="var(--accent)"
              fillOpacity="0.75"
            />
            <rect
              x="92"
              y="108"
              width="34"
              height="4"
              rx="2"
              fill="currentColor"
              fillOpacity="0.22"
            />
            <rect
              x="92"
              y="116"
              width="22"
              height="3"
              rx="1.5"
              fill="currentColor"
              fillOpacity="0.14"
            />
          </g>
        </g>
      </g>

      <g data-orbit-body data-orbit-duration="145" data-orbit-dir="forward">
        <g data-orbit-counter>
          <g data-orbit-chip opacity="0.85">
            <rect
              x="278"
              y="286"
              width="88"
              height="40"
              rx="12"
              fill="var(--surface)"
              stroke="var(--border-strong)"
            />
            <rect
              x="294"
              y="300"
              width="28"
              height="4"
              rx="2"
              fill="var(--accent)"
              fillOpacity="0.55"
            />
            <rect
              x="330"
              y="299"
              width="18"
              height="6"
              rx="3"
              fill="currentColor"
              fillOpacity="0.12"
            />
          </g>
        </g>
      </g>

      {/* Inner marker — slow opposite drift */}
      <g data-orbit-body data-orbit-duration="200" data-orbit-dir="reverse">
        <g data-orbit-counter>
          <g opacity="0.45">
            <circle
              cx="118"
              cy="58"
              r="22"
              stroke="var(--accent)"
              strokeOpacity="0.35"
            />
            <path
              d="M118 30 V42 M118 74 V86 M90 58 H102 M134 58 H146"
              stroke="var(--accent)"
              strokeOpacity="0.5"
              strokeWidth="1.25"
              strokeLinecap="round"
            />
          </g>
        </g>
      </g>

      {/* Center — the “sun” (spins in place) */}
      <g data-orbit-core data-orbit-duration="100" data-orbit-dir="forward">
        <circle
          cx="210"
          cy="210"
          r="5"
          fill="var(--accent)"
          fillOpacity="0.9"
        />
        <path
          d="M196 196 L224 224 M224 196 L196 224"
          stroke="currentColor"
          strokeOpacity="0.22"
          strokeWidth="1.25"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
}
