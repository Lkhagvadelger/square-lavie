-- AlterTable
ALTER TABLE "Customer" ADD COLUMN     "birthday" TEXT,
ADD COLUMN     "companyName" TEXT,
ADD COLUMN     "nickname" TEXT,
ADD COLUMN     "note" TEXT,
ADD COLUMN     "referenceId" TEXT,
ADD COLUMN     "taxIds" JSONB;
