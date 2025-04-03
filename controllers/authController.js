import userModel from "../models/user-model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import generateToken from "../utils/generateToken.js";

const registerUser = async (req, res) => {
  try {
    let { fullname, email, password } = req.body;

    if (!fullname || !email || !password) {
      req.flash("error", "All fields are required.");
      return res.redirect("/"); // Redirect if data is missing
    }

    // Check if the user already exists
    let existingUser = await userModel.findOne({ email });
    if (existingUser) {
      req.flash(
        "error",
        "An account with this email already exists. Please log in instead."
      );
      return res.redirect("/"); // Redirect if user already exists
    }

    // Hash the password using bcrypt
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create the user
    let user = await userModel.create({
      fullname,
      email,
      password: hashedPassword,
    });

    // Generate a token for the user
    let token = generateToken(user);

    // Set the token as a cookie and redirect to the shop page
    res.cookie("token", token);
    res.redirect("/shop");
  } catch (err) {
    console.error("Error during registration:", err.message); // Log error
    req.flash("error", err.message);
    res.redirect("/"); // Redirect with an error message
  }
};

const loginUser = async (req, res) => {
  let { email, password } = req.body;
  let user = await userModel.findOne({ email });
  if (!user) {
    req.flash("error", "Incorrect Email or Password");
    return res.redirect("/");
  }

  bcrypt.compare(password, user.password, (err, result) => {
    if (result) {
      let token = generateToken(user);
      res.cookie("token", token);
      res.redirect("/shop");
    } else {
      req.flash("error", "Incorrect Email or password");
      return res.redirect("/");
    }
  });
};
const logoutUser = (req, res) => {
  res.clearCookie("token")
  res.redirect("/");
};
export { registerUser, loginUser, logoutUser };
