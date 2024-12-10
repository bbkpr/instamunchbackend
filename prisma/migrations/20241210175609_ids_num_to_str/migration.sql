/*
  Warnings:

  - The primary key for the `Item` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Machine` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `MachineItem` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `MachineLocation` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "MachineItem" DROP CONSTRAINT "MachineItem_itemId_fkey";

-- DropForeignKey
ALTER TABLE "MachineItem" DROP CONSTRAINT "MachineItem_machineId_fkey";

-- AlterTable
ALTER TABLE "Item" DROP CONSTRAINT "Item_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Item_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Item_id_seq";

-- AlterTable
ALTER TABLE "Machine" DROP CONSTRAINT "Machine_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Machine_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Machine_id_seq";

-- AlterTable
ALTER TABLE "MachineItem" DROP CONSTRAINT "MachineItem_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "machineId" SET DATA TYPE TEXT,
ALTER COLUMN "itemId" SET DATA TYPE TEXT,
ADD CONSTRAINT "MachineItem_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "MachineItem_id_seq";

-- AlterTable
ALTER TABLE "MachineLocation" DROP CONSTRAINT "MachineLocation_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "MachineLocation_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "MachineLocation_id_seq";

-- AddForeignKey
ALTER TABLE "MachineItem" ADD CONSTRAINT "MachineItem_machineId_fkey" FOREIGN KEY ("machineId") REFERENCES "Machine"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MachineItem" ADD CONSTRAINT "MachineItem_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
