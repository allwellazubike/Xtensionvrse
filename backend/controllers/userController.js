import db from "../config/db.js";
import generateToken from "../utils/generateToken.js";
import { hashPassword, verifyPassword } from "./hashController.js";

// @desc    Auth user & get token
// @route   POST /api/user/login
// @access  Public
const authUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (result.rows.length === 0) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const user = result.rows[0];

    if (await verifyPassword(password, user.password_hash)) {
      generateToken(res, user.id, user.role || "user");

      res.json({
        id: user.id,
        name: user.full_name,
        email: user.email,
        phone: user.phone,
        role: user.role || "user",
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Register a new user
// @route   POST /api/user/create
// @access  Public
const registerUser = async (req, res) => {
  const { name, email, password, phone } = req.body;

  try {
    const userExists = await db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (userExists.rows.length > 0) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await hashPassword(password);

    const result = await db.query(
      "INSERT INTO users (full_name, email, password_hash, phone) VALUES ($1, $2, $3, $4) RETURNING *",
      [name, email, hashedPassword, phone],
    );

    const user = result.rows[0];

    generateToken(res, user.id, user.role || "user");

    res.status(201).json({
      id: user.id,
      name: user.full_name,
      email: user.email,
      phone: user.phone,
      role: user.role || "user",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Logout user / clear cookie
// @route   POST /api/user/logout
// @access  Public
const logoutUser = (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "Logged out successfully" });
};

// @desc    Get user profile
// @route   GET /api/user/profile
// @access  Private
const getUserProfile = async (req, res) => {
  try {
    const user = {
      id: req.user.id,
      name: req.user.full_name,
      email: req.user.email,
      phone: req.user.phone,
      role: req.user.role || "user",
    };
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Get all users (Admin only ideally, but keeping simple for now)
// @route   GET /api/user/all
// @access  Private/Admin
const getAllUsers = async (req, res) => {
  try {
    const result = await db.query(
      "SELECT id, full_name, email, phone, created_at FROM users ORDER BY created_at DESC",
    );
    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export { authUser, registerUser, logoutUser, getUserProfile, getAllUsers };
