/**
 * Migration file renaming utility for Drizzle ORM
 * 
 * This script automatically renames generated migration files to use table names
 * instead of random animal names. It also handles multiple tables by creating
 * separate migration files for each table.
 * 
 * @author Muhammad Bilal
 * @version 1.0.0
 */

const fs = require('fs');
const path = require('path');

// Configuration paths
const migrationsDir = './src/database/migrations';
const journalPath = './src/database/migrations/meta/_journal.json';

/**
 * Main function to process and rename migration files
 */
function processMigrations() {
  // Read journal file to get migration metadata
  const journal = JSON.parse(fs.readFileSync(journalPath, 'utf8'));

  // Get the latest migration entry
  const latestEntry = journal.entries[journal.entries.length - 1];
  if (!latestEntry) {
    console.log('No migrations found');
    process.exit(0);
  }

  // Construct file paths
  const oldFileName = `${latestEntry.tag}.sql`;
  const oldFilePath = path.join(migrationsDir, oldFileName);

  // Read SQL file content to extract table names
  const sqlContent = fs.readFileSync(oldFilePath, 'utf8');
  const tableMatches = sqlContent.match(/CREATE TABLE "(\w+)"/g);

  if (tableMatches && tableMatches.length > 0) {
    const migrationNumber = latestEntry.tag.split('_')[0];
    
    if (tableMatches.length === 1) {
      // Handle single table migration
      handleSingleTable(oldFilePath, oldFileName, latestEntry, migrationNumber, tableMatches[0]);
    } else {
      // Handle multiple tables migration
      handleMultipleTables(oldFilePath, sqlContent, journal, latestEntry, migrationNumber);
    }
    
    // Update journal file with changes
    fs.writeFileSync(journalPath, JSON.stringify(journal, null, 2));
  } else {
    console.log('No table found in migration, keeping original name');
  }
}

/**
 * Handle single table migration by renaming the file
 * 
 * @param {string} oldFilePath - Original file path
 * @param {string} oldFileName - Original file name
 * @param {Object} latestEntry - Latest journal entry
 * @param {string} migrationNumber - Migration number (e.g., '0000')
 * @param {string} tableMatch - Regex match for table name
 */
function handleSingleTable(oldFilePath, oldFileName, latestEntry, migrationNumber, tableMatch) {
  const tableName = tableMatch.match(/"(\w+)"/)[1];
  const newFileName = `${migrationNumber}_${tableName}.sql`;
  const newFilePath = path.join(migrationsDir, newFileName);
  
  // Rename the file
  fs.renameSync(oldFilePath, newFilePath);
  
  // Update journal entry
  latestEntry.tag = `${migrationNumber}_${tableName}`;
  
  console.log(`Renamed migration: ${oldFileName} -> ${newFileName}`);
}

/**
 * Handle multiple tables by creating separate migration files
 * 
 * @param {string} oldFilePath - Original file path
 * @param {string} sqlContent - SQL file content
 * @param {Object} journal - Migration journal object
 * @param {Object} latestEntry - Latest journal entry
 * @param {string} migrationNumber - Migration number (e.g., '0000')
 */
function handleMultipleTables(oldFilePath, sqlContent, journal, latestEntry, migrationNumber) {
  // Split SQL content by statement breakpoints
  const statements = sqlContent.split('--> statement-breakpoint');
  
  // Remove original file
  fs.unlinkSync(oldFilePath);
  
  // Remove original entry from journal
  journal.entries.pop();
  
  // Process each statement and create separate files
  statements.forEach((statement, index) => {
    const trimmedStatement = statement.trim();
    if (!trimmedStatement) return;
    
    const tableMatch = trimmedStatement.match(/CREATE TABLE "(\w+)"/);;
    if (tableMatch) {
      const tableName = tableMatch[1];
      const fileNumber = String(parseInt(migrationNumber) + index).padStart(4, '0');
      const fileName = `${fileNumber}_${tableName}.sql`;
      const filePath = path.join(migrationsDir, fileName);
      
      // Create new migration file
      fs.writeFileSync(filePath, trimmedStatement);
      
      // Add new entry to journal
      journal.entries.push({
        idx: parseInt(fileNumber),
        version: latestEntry.version,
        when: latestEntry.when + index,
        tag: `${fileNumber}_${tableName}`,
        breakpoints: true
      });
      
      console.log(`Created migration: ${fileName}`);
    }
  });
}

// Execute the main function
processMigrations();