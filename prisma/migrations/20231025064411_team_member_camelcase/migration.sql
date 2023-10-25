/*
  Warnings:

  - You are about to drop the column `assigned_locations` on the `TeamMember` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `TeamMember` table. All the data in the column will be lost.
  - You are about to drop the column `email_address` on the `TeamMember` table. All the data in the column will be lost.
  - You are about to drop the column `family_name` on the `TeamMember` table. All the data in the column will be lost.
  - You are about to drop the column `given_name` on the `TeamMember` table. All the data in the column will be lost.
  - You are about to drop the column `is_owner` on the `TeamMember` table. All the data in the column will be lost.
  - You are about to drop the column `phone_number` on the `TeamMember` table. All the data in the column will be lost.
  - You are about to drop the column `reference_id` on the `TeamMember` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `TeamMember` table. All the data in the column will be lost.
  - Added the required column `assignedLocations` to the `TeamMember` table without a default value. This is not possible if the table is not empty.
  - Added the required column `createdAt` to the `TeamMember` table without a default value. This is not possible if the table is not empty.
  - Added the required column `emailAddress` to the `TeamMember` table without a default value. This is not possible if the table is not empty.
  - Added the required column `familyName` to the `TeamMember` table without a default value. This is not possible if the table is not empty.
  - Added the required column `givenName` to the `TeamMember` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isOwner` to the `TeamMember` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phoneNumber` to the `TeamMember` table without a default value. This is not possible if the table is not empty.
  - Added the required column `referenceId` to the `TeamMember` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `TeamMember` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TeamMember" DROP COLUMN "assigned_locations",
DROP COLUMN "created_at",
DROP COLUMN "email_address",
DROP COLUMN "family_name",
DROP COLUMN "given_name",
DROP COLUMN "is_owner",
DROP COLUMN "phone_number",
DROP COLUMN "reference_id",
DROP COLUMN "updated_at",
ADD COLUMN     "assignedLocations" JSONB NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "emailAddress" TEXT NOT NULL,
ADD COLUMN     "familyName" TEXT NOT NULL,
ADD COLUMN     "givenName" TEXT NOT NULL,
ADD COLUMN     "isOwner" BOOLEAN NOT NULL,
ADD COLUMN     "phoneNumber" TEXT NOT NULL,
ADD COLUMN     "referenceId" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
