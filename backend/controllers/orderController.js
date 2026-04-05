import db from "../config/db.js";
import crypto from "crypto";
import {
  sendOrderConfirmationEmail,
  sendOrderShippedEmail,
  sendOrderPlacedEmail,
} from "../utils/emailService.js";

// Get dynamic avg shipping estimate (no hardcoded values)
export const getShippingEstimate = async (req, res) => {
  try {
    const result = await db.query(
      "SELECT AVG(shipping_fee) as avg_fee FROM orders WHERE shipping_fee > 0",
    );
    const avgFee = Math.round(parseFloat(result.rows[0].avg_fee) || 4000);
    res.json({ estimatedShipping: avgFee });
  } catch (error) {
    console.error("Error fetching shipping estimate:", error);
    res.status(500).json({ error: "Failed to get estimate" });
  }
};

// create a new order
export const createOrder = async (req, res) => {
  try {
    const {
      userId,
      items,
      totalAmount,
      paymentMethod,
      customer_name,
      customer_email,
      customer_phone,
      shipping_address,
      shipping_state,
    } = req.body;

    // validation
    if (!totalAmount || !items || !items.length) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    if (
      !customer_name ||
      !customer_email ||
      !customer_phone ||
      !shipping_address ||
      !shipping_state
    ) {
      return res
        .status(400)
        .json({ error: "Missing required shipping details" });
    }

    // Look up shipping fee from the live shipping_zones table
    const cleanState = shipping_state.trim();
    const zoneRes = await db.query(
      "SELECT price FROM shipping_zones WHERE LOWER(state) = LOWER($1) AND is_active = TRUE",
      [cleanState],
    );
    const calculatedShippingFee =
      zoneRes.rows.length > 0 ? parseFloat(zoneRes.rows[0].price) : 5000; // fallback if state not in zones

    const orderIdAlias = `XV-${crypto.randomBytes(4).toString("hex").toUpperCase()}`;

    // Begin securely isolated transaction for stock decrementing
    await db.query("BEGIN");

    // Pre-check all items for stock integrity
    for (const item of items) {
      const stockRes = await db.query(
        "SELECT stock FROM products WHERE id = $1 FOR UPDATE",
        [item.id],
      );
      if (stockRes.rows.length === 0) {
        await db.query("ROLLBACK");
        return res
          .status(404)
          .json({
            error: `Product ${item.name} could not be found in our catalog.`,
          });
      }
      const availableStock = stockRes.rows[0].stock;
      if (availableStock < item.quantity) {
        await db.query("ROLLBACK");
        return res
          .status(400)
          .json({
            error: `Insufficient stock for ${item.name}. We only have ${availableStock} left in stock.`,
          });
      }
    }

    // Pass the checks, decrement the stock!
    for (const item of items) {
      await db.query("UPDATE products SET stock = stock - $1 WHERE id = $2", [
        item.quantity,
        item.id,
      ]);
    }

    const query = `
      INSERT INTO orders (
        user_id, items, total_amount, payment_method, order_id_alias, status,
        customer_name, customer_email, customer_phone, shipping_address, shipping_state, shipping_fee
      )
      VALUES ($1, $2, $3, $4, $5, 'pending', $6, $7, $8, $9, $10, $11)
      RETURNING *;
    `;

    const values = [
      userId || null,
      JSON.stringify(items),
      totalAmount, // Note: We trust the FE total, but override the shipping fee
      paymentMethod || "bank_transfer",
      orderIdAlias,
      customer_name,
      customer_email,
      customer_phone,
      shipping_address,
      shipping_state,
      calculatedShippingFee,
    ];
    const result = await db.query(query, values);

    // Finalize the transaction
    await db.query("COMMIT");

    res.status(201).json({
      message: "Order created successfully",
      order: result.rows[0],
    });

    // Fire placement confirmation email (non-blocking)
    if (customer_email) {
      sendOrderPlacedEmail(result.rows[0]).catch((err) =>
        console.error("[EMAIL] Order placement email error:", err),
      );
    }
  } catch (error) {
    await db.query("ROLLBACK");
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

    // Fire confirmation email asynchronously (do not block the HTTP response)
    if (result.rows[0].customer_email) {
      sendOrderConfirmationEmail(result.rows[0]).catch((err) =>
        console.error("Async Email Error:", err),
      );
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

// Mark order as shipped (Admin action)
export const markOrderAsShipped = async (req, res) => {
  try {
    const { id } = req.params;
    const query =
      "UPDATE orders SET status = 'shipped' WHERE id = $1 RETURNING *";
    const result = await db.query(query, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Order not found" });
    }

    // Fire shipped email asynchronously
    if (result.rows[0].customer_email) {
      sendOrderShippedEmail(result.rows[0]).catch((err) =>
        console.error("Async Email Error:", err),
      );
    }

    res.json({
      message: "Order marked as shipped successfully",
      order: result.rows[0],
    });
  } catch (error) {
    console.error("Error marking order as shipped:", error);
    res.status(500).json({ error: "Failed to mark order as shipped" });
  }
};

// Upload Bank Transfer Receipt
export const uploadReceipt = async (req, res) => {
  try {
    const { id } = req.params;

    if (!req.file) {
      return res.status(400).json({ error: "No receipt image provided" });
    }

    const receiptUrl = req.file.path; // Cloudinary URL created by Multer automatically

    // Support both serial ID and order_id_alias (e.g., XV-1234)
    const query =
      "UPDATE orders SET receipt_url = $1 WHERE id::text = $2 OR order_id_alias = $2 RETURNING *";
    const result = await db.query(query, [receiptUrl, id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Order not found" });
    }

    res.json({
      message: "Receipt uploaded successfully",
      order: result.rows[0],
    });
  } catch (error) {
    console.error("Error uploading receipt:", error);
    res.status(500).json({ error: "Failed to upload receipt" });
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
