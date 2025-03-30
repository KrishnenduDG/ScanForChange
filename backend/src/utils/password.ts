import { compare, genSalt, hash } from "bcryptjs";

export const generateHashedPassword = async (
  password: string,
  saltRounds: number
) => await hash(password, await genSalt(saltRounds));

export const comparePasswords = async (
  password: string,
  hashedPassword: string
) => await compare(password, hashedPassword);
