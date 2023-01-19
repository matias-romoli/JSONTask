import express from "express";
import path from "path";
const app = express();

import { config } from "./config/config.js";
import routes from "./src/routes/routes.js";
import session from "express-session";
import flash from "connect-flash";

app.use(
  session({
    secret: process.env.SECRET_KEY,
    saveUninitialized: true,
    resave: true,
  })
);
app.use(flash());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", routes);

import { url } from "./utils/utils.js";
const __dirname = url(import.meta.url);

app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

app.listen(config.server.PORT, () => {
  console.log("Server connected");
});
