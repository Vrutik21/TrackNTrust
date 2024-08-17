/*
  Warnings:

  - Made the column `pin` on table `Smart_locker` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Smart_locker" ALTER COLUMN "pin" SET NOT NULL;
