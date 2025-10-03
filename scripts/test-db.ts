#!/usr/bin/env tsx

import { getDb } from "../server/db";
import { companies } from "@shared/schema";

async function testDatabase() {
  console.log("🧪 Testing database connection...");

  try {
    const db = getDb();
    
    // Test basic connection
    const result = await db.select().from(companies).limit(1);
    
    if (result.length > 0) {
      console.log("✅ Database connection successful!");
      console.log("Sample company:", result[0].name);
    } else {
      console.log("⚠️  Database connected but no companies found. Run 'npm run db:seed' to add sample data.");
    }
    
    return true;
  } catch (error) {
    console.error("❌ Database connection failed:", error);
    
    if (error instanceof Error) {
      if (error.message.includes("DATABASE_URL")) {
        console.log("\n💡 Tip: Set your DATABASE_URL environment variable:");
        console.log("export DATABASE_URL='postgresql://username:password@host:port/database'");
      }
    }
    
    return false;
  }
}

// Run test if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  testDatabase()
    .then((success) => {
      process.exit(success ? 0 : 1);
    })
    .catch((error) => {
      console.error("Test failed:", error);
      process.exit(1);
    });
}