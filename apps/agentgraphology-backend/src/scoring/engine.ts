/**
 * Business Integration Protocol Scoring Engine
 * Implements 5-dimensional evaluation framework
 */

import type { RepositoryMetadata, ScoringResult, DimensionScore } from "../types/index.js";

export class ScoringEngine {
  /**
   * Score developer productivity (0-25 points)
   * Question: How much will this save developer time?
   */
  private scoreProductivity(metadata: RepositoryMetadata): DimensionScore {
    let score = 0;
    const evidence: string[] = [];

    // Check for common use cases that save time
    const timeSlashingKeywords = [
      "cli",
      "api",
      "sdk",
      "client",
      "library",
      "component",
      "utility",
      "framework",
      "automation",
      "tool",
    ];

    const hasTimeSlashing = timeSlashingKeywords.some((kw) =>
      metadata.description.toLowerCase().includes(kw)
    );

    if (hasTimeSlashing) {
      score += 5;
      evidence.push("Tool category indicates time savings potential");
    }

    // Check for active maintenance (proxy for reliability)
    const lastPushDate = new Date(metadata.lastPush);
    const daysSinceLastPush = Math.floor(
      (Date.now() - lastPushDate.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (daysSinceLastPush < 7) {
      score += 5;
      evidence.push("Actively maintained (update within 7 days)");
    } else if (daysSinceLastPush < 30) {
      score += 3;
      evidence.push("Regularly maintained (update within 30 days)");
    }

    // Check for community adoption (stars as proxy)
    if (metadata.stars > 10000) {
      score += 5;
      evidence.push("Strong community adoption (10k+ stars)");
    } else if (metadata.stars > 1000) {
      score += 3;
      evidence.push("Moderate community adoption (1k+ stars)");
    }

    // Boost for well-documented projects
    if (
      metadata.description &&
      metadata.description.length > 100 &&
      metadata.openIssues < metadata.stars / 100
    ) {
      score += 5;
      evidence.push("Well-maintained with low issue-to-star ratio");
    }

    // Cap at max
    const finalScore = Math.min(score, 25);

    return {
      score: finalScore,
      maxScore: 25,
      reasoning: this.generateReasoning(
        "Developer Productivity",
        finalScore,
        25,
        evidence
      ),
      evidence,
    };
  }

  /**
   * Score technical debt impact (0-25 points)
   * Question: Does this improve or harm code quality?
   */
  private scoreTechnicalDebt(metadata: RepositoryMetadata): DimensionScore {
    let score = 0;
    const evidence: string[] = [];

    // Check repository maturity
    const createdDate = new Date(metadata.createdAt);
    const ageYears = (Date.now() - createdDate.getTime()) / (1000 * 60 * 60 * 24 * 365);

    if (ageYears > 2) {
      score += 5;
      evidence.push("Mature project (2+ years old)");
    } else if (ageYears > 1) {
      score += 3;
      evidence.push("Established project (1+ years old)");
    }

    // Check for active maintenance
    const lastPushDate = new Date(metadata.lastPush);
    const daysSinceLastPush = Math.floor(
      (Date.now() - lastPushDate.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (daysSinceLastPush < 30) {
      score += 5;
      evidence.push("Well-maintained with recent updates");
    }

    // Check for appropriate licensing
    if (metadata.license && metadata.license !== "unknown") {
      score += 3;
      evidence.push(`Clear licensing: ${metadata.license}`);
    }

    // Check issue health
    if (metadata.stars > 0) {
      const issueRatio = metadata.openIssues / metadata.stars;
      if (issueRatio < 0.01) {
        score += 5;
        evidence.push("Healthy issue-to-star ratio (<1%)");
      } else if (issueRatio < 0.05) {
        score += 3;
        evidence.push("Acceptable issue-to-star ratio (<5%)");
      }
    }

    // Penalty for archived repos
    if (metadata.isArchived) {
      score -= 5;
      evidence.push("Repository is archived (no longer maintained)");
    }

    // Penalty for forks (unless very well-maintained)
    if (metadata.isFork && metadata.stars < 100) {
      score -= 3;
      evidence.push("Fork with limited adoption");
    }

    const finalScore = Math.max(0, Math.min(score, 25));

    return {
      score: finalScore,
      maxScore: 25,
      reasoning: this.generateReasoning(
        "Technical Debt Impact",
        finalScore,
        25,
        evidence
      ),
      evidence,
    };
  }

  /**
   * Score business domain fit (0-20 points)
   * Question: How well does this align with business goals?
   */
  private scoreBusinessFit(metadata: RepositoryMetadata): DimensionScore {
    let score = 0;
    const evidence: string[] = [];

    // Check for widespread adoption (indicator of business value)
    if (metadata.stars > 50000) {
      score += 5;
      evidence.push("Massive adoption (50k+ stars) - proven business value");
    } else if (metadata.stars > 10000) {
      score += 3;
      evidence.push("Strong adoption (10k+ stars)");
    }

    // Check for forks (indicator of reusability)
    if (metadata.forks > 1000) {
      score += 5;
      evidence.push("High fork rate (1000+) - strong business applicability");
    } else if (metadata.forks > 100) {
      score += 3;
      evidence.push("Moderate fork rate (100+)");
    }

    // Check for active community engagement
    if (metadata.watchers > 1000) {
      score += 5;
      evidence.push("Active community (1000+ watchers)");
    } else if (metadata.watchers > 100) {
      score += 2;
      evidence.push("Growing community");
    }

    // Check description for business keywords
    const businessKeywords = [
      "production",
      "enterprise",
      "scalable",
      "performance",
      "reliability",
      "security",
      "integration",
      "platform",
    ];

    const hasBizKeywords = businessKeywords.some((kw) =>
      metadata.description.toLowerCase().includes(kw)
    );

    if (hasBizKeywords) {
      score += 2;
      evidence.push("Description includes business-relevant keywords");
    }

    const finalScore = Math.min(score, 20);

    return {
      score: finalScore,
      maxScore: 20,
      reasoning: this.generateReasoning(
        "Business Domain Fit",
        finalScore,
        20,
        evidence
      ),
      evidence,
    };
  }

  /**
   * Score implementation effort (0-20 points)
   * Question: How much work is required to integrate?
   */
  private scoreImplementationEffort(metadata: RepositoryMetadata): DimensionScore {
    let score = 0;
    const evidence: string[] = [];

    // Smaller repos are typically easier to integrate
    if (metadata.size < 1000) {
      score += 5;
      evidence.push("Small codebase (<1MB) - easy to integrate");
    } else if (metadata.size < 10000) {
      score += 3;
      evidence.push("Moderate size (1-10MB)");
    } else {
      score += 1;
      evidence.push("Large codebase (>10MB) - may require effort");
    }

    // Simple language ecosystems are easier
    const simpleLanguages = ["javascript", "typescript", "python", "go"];
    if (
      metadata.language &&
      simpleLanguages.includes(metadata.language.toLowerCase())
    ) {
      score += 5;
      evidence.push(`${metadata.language} - mature ecosystem`);
    }

    // Good documentation (inferred from description quality)
    if (metadata.description && metadata.description.length > 200) {
      score += 5;
      evidence.push("Comprehensive documentation (detailed description)");
    }

    // Low fork ratio (easier to keep synchronized)
    if (metadata.forks / (metadata.stars + 1) < 0.05) {
      score += 3;
      evidence.push("Stable API (low churn relative to adoption)");
    }

    const finalScore = Math.min(score, 20);

    return {
      score: finalScore,
      maxScore: 20,
      reasoning: this.generateReasoning(
        "Implementation Effort",
        finalScore,
        20,
        evidence
      ),
      evidence,
    };
  }

  /**
   * Score cost-benefit ratio (0-10 points)
   * Question: Does the value justify the effort?
   */
  private scoreCostBenefit(
    metadata: RepositoryMetadata,
    productivityScore: DimensionScore,
    effortScore: DimensionScore
  ): DimensionScore {
    const evidence: string[] = [];

    // Heuristic ROI calculation
    // Productivity score (0-25) suggests time saved
    // Effort score (0-20) suggests integration cost
    const roiIndicator = (productivityScore.score * 4) / (effortScore.score + 1);

    let score = 0;

    if (roiIndicator > 50) {
      score = 10;
      evidence.push("Exceptional ROI (>50:1)");
    } else if (roiIndicator > 20) {
      score = 8;
      evidence.push("Strong ROI (20-50:1)");
    } else if (roiIndicator > 10) {
      score = 6;
      evidence.push("Good ROI (10-20:1)");
    } else if (roiIndicator > 5) {
      score = 4;
      evidence.push("Moderate ROI (5-10:1)");
    } else if (roiIndicator > 2) {
      score = 2;
      evidence.push("Marginal ROI (2-5:1)");
    } else {
      score = 0;
      evidence.push("Poor ROI (<2:1)");
    }

    // Adjust for maturity
    if (metadata.isArchived) {
      score = Math.max(0, score - 2);
      evidence.push("Archived project reduces ROI");
    }

    return {
      score: Math.max(0, Math.min(score, 10)),
      maxScore: 10,
      reasoning: this.generateReasoning("Cost-Benefit Ratio", score, 10, evidence),
      evidence,
    };
  }

  /**
   * Calculate total score and recommendation
   */
  private calculateTotalScore(dimensions: {
    productivity: DimensionScore;
    technicalDebt: DimensionScore;
    businessFit: DimensionScore;
    implementationEffort: DimensionScore;
    costBenefit: DimensionScore;
  }): { totalScore: number; decision: string; roiRatio: number } {
    const totalScore =
      dimensions.productivity.score +
      dimensions.technicalDebt.score +
      dimensions.businessFit.score +
      dimensions.implementationEffort.score +
      dimensions.costBenefit.score;

    // Estimate ROI ratio from scores
    const roiRatio = Math.max(
      0.5,
      (dimensions.costBenefit.score / 10) * 25 * 10
    );

    let decision: string;
    if (totalScore >= 85) {
      decision = "INTEGRATE_IMMEDIATELY";
    } else if (totalScore >= 70) {
      decision = "INTEGRATE_SOON";
    } else if (totalScore >= 55) {
      decision = "EVALUATE_ALTERNATIVES";
    } else {
      decision = "NOT_RECOMMENDED";
    }

    return { totalScore, decision, roiRatio };
  }

  /**
   * Generate reasoning text for a dimension
   */
  private generateReasoning(
    dimension: string,
    score: number,
    maxScore: number,
    evidence: string[]
  ): string {
    const percentage = Math.round((score / maxScore) * 100);
    const summary = evidence.slice(0, 2).join("; ");
    return `${dimension}: ${score}/${maxScore} (${percentage}%) - ${summary}`;
  }

  /**
   * Score a repository across all dimensions
   */
  public scoreRepository(metadata: RepositoryMetadata): ScoringResult {
    const productivity = this.scoreProductivity(metadata);
    const technicalDebt = this.scoreTechnicalDebt(metadata);
    const businessFit = this.scoreBusinessFit(metadata);
    const implementationEffort = this.scoreImplementationEffort(metadata);
    const costBenefit = this.scoreCostBenefit(
      metadata,
      productivity,
      implementationEffort
    );

    const dimensions = {
      productivity,
      technicalDebt,
      businessFit,
      implementationEffort,
      costBenefit,
    };

    const { totalScore, decision, roiRatio } = this.calculateTotalScore(dimensions);

    return {
      ...dimensions,
      totalScore,
      decision: decision as any,
      roiRatio: Math.round(roiRatio * 10) / 10,
    };
  }
}

export default new ScoringEngine();
