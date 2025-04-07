import express from "express";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";
import productModel from "../models/product-model.js";
import userModel from "../models/user-model.js";

const router = express.Router();

router.get("/", (req, res) => {
  let error = req.flash("error");
  res.render("index", { error, loggedin: false });
});
router.get("/shop", isLoggedIn, async (req, res) => {
  let products = await productModel.find().lean();
  res.render("shop", { products });
});
router.get("/addToCart/:id", isLoggedIn, async (req, res) => {
  let user = await userModel.findOne({email: req.user.email});
});

export default router;
