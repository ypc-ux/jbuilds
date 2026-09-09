/**
 * TypeScript types for Integration Protocol evaluation
 */

export interface DimensionScore {
  score: number;
  maxScore: number;
  evidence: string[];
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
  lastPush: string;
  createdAt: string;
  size: number;
  isArchived: boolean;
  isFork: boolean;
}

export interface IntakeChecklistData {
  repo: RepositoryMetadata;
  maturity: 'alpha' | 'beta' | 'stable' | 'mature';
  lastUpdateDays: number;
  isActivelyMaintained: boolean;
  dependencies: {
    count: number;
    major: string[];
    outdated: string[];
  };
  testCoverage?: number;
  hasDocumentation: boolean;
  documentationQuality: 'poor' | 'moderate' | 'good' | 'excellent';
  securityIssues: {
    count: number;
    criticalCount: number;
    issues: string[];
  };
  businessProblem: string;
  integrationComplexity: 'easy' | 'moderate' | 'complex';
  teamFamiliarity: 'never' | 'used_before' | 'expert';
  businessDomain: string;
}

export interface ScoringInput {
  productivity: {
    hoursSavedPerWeek: number;
    codeReuseBenefit: boolean;
    workflowAcceleration: boolean;
    dxImprovement: boolean;
    learningValue: boolean;
  };
  technicalDebt: {
    codeQualityImprovement: boolean;
    techStackMatch: boolean;
    dependencyCount: number;
    isWellMaintained: boolean;
    hasTests: boolean;
    hasDocumentation: boolean;
    introducesDebt: boolean;
    conflictsWithPatterns: boolean;
    securityConcerns: boolean;
  };
  businessFit: {
    solvesProblem: boolean;
    fillsGap: boolean;
    enablesNewCategory: boolean;
    strengthensExisting: boolean;
  };
  implementationEffort: {
    estimatedHours: number;
  };
  costBenefit: {
    developerCount: number;
    hoursSavedPerDeveloperPerYear: number;
    integrationEffortHours: number;
  };
}

export type Decision = 'INTEGRATE_IMMEDIATELY' | 'INTEGRATE_SOON' | 'EVALUATE_ALTERNATIVES' | 'NOT_RECOMMENDED';

export interface ScoringResult {
  scores: {
    productivity: DimensionScore;
    technicalDebt: DimensionScore;
    businessFit: DimensionScore;
    implementationEffort: DimensionScore;
    costBenefit: DimensionScore;
  };
  totalScore: number;
  decision: Decision;
  roiRatio: number;
  reasoning: {
    productivity: string;
    technicalDebt: string;
    businessFit: string;
    implementationEffort: string;
    costBenefit: string;
  };
}

export interface IntegrationPattern {
  type: 'data_source' | 'component_library' | 'utility_library' | 'service' | 'infrastructure' | 'api';
  description: string;
  targetLayers: string[];
  integrationPoints: string[];
  exampleFiles: string[];
}

export interface IntegrationRecommendation {
  pattern: IntegrationPattern;
  priority: 'high' | 'medium' | 'low';
  effortEstimate: string;
  description: string;
  risks: string[];
  mitigations: string[];
}

export interface IntegrationEvaluation {
  repositoryUrl: string;
  repositoryName: string;
  timestamp: string;
  intake: IntakeChecklistData;
  scoring: ScoringResult;
  recommendations: IntegrationRecommendation[];
  integrationPhases: IntegrationPhase[];
  successMetrics: string[];
  timeline: string;
  overallRisk: 'low' | 'medium' | 'high';
}

export interface IntegrationPhase {
  phase: number;
  name: string;
  duration: string;
  tasks: IntegrationTask[];
  effortHours: number;
}

export interface IntegrationTask {
  title: string;
  description: string;
  acceptanceCriteria: string[];
  effortHours: number;
  dependencies: string[];
  riskLevel: 'low' | 'medium' | 'high';
}

export interface EvaluationReport {
  evaluation: IntegrationEvaluation;
  generatedAt: string;
  version: string;
}
