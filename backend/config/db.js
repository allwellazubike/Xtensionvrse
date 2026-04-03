import pg from "pg";
import env from "dotenv";
import path from "path";
env.config({ path: path.join(process.cwd(), "backend", ".env") });
// database configuration here 
const connectionString = process.env.DATABASE_URL;

const db = new pg.Client(
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

db.connect();

export default db;