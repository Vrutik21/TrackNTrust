/*
  Warnings:

  - You are about to drop the `Smart_locker` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Smart_locker" DROP CONSTRAINT "Smart_locker_associated_order_id_fkey";

-- DropTable
DROP TABLE "Smart_locker";

-- DropEnum
DROP TYPE "Locker_status";
