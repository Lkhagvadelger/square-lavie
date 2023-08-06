-- CreateEnum
CREATE TYPE "Country" AS ENUM ('us', 'mn', 'es', 'hn', 'gt', 'sv');

-- AlterTable
ALTER TABLE "Profile" ADD COLUMN     "country" "Country";
