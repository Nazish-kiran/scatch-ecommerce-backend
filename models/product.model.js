import { name } from "ejs";
import mongoose from "mongoose";
import { type } from "os";
import { text } from "stream/consumers";

const productSchema = new mongoose.Schema({
  image: String,
  name: String,
  price: Number,
  discount: {
    type: Number,
    default: 0,
  },
  bgcolor: String,
  panelcolor: String,
  textcolor: String,
});

export default mongoose.model("Product", productSchema);
