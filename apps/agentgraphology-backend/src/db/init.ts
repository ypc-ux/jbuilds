/**
 * Database Initialization Script
 * Sets up PostgreSQL schema on first run
 * Run with: npm run db:init
 */

import { db } from "./client.js";
import { logger } from "../utils/logger.js";

async function initializeDatabase() {
  try {
    logger.info("Initializing database...");

    await db.initialize();

    logger.info("Database initialized successfully!");
    logger.info("Tables created:");
    logger.info("  - evaluations");
    logger.info("  - comparisons");
    logger.info("  - usage_metrics");
    logger.info("  - api_keys");

    // Test query
    const result = await db.query("SELECT NOW()");
    logger.info("Database connection test successful", {
      timestamp: result.rows[0],
    });

    await db.close();
    process.exit(0);
  } catch (error) {
    logger.error("Database initialization failed", { error });
    process.exit(1);
  }
}

initializeDatabase();
