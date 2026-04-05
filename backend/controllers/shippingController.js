import db from "../config/db.js";

// Ensure the shipping_zones table exists
export const initShippingZones = async () => {
  await db.query(`
    CREATE TABLE IF NOT EXISTS shipping_zones (
      id SERIAL PRIMARY KEY,
      state VARCHAR(100) NOT NULL UNIQUE,
      price NUMERIC NOT NULL,
      is_active BOOLEAN DEFAULT TRUE,
      created_at TIMESTAMP DEFAULT NOW()
    );
  `);

  // Seed defaults if empty
  const count = await db.query("SELECT COUNT(*) FROM shipping_zones");
  if (parseInt(count.rows[0].count) === 0) {
    await db.query(`
      INSERT INTO shipping_zones (state, price) VALUES
        ('Lagos', 3000),
        ('Abuja', 4500),
        ('Rivers', 5000),
        ('Oyo', 4500),
        ('Kano', 5500),
        ('Enugu', 5000),
        ('Delta', 5000),
        ('Anambra', 5000),
        ('Ogun', 3500),
        ('Imo', 5000)
      ON CONFLICT (state) DO NOTHING;
    `);
  }
};

// GET /api/shipping — all active zones (public, used by checkout)
export const getShippingZones = async (req, res) => {
  try {
    const result = await db.query(
      "SELECT * FROM shipping_zones WHERE is_active = TRUE ORDER BY state ASC"
    );
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching shipping zones:", error);
    res.status(500).json({ error: "Failed to fetch shipping zones" });
  }
};

// GET /api/shipping/all — all zones including inactive (admin only)
export const getAllShippingZones = async (req, res) => {
  try {
    const result = await db.query(
      "SELECT * FROM shipping_zones ORDER BY state ASC"
    );
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching all shipping zones:", error);
    res.status(500).json({ error: "Failed to fetch zones" });
  }
};

// POST /api/shipping — add new zone (admin only)
export const addShippingZone = async (req, res) => {
  const { state, price } = req.body;
  if (!state || price === undefined) {
    return res.status(400).json({ error: "State and price are required" });
  }
  try {
    const result = await db.query(
      "INSERT INTO shipping_zones (state, price) VALUES ($1, $2) RETURNING *",
      [state.trim(), parseFloat(price)]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    if (error.code === "23505") {
      return res.status(400).json({ error: `${state} already exists` });
    }
    res.status(500).json({ error: "Failed to add zone" });
  }
};

// PUT /api/shipping/:id — update price or toggle active (admin only)
export const updateShippingZone = async (req, res) => {
  const { id } = req.params;
  const { price, is_active } = req.body;
  try {
    const result = await db.query(
      `UPDATE shipping_zones 
       SET price = COALESCE($1, price), is_active = COALESCE($2, is_active)
       WHERE id = $3 RETURNING *`,
      [price !== undefined ? parseFloat(price) : null, is_active !== undefined ? is_active : null, id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: "Zone not found" });
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: "Failed to update zone" });
  }
};

// DELETE /api/shipping/:id — remove zone (admin only)
export const deleteShippingZone = async (req, res) => {
  const { id } = req.params;
  try {
    await db.query("DELETE FROM shipping_zones WHERE id = $1", [id]);
    res.json({ message: "Zone deleted" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete zone" });
  }
};

// GET /api/shipping/estimate — average of all active zone prices
export const getShippingEstimate = async (req, res) => {
  try {
    const result = await db.query(
      "SELECT AVG(price) as avg_fee FROM shipping_zones WHERE is_active = TRUE"
    );
    const avgFee = Math.round(parseFloat(result.rows[0].avg_fee) || 4000);
    res.json({ estimatedShipping: avgFee });
  } catch (error) {
    res.status(500).json({ error: "Failed to get estimate" });
  }
};
