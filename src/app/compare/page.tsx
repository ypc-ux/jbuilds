"use client";

import { useState } from "react";
import { apiClient } from "@/lib/api-client";
import { EvaluationResults } from "@/components/evaluation-results";
import { SiteFooter, SiteNav } from "@/components/site/site-chrome";
import type { CompareResponse } from "@/lib/types";

export default function ComparePage() {
  const [repoUrls, setRepoUrls] = useState<string[]>(["", "", ""]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<CompareResponse | null>(null);

  const handleUrlChange = (index: number, value: string) => {
    const next = [...repoUrls];
    next[index] = value;
    setRepoUrls(next);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const validUrls = repoUrls.filter((url) => url.trim());
      if (validUrls.length < 2) {
        throw new Error("Enter at least two repository URLs");
      }

      const response = await apiClient.compare({ repoUrls: validUrls });
      if (!response.success) {
        throw new Error(response.error || "Failed to compare repositories");
      }

      setResult(response);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SiteNav />
      <main className="min-h-screen px-6 pb-24 pt-32 md:px-10 md:pt-40">
        <div className="mx-auto w-full max-w-4xl">
          <p className="mb-6 font-mono text-[11px] uppercase tracking-[0.3em] text-signal">Comparison</p>
          <h1 className="text-headline font-semibold text-balance">Score them side by side.</h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-dim text-pretty">
            The same rubric across every candidate, so the decision rests on one scale rather than
            three opinions.
          </p>

          {result ? (
            <div className="mt-12">
              <div className="grid gap-px overflow-hidden rounded-2xl bg-line sm:grid-cols-3">
                <div className="bg-base p-6">
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-faint">Compared</p>
                  <p className="mt-3 font-mono text-4xl tabular text-ink">
                    {result.comparison.totalEvaluated}
                  </p>
                </div>
                <div className="bg-base p-6">
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-faint">Average</p>
                  <p className="mt-3 font-mono text-4xl tabular text-signal">
                    {result.comparison.averageScore}
                  </p>
                </div>
                <div className="bg-base p-6">
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-faint">Range</p>
                  <p className="mt-3 font-mono text-4xl tabular text-ink">
                    {result.comparison.lowest.scores.totalScore}–
                    {result.comparison.highest.scores.totalScore}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setResult(null)}
                className="mt-8 font-mono text-[11px] uppercase tracking-[0.16em] text-ink-dim transition-colors hover:text-signal"
              >
                ← New comparison
              </button>

              <div className="mt-10 space-y-14">
                {result.evaluations.map((evaluation, idx) => (
                  <div key={idx} className="border-t border-line pt-10">
                    <EvaluationResults evaluation={evaluation} />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="mt-10 rounded-2xl border border-line bg-base p-7 md:p-9">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-3">
                  {repoUrls.map((url, idx) => (
                    <div key={idx} className="flex gap-3">
                      <input
                        type="text"
                        value={url}
                        onChange={(e) => handleUrlChange(idx, e.target.value)}
                        placeholder={`https://github.com/owner/repo-${idx + 1}`}
                        disabled={loading}
                        className="flex-1 rounded-xl border border-line-bright bg-void px-4 py-3.5 font-mono text-sm text-ink placeholder:text-ink-faint focus:border-signal focus:outline-none disabled:opacity-50"
                      />
                      {repoUrls.length > 2 && (
                        <button
                          type="button"
                          onClick={() => setRepoUrls(repoUrls.filter((_, i) => i !== idx))}
                          disabled={loading}
                          className="rounded-xl border border-line px-4 font-mono text-[10px] uppercase tracking-[0.16em] text-ink-faint transition-colors hover:border-verdict-avoid hover:text-verdict-avoid disabled:opacity-50"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => setRepoUrls([...repoUrls, ""])}
                  disabled={loading}
                  className="w-full rounded-xl border border-line-bright py-2.5 font-mono text-[11px] uppercase tracking-[0.16em] text-ink-dim transition-colors hover:border-signal hover:text-signal disabled:opacity-50"
                >
                  Add repository
                </button>

                {error && (
                  <div className="rounded-xl border border-verdict-avoid/40 bg-verdict-avoid/10 p-4">
                    <p className="text-sm text-ink-dim">{error}</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading || repoUrls.filter((u) => u.trim()).length < 2}
                  className="w-full rounded-xl bg-signal px-6 py-3.5 text-sm font-semibold text-void transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {loading ? "Comparing…" : "Compare repositories"}
                </button>
              </form>
            </div>
          )}
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
