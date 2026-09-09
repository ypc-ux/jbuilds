"use client";

import type { DimensionScore } from "@/lib/types";

interface ScoreCardProps {
  title: string;
  score: DimensionScore;
  color?: "blue" | "green" | "purple" | "amber" | "red";
}

const colorClasses = {
  blue: "bg-blue-50 border-blue-200 text-blue-900",
  green: "bg-green-50 border-green-200 text-green-900",
  purple: "bg-purple-50 border-purple-200 text-purple-900",
  amber: "bg-amber-50 border-amber-200 text-amber-900",
  red: "bg-red-50 border-red-200 text-red-900",
};

const progressClasses = {
  blue: "bg-blue-500",
  green: "bg-green-500",
  purple: "bg-purple-500",
  amber: "bg-amber-500",
  red: "bg-red-500",
};

export function ScoreCard({ title, score, color = "blue" }: ScoreCardProps) {
  const percentage = (score.score / score.maxScore) * 100;
  const colorClass = colorClasses[color];
  const progressClass = progressClasses[color];

  return (
    <div className={`rounded-lg border p-4 ${colorClass}`}>
      <div className="flex items-start justify-between mb-2">
        <h3 className="font-semibold text-lg">{title}</h3>
        <span className="text-sm font-bold">
          {score.score}/{score.maxScore}
        </span>
      </div>

      {/* Progress bar */}
      <div className="mb-3 w-full bg-white/50 rounded-full h-2 overflow-hidden">
        <div
          className={`h-full ${progressClass} transition-all duration-500`}
          style={{ width: `${percentage}%` }}
        />
      </div>

      {/* Reasoning */}
      <p className="text-sm line-clamp-2 opacity-90">{score.reasoning}</p>

      {/* Evidence */}
      {score.evidence && score.evidence.length > 0 && (
        <div className="mt-2 space-y-1">
          {score.evidence.slice(0, 2).map((item, idx) => (
            <p key={idx} className="text-xs opacity-75 flex items-start gap-1">
              <span className="mt-0.5">•</span>
              <span>{item}</span>
            </p>
          ))}
        </div>
      )}
    </div>
  );
}
