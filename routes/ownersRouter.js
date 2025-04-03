import express from "express";
import ownerModel from "../models/owner-model.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Owner route");
});

router.post("/create", async (req, res) => {
  let owners = await ownerModel.find();
  if (owners.length > 0) {
    return res
      .status(403)
      .send("you don't have permission to create more than one owner");
  }
  let { fullname, email, password } = req.body;
  let createdOwner = await ownerModel.create({
    fullname,
    email,
    password,
  });
  res.status(201).send(createdOwner);
});

router.get("/admin", (req , res)=>{
  let sucess = req.flash("sucess")
  res.render("createproducts", {sucess})
})

export default router;
