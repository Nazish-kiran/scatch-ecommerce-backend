import express from "express";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.render("index");
});
router.get("/shop",isLoggedIn, (req, res) => {
  res.render("shop");
});

export default router;