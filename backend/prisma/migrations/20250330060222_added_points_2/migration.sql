/*
  Warnings:

  - Added the required column `total_points` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `points_earned` to the `waste_reports` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "user" ADD COLUMN     "total_points" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "waste_reports" ADD COLUMN     "points_earned" INTEGER NOT NULL;
