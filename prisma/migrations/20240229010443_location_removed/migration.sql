/*
  Warnings:

  - You are about to drop the column `location` on the `Order_history` table. All the data in the column will be lost.
  - You are about to drop the column `location` on the `Purchase_order` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Order_history" DROP COLUMN "location";

-- AlterTable
ALTER TABLE "Purchase_order" DROP COLUMN "location";
