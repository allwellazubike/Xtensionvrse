import express from "express";
import {
  createOrder,
  getAllOrders,
  confirmOrder,
  getOrderById,
  declineOrder,
  getOrdersByUserId,
} from "../controllers/orderController.js";

const router = express.Router();

router.post("/", createOrder);
router.get("/", getAllOrders); // In a real app, integrate Auth middleware here
router.get("/:id", getOrderById);
router.put("/:id/confirm", confirmOrder); // In a real app, integrate Admin Auth middleware here
router.put("/:id/decline", declineOrder);
router.get("/user/:userId", getOrdersByUserId);

export default router;
