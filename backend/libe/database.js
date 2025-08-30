import pg from "pg";
import env from "dotenv"
env.config()
const connectionString =process.env.NEON_KEY; // Paste your connection string here

const db = new pg.Pool({
  connectionString,
  ssl: {
    rejectUnauthorized: false, // This is required for some environments
  },
});



export default db;