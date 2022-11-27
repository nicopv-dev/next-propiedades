/*
  Warnings:

  - You are about to drop the column `prize` on the `Room` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Room" DROP COLUMN "prize",
ADD COLUMN     "price" INTEGER NOT NULL DEFAULT 0;
