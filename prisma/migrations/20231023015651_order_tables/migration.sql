-- CreateTable
CREATE TABLE "Order" (
    "id" TEXT NOT NULL,
    "locationId" TEXT NOT NULL,
    "referenceId" TEXT,
    "customerId" TEXT,
    "source" JSONB NOT NULL,
    "taxes" JSONB[],
    "discounts" JSONB[],
    "returnAmounts" JSONB,
    "netAmounts" JSONB,
    "roundingAdjustment" JSONB,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3),
    "updatedAt" TIMESTAMP(3),
    "closedAt" TIMESTAMP(3),
    "state" TEXT,
    "version" INTEGER,
    "totalMoney" JSONB,
    "totalTaxMoney" JSONB,
    "totalDiscountMoney" JSONB,
    "totalTipMoney" JSONB,
    "totalServiceChargeMoney" JSONB,
    "ticketName" TEXT,
    "pricingOptions" JSONB,
    "rewards" JSONB[],
    "netAmountDueMoney" JSONB,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Refund" (
    "id" TEXT NOT NULL,
    "locationId" TEXT NOT NULL,
    "transactionId" TEXT,
    "tenderId" TEXT NOT NULL,
    "createdAt" TEXT,
    "reason" TEXT NOT NULL,
    "amountMoney" JSONB NOT NULL,
    "status" TEXT NOT NULL,
    "processingFeeMoney" JSONB,
    "additionalRecipients" JSONB[],
    "orderId" TEXT,

    CONSTRAINT "Refund_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tender" (
    "id" TEXT NOT NULL,
    "locationId" TEXT,
    "transactionId" TEXT,
    "createdAt" TEXT,
    "note" TEXT,
    "amountMoney" JSONB,
    "tipMoney" JSONB,
    "processingFeeMoney" JSONB,
    "customerId" TEXT,
    "type" TEXT NOT NULL,
    "cardDetails" JSONB,
    "cashDetails" JSONB,
    "additionalRecipients" JSONB[],
    "paymentId" TEXT,
    "orderId" TEXT,

    CONSTRAINT "Tender_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrderReturn" (
    "id" TEXT NOT NULL,
    "uid" TEXT,
    "sourceOrderId" TEXT,
    "returnLineItems" JSONB[],
    "returnServiceCharges" JSONB[],
    "returnTaxes" JSONB[],
    "returnDiscounts" JSONB[],
    "roundingAdjustment" JSONB,
    "returnAmounts" JSONB,
    "orderId" TEXT,

    CONSTRAINT "OrderReturn_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Fulfillment" (
    "id" TEXT NOT NULL,
    "uid" TEXT,
    "type" TEXT,
    "state" TEXT,
    "lineItemApplication" TEXT,
    "entries" JSONB[],
    "metadata" JSONB,
    "pickupDetails" JSONB,
    "shipmentDetails" JSONB,
    "deliveryDetails" JSONB,
    "orderId" TEXT,

    CONSTRAINT "Fulfillment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrderLineItem" (
    "id" TEXT NOT NULL,
    "uid" TEXT,
    "name" TEXT,
    "quantity" TEXT NOT NULL,
    "quantityUnit" JSONB,
    "note" TEXT,
    "catalogObjectId" TEXT,
    "catalogVersion" BIGINT,
    "variationName" TEXT,
    "itemType" TEXT,
    "metadata" JSONB,
    "modifiers" JSONB[],
    "appliedTaxes" JSONB[],
    "appliedDiscounts" JSONB[],
    "appliedServiceCharges" JSONB[],
    "basePriceMoney" JSONB,
    "variationTotalPriceMoney" JSONB,
    "grossSalesMoney" JSONB,
    "totalTaxMoney" JSONB,
    "totalDiscountMoney" JSONB,
    "totalMoney" JSONB,
    "pricingBlocklists" JSONB,
    "totalServiceChargeMoney" JSONB,
    "orderId" TEXT,

    CONSTRAINT "OrderLineItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrderServiceCharge" (
    "id" TEXT NOT NULL,
    "uid" TEXT,
    "name" TEXT,
    "catalogObjectId" TEXT,
    "catalogVersion" BIGINT,
    "percentage" TEXT,
    "amountMoney" JSONB,
    "appliedMoney" JSONB,
    "totalMoney" JSONB,
    "totalTaxMoney" JSONB,
    "calculationPhase" TEXT,
    "taxable" BOOLEAN,
    "appliedTaxes" JSONB[],
    "metadata" JSONB,
    "type" TEXT,
    "treatmentType" TEXT,
    "scope" TEXT,
    "orderId" TEXT,

    CONSTRAINT "OrderServiceCharge_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Refund" ADD CONSTRAINT "Refund_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tender" ADD CONSTRAINT "Tender_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderReturn" ADD CONSTRAINT "OrderReturn_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Fulfillment" ADD CONSTRAINT "Fulfillment_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderLineItem" ADD CONSTRAINT "OrderLineItem_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderServiceCharge" ADD CONSTRAINT "OrderServiceCharge_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE SET NULL ON UPDATE CASCADE;
