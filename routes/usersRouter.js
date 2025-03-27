import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  console.log("✅ /users route hit!");  // Log for debugging
  res.send("User route working!");
});

export default router;
