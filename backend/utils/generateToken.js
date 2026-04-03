import jwt from "jsonwebtoken";

const generateToken = (res, userId, role = "user") => {
  const token = jwt.sign({ userId, role }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  const isProduction = process.env.NODE_ENV === "production";

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: true,                               // Always true — your live site is HTTPS
    sameSite: isProduction ? "none" : "strict", // "none" required for cross-domain on deployed site
    maxAge: 30 * 24 * 60 * 60 * 1000,          // 30 days
  });
};

export default generateToken;
