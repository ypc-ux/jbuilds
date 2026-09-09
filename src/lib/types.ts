/**
 * Type definitions for AgentGraphology API
 */

export interface DimensionScore {
  score: number;
  maxScore: number;
  reasoning: string;
  evidence?: string[];
}

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

export interface IntegrationTask {
  title: string;
  description: string;
  acceptanceCriteria: string[];
  effortHours: number;
  dependencies: string[];
  riskLevel: "low" | "medium" | "high";
}

export interface IntegrationPhase {
  phase: number;
  name: string;
  duration: string;
  tasks: IntegrationTask[];
  effortHours: number;
}

export interface RiskAssessment {
  risk: string;
  probability: "low" | "medium" | "high";
  impact: "low" | "medium" | "high";
  mitigation: string;
  contingency: string;
}

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

export interface EvaluateRequest {
  repoUrl: string;
  teamSize?: number;
  priority?: string;
}

export interface EvaluateResponse {
  success: boolean;
  evaluation: EvaluationResult | null;
  error?: string;
}

export interface CompareRequest {
  repoUrls: string[];
}

export interface CompareResponse {
  success: boolean;
  evaluations: EvaluationResult[];
  comparison: {
    totalEvaluated: number;
    highest: EvaluationResult;
    lowest: EvaluationResult;
    averageScore: number;
  };
  error?: string;
}

export interface Statistics {
  totalEvaluations: number;
  averageScore: number;
  highestScore: number;
  lowestScore: number;
}
