import userModel from "../models/user-model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import generateToken from "../utils/generateToken.js";

const registerUser = () => {
  (req, res) => {
    try {
      let { fullname, email, password } = req.body;
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, async (err, hash) => {
          if (err) return res.send(err.message);
          else {
            let user = await userModel.create({
              fullname,
              email,
              password: hash,
            });

            let token = generateToken(user);
            res.cookie("token", token);
            res.send("user created sucessfully");
          }
        });
      });
    } catch (err) {
      res.send(err.message);
    }
  };
};

export default registerUser;
