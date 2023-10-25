-- AlterTable
ALTER TABLE "Payment" ALTER COLUMN "appFeeMoney" DROP NOT NULL,
ALTER COLUMN "refundedMoney" DROP NOT NULL;
