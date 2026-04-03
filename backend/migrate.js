import db from "./config/db.js";

async function run() {
  console.log("Running DB Migration...");
  const sql = `
    ALTER TABLE orders 
    ADD COLUMN IF NOT EXISTS customer_name text,
    ADD COLUMN IF NOT EXISTS customer_email text,
    ADD COLUMN IF NOT EXISTS customer_phone text,
    ADD COLUMN IF NOT EXISTS shipping_address text,
    ADD COLUMN IF NOT EXISTS shipping_state text,
    ADD COLUMN IF NOT EXISTS shipping_fee numeric;
  `;
  try {
    await db.query(sql);
    console.log("Success! Columns added.");
  } catch(e) {
    console.error("Migration Error:", e.stack);
  } finally {
    process.exit(0);
  }
}
run();
