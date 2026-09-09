/**
 * Integration Protocol Report Generator
 * Formats evaluation results into markdown and JSON reports
 */

import type { EvaluationReport, IntegrationEvaluation, ScoringResult } from './types';

export class ReportGenerator {
  private getDecisionEmoji(decision: string): string {
    switch (decision) {
      case 'INTEGRATE_IMMEDIATELY':
        return '✅✅';
      case 'INTEGRATE_SOON':
        return '✅';
      case 'EVALUATE_ALTERNATIVES':
        return '⚠️';
      case 'NOT_RECOMMENDED':
        return '❌';
      default:
        return '❓';
    }
  }

  private getDecisionDescription(decision: string): string {
    switch (decision) {
      case 'INTEGRATE_IMMEDIATELY':
        return 'INTEGRATE IMMEDIATELY (High value, manageable effort)';
      case 'INTEGRATE_SOON':
        return 'INTEGRATE SOON (Good value, reasonable complexity)';
      case 'EVALUATE_ALTERNATIVES':
        return 'EVALUATE ALTERNATIVES (Moderate value, higher effort)';
      case 'NOT_RECOMMENDED':
        return 'NOT RECOMMENDED (Low ROI, poor fit, or high complexity)';
      default:
        return 'UNKNOWN';
    }
  }

  private formatScore(score: number, maxScore: number): string {
    const percentage = Math.round((score / maxScore) * 100);
    const bar = this.getProgressBar(percentage, 10);
    return `${score}/${maxScore} (${percentage}%) ${bar}`;
  }

  private getProgressBar(percentage: number, width: number): string {
    const filled = Math.round((percentage / 100) * width);
    const empty = width - filled;
    return `[${'█'.repeat(filled)}${' '.repeat(empty)}]`;
  }

  generateMarkdownReport(evaluation: IntegrationEvaluation): string {
    const { repositoryName, repositoryUrl, scoring, intake, recommendations, integrationPhases, successMetrics, timeline, overallRisk } = evaluation;

    const decisionEmoji = this.getDecisionEmoji(scoring.decision);
    const decisionText = this.getDecisionDescription(scoring.decision);

    let markdown = `# Integration Evaluation: ${repositoryName}

**Repository:** [${repositoryUrl}](${repositoryUrl})
**Evaluated:** ${evaluation.timestamp}
**Overall Risk:** ${overallRisk.toUpperCase()}

---

## Executive Summary

${decisionEmoji} **Decision: ${decisionText}**

**Total Score:** ${scoring.totalScore}/100
**ROI Ratio:** ${scoring.roiRatio}:1
**Timeline:** ${timeline}

---

## Scoring Breakdown

### Developer Productivity: ${this.formatScore(scoring.scores.productivity.score, scoring.scores.productivity.maxScore)}
${scoring.reasoning.productivity}

**Evidence:**
${scoring.scores.productivity.evidence.map((e) => `- ${e}`).join('\n')}

### Technical Debt Impact: ${this.formatScore(scoring.scores.technicalDebt.score, scoring.scores.technicalDebt.maxScore)}
${scoring.reasoning.technicalDebt}

**Evidence:**
${scoring.scores.technicalDebt.evidence.map((e) => `- ${e}`).join('\n')}

### Business Domain Fit: ${this.formatScore(scoring.scores.businessFit.score, scoring.scores.businessFit.maxScore)}
${scoring.reasoning.businessFit}

**Evidence:**
${scoring.scores.businessFit.evidence.map((e) => `- ${e}`).join('\n')}

### Implementation Effort: ${this.formatScore(scoring.scores.implementationEffort.score, scoring.scores.implementationEffort.maxScore)}
${scoring.reasoning.implementationEffort}

**Evidence:**
${scoring.scores.implementationEffort.evidence.map((e) => `- ${e}`).join('\n')}

### Cost-Benefit Ratio: ${this.formatScore(scoring.scores.costBenefit.score, scoring.scores.costBenefit.maxScore)}
${scoring.reasoning.costBenefit}

**Evidence:**
${scoring.scores.costBenefit.evidence.map((e) => `- ${e}`).join('\n')}

---

## Repository Overview

**Name:** ${intake.repo.name}
**Owner:** ${intake.repo.owner}
**Language:** ${intake.repo.language}
**License:** ${intake.repo.license}
**Stars:** ${intake.repo.stars.toLocaleString()}
**Forks:** ${intake.repo.forks.toLocaleString()}
**Open Issues:** ${intake.repo.openIssues.toLocaleString()}
**Size:** ${intake.repo.size} KB
**Last Push:** ${intake.repo.lastPush}

**Maturity:** ${intake.maturity.toUpperCase()}
**Active Maintenance:** ${intake.isActivelyMaintained ? 'Yes ✅' : 'No ❌'}
**Days Since Last Update:** ${intake.lastUpdateDays}

**Dependencies:** ${intake.dependencies.count}
${intake.dependencies.outdated.length > 0 ? `**Outdated Deps:** ${intake.dependencies.outdated.join(', ')}\n` : ''}
${intake.securityIssues.count > 0 ? `**Security Issues:** ${intake.securityIssues.count} (${intake.securityIssues.criticalCount} critical)\n` : '**Security:** No known issues ✅\n'}

**Documentation:** ${intake.documentationQuality.charAt(0).toUpperCase() + intake.documentationQuality.slice(1)}
**Test Coverage:** ${intake.testCoverage ? `${intake.testCoverage}%` : 'Unknown'}

**Business Problem Addressed:**
> ${intake.businessProblem}

**Business Domain:** ${intake.businessDomain}
**Integration Complexity:** ${intake.integrationComplexity.toUpperCase()}

---

## Integration Recommendations

${recommendations.map((rec, i) => {
  return `### Recommendation ${i + 1}: ${rec.pattern.description}

**Pattern Type:** ${rec.pattern.type.toUpperCase().replace(/_/g, ' ')}
**Priority:** ${rec.priority.toUpperCase()}
**Effort:** ${rec.effortEstimate}

**Description:**
${rec.description}

**Integration Points:**
${rec.pattern.integrationPoints.map((p) => `- ${p}`).join('\n')}

**Risks:**
${rec.risks.map((r) => `- ${r}`).join('\n')}

**Mitigations:**
${rec.mitigations.map((m) => `- ${m}`).join('\n')}

**Example Files:**
\`\`\`
${rec.pattern.exampleFiles.join('\n')}
\`\`\`
`;
}).join('\n---\n\n')}

