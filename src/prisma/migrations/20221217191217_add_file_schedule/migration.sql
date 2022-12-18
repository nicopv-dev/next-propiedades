-- DropForeignKey
ALTER TABLE "ImageOnRooms" DROP CONSTRAINT "ImageOnRooms_roomId_fkey";

-- AlterTable
ALTER TABLE "Schedule" ADD COLUMN     "file" TEXT;

-- AddForeignKey
ALTER TABLE "ImageOnRooms" ADD CONSTRAINT "ImageOnRooms_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE CASCADE ON UPDATE CASCADE;
