import express from "express";
import { upload } from "../config/storage.js";
import {
  createOrder,
  getAllOrders,
  confirmOrder,
  getOrderById,
  declineOrder,
  getOrdersByUserId,
  uploadReceipt,
  markOrderAsShipped,
  getShippingEstimate
} from "../controllers/orderController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", createOrder);
router.get("/shipping-estimate", getShippingEstimate);
router.get("/", protect, adminOnly, getAllOrders);
router.get("/user/:userId", protect, getOrdersByUserId);
router.get("/:id", getOrderById);
router.put("/:id/confirm", protect, adminOnly, confirmOrder);
router.put("/:id/decline", protect, adminOnly, declineOrder);
router.put("/:id/ship", protect, adminOnly, markOrderAsShipped);
router.put("/:id/receipt", upload.single("receiptImage"), uploadReceipt);

export default router;
