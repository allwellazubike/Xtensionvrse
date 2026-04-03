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

const router = express.Router();

router.post("/", createOrder);
router.get("/shipping-estimate", getShippingEstimate);
router.get("/", getAllOrders); //integrate Auth middleware here
router.get("/:id", getOrderById);
router.put("/:id/confirm", confirmOrder); // integrate Admin Auth middleware here
router.put("/:id/decline", declineOrder);
router.put("/:id/ship", markOrderAsShipped);
router.get("/user/:userId", getOrdersByUserId);
router.put("/:id/receipt", upload.single("receiptImage"), uploadReceipt);

export default router;
