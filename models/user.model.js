import mongoose from "mongoose";

mongoose.connect(
  "mongodb+srv://nazishkirancosmos123:admin123@cluster2.ddkwu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster2"
);

const userSchema = new mongoose.Schema({
  fullname: String,
  email: String,
  password: String,
  cart: Array,
  isadmin: Boolean,
  orders: Array,
  contact: Number,
  picture: String,
});

export default mongoose.model("User", userSchema);
