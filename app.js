import express from "express";
import db from "./config/mongoose-connection.js";
import cookieParser from "cookie-parser";
import path from "path";
import usersRouter from "./routes/usersRouter.js";
import ownersRouter from "./routes/ownersRouter.js";
import productsRouter from "./routes/productsRouter.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(import.meta.dirname, "public")));

app.set("view engine", "ejs");

// app.use("/owners", ownersRouter);
// app.use("/users", (req, res, next) => {
//   console.log("Users router middleware triggered!");
//   next();
// }, usersRouter);
// app.use("/products", productsRouter);

app.get("/", (req, res) => {
  res.send("Welcome to the home page!");
})

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`App working on port ${PORT}`);
});
