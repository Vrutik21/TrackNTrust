/*
  Warnings:

  - You are about to drop the `_ProductToPurchase_order` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `weight` on table `Product` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "_ProductToPurchase_order" DROP CONSTRAINT "_ProductToPurchase_order_A_fkey";

-- DropForeignKey
ALTER TABLE "_ProductToPurchase_order" DROP CONSTRAINT "_ProductToPurchase_order_B_fkey";

-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "weight" SET NOT NULL;

-- AlterTable
ALTER TABLE "Purchase_order" ADD COLUMN     "total_weight" DOUBLE PRECISION;

-- DropTable
DROP TABLE "_ProductToPurchase_order";

-- CreateTable
CREATE TABLE "Order_entries" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "order_id" TEXT NOT NULL,

    CONSTRAINT "Order_entries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_Order_entriesToProduct" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_Order_entriesToProduct_AB_unique" ON "_Order_entriesToProduct"("A", "B");

-- CreateIndex
CREATE INDEX "_Order_entriesToProduct_B_index" ON "_Order_entriesToProduct"("B");

-- AddForeignKey
ALTER TABLE "Order_entries" ADD CONSTRAINT "Order_entries_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "Purchase_order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Order_entriesToProduct" ADD CONSTRAINT "_Order_entriesToProduct_A_fkey" FOREIGN KEY ("A") REFERENCES "Order_entries"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Order_entriesToProduct" ADD CONSTRAINT "_Order_entriesToProduct_B_fkey" FOREIGN KEY ("B") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
