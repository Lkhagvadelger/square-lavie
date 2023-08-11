/*
  Warnings:

  - The values [es,hn,gt,sv] on the enum `Country` will be removed. If these variants are still used in the database, this will fail.
  - The values [PATIENT,LOCAL_DOCTOR,PATIENT_EXPERIENCE_MANAGER,SPECIALIST,HOSPITAL_ADMIN,NURSE] on the enum `UserRole` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `doctorProfileId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `hospitalId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `lastRecommendedSpecialty` on the `User` table. All the data in the column will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Country_new" AS ENUM ('us', 'mn');
ALTER TABLE "Profile" ALTER COLUMN "country" TYPE "Country_new" USING ("country"::text::"Country_new");
ALTER TYPE "Country" RENAME TO "Country_old";
ALTER TYPE "Country_new" RENAME TO "Country";
DROP TYPE "Country_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "UserRole_new" AS ENUM ('USER', 'ADMIN');
ALTER TABLE "User" ALTER COLUMN "role" DROP DEFAULT;
ALTER TABLE "User" ALTER COLUMN "role" TYPE "UserRole_new" USING ("role"::text::"UserRole_new");
ALTER TYPE "UserRole" RENAME TO "UserRole_old";
ALTER TYPE "UserRole_new" RENAME TO "UserRole";
DROP TYPE "UserRole_old";
ALTER TABLE "User" ALTER COLUMN "role" SET DEFAULT 'USER';
COMMIT;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "doctorProfileId",
DROP COLUMN "hospitalId",
DROP COLUMN "lastRecommendedSpecialty",
ADD COLUMN     "lastLoggedInAt" TIMESTAMP(3),
ALTER COLUMN "role" SET DEFAULT 'USER';
