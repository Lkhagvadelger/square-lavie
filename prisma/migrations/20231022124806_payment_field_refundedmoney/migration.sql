/*
  Warnings:

  - Added the required column `refundedMoney` to the `Payment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Payment" ADD COLUMN     "refundedMoney" JSONB NOT NULL;
