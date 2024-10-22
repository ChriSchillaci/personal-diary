import type { JwtPayload } from "jsonwebtoken";
import type { Request } from "express";

interface CustomRequest extends Request {
  token: string | JwtPayload;
}

export type { CustomRequest };
