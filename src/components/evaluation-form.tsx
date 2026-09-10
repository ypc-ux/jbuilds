"use client";

import { useState } from "react";
import { apiClient } from "@/lib/api-client";
import type { EvaluationResult } from "@/lib/types";

interface EvaluationFormProps {
  onEvaluationComplete: (evaluation: EvaluationResult) => void;
  isLoading?: boolean;
}

export function EvaluationForm({ onEvaluationComplete, isLoading = false }: EvaluationFormProps) {
  const [repoUrl, setRepoUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // Validate URL format
      if (!repoUrl.trim()) {
        throw new Error("Please enter a repository URL");
      }

      if (!repoUrl.includes("github.com")) {
        throw new Error("Please enter a valid GitHub repository URL");
      }

      // Call API
      const response = await apiClient.evaluate({ repoUrl: repoUrl.trim() });

      if (!response.success || !response.evaluation) {
        throw new Error(response.error || "Failed to evaluate repository");
      }

      // Clear form
      setRepoUrl("");
      onEvaluationComplete(response.evaluation);
    } catch (err) {
      const message = err instanceof Error ? err.message : "An error occurred";
      setError(message);
      console.error("Evaluation error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label
          htmlFor="repoUrl"
          className="mb-2.5 block font-mono text-[10px] uppercase tracking-[0.22em] text-ink-faint"
        >
          GitHub repository URL
        </label>
        <input
          id="repoUrl"
          type="text"
          value={repoUrl}
          onChange={(e) => setRepoUrl(e.target.value)}
          placeholder="https://github.com/owner/repo"
          disabled={loading || isLoading}
          className="w-full rounded-xl border border-line-bright bg-void px-4 py-3.5 font-mono text-sm text-ink placeholder:text-ink-faint focus:border-signal focus:outline-none disabled:opacity-50"
        />
        <p className="mt-2.5 text-sm text-ink-dim">
          Any public repository. The evaluation runs against the Business Integration Protocol.
        </p>
      </div>

      {error && (
        <div className="rounded-xl border border-verdict-avoid/40 bg-verdict-avoid/10 p-4">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-verdict-avoid">
            Evaluation failed
          </p>
          <p className="mt-1.5 text-sm text-ink-dim">{error}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={loading || isLoading || !repoUrl.trim()}
        className="w-full rounded-xl bg-signal px-6 py-3.5 text-sm font-semibold text-void transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
      >
        {loading || isLoading ? (
          <span className="flex items-center justify-center gap-2">
            <span className="inline-block h-3.5 w-3.5 animate-spin rounded-full border-2 border-void border-t-transparent" />
            Evaluating…
          </span>
        ) : (
          "Evaluate repository"
        )}
      </button>
    </form>
  );
}
