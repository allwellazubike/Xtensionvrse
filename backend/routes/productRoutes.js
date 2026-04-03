import express from "express";
import { upload } from "../config/storage.js";
import {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

// GET all products
router.get("/", getAllProducts);

// CREATE product (Admin only)
router.post(
  "/create",
  protect,
  adminOnly,
  upload.fields([
    { name: "primaryImage", maxCount: 1 },
    { name: "galleryImages", maxCount: 10 },
  ]),
  createProduct,
);

// UPDATE product (Admin only)
router.put(
  "/:id",
  protect,
  adminOnly,
  upload.fields([
    { name: "primaryImage", maxCount: 1 },
    { name: "galleryImages", maxCount: 10 },
  ]),
  updateProduct,
);

// DELETE product (Admin only)
router.delete("/:id", protect, adminOnly, deleteProduct);

export default router;
