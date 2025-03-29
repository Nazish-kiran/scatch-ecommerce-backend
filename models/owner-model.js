import mongoose from "mongoose";

const ownerSchema = new mongoose.Schema({
  fullname: {
    type: String,
    trim: true,
    minLength: 3,
  },
  email: String,
  password: String,
  picture: String,
  gstin: String,
  products: Array,
});

export default mongoose.model("Owner", ownerSchema);
