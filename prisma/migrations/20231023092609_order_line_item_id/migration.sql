/*
  Warnings:

  - The primary key for the `OrderLineItem` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `OrderLineItem` table. All the data in the column will be lost.
  - Made the column `uid` on table `OrderLineItem` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "OrderLineItem" DROP CONSTRAINT "OrderLineItem_pkey",
DROP COLUMN "id",
ALTER COLUMN "uid" SET NOT NULL,
ADD CONSTRAINT "OrderLineItem_pkey" PRIMARY KEY ("uid");
