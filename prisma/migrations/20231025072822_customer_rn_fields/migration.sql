/*
  Warnings:

  - You are about to drop the column `created_at` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `creation_source` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `email_address` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `family_name` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `given_name` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `phone_number` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `Customer` table. All the data in the column will be lost.
  - Added the required column `createdAt` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `creationSource` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `emailAddress` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `familyName` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `givenName` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phoneNumber` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Customer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Customer" DROP COLUMN "created_at",
DROP COLUMN "creation_source",
DROP COLUMN "email_address",
DROP COLUMN "family_name",
DROP COLUMN "given_name",
DROP COLUMN "phone_number",
DROP COLUMN "updated_at",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "creationSource" TEXT NOT NULL,
ADD COLUMN     "emailAddress" TEXT NOT NULL,
ADD COLUMN     "familyName" TEXT NOT NULL,
ADD COLUMN     "givenName" TEXT NOT NULL,
ADD COLUMN     "phoneNumber" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
