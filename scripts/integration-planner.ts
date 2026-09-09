/**
 * Integration Protocol Planner
 * Orchestrates Claude Agent to generate detailed implementation plans
 * from integration evaluation reports
 *
 * Usage: npx ts-node scripts/integration-planner.ts <evaluation-report.json>
 * Example: npx ts-node scripts/integration-planner.ts reports/integration-public-apis-*.json
 */

import * as fs from 'fs';
import * as path from 'path';
import type { EvaluationReport } from './types';

interface PlannerInput {
  report: EvaluationReport;
  teamSize: number;
  priorityLevel: 'high' | 'medium' | 'low';
  constraints?: string;
}

class IntegrationPlanner {
  private log(message: string, level: 'info' | 'warn' | 'error' = 'info') {
    const prefix = {
      info: '[ℹ️]',
      warn: '[⚠️]',
      error: '[❌]',
    };
    console.log(`${prefix[level]} ${message}`);
  }

  generatePrompt(input: PlannerInput): string {
    const { report, teamSize, priorityLevel, constraints } = input;
    const evaluation = report.evaluation;

    return `You are an expert Integration Advisor. You are analyzing an integration evaluation report and need to generate a detailed implementation plan.

## Integration Evaluation Summary

**Repository:** ${evaluation.repositoryName}
**URL:** ${evaluation.repositoryUrl}
**Score:** ${evaluation.scoring.totalScore}/100
**Decision:** ${evaluation.scoring.decision.replace(/_/g, ' ')}

## Scoring Breakdown
- Developer Productivity: ${evaluation.scoring.scores.productivity.score}/${evaluation.scoring.scores.productivity.maxScore}
  Evidence: ${evaluation.scoring.reasoning.productivity}

- Technical Debt: ${evaluation.scoring.scores.technicalDebt.score}/${evaluation.scoring.scores.technicalDebt.maxScore}
  Evidence: ${evaluation.scoring.reasoning.technicalDebt}

- Business Domain Fit: ${evaluation.scoring.scores.businessFit.score}/${evaluation.scoring.scores.businessFit.maxScore}
  Evidence: ${evaluation.scoring.reasoning.businessFit}

- Implementation Effort: ${evaluation.scoring.scores.implementationEffort.score}/${evaluation.scoring.scores.implementationEffort.maxScore}
  Evidence: ${evaluation.scoring.reasoning.implementationEffort}

- Cost-Benefit Ratio: ${evaluation.scoring.roiRatio}:1

## Context
- **Team Size:** ${teamSize} developers
- **Priority Level:** ${priorityLevel.toUpperCase()}
- **Overall Risk:** ${evaluation.overallRisk.toUpperCase()}
- **Timeline:** ${evaluation.timeline}
${constraints ? `- **Constraints:** ${constraints}` : ''}

## Recommended Integration Pattern
${evaluation.recommendations[0]?.pattern.type || 'utility_library'}

## Your Task

Create a detailed implementation plan following this structure:

### 1. Executive Summary
Brief (2-3 sentences) summary of what's being integrated and expected impact.

### 2. Implementation Phases
Define 3-4 phases with specific tasks:

**PHASE 1: [Phase Name]**
Duration: X days
Effort: X hours
Risk: Low/Medium/High

Tasks:
- **[Task Name]**
  - Description: [What needs to be done]
  - Effort: X hours
  - Acceptance Criteria:
    - [ ] Specific, measurable criterion
    - [ ] Technical requirement
    - [ ] Quality standard
  - Dependencies: [Other tasks or pre-requisites]
  - Risk: Low/Medium/High

[Additional tasks...]

[Repeat for subsequent phases]

### 3. Success Metrics
Define how to measure success (at least 4-5 specific metrics):
- [Measurable metric 1] - How to measure, success threshold
- [Measurable metric 2]
- ...

### 4. Risk Management
For each identified risk:
- **Risk:** [Specific risk description]
- **Probability:** Low/Medium/High
- **Impact:** Low/Medium/High
- **Mitigation:** [Concrete mitigation strategy]
- **Contingency:** [What to do if risk occurs]

### 5. Integration Checkpoints
Key milestones and decision points:
- **Week 1 Checkpoint:** [Decision/validation point]
- **Week 2 Checkpoint:** [Decision/validation point]
- **Pre-Production Checkpoint:** [Final validation]
- **Post-Launch Checkpoint:** [3-week follow-up]

### 6. Integration Points & Code Changes
Specific files and modules to create/modify:
- **Primary Integration:** [Files that will change significantly]
- **Secondary Integration:** [Files with minor changes]
- **New Files to Create:** [Structure and purpose]
- **Configuration Changes:** [.env, config files, etc.]

### 7. Testing Strategy
- **Unit Tests:** [What to test, coverage targets]
- **Integration Tests:** [Cross-module scenarios]
- **Performance Testing:** [Benchmarks, thresholds]
- **User Acceptance Testing:** [Team validation steps]

### 8. Rollback Plan
If integration needs to be reversed:
- **Rollback Trigger:** [When to rollback]
- **Rollback Steps:** [Specific commands/procedures]
- **Data Migration Reversal:** [If applicable]
- **Estimated Rollback Time:** [Duration]

### 9. Team & Skills
- **Required Skills:** [Expertise needed]
- **Recommended Team Size:** [Number of people]
- **Training Needs:** [Documentation/training required]
- **Suggested Lead:** [Role and responsibility]

### 10. Next Steps
- Immediate actions (this week)
- Decision gates (when to proceed to next phase)
- Communication plan (team updates, stakeholder involvement)

## Additional Guidance

1. **Be Specific:** Use concrete file paths, actual commands, and measurable criteria. "Implement feature" is not specific; "Create API endpoint GET /api/[resource]" is.

2. **Estimate Realistically:** Add 20-30% contingency to effort estimates, especially for high-risk items.

3. **Prioritize by Dependency:** Task sequencing should handle dependencies clearly. A task can't start until prerequisites are complete.

4. **Match Team Size:** Scale recommendations to ${teamSize} developers. With smaller teams, consider compressed timeline; larger teams could parallelize.

5. **Risk-Aware:** Higher risk integrations (${evaluation.overallRisk}) need more checkpoints, testing, and contingency planning.

6. **ROI-Focused:** Success metrics should demonstrate the ${evaluation.scoring.roiRatio}:1 ROI ratio is being achieved.

Generate the plan now, following the structure above exactly. Be thorough but concise - each section should be detailed enough to execute but not verbose.`;
  }

