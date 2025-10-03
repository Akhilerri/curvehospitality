import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import * as schema from "@shared/schema";

// Database connection
let db: ReturnType<typeof drizzle>;

export function getDb() {
  if (!db) {
    if (!process.env.DATABASE_URL) {
      throw new Error("DATABASE_URL environment variable is required");
    }
    
    // Handle SQLite file URLs
    const dbPath = process.env.DATABASE_URL.replace('file:', '');
    const sqlite = new Database(dbPath);
    db = drizzle(sqlite, { schema });
  }
  
  return db;
}

export { schema };