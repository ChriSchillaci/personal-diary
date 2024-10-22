import type { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import type { CustomRequest } from "../types/customRequest";

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.token;

  if (!token) {
    res.status(401).json({ message: "Invalid Token" });
    return;
  }

  try {
    const decoded = jwt.verify(
      token,
      String(process.env.SECRET_KEY)
    ) as JwtPayload;

    (req as CustomRequest).token = decoded.user;

    next();
  } catch (error) {
    console.error("Token verification failed:", error);
    res.status(403).json({ message: "Token verification failed" });
    return;
  }
};
