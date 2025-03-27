import express from "express";
import db from "./config/mongoose-connection.js";
import cookieParser from "cookie-parser";
import path from "path";
import ownersRouter from "./routes/ownersRouter.js";
import usersRouter from "./routes/usersRouter.js";  
import productsRouter from "./routes/productsRouter.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser);
app.use(express.static(path.join(import.meta.dirname, "public")));

app.set("view engine", "ejs");

app.use("/owner", ownersRouter);
app.use("/user", usersRouter);
app.use("/product", productsRouter);

const PORT = 9095;

app.listen(PORT, () => {
  console.log(`App working on port ${PORT}`);
});
