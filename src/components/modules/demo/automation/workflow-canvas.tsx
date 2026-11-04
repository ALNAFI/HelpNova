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
  onSelectNode: (nodeId: string) => void;
};

export function WorkflowCanvas({
  selectedNodeId,
  simulation,
  simulationNonce,
  onSelectNode,
}: WorkflowCanvasProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();
  const matched = simulation?.matched;

  useEffect(() => {
    const root = rootRef.current;
    if (!root || simulationNonce === 0 || !simulation) return;

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
        opacity: 0.25,
      });

      if (reducedMotion) {
        if (simulation.matched) {
          gsap.set(nodes.matched, { outline: "2px solid var(--accent)" });
          gsap.set(pathMatched, { strokeDashoffset: 0, opacity: 1 });
          gsap.set(nodes.otherwise, { opacity: 0.4 });
        } else {
          gsap.set(nodes.otherwise, { outline: "2px solid var(--accent)" });
          gsap.set(pathOtherwise, { strokeDashoffset: 0, opacity: 1 });
          gsap.set(nodes.matched, { opacity: 0.4 });
        }
        gsap.set(
          [nodes.inquiry, nodes.condition, nodes.destination],
          { outline: "2px solid var(--accent)" },
        );
        gsap.set(pathMain, { strokeDashoffset: 0, opacity: 1 });
        return;
      }

      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

      tl.to(nodes.inquiry, {
        duration: 0.35,
        boxShadow:
          "0 0 0 2px color-mix(in oklab, var(--accent) 55%, transparent)",
      })
        .to(
          pathMain[0] ?? null,
          { strokeDashoffset: 0, opacity: 1, duration: 0.4 },
          "<0.1",
        )
        .to(nodes.condition, {
          duration: 0.35,
          boxShadow:
            "0 0 0 2px color-mix(in oklab, var(--accent) 55%, transparent)",
        })
        .to(
          pathMain[1] ?? null,
          { strokeDashoffset: 0, opacity: 1, duration: 0.35 },
          "<0.05",
        );

      if (simulation.matched) {
        tl.to(nodes.matched, {
          duration: 0.35,
          boxShadow:
            "0 0 24px color-mix(in oklab, var(--accent) 35%, transparent)",
        })
          .to(nodes.otherwise, { opacity: 0.35, duration: 0.25 }, "<")
          .to(
            pathMatched,
            { strokeDashoffset: 0, opacity: 1, duration: 0.45 },
            "<0.05",
          );
      } else {
        tl.to(nodes.otherwise, {
          duration: 0.35,
          boxShadow:
            "0 0 24px color-mix(in oklab, var(--accent) 35%, transparent)",
        })
          .to(nodes.matched, { opacity: 0.35, duration: 0.25 }, "<")
          .to(
            pathOtherwise,
            { strokeDashoffset: 0, opacity: 1, duration: 0.45 },
            "<0.05",
          );
      }

      tl.to(nodes.destination, {
        duration: 0.4,
        boxShadow:
          "0 0 28px color-mix(in oklab, var(--accent) 40%, transparent)",
      });
    }, root);

    return () => ctx.revert();
  }, [simulation, simulationNonce, reducedMotion]);

  return (
    <div
      ref={rootRef}
      className="relative overflow-hidden rounded-2xl border border-[var(--demo-border)] bg-[var(--demo-panel)]/80 p-4 sm:p-6"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, color-mix(in oklab, var(--demo-muted) 35%, transparent) 1px, transparent 0)",
          backgroundSize: "22px 22px",
        }}
      />

      <div className="relative mx-auto grid max-w-3xl gap-4">
        <WorkflowNodeCard
          id="inquiry"
          label="New Inquiry"
          detail="Fictional customer message enters the workspace"
          icon={Inbox}
          selected={selectedNodeId === "inquiry"}
          active={Boolean(simulation)}
          onSelect={() => onSelectNode("inquiry")}
        />

        <Connector paths={["main"]} />

        <WorkflowNodeCard
          id="condition"
          label="Topic Condition"
          detail="Compare inquiry topic against the selected rule"
          icon={Filter}
          selected={selectedNodeId === "condition"}
          active={Boolean(simulation)}
          onSelect={() => onSelectNode("condition")}
        />

        <Connector paths={["main"]} />

        <div className="grid gap-3 sm:grid-cols-2">
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
            label="Otherwise"
            detail="Fallback to General Triage"
            icon={Split}
            selected={selectedNodeId === "otherwise"}
            active={matched === false}
            dimmed={matched === true}
            onSelect={() => onSelectNode("otherwise")}
          />
        </div>

        <div className="relative h-10">
          <svg
            className="absolute inset-0 h-full w-full"
            viewBox="0 0 100 40"
            preserveAspectRatio="none"
            aria-hidden
          >
            <path
              data-path="matched"
              d="M25 0 C25 22, 50 22, 50 40"
              fill="none"
              stroke="var(--accent)"
              strokeWidth="1.5"
              opacity="0.25"
            />
            <path
              data-path="otherwise"
              d="M75 0 C75 22, 50 22, 50 40"
              fill="none"
              stroke="var(--accent)"
              strokeWidth="1.5"
              opacity="0.25"
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
          active={Boolean(simulation)}
          onSelect={() => onSelectNode("destination")}
        />
      </div>
    </div>
  );
}

function Connector({ paths }: { paths: Array<"main" | "matched" | "otherwise"> }) {
  return (
    <div className={cn("relative mx-auto h-8 w-px")}>
      <svg className="absolute inset-0 h-full w-full overflow-visible" aria-hidden>
        {paths.map((path) => (
          <line
            key={path}
            data-path={path}
            x1="0.5"
            y1="0"
            x2="0.5"
            y2="32"
            stroke="var(--accent)"
            strokeWidth="2"
            opacity="0.25"
          />
        ))}
      </svg>
    </div>
  );
}
