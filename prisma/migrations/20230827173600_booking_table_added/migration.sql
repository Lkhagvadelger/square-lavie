/*
  Warnings:

  - You are about to drop the column `patientNoteId` on the `FileUpload` table. All the data in the column will be lost.
  - You are about to drop the column `specialistQuestionId` on the `FileUpload` table. All the data in the column will be lost.
  - You are about to drop the column `allowPatientAssign` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `patientCode` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `specialistDesc` on the `Profile` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "BookingStatus" AS ENUM ('PENDING', 'CONFIRMED', 'CANCELLED', 'COMPLETED');

-- DropIndex
DROP INDEX "Profile_patientCode_key";

-- AlterTable
ALTER TABLE "FileUpload" DROP COLUMN "patientNoteId",
DROP COLUMN "specialistQuestionId";

-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "allowPatientAssign",
DROP COLUMN "patientCode",
DROP COLUMN "specialistDesc";

-- CreateTable
CREATE TABLE "AdditionServiceConfig" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "data" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AdditionServiceConfig_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Booking" (
    "id" TEXT NOT NULL,
    "squareBookingId" TEXT NOT NULL,
    "data" JSONB NOT NULL,
    "personData" JSONB[],
    "startDate" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "status" "BookingStatus" NOT NULL,
    "updatedBy" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Booking_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BookingStatusList" (
    "id" TEXT NOT NULL,
    "bookingId" TEXT NOT NULL,
    "status" "BookingStatus" NOT NULL,
    "updateBy" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BookingStatusList_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Staff" (
    "id" TEXT NOT NULL,
    "staffId" TEXT NOT NULL,
    "priority" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "data" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Staff_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StaffRoundingNumber" (
    "id" TEXT NOT NULL,
    "lastNumber" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "StaffRoundingNumber_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookingStatusList" ADD CONSTRAINT "BookingStatusList_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "Booking"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
