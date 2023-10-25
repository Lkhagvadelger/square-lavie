-- CreateTable
CREATE TABLE "Payment" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "amount" JSONB NOT NULL,
    "tip" JSONB NOT NULL,
    "status" TEXT NOT NULL,
    "sourceType" TEXT NOT NULL,
    "cardDetails" JSONB NOT NULL,
    "locationId" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "processingFee" JSONB[],
    "customerId" TEXT NOT NULL,
    "totalMoney" JSONB NOT NULL,
    "approvedMoney" JSONB NOT NULL,
    "receiptNumber" TEXT NOT NULL,
    "receiptUrl" TEXT NOT NULL,
    "deviceDetails" JSONB NOT NULL,
    "applicationDetails" JSONB NOT NULL,
    "versionToken" TEXT NOT NULL,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);
