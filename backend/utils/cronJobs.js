import db from "../config/db.js";

export const startCronJobs = () => {
  // Run check every 1 hour
  setInterval(async () => {
    console.log("[CRON] Running 7-hour abandoned order cleanup...");
    try {
      // Find orders older than 7 hours still stuck in 'pending' or 'payment_pending'
      const query = `
        SELECT * FROM orders 
        WHERE status IN ('pending', 'payment_pending') 
        AND created_at < NOW() - INTERVAL '7 hours'
      `;
      const result = await db.query(query);
      const staleOrders = result.rows;

      if (staleOrders.length === 0) {
        return;
      }

      console.log(`[CRON] Found ${staleOrders.length} expired orders. Restoring stock...`);

      for (const order of staleOrders) {
        // Return stock back to products table
        const items = typeof order.items === "string" ? JSON.parse(order.items) : order.items;
        
        for (const item of items) {
          if (item.product_id) {
            await db.query(
              "UPDATE products SET stock = stock + $1 WHERE id = $2", 
              [item.quantity, item.product_id]
            );
          }
        }

        // Mark the order as expired
        await db.query("UPDATE orders SET status = 'expired' WHERE id = $1", [order.id]);
        console.log(`[CRON] Expired order #${order.id} safely.`);
      }
    } catch (error) {
      console.error("[CRON] Backup cleanup error:", error);
    }
  }, 60 * 60 * 1000); // 1 hour
};
