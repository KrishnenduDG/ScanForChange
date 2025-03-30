import { prisma } from "../config";

class WasteCategoryRepo {
  static create = async (name: string, description: string, points: number) =>
    await prisma.waste_categories.create({
      data: { name, description, points },
    });

  static findByName = async (name: string) =>
    await prisma.waste_categories.findFirst({ where: { name } });

  static findByIdPk = async (id_pk: number) =>
    await prisma.waste_categories.findFirst({ where: { id_pk } });

  static mapReportWithCategory = async (
    wasteReportId: number,
    wasteCategoryId: number
  ) =>
    await prisma.waste_report_category_map.create({
      data: { wasteCategoryId, wasteReportId },
    });
}

export default WasteCategoryRepo;
