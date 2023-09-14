-- CreateTable
CREATE TABLE "LocationSettings" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "parallelCategory" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LocationSettings_pkey" PRIMARY KEY ("id")
);
