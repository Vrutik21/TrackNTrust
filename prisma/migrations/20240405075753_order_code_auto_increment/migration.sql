/*
  Warnings:

  - The `order_code` column on the `Purchase_order` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- DropIndex
DROP INDEX "Purchase_order_order_code_key";

-- AlterTable
ALTER TABLE "Purchase_order" DROP COLUMN "order_code",
ADD COLUMN     "order_code" SERIAL;
