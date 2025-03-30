import { Request, Response, Router } from "express";
import { failureLabel, successLabel } from "../constants";
import { authRouter } from "./auth";
import { utilsRouter } from "./utils";
import { wasteRouter } from "./waste";

const appRouter = Router();

/**
 * Default Health Route
 */
appRouter.get("/", (req: Request, res: Response) =>
  res.status(200).json({ status: successLabel, msg: "Server Up and running.." })
);

/**
 * Registering other routers
 */
appRouter.use("/auth", authRouter);
appRouter.use("/waste", wasteRouter);
appRouter.use("/utils", utilsRouter);

/**
 * 404 Route
 */
appRouter.use("*", (req: Request, res: Response) =>
  res.status(404).json({ status: failureLabel, msg: "Invalid Route!😔😔" })
);

export { appRouter };
