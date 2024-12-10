/*
  Warnings:

  - The primary key for the `Item` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Item` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Machine` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Machine` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `MachineItem` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `MachineItem` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `MachineLocation` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `MachineLocation` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `machineId` on the `MachineItem` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `itemId` on the `MachineItem` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "MachineItem" DROP CONSTRAINT "MachineItem_itemId_fkey";

-- DropForeignKey
ALTER TABLE "MachineItem" DROP CONSTRAINT "MachineItem_machineId_fkey";

-- AlterTable
ALTER TABLE "Item" DROP CONSTRAINT "Item_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Item_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Machine" DROP CONSTRAINT "Machine_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Machine_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "MachineItem" DROP CONSTRAINT "MachineItem_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "machineId",
ADD COLUMN     "machineId" INTEGER NOT NULL,
DROP COLUMN "itemId",
ADD COLUMN     "itemId" INTEGER NOT NULL,
ADD CONSTRAINT "MachineItem_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "MachineLocation" DROP CONSTRAINT "MachineLocation_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "MachineLocation_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "MachineItem" ADD CONSTRAINT "MachineItem_machineId_fkey" FOREIGN KEY ("machineId") REFERENCES "Machine"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MachineItem" ADD CONSTRAINT "MachineItem_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
