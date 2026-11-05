"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import {
  Filter,
  GitBranch,
  Inbox,
  Split,
  Users,
} from "lucide-react";
import { WorkflowNodeCard } from "@/components/modules/demo/automation/workflow-node";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import type { SimulationResult } from "@/types/demo";
import { cn } from "@/utils/cn";

type WorkflowCanvasProps = {
  selectedNodeId: string;
  simulation: SimulationResult | null;
  simulationNonce: number;
  isStale?: boolean;
  onSelectNode: (nodeId: string) => void;
  onAnimationComplete?: () => void;
};

export function WorkflowCanvas({
  selectedNodeId,
  simulation,
  simulationNonce,
  isStale = false,
  onSelectNode,
  onAnimationComplete,
}: WorkflowCanvasProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();
  const matched = simulation?.matched;
  const hasRun = Boolean(simulation);
  const completeRef = useRef(onAnimationComplete);

  useEffect(() => {
    completeRef.current = onAnimationComplete;
  }, [onAnimationComplete]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || simulationNonce === 0 || !simulation) return;

    let settled = false;
    const finish = () => {
      if (settled) return;
      settled = true;
      completeRef.current?.();
    };

    // Strict Mode / interrupted timelines can skip GSAP onComplete.
    const safety = window.setTimeout(finish, 2200);

    const ctx = gsap.context(() => {
      const nodes = {
        inquiry: root.querySelector('[data-node="inquiry"]'),
        condition: root.querySelector('[data-node="condition"]'),
        matched: root.querySelector('[data-node="matched"]'),
        otherwise: root.querySelector('[data-node="otherwise"]'),
        destination: root.querySelector('[data-node="destination"]'),
      };
      const pathMatched = root.querySelector("[data-path='matched']");
      const pathOtherwise = root.querySelector("[data-path='otherwise']");
      const pathMain = Array.from(root.querySelectorAll("[data-path='main']"));
      const connectors = [...pathMain, pathMatched, pathOtherwise].filter(
        Boolean,
      );

      gsap.set(Object.values(nodes).filter(Boolean), {
        clearProps: "boxShadow,opacity,outline",
      });
      gsap.set(connectors, {
        strokeDasharray: 420,
        strokeDashoffset: 420,
        opacity: 0.28,
      });

      if (reducedMotion) {
        if (simulation.matched) {
          gsap.set(nodes.matched, { outline: "2px solid var(--accent)" });
          gsap.set(pathMatched, { strokeDashoffset: 0, opacity: 1 });
          gsap.set(nodes.otherwise, { opacity: 0.55 });
        } else {
          gsap.set(nodes.otherwise, { outline: "2px solid var(--accent)" });
          gsap.set(pathOtherwise, { strokeDashoffset: 0, opacity: 1 });
          gsap.set(nodes.matched, { opacity: 0.55 });
        }
        gsap.set(
          [nodes.inquiry, nodes.condition, nodes.destination],
          { outline: "2px solid var(--accent)" },
        );
        gsap.set(pathMain, { strokeDashoffset: 0, opacity: 1 });
        finish();
        return;
      }

      const tl = gsap.timeline({
        defaults: { ease: "power2.out" },
        onComplete: finish,
      });

      tl.to(nodes.inquiry, {
        duration: 0.32,
        boxShadow:
          "0 0 0 2px color-mix(in oklab, var(--accent) 55%, transparent)",
      })
        .to(
          pathMain[0] ?? null,
          { strokeDashoffset: 0, opacity: 1, duration: 0.36 },
          "<0.08",
        )
        .to(nodes.condition, {
          duration: 0.32,
          boxShadow:
            "0 0 0 2px color-mix(in oklab, var(--accent) 55%, transparent)",
        })
        .to(
          pathMain[1] ?? null,
          { strokeDashoffset: 0, opacity: 1, duration: 0.32 },
          "<0.05",
        );

      if (simulation.matched) {
        tl.to(nodes.matched, {
          duration: 0.32,
          boxShadow:
            "0 0 20px color-mix(in oklab, var(--accent) 32%, transparent)",
        })
          .to(nodes.otherwise, { opacity: 0.55, duration: 0.22 }, "<")
          .to(
            pathMatched,
            { strokeDashoffset: 0, opacity: 1, duration: 0.4 },
            "<0.05",
          );
      } else {
        tl.to(nodes.otherwise, {
          duration: 0.32,
          boxShadow:
            "0 0 20px color-mix(in oklab, var(--accent) 32%, transparent)",
        })
          .to(nodes.matched, { opacity: 0.55, duration: 0.22 }, "<")
          .to(
            pathOtherwise,
            { strokeDashoffset: 0, opacity: 1, duration: 0.4 },
            "<0.05",
          );
      }

      tl.to(nodes.destination, {
        duration: 0.36,
        boxShadow:
          "0 0 24px color-mix(in oklab, var(--accent) 36%, transparent)",
      });
    }, root);

    return () => {
      window.clearTimeout(safety);
      ctx.revert();
    };
  }, [simulation, simulationNonce, reducedMotion]);

  return (
    <div
      ref={rootRef}
      className={cn(
        "relative overflow-hidden rounded-2xl border border-[var(--demo-border)] bg-[var(--demo-panel)]/80 p-3.5 sm:p-5",
        isStale && "opacity-[0.92]",
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.3]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, color-mix(in oklab, var(--demo-muted) 35%, transparent) 1px, transparent 0)",
          backgroundSize: "22px 22px",
        }}
      />

      <div className="relative mx-auto flex max-w-2xl flex-col items-center gap-0">
        <WorkflowNodeCard
          id="inquiry"
          label="New Inquiry"
          detail="A customer conversation arrives"
          icon={Inbox}
          selected={selectedNodeId === "inquiry"}
          active={hasRun}
          onSelect={() => onSelectNode("inquiry")}
        />

        <Connector paths={["main"]} />

        <WorkflowNodeCard
          id="condition"
          label="Check inquiry topic"
          detail="Compare inquiry topic against the selected rule"
          icon={Filter}
          selected={selectedNodeId === "condition"}
          active={hasRun}
          onSelect={() => onSelectNode("condition")}
        />

        <Connector paths={["main"]} />

        <div className="grid w-full max-w-md gap-2.5 sm:max-w-none sm:grid-cols-2 sm:gap-3">
          <WorkflowNodeCard
            id="matched"
            label="Matched"
            detail="Route to the specialist team"
            icon={GitBranch}
            selected={selectedNodeId === "matched"}
            active={matched === true}
            dimmed={matched === false}
            onSelect={() => onSelectNode("matched")}
          />
          <WorkflowNodeCard
            id="otherwise"
            label="No match"
            detail="Fallback to General Triage"
            icon={Split}
            selected={selectedNodeId === "otherwise"}
            active={matched === false}
            dimmed={matched === true}
            onSelect={() => onSelectNode("otherwise")}
          />
        </div>

        <div className="relative h-9 w-full max-w-md sm:max-w-none">
          <svg
            className="absolute inset-0 h-full w-full"
            viewBox="0 0 100 36"
            preserveAspectRatio="none"
            aria-hidden
          >
            <path
              data-path="matched"
              d="M25 0 C25 20, 50 20, 50 36"
              fill="none"
              stroke="var(--accent)"
              strokeWidth="1.6"
              vectorEffect="non-scaling-stroke"
              opacity="0.28"
            />
            <path
              data-path="otherwise"
              d="M75 0 C75 20, 50 20, 50 36"
              fill="none"
              stroke="var(--accent)"
              strokeWidth="1.6"
              vectorEffect="non-scaling-stroke"
              opacity="0.28"
            />
          </svg>
        </div>

        <WorkflowNodeCard
          id="destination"
          label="Destination Team"
          detail={
            simulation
              ? `Assign to ${simulation.destination}`
              : "Awaiting simulation result"
          }
          icon={Users}
          selected={selectedNodeId === "destination"}
          active={hasRun}
          onSelect={() => onSelectNode("destination")}
        />
      </div>
    </div>
  );
}

function Connector({
  paths,
}: {
  paths: Array<"main" | "matched" | "otherwise">;
}) {
  return (
    <div className="relative mx-auto h-7 w-px">
      <svg
        className="absolute inset-0 h-full w-full overflow-visible"
        aria-hidden
      >
        {paths.map((path) => (
          <line
            key={path}
            data-path={path}
            x1="0.5"
            y1="0"
            x2="0.5"
            y2="28"
            stroke="var(--accent)"
            strokeWidth="2"
            opacity="0.28"
          />
        ))}
      </svg>
    </div>
  );
}
