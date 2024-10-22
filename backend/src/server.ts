import type { Request, Response } from "express";
import express from "express";
import path from "path";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import db from "./utils/db";

import userAuth from "./routes/userAuth";

dotenv.config();

db();

const app = express();
const port = process.env.PORT || 3000;

app.use(
  cors({
    origin: `${process.env.BASE_PORT_CLIENT}`,
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/user", userAuth);

app.use(express.static(path.join(__dirname, "public")));

app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "login.html"));
});

app.get("/register", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "register.html"));
});
app.get("/user", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "user.html"));
});

app.get("/add-post", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "add-post.html"));
});

app.get("*", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(port, () => {
  console.log(`server running in port ${port}`);
});
