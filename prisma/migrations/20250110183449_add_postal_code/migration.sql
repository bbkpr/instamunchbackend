/*
  Warnings:

  - Added the required column `manufacturerId` to the `MachineType` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Location" ADD COLUMN     "postalCode" TEXT NOT NULL DEFAULT '90210';

-- AlterTable
ALTER TABLE "MachineType" ADD COLUMN     "manufacturerId" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "MachineItem_machineId_idx" ON "MachineItem"("machineId");

-- CreateIndex
CREATE INDEX "MachineItem_itemId_idx" ON "MachineItem"("itemId");

-- CreateIndex
CREATE INDEX "MachineLocation_machineId_idx" ON "MachineLocation"("machineId");

-- CreateIndex
CREATE INDEX "MachineLocation_locationId_idx" ON "MachineLocation"("locationId");

-- AddForeignKey
ALTER TABLE "MachineType" ADD CONSTRAINT "MachineType_manufacturerId_fkey" FOREIGN KEY ("manufacturerId") REFERENCES "MachineManufacturer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
