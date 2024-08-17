/*
  Warnings:

  - You are about to drop the `_Order_entriesToProduct` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `product_id` to the `Order_entries` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantity` to the `Order_entries` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_Order_entriesToProduct" DROP CONSTRAINT "_Order_entriesToProduct_A_fkey";

-- DropForeignKey
ALTER TABLE "_Order_entriesToProduct" DROP CONSTRAINT "_Order_entriesToProduct_B_fkey";

-- AlterTable
ALTER TABLE "Order_entries" ADD COLUMN     "product_id" TEXT NOT NULL,
ADD COLUMN     "quantity" INTEGER NOT NULL;

-- DropTable
DROP TABLE "_Order_entriesToProduct";

-- AddForeignKey
ALTER TABLE "Order_entries" ADD CONSTRAINT "Order_entries_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
