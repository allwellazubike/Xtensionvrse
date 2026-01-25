import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import env from "dotenv";
import cors from "cors";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

const app = express();
app.use(cors());
env.config();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

// db connection
const db = new pg.Client({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});
db.connect();

// cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// multer storage config for cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "hair-products", // Folder name in Cloudinary
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
    transformation: [{ width: 1000, height: 1000, crop: "limit" }], // Resize images
  },
});

const upload = multer({ storage: storage });

// GET all products
app.get("/api/products", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM products");

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "No products found" });
    }
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Database error" });
  }
});

// create user
app.post("/api/user/create", async (req, res) => {
try {
  console.log("Received user creation request");
  console.log("Body:", req.body);
} catch (error) {
  console.error(error);
  res.status(500).json({ error: "Database error" });
}
});


// create product
app.post(
  "/api/products/create",
  upload.fields([
    { name: "primaryImage", maxCount: 1 },
    { name: "galleryImages", maxCount: 10 },
  ]),
  async (req, res) => {
    try {
      console.log("Received product creation request");
      console.log("Body:", req.body);
      console.log("Files:", req.files);

      // extract data from req
      const {
        name,
        category,
        description,
        price,
        originalPrice,
        stock,
        badgeText,
        badgeColor,
        sale,
        lengths,
        weights,
        specifications,
      } = req.body;

      // Validate required fields
      if (!name || !name.trim()) {
        return res.status(400).json({ message: "Product name is required" });
      }

      if (!price || parseFloat(price) <= 0) {
        return res.status(400).json({ message: "Valid price is required" });
      }

      if (!req.files || !req.files.primaryImage) {
        return res.status(400).json({ message: "Primary image is required" });
      }

      if (!stock || parseInt(stock) <= 0) {
        return res
          .status(400)
          .json({ message: "Stock must be greater than 0" });
      }

      // Convert types for database
      const priceNumeric = parseFloat(price);
      const originalPriceNumeric = originalPrice
        ? parseFloat(originalPrice)
        : null;
      const saleBoolean = sale === "true" || sale === true;

      // parse json strings back to arrays
      const lengthsArray = lengths ? JSON.parse(lengths) : [];
      const weightsArray = weights ? JSON.parse(weights) : [];
      let specsArray = specifications ? JSON.parse(specifications) : [];

      // Merge lengths and weights into specsArray
      if (lengthsArray.length > 0) {
        specsArray.push(`Length: ${lengthsArray.join(", ")}`);
      }
      if (weightsArray.length > 0) {
        specsArray.push(`Weight: ${weightsArray.join(", ")}`);
      }
      const stockNumeric = parseInt(stock);
      // get cloudinary urls for uploaded images
      const primaryImageUrl = req.files.primaryImage[0].path;

      const galleryImageUrls = req.files.galleryImages
        ? req.files.galleryImages.map((file) => file.path)
        : [];

      const altText = `${name} - Hair Extension Product Image`;

      // insert into database
      const query = `
        INSERT INTO products 
        (name, price, original_price, stock, image, alt, sale, badge, badge_color, description, specs, images, category)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
        RETURNING *
      `;

      const values = [
        name.trim(),
        priceNumeric,
        originalPriceNumeric,
        stockNumeric,
        primaryImageUrl,
        altText,
        saleBoolean,
        badgeText || null,
        badgeColor || null,
        description || null,
        specsArray, // pg handles TEXT[] array
        galleryImageUrls, // pg handles TEXT[] array
        category,
      ];

      const result = await db.query(query, values);

      console.log("Product created successfully:", result.rows[0]);

      res.status(201).json({
        message: "Product created successfully!",
        product: result.rows[0],
      });
    } catch (error) {
      console.error("Error creating product:", error);
      res.status(500).json({
        message: "Failed to create product",
        error: error.message,
      });
    }
  },
);

// delete a product
app.delete('/api/items/:id', async (req, res) => {
  const itemId = req.params.id;
  try {
    await db.query("DELETE FROM products WHERE id = $1", [itemId]);
    res.redirect("/admin/products");
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to delete product" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});