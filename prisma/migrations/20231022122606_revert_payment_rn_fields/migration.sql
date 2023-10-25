/*
  Warnings:

  - You are about to drop the column `application_details` on the `Payment` table. All the data in the column will be lost.
  - You are about to drop the column `approved_money` on the `Payment` table. All the data in the column will be lost.
  - You are about to drop the column `card_details` on the `Payment` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `Payment` table. All the data in the column will be lost.
  - You are about to drop the column `customer_id` on the `Payment` table. All the data in the column will be lost.
  - You are about to drop the column `device_details` on the `Payment` table. All the data in the column will be lost.
  - You are about to drop the column `location_id` on the `Payment` table. All the data in the column will be lost.
  - You are about to drop the column `order_id` on the `Payment` table. All the data in the column will be lost.
  - You are about to drop the column `processing_fee` on the `Payment` table. All the data in the column will be lost.
  - You are about to drop the column `receipt_number` on the `Payment` table. All the data in the column will be lost.
  - You are about to drop the column `receipt_url` on the `Payment` table. All the data in the column will be lost.
  - You are about to drop the column `source_type` on the `Payment` table. All the data in the column will be lost.
  - You are about to drop the column `total_money` on the `Payment` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `Payment` table. All the data in the column will be lost.
  - You are about to drop the column `version_token` on the `Payment` table. All the data in the column will be lost.
  - Added the required column `applicationDetails` to the `Payment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `approvedMoney` to the `Payment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cardDetails` to the `Payment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `createdAt` to the `Payment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `customerId` to the `Payment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `deviceDetails` to the `Payment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `locationId` to the `Payment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `orderId` to the `Payment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `receiptNumber` to the `Payment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `receiptUrl` to the `Payment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sourceType` to the `Payment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalMoney` to the `Payment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Payment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `versionToken` to the `Payment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Payment" DROP COLUMN "application_details",
DROP COLUMN "approved_money",
DROP COLUMN "card_details",
DROP COLUMN "created_at",
DROP COLUMN "customer_id",
DROP COLUMN "device_details",
DROP COLUMN "location_id",
DROP COLUMN "order_id",
DROP COLUMN "processing_fee",
DROP COLUMN "receipt_number",
DROP COLUMN "receipt_url",
DROP COLUMN "source_type",
DROP COLUMN "total_money",
DROP COLUMN "updated_at",
DROP COLUMN "version_token",
ADD COLUMN     "applicationDetails" JSONB NOT NULL,
ADD COLUMN     "approvedMoney" JSONB NOT NULL,
ADD COLUMN     "cardDetails" JSONB NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "customerId" TEXT NOT NULL,
ADD COLUMN     "deviceDetails" JSONB NOT NULL,
ADD COLUMN     "locationId" TEXT NOT NULL,
ADD COLUMN     "orderId" TEXT NOT NULL,
ADD COLUMN     "processingFee" JSONB[],
ADD COLUMN     "receiptNumber" TEXT NOT NULL,
ADD COLUMN     "receiptUrl" TEXT NOT NULL,
ADD COLUMN     "sourceType" TEXT NOT NULL,
ADD COLUMN     "totalMoney" JSONB NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "versionToken" TEXT NOT NULL;
