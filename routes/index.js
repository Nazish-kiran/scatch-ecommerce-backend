import express from "express";
import isLoggedIn from "../middlewares/isLoggedIn.js";
import productModel from "../models/product-model.js";
import userModel from "../models/user-model.js";
import { log } from "console";

const router = express.Router();

router.get("/", (req, res) => {
  let error = req.flash("error");
  res.render("index", { error, loggedin: false });
});
router.get("/shop", isLoggedIn, async (req, res) => {
  let products = await productModel.find().lean();
  let success = req.flash("success");
  res.render("shop", { products, success });
});
router.get("/filter", isLoggedIn, async (req, res) => {
  try {
    let products;
    console.log(req.query.sortby);
    if (req.query.sortby === "newest") {
      products = await productModel.find().sort({ createdAt: -1 });     
    } else if (req.query.sortby === "oldest") {
      products = await productModel.find().sort({ createdAt: 1 });
      console.log("error triggered");
      console.log(req.query.sortBy);
    }
    let success = req.flash("success");
    res.render("shop", { products, success });
  } catch (err) {
    console.log(err.message);
  }
  // res.send("hello from post shop route");
});
router.get("/cart", isLoggedIn, async (req, res) => {
  let user = await userModel
    .findOne({ email: req.user.email })
    .populate("cart");
  let cart = user.cart;
  console.log(cart);
  res.render("cart", { user });
});
router.get("/addToCart/:id", isLoggedIn, async (req, res) => {
  console.log(req.user);

  let user = await userModel.findOne({ email: req.user.email });
  user.cart.push(req.params.id);
  await user.save();
  req.flash("success", "Product added to cart successfully!");
  res.redirect("/shop");
});

export default router;
