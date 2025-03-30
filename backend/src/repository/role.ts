import { prisma } from "../config";

class RoleRepo {
  static create = async (name: string) =>
    await prisma.role.create({ data: { name } });

  static findByName = async (name: string) =>
    await prisma.role.findFirst({ where: { name } });

  static findByIdPk = async (id_pk: number) =>
    await prisma.role.findFirst({ where: { id_pk } });
}

export default RoleRepo;
