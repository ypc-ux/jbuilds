/**
 * AgentGraphology Backend Server
 * API for repository evaluation using Business Integration Protocol
 *
 * Cost: $0 (uses Ollama for free local inference)
 * Tech: Node.js + Express + Ollama + PostgreSQL
 */

import express, { type Request, type Response, type NextFunction } from "express";
import cors from "cors";
import helmet from "helmet";
import { v4 as uuidv4 } from "uuid";
import { logger } from "./utils/logger.js";
import { ScoringEngine } from "./scoring/engine.js";
import GitHubService from "./services/github.js";
import OllamaService from "./services/ollama.js";
import type {
  EvaluateRequest,
  EvaluateResponse,
  CompareRequest,
  CompareResponse,
  EvaluationResult,
  HealthResponse,
} from "./types/index.js";

// Initialize services
const app = express();
const scoringEngine = new ScoringEngine();
const githubService = GitHubService;
const ollamaService = OllamaService;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Request logging middleware
app.use((req: Request, res: Response, next: NextFunction) => {
  const startTime = Date.now();
  res.on("finish", () => {
    const duration = Date.now() - startTime;
    logger.info({
      method: req.method,
      path: req.path,
      status: res.statusCode,
      duration: `${duration}ms`,
    });
  });
  next();
});

// ============= ROUTES =============

/**
 * Health check endpoint
 * GET /api/health
 */
app.get("/api/health", async (req: Request, res: Response) => {
  try {
    const ollamaHealthy = await ollamaService.checkHealth();
    const status = ollamaHealthy ? "healthy" : "degraded";

    const response: HealthResponse = {
      status: status as any,
      timestamp: new Date().toISOString(),
      ollama: {
        connected: ollamaHealthy,
        model: "mistral:7b-instruct",
      },
      database: {
        connected: true, // Would check real DB in production
      },
      version: "1.0.0",
    };

    res.status(200).json(response);
  } catch (error) {
    logger.error("Health check failed", { error });
    res.status(503).json({
      status: "unhealthy",
      timestamp: new Date().toISOString(),
      error: "Service unavailable",
    });
  }
});

/**
 * Evaluate a repository
 * POST /api/evaluate
 * Body: { repoUrl: string, teamSize?: number, priority?: string }
 */
app.post("/api/evaluate", async (req: Request, res: Response) => {
  try {
    const { repoUrl } = req.body as EvaluateRequest;

    if (!repoUrl) {
      return res.status(400).json({
        success: false,
        error: "Missing required field: repoUrl",
        evaluation: null,
      });
    }

    logger.info("Starting evaluation", { repoUrl });

    // Fetch repository metadata from GitHub
    const metadata = await githubService.fetchRepositoryMetadata(repoUrl);
    logger.info("Repository metadata fetched", {
      repo: metadata.name,
      stars: metadata.stars,
    });

    // Score the repository
    const scores = scoringEngine.scoreRepository(metadata);
    logger.info("Repository scored", {
      repo: metadata.name,
      totalScore: scores.totalScore,
      decision: scores.decision,
    });

    // Generate enhanced explanations using Ollama
    let ollamaExplanations: Record<string, string> = {};
    try {
      ollamaExplanations["productivityReasoning"] =
        await ollamaService.generateScoringExplanation(
          "Developer Productivity",
          scores.productivity.score,
          scores.productivity.maxScore,
          scores.productivity.reasoning
        );
    } catch (e) {
      logger.warn("Ollama enhancement failed", { error: e });
    }

    // Build evaluation result
    const evaluation: EvaluationResult = {
      id: uuidv4(),
      repositoryUrl: repoUrl,
      repositoryName: metadata.name,
      repositoryMetadata: metadata,
      timestamp: new Date().toISOString(),
      scores,
      implementationPhases: [
        {
          phase: 1,
          name: "Setup & Configuration",
          duration: "1-2 weeks",
          tasks: [
            {
              title: "Initial Setup",
              description: `Set up ${metadata.name} in development environment`,
              acceptanceCriteria: [
                "Installation successful",
                "Basic functionality verified",
              ],
              effortHours: 4,
              dependencies: [],
              riskLevel: "low",
            },
          ],
          effortHours: 4,
        },
        {
          phase: 2,
          name: "Integration",
          duration: "1-2 weeks",
          tasks: [
            {
              title: "Integration Development",
              description: `Integrate ${metadata.name} into main application`,
              acceptanceCriteria: ["Integration complete", "Tests passing"],
              effortHours: 8,
              dependencies: ["Phase 1"],
              riskLevel: "medium",
            },
          ],
          effortHours: 8,
        },
        {
          phase: 3,
          name: "Testing & Deployment",
          duration: "1 week",
          tasks: [
            {
              title: "QA and Production Deployment",
              description: "Final testing and production deployment",
              acceptanceCriteria: ["All tests passing", "Deployed to production"],
              effortHours: 4,
              dependencies: ["Phase 2"],
              riskLevel: "low",
            },
          ],
          effortHours: 4,
        },
      ],
      risks: [
        {
          risk: "Integration complexity",
          probability: "medium",
          impact: "medium",
          mitigation: "Start with small integration, iterate",
          contingency: "Have rollback plan ready",
        },
      ],
      successMetrics: [
        "Repository fully integrated into codebase",
        "Team reports increased productivity",
        "No critical bugs reported",
      ],
      recommendations: [
        `Start with Phase 1 setup`,
        `Allocate ${Math.ceil(scores.implementationEffort.score * 1.5)} hours for integration`,
        `Expected productivity gain: ${Math.round((scores.productivity.score / 25) * 100)}% time savings`,
      ],
    };

    logger.info("Evaluation complete", {
      id: evaluation.id,
      decision: evaluation.scores.decision,
    });

    const response: EvaluateResponse = {
      success: true,
      evaluation,
    };

    res.status(200).json(response);
  } catch (error) {
    logger.error("Evaluation failed", { error });
    const response: EvaluateResponse = {
      success: false,
      evaluation: null,
      error: error instanceof Error ? error.message : "Unknown error",
    };
    res.status(500).json(response);
  }
});

