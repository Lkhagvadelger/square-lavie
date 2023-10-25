import { Customer } from "square";
import { customersApi } from "../../lib/square/api/squareClient";
import { PrismaClient } from "@prisma/client";

const seedDb = async (prisma: PrismaClient, customers: Customer[]) => {
  // Get the IDs of existing payments in the database
  const existingPayments = await prisma.customer.findMany({
    select: {
      id: true,
    },
    where: {
      id: {
        in: customers.map((c) => c.id ?? ""),
      },
    },
  });

  // Extract the existing payment IDs
  const existingPaymentIds = existingPayments.map((payment) => payment.id);

  // Filter the new payments that are not in the database
  const newPayments = customers.filter(
    (payment) => !existingPaymentIds.includes(payment.id!)
  );
  if (newPayments.length < 1) return 0;

  // Insert the new payments using createMany
  for (const c of newPayments) {
    const copy = { ...c };
    delete copy.segmentIds;
    delete copy.groupIds;
    delete copy.cards;

    await prisma.customer.create({
      data: {
        ...copy,
        version: parseInt(copy.version?.toString() ?? "0"),
        segments: {
          connect:
            c.segmentIds?.map((s) => ({
              id: s,
            })) ?? [],
        },
        groups: {
          connect:
            c.groupIds?.map((s) => ({
              id: s,
            })) ?? [],
        },
      } as any,
    });
  }

  return newPayments.length;
};

export const seedCustomer = async (prisma: PrismaClient, cursor?: string) => {
  const resp = await customersApi.listCustomers(cursor, 100);

  if (resp.result.customers) {
    //seed results to db
    const num = await seedDb(prisma, resp.result.customers);
    console.log(
      `${resp.result.cursor}-${num} new customers inserted into the database.`
    );
  }
  if (resp.result.cursor) {
    //fetch next page
    seedCustomer(prisma, resp.result.cursor);
  }
};
