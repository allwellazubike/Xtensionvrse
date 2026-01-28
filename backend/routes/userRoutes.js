import express from "express";
import db from "../config/db.js";
import expressSession from "express-session";
import passport from "passport";
import passportLocal from "passport-local";
import { Strategy } from "passport-local";
import { verifyPassword, hashPassword } from "../controllers/hashController.js";

const app = express(); 
const router = express.Router();

app.use(expressSession({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 24 * 60 * 60 * 1000 // 1 day
    }
}));

app.use(passport.initialize());
app.use(passport.session());

// create user
router.post("/create", async (req, res) => {
  try {
    const { password, email, name, phone } = req.body;
    const hashedPassword = await hashPassword(password);
    console.log(hashedPassword);

    const result = await db.query(
      "INSERT INTO users (full_name, email, password_hash, phone) VALUES ($1, $2, $3, $4) RETURNING *",
      [name, email, hashedPassword, phone],
    );
    console.log("user created successfully:", result.rows[0]);
    res
      .status(201)
      .json({ message: "user created successfully", user: result.rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create user" });
  }
});

// login user
router.post("/login", async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const result = await db.query("SELECT * FROM users WHERE email = $1", [
//       email,
//     ]);
//     if (!result.rows[0])
//       return res.status(404).json({ error: "User not found" });

//     const isValidPassword = await verifyPassword(
//       password,
//       result.rows[0].password_hash,
//     );
//     if (!isValidPassword) {
//       console.log("invalid credentials");
//       return res.status(401).json({ error: "Invalid credentials" });
//     }

//     console.log("login success");
//     res.json({
//       message: "Login successful",
//       user: { name: result.rows[0].full_name },
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Login failed" });
//   }
});


router.get("/secret", (req, res) => {
    console.log(req.isAuthenticated());
})

passport.use(new Strategy( async function verify(email, password, cb){
    try {
        const result = await db.query("SELECT * FROM users WHERE email = $1", [
            email,
          ]);
          const user = result.rows[0];
          if (!result.rows[0])
            return res.status(404).json({ error: "User not found" });
    
          const isValidPassword = await verifyPassword(
            password,
            result.rows[0].password_hash,
          );
          if (!isValidPassword) {
            console.log("invalid credentials");
            return res.status(401).json({ error: "Invalid credentials" });
          }
         
          console.log("login success");
          res.json({
            message: "Login successful",
            user: { name: result.rows[0].full_name },
          });
          return cb(null, user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Login failed" });
    }
})


)

export default router;