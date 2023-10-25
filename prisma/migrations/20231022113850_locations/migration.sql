-- CreateTable
CREATE TABLE "Location" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "address" JSONB NOT NULL,
    "timezone" TEXT NOT NULL,
    "capabilities" TEXT[],
    "status" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "merchantId" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "languageCode" TEXT NOT NULL,
    "currency" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "businessName" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "websiteUrl" TEXT NOT NULL,
    "businessHours" JSONB NOT NULL,
    "businessEmail" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "instagramUsername" TEXT NOT NULL,
    "coordinates" JSONB NOT NULL,
    "logoUrl" TEXT NOT NULL,
    "mcc" TEXT NOT NULL,
    "fullFormatLogoUrl" TEXT NOT NULL,

    CONSTRAINT "Location_pkey" PRIMARY KEY ("id")
);
