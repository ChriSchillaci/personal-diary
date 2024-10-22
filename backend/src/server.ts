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

app.use(express.static(path.join(__dirname, "public")));

app.use(
  cors({
    origin: `${process.env.BASE_PORT_CLIENT}`,
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "test" });
});

app.use("/user", userAuth);

app.listen(port, () => {
  console.log(`server running in port ${port}`);
});
