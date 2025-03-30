import { Request, Response, Router } from "express";
import { failureLabel } from "../constants";
import { AuthController, WasteController } from "../controllers";
import { authMiddleware } from "../middlewares";

const wasteRouter = Router();

wasteRouter
  .post("/register", authMiddleware, WasteController.handleRegisterWasteRecords)
  .get("/leaderboard", authMiddleware, WasteController.handleGetLeaderboard);
// .post("/data-agg", authMiddleware, WasteController.handleDataAggregration);

/**
 * 404 Route
 */
wasteRouter.use("*", (req: Request, res: Response) =>
  res
    .status(404)
    .json({ status: failureLabel, msg: "Invalid Route in /waste😔😔" })
);

export { wasteRouter };
