/*
  Warnings:

  - A unique constraint covering the columns `[preference_id]` on the table `Purchase_order` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Purchase_order" ADD COLUMN     "estimated_delivery" TIMESTAMP(3),
ADD COLUMN     "isDeliveryPreference" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "preference_id" TEXT;

-- CreateTable
CREATE TABLE "Delivery_preference" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "delivery_date" TIMESTAMP(3) NOT NULL,
    "delivery_time" TEXT NOT NULL,

    CONSTRAINT "Delivery_preference_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Purchase_order_preference_id_key" ON "Purchase_order"("preference_id");

-- AddForeignKey
ALTER TABLE "Purchase_order" ADD CONSTRAINT "Purchase_order_preference_id_fkey" FOREIGN KEY ("preference_id") REFERENCES "Delivery_preference"("id") ON DELETE SET NULL ON UPDATE CASCADE;
