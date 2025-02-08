import sqlite3 from "sqlite3";
import { open } from "sqlite";
import path from "path";
import fs from "fs";

// Ensure the database file exists in the root directory
const DB_PATH = path.join(process.cwd(), "extDb.db");

// Create the database file if it doesn't exist
if (!fs.existsSync(DB_PATH)) {
  console.log("📌 Creating SQLite database: extDb.db");
  fs.writeFileSync(DB_PATH, ""); // This will create an empty file
}

// Open the database connection
export const dbPromise = open({
  filename: DB_PATH,
  driver: sqlite3.Database,
});

// Initialize the database with a "users" table if it doesn't exist
async function initDB() {
  const db = await dbPromise;
  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL
    )
  `);
  console.log("✅ Database initialized with users table.");
}

// Run initialization on startup
initDB().catch(console.error);
