import bcrypt from "bcrypt";

const saltRounds = 10;

export async function hashPassword(plainPassword) {
  const hash = await bcrypt.hash(plainPassword, saltRounds);
  return hash;
}

export async function verifyPassword(plainPassword, hashedPasswordFromDB) {
  try {
    const isMatch = await bcrypt.compare(plainPassword, hashedPasswordFromDB);
    return isMatch;
  } catch (error) {
    console.error("Error verifying password:", error);
    return false;
  }
}