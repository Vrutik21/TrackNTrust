/*
  Warnings:

  - A unique constraint covering the columns `[order_code]` on the table `Purchase_order` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Purchase_order" ADD COLUMN     "order_code" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Purchase_order_order_code_key" ON "Purchase_order"("order_code");
