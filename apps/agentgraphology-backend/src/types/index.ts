/**
 * Core type definitions for AgentGraphology
 * Represents the Business Integration Protocol data models
 */

/**
 * Repository metadata from GitHub
 */
export interface RepositoryMetadata {
  url: string;
  name: string;
  owner: string;
  description: string;
  language: string;
  license: string;
  stars: number;
  forks: number;
  openIssues: number;
  watchers: number;
  size: number;
  isArchived: boolean;
  isFork: boolean;
  lastPush: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * Score for a single dimension
 */
export interface DimensionScore {
  score: number;
  maxScore: number;
  reasoning: string;
  evidence: string[];
}

/**
 * Complete scoring result across all 5 dimensions
 */
export interface ScoringResult {
  productivity: DimensionScore;
  technicalDebt: DimensionScore;
  businessFit: DimensionScore;
  implementationEffort: DimensionScore;
  costBenefit: DimensionScore;
  totalScore: number;
  decision: "INTEGRATE_IMMEDIATELY" | "INTEGRATE_SOON" | "EVALUATE_ALTERNATIVES" | "NOT_RECOMMENDED";
  roiRatio: number;
}

/**
 * Integration phase task
 */
export interface IntegrationTask {
  title: string;
  description: string;
  acceptanceCriteria: string[];
  effortHours: number;
  dependencies: string[];
  riskLevel: "low" | "medium" | "high";
}

/**
 * Single integration phase
 */
export interface IntegrationPhase {
  phase: number;
  name: string;
  duration: string;
  tasks: IntegrationTask[];
  effortHours: number;
}

/**
 * Risk assessment entry
 */
export interface RiskAssessment {
  risk: string;
  probability: "low" | "medium" | "high";
  impact: "low" | "medium" | "high";
  mitigation: string;
  contingency: string;
}

/**
 * Complete evaluation result
 */
export interface EvaluationResult {
  id: string;
  repositoryUrl: string;
  repositoryName: string;
  repositoryMetadata: RepositoryMetadata;
  timestamp: string;
  scores: ScoringResult;
  implementationPhases: IntegrationPhase[];
  risks: RiskAssessment[];
  successMetrics: string[];
  recommendations: string[];
}

/**
 * Database evaluation record
 */
export interface DatabaseEvaluation {
  id: string;
  repositoryUrl: string;
  repositoryName: string;
  scoreTotalScore: number;
  decision: string;
  roiRatio: number;
  scoreProductivity: number;
  scoreTechnicalDebt: number;
  scoreBusinessFit: number;
  scoreEffort: number;
  scoreCostBenefit: number;
  reasoning: Record<string, unknown>;
  phases: Record<string, unknown>;
  risks: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

/**
 * Ollama inference request
 */
export interface OllamaRequest {
  model: string;
  prompt: string;
  stream?: boolean;
  temperature?: number;
  top_p?: number;
  top_k?: number;
  num_predict?: number;
}

/**
 * Ollama inference response
 */
export interface OllamaResponse {
  model: string;
  created_at: string;
  response: string;
  done: boolean;
}

/**
 * API evaluation request
 */
export interface EvaluateRequest {
  repoUrl: string;
  teamSize?: number;
  priority?: "high" | "medium" | "low";
  customWeights?: {
    productivity?: number;
    technicalDebt?: number;
    businessFit?: number;
    effort?: number;
    costBenefit?: number;
  };
}

/**
 * API evaluation response
 */
export interface EvaluateResponse {
  success: boolean;
  evaluation: EvaluationResult | null;
  error?: string;
}

/**
 * API comparison request
 */
export interface CompareRequest {
  repoUrls: string[];
}

/**
 * API comparison response
 */
export interface CompareResponse {
  success: boolean;
  evaluations: EvaluationResult[];
  comparison: Record<string, unknown>;
  error?: string;
}

/**
 * Health check response
 */
export interface HealthResponse {
  status: "healthy" | "degraded" | "unhealthy";
  timestamp: string;
  ollama: {
    connected: boolean;
    model: string;
  };
  database: {
    connected: boolean;
  };
  version: string;
}
