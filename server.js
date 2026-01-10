import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import env from "dotenv";
import cors from "cors";

const app = express();
app.use(cors());
env.config();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

const db = new pg.Client({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});
db.connect(); 

app.get("/api/products", async (req, res) => {
    const result = await db.query("SELECT * FROM products");

    try {
        if (result.rows.length === 0) {
            return res.status(404).json({ error: "No products found" });
        }
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Database error" });
    }
    });



        // const result = await db.query("SELECT * FROM products");
    // if (error) {
    //     console.error(err);
    //     res.status(500).json({ error: "Database error" });
    // } else {
    //     res.json(result.rows);
    //     }

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
