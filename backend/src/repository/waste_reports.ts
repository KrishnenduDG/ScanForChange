import { prisma } from "../config";

class WasteReportRepo {
  static create = async (
    imgUrl: string,
    location: number[],
    userId: number,
    wastes_reported: string[],
    points_earned: number
  ) =>
    await prisma.waste_reports.create({
      data: { imgUrl, location, userId, wastes_reported, points_earned },
    });

  static getByUserId = async (userId: number) =>
    await prisma.waste_reports.findMany({ where: { userId } });
}

export default WasteReportRepo;
