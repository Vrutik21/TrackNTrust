/*
  Warnings:

  - Added the required column `order_id` to the `Driver_path` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Driver_path" ADD COLUMN     "order_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Driver_path" ADD CONSTRAINT "Driver_path_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "Purchase_order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
