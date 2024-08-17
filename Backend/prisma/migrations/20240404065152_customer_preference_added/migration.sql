/*
  Warnings:

  - You are about to drop the column `preference_id` on the `Purchase_order` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[order_id]` on the table `Delivery_preference` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `customer_id` to the `Delivery_preference` table without a default value. This is not possible if the table is not empty.
  - Added the required column `order_id` to the `Delivery_preference` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Purchase_order" DROP CONSTRAINT "Purchase_order_preference_id_fkey";

-- DropIndex
DROP INDEX "Purchase_order_preference_id_key";

-- AlterTable
ALTER TABLE "Delivery_preference" ADD COLUMN     "customer_id" TEXT NOT NULL,
ADD COLUMN     "order_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Purchase_order" DROP COLUMN "preference_id";

-- CreateIndex
CREATE UNIQUE INDEX "Delivery_preference_order_id_key" ON "Delivery_preference"("order_id");

-- AddForeignKey
ALTER TABLE "Delivery_preference" ADD CONSTRAINT "Delivery_preference_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "Purchase_order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Delivery_preference" ADD CONSTRAINT "Delivery_preference_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
