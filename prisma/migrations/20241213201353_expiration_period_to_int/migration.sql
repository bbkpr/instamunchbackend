/*
  Warnings:

  - Changed the type of `expirationPeriod` on the `Item` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Item" DROP COLUMN "expirationPeriod",
ADD COLUMN     "expirationPeriod" INTEGER NOT NULL;
