/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Schedule` table. All the data in the column will be lost.
  - You are about to drop the column `endDate` on the `Schedule` table. All the data in the column will be lost.
  - You are about to drop the column `initialDate` on the `Schedule` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Schedule" DROP COLUMN "createdAt",
DROP COLUMN "endDate",
DROP COLUMN "initialDate",
ADD COLUMN     "date" TIMESTAMP(3);
