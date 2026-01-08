import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "Xtension",
  password: "postgres@allwell",
  port: 5432,
});
db.connect();

app.get("/products", async (req, res) => {
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
