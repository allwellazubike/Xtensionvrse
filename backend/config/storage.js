import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import env from "dotenv";
import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
env.config({ path: path.join(__dirname, "..", ".env") });

// cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// cloudinary storage config
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "hair-products",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
    transformation: [{ width: 1000, height: 1000, crop: "limit" }],
  },
});

export const upload = multer({ storage: storage });