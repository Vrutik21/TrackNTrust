/*
  Warnings:

  - Added the required column `role` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('admin', 'inventory_manager', 'logistics_manager', 'delivery_person');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('initiated', 'in_progress', 'ready_for_dispatch', 'in_transit', 'delivered', 'cancelled');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "mobile" BIGINT,
ADD COLUMN     "role" "Role" NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "category" TEXT NOT NULL,
    "weight" DOUBLE PRECISION,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Customer" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "mobile" BIGINT,
    "address" TEXT NOT NULL,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Purchase_order" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "status" "Status" NOT NULL,
    "loc_lat" DOUBLE PRECISION,
    "loc_lon" DOUBLE PRECISION,
    "location" TEXT NOT NULL,
    "customer_id" TEXT NOT NULL,

    CONSTRAINT "Purchase_order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order_history" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "user_id" TEXT NOT NULL,
    "order_id" TEXT NOT NULL,
    "loc_lat" DOUBLE PRECISION,
    "loc_lon" DOUBLE PRECISION,
    "location" TEXT NOT NULL,
    "status" "Status" NOT NULL,
    "description" TEXT,

    CONSTRAINT "Order_history_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ProductToPurchase_order" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Customer_email_key" ON "Customer"("email");

-- CreateIndex
CREATE UNIQUE INDEX "_ProductToPurchase_order_AB_unique" ON "_ProductToPurchase_order"("A", "B");

-- CreateIndex
CREATE INDEX "_ProductToPurchase_order_B_index" ON "_ProductToPurchase_order"("B");

-- AddForeignKey
ALTER TABLE "Purchase_order" ADD CONSTRAINT "Purchase_order_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order_history" ADD CONSTRAINT "Order_history_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order_history" ADD CONSTRAINT "Order_history_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "Purchase_order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductToPurchase_order" ADD CONSTRAINT "_ProductToPurchase_order_A_fkey" FOREIGN KEY ("A") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductToPurchase_order" ADD CONSTRAINT "_ProductToPurchase_order_B_fkey" FOREIGN KEY ("B") REFERENCES "Purchase_order"("id") ON DELETE CASCADE ON UPDATE CASCADE;
