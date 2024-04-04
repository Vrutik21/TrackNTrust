-- AlterTable
ALTER TABLE "Purchase_order" ALTER COLUMN "is_locker_used" DROP NOT NULL,
ALTER COLUMN "is_locker_used" DROP DEFAULT;
