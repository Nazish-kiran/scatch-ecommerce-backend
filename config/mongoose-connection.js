import mongoose from "mongoose";
import debug from "debug";
import dotenv from 'dotenv';
dotenv.config();

const dbgr = debug("development:mongoose");
const MONGO_URI = process.env.MONGODB_URI;

mongoose
  .connect(MONGO_URI)
  .then(() => {
    dbgr("Connected to the database");
  })
  .catch((err) => {
    dbgr("Error connecting to the database", err);
  });

export default mongoose.connection;
