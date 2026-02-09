import express from "express";
import {
  createOrder,
  getAllOrders,
  confirmOrder,
  getOrderById,
} from "../controllers/orderController.js";

const router = express.Router();

router.post("/", createOrder);
router.get("/", getAllOrders); // In a real app, integrate Auth middleware here
router.get("/:id", getOrderById);
router.put("/:id/confirm", confirmOrder); // In a real app, integrate Admin Auth middleware here

export default router;
