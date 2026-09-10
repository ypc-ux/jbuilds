"use client";

import { useState } from "react";
import Link from "next/link";
import { EvaluationForm } from "@/components/evaluation-form";
import { EvaluationResults } from "@/components/evaluation-results";
import { SiteFooter, SiteNav } from "@/components/site/site-chrome";
import type { EvaluationResult } from "@/lib/types";

// Inlined at build time. Unset means no scoring backend is reachable from this
// deployment — the protocol runs locally, so say that plainly instead of
// letting the form fail with a connection error.
const BACKEND_CONFIGURED = Boolean(process.env.NEXT_PUBLIC_API_URL);

export default function EvaluatePage() {
  const [evaluation, setEvaluation] = useState<EvaluationResult | null>(null);

  return (
    <>
      <SiteNav />
      <main className="min-h-screen px-6 pb-24 pt-32 md:px-10 md:pt-40">
        <div className="mx-auto w-full max-w-3xl">
          {!evaluation ? (
            <>
              <p className="mb-6 font-mono text-[11px] uppercase tracking-[0.3em] text-signal">
                Evaluation
              </p>
              <h1 className="text-headline font-semibold text-balance">
                Score a repository.
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-dim text-pretty">
                Five dimensions, one hundred points, a verdict with scope limits and a phased
                plan. Nothing is sent to a hosted model.
              </p>

              {!BACKEND_CONFIGURED && (
                <div className="mt-10 rounded-xl border border-verdict-mixed/40 bg-verdict-mixed/10 p-5">
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-verdict-mixed">
                    Scoring backend not connected
                  </p>
                  <p className="mt-2.5 text-sm leading-relaxed text-ink-dim text-pretty">
                    Inference runs on your own hardware through Ollama, so the evaluator needs a
                    backend you host. Run{" "}
                    <code className="rounded bg-void px-1.5 py-0.5 font-mono text-xs text-signal">
                      docker-compose up -d
                    </code>{" "}
                    from the repository, then set{" "}
                    <code className="rounded bg-void px-1.5 py-0.5 font-mono text-xs text-signal">
                      NEXT_PUBLIC_API_URL
                    </code>{" "}
                    to point at it.
                  </p>
                  <a
                    href="https://github.com/ypc-ux/jbuilds#quick-start"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-block font-mono text-[11px] uppercase tracking-[0.16em] text-signal hover:underline"
                  >
                    Setup guide →
                  </a>
                </div>
              )}

              <div className="mt-10 rounded-2xl border border-line bg-base p-7 md:p-9">
                <EvaluationForm onEvaluationComplete={setEvaluation} />
              </div>
            </>
          ) : (
            <>
              <button
                onClick={() => setEvaluation(null)}
                className="mb-8 font-mono text-[11px] uppercase tracking-[0.16em] text-ink-dim transition-colors hover:text-signal"
              >
                ← New evaluation
              </button>
              <EvaluationResults evaluation={evaluation} />
            </>
          )}

          <p className="mt-12 text-sm text-ink-faint">
            Comparing several options?{" "}
            <Link href="/compare" className="text-signal hover:underline">
              Use the comparison view
            </Link>
            .
          </p>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
