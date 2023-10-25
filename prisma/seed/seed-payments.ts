import { paymentsApi } from "../../lib/square/api/squareClient";
import { Prisma, PrismaClient } from "@prisma/client";
import { Payment } from "square";
import { convertMoneyObject } from "../../lib/core/util/money";
import { castBigIntToNumber } from "../../lib/core/util/cast";

const seedDb = async (prisma: PrismaClient, payments: Payment[]) => {
  // Get the IDs of existing payments in the database
  const existingPayments = await prisma.payment.findMany({
    select: {
      id: true,
    },
    where: {
      id: {
        in: payments.map((c) => c.id ?? ""),
      },
    },
  });

  // Extract the existing payment IDs
  const existingPaymentIds = existingPayments.map((payment) => payment.id);

  // Filter the new payments that are not in the database
  const newPayments = payments.filter(
    (payment) => !existingPaymentIds.includes(payment.id!)
  );

  // Insert the new payments using createMany
  if (newPayments.length > 0) {
    await prisma.payment.createMany({
      data: newPayments.map(castBigIntToNumber),
    });
  }
  return newPayments.length;
};

export const seedPayments = async (
  prisma: PrismaClient,
  locationId: string,
  cursor?: string,
  pipe?: (payments: Payment[]) => Promise<any>
) => {
  var resp = await paymentsApi.listPayments(
    undefined,
    undefined,
    undefined,
    cursor,
    locationId,
    undefined,
    undefined,
    undefined,
    100
  );
  let num = 0;
  if (resp.result.payments) {
    //seed results to db
    num = await seedDb(prisma, resp.result.payments);
    pipe && pipe(resp.result.payments);
  }
  if (resp.result.cursor) {
    console.log(
      `${resp.result.cursor}-${num} new payments inserted into the database.`
    );
    //fetch next page
    seedPayments(prisma, locationId, resp.result.cursor, pipe);
  }
};
