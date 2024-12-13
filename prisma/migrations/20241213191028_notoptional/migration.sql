/*
  Warnings:

  - Made the column `name` on table `Item` required. This step will fail if there are existing NULL values in that column.
  - Made the column `basePrice` on table `Item` required. This step will fail if there are existing NULL values in that column.
  - Made the column `expirationPeriod` on table `Item` required. This step will fail if there are existing NULL values in that column.
  - Made the column `name` on table `Machine` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Item" ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "basePrice" SET NOT NULL,
ALTER COLUMN "expirationPeriod" SET NOT NULL;

-- AlterTable
ALTER TABLE "Machine" ALTER COLUMN "name" SET NOT NULL;
