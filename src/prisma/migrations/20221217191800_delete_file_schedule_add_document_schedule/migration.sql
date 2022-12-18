/*
  Warnings:

  - You are about to drop the column `file` on the `Schedule` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Schedule" DROP COLUMN "file";

-- CreateTable
CREATE TABLE "DocumentSchedule" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "scheduleId" INTEGER NOT NULL,
    "status" BOOLEAN NOT NULL,
    "file" TEXT,

    CONSTRAINT "DocumentSchedule_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "DocumentSchedule" ADD CONSTRAINT "DocumentSchedule_scheduleId_fkey" FOREIGN KEY ("scheduleId") REFERENCES "Schedule"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
