import db from "../config/db.js"; // Import the DB connection we made in Phase 1

// getting all products
export const getAllProducts = async (req, res) => {
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
};

// creating a product
export const createProduct = async (req, res) => {
  // PASTE YOUR BIG "app.post" LOGIC HERE
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
      return res.status(400).json({ message: "Stock must be greater than 0" });
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
};

// update product
export const updateProduct = async (req, res) => {
  const productId = req.params.id;
  try {
    console.log("Received product update request for ID:", productId);
    // console.log("Body:", req.body);
    // console.log("Files:", req.files);

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

    // Validate required fields (relaxed for update?) - forcing name and price for now
    if (!name || !name.trim()) {
      return res.status(400).json({ message: "Product name is required" });
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

    // Handle Primary Image
    let primaryImageUrl = req.body.primaryImage; // Expecting string if no new file
    if (req.files && req.files.primaryImage) {
      primaryImageUrl = req.files.primaryImage[0].path;
    }

    // Handle Gallery Images
    let galleryImageUrls = [];
    // 1. Existing images (passed as strings in body)
    if (req.body.galleryImages) {
      // req.body.galleryImages could be a string or array of strings
      const existing = Array.isArray(req.body.galleryImages)
        ? req.body.galleryImages
        : [req.body.galleryImages];
      galleryImageUrls = [...existing];
    }
    // 2. New images (uploaded files)
    if (req.files && req.files.galleryImages) {
      const newImages = req.files.galleryImages.map((file) => file.path);
      galleryImageUrls = [...galleryImageUrls, ...newImages];
    }

    const altText = `${name} - Hair Extension Product Image`;

    // Update database
    const query = `
        UPDATE products SET
          name = $1,
          price = $2,
          original_price = $3,
          stock = $4,
          image = $5,
          alt = $6,
          sale = $7,
          badge = $8,
          badge_color = $9,
          description = $10,
          specs = $11,
          images = $12,
          category = $13
        WHERE id = $14
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
      productId,
    ];

    const result = await db.query(query, values);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    console.log("Product updated successfully:", result.rows[0]);

    res.status(200).json({
      message: "Product updated successfully!",
      product: result.rows[0],
    });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({
      message: "Failed to update product",
      error: error.message,
    });
  }
};

// logic for deleting
export const deleteProduct = async (req, res) => {
  const itemId = req.params.id;
  try {
    await db.query("DELETE FROM products WHERE id = $1", [itemId]);
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete product" });
  }
};
