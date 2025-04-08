import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  image: Buffer,
  name: String,
  price: Number,
  discount: {
    type: Number,
    default: 0,
  },
  bgcolor: String,
  panelcolor: String,
  textcolor: String,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Product", productSchema);
