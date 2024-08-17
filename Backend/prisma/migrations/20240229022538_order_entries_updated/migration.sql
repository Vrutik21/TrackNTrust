-- DropForeignKey
ALTER TABLE "Order_entries" DROP CONSTRAINT "Order_entries_order_id_fkey";

-- AlterTable
ALTER TABLE "Order_entries" ALTER COLUMN "order_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Order_entries" ADD CONSTRAINT "Order_entries_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "Purchase_order"("id") ON DELETE SET NULL ON UPDATE CASCADE;
