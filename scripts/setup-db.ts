#!/usr/bin/env tsx

import { readFileSync } from "fs";
import { join } from "path";
import { getDb } from "../server/db";
import { seedDatabase } from "../server/seed";

async function setupDatabase() {
  console.log("🚀 Setting up database...");

  try {
    const db = getDb();
    
    // Read and execute the migration SQL
    const migrationPath = join(process.cwd(), "migrations", "0000_initial_schema.sql");
    const migrationSQL = readFileSync(migrationPath, "utf-8");
    
    console.log("📋 Running database migrations...");
    
    // Split the SQL into individual statements and execute them
    const statements = migrationSQL
      .split(";")
      .map(stmt => stmt.trim())
      .filter(stmt => stmt.length > 0);
    
    for (const statement of statements) {
      if (statement.trim()) {
        await db.execute(statement);
      }
    }
    
    console.log("✅ Database migrations completed");
    
    // Run seeding
    console.log("🌱 Seeding database with sample data...");
    const seedResult = await seedDatabase();
    
    console.log("🎉 Database setup completed successfully!");
    console.log("Summary:", seedResult);
    
  } catch (error) {
    console.error("❌ Database setup failed:", error);
    throw error;
  }
}

// Run setup if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  setupDatabase()
    .then(() => {
      console.log("Database setup completed successfully!");
      process.exit(0);
    })
    .catch((error) => {
      console.error("Database setup failed:", error);
      process.exit(1);
    });
}