import express from "express";
import bodyParser from "body-parser";
import bcrypt from "bcrypt";
// import pg from "pg"; // Moved to config/db.js
import env from "dotenv";
import cors from "cors";
// import multer from "multer"; // Moved to config/storage.js
// import { v2 as cloudinary } from "cloudinary"; // Moved to config/storage.js
// import { CloudinaryStorage } from "multer-storage-cloudinary"; // Moved to config/storage.js

import productRoutes from "./routes/productRoutes.js";

const app = express();
app.use(cors());
env.config();
const port = process.env.PORT || 3000;
const saltRounds = 10;

app.use(bodyParser.json());

// Routes
app.use("/api/products", productRoutes);

// Helper for user creation (still here for now)
async function hashPassword(plainPassword) {
  const hash = await bcrypt.hash(plainPassword, saltRounds);
  return hash;
}

// create user - This probably belongs in a userRoutes.js eventually
app.post("/api/user/create", async (req, res) => {
  try {
    const { password, email, name, phone } = req.body;
    const hashedPassword = await hashPassword(password);
    console.log(hashedPassword);
    res.status(201).json({ message: "user created successfully" });
  } catch (error) {
    console.error(error);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
