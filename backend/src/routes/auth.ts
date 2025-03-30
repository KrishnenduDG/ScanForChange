import { Request, Response, Router } from "express";
import { failureLabel } from "../constants";
import { AuthController } from "../controllers";
import { authMiddleware } from "../middlewares";

const authRouter = Router();

authRouter
  .post("/signup", AuthController.handleSignup)
  .post("/login", AuthController.handleLogin)
  .get("/profile", authMiddleware, AuthController.handleGetProfile);

/**
 * 404 Route
 */
authRouter.use("*", (req: Request, res: Response) =>
  res
    .status(404)
    .json({ status: failureLabel, msg: "Invalid Route in /auth😔😔" })
);

export { authRouter };
