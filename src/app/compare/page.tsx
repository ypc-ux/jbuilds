"use client";

import { useState } from "react";
import Link from "next/link";
import { apiClient } from "@/lib/api-client";
import { EvaluationResults } from "@/components/evaluation-results";
import type { CompareResponse } from "@/lib/types";

export default function ComparePage() {
  const [repoUrls, setRepoUrls] = useState<string[]>(["", "", ""]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<CompareResponse | null>(null);

  const handleUrlChange = (index: number, value: string) => {
    const newUrls = [...repoUrls];
    newUrls[index] = value;
    setRepoUrls(newUrls);
  };

  const addUrlField = () => {
    setRepoUrls([...repoUrls, ""]);
  };

  const removeUrlField = (index: number) => {
    if (repoUrls.length > 2) {
      setRepoUrls(repoUrls.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const validUrls = repoUrls.filter((url) => url.trim());

      if (validUrls.length < 2) {
        throw new Error("Please enter at least 2 repository URLs");
      }

      const response = await apiClient.compare({ repoUrls: validUrls });

      if (!response.success) {
        throw new Error(response.error || "Failed to compare repositories");
      }

      setResult(response);
    } catch (err) {
      const message = err instanceof Error ? err.message : "An error occurred";
      setError(message);
      console.error("Comparison error:", err);
    } finally {
      setLoading(false);
    }
  };

  if (result) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        {/* Header */}
        <header className="border-b bg-white shadow-sm">
          <div className="max-w-6xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
            <Link href="/" className="text-blue-600 hover:text-blue-700 font-medium mb-4 block">
              ← Back to Evaluator
            </Link>
            <h1 className="text-3xl font-bold text-gray-900">Repository Comparison</h1>
          </div>
        </header>

        {/* Content */}
        <main className="max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          {/* Comparison Summary */}
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            <div className="bg-white rounded-lg border p-6">
              <p className="text-gray-600 text-sm uppercase font-semibold mb-2">Repositories Compared</p>
              <p className="text-4xl font-bold text-gray-900">{result.comparison.totalEvaluated}</p>
            </div>
            <div className="bg-white rounded-lg border p-6">
              <p className="text-gray-600 text-sm uppercase font-semibold mb-2">Average Score</p>
              <p className="text-4xl font-bold text-blue-600">{result.comparison.averageScore}/100</p>
            </div>
            <div className="bg-white rounded-lg border p-6">
              <p className="text-gray-600 text-sm uppercase font-semibold mb-2">Score Range</p>
              <p className="text-lg font-bold text-gray-900">
                {result.comparison.lowest.scores.totalScore} - {result.comparison.highest.scores.totalScore}
              </p>
            </div>
          </div>

          {/* Highest & Lowest */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-green-50 rounded-lg border border-green-200 p-6">
              <h3 className="font-semibold text-green-900 mb-4 text-lg">🏆 Highest Scoring</h3>
              <p className="font-bold text-green-900 mb-1">{result.comparison.highest.repositoryName}</p>
              <p className="text-2xl font-bold text-green-600">{result.comparison.highest.scores.totalScore}/100</p>
              <p className="text-sm text-green-800 mt-2">{result.comparison.highest.scores.decision}</p>
            </div>
            <div className="bg-red-50 rounded-lg border border-red-200 p-6">
              <h3 className="font-semibold text-red-900 mb-4 text-lg">📊 Lowest Scoring</h3>
              <p className="font-bold text-red-900 mb-1">{result.comparison.lowest.repositoryName}</p>
              <p className="text-2xl font-bold text-red-600">{result.comparison.lowest.scores.totalScore}/100</p>
              <p className="text-sm text-red-800 mt-2">{result.comparison.lowest.scores.decision}</p>
            </div>
          </div>

          {/* All Evaluations */}
          <div className="space-y-12">
            {result.evaluations.map((evaluation, idx) => (
              <div key={idx} className="border-t pt-8">
                <EvaluationResults evaluation={evaluation} />
              </div>
            ))}
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <header className="border-b bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <Link href="/" className="text-blue-600 hover:text-blue-700 font-medium mb-4 block">
            ← Back to Evaluator
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Compare Repositories</h1>
            <p className="text-gray-600 mt-2">Evaluate multiple tools side-by-side to make better decisions.</p>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-3xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm border p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              {repoUrls.map((url, idx) => (
                <div key={idx} className="flex gap-3">
                  <input
                    type="text"
                    value={url}
                    onChange={(e) => handleUrlChange(idx, e.target.value)}
                    placeholder={`https://github.com/owner/repo-${idx + 1}`}
                    disabled={loading}
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50"
                  />
                  {repoUrls.length > 2 && (
                    <button
                      type="button"
                      onClick={() => removeUrlField(idx)}
                      disabled={loading}
                      className="px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg disabled:opacity-50"
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={addUrlField}
              disabled={loading}
              className="w-full px-4 py-2 text-blue-600 border border-blue-300 rounded-lg hover:bg-blue-50 disabled:opacity-50"
            >
              + Add Repository
            </button>

            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-800">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading || repoUrls.filter((u) => u.trim()).length < 2}
              className="w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="inline-block h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Comparing...
                </span>
              ) : (
                "Compare Repositories"
              )}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
