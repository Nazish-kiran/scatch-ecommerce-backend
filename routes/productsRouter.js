import express from "express";
import upload from "../config/multer-config.js";
import productModel from "../models/product-model.js";

const router = express.Router();

router.post("/create", upload.single("image"), async (req, res) => {
  let { name, price, discount, bgcolor, panelcolor, textcolor } = req.body;
  if (!req.file || !name || !price || !bgcolor || !panelcolor || !textcolor) {
    req.flash("error", "All fields are required.");
    return res.redirect("/owners/admin"); // Redirect if data is missing
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
  res.status(201).send(product);
});

export default router;
