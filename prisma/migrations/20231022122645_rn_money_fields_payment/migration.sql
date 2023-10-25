/*
  Warnings:

  - You are about to drop the column `amount_money` on the `Payment` table. All the data in the column will be lost.
  - You are about to drop the column `tip_money` on the `Payment` table. All the data in the column will be lost.
  - Added the required column `amountMoney` to the `Payment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tipMoney` to the `Payment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Payment" DROP COLUMN "amount_money",
DROP COLUMN "tip_money",
ADD COLUMN     "amountMoney" JSONB NOT NULL,
ADD COLUMN     "tipMoney" JSONB NOT NULL;
