import express from "express";
import {registerUser, loginUser , logoutUser} from "../controllers/authController.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("User route working!");
});
router.get("/logout", logoutUser)
router.post("/register", registerUser);
router.post("/login", loginUser);

export default router;
