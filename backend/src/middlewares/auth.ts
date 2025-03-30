import { NextFunction, Request, Response } from "express";
import { prisma } from "../config";
import { failureLabel } from "../constants";
import { RoleRepo, UserRepo } from "../repository";
import { decodeToken } from "../utils/jwt";

const authMiddleware = async (
  req: Request,
  res: Response<
    {},
    {
      user: IUser;
      role: string;
    }
  >,
  next: NextFunction
) => {
  const token = req.headers["x-auth-token"];

  if (!token) {
    res.status(401).json({ status: failureLabel, msg: "Auth token not found" });
  } else {
    const { status, data } = decodeToken(token as string);

    if (!status) {
      res.status(401).json({ status: failureLabel, msg: "Invalid Auth token" });
    } else {
      const targetUser = await UserRepo.findByUid(data.uid);

      if (!targetUser)
        res.status(401).json({ status: failureLabel, msg: "User not found" });
      else {
        const targetRole = await RoleRepo.findByIdPk(targetUser.roleId);
        res.locals.user = targetUser;
        res.locals.role = targetRole!.name;
        next();
      }
    }
  }
};

export default authMiddleware;
