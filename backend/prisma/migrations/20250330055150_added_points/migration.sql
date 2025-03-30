/*
  Warnings:

  - Added the required column `points` to the `waste_categories` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "waste_categories" ADD COLUMN     "points" INTEGER NOT NULL;
