import { Request, Response } from "express";
import { failureLabel, successLabel } from "../constants";
import { UserRepo, WasteCategoryRepo, WasteReportRepo } from "../repository";
import { imageRecogWithLink } from "../services/image_recog";

class WasteController {
  static handleRegisterWasteRecords = async (
    req: Request<
      {},
      {},
      {
        img_url: string;
        location: number[];
      }
    >,
    res: Response<{}, { user: IUser; role: string }>
  ) => {
    try {
      const imgData = await imageRecogWithLink(req.body.img_url);

      const target_categories = [];
      const wasteCategories = imgData.categories;
      for (let cat of wasteCategories) {
        target_categories.push(await WasteCategoryRepo.findByName(cat));
      }

      const cat_count = imgData.category_count;
      let cumulative_points = 0;
      for (let key of Object.keys(cat_count)) {
        const c = await WasteCategoryRepo.findByName(key);
        cumulative_points += c?.points! * cat_count[key];
      }

      const newReport = await WasteReportRepo.create(
        req.body.img_url,
        req.body.location,
        res.locals.user.id_pk,
        imgData.wastes,
        cumulative_points
      );

      for (let foundCat of target_categories) {
        WasteCategoryRepo.mapReportWithCategory(
          newReport.id_pk,
          foundCat!.id_pk
        );
      }
      UserRepo.incrementPoints(res.locals.user.id_pk, cumulative_points);

      res.status(201).json({
        status: successLabel,
        msg: "Waste successfully reported",
        data: {
          categories_found: wasteCategories,
          wastes_found: imgData.wastes,
          points: cumulative_points,
        },
      });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ status: failureLabel, msg: "Internal Server Error" });
    }
  };

  static handleGetLeaderboard = async (req: Request, res: Response) => {
    try {
      const lb = await UserRepo.getLeaderboard();
      res.status(200).json({
        status: successLabel,
        msg: "Leaderboard fetched",
        leaderboard: lb.map((l) => {
          return {
            name: l.email
              .split("@")[0]
              .replace(/-([a-z0-9])/g, (_, char) => char.toUpperCase()),
            points: l.total_points,
            scan_counts: l.waste_reports.length,
          };
        }),
      });
    } catch (error) {
      res
        .status(500)
        .json({ status: failureLabel, msg: "Internal Server Error" });
    }
  };
  // static handleDataAggregration = async (
  //   req: Request<
  //     {},
  //     {},
  //     {
  //       img_url: string;
  //       location: number[];
  //       wastes_reported: string[];
  //       waste_categories: string[];
  //     }
  //   >,
  //   res: Response<{}, { user: IUser; role: string }>
  // ) => {
  //   try {
  //     const newReport = await WasteReportRepo.create(
  //       req.body.img_url,
  //       req.body.location,
  //       res.locals.user.id_pk,
  //       req.body.wastes_reported,
  //       22 // To change
  //     );

  //     const wasteCategories = req.body.waste_categories;
  //     for (let cat of wasteCategories) {
  //       const targetWasteCategory = await WasteCategoryRepo.findByName(cat);

  //       if (!targetWasteCategory) continue;

  //       WasteCategoryRepo.mapReportWithCategory(
  //         newReport.id_pk,
  //         targetWasteCategory.id_pk
  //       );
  //     }

  //     res.status(201).json({
  //       status: successLabel,
  //       msg: "Waste successfully reported in data pipeline",
  //     });
  //   } catch (error) {
  //     console.log(error);
  //     res
  //       .status(500)
  //       .json({ status: failureLabel, msg: "Internal Server Error" });
  //   }
  // };
}
export default WasteController;
