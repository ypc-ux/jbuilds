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
        <label htmlFor="repoUrl" className="block text-sm font-medium text-gray-900 mb-2">
          GitHub Repository URL
        </label>
        <div className="relative">
          <input
            id="repoUrl"
            type="text"
            value={repoUrl}
            onChange={(e) => setRepoUrl(e.target.value)}
            placeholder="https://github.com/owner/repo"
            disabled={loading || isLoading}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
          />
        </div>
        <p className="mt-2 text-sm text-gray-600">
          Enter any GitHub repository URL to analyze it against the Business Integration Protocol.
        </p>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-800 font-medium">Error</p>
          <p className="text-sm text-red-700 mt-1">{error}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={loading || isLoading || !repoUrl.trim()}
        className="w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {loading || isLoading ? (
          <span className="flex items-center justify-center gap-2">
            <span className="inline-block h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Evaluating...
          </span>
        ) : (
          "Evaluate Repository"
        )}
      </button>
    </form>
  );
}
