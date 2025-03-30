import { ADMIN_EMAIL, ADMIN_PASSWORD, IS_REFRESH_ENABLED } from "../config";
import { ADMIN_LABEL, roles, WASTE_CATEGORIES } from "../constants";
import { RoleRepo, UserRepo, WasteCategoryRepo } from "../repository";

const createRoles = async () => {
  const role_pk_map: any = {};

  for (let roleName of roles) {
    try {
      const targetRole = await RoleRepo.findByName(roleName!);
      if (targetRole) {
        console.log(`Role: ${roleName} already exists`);
        role_pk_map[targetRole.name] = targetRole.id_pk;
      } else {
        const newRole = await RoleRepo.create(roleName!);
        role_pk_map[newRole.name] = newRole.id_pk;
        console.log(`Role: ${roleName} created successfully`);
      }
    } catch (error) {
      console.error(error);
    }
  }
  return role_pk_map;
};

const createAdmin = async (adminRoleId: number) => {
  try {
    const targetAdmin = await UserRepo.findByEmail(ADMIN_EMAIL);

    if (targetAdmin) {
      console.log(`Admin: ${ADMIN_EMAIL} already exists`);
    } else {
      await UserRepo.create(ADMIN_EMAIL, ADMIN_PASSWORD, adminRoleId);
      console.log(`Admin: ${ADMIN_EMAIL} onboarded successfully`);
    }
  } catch (error) {
    console.error(error);
  }
};

const createDefaultWasteCategories = async () => {
  for (let cat of WASTE_CATEGORIES) {
    const targetCategory = await WasteCategoryRepo.findByName(cat.name);

    if (targetCategory) {
      console.log(`"${cat.name}" category already exists`);
    } else {
      WasteCategoryRepo.create(cat.name, cat.desc, cat.points);
      console.log(`"${cat.name}" category created successfully`);
    }
  }
};

export const initServer = async () => {
  if (parseInt(IS_REFRESH_ENABLED) == 0) {
    console.log("Skipped Bootstrap");
    return;
  }

  const role_pk_map = await createRoles();
  await createAdmin(role_pk_map[ADMIN_LABEL]);

  await createDefaultWasteCategories();
};
