-- AlterTable
ALTER TABLE "Machine" ADD COLUMN     "machineTypeId" TEXT NOT NULL DEFAULT '92f0a230-89fe-4f68-abf9-270a5239ce9c';

-- AddForeignKey
ALTER TABLE "Machine" ADD CONSTRAINT "Machine_machineTypeId_fkey" FOREIGN KEY ("machineTypeId") REFERENCES "MachineType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
