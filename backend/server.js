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
import db from "./config/db.js";

const app = express();
app.use(cors());
env.config();
const port = process.env.PORT || 3000;
const saltRounds = 10;

app.use(bodyParser.json());

// Routes
app.use("/api/products", productRoutes);


async function hashPassword(plainPassword) {
  const hash = await bcrypt.hash(plainPassword, saltRounds);
  return hash;
}

async function verifyPassword(plainPassword, hashedPasswordFromDB) {
  try {
    const isMatch = await bcrypt.compare(plainPassword, hashedPasswordFromDB);
    return isMatch;
  } catch (error) {
    console.error("Error verifying password:", error);
    return false;
  }
}

// create user, push to new route 
app.post("/api/user/create", async (req, res) => {
  try {
    const { password, email, name, phone } = req.body;
    const hashedPassword = await hashPassword(password);
    console.log(hashedPassword);
    res.status(201).json({ message: "user created successfully" });
    const result = await db.query
    ("INSERT INTO users (full_name, email, password_hash, phone) VALUES ($1, $2, $3, $4)", [name, email, hashedPassword, phone]);
    console.log(result);
    console.log("user created successfully:", result.rows[0]);
  } catch (error) {
    console.error(error);
  }
});

// login user
app.post("/api/user/login", async (req, res) => {
  try {
      const {email, password} = req.body;
  const result = await db.query("SELECT * FROM users WHERE email = $1", [email]);
  if (result === 0) {
    console.log("available")
  } else {
    console.log(result[0])
  }
  } catch (error) {
    
  }
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
