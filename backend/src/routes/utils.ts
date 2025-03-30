import { Request, Response, Router } from "express";
import upload from "../configurations/multer";
import { failureLabel } from "../constants";
import { AuthController, UtilsController } from "../controllers";
import { authMiddleware } from "../middlewares";

const utilsRouter = Router();

utilsRouter.post(
  "/upload-image",
  authMiddleware,
  upload.single("image"),
  UtilsController.handleImageUpload
);

/**
 * 404 Route
 */
utilsRouter.use("*", (req: Request, res: Response) =>
  res
    .status(404)
    .json({ status: failureLabel, msg: "Invalid Route in /utils😔😔" })
);

export { utilsRouter };
