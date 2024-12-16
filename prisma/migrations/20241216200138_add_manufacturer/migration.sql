/*
  Warnings:

  - Added the required column `manufacturerId` to the `Machine` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Machine" ADD COLUMN     "manufacturerId" TEXT NOT NULL,
ALTER COLUMN "machineTypeId" DROP DEFAULT;

-- CreateTable
CREATE TABLE "MachineManufacturer" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MachineManufacturer_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Machine" ADD CONSTRAINT "Machine_manufacturerId_fkey" FOREIGN KEY ("manufacturerId") REFERENCES "MachineManufacturer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
