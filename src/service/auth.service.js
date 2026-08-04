import jwt from "jsonwebtoken";
import "dotenv/config";
import userRepository from "../repositories/user.repositories.js";
import bcrypt from "bcrypt";

function generateJWT(id) {
  return jwt.sign({id},
    process.env.Secret_JWT,
    { expiresIn: 86400 }
  );
}

async function loginService(email, password) {
  const user = await userRepository.findUserByEmailRepository(email);
  if (!user) {
    throw new Error("invalid email or password");
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error("invalid email or password");
  }
  return generateJWT(user.id);
}

export { generateJWT, loginService };
