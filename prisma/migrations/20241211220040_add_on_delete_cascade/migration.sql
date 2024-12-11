-- DropForeignKey
ALTER TABLE "SaleProducts" DROP CONSTRAINT "SaleProducts_productId_fkey";

-- DropForeignKey
ALTER TABLE "SaleProducts" DROP CONSTRAINT "SaleProducts_saleId_fkey";

-- AddForeignKey
ALTER TABLE "SaleProducts" ADD CONSTRAINT "SaleProducts_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SaleProducts" ADD CONSTRAINT "SaleProducts_saleId_fkey" FOREIGN KEY ("saleId") REFERENCES "Sale"("id") ON DELETE CASCADE ON UPDATE CASCADE;