/**
 * Compare multiple repositories
 * POST /api/compare
 * Body: { repoUrls: string[] }
 */
app.post("/api/compare", async (req: Request, res: Response) => {
  try {
    const { repoUrls } = req.body as CompareRequest;

    if (!repoUrls || !Array.isArray(repoUrls) || repoUrls.length < 2) {
      return res.status(400).json({
        success: false,
        error: "Provide at least 2 repository URLs",
        evaluations: [],
        comparison: {},
      });
    }

    logger.info("Starting comparison", { count: repoUrls.length });

    // Evaluate all repositories
    const evaluations: EvaluationResult[] = [];

    for (const url of repoUrls) {
      try {
        const metadata = await githubService.fetchRepositoryMetadata(url);
        const scores = scoringEngine.scoreRepository(metadata);

        evaluations.push({
          id: uuidv4(),
          repositoryUrl: url,
          repositoryName: metadata.name,
          repositoryMetadata: metadata,
          timestamp: new Date().toISOString(),
          scores,
          implementationPhases: [],
          risks: [],
          successMetrics: [],
          recommendations: [],
        });
      } catch (error) {
        logger.warn("Failed to evaluate repo", { url, error });
      }
    }

    // Build comparison
    const comparison = {
      totalEvaluated: evaluations.length,
      highest: evaluations.reduce((prev, current) =>
        current.scores.totalScore > prev.scores.totalScore ? current : prev
      ),
      lowest: evaluations.reduce((prev, current) =>
        current.scores.totalScore < prev.scores.totalScore ? current : prev
      ),
      averageScore: Math.round(
        evaluations.reduce((sum, e) => sum + e.scores.totalScore, 0) /
          evaluations.length
      ),
    };

    logger.info("Comparison complete", {
      count: evaluations.length,
      average: comparison.averageScore,
    });

    const response: CompareResponse = {
      success: true,
      evaluations,
      comparison,
    };

    res.status(200).json(response);
  } catch (error) {
    logger.error("Comparison failed", { error });
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
      evaluations: [],
      comparison: {},
    });
  }
});

/**
 * Get evaluation by ID
 * GET /api/evaluations/:id
 */
app.get("/api/evaluations/:id", (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    // In production, fetch from database
    logger.info("Fetching evaluation", { id });
    res.status(200).json({
      message: "Evaluation fetch not yet implemented",
      id,
    });
  } catch (error) {
    logger.error("Fetch failed", { error });
    res.status(500).json({ error: "Internal server error" });
  }
});

/**
 * 404 handler
 */
app.use((req: Request, res: Response) => {
  res.status(404).json({
    error: "Endpoint not found",
    path: req.path,
  });
});

/**
 * Error handler
 */
app.use((err: Error, req: Request, res: Response, _next: NextFunction) => {
  logger.error("Unhandled error", { error: err });
  res.status(500).json({
    error: "Internal server error",
    message: process.env.NODE_ENV === "production" ? undefined : err.message,
  });
});

// ============= SERVER START =============

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    // Check Ollama connection
    logger.info("Checking Ollama connection...");
    const ollamaReady = await ollamaService.checkHealth();

    if (!ollamaReady) {
      logger.warn("Ollama not ready. Starting server anyway...");
      logger.warn("To enable AI features, run: ollama pull mistral:7b-instruct");
    } else {
      logger.info("Ollama ready for inference");
    }

    // Start Express server
    app.listen(PORT, () => {
      logger.info(`🚀 AgentGraphology API running on http://localhost:${PORT}`);
      logger.info("📊 Endpoints:");
      logger.info("  POST   /api/evaluate  - Evaluate a repository");
      logger.info("  POST   /api/compare   - Compare repositories");
      logger.info("  GET    /api/health    - Health check");
      logger.info("💰 Infrastructure cost: $0/month (Ollama is free)");
    });
  } catch (error) {
    logger.error("Failed to start server", { error });
    process.exit(1);
  }
}

startServer();

export default app;
