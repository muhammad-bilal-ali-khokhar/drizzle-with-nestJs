/**
 * Database Schema Definition
 * 
 * This file defines the database schema using Drizzle ORM for PostgreSQL.
 * Contains table definitions with columns, types, and constraints.
 * 
 * @author Muhammad Bilal
 * @version 1.0.0
 */

import { pgTable, bigint, text, boolean, timestamp } from 'drizzle-orm/pg-core';

/**
 * Todo table schema
 * Stores todo items with title, description, and completion status
 */
export const todo = pgTable('todo', {
  // Primary key with auto-increment
  id: bigint('id', { mode: 'number' }).generatedByDefaultAsIdentity().primaryKey(),
  
  // Timestamp when todo was created
  created_at: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  
  // Todo title (optional)
  title: text('title'),
  
  // Todo description (optional)
  description: text('description'),
  
  // Completion status (defaults to false)
  is_completed: boolean('is_completed').default(false),
});

/**
 * Another table schema
 * Example table for demonstration purposes
 */
export const another_table = pgTable('another_table', {
  // Primary key with auto-increment
  id: bigint('id', { mode: 'number' }).generatedByDefaultAsIdentity().primaryKey(),
  
  // Required name field
  name: text('name').notNull(),
  
  // Timestamp when record was created
  created_at: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
});