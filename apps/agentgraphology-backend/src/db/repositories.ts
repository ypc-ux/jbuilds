/**
 * Database Repositories
 * Data access layer for evaluations and comparisons
 */

import { db } from "./client.js";
import type { EvaluationResult } from "../types/index.js";

export class EvaluationRepository {
  /**
   * Save evaluation result to database
   */
  static async save(evaluation: EvaluationResult): Promise<void> {
    const query = `
      INSERT INTO evaluations (
        repository_url,
        repository_name,
        score_productivity,
        score_technical_debt,
        score_business_fit,
        score_implementation_effort,
        score_cost_benefit,
        score_total,
        recommendation,
        roi_ratio,
        repository_metadata,
        evaluation_result
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
    `;

    await db.query(query, [
      evaluation.repositoryUrl,
      evaluation.repositoryName,
      evaluation.scores.productivity.score,
      evaluation.scores.technicalDebt.score,
      evaluation.scores.businessFit.score,
      evaluation.scores.implementationEffort.score,
      evaluation.scores.costBenefit.score,
      evaluation.scores.totalScore,
      evaluation.scores.decision,
      evaluation.scores.roiRatio,
      JSON.stringify(evaluation.repositoryMetadata),
      JSON.stringify(evaluation),
    ]);
  }

  /**
   * Get evaluation by ID
   */
  static async getById(id: string): Promise<EvaluationResult | null> {
    const query = `
      SELECT evaluation_result FROM evaluations WHERE id = $1
    `;

    const result = await db.queryOne<{ evaluation_result: string }>(query, [id]);
    return result ? JSON.parse(result.evaluation_result) : null;
  }

  /**
   * Get evaluation by repository URL
   */
  static async getByRepoUrl(
    repoUrl: string
  ): Promise<EvaluationResult | null> {
    const query = `
      SELECT evaluation_result FROM evaluations
      WHERE repository_url = $1
      ORDER BY created_at DESC
      LIMIT 1
    `;

    const result = await db.queryOne<{ evaluation_result: string }>(query, [
      repoUrl,
    ]);
    return result ? JSON.parse(result.evaluation_result) : null;
  }

  /**
   * Get recent evaluations
   */
  static async getRecent(limit: number = 10): Promise<EvaluationResult[]> {
    const query = `
      SELECT evaluation_result FROM evaluations
      ORDER BY created_at DESC
      LIMIT $1
    `;

    const results = await db.queryAll<{ evaluation_result: string }>(query, [
      limit,
    ]);
    return results.map((r) => JSON.parse(r.evaluation_result));
  }

  /**
   * Get evaluations by score range
   */
  static async getByScoreRange(
    minScore: number,
    maxScore: number
  ): Promise<EvaluationResult[]> {
    const query = `
      SELECT evaluation_result FROM evaluations
      WHERE score_total >= $1 AND score_total <= $2
      ORDER BY score_total DESC
    `;

    const results = await db.queryAll<{ evaluation_result: string }>(query, [
      minScore,
      maxScore,
    ]);
    return results.map((r) => JSON.parse(r.evaluation_result));
  }

  /**
   * Search evaluations by recommendation
   */
  static async getByRecommendation(recommendation: string): Promise<EvaluationResult[]> {
    const query = `
      SELECT evaluation_result FROM evaluations
      WHERE recommendation = $1
      ORDER BY created_at DESC
    `;

    const results = await db.queryAll<{ evaluation_result: string }>(query, [
      recommendation,
    ]);
    return results.map((r) => JSON.parse(r.evaluation_result));
  }

  /**
   * Get evaluation statistics
   */
  static async getStatistics(): Promise<{
    totalEvaluations: number;
    averageScore: number;
    highestScore: number;
    lowestScore: number;
  }> {
    const query = `
      SELECT
        COUNT(*) as total,
        ROUND(AVG(score_total)::numeric, 2) as average,
        MAX(score_total) as highest,
        MIN(score_total) as lowest
      FROM evaluations
    `;

    const result = await db.queryOne<{
      total: string;
      average: string;
      highest: number;
      lowest: number;
    }>(query);

    return {
      totalEvaluations: parseInt(result?.total ?? "0"),
      averageScore: parseFloat(result?.average ?? "0"),
      highestScore: result?.highest ?? 0,
      lowestScore: result?.lowest ?? 0,
    };
  }
}

export class ComparisonRepository {
  /**
   * Save comparison result
   */
  static async save(
    repositoryUrls: string[],
    comparisonResult: any,
    highestRepoId: string,
    lowestRepoId: string,
    averageScore: number
  ): Promise<void> {
    const query = `
      INSERT INTO comparisons (
        repository_urls,
        repository_count,
        highest_scoring_repo,
        lowest_scoring_repo,
        average_score,
        comparison_result
      ) VALUES ($1, $2, $3, $4, $5, $6)
    `;

    await db.query(query, [
      JSON.stringify(repositoryUrls),
      repositoryUrls.length,
      highestRepoId,
      lowestRepoId,
      averageScore,
      JSON.stringify(comparisonResult),
    ]);
  }

  /**
   * Get recent comparisons
   */
  static async getRecent(limit: number = 10): Promise<any[]> {
    const query = `
      SELECT comparison_result FROM comparisons
      ORDER BY created_at DESC
      LIMIT $1
    `;

    const results = await db.queryAll<{ comparison_result: string }>(query, [
      limit,
    ]);
    return results.map((r) => JSON.parse(r.comparison_result));
  }
}

export class UsageMetricsRepository {
  /**
   * Record API usage
   */
  static async recordUsage(
    endpoint: string,
    method: string,
    statusCode: number,
    responseTimeMs: number,
    requestSizeBytes?: number,
    responseSizeBytes?: number
  ): Promise<void> {
    const query = `
      INSERT INTO usage_metrics (
        endpoint,
        method,
        status_code,
        response_time_ms,
        request_size_bytes,
        response_size_bytes
      ) VALUES ($1, $2, $3, $4, $5, $6)
    `;

    await db.query(query, [
      endpoint,
      method,
      statusCode,
      responseTimeMs,
      requestSizeBytes,
      responseSizeBytes,
    ]);
  }

  /**
   * Get endpoint statistics
   */
  static async getEndpointStats(endpoint?: string): Promise<any> {
    let query = `
      SELECT
        endpoint,
        COUNT(*) as request_count,
        ROUND(AVG(response_time_ms)::numeric, 2) as avg_response_time,
        MAX(response_time_ms) as max_response_time,
        MIN(response_time_ms) as min_response_time,
        COUNT(CASE WHEN status_code >= 400 THEN 1 END) as error_count
      FROM usage_metrics
    `;

    const values: any[] = [];

    if (endpoint) {
      query += " WHERE endpoint = $1";
      values.push(endpoint);
    }

    query += " GROUP BY endpoint ORDER BY request_count DESC";

    return await db.queryAll(query, values);
  }
}
