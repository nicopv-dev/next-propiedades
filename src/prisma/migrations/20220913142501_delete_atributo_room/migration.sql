/*
  Warnings:

  - You are about to drop the column `bedrooms` on the `Room` table. All the data in the column will be lost.
  - You are about to drop the column `beds` on the `Room` table. All the data in the column will be lost.
  - You are about to drop the column `host` on the `Room` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Room" DROP COLUMN "bedrooms",
DROP COLUMN "beds",
DROP COLUMN "host";
