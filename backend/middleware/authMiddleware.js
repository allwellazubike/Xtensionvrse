import jwt from "jsonwebtoken";
import db from "../config/db.js";

const protect = async (req, res, next) => {
  let token;

  token = req.cookies.jwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const result = await db.query(
        "SELECT id, full_name, email FROM users WHERE id = $1",
        [decoded.userId],
      );

      if (result.rows.length === 0) {
        throw new Error("User not found");
      }

      req.user = result.rows[0];

      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  } else {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
};

export { protect };
