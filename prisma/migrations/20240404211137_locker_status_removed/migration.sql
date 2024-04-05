/*
  Warnings:

  - The values [delivered_to_locker,locker_assigned] on the enum `Status` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Status_new" AS ENUM ('initiated', 'in_progress', 'in_transit', 'reached_facility', 'ready_for_dispatch', 'out_for_delivery', 'failed_to_deliver', 'delivered_to_customer', 'cancelled');
ALTER TABLE "Purchase_order" ALTER COLUMN "status" TYPE "Status_new" USING ("status"::text::"Status_new");
ALTER TABLE "Order_history" ALTER COLUMN "status" TYPE "Status_new" USING ("status"::text::"Status_new");
ALTER TYPE "Status" RENAME TO "Status_old";
ALTER TYPE "Status_new" RENAME TO "Status";
DROP TYPE "Status_old";
COMMIT;
