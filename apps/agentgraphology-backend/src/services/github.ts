/**
 * GitHub Service - Repository Metadata Extraction
 * Uses GitHub API (free tier) to fetch repo information for scoring
 */

import type { RepositoryMetadata } from "../types/index.js";
import { logger } from "../utils/logger.js";

export class GitHubService {
  private token: string | null = null;

  constructor(token?: string) {
    this.token = token || process.env.GITHUB_TOKEN || null;
  }

  /**
   * Parse GitHub URL and extract owner/repo
   */
  private parseRepoUrl(url: string): { owner: string; repo: string } {
    const urlObj = new URL(url);
    const parts = urlObj.pathname.split("/").filter(Boolean);

    if (parts.length < 2) {
      throw new Error("Invalid GitHub URL format");
    }

    return {
      owner: parts[0],
      repo: parts[1].replace(".git", ""),
    };
  }

  /**
   * Build GitHub API authorization header
   */
  private getHeaders(): Record<string, string> {
    const headers: Record<string, string> = {
      "Accept": "application/vnd.github.v3+json",
      "User-Agent": "AgentGraphology/1.0",
    };

    if (this.token) {
      headers["Authorization"] = `token ${this.token}`;
    }

    return headers;
  }

  /**
   * Fetch repository metadata from GitHub API
   */
  async fetchRepositoryMetadata(repoUrl: string): Promise<RepositoryMetadata> {
    try {
      const { owner, repo } = this.parseRepoUrl(repoUrl);
      const apiUrl = `https://api.github.com/repos/${owner}/${repo}`;

      const response = await fetch(apiUrl, {
        headers: this.getHeaders(),
      });

      if (response.status === 404) {
        throw new Error("Repository not found");
      }

      if (!response.ok) {
        if (response.status === 403) {
          logger.warn("GitHub API rate limit reached. Using fallback data.");
          return this.getPlaceholderMetadata(repoUrl);
        }
        throw new Error(`GitHub API error: ${response.status}`);
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const data = (await response.json()) as any;

      return {
        url: data.html_url,
        name: data.name,
        owner: data.owner.login,
        description: data.description || "",
        language: data.language || "Unknown",
        license: data.license?.name || "Unknown",
        stars: data.stargazers_count,
        forks: data.forks_count,
        openIssues: data.open_issues_count,
        watchers: data.watchers_count,
        size: data.size,
        isArchived: data.archived,
        isFork: data.fork,
        lastPush: data.pushed_at,
        createdAt: data.created_at,
        updatedAt: data.updated_at,
      };
    } catch (error) {
      logger.error("Failed to fetch repository metadata", { error });
      throw error;
    }
  }

  /**
   * Validate repository exists before scoring
   */
  async validateRepository(repoUrl: string): Promise<boolean> {
    try {
      const { owner, repo } = this.parseRepoUrl(repoUrl);
      const response = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
        method: "HEAD",
        headers: this.getHeaders(),
      });
      return response.ok || response.status === 404;
    } catch (error) {
      logger.error("Repository validation failed", { error });
      return false;
    }
  }

  /**
   * Get placeholder metadata for rate-limited requests
   */
  private getPlaceholderMetadata(repoUrl: string): RepositoryMetadata {
    const now = new Date().toISOString();
    const { owner, repo } = this.parseRepoUrl(repoUrl);

    return {
      url: repoUrl,
      name: repo,
      owner: owner,
      description: "Metadata unavailable (GitHub rate limit)",
      language: "Unknown",
      license: "Unknown",
      stars: 0,
      forks: 0,
      openIssues: 0,
      watchers: 0,
      size: 0,
      isArchived: false,
      isFork: false,
      lastPush: now,
      createdAt: now,
      updatedAt: now,
    };
  }

  /**
   * Get repository README content
   */
  async fetchReadme(repoUrl: string): Promise<string | null> {
    try {
      const { owner, repo } = this.parseRepoUrl(repoUrl);
      const apiUrl = `https://api.github.com/repos/${owner}/${repo}/readme`;

      const response = await fetch(apiUrl, {
        headers: {
          ...this.getHeaders(),
          "Accept": "application/vnd.github.v3.raw",
        },
      });

      if (response.ok) {
        return await response.text();
      }

      return null;
    } catch (error) {
      logger.warn("Failed to fetch README", { error });
      return null;
    }
  }

  /**
   * Get rate limit status
   */
  async getRateLimit(): Promise<{
    remaining: number;
    limit: number;
    reset: number;
  }> {
    try {
      const response = await fetch("https://api.github.com/rate_limit", {
        headers: this.getHeaders(),
      });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const data = (await response.json()) as any;

      return {
        remaining: data.resources.core.remaining,
        limit: data.resources.core.limit,
        reset: data.resources.core.reset,
      };
    } catch (error) {
      logger.error("Failed to get rate limit", { error });
      return {
        remaining: 0,
        limit: 0,
        reset: 0,
      };
    }
  }
}

export default new GitHubService();
