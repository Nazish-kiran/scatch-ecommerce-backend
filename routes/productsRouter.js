import express from "express";
import upload from "../config/multer-config.js";
import productModel from "../models/product-model.js";

const router = express.Router();

router.post("/create", upload.single("image"), async (req, res) => {
  try {
    let { name, price, discount, bgcolor, panelcolor, textcolor } = req.body;
    if (!req.file || !name || !price || !bgcolor || !panelcolor || !textcolor) {
      req.flash("error", "All fields are required.");
      return res.redirect("/owners/admin");
    }
    let product = await productModel.create({
      image: req.file.buffer,
      name,
      price,
      discount,
      bgcolor,
      panelcolor,
      textcolor,
    });
    req.flash("success", "Product created successfully!");
    return res.redirect("/owners/admin");
  } catch (err) {
    req.flash("error", err.message);
    return res.redirect("/owners/admin");
  }
});

export default router;
