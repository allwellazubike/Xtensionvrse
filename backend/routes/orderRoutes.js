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
router.get("/", getAllOrders); //integrate Auth middleware here
router.get("/:id", getOrderById);
router.put("/:id/confirm", confirmOrder); // integrate Admin Auth middleware here
router.put("/:id/decline", declineOrder);
router.get("/user/:userId", getOrdersByUserId);

export default router;
