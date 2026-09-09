/**
 * Database Schema Definitions
 * PostgreSQL schema for storing evaluations, comparisons, and user data
 */

export const evaluationsSchema = `
CREATE TABLE IF NOT EXISTS evaluations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  repository_url VARCHAR(255) NOT NULL,
  repository_name VARCHAR(255) NOT NULL,

  -- Scores
  score_productivity INTEGER NOT NULL CHECK (score_productivity >= 0 AND score_productivity <= 25),
  score_technical_debt INTEGER NOT NULL CHECK (score_technical_debt >= 0 AND score_technical_debt <= 25),
  score_business_fit INTEGER NOT NULL CHECK (score_business_fit >= 0 AND score_business_fit <= 20),
  score_implementation_effort INTEGER NOT NULL CHECK (score_implementation_effort >= 0 AND score_implementation_effort <= 20),
  score_cost_benefit INTEGER NOT NULL CHECK (score_cost_benefit >= 0 AND score_cost_benefit <= 10),
  score_total INTEGER NOT NULL CHECK (score_total >= 0 AND score_total <= 100),

  -- Recommendation
  recommendation VARCHAR(50) NOT NULL,
  roi_ratio DECIMAL(10, 2),

  -- Repository Metadata
  repository_metadata JSONB NOT NULL,

  -- Full Evaluation Result
  evaluation_result JSONB NOT NULL,

  -- Timestamps
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  -- Indexes for performance
  CONSTRAINT unique_repo_eval UNIQUE(repository_url, created_at)
);

CREATE INDEX IF NOT EXISTS idx_evaluations_repo_url ON evaluations(repository_url);
CREATE INDEX IF NOT EXISTS idx_evaluations_recommendation ON evaluations(recommendation);
CREATE INDEX IF NOT EXISTS idx_evaluations_created_at ON evaluations(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_evaluations_score_total ON evaluations(score_total DESC);
`;

export const comparisonsSchema = `
CREATE TABLE IF NOT EXISTS comparisons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Repository URLs (array or JSONB)
  repository_urls JSONB NOT NULL,
  repository_count INTEGER NOT NULL,

  -- Comparison Results
  highest_scoring_repo UUID REFERENCES evaluations(id),
  lowest_scoring_repo UUID REFERENCES evaluations(id),
  average_score INTEGER NOT NULL,

  -- Comparison Metadata
  comparison_result JSONB NOT NULL,

  -- Timestamps
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  -- Indexes
  CONSTRAINT positive_repo_count CHECK (repository_count >= 2)
);

CREATE INDEX IF NOT EXISTS idx_comparisons_created_at ON comparisons(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_comparisons_average_score ON comparisons(average_score DESC);
`;

export const usageMetricsSchema = `
CREATE TABLE IF NOT EXISTS usage_metrics (
  id BIGSERIAL PRIMARY KEY,

  -- Endpoint usage
  endpoint VARCHAR(100) NOT NULL,
  method VARCHAR(10) NOT NULL,
  status_code INTEGER NOT NULL,

  -- Performance
  response_time_ms INTEGER NOT NULL,
  request_size_bytes INTEGER,
  response_size_bytes INTEGER,

  -- Client info
  client_ip VARCHAR(45),
  user_agent VARCHAR(500),

  -- Timestamps
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_metrics_endpoint ON usage_metrics(endpoint, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_metrics_created_at ON usage_metrics(created_at DESC);
`;

export const apiKeysSchema = `
CREATE TABLE IF NOT EXISTS api_keys (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Key info
  key_hash VARCHAR(255) NOT NULL UNIQUE,
  key_prefix VARCHAR(8) NOT NULL,

  -- Metadata
  name VARCHAR(255) NOT NULL,
  description TEXT,

  -- Permissions
  can_evaluate BOOLEAN DEFAULT true,
  can_compare BOOLEAN DEFAULT true,
  can_retrieve BOOLEAN DEFAULT false,

  -- Rate limiting
  requests_per_minute INTEGER DEFAULT 60,

  -- Status
  is_active BOOLEAN DEFAULT true,
  last_used_at TIMESTAMP,

  -- Timestamps
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  expires_at TIMESTAMP,

  -- Index for lookups
  CONSTRAINT valid_expiry CHECK (expires_at IS NULL OR expires_at > created_at)
);

CREATE INDEX IF NOT EXISTS idx_api_keys_hash ON api_keys(key_hash);
CREATE INDEX IF NOT EXISTS idx_api_keys_active ON api_keys(is_active) WHERE is_active = true;
`;

export const allSchemas = [
  evaluationsSchema,
  comparisonsSchema,
  usageMetricsSchema,
  apiKeysSchema,
];
