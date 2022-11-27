-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "icon" TEXT;

-- CreateTable
CREATE TABLE "Service" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "Service_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ServiceOnRooms" (
    "roomId" INTEGER NOT NULL,
    "serviceId" INTEGER NOT NULL,

    CONSTRAINT "ServiceOnRooms_pkey" PRIMARY KEY ("roomId","serviceId")
);

-- AddForeignKey
ALTER TABLE "ServiceOnRooms" ADD CONSTRAINT "ServiceOnRooms_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServiceOnRooms" ADD CONSTRAINT "ServiceOnRooms_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
