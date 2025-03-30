import { prisma } from "../config";
import { PASSWORD_SALT_ROUNDS } from "../constants";
import { generateHashedPassword } from "../utils/password";

class UserRepo {
  static create = async (email: string, password: string, roleId: number) =>
    await prisma.user.create({
      data: {
        email,
        password: await generateHashedPassword(password, PASSWORD_SALT_ROUNDS),
        roleId,
      },
    });

  static findByEmail = async (email: string) =>
    await prisma.user.findFirst({ where: { email } });

  static findByUid = async (uid: string) =>
    await prisma.user.findFirst({ where: { uid } });

  static incrementPoints = async (id_pk: number, pts: number) =>
    await prisma.user.update({
      where: { id_pk },
      data: { total_points: { increment: pts } },
    });

  static getLeaderboard = async () =>
    await prisma.user.findMany({
      orderBy: {
        total_points: "desc",
      },
      include: { waste_reports: true },
    });
}

export default UserRepo;
