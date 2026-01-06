/**
 * Database Connection Configuration
 * 
 * This file sets up the database connection using Drizzle ORM with PostgreSQL.
 * Handles environment variables and SSL configuration for Supabase.
 * 
 * @author Muhammad Bilal
 * @version 1.0.0
 */
 
import 'dotenv/config';
import { drizzle } from 'drizzle-orm/postgres-js';
import { user } from 'src/mock';
import { ShardRoutingService } from 'src/sharding/shard-routing.service';
const postgres = require('postgres');

// Validate required environment variables
if (!process.env.CHECKY_CHECK_DATABASE_URL && !process.env.PENDING_PARTY_DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is required');
}

// Create service instance
const shardService = new ShardRoutingService();
const databaseUrl = shardService.getShardBaseUrl(user);

// Create PostgreSQL client with SSL configuration for Supabase
const client = postgres(databaseUrl, {
  ssl: { rejectUnauthorized: false }, // Required for Supabase connections
});

// Export configured Drizzle database instance
export const db = drizzle(client);