  async generateImplementationPlan(evaluationPath: string, teamSize: number = 4, priority: 'high' | 'medium' | 'low' = 'medium', constraints?: string): Promise<void> {
    try {
      // Read evaluation report
      this.log(`Reading evaluation report from ${evaluationPath}`);
      if (!fs.existsSync(evaluationPath)) {
        throw new Error(`Evaluation report not found: ${evaluationPath}`);
      }

      const reportContent = fs.readFileSync(evaluationPath, 'utf-8');
      const report = JSON.parse(reportContent) as EvaluationReport;

      // Create planner input
      const plannerInput: PlannerInput = {
        report,
        teamSize,
        priorityLevel: priority,
        constraints,
      };

      // Generate prompt
      this.log('Generating implementation plan prompt');
      const prompt = this.generatePrompt(plannerInput);

      // In a real implementation, this would call Claude API
      // For now, we'll provide instructions for using this with Claude
      const planOutput = `
# Integration Implementation Plan Generator

**Evaluation Report:** ${evaluationPath}
**Team Size:** ${teamSize}
**Priority:** ${priority.toUpperCase()}

## How to Generate Your Implementation Plan

This tool prepares a detailed prompt for Claude to generate a comprehensive implementation plan. To generate the plan:

### Option 1: Use Claude Web Interface
1. Go to https://claude.ai
2. Copy and paste the prompt below into a new conversation
3. Claude will generate a detailed implementation plan
4. Copy the output and save as \`implementation-plan-[repo-name].md\`

### Option 2: Use Claude API
\`\`\`typescript
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic();

const response = await client.messages.create({
  model: "claude-opus-5",
  max_tokens: 4000,
  messages: [{
    role: "user",
    content: \`${prompt}\`
  }]
});

console.log(response.content[0].type === "text" ? response.content[0].text : "");
\`\`\`

### Option 3: Use Claude Code Session
You can send this prompt directly to Claude Code for interactive planning.

---

## Prompt for Claude

\`\`\`
${prompt}
\`\`\`

---

## What You'll Get

The implementation plan will include:
1. Executive summary of the integration
2. Detailed 3-4 phase breakdown with specific tasks
3. Success metrics for measuring ROI
4. Risk management and mitigation strategies
5. Integration checkpoints and decision gates
6. Specific files and code changes needed
7. Comprehensive testing strategy
8. Rollback procedure (if needed)
9. Team structure and skill requirements
10. Next steps and communication plan

## Save Your Plan

Once Claude generates the plan, save it with a timestamped filename like:
\`reports/implementation-plan-[repo-name]-[date].md\`

## Next Actions

After you have the implementation plan:
1. Review with the team
2. Assign owners to each phase
3. Create tickets in your issue tracker
4. Begin Phase 1 implementation
5. Hold weekly check-ins using the integration checkpoints
6. Track metrics to validate ROI

`;

      // Save prompt to file
      const promptPath = `reports/integration-prompt-${report.evaluation.repositoryName.replace(/\//g, '-')}.txt`;
      const reportsDir = path.join(process.cwd(), 'reports');

      if (!fs.existsSync(reportsDir)) {
        fs.mkdirSync(reportsDir, { recursive: true });
      }

      fs.writeFileSync(promptPath, prompt);

      // Save plan output
      const outputPath = `reports/integration-planner-guide-${report.evaluation.repositoryName.replace(/\//g, '-')}.md`;
      fs.writeFileSync(outputPath, planOutput);

      // Print instructions
      console.log('\n✅ Implementation plan prompt generated!\n');
      console.log(`📄 Prompt File: ${promptPath}`);
      console.log(`📋 Instructions: ${outputPath}`);
      console.log('\n🤖 Next Steps:\n');
      console.log('1. Option A (Web): Visit claude.ai and paste the prompt from above file');
      console.log('2. Option B (CLI): Use Claude Code or the Claude API with the prompt');
      console.log('3. Copy the generated plan to reports/implementation-plan-*.md');
      console.log('4. Review plan with your team');
      console.log('5. Begin implementation using the phases and tasks defined');

    } catch (error) {
      this.log(`Error: ${error instanceof Error ? error.message : String(error)}`, 'error');
      process.exit(1);
    }
  }
}

// CLI execution
const evaluationPath = process.argv[2];
const teamSize = parseInt(process.argv[3]) || 4;
const priority = (process.argv[4] || 'medium') as 'high' | 'medium' | 'low';
const constraints = process.argv[5];

if (!evaluationPath) {
  console.error('Usage: npx ts-node scripts/integration-planner.ts <evaluation-report.json> [teamSize] [priority] [constraints]');
  console.error('Example: npx ts-node scripts/integration-planner.ts reports/integration-public-apis-*.json 4 high');
  console.error('');
  console.error('Parameters:');
  console.error('  evaluation-report.json  Path to evaluation report (from integration-analyzer)');
  console.error('  teamSize               Number of developers (default: 4)');
  console.error('  priority               Priority level: high/medium/low (default: medium)');
  console.error('  constraints            Optional constraints (e.g., "2 week deadline")');
  process.exit(1);
}

const planner = new IntegrationPlanner();
planner.generateImplementationPlan(evaluationPath, teamSize, priority, constraints).catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});
