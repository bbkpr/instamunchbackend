/*
  Warnings:

  - You are about to drop the column `address1` on the `MachineLocation` table. All the data in the column will be lost.
  - You are about to drop the column `address2` on the `MachineLocation` table. All the data in the column will be lost.
  - You are about to drop the column `city` on the `MachineLocation` table. All the data in the column will be lost.
  - You are about to drop the column `country` on the `MachineLocation` table. All the data in the column will be lost.
  - You are about to drop the column `stateOrProvince` on the `MachineLocation` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[machineId]` on the table `MachineLocation` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[locationId]` on the table `MachineLocation` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `locationId` to the `MachineLocation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `machineId` to the `MachineLocation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Machine" ALTER COLUMN "updatedAt" DROP DEFAULT;

-- AlterTable
ALTER TABLE "MachineLocation" DROP COLUMN "address1",
DROP COLUMN "address2",
DROP COLUMN "city",
DROP COLUMN "country",
DROP COLUMN "stateOrProvince",
ADD COLUMN     "locationId" TEXT NOT NULL,
ADD COLUMN     "machineId" TEXT NOT NULL,
ALTER COLUMN "updatedAt" DROP DEFAULT;

-- CreateTable
CREATE TABLE "Location" (
    "id" TEXT NOT NULL,
    "address1" TEXT NOT NULL,
    "address2" TEXT,
    "city" TEXT NOT NULL,
    "stateOrProvince" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Location_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "MachineLocation_machineId_key" ON "MachineLocation"("machineId");

-- CreateIndex
CREATE UNIQUE INDEX "MachineLocation_locationId_key" ON "MachineLocation"("locationId");

-- AddForeignKey
ALTER TABLE "MachineLocation" ADD CONSTRAINT "MachineLocation_machineId_fkey" FOREIGN KEY ("machineId") REFERENCES "Machine"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MachineLocation" ADD CONSTRAINT "MachineLocation_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
