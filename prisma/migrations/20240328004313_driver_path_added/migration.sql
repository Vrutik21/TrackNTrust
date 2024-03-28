-- CreateTable
CREATE TABLE "Driver_path" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "latitude" TEXT NOT NULL,
    "longitude" TEXT NOT NULL,
    "driver_id" TEXT NOT NULL,

    CONSTRAINT "Driver_path_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Driver_path" ADD CONSTRAINT "Driver_path_driver_id_fkey" FOREIGN KEY ("driver_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
