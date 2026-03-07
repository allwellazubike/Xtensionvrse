import db from "./config/db.js";

const initializeReviewsTable = async () => {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS reviews (
      id SERIAL PRIMARY KEY,
      user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
      product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
      rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
      comment TEXT,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
  `;

  try {
    await db.query(createTableQuery);
    console.log("Reviews table initialized successfully.");
    process.exit(0);
  } catch (err) {
    console.error("Error initializing reviews table:", err);
    process.exit(1);
  }
};

initializeReviewsTable();
