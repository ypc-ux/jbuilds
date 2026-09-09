"use client";

import type { EvaluationResult } from "@/lib/types";
import { ScoreCard } from "./score-card";
import { RecommendationBadge } from "./recommendation-badge";

interface EvaluationResultsProps {
  evaluation: EvaluationResult;
}

export function EvaluationResults({ evaluation }: EvaluationResultsProps) {
  const { repositoryMetadata, scores, implementationPhases, risks, successMetrics, recommendations } = evaluation;

  const scoreColors = ["blue", "green", "purple", "amber", "red"] as const;

  return (
    <div className="space-y-8">
      {/* Header with Repository Info */}
      <div className="border-b pb-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <a href={repositoryMetadata.url} target="_blank" rel="noopener noreferrer" className="hover:underline">
              <h1 className="text-3xl font-bold text-zinc-900">{repositoryMetadata.name}</h1>
            </a>
            <p className="text-gray-600 mt-1">{repositoryMetadata.owner}</p>
          </div>
        </div>

        <p className="text-gray-700 mb-4">{repositoryMetadata.description}</p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div>
            <p className="text-gray-600 text-xs uppercase">Language</p>
            <p className="font-semibold">{repositoryMetadata.language}</p>
          </div>
          <div>
            <p className="text-gray-600 text-xs uppercase">Stars</p>
            <p className="font-semibold">{repositoryMetadata.stars.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-gray-600 text-xs uppercase">Forks</p>
            <p className="font-semibold">{repositoryMetadata.forks.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-gray-600 text-xs uppercase">License</p>
            <p className="font-semibold">{repositoryMetadata.license}</p>
          </div>
        </div>
      </div>

      {/* Recommendation */}
      <RecommendationBadge
        decision={scores.decision}
        score={scores.totalScore}
        roiRatio={scores.roiRatio}
      />

      {/* Scoring Dimensions */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Scoring Breakdown</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <ScoreCard
            title="Developer Productivity"
            score={scores.productivity}
            color="blue"
          />
          <ScoreCard
            title="Technical Debt Impact"
            score={scores.technicalDebt}
            color="green"
          />
          <ScoreCard
            title="Business Domain Fit"
            score={scores.businessFit}
            color="purple"
          />
          <ScoreCard
            title="Implementation Effort"
            score={scores.implementationEffort}
            color="amber"
          />
          <ScoreCard
            title="Cost-Benefit Ratio"
            score={scores.costBenefit}
            color="red"
          />
        </div>
      </div>

      {/* Implementation Phases */}
      {implementationPhases.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-4">Implementation Plan</h2>
          <div className="space-y-4">
            {implementationPhases.map((phase) => (
              <div key={phase.phase} className="border rounded-lg p-4 bg-white">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-lg font-semibold text-zinc-900">
                      Phase {phase.phase}: {phase.name}
                    </h3>
                    <p className="text-sm text-gray-600">{phase.duration}</p>
                  </div>
                  <span className="text-sm font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded">
                    {phase.effortHours}h
                  </span>
                </div>

                {phase.tasks.length > 0 && (
                  <ul className="space-y-2">
                    {phase.tasks.map((task, idx) => (
                      <li key={idx} className="text-sm text-gray-700">
                        <span className="font-medium">{task.title}</span>
                        <p className="text-xs text-gray-600 mt-1">{task.description}</p>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Risks */}
      {risks.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-4">Identified Risks</h2>
          <div className="space-y-3">
            {risks.map((risk, idx) => (
              <div key={idx} className="border-l-4 border-red-500 bg-red-50 p-4 rounded">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-semibold text-zinc-900">{risk.risk}</h4>
                  <span className="text-xs font-semibold uppercase">
                    <span className="text-red-700">{risk.probability}</span> probability •{" "}
                    <span className="text-red-700">{risk.impact}</span> impact
                  </span>
                </div>
                <p className="text-sm text-gray-700 mb-2">
                  <span className="font-semibold">Mitigation:</span> {risk.mitigation}
                </p>
                <p className="text-sm text-gray-700">
                  <span className="font-semibold">Contingency:</span> {risk.contingency}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Success Metrics */}
      {successMetrics.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-4">Success Metrics</h2>
          <ul className="space-y-2">
            {successMetrics.map((metric, idx) => (
              <li
                key={idx}
                className="flex items-start gap-3 p-3 bg-green-50 rounded border border-green-200"
              >
                <span className="text-green-600 font-bold mt-0.5">✓</span>
                <span className="text-gray-700">{metric}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Recommendations */}
      {recommendations.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-4">Recommendations</h2>
          <ul className="space-y-2">
            {recommendations.map((rec, idx) => (
              <li key={idx} className="flex items-start gap-3 p-3 bg-blue-50 rounded border border-blue-200">
                <span className="text-blue-600 font-bold mt-0.5">→</span>
                <span className="text-gray-700">{rec}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
