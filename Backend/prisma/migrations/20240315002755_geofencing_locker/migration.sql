/*
  Warnings:

  - The values [delivered] on the enum `Status` will be removed. If these variants are still used in the database, this will fail.

*/
-- CreateEnum
CREATE TYPE "Locker_status" AS ENUM ('active', 'inactive', 'occupied', 'available', 'out_of_order');

-- AlterEnum
BEGIN;
CREATE TYPE "Status_new" AS ENUM ('initiated', 'in_progress', 'in_transit', 'reached_facility', 'ready_for_dispatch', 'out_for_delivery', 'delivered_to_customer', 'delivered_to_locker', 'cancelled');
ALTER TABLE "Purchase_order" ALTER COLUMN "status" TYPE "Status_new" USING ("status"::text::"Status_new");
ALTER TABLE "Order_history" ALTER COLUMN "status" TYPE "Status_new" USING ("status"::text::"Status_new");
ALTER TYPE "Status" RENAME TO "Status_old";
ALTER TYPE "Status_new" RENAME TO "Status";
DROP TYPE "Status_old";
COMMIT;

-- AlterTable
ALTER TABLE "Purchase_order" ADD COLUMN     "delivery_attempts" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "is_locker_used" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "Geofence_area" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "customer_id" TEXT NOT NULL,
    "radius" DOUBLE PRECISION NOT NULL,
    "loc_lat" DOUBLE PRECISION NOT NULL,
    "loc_lon" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Geofence_area_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Smart_locker" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "address" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "status" "Locker_status" NOT NULL DEFAULT 'inactive',
    "associated_order_id" TEXT,

    CONSTRAINT "Smart_locker_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Geofence_area_customer_id_key" ON "Geofence_area"("customer_id");

-- CreateIndex
CREATE UNIQUE INDEX "Smart_locker_code_key" ON "Smart_locker"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Smart_locker_associated_order_id_key" ON "Smart_locker"("associated_order_id");

-- AddForeignKey
ALTER TABLE "Geofence_area" ADD CONSTRAINT "Geofence_area_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Smart_locker" ADD CONSTRAINT "Smart_locker_associated_order_id_fkey" FOREIGN KEY ("associated_order_id") REFERENCES "Purchase_order"("id") ON DELETE SET NULL ON UPDATE CASCADE;
