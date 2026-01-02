/**
 * Drizzle ORM Configuration
 * 
 * This file configures Drizzle ORM for PostgreSQL database connection
 * and migration settings.
 * 
 * @author Muhammad Bilal
 * @see https://orm.drizzle.team/kit-docs/config-reference
 */

export default {
  // Path to database schema definition file
  schema: './src/database/schema.ts',
  
  // Output directory for generated migration files
  out: './src/database/migrations',
  
  // Database dialect (postgresql, mysql, sqlite)
  dialect: 'postgresql',
  
  // Database connection credentials
  dbCredentials: {
    // PostgreSQL connection URL from environment variables
    url: process.env.DATABASE_URL!,
  },
};