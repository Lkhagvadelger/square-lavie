/*
  Warnings:

  - You are about to drop the column `amount` on the `Payment` table. All the data in the column will be lost.
  - You are about to drop the column `applicationDetails` on the `Payment` table. All the data in the column will be lost.
  - You are about to drop the column `approvedMoney` on the `Payment` table. All the data in the column will be lost.
  - You are about to drop the column `cardDetails` on the `Payment` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Payment` table. All the data in the column will be lost.
  - You are about to drop the column `customerId` on the `Payment` table. All the data in the column will be lost.
  - You are about to drop the column `deviceDetails` on the `Payment` table. All the data in the column will be lost.
  - You are about to drop the column `locationId` on the `Payment` table. All the data in the column will be lost.
  - You are about to drop the column `orderId` on the `Payment` table. All the data in the column will be lost.
  - You are about to drop the column `processingFee` on the `Payment` table. All the data in the column will be lost.
  - You are about to drop the column `receiptNumber` on the `Payment` table. All the data in the column will be lost.
  - You are about to drop the column `receiptUrl` on the `Payment` table. All the data in the column will be lost.
  - You are about to drop the column `sourceType` on the `Payment` table. All the data in the column will be lost.
  - You are about to drop the column `tip` on the `Payment` table. All the data in the column will be lost.
  - You are about to drop the column `totalMoney` on the `Payment` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Payment` table. All the data in the column will be lost.
  - You are about to drop the column `versionToken` on the `Payment` table. All the data in the column will be lost.
  - Added the required column `amount_money` to the `Payment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `application_details` to the `Payment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `approved_money` to the `Payment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `card_details` to the `Payment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `created_at` to the `Payment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `customer_id` to the `Payment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `device_details` to the `Payment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `location_id` to the `Payment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `order_id` to the `Payment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `receipt_number` to the `Payment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `receipt_url` to the `Payment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `source_type` to the `Payment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tip_money` to the `Payment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total_money` to the `Payment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `Payment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `version_token` to the `Payment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Payment" DROP COLUMN "amount",
DROP COLUMN "applicationDetails",
DROP COLUMN "approvedMoney",
DROP COLUMN "cardDetails",
DROP COLUMN "createdAt",
DROP COLUMN "customerId",
DROP COLUMN "deviceDetails",
DROP COLUMN "locationId",
DROP COLUMN "orderId",
DROP COLUMN "processingFee",
DROP COLUMN "receiptNumber",
DROP COLUMN "receiptUrl",
DROP COLUMN "sourceType",
DROP COLUMN "tip",
DROP COLUMN "totalMoney",
DROP COLUMN "updatedAt",
DROP COLUMN "versionToken",
ADD COLUMN     "amount_money" JSONB NOT NULL,
ADD COLUMN     "application_details" JSONB NOT NULL,
ADD COLUMN     "approved_money" JSONB NOT NULL,
ADD COLUMN     "card_details" JSONB NOT NULL,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "customer_id" TEXT NOT NULL,
ADD COLUMN     "device_details" JSONB NOT NULL,
ADD COLUMN     "location_id" TEXT NOT NULL,
ADD COLUMN     "order_id" TEXT NOT NULL,
ADD COLUMN     "processing_fee" JSONB[],
ADD COLUMN     "receipt_number" TEXT NOT NULL,
ADD COLUMN     "receipt_url" TEXT NOT NULL,
ADD COLUMN     "source_type" TEXT NOT NULL,
ADD COLUMN     "tip_money" JSONB NOT NULL,
ADD COLUMN     "total_money" JSONB NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "version_token" TEXT NOT NULL;
