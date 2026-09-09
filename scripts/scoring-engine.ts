/**
 * Integration Protocol Scoring Engine
 * Implements the 5-dimensional scoring rubric for repository evaluation
 */

import type { IntegrationEvaluation, DimensionScore } from './types';

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

export interface ScoringResult {
  scores: {
    productivity: DimensionScore;
    technicalDebt: DimensionScore;
    businessFit: DimensionScore;
    implementationEffort: DimensionScore;
    costBenefit: DimensionScore;
  };
  totalScore: number;
  decision: 'INTEGRATE_IMMEDIATELY' | 'INTEGRATE_SOON' | 'EVALUATE_ALTERNATIVES' | 'NOT_RECOMMENDED';
  roiRatio: number;
  reasoning: {
    productivity: string;
    technicalDebt: string;
    businessFit: string;
    implementationEffort: string;
    costBenefit: string;
  };
}

export class ScoringEngine {
  scoreProductivity(input: ScoringInput['productivity']): DimensionScore {
    let score = 0;
    const evidence: string[] = [];

    // Time savings
    if (input.hoursSavedPerWeek >= 3) {
      score += 10;
      evidence.push(`Saves ${input.hoursSavedPerWeek}+ hours/week (major)`);
    } else if (input.hoursSavedPerWeek >= 1) {
      score += 5;
      evidence.push(`Saves ${input.hoursSavedPerWeek} hours/week (moderate)`);
    }

    // Code reuse
    if (input.codeReuseBenefit) {
      score += 5;
      evidence.push('Reduces code duplication (DRY benefit)');
    }

    // Workflow acceleration
    if (input.workflowAcceleration) {
      score += 5;
      evidence.push('Accelerates common workflows');
    }

    // DX improvement
    if (input.dxImprovement) {
      score += 3;
      evidence.push('Improves developer experience');
    }

    // Learning value
    if (input.learningValue) {
      score += 2;
      evidence.push('Provides learning value');
    }

    return {
      score: Math.min(score, 25),
      maxScore: 25,
      evidence,
    };
  }

  scoreTechnicalDebt(input: ScoringInput['technicalDebt']): DimensionScore {
    let score = 0;
    const evidence: string[] = [];

    // Positive factors
    if (input.codeQualityImprovement) {
      score += 5;
      evidence.push('Improves code quality/readability');
    }

    if (input.techStackMatch) {
      score += 5;
      evidence.push('Matches tech stack conventions');
    }

    if (input.dependencyCount <= 1) {
      score += 5;
      evidence.push('No additional dependencies (or reduces them)');
    } else if (input.dependencyCount <= 3) {
      score += 3;
      evidence.push(`Moderate dependencies (${input.dependencyCount})`);
    } else {
      score -= 2;
      evidence.push(`High dependency count (${input.dependencyCount})`);
    }

    if (input.isWellMaintained) {
      score += 5;
      evidence.push('Well-maintained with active community');
    }

    if (input.hasTests) {
      score += 3;
      evidence.push('Has comprehensive tests');
    }

    if (input.hasDocumentation) {
      score += 2;
      evidence.push('Good documentation');
    }

    // Negative factors
    if (input.introducesDebt) {
      score -= 5;
      evidence.push('Introduces technical debt / outdated dependencies');
    }

    if (input.conflictsWithPatterns) {
      score -= 5;
      evidence.push('Conflicts with existing patterns');
    }

    if (input.securityConcerns) {
      score -= 5;
      evidence.push('Poor security posture');
    }

    return {
      score: Math.max(0, Math.min(score, 25)),
      maxScore: 25,
      evidence,
    };
  }

  scoreBusinessFit(input: ScoringInput['businessFit']): DimensionScore {
    let score = 0;
    const evidence: string[] = [];

    if (input.solvesProblem) {
      score += 5;
      evidence.push('Solves an explicitly identified problem');
    }

    if (input.fillsGap) {
      score += 5;
      evidence.push('Fills a gap in product/service');
    }

    if (input.enablesNewCategory) {
      score += 5;
      evidence.push('Enables new feature category');
    }

    if (input.strengthensExisting) {
      score += 5;
      evidence.push('Strengthens existing domain');
    }

    if (score === 0) {
      evidence.push('Nice-to-have but not critical');
    }

    return {
      score: Math.min(score, 20),
      maxScore: 20,
      evidence,
    };
  }

