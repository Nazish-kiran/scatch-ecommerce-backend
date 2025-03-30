import express from "express";
import db from "./config/mongoose-connection.js";
import cookieParser from "cookie-parser";
import path from "path";
import usersRouter from "./routes/usersRouter.js";
import ownersRouter from "./routes/ownersRouter.js";
import productsRouter from "./routes/productsRouter.js";
import indexRouter from './routes/index.js';
import flash from 'connect-flash';
import expressSession from 'express-session'
import dotenv from 'dotenv';
dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(import.meta.dirname, "public")));
app.use(expressSession({
  resave:false,
  saveUninitialized:false,
  secret:process.env.EXPRESS_SESSION_SECRET
}))
app.use(flash())

app.set("view engine", "ejs");

console.log("Users router middleware triggered!");
app.use("/owners", ownersRouter);
app.use("/users", usersRouter);
app.use("/products", productsRouter);
app.use('/',indexRouter)


const PORT = 3000;

app.listen(PORT, () => {
  console.log(`App working on port ${PORT}`);
});