---

## Implementation Phases

${integrationPhases.map((phase) => {
  return `### Phase ${phase.phase}: ${phase.name}

**Duration:** ${phase.duration}
**Effort:** ${phase.effortHours} hours

${phase.tasks.map((task) => {
  return `#### ${task.title}

**Description:** ${task.description}
**Effort:** ${task.effortHours} hours
**Risk Level:** ${task.riskLevel.toUpperCase()}

**Acceptance Criteria:**
${task.acceptanceCriteria.map((c) => `- [ ] ${c}`).join('\n')}

${task.dependencies.length > 0 ? `**Dependencies:** ${task.dependencies.join(', ')}\n` : ''}`;
}).join('\n\n')}
`;
}).join('\n---\n\n')}

---

## Success Metrics

- [ ] ${successMetrics.join('\n- [ ] ')}

---

## Risk Assessment

**Overall Risk Level:** ${overallRisk.toUpperCase()}

### Mitigation Strategy

Based on the risk level, consider:

${overallRisk === 'low' ? `
- Standard implementation process
- Regular team check-ins
- Measure actual vs. estimated effort
- Track productivity gains
` : overallRisk === 'medium' ? `
- Assign experienced developer
- Weekly progress reviews
- Build in contingency time (20%)
- Prepare rollback plan
- Test thoroughly before production
` : `
- High oversight and governance
- Dedicated project manager
- Daily progress tracking
- Multiple team members involved
- Extended testing phase
- Detailed rollback procedure
- Consider phased rollout
`}

---

## Next Steps

1. **Review** this evaluation with your team
2. **Discuss** the recommendations and integration approach
3. **Approve** the integration plan (or suggest alternatives)
4. **Schedule** implementation in the appropriate sprint
5. **Track** actual effort and productivity outcomes
6. **Re-evaluate** in 6-12 months to measure impact

---

## Decision Framework Reference

| Score Range | Decision | Action |
|------------|----------|--------|
| 85-100 | ✅✅ Integrate Immediately | Start this sprint |
| 70-84 | ✅ Integrate Soon | Schedule for upcoming sprint |
| 55-69 | ⚠️ Evaluate Alternatives | Research competing solutions |
| <55 | ❌ Not Recommended | Decline unless constraints change |

**This evaluation used the Business Integration Protocol v1.0**
See \`docs/INTEGRATION_PROTOCOL.md\` for detailed scoring methodology.

---

*Report generated on ${new Date().toISOString()}*
`;

    return markdown;
  }

  generateJsonReport(evaluation: IntegrationEvaluation): object {
    return {
      repositoryName: evaluation.repositoryName,
      repositoryUrl: evaluation.repositoryUrl,
      timestamp: evaluation.timestamp,
      decision: evaluation.scoring.decision,
      totalScore: evaluation.scoring.totalScore,
      roiRatio: evaluation.scoring.roiRatio,
      overallRisk: evaluation.overallRisk,
      scores: {
        productivity: {
          score: evaluation.scoring.scores.productivity.score,
          maxScore: evaluation.scoring.scores.productivity.maxScore,
          evidence: evaluation.scoring.scores.productivity.evidence,
        },
        technicalDebt: {
          score: evaluation.scoring.scores.technicalDebt.score,
          maxScore: evaluation.scoring.scores.technicalDebt.maxScore,
          evidence: evaluation.scoring.scores.technicalDebt.evidence,
        },
        businessFit: {
          score: evaluation.scoring.scores.businessFit.score,
          maxScore: evaluation.scoring.scores.businessFit.maxScore,
          evidence: evaluation.scoring.scores.businessFit.evidence,
        },
        implementationEffort: {
          score: evaluation.scoring.scores.implementationEffort.score,
          maxScore: evaluation.scoring.scores.implementationEffort.maxScore,
          evidence: evaluation.scoring.scores.implementationEffort.evidence,
        },
        costBenefit: {
          score: evaluation.scoring.scores.costBenefit.score,
          maxScore: evaluation.scoring.scores.costBenefit.maxScore,
          evidence: evaluation.scoring.scores.costBenefit.evidence,
        },
      },
      recommendations: evaluation.recommendations.map((rec) => ({
        type: rec.pattern.type,
        description: rec.pattern.description,
        priority: rec.priority,
        effortEstimate: rec.effortEstimate,
        risks: rec.risks,
        mitigations: rec.mitigations,
      })),
      successMetrics: evaluation.successMetrics,
      timeline: evaluation.timeline,
    };
  }
}

export const reportGenerator = new ReportGenerator();
