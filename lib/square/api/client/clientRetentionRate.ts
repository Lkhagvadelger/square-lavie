import { prisma } from "@api/prisma";

/**
 * Calculates the customer retention rate for a specified time period.
 *
 * @param {number} year - The year of the desired time period.
 * @param {number} month - The month of the desired time period. 0-11
 * @returns {Promise<number>} The retention rate as a percentage.
 */
export async function calculateRetentionRate({
  year,
  month,
}: {
  year: number;
  month: number;
}): Promise<number> {
  const startDate = new Date(year, month - 1, 1);
  const endDate = new Date(year, month, 0);
  const previousMonthStartDate = new Date(year, month - 2, 1);
  const previousMonthEndDate = new Date(year, month - 1, 0);
  type CustomerIdResponse = { customerId: string }[];
  // Create a raw SQL query to find clients who placed an order during the specified month

  const currentMonthClients = await prisma.$queryRaw<CustomerIdResponse>`
    SELECT DISTINCT o."customerId"
    FROM "Order" o
    WHERE o."createdAt" >= ${startDate}
    AND o."createdAt" <= ${endDate}
    `;

  // Create a raw SQL query to find clients who placed an order in the previous month

  const previousMonthClients = await prisma.$queryRaw<CustomerIdResponse>`
    SELECT DISTINCT o."customerId"
    FROM "Order" o
    WHERE o."createdAt" >= ${previousMonthStartDate}
    AND o."createdAt" <= ${previousMonthEndDate}
    `;

  // Calculate the number of retained clients
  const retainedClients = currentMonthClients.filter((clientId) =>
    previousMonthClients.some(
      (prevClientId) => prevClientId.customerId === clientId.customerId
    )
  );

  // Calculate retention rate
  const retentionRate =
    (retainedClients.length / previousMonthClients.length) * 100;

  return retentionRate;
}
