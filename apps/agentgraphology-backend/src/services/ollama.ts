/**
 * Ollama Service - Local LLM Inference for Scoring Reasoning
 * Provides AI-powered analysis without cloud API costs
 */

import type { OllamaRequest, OllamaResponse } from "../types/index.js";
import { logger } from "../utils/logger.js";

export class OllamaService {
  private readonly baseUrl: string;
  private readonly model: string;
  private isHealthy: boolean = false;

  constructor(baseUrl: string = "http://localhost:11434", model: string = "mistral:7b-instruct") {
    this.baseUrl = baseUrl;
    this.model = model;
  }

  /**
   * Check if Ollama is running and model is available
   */
  async checkHealth(): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/api/tags`);
      if (!response.ok) {
        logger.error("Ollama health check failed");
        this.isHealthy = false;
        return false;
      }

      const data = (await response.json()) as { models: Array<{ name: string }> };
      const hasModel = data.models.some((m) => m.name.startsWith(this.model.split(":")[0]));

      if (!hasModel) {
        logger.warn(
          `Ollama model ${this.model} not found. Run: ollama pull ${this.model}`
        );
      }

      this.isHealthy = true;
      logger.info(`Ollama healthy with model: ${this.model}`);
      return true;
    } catch (error) {
      logger.error("Failed to connect to Ollama", { error });
      this.isHealthy = false;
      return false;
    }
  }

  /**
   * Perform inference with Ollama
   */
  async infer(prompt: string, options?: Partial<OllamaRequest>): Promise<string> {
    if (!this.isHealthy) {
      throw new Error("Ollama service is not healthy");
    }

    const request: OllamaRequest = {
      model: this.model,
      prompt,
      stream: false,
      temperature: options?.temperature ?? 0.7,
      top_p: options?.top_p ?? 0.9,
      top_k: options?.top_k ?? 40,
      num_predict: options?.num_predict ?? 500,
    };

    try {
      const response = await fetch(`${this.baseUrl}/api/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(request),
      });

      if (!response.ok) {
        throw new Error(`Ollama returned status ${response.status}`);
      }

      const data = (await response.json()) as OllamaResponse;
      return data.response.trim();
    } catch (error) {
      logger.error("Ollama inference failed", { error, prompt });
      throw new Error("Failed to generate inference");
    }
  }

  /**
   * Generate scoring explanation using Ollama
   */
  async generateScoringExplanation(
    dimension: string,
    score: number,
    maxScore: number,
    context: string
  ): Promise<string> {
    const prompt = `
You are an expert software integration evaluator. Given a repository evaluation, provide a brief, professional explanation.

Dimension: ${dimension}
Score: ${score}/${maxScore}
Context: ${context}

Provide a 2-3 sentence explanation of this score that:
1. Explains what the score means
2. Highlights key factors
3. Is actionable for a development team

Be concise and professional.`;

    try {
      const explanation = await this.infer(prompt, { num_predict: 300 });
      return explanation;
    } catch (error) {
      logger.error("Failed to generate explanation", { error, dimension });
      return `Score: ${score}/${maxScore}. ${context}`;
    }
  }

  /**
   * Generate risk assessment using Ollama
   */
  async assessRisks(repositoryName: string, scores: Record<string, number>): Promise<string[]> {
    const prompt = `
You are a software integration risk expert. Analyze this repository for potential integration risks.

Repository: ${repositoryName}
Scores:
- Developer Productivity: ${scores.productivity}/25
- Technical Debt: ${scores.technicalDebt}/25
- Business Fit: ${scores.businessFit}/20
- Implementation Effort: ${scores.effort}/20

List 3-5 specific, actionable risks in this format:
Risk: [Risk description]
Probability: [low/medium/high]
Impact: [low/medium/high]

Only list risks relevant to this repository's scores and characteristics.`;

    try {
      const response = await this.infer(prompt, { num_predict: 500 });
      return response.split("\n").filter((line) => line.includes("Risk:"));
    } catch (error) {
      logger.error("Failed to assess risks", { error });
      return [];
    }
  }

  /**
   * Generate implementation plan outline using Ollama
   */
  async generateImplementationOutline(
    repositoryName: string,
    productivityScore: number,
    effortScore: number
  ): Promise<string> {
    const prompt = `
You are an expert software integration planner. Create a high-level implementation outline.

Repository: ${repositoryName}
Productivity Benefit: ${productivityScore}/25
Effort Required: ${effortScore}/20

Provide a brief outline (3-5 phases) for integrating this tool, including:
- Phase name
- Key activities
- Estimated duration

Format as a concise bullet list. Focus on what makes sense given the scores.`;

    try {
      return await this.infer(prompt, { num_predict: 400 });
    } catch (error) {
      logger.error("Failed to generate implementation outline", { error });
      return "Standard integration approach: Setup → Configuration → Testing → Deployment";
    }
  }

  /**
   * Compare two repositories using Ollama
   */
  async compareRepositories(repo1: string, repo2: string): Promise<string> {
    const prompt = `
You are a software tool comparison expert. Compare two tools and provide a brief recommendation.

Tool 1: ${repo1}
Tool 2: ${repo2}

Provide a 2-3 sentence comparison highlighting:
1. Key differences
2. When to use each
3. General recommendation based on typical use cases

Be concise and impartial.`;

    try {
      return await this.infer(prompt, { num_predict: 300 });
    } catch (error) {
      logger.error("Failed to compare repositories", { error });
      return "Unable to generate comparison at this time.";
    }
  }

  /**
   * Get current health status
   */
  getStatus(): { healthy: boolean; model: string } {
    return {
      healthy: this.isHealthy,
      model: this.model,
    };
  }
}

export default new OllamaService();
