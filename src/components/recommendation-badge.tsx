"use client";

import type { ScoringResult } from "@/lib/types";

interface RecommendationBadgeProps {
  decision: ScoringResult["decision"];
  score: number;
  roiRatio: number;
}

const decisionConfig = {
  INTEGRATE_IMMEDIATELY: {
    label: "Integrate Immediately",
    bgColor: "bg-green-100",
    textColor: "text-green-800",
    borderColor: "border-green-300",
    icon: "✨",
    description: "High value, clear ROI, low complexity",
  },
  INTEGRATE_SOON: {
    label: "Integrate Soon",
    bgColor: "bg-blue-100",
    textColor: "text-blue-800",
    borderColor: "border-blue-300",
    icon: "⭐",
    description: "Good value, manageable complexity",
  },
  EVALUATE_ALTERNATIVES: {
    label: "Evaluate Alternatives",
    bgColor: "bg-amber-100",
    textColor: "text-amber-800",
    borderColor: "border-amber-300",
    icon: "🔍",
    description: "Moderate value, higher effort required",
  },
  NOT_RECOMMENDED: {
    label: "Not Recommended",
    bgColor: "bg-red-100",
    textColor: "text-red-800",
    borderColor: "border-red-300",
    icon: "❌",
    description: "Low ROI or poor fit for your business",
  },
};

export function RecommendationBadge({
  decision,
  score,
  roiRatio,
}: RecommendationBadgeProps) {
  const config = decisionConfig[decision];

  return (
    <div className={`rounded-lg border-2 p-6 ${config.bgColor} ${config.borderColor}`}>
      <div className="flex items-center gap-3 mb-2">
        <span className="text-2xl">{config.icon}</span>
        <h2 className={`text-2xl font-bold ${config.textColor}`}>{config.label}</h2>
      </div>

      <p className={`text-sm mb-4 ${config.textColor} opacity-80`}>{config.description}</p>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-xs opacity-60 uppercase tracking-wide">Total Score</p>
          <p className={`text-3xl font-bold ${config.textColor}`}>{score}/100</p>
        </div>
        <div>
          <p className="text-xs opacity-60 uppercase tracking-wide">ROI Ratio</p>
          <p className={`text-3xl font-bold ${config.textColor}`}>{roiRatio.toFixed(1)}:1</p>
        </div>
      </div>
    </div>
  );
}
