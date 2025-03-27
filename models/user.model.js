import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  fullname: {
    type: String,
    trim: true,
    minLength: 3,
  },
  email: String,
  password: String,
  cart: Array,
  isadmin: Boolean,
  orders: Array,
  contact: Number,
  picture: String,
});

export default mongoose.model("User", userSchema);
