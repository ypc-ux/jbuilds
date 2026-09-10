"use client";

import type { DimensionScore } from "@/lib/types";

interface ScoreCardProps {
  title: string;
  score: DimensionScore;
  tone?: "strong" | "good" | "mixed" | "weak" | "avoid";
}

const TONES = {
  strong: "var(--color-verdict-strong)",
  good: "var(--color-verdict-good)",
  mixed: "var(--color-verdict-mixed)",
  weak: "var(--color-verdict-weak)",
  avoid: "var(--color-verdict-avoid)",
};

export function ScoreCard({ title, score, tone = "strong" }: ScoreCardProps) {
  const percentage = (score.score / score.maxScore) * 100;
  const color = TONES[tone];

  return (
    <div className="rounded-xl border border-line bg-base p-5">
      <div className="mb-3 flex items-start justify-between gap-3">
        <h3 className="text-sm font-semibold text-ink text-pretty">{title}</h3>
        <span className="shrink-0 font-mono text-sm tabular" style={{ color }}>
          {score.score}/{score.maxScore}
        </span>
      </div>

      <div className="mb-4 h-1.5 w-full overflow-hidden rounded-full bg-line">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${percentage}%`, backgroundColor: color }}
        />
      </div>

      <p className="text-sm leading-relaxed text-ink-dim text-pretty">{score.reasoning}</p>

      {score.evidence && score.evidence.length > 0 && (
        <ul className="mt-3 space-y-1.5">
          {score.evidence.slice(0, 2).map((item, idx) => (
            <li key={idx} className="flex items-start gap-2 text-xs text-ink-faint">
              <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-line-bright" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
