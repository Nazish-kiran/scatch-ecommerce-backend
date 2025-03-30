import userModel from "../models/user-model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import generateToken from "../utils/generateToken.js";

const registerUser = async (req, res) => {
  try {
    let { fullname, email, password } = req.body;
    let existingUser = await userModel.findOne({ email });
    if (!existingUser) {
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
    } else {
      res.status(409).send("An account with this email already exists. Please log in instead.");
    }
  } catch (err) {
    res.send(err.message);
  }
};

const loginUser = async (req , res)=>{
    let {email , password}= req.body
   let user = await userModel.findOne({email})
if (!user) return res.send('Incorrect Email or Password')

    bcrypt.compare(password , user.password,(err , result)=>{
        if(result){
            let token = generateToken(user);
            res.cookie("token", token);
            res.send("user loggedin sucessfully");
        }
        else{
           return res.send('incorrect Email or password')
        }
    })
}

export { registerUser, loginUser};
