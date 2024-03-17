-- AlterEnum
ALTER TYPE "Status" ADD VALUE 'locker_assigned';

-- AlterTable
ALTER TABLE "Smart_locker" ADD COLUMN     "pin" INTEGER;
