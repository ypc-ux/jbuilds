"use client";

import type { EvaluationResult } from "@/lib/types";
import { ScoreCard } from "./score-card";
import { RecommendationBadge } from "./recommendation-badge";

export function EvaluationResults({ evaluation }: { evaluation: EvaluationResult }) {
  const { repositoryMetadata, scores, implementationPhases, risks, successMetrics, recommendations } =
    evaluation;

  return (
    <div className="space-y-10">
      <div className="border-b border-line pb-7">
        <a
          href={repositoryMetadata.url}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline"
        >
          <h1 className="text-title font-semibold text-ink">{repositoryMetadata.name}</h1>
        </a>
        <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.16em] text-ink-faint">
          {repositoryMetadata.owner}
        </p>
        <p className="mt-4 text-sm leading-relaxed text-ink-dim text-pretty">
          {repositoryMetadata.description}
        </p>

        <dl className="mt-6 grid grid-cols-2 gap-5 md:grid-cols-4">
          {[
            ["Language", repositoryMetadata.language],
            ["Stars", repositoryMetadata.stars.toLocaleString()],
            ["Forks", repositoryMetadata.forks.toLocaleString()],
            ["License", repositoryMetadata.license],
          ].map(([label, value]) => (
            <div key={label}>
              <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-faint">{label}</dt>
              <dd className="mt-1 font-mono text-sm tabular text-ink">{value}</dd>
            </div>
          ))}
        </dl>
      </div>

      <RecommendationBadge decision={scores.decision} score={scores.totalScore} roiRatio={scores.roiRatio} />

      <div>
        <h2 className="mb-5 font-mono text-[11px] uppercase tracking-[0.3em] text-ink-faint">
          Scoring breakdown
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          <ScoreCard title="Developer Productivity" score={scores.productivity} tone="strong" />
          <ScoreCard title="Technical Debt" score={scores.technicalDebt} tone="good" />
          <ScoreCard title="Business Fit" score={scores.businessFit} tone="mixed" />
          <ScoreCard title="Implementation Effort" score={scores.implementationEffort} tone="weak" />
          <ScoreCard title="Cost-Benefit Ratio" score={scores.costBenefit} tone="avoid" />
        </div>
      </div>

      {implementationPhases.length > 0 && (
        <div>
          <h2 className="mb-5 font-mono text-[11px] uppercase tracking-[0.3em] text-ink-faint">
            Implementation plan
          </h2>
          <div className="space-y-4">
            {implementationPhases.map((phase) => (
              <div key={phase.phase} className="rounded-xl border border-line bg-base p-5">
                <div className="mb-4 flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-sm font-semibold text-ink">
                      Phase {phase.phase}: {phase.name}
                    </h3>
                    <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.16em] text-ink-faint">
                      {phase.duration}
                    </p>
                  </div>
                  <span className="shrink-0 font-mono text-sm tabular text-signal">{phase.effortHours}h</span>
                </div>

                {phase.tasks.length > 0 && (
                  <ul className="space-y-3">
                    {phase.tasks.map((task, idx) => (
                      <li key={idx} className="border-l border-line-bright pl-4">
                        <p className="text-sm font-medium text-ink">{task.title}</p>
                        <p className="mt-1 text-xs leading-relaxed text-ink-dim">{task.description}</p>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {risks.length > 0 && (
        <div>
          <h2 className="mb-5 font-mono text-[11px] uppercase tracking-[0.3em] text-ink-faint">
            Identified risks
          </h2>
          <div className="space-y-3">
            {risks.map((risk, idx) => (
              <div
                key={idx}
                className="rounded-xl border border-line bg-base p-5"
                style={{ borderLeftWidth: 3, borderLeftColor: "var(--color-verdict-avoid)" }}
              >
                <div className="mb-3 flex flex-wrap items-start justify-between gap-3">
                  <h4 className="text-sm font-semibold text-ink text-pretty">{risk.risk}</h4>
                  <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-faint">
                    {risk.probability} probability / {risk.impact} impact
                  </span>
                </div>
                <p className="text-sm leading-relaxed text-ink-dim">
                  <span className="text-ink">Mitigation:</span> {risk.mitigation}
                </p>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-dim">
                  <span className="text-ink">Contingency:</span> {risk.contingency}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {successMetrics.length > 0 && (
        <div>
          <h2 className="mb-5 font-mono text-[11px] uppercase tracking-[0.3em] text-ink-faint">
            Success metrics
          </h2>
          <ul className="space-y-2.5">
            {successMetrics.map((metric, idx) => (
              <li key={idx} className="flex items-start gap-3 text-sm text-ink-dim">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-signal" />
                <span>{metric}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {recommendations.length > 0 && (
        <div>
          <h2 className="mb-5 font-mono text-[11px] uppercase tracking-[0.3em] text-ink-faint">
            Recommendations
          </h2>
          <ul className="space-y-2.5">
            {recommendations.map((rec, idx) => (
              <li key={idx} className="flex items-start gap-3 text-sm text-ink-dim">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-line-bright" />
                <span>{rec}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
