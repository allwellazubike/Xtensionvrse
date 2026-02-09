import db from "./config/db.js";

const createOrdersTable = async () => {
  try {
    const query = `
      CREATE TABLE IF NOT EXISTS orders (
        id SERIAL PRIMARY KEY,
        user_id INTEGER,
        order_id_alias VARCHAR(50), 
        total_amount NUMERIC(10, 2) NOT NULL,
        status VARCHAR(50) DEFAULT 'pending',
        payment_method VARCHAR(50) DEFAULT 'bank_transfer',
        items JSONB,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;
    // Note: Removed Foreign Key constraint on user_id for now to avoid errors if users table key differs or if guest checkout.
    // Added order_id_alias to store the "XV-1234" style ID if we want to keep it separate from the DB serial ID.

    await db.query(query);
    console.log("Orders table created successfully.");
  } catch (error) {
    console.error("Error creating orders table:", error);
  } finally {
    process.exit();
  }
};

createOrdersTable();
