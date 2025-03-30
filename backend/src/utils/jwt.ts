import { sign, verify } from "jsonwebtoken";
import { JWT_SECRET } from "../config";
import { JWT_TOKEN_EXPIRY } from "../constants";

export const generateToken = (payload: any) =>
  sign(payload, JWT_SECRET, { expiresIn: JWT_TOKEN_EXPIRY });

export const decodeToken = (token: string): { status: boolean; data: any } => {
  try {
    const decoded = verify(token, process.env.JWT_SECRET!);
    return { status: true, data: decoded };
  } catch (error) {
    return { status: false, data: null };
  }
};
