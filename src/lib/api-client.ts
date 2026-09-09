/**
 * API Client for AgentGraphology Backend
 * Handles all communication with the evaluation API
 */

import type {
  EvaluateRequest,
  EvaluateResponse,
  CompareRequest,
  CompareResponse,
  HealthResponse,
  Statistics,
  EvaluationResult,
} from "./types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

class ApiClient {
  private baseUrl: string;
  private timeout: number = 30000;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  /**
   * Make HTTP request with timeout
   */
  private async fetch<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    try {
      const url = `${this.baseUrl}${endpoint}`;
      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
        headers: {
          "Content-Type": "application/json",
          ...options.headers,
        },
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }

      return await response.json();
    } finally {
      clearTimeout(timeoutId);
    }
  }

  /**
   * Check API health
   */
  async health(): Promise<HealthResponse> {
    return this.fetch<HealthResponse>("/health");
  }

  /**
   * Evaluate a repository
   */
  async evaluate(request: EvaluateRequest): Promise<EvaluateResponse> {
    return this.fetch<EvaluateResponse>("/evaluate", {
      method: "POST",
      body: JSON.stringify(request),
    });
  }

  /**
   * Compare multiple repositories
   */
  async compare(request: CompareRequest): Promise<CompareResponse> {
    return this.fetch<CompareResponse>("/compare", {
      method: "POST",
      body: JSON.stringify(request),
    });
  }

  /**
   * Get evaluation by ID
   */
  async getEvaluation(id: string): Promise<{ success: boolean; evaluation?: EvaluationResult; error?: string }> {
    return this.fetch(`/evaluations/${id}`);
  }

  /**
   * Get statistics
   */
  async getStatistics(): Promise<{ success: boolean; statistics: Statistics }> {
    return this.fetch("/statistics");
  }
}

export const apiClient = new ApiClient();
