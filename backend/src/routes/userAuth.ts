import type {
  UserSchemaType,
  UserPostType,
  UserEditType,
} from "../types/userSchemaTypes";
import type { Request, Response } from "express";
import type { CustomRequest } from "../types/customRequest";
import { Router } from "express";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import User from "../models/user";
import { authenticateToken } from "../middlewares/authToken";

const route = Router();

route.post("/register", async (req: Request, res: Response) => {
  const { first_name, last_name, email, password }: UserSchemaType = req.body;
  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new Error("User already exists");
    }

    const hashedPassword = await bcryptjs.hash(password, 10);

    const user = new User({
      first_name,
      last_name,
      email,
      password: hashedPassword,
    });

    await user.save();

    res.status(201).json({ message: `User ${first_name} registered` });
  } catch (error) {
    if (error instanceof Error) {
      res.status(409).json({ message: error.message });
      return;
    }
    res.status(500).json({ message: "Something went wrong" });
  }
});

route.post("/login", async (req, res) => {
  const { email, password }: Pick<UserSchemaType, "email" | "password"> =
    req.body;

  try {
    const user = await User.findOne({ email });

    if (!user || !(await bcryptjs.compare(password, user.password))) {
      res.status(401);
      throw new Error("Invalid credentials. Please try again.");
    }

    const token = jwt.sign({ user: user._id }, String(process.env.SECRET_KEY));

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 86400000,
    });

    res.status(200).json({ message: "User logged in" });
  } catch (error) {
    if (error instanceof Error) {
      res.status(404).json({ message: error.message });
      return;
    }
    res.status(500).json({ message: "Something went wrong" });
  }
});

route.put("/edit-user", async (req: Request, res: Response) => {
  const { _id, first_name, last_name, email, image }: UserEditType = req.body;
  try {
    await User.findByIdAndUpdate(
      { _id },
      { first_name, last_name, email, image }
    );
    res.status(200).json({ message: "User updated" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

route.post(
  "/add-post",
  authenticateToken,
  async (req: Request, res: Response) => {
    const { title, text_post }: UserPostType = req.body;
    try {
      const _id = (req as CustomRequest).token;
      const userData = await User.findByIdAndUpdate(
        { _id },
        { $push: { posts: { title, text_post } } }
      );

      if (!userData) {
        res.status(404).json({ message: "User not found" });
        return;
      }

      res.status(200).json({ message: "Post added" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

route.get("/data", authenticateToken, async (req: Request, res: Response) => {
  try {
    const _id = (req as CustomRequest).token;
    const userData = await User.findById({ _id }).select("-password");

    if (!userData) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.status(200).json(userData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

route.get("/get-cookie", (req: Request, res: Response) => {
  const token: string = req.cookies.token;

  if (!token) {
    res.status(404).json({ message: "Cookie not found" });
    return;
  }

  res.status(200).json({ message: "cookie found" });
});

route.get("/delete-cookie", (req: Request, res: Response) => {
  const token = req.cookies.token;

  if (!token) {
    res.status(404).json({ message: "cookie doesn't exist" });
    return;
  }
  res.clearCookie("token");
  res.status(200).json({ message: "cookie deleted" });
});

route.delete("/delete-user", async (req: Request, res: Response) => {
  const { _id }: Pick<UserEditType, "_id"> = req.body;
  try {
    await User.findByIdAndDelete({ _id });

    res.status(200).json({ message: "User deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default route;
