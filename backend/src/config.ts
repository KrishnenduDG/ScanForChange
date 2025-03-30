import { PrismaClient } from "@prisma/client";

const PORT = process.env.PORT!;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL!;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD!;
const JWT_SECRET = process.env.JWT_SECRET!;
const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME!;
const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY!;
const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET!;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY!;
const IS_REFRESH_ENABLED = process.env.IS_REFRESH_ENABLED!;

const prisma = new PrismaClient();

export {
  ADMIN_EMAIL,
  ADMIN_PASSWORD,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
  CLOUDINARY_CLOUD_NAME,
  IS_REFRESH_ENABLED,
  JWT_SECRET,
  OPENAI_API_KEY,
  PORT,
  prisma,
};
