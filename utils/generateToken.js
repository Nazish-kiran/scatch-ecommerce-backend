import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();

const generateToken = (user) => {
  return jwt.sign({ email: user.email, id: user._id }, process.env.JWT_KEY);
};

export default generateToken;
