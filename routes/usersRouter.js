import express from "express";
import userModel from "../models/user.model.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("User route working!");
});
router.post("/register", async (req, res) => {
  let { fullname, email, password } = req.body;
  let user = await userModel.create({
    fullname,
    email,
    password,
  });
  res.redirect('/')
});

export default router;
