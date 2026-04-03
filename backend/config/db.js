import pg from "pg";
import env from "dotenv";
import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
env.config({ path: path.join(__dirname, "..", ".env") });
// database configuration here 
const connectionString = process.env.DATABASE_URL;

const db = new pg.Pool(
  connectionString
    ? { connectionString, ssl: { rejectUnauthorized: false } }
    : {
        user: process.env.PG_USER,
        host: process.env.PG_HOST,
        database: process.env.PG_DATABASE,
        password: process.env.PG_PASSWORD,
        port: process.env.PG_PORT,
      }
);

// Pool automatically handles connections and reconnections!
export default db;