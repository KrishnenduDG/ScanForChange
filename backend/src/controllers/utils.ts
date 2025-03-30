import { NextFunction, Request, Response } from "express";
import { Multer } from "multer";
import cloudinary from "../configurations/cloudinary";
import { failureLabel, successLabel } from "../constants";

class UtilsController {
  static handleImageUpload = async (
    req: Request<{}, {}, {}, {}> & {
      file?: Express.Multer.File;
    },
    res: Response,
    next: NextFunction
  ) => {
    if (!req.file) {
      res.status(400).json({ status: failureLabel, msg: "No file uploaded" });
    } else {
      try {
        const fileBuffer = req.file?.buffer;
        const fileMimeType = req.file?.mimetype;

        // Convert buffer to base64
        const base64String = `data:${fileMimeType};base64,${fileBuffer!.toString(
          "base64"
        )}`;

        // Upload to Cloudinary
        const uploadResponse = await cloudinary.uploader.upload(base64String, {
          folder: "scan-for-change",
        });

        res.json({
          status: successLabel,
          msg: "File uploaded successfully!",
          url: uploadResponse.secure_url,
        });
      } catch (error) {
        console.error("Cloudinary Upload Error:", error);
        res.status(500).json({ status: failureLabel, msg: "Upload failed" });
      }
    }
  };
}

export default UtilsController;
