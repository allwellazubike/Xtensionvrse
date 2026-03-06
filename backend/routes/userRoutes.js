import express from "express";
import {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  getAllUsers,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/login", authUser);
router.post("/create", registerUser);
router.post("/logout", logoutUser);
router.route("/profile").get(protect, getUserProfile);
router.route("/all").get(getAllUsers); // Consider adding admin protect middleware here later

export default router;
