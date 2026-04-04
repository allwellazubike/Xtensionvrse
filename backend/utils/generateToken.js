import jwt from "jsonwebtoken";

// Returns the token as a string instead of setting a cookie
// Frontend stores it in localStorage and sends via Authorization header
const generateToken = (userId, role = "user") => {
  return jwt.sign({ userId, role }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

export default generateToken;
