import express from "express";
import { upload } from "../config/storage.js";
import {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";

const router = express.Router();

// GET all products
router.get("/", getAllProducts);

// CREATE product
router.post(
  "/create",
  upload.fields([
    { name: "primaryImage", maxCount: 1 },
    { name: "galleryImages", maxCount: 10 },
  ]),
  createProduct,
);

// UPDATE product
router.put(
  "/:id",
  upload.fields([
    { name: "primaryImage", maxCount: 1 },
    { name: "galleryImages", maxCount: 10 },
  ]),
  updateProduct,
);

// DELETE product
// Note: This matches /api/products/:id.
// If frontend calls /api/items/:id, we need to handle that or update frontend.
router.delete("/:id", deleteProduct);

export default router;
