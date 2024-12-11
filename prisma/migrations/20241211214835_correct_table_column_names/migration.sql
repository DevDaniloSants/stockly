/*
  Warnings:

  - You are about to drop the column `salesId` on the `SaleProducts` table. All the data in the column will be lost.
  - Added the required column `saleId` to the `SaleProducts` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "SaleProducts" DROP CONSTRAINT "SaleProducts_salesId_fkey";

-- AlterTable
ALTER TABLE "SaleProducts" DROP COLUMN "salesId",
ADD COLUMN     "saleId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "SaleProducts" ADD CONSTRAINT "SaleProducts_saleId_fkey" FOREIGN KEY ("saleId") REFERENCES "Sale"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
