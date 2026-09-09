"use client";

import { useState } from "react";
import { EvaluationForm } from "@/components/evaluation-form";
import { EvaluationResults } from "@/components/evaluation-results";
import type { EvaluationResult } from "@/lib/types";

export default function Home() {
  const [evaluation, setEvaluation] = useState<EvaluationResult | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <header className="border-b bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">AgentGraphology</h1>
              <p className="text-gray-600 mt-1">Profile Your Tools. Decide with Data.</p>
            </div>
            <a
              href="https://github.com/ypc-ux/jbuilds"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-900 font-medium"
            >
              GitHub ↗
            </a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {!evaluation ? (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-lg shadow-sm border p-8 mb-8">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Evaluate Any GitHub Repository
                </h2>
                <p className="text-gray-600">
                  Use the Business Integration Protocol to systematically score any tool, library, or service.
                  Learn whether it's worth integrating into your business, what effort it requires, and what value
                  it delivers.
                </p>
              </div>

              <EvaluationForm onEvaluationComplete={setEvaluation} />

              {/* Features */}
              <div className="mt-12 pt-8 border-t">
                <h3 className="font-semibold text-gray-900 mb-4">What We Evaluate</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="flex gap-3">
                    <div className="text-2xl">⚡</div>
                    <div>
                      <p className="font-semibold text-gray-900">Developer Productivity</p>
                      <p className="text-sm text-gray-600">Time savings and workflow efficiency</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="text-2xl">🏗️</div>
                    <div>
                      <p className="font-semibold text-gray-900">Technical Debt</p>
                      <p className="text-sm text-gray-600">Code quality and maintainability impact</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="text-2xl">📊</div>
                    <div>
                      <p className="font-semibold text-gray-900">Business Fit</p>
                      <p className="text-sm text-gray-600">Alignment with your goals</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="text-2xl">🛠️</div>
                    <div>
                      <p className="font-semibold text-gray-900">Implementation Effort</p>
                      <p className="text-sm text-gray-600">Integration complexity and timeline</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="text-2xl">💰</div>
                    <div>
                      <p className="font-semibold text-gray-900">ROI Analysis</p>
                      <p className="text-sm text-gray-600">Cost-benefit and payoff ratio</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="text-2xl">🎯</div>
                    <div>
                      <p className="font-semibold text-gray-900">Implementation Plan</p>
                      <p className="text-sm text-gray-600">Phased integration roadmap</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Info Section */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
                <h3 className="font-semibold text-blue-900 mb-2">Zero Cost AI</h3>
                <p className="text-sm text-blue-800">
                  Built on Ollama for completely local inference. No cloud API costs or data sharing.
                </p>
              </div>
              <div className="bg-green-50 rounded-lg p-6 border border-green-200">
                <h3 className="font-semibold text-green-900 mb-2">Open Source</h3>
                <p className="text-sm text-green-800">
                  Full source code available. Run locally or deploy to your infrastructure.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <button
              onClick={() => setEvaluation(null)}
              className="mb-6 text-blue-600 hover:text-blue-700 font-medium flex items-center gap-2"
            >
              ← New Evaluation
            </button>
            <EvaluationResults evaluation={evaluation} />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t bg-gray-50 py-8 mt-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-600">
            Built with Business Integration Protocol • Open Source • Zero Cloud Costs
          </p>
        </div>
      </footer>
    </div>
  );
}
