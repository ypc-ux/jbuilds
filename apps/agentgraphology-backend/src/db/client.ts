/**
 * PostgreSQL Database Client
 * Handles all database connections and query execution
 */

import { Pool, type PoolClient, type QueryResult } from "pg";
import { logger } from "../utils/logger.js";
import { allSchemas } from "./schema.js";

export class DatabaseClient {
  private pool: Pool | null = null;
  private isConnected = false;

  constructor() {
    const databaseUrl = process.env.DATABASE_URL;

    if (!databaseUrl) {
      logger.warn("DATABASE_URL not set. Database features will be unavailable.");
      return;
    }

    this.pool = new Pool({
      connectionString: databaseUrl,
      max: 20,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 2000,
    });

    this.pool.on("error", (err) => {
      logger.error("Unexpected error on idle client", { error: err });
    });
  }

  /**
   * Initialize database connection and create tables
   */
  async initialize(): Promise<void> {
    if (!this.pool) {
      logger.warn("Database pool not initialized. Skipping schema setup.");
      return;
    }

    try {
      const client = await this.pool.connect();
      try {
        logger.info("Initializing database schema...");

        for (const schema of allSchemas) {
          await client.query(schema);
        }

        logger.info("Database schema initialized successfully");
        this.isConnected = true;
      } finally {
        client.release();
      }
    } catch (error) {
      logger.error("Failed to initialize database schema", { error });
      throw error;
    }
  }

  /**
   * Execute a query
   */
  async query<T = any>(
    text: string,
    values?: any[]
  ): Promise<QueryResult<T>> {
    if (!this.pool) {
      throw new Error("Database pool not initialized");
    }

    try {
      return await this.pool.query<T>(text, values);
    } catch (error) {
      logger.error("Query failed", { error, text, values });
      throw error;
    }
  }

  /**
   * Execute a query and return single row
   */
  async queryOne<T = any>(
    text: string,
    values?: any[]
  ): Promise<T | null> {
    const result = await this.query<T>(text, values);
    return result.rows[0] ?? null;
  }

  /**
   * Execute a query and return all rows
   */
  async queryAll<T = any>(
    text: string,
    values?: any[]
  ): Promise<T[]> {
    const result = await this.query<T>(text, values);
    return result.rows;
  }

  /**
   * Execute transaction
   */
  async transaction<T>(
    callback: (client: PoolClient) => Promise<T>
  ): Promise<T> {
    if (!this.pool) {
      throw new Error("Database pool not initialized");
    }

    const client = await this.pool.connect();
    try {
      await client.query("BEGIN");
      const result = await callback(client);
      await client.query("COMMIT");
      return result;
    } catch (error) {
      await client.query("ROLLBACK");
      logger.error("Transaction failed", { error });
      throw error;
    } finally {
      client.release();
    }
  }

  /**
   * Health check
   */
  async healthCheck(): Promise<boolean> {
    if (!this.pool) {
      return false;
    }

    try {
      await this.query("SELECT 1");
      return true;
    } catch (error) {
      logger.error("Database health check failed", { error });
      return false;
    }
  }

  /**
   * Close database connection
   */
  async close(): Promise<void> {
    if (this.pool) {
      await this.pool.end();
      this.isConnected = false;
      logger.info("Database connection closed");
    }
  }

  /**
   * Get connection status
   */
  getStatus(): { connected: boolean; hasPool: boolean } {
    return {
      connected: this.isConnected,
      hasPool: this.pool !== null,
    };
  }
}

export const db = new DatabaseClient();
