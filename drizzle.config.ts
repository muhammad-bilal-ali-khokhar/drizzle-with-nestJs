/**
 * Drizzle ORM Configuration
 * 
 * This file configures Drizzle ORM for PostgreSQL database connection
 * and migration settings.
 * 
 * @author Muhammad Bilal
 * @see https://orm.drizzle.team/kit-docs/config-reference
 */

import 'dotenv/config';
import { ShardRoutingService } from './src/sharding/shard-routing.service';
import { user } from 'src/mock';

// Get database URL based on user region
const shardService = new ShardRoutingService();
const databaseUrl = shardService.getShardBaseUrl(user);

export default {
  // Path to database schema definition file
  schema: './src/database/schema.ts',
  
  // Output directory for generated migration files
  out: './src/database/migrations',
  
  // Database dialect (postgresql, mysql, sqlite)
  dialect: 'postgresql',
  
  // Database connection credentials
  dbCredentials: {
    // Conditionally selected PostgreSQL connection URL based on region
    url: databaseUrl,
  },
};