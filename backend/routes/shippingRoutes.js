import express from "express";
import {
  getShippingZones,
  getAllShippingZones,
  addShippingZone,
  updateShippingZone,
  deleteShippingZone,
  getShippingEstimate,
} from "../controllers/shippingController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public — used by checkout and cart
router.get("/", getShippingZones);
router.get("/estimate", getShippingEstimate);

// Admin only
router.get("/all", protect, adminOnly, getAllShippingZones);
router.post("/", protect, adminOnly, addShippingZone);
router.put("/:id", protect, adminOnly, updateShippingZone);
router.delete("/:id", protect, adminOnly, deleteShippingZone);

export default router;
