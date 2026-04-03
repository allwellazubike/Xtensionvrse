import dotenv from "dotenv";
import pg from "pg";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), "backend", ".env") });

const { Pool } = pg;

// Support both local (no SSL) and Supabase connections
const poolOptions = {
  connectionString: process.env.DATABASE_URL
};

// Check if it's a remote URL before forcing SSL
if (process.env.DATABASE_URL && !process.env.DATABASE_URL.includes("localhost")) {
  poolOptions.ssl = { rejectUnauthorized: false };
}

const pool = new Pool(poolOptions);

async function migrate() {
  const query = `
    ALTER TABLE orders 
    ADD COLUMN IF NOT EXISTS customer_name text,
    ADD COLUMN IF NOT EXISTS customer_email text,
    ADD COLUMN IF NOT EXISTS customer_phone text,
    ADD COLUMN IF NOT EXISTS shipping_address text,
    ADD COLUMN IF NOT EXISTS shipping_state text,
    ADD COLUMN IF NOT EXISTS shipping_fee numeric;
  `;
  try {
    await pool.query(query);
    console.log("Migration successful! Added shipping fields to orders table.");
  } catch (e) {
    console.error("Migration failed:", e.message);
  } finally {
    await pool.end();
  }
}

migrate();
