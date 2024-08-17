-- AlterTable
ALTER TABLE "Purchase_order" ADD COLUMN     "driver_id" TEXT;

-- AddForeignKey
ALTER TABLE "Purchase_order" ADD CONSTRAINT "Purchase_order_driver_id_fkey" FOREIGN KEY ("driver_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
