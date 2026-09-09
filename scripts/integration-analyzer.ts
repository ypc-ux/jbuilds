/**
 * Integration Protocol Analyzer
 * CLI tool to evaluate any GitHub repository and generate integration recommendations
 *
 * Usage: npx ts-node scripts/integration-analyzer.ts <repo-url>
 * Example: npx ts-node scripts/integration-analyzer.ts https://github.com/public-apis/public-apis
 */

import { execSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';
import type { IntegrationEvaluation, IntakeChecklistData, ScoringInput } from './types';
import { scoringEngine } from './scoring-engine';
import { reportGenerator } from './report-generator';

interface RepositoryInfo {
  name: string;
  owner: string;
  description: string;
  stars: number;
  forks: number;
  watchers: number;
  openIssues: number;
  language: string;
  license: string;
  size: number;
  lastPush: string;
  createdAt: string;
  isArchived: boolean;
  isFork: boolean;
}

class IntegrationAnalyzer {
  private tempDir: string;

  constructor() {
    this.tempDir = path.join(process.cwd(), '.integration-analysis-tmp');
  }

  private log(message: string, level: 'info' | 'warn' | 'error' = 'info') {
    const prefix = {
      info: '[ℹ️]',
      warn: '[⚠️]',
      error: '[❌]',
    };
    console.log(`${prefix[level]} ${message}`);
  }

  private async fetchRepositoryInfo(url: string): Promise<RepositoryInfo> {
    this.log('Fetching repository metadata from GitHub...');

    try {
      // Parse GitHub URL
      const match = url.match(/github\.com\/([^/]+)\/([^/]+?)(?:\.git)?$/);
      if (!match) {
        throw new Error('Invalid GitHub URL format');
      }

      const [, owner, repo] = match;

      // Use GitHub API (unauthenticated, limited to 60 requests/hour)
      const apiUrl = `https://api.github.com/repos/${owner}/${repo}`;

      // Try to fetch using curl (since we might not have fetch in Node 16)
      try {
        const response = execSync(`curl -s ${apiUrl}`, { encoding: 'utf-8' });
        const data = JSON.parse(response);

        return {
          name: data.name,
          owner: data.owner.login,
          description: data.description || '',
          stars: data.stargazers_count,
          forks: data.forks_count,
          watchers: data.watchers_count,
          openIssues: data.open_issues_count,
          language: data.language || 'Unknown',
          license: data.license?.name || 'Unknown',
          size: data.size,
          lastPush: data.pushed_at,
          createdAt: data.created_at,
          isArchived: data.archived,
          isFork: data.fork,
        };
      } catch (e) {
        this.log('Could not fetch from GitHub API, using fallback info', 'warn');
        return {
          name: repo,
          owner,
          description: 'Repository information not available',
          stars: 0,
          forks: 0,
          watchers: 0,
          openIssues: 0,
          language: 'Unknown',
          license: 'Unknown',
          size: 0,
          lastPush: new Date().toISOString(),
          createdAt: new Date().toISOString(),
          isArchived: false,
          isFork: false,
        };
      }
    } catch (error) {
      this.log(`Error fetching repository: ${error instanceof Error ? error.message : String(error)}`, 'error');
      throw error;
    }
  }

  private cloneRepository(url: string): string {
    this.log('Cloning repository...');

    if (!fs.existsSync(this.tempDir)) {
      fs.mkdirSync(this.tempDir, { recursive: true });
    }

    try {
      execSync(`git clone --depth 1 ${url} ${this.tempDir}`, { stdio: 'inherit' });
      return this.tempDir;
    } catch (error) {
      this.log(`Error cloning repository: ${error instanceof Error ? error.message : String(error)}`, 'error');
      throw error;
    }
  }

  private analyzeRepository(repoPath: string) {
    this.log('Analyzing repository structure...');

    const analysis = {
      hasPackageJson: false,
      hasTypeScript: false,
      hasTests: false,
      testCoverage: undefined as number | undefined,
      dependencies: {
        count: 0,
        major: [] as string[],
        outdated: [] as string[],
      },
      hasDocumentation: false,
      hasReadme: false,
      securityIssues: {
        count: 0,
        criticalCount: 0,
        issues: [] as string[],
      },
    };

    // Check for package.json
    const packageJsonPath = path.join(repoPath, 'package.json');
    if (fs.existsSync(packageJsonPath)) {
      analysis.hasPackageJson = true;
      try {
        const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
        analysis.dependencies.count = (Object.keys(packageJson.dependencies || {}).length +
          Object.keys(packageJson.devDependencies || {}).length) as number;
        analysis.dependencies.major = Object.keys(packageJson.dependencies || {}).slice(0, 5);
      } catch {
        // Ignore parse errors
      }
    }

    // Check for TypeScript
    analysis.hasTypeScript = fs.existsSync(path.join(repoPath, 'tsconfig.json'));

    // Check for tests
    const srcPath = path.join(repoPath, 'src');
    const testPath = path.join(repoPath, '__tests__');
    const specPath = path.join(repoPath, 'tests');
    analysis.hasTests = fs.existsSync(testPath) || fs.existsSync(specPath) || fs.existsSync(path.join(srcPath, '__tests__'));

    // Check for documentation
    analysis.hasReadme = fs.existsSync(path.join(repoPath, 'README.md'));
    analysis.hasDocumentation = fs.existsSync(path.join(repoPath, 'docs'));

    return analysis;
  }

  private estimateMaturity(info: RepositoryInfo, daysSinceUpdate: number): 'alpha' | 'beta' | 'stable' | 'mature' {
    if (info.isArchived) return 'alpha';
    if (daysSinceUpdate > 365) return 'alpha';
    if (daysSinceUpdate > 180) return 'beta';
    if (info.stars > 10000) return 'mature';
    if (info.stars > 1000) return 'stable';
    if (daysSinceUpdate > 30) return 'stable';
    return 'beta';
  }

  private createIntakeChecklist(info: RepositoryInfo, analysis: ReturnType<typeof this.analyzeRepository>): IntakeChecklistData {
    const lastPushDate = new Date(info.lastPush);
    const now = new Date();
    const daysSinceUpdate = Math.floor((now.getTime() - lastPushDate.getTime()) / (1000 * 60 * 60 * 24));

    return {
      repo: {
        url: `https://github.com/${info.owner}/${info.name}`,
        name: info.name,
        owner: info.owner,
        description: info.description,
        language: info.language,
        license: info.license,
        stars: info.stars,
        forks: info.forks,
        openIssues: info.openIssues,
        watchers: info.watchers,
        lastPush: info.lastPush,
        createdAt: info.createdAt,
        size: info.size,
        isArchived: info.isArchived,
        isFork: info.isFork,
      },
      maturity: this.estimateMaturity(info, daysSinceUpdate),
      lastUpdateDays: daysSinceUpdate,
      isActivelyMaintained: daysSinceUpdate < 30,
      dependencies: analysis.dependencies,
      testCoverage: analysis.testCoverage,
      hasDocumentation: analysis.hasDocumentation,
      documentationQuality: analysis.hasReadme ? 'good' : 'poor',
      securityIssues: analysis.securityIssues,
      businessProblem: 'To be determined by team',
      integrationComplexity: 'moderate',
      teamFamiliarity: 'never',
      businessDomain: 'To be determined by team',
    };
  }

  private createDefaultScoringInput(): ScoringInput {
    return {
      productivity: {
        hoursSavedPerWeek: 2,
        codeReuseBenefit: false,
        workflowAcceleration: false,
        dxImprovement: false,
        learningValue: true,
      },
      technicalDebt: {
        codeQualityImprovement: false,
        techStackMatch: false,
        dependencyCount: 3,
        isWellMaintained: true,
        hasTests: true,
        hasDocumentation: true,
        introducesDebt: false,
        conflictsWithPatterns: false,
        securityConcerns: false,
      },
      businessFit: {
        solvesProblem: false,
        fillsGap: false,
        enablesNewCategory: false,
        strengthensExisting: false,
      },
      implementationEffort: {
        estimatedHours: 16,
      },
      costBenefit: {
        developerCount: 4,
        hoursSavedPerDeveloperPerYear: 20,
        integrationEffortHours: 16,
      },
    };
  }

  private cleanupTempDir() {
    if (fs.existsSync(this.tempDir)) {
      execSync(`rm -rf ${this.tempDir}`, { stdio: 'ignore' });
    }
  }

  async analyze(url: string): Promise<IntegrationEvaluation> {
    try {
      // Fetch repository info
      const repoInfo = await this.fetchRepositoryInfo(url);
      this.log(`Repository: ${repoInfo.owner}/${repoInfo.name}`);

      // Clone and analyze
      this.cloneRepository(url);
      const analysis = this.analyzeRepository(this.tempDir);

      // Create intake checklist
      const intake = this.createIntakeChecklist(repoInfo, analysis);

      // Score using default inputs (template for user to customize)
      const scoringInput = this.createDefaultScoringInput();
      const scoringResult = scoringEngine.score(scoringInput);

      // Generate recommendations
      const recommendations = [
        {
          pattern: {
            type: 'utility_library' as const,
            description: 'Generic utility or helper library',
            targetLayers: ['utilities'],
            integrationPoints: ['lib/', 'utils/'],
            exampleFiles: ['lib/utils.ts', 'src/helpers/', 'src/constants/'],
          },
          priority: 'medium' as const,
          effortEstimate: '4-8 hours',
          description:
            'This appears to be a utility library. Consider creating a wrapper if needed and importing specific utilities into your codebase.',
          risks: ['Dependency on external updates', 'Potential version conflicts'],
          mitigations: [
            'Pin to specific version',
            'Monitor for security updates',
            'Wrap in abstraction layer if uncertain',
          ],
        },
      ];

      // Integration phases
      const integrationPhases = [
        {
          phase: 1,
          name: 'Assessment & Planning',
          duration: '1 week',
          tasks: [
            {
              title: 'Detailed Evaluation',
              description: 'Review the scoring and recommendations with your team',
              acceptanceCriteria: [
                'Team has reviewed the evaluation report',
                'Business problem clearly defined',
                'Integration approach agreed upon',
              ],
              effortHours: 2,
              dependencies: [],
              riskLevel: 'low' as const,
            },
            {
              title: 'Create Integration Plan',
              description: 'Define specific integration points and implementation approach',
              acceptanceCriteria: ['Integration plan documented', 'Success metrics defined'],
              effortHours: 3,
              dependencies: ['Detailed Evaluation'],
              riskLevel: 'low' as const,
            },
          ],
          effortHours: 5,
        },
        {
          phase: 2,
          name: 'Implementation',
          duration: '1-2 weeks',
          tasks: [
            {
              title: 'Install & Configure',
              description: 'Add dependency and configure as needed',
              acceptanceCriteria: [
                'Dependency installed successfully',
                'Configuration complete',
                'No build errors',
              ],
              effortHours: 2,
              dependencies: [],
              riskLevel: 'low' as const,
            },
            {
              title: 'Integration',
              description: 'Integrate into appropriate layers of your application',
              acceptanceCriteria: [
                'Successfully integrated',
                'All tests passing',
                'No performance regressions',
              ],
              effortHours: 8,
              dependencies: ['Install & Configure'],
              riskLevel: 'medium' as const,
            },
          ],
          effortHours: 10,
        },
        {
          phase: 3,
          name: 'Testing & Deployment',
          duration: '3-5 days',
          tasks: [
            {
              title: 'Testing',
              description: 'Comprehensive testing of integration',
              acceptanceCriteria: [
                'Unit tests written and passing',
                'Integration tests passing',
                'Manual testing complete',
              ],
              effortHours: 3,
              dependencies: ['Integration'],
              riskLevel: 'medium' as const,
            },
            {
              title: 'Deployment',
              description: 'Deploy to production',
              acceptanceCriteria: [
                'Deployed successfully',
                'Monitoring in place',
                'Team trained on usage',
              ],
              effortHours: 2,
              dependencies: ['Testing'],
              riskLevel: 'medium' as const,
            },
          ],
          effortHours: 5,
        },
      ];

      const successMetrics = [
        'Integration completed as planned',
        'No new errors or warnings introduced',
        'Team reports using the library/tool',
        'Productivity goals met within 3 months',
      ];

      return {
        repositoryUrl: url,
        repositoryName: `${repoInfo.owner}/${repoInfo.name}`,
        timestamp: new Date().toISOString(),
        intake,
        scoring: scoringResult,
        recommendations,
        integrationPhases,
        successMetrics,
        timeline: '2-3 weeks (depending on scope)',
        overallRisk: 'medium',
      };
    } finally {
      this.cleanupTempDir();
    }
  }
}

// CLI execution
const url = process.argv[2];

if (!url) {
  console.error('Usage: npx ts-node scripts/integration-analyzer.ts <github-url>');
  console.error('Example: npx ts-node scripts/integration-analyzer.ts https://github.com/public-apis/public-apis');
  process.exit(1);
}

const analyzer = new IntegrationAnalyzer();
analyzer.analyze(url).then((evaluation) => {
  const markdown = reportGenerator.generateMarkdownReport(evaluation);
  const json = reportGenerator.generateJsonReport(evaluation);

  // Output markdown report
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5);
  const markdownPath = `reports/integration-${evaluation.repositoryName.replace(/\//g, '-')}-${timestamp}.md`;
  const jsonPath = `reports/integration-${evaluation.repositoryName.replace(/\//g, '-')}-${timestamp}.json`;

  // Ensure reports directory exists
  const reportsDir = path.join(process.cwd(), 'reports');
  if (!fs.existsSync(reportsDir)) {
    fs.mkdirSync(reportsDir, { recursive: true });
  }

  // Write reports
  fs.writeFileSync(markdownPath, markdown);
  fs.writeFileSync(jsonPath, JSON.stringify(json, null, 2));

  console.log('\n✅ Integration evaluation complete!\n');
  console.log(`📄 Markdown Report: ${markdownPath}`);
  console.log(`📊 JSON Report: ${jsonPath}`);
  console.log('\n📋 Summary:');
  console.log(`   Repository: ${evaluation.repositoryName}`);
  console.log(`   Score: ${evaluation.scoring.totalScore}/100`);
  console.log(`   Decision: ${evaluation.scoring.decision.replace(/_/g, ' ')}`);
  console.log(`   ROI Ratio: ${evaluation.scoring.roiRatio}:1`);
  console.log(`   Timeline: ${evaluation.timeline}`);
});
