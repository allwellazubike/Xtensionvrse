import db from "../config/db.js";
import crypto from "crypto";

// Create a new order
export const createOrder = async (req, res) => {
  try {
    const { userId, items, totalAmount, paymentMethod } =
      req.body;

    // Basic validation
    if (!totalAmount || !items) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const orderIdAlias = `XV-${crypto.randomBytes(4).toString("hex").toUpperCase()}`;

    const query = `
      INSERT INTO orders (user_id, items, total_amount, payment_method, order_id_alias, status)
      VALUES ($1, $2, $3, $4, $5, 'pending')
      RETURNING *;
    `;

    const values = [
      userId || null,
      JSON.stringify(items),
      totalAmount,
      paymentMethod || "bank_transfer",
      orderIdAlias,
    ];
    const result = await db.query(query, values);

    res.status(201).json({
      message: "Order created successfully",
      order: result.rows[0],
    });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ error: "Failed to create order" });
  }
};

// Get all orders (for Admin Dashboard)
export const getAllOrders = async (req, res) => {
  try {
    const query = `
      SELECT orders.*, users.full_name as user_name 
      FROM orders 
      LEFT JOIN users ON orders.user_id = users.id 
      ORDER BY orders.created_at DESC
    `;
    const result = await db.query(query);
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: "Failed to fetch orders" });
  }
};

// Get single order by ID or Alias
export const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    // Check if id is integer (ID) or string (Alias)
    // For simplicity, we'll try to match either
    const query = `
      SELECT * FROM orders 
      WHERE order_id_alias = $1 OR id::text = $1
    `;
    const result = await db.query(query, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Order not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error fetching order:", error);
    res.status(500).json({ error: "Failed to fetch order" });
  }
};

// Confirm an order (Admin action)
export const confirmOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const query =
      "UPDATE orders SET status = 'confirmed' WHERE id = $1 RETURNING *";
    const result = await db.query(query, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Order not found" });
    }

    res.json({
      message: "Order confirmed successfully",
      order: result.rows[0],
    });
  } catch (error) {
    console.error("Error confirming order:", error);
    res.status(500).json({ error: "Failed to confirm order" });
  }
};

// Decline an order (Admin action)
export const declineOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const query =
      "UPDATE orders SET status = 'declined' WHERE id = $1 RETURNING *";
    const result = await db.query(query, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Order not found" });
    }

    res.json({
      message: "Order declined successfully",
      order: result.rows[0],
    });
  } catch (error) {
    console.error("Error declining order:", error);
    res.status(500).json({ error: "Failed to decline order" });
  }
};

// Get orders by User ID
export const getOrdersByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const query =
      "SELECT * FROM orders WHERE user_id = $1 ORDER BY created_at DESC";
    const result = await db.query(query, [userId]);
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching user orders:", error);
    res.status(500).json({ error: "Failed to fetch user orders" });
  }
};
