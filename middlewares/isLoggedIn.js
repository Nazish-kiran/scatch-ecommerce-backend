import jwt from "jsonwebtoken";
import userModel from "../models/user-model";
import dotenv from "dotenv";
dotenv.config();
const isLoggedIn = async () => {
  if (!req.cookies.token) {
    req.flash("error", "you need to loggin first");
    return res.redirect("/");
  }
  try {
    let decoded = jwt.verify(req.cookies.verify, process.env.JWT_KEY);
    let user = await userModel
      .findOne({ email: decoded.email })
      .select("-password");
    req.user = user;
    next();
  } catch (err) {
    req.flash("error", "something went wrong");
    return res.redirect("/");
  }
};

export { isLoggedIn };
