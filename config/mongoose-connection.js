import mongoose from "mongoose";

mongoose
  .connect(
    "mongodb+srv://nazishkirancosmos123:admin123@cluster2.ddkwu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster2"
  )
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((err) => {
    console.log("Error connecting to the database", err);
  });

export default mongoose.connection;