  scoreImplementationEffort(input: ScoringInput['implementationEffort']): DimensionScore {
    let score = 0;
    const evidence: string[] = [];
    const hours = input.estimatedHours;

    if (hours <= 4) {
      score = 20;
      evidence.push(`Plug-and-play integration (${hours} hours)`);
    } else if (hours <= 8) {
      score = 15;
      evidence.push(`Minimal customization needed (${hours} hours)`);
    } else if (hours <= 40) {
      score = 10;
      evidence.push(`Moderate integration required (${Math.ceil(hours / 8)} days)`);
    } else if (hours <= 120) {
      score = 5;
      evidence.push(`Significant refactoring needed (${Math.ceil(hours / 8)} days)`);
    } else {
      score = 0;
      evidence.push(`Requires major rebuild (${Math.ceil(hours / 8)} days+)`);
    }

    return {
      score,
      maxScore: 20,
      evidence,
    };
  }

  scoreCostBenefit(input: ScoringInput['costBenefit']): DimensionScore {
    const totalHoursSaved = input.developerCount * input.hoursSavedPerDeveloperPerYear;
    const roiRatio = totalHoursSaved / input.integrationEffortHours;

    let score = 0;
    const evidence: string[] = [];

    evidence.push(`${totalHoursSaved} hours saved/year ÷ ${input.integrationEffortHours} hours = ${roiRatio.toFixed(1)}:1 ROI`);

    if (roiRatio > 50) {
      score = 10;
      evidence.push('Exceptional ROI (>50:1)');
    } else if (roiRatio > 20) {
      score = 8;
      evidence.push('Strong ROI (20-50:1)');
    } else if (roiRatio > 10) {
      score = 6;
      evidence.push('Good ROI (10-20:1)');
    } else if (roiRatio > 5) {
      score = 4;
      evidence.push('Moderate ROI (5-10:1)');
    } else if (roiRatio > 2) {
      score = 2;
      evidence.push('Marginal ROI (2-5:1)');
    } else {
      score = 0;
      evidence.push('Poor ROI (<2:1)');
    }

    return {
      score,
      maxScore: 10,
      evidence,
    };
  }

  generateDecision(totalScore: number): ScoringResult['decision'] {
    if (totalScore >= 85) {
      return 'INTEGRATE_IMMEDIATELY';
    } else if (totalScore >= 70) {
      return 'INTEGRATE_SOON';
    } else if (totalScore >= 55) {
      return 'EVALUATE_ALTERNATIVES';
    } else {
      return 'NOT_RECOMMENDED';
    }
  }

  generateReasoningSummary(
    scores: ScoringResult['scores'],
    decision: ScoringResult['decision']
  ): ScoringResult['reasoning'] {
    const productivitySum = scores.productivity.evidence.join('; ');
    const debtSum = scores.technicalDebt.evidence.join('; ');
    const fitSum = scores.businessFit.evidence.join('; ');
    const effortSum = scores.implementationEffort.evidence.join('; ');
    const roiSum = scores.costBenefit.evidence.join('; ');

    return {
      productivity: productivitySum || 'Minimal productivity impact',
      technicalDebt: debtSum || 'No technical debt concerns',
      businessFit: fitSum || 'Limited business value',
      implementationEffort: effortSum || 'Unknown effort',
      costBenefit: roiSum || 'Unable to calculate ROI',
    };
  }

  score(input: ScoringInput): ScoringResult {
    const scores = {
      productivity: this.scoreProductivity(input.productivity),
      technicalDebt: this.scoreTechnicalDebt(input.technicalDebt),
      businessFit: this.scoreBusinessFit(input.businessFit),
      implementationEffort: this.scoreImplementationEffort(input.implementationEffort),
      costBenefit: this.scoreCostBenefit(input.costBenefit),
    };

    const totalScore =
      scores.productivity.score +
      scores.technicalDebt.score +
      scores.businessFit.score +
      scores.implementationEffort.score +
      scores.costBenefit.score;

    const decision = this.generateDecision(totalScore);
    const reasoning = this.generateReasoningSummary(scores, decision);

    const roiRatio =
      input.costBenefit.developerCount * input.costBenefit.hoursSavedPerDeveloperPerYear /
      input.costBenefit.integrationEffortHours;

    return {
      scores,
      totalScore,
      decision,
      roiRatio: parseFloat(roiRatio.toFixed(1)),
      reasoning,
    };
  }
}

// Export singleton instance
export const scoringEngine = new ScoringEngine();
