"use client";

import type { ScoringResult } from "@/lib/types";

interface RecommendationBadgeProps {
  decision: ScoringResult["decision"];
  score: number;
  roiRatio: number;
}

const DECISIONS = {
  INTEGRATE_IMMEDIATELY: {
    label: "Integrate now",
    color: "var(--color-verdict-strong)",
    description: "High value, clear return, low complexity.",
  },
  INTEGRATE_SOON: {
    label: "Integrate with scope limits",
    color: "var(--color-verdict-mixed)",
    description: "Good value, manageable complexity. Bound the scope before you start.",
  },
  EVALUATE_ALTERNATIVES: {
    label: "Prototype first",
    color: "var(--color-verdict-weak)",
    description: "Moderate value against real effort. Prove it on something small.",
  },
  NOT_RECOMMENDED: {
    label: "Do not integrate",
    color: "var(--color-verdict-avoid)",
    description: "The return does not cover what this costs to adopt and maintain.",
  },
};

export function RecommendationBadge({ decision, score, roiRatio }: RecommendationBadgeProps) {
  const config = DECISIONS[decision];

  return (
    <div
      className="rounded-2xl border border-line bg-base p-7"
      style={{ borderLeftWidth: 3, borderLeftColor: config.color }}
    >
      <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-faint">Verdict</p>
      <h2 className="mt-3 text-title font-semibold text-pretty" style={{ color: config.color }}>
        {config.label}
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-ink-dim text-pretty">{config.description}</p>

      <div className="mt-7 grid grid-cols-2 gap-6 border-t border-line pt-6">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-faint">Composite</p>
          <p className="mt-1.5 font-mono text-3xl tabular" style={{ color: config.color }}>
            {score}
            <span className="text-lg text-ink-faint">/100</span>
          </p>
        </div>
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-faint">ROI ratio</p>
          <p className="mt-1.5 font-mono text-3xl tabular text-ink">{roiRatio.toFixed(1)}:1</p>
        </div>
      </div>
    </div>
  );
}
